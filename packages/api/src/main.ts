import { NestFactory } from '@nestjs/core'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import helmet from 'helmet'
import * as cookieParser from 'cookie-parser'
import * as compression from 'compression'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  })

  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT', 4000)
  const isProduction = configService.get<string>('NODE_ENV') === 'production'

  // ─── Security Middleware ──────────────────────────────────────────────────
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: isProduction,
    }),
  )
  app.use(cookieParser())
  app.use(compression())

  // ─── CORS ─────────────────────────────────────────────────────────────────
  app.enableCors({
    origin: configService.get<string>('ALLOWED_ORIGINS', 'http://localhost:3000').split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })

  // ─── Global Prefix & Versioning ───────────────────────────────────────────
  app.setGlobalPrefix('api')
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })

  // ─── Validation Pipe ──────────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )

  // ─── Swagger / OpenAPI ────────────────────────────────────────────────────
  if (!isProduction) {
    const config = new DocumentBuilder()
      .setTitle('Daastaan-e-Pakistan API')
      .setDescription('REST API for the Daastaan-e-Pakistan tourism marketplace')
      .setVersion('1.0')
      .addBearerAuth()
      .addCookieAuth('session')
      .addTag('Auth', 'Authentication & session management')
      .addTag('Users', 'Customer profile management')
      .addTag('Cities', 'City catalog & SEO pages')
      .addTag('Packages', 'Package listings & catalog')
      .addTag('Guides', 'Guide profiles & availability')
      .addTag('Bookings', 'Booking flow & state management')
      .addTag('Payments', 'Stripe & Safepay payment processing')
      .addTag('Reviews', 'Review submission & moderation')
      .addTag('Safety', 'SOS alerts & live trip tracking')
      .addTag('Referrals', 'Referral codes & credit wallet')
      .addTag('PromoCodes', 'Promo code management')
      .addTag('Newsletter', 'Newsletter subscription')
      .addTag('Content', 'Blog, FAQ & static page content')
      .addTag('Analytics', 'Admin analytics & reporting')
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: { persistAuthorization: true },
    })

    console.log(`📚 Swagger docs: http://localhost:${port}/api/docs`)
  }

  await app.listen(port)
  console.log(`🚀 Daastaan-e-Pakistan API running on http://localhost:${port}/api/v1`)
}

bootstrap()

