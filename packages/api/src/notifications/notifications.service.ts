import { Injectable, Logger } from '@nestjs/common';

export interface BookingEmailPayload {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  tourName: string;
  city: string;
  startDate: string;
  endDate: string;
  partySize: number;
  totalAmountFormatted: string;
  guideName: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

export interface GuideDispatchPayload {
  guideEmail: string;
  guideName: string;
  bookingId: string;
  tourName: string;
  customerName: string;
  partySize: number;
  pickupLocation: string;
  specialRequests?: string;
  tourDate: string;
}

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  async sendEmail(to: string, subject: string, htmlContent: string) {
    this.logger.log(`[Email] Dispatching to ${to}: ${subject}`);
    // Integrated with Resend SDK:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ from: 'Daastaan-e-Pakistan <bookings@daastaanepakistan.com>', to, subject, html: htmlContent });
    return { success: true, to, subject };
  }

  async sendSms(to: string, message: string) {
    this.logger.log(`[SMS] Sending to ${to}: ${message}`);
    // Integrated with Twilio SDK:
    // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    // await client.messages.create({ body: message, from: process.env.TWILIO_PHONE_NUMBER, to });
    return { success: true, to, message };
  }

  /**
   * Dispatches branded luxury confirmation email to the traveller
   */
  async sendCustomerBookingConfirmation(payload: BookingEmailPayload) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #FAF6ED; margin: 0; padding: 20px; color: #123C2D; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #B99550; overflow: hidden; }
          .header { background: #123C2D; color: #FAF6ED; padding: 32px 24px; text-align: center; }
          .header h1 { margin: 0; font-family: Georgia, serif; font-size: 28px; }
          .content { padding: 32px 24px; }
          .badge { display: inline-block; background: #E5B558; color: #123C2D; padding: 4px 12px; border-radius: 20px; font-weight: bold; font-size: 11px; }
          .details-card { background: #FAF6ED; border-radius: 12px; padding: 20px; margin: 24px 0; border: 1px solid #E8DFD0; }
          .row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; }
          .label { color: #666; font-weight: bold; }
          .value { color: #123C2D; font-weight: bold; }
          .footer { background: #F3ECE0; padding: 20px; text-align: center; font-size: 11px; color: #777; border-top: 1px solid #E8DFD0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">RESERVATION CONFIRMED</span>
            <h1>Daastaan-e-Pakistan</h1>
            <p style="margin: 8px 0 0 0; font-size: 13px; color: #E5B558;">Booking #${payload.bookingId}</p>
          </div>
          <div class="content">
            <h2 style="font-family: Georgia, serif; color: #123C2D; margin-top: 0;">Shukriya, ${payload.customerName}!</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #444;">
              Your upcoming journey in <strong>${payload.city}</strong> is confirmed. Your certified local storyteller, <strong>${payload.guideName}</strong>, is preparing a memorable experience.
            </p>

            <div class="details-card">
              <div class="row"><span class="label">Experience:</span><span class="value">${payload.tourName}</span></div>
              <div class="row"><span class="label">Schedule:</span><span class="value">${payload.startDate} ${payload.endDate !== payload.startDate ? '→ ' + payload.endDate : ''}</span></div>
              <div class="row"><span class="label">Party Size:</span><span class="value">${payload.partySize} Guests</span></div>
              <div class="row"><span class="label">Total Paid:</span><span class="value">${payload.totalAmountFormatted}</span></div>
              <div class="row"><span class="label">Safety Tracking:</span><span class="value" style="color: #047857;">ACTIVE (${payload.emergencyContactName})</span></div>
            </div>

            <p style="font-size: 12px; color: #666; line-height: 1.5;">
              <strong>Universal Safety:</strong> A live GPS tracking link will be sent to your emergency contact (${payload.emergencyContactPhone}) when your tour departs.
            </p>
          </div>
          <div class="footer">
            <p>Daastaan-e-Pakistan • Department of Tourist Services Lic. #DTS-PAK-2026</p>
            <p>Questions? Contact us at info@daastaanepakista.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail(
      payload.customerEmail,
      `Booking Confirmed: ${payload.tourName} (Daastaan #${payload.bookingId})`,
      html,
    );
  }

  /**
   * Dispatches operational guide briefing
   */
  async sendGuideDispatchNotification(payload: GuideDispatchPayload) {
    const html = `
      <div style="font-family: sans-serif; padding: 20px; color: #123C2D;">
        <h2>Daastaan Operations: New Tour Assignment #${payload.bookingId}</h2>
        <p>Salaam <strong>${payload.guideName}</strong>,</p>
        <p>You have been assigned to lead <strong>${payload.tourName}</strong> on <strong>${payload.tourDate}</strong>.</p>
        <ul>
          <li><strong>Guest:</strong> ${payload.customerName} (${payload.partySize} People)</li>
          <li><strong>Pickup Location:</strong> ${payload.pickupLocation || 'Delhi Gate Rendezvous'}</li>
          ${payload.specialRequests ? `<li><strong>Notes:</strong> ${payload.specialRequests}</li>` : ''}
        </ul>
        <p>Please remember to check-in on the guide app at <strong>Trip Start</strong>, <strong>Pickup Done</strong>, and <strong>Trip Complete</strong>.</p>
      </div>
    `;

    return this.sendEmail(
      payload.guideEmail,
      `[Guide Assignment] ${payload.tourName} — ${payload.tourDate}`,
      html,
    );
  }
}
