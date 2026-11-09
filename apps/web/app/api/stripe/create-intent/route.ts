import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bookingId, amount, currency = 'USD' } = body;

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    // Convert amount to cents (Stripe requires integer smallest currency unit)
    const amountInCents = Math.round(Number(amount || 50) * 100);

    // If real Stripe secret key is present in environment, call official Stripe API
    if (stripeSecretKey && stripeSecretKey.startsWith('sk_')) {
      const response = await fetch('https://api.stripe.com/v1/payment_intents', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${stripeSecretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          amount: amountInCents.toString(),
          currency: (currency || 'usd').toLowerCase(),
          'automatic_payment_methods[enabled]': 'true',
          'metadata[bookingId]': bookingId || 'draft',
          description: `Daastaan-e-Pakistan Tour Booking: ${bookingId}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return NextResponse.json(
          { error: data.error?.message || 'Stripe payment intent creation failed' },
          { status: response.status },
        );
      }

      return NextResponse.json({
        clientSecret: data.client_secret,
        publishableKey: stripePublishableKey,
        isLiveMode: !stripeSecretKey.startsWith('sk_test_'),
      });
    }

    // Informational fallback when Stripe keys are not yet configured in environment
    return NextResponse.json({
      clientSecret: `pi_mock_${bookingId || 'sample'}_secret_test123`,
      publishableKey: stripePublishableKey || 'pk_test_sample',
      isLiveMode: false,
      requiresSetup: true,
      message: 'Add STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to enable live card charging.',
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Internal server error' },
      { status: 500 },
    );
  }
}
