import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 12
const AUTH_TAG_LENGTH = 16

@Injectable()
export class CryptoService {
  private readonly key: Buffer

  constructor(private readonly configService: ConfigService) {
    const rawKey = this.configService.getOrThrow<string>('ENCRYPTION_KEY')
    // Accept either a 64-char hex string (32 bytes) or a 32-char raw string
    if (/^[0-9a-fA-F]{64}$/.test(rawKey)) {
      this.key = Buffer.from(rawKey, 'hex')
    } else {
      this.key = Buffer.from(rawKey.padEnd(32, '0').slice(0, 32), 'utf8')
    }
  }

  /**
   * Encrypts a plaintext string.
   * @returns base64-encoded string in the format: IV:ciphertext:authTag
   */
  encrypt(plaintext: string): string {
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv(ALGORITHM, this.key, iv, {
      authTagLength: AUTH_TAG_LENGTH,
    })

    const encrypted = Buffer.concat([
      cipher.update(plaintext, 'utf8'),
      cipher.final(),
    ])
    const authTag = cipher.getAuthTag()

    const ivB64 = iv.toString('base64')
    const ciphertextB64 = encrypted.toString('base64')
    const authTagB64 = authTag.toString('base64')

    return `${ivB64}:${ciphertextB64}:${authTagB64}`
  }

  /**
   * Decrypts a value produced by encrypt().
   * @param encrypted base64 IV:ciphertext:authTag
   */
  decrypt(encrypted: string): string {
    const parts = encrypted.split(':')
    if (parts.length !== 3) {
      throw new Error('Invalid encrypted payload format')
    }

    const [ivB64, ciphertextB64, authTagB64] = parts
    const iv = Buffer.from(ivB64, 'base64')
    const ciphertext = Buffer.from(ciphertextB64, 'base64')
    const authTag = Buffer.from(authTagB64, 'base64')

    const decipher = crypto.createDecipheriv(ALGORITHM, this.key, iv, {
      authTagLength: AUTH_TAG_LENGTH,
    })
    decipher.setAuthTag(authTag)

    const decrypted = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ])

    return decrypted.toString('utf8')
  }

  /**
   * Generates a cryptographically random token of the given byte length.
   * Returns a hex string.
   */
  generateToken(bytes = 32): string {
    return crypto.randomBytes(bytes).toString('hex')
  }

  /**
   * Creates a SHA-256 HMAC of the given data using the encryption key.
   */
  hmac(data: string): string {
    return crypto
      .createHmac('sha256', this.key)
      .update(data)
      .digest('hex')
  }
}
