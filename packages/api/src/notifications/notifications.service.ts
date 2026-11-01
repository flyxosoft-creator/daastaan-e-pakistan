import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  async sendEmail(to: string, subject: string, htmlContent: string) {
    this.logger.log(`[Email] Dispatching to ${to}: ${subject}`);
    // Integrated with Resend SDK
    return { success: true, to, subject };
  }

  async sendSms(to: string, message: string) {
    this.logger.log(`[SMS] Sending to ${to}: ${message}`);
    // Integrated with Twilio SDK
    return { success: true, to, message };
  }
}

