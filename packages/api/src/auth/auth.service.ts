import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service'
import { CryptoService } from '../common/crypto.service'
import { AuditService } from '../common/audit.service'
import { NotificationsService } from '../notifications/notifications.service'
import { SignupDto } from './dto/signup.dto'

const BCRYPT_ROUNDS = 12
const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_WINDOW_MINUTES = 15
const SESSION_TTL_DAYS = 7
const REMEMBER_SESSION_TTL_DAYS = 30
const EMAIL_VERIFY_TTL_HOURS = 24
const PASSWORD_RESET_TTL_HOURS = 1

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly cryptoService: CryptoService,
    private readonly auditService: AuditService,
    private readonly notificationsService: NotificationsService,
  ) {}

  // ─── Signup ──────────────────────────────────────────────────────────────────

  async signup(dto: SignupDto, ipAddress?: string) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase().trim() },
    })
    if (existing) {
      throw new ConflictException('An account with this email already exists')
    }

    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS)
    const referralCode = await this.generateUniqueReferralCode(dto.name)

    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase().trim(),
        name: dto.name.trim(),
        passwordHash,
        referralCode,
        acceptedTermsAt: new Date(),
      },
    })

    // If they came with a referral code, apply it
    if (dto.referralCode) {
      await this.applyReferralCode(dto.referralCode, user.id).catch(() => {})
    }

    // Send verification email
    await this.sendVerificationEmail(user.id)

    const sessionToken = await this.createSession(user.id, false)

    await this.auditService.log({
      actorType: 'USER',
      actorId: user.id,
      action: 'USER_SIGNUP',
      entityType: 'User',
      entityId: user.id,
      ipAddress,
    })

    return { user: this.sanitiseUser(user), sessionToken }
  }

  // ─── Login ───────────────────────────────────────────────────────────────────

  async login(
    email: string,
    password: string,
    rememberMe = false,
    ipAddress?: string,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    })

    if (!user) {
      throw new UnauthorizedException('Invalid email or password')
    }

    if (user.deletedAt) {
      throw new UnauthorizedException('Account has been deactivated')
    }

    // Lockout check
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      const remaining = Math.ceil(
        (user.lockedUntil.getTime() - Date.now()) / 60000,
      )
      throw new UnauthorizedException(
        `Account locked. Try again in ${remaining} minute(s)`,
      )
    }

    if (!user.passwordHash) {
      throw new UnauthorizedException(
        'This account uses social login. Please sign in with Google.',
      )
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash)
    if (!passwordValid) {
      await this.incrementLoginAttempt(email)
      throw new UnauthorizedException('Invalid email or password')
    }

    // Reset login attempts on success
    await this.prisma.user.update({
      where: { id: user.id },
      data: { loginAttempts: 0, lockedUntil: null },
    })

    const sessionToken = await this.createSession(user.id, rememberMe)

    await this.auditService.log({
      actorType: 'USER',
      actorId: user.id,
      action: 'USER_LOGIN',
      entityType: 'User',
      entityId: user.id,
      ipAddress,
    })

    return { user: this.sanitiseUser(user), sessionToken }
  }

  // ─── Google Login ─────────────────────────────────────────────────────────────

  async googleLogin(
    profile: {
      googleId: string
      email: string
      name: string
      avatarUrl?: string
    },
    ipAddress?: string,
  ) {
    let user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { googleId: profile.googleId },
          { email: profile.email.toLowerCase() },
        ],
      },
    })

    if (!user) {
      const referralCode = await this.generateUniqueReferralCode(profile.name)
      user = await this.prisma.user.create({
        data: {
          email: profile.email.toLowerCase(),
          name: profile.name,
          googleId: profile.googleId,
          avatarUrl: profile.avatarUrl ?? null,
          emailVerified: true,
          referralCode,
          acceptedTermsAt: new Date(),
        },
      })
      await this.notificationsService.sendWelcomeEmail(user.id)
    } else if (!user.googleId) {
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: {
          googleId: profile.googleId,
          avatarUrl: user.avatarUrl ?? profile.avatarUrl ?? null,
          emailVerified: true,
        },
      })
    }

    const sessionToken = await this.createSession(user.id, false)

    await this.auditService.log({
      actorType: 'USER',
      actorId: user.id,
      action: 'USER_GOOGLE_LOGIN',
      entityType: 'User',
      entityId: user.id,
      ipAddress,
    })

    return { user: this.sanitiseUser(user), sessionToken }
  }

  // ─── Logout ──────────────────────────────────────────────────────────────────

  async logout(sessionToken: string): Promise<void> {
    await this.prisma.session.deleteMany({ where: { token: sessionToken } })
  }

  // ─── Email Verification ──────────────────────────────────────────────────────

  async sendVerificationEmail(userId: string): Promise<void> {
    const token = this.cryptoService.generateToken(32)
    const expiresAt = new Date(
      Date.now() + EMAIL_VERIFY_TTL_HOURS * 60 * 60 * 1000,
    )

    await this.prisma.emailVerificationToken.upsert({
      where: { userId },
      create: { userId, token, expiresAt },
      update: { token, expiresAt },
    })

    await this.notificationsService.sendVerificationEmail(userId, token)
  }

  async verifyEmail(token: string): Promise<void> {
    const record = await this.prisma.emailVerificationToken.findUnique({
      where: { token },
      include: { user: true },
    })

    if (!record) {
      throw new BadRequestException('Invalid or expired verification token')
    }

    if (record.expiresAt < new Date()) {
      throw new BadRequestException('Verification token has expired')
    }

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: record.userId },
        data: { emailVerified: true },
      }),
      this.prisma.emailVerificationToken.delete({ where: { token } }),
    ])
  }

  // ─── Password Reset ──────────────────────────────────────────────────────────

  async forgotPassword(email: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    })
    // Silently succeed even if no account found (security best practice)
    if (!user || user.deletedAt) return

    const token = this.cryptoService.generateToken(32)
    const expiresAt = new Date(
      Date.now() + PASSWORD_RESET_TTL_HOURS * 60 * 60 * 1000,
    )

    await this.prisma.passwordResetToken.upsert({
      where: { userId: user.id },
      create: { userId: user.id, token, expiresAt },
      update: { token, expiresAt },
    })

    // Queue email
    await this.notificationsService.sendPasswordResetEmail(user.id, token)
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const record = await this.prisma.passwordResetToken.findUnique({
      where: { token },
    })

    if (!record) {
      throw new BadRequestException('Invalid or expired reset token')
    }

    if (record.expiresAt < new Date()) {
      await this.prisma.passwordResetToken.delete({ where: { token } })
      throw new BadRequestException('Reset token has expired')
    }

    const passwordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS)

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: record.userId },
        data: { passwordHash, loginAttempts: 0, lockedUntil: null },
      }),
      this.prisma.session.deleteMany({ where: { userId: record.userId } }),
      this.prisma.passwordResetToken.delete({ where: { token } }),
    ])
  }

  // ─── Session Management ──────────────────────────────────────────────────────

  async validateSession(token: string) {
    const session = await this.prisma.session.findUnique({
      where: { token },
      include: { user: true },
    })

    if (!session) return null
    if (session.expiresAt < new Date()) {
      await this.prisma.session.delete({ where: { token } })
      return null
    }
    if (session.user.deletedAt) return null

    return session.user
  }

  async refreshSession(oldToken: string) {
    const session = await this.prisma.session.findUnique({
      where: { token: oldToken },
    })
    if (!session) {
      throw new UnauthorizedException('Session not found')
    }

    await this.prisma.session.delete({ where: { token: oldToken } })
    const newToken = await this.createSession(session.userId, session.rememberMe)
    return { sessionToken: newToken }
  }

  // ─── Login Attempt Throttling ─────────────────────────────────────────────────

  async incrementLoginAttempt(email: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })
    if (!user) return

    const attempts = (user.loginAttempts ?? 0) + 1
    const update: any = { loginAttempts: attempts }

    if (attempts >= MAX_LOGIN_ATTEMPTS) {
      update.lockedUntil = new Date(
        Date.now() + LOCKOUT_WINDOW_MINUTES * 60 * 1000,
      )
    }

    await this.prisma.user.update({ where: { id: user.id }, data: update })
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  private async createSession(
    userId: string,
    rememberMe: boolean,
  ): Promise<string> {
    const token = this.cryptoService.generateToken(40)
    const ttlDays = rememberMe ? REMEMBER_SESSION_TTL_DAYS : SESSION_TTL_DAYS
    const expiresAt = new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000)

    await this.prisma.session.create({
      data: { userId, token, expiresAt, rememberMe },
    })

    return token
  }

  private async generateUniqueReferralCode(name: string): Promise<string> {
    const base = name
      .trim()
      .toUpperCase()
      .replace(/[^A-Z]/g, '')
      .slice(0, 4)
      .padEnd(4, 'X')

    for (let i = 0; i < 10; i++) {
      const suffix = Math.floor(1000 + Math.random() * 9000).toString()
      const code = `${base}-${suffix}`
      const exists = await this.prisma.user.findFirst({
        where: { referralCode: code },
      })
      if (!exists) return code
    }

    // Fallback: use a random token segment
    return `REF-${this.cryptoService.generateToken(4).toUpperCase()}`
  }

  private async applyReferralCode(
    code: string,
    newUserId: string,
  ): Promise<void> {
    const referrer = await this.prisma.user.findFirst({
      where: { referralCode: code },
    })
    if (!referrer || referrer.id === newUserId) return

    await this.prisma.referral
      .create({
        data: { referrerId: referrer.id, refereeId: newUserId },
      })
      .catch(() => {})
  }

  sanitiseUser(user: any) {
    const {
      passwordHash: _ph,
      loginAttempts: _la,
      lockedUntil: _lu,
      googleId: _gi,
      ...safe
    } = user
    return safe
  }
}
