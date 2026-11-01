import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { ScheduleModule } from '@nestjs/schedule'
import { BullModule } from '@nestjs/bull'

import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { CitiesModule } from './cities/cities.module'
import { GuidesModule } from './guides/guides.module'
import { PackagesModule } from './packages/packages.module'
import { BookingsModule } from './bookings/bookings.module'
import { PaymentsModule } from './payments/payments.module'
import { ReviewsModule } from './reviews/reviews.module'
import { SafetyModule } from './safety/safety.module'
import { ReferralsModule } from './referrals/referrals.module'
import { PromoCodesModule } from './promo-codes/promo-codes.module'
import { NewsletterModule } from './newsletter/newsletter.module'
import { ContentModule } from './content/content.module'
import { AnalyticsModule } from './analytics/analytics.module'
import { NotificationsModule } from './notifications/notifications.module'
import { CommonModule } from './common/common.module'

@Module({
  imports: [
    // ─── Config ─────────────────────────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // ─── Rate Limiting ───────────────────────────────────────────────────
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          name: 'short',
          ttl: 1000,
          limit: 10,
        },
        {
          name: 'medium',
          ttl: 60000,
          limit: config.get<number>('RATE_LIMIT_RPM', 100),
        },
      ],
    }),

    // ─── Scheduled Jobs ──────────────────────────────────────────────────
    ScheduleModule.forRoot(),

    // ─── Bull Queues (Email, SMS, Webhooks) ──────────────────────────────
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get<string>('REDIS_HOST', 'localhost'),
          port: config.get<number>('REDIS_PORT', 6379),
          password: config.get<string>('REDIS_PASSWORD'),
        },
      }),
    }),

    // ─── Core ────────────────────────────────────────────────────────────
    PrismaModule,
    CommonModule,
    NotificationsModule,

    // ─── Domain Modules ──────────────────────────────────────────────────
    AuthModule,
    UsersModule,
    CitiesModule,
    GuidesModule,
    PackagesModule,
    BookingsModule,
    PaymentsModule,
    ReviewsModule,
    SafetyModule,
    ReferralsModule,
    PromoCodesModule,
    NewsletterModule,
    ContentModule,
    AnalyticsModule,
  ],
})
export class AppModule {}

