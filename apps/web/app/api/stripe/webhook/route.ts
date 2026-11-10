import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    // Log incoming webhook event
    console.log('[Stripe Webhook Received]', {
      hasSignature: !!signature,
      hasSecret: !!webhookSecret,
    });

    let event: any;

    try {
      event = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    // Process payment success event
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data?.object;
      const bookingId = paymentIntent?.metadata?.bookingId;

      console.log(`[Stripe] Successfully captured payment for booking: ${bookingId}`, {
        amount: paymentIntent?.amount,
        currency: paymentIntent?.currency,
      });

      // Booking state transitions to CONFIRMED
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('[Stripe Webhook Error]', err);
    return NextResponse.json(
      { error: err?.message || 'Webhook processing failed' },
      { status: 500 },
    );
  }
}

