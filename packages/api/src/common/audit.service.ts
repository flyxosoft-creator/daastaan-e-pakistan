import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

export interface AuditLogData {
  actorType: 'USER' | 'ADMIN' | 'SYSTEM' | 'GUIDE'
  actorId?: string
  action: string
  entityType?: string
  entityId?: string
  metadata?: Record<string, unknown>
  ipAddress?: string
}

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name)

  constructor(private readonly prisma: PrismaService) {}

  async log(data: AuditLogData): Promise<void> {
    try {
      await this.prisma.auditLog.create({
        data: {
          actorType: data.actorType,
          actorId: data.actorId ?? null,
          action: data.action,
          entityType: data.entityType ?? null,
          entityId: data.entityId ?? null,
          metadata: data.metadata ? (data.metadata as any) : undefined,
          ipAddress: data.ipAddress ?? null,
        },
      })
    } catch (err) {
      // Audit failures must never crash the main request
      this.logger.error('Failed to write audit log', err, data)
    }
  }
}
