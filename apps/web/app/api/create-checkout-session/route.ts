import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-03-25.dahlia' as any,
});

export async function POST(req: NextRequest) {
  try {
    // TODO: Set mode to "subscription" if selling recurring products.
    const mode: string = 'payment';

    const sessionParams: any = {
      ui_mode: 'form',
      mode,
      billing_address_collection: 'auto',
      phone_number_collection: {
        enabled: false,
      },
      automatic_tax: {
        enabled: false,
      },
      submit_type: 'auto',
      integration_identifier: 'custom_embedded_web_0001',
      line_items: [{ price: 'price_...', quantity: 1 }],
    };

    if (mode === 'subscription') {
      sessionParams.payment_method_collection = 'always';
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ client_secret: session.client_secret });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 },
    );
  }
}
