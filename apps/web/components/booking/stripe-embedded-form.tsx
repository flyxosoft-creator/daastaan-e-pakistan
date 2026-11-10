'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getConvertedAmount } from '@/lib/currency';

interface StripeEmbeddedFormProps {
  totalAmountPaisa: number;
  currency: 'USD' | 'GBP';
  packageTitle: string;
  partySize: number;
}

declare global {
  interface Window {
    Stripe?: any;
  }
}

const appearance = {
  theme: 'stripe',
  labels: 'auto',
  inputs: 'spaced',
  variables: {
    borderRadius: '4px',
    colorBackground: '#ffffff',
    colorDanger: '#df1b41',
    colorPrimary: '#0570de',
    colorSuccess: '#00c853',
    colorText: '#30313d',
    fontFamily: 'default',
    fontSizeBase: '16px',
    spacingUnit: '4px',
  },
};

export function StripeEmbeddedForm({
  totalAmountPaisa,
  currency,
  packageTitle,
  partySize,
}: StripeEmbeddedFormProps) {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    async function initCheckout() {
      try {
        const publishableKey =
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
          'pk_test_51UZu73KPggU2D3Z1IL1s4EY9YxPaKMLJtMcUcwMvpw3TeuGq1cHIh9u3It4XVh3sJIYSNzYm7CN40rU8WXhf6ccg00q8ACzwYD';

        // Ensure Stripe.js (dahlia) is injected and loaded
        if (!window.Stripe) {
          await new Promise<void>((resolve, reject) => {
            const existingScript = document.querySelector(
              'script[src="https://js.stripe.com/dahlia/stripe.js"]',
            );
            if (existingScript && window.Stripe) {
              resolve();
              return;
            }
            if (existingScript) {
              existingScript.addEventListener('load', () => resolve());
              existingScript.addEventListener('error', () =>
                reject(new Error('Failed to load Stripe.js')),
              );
            } else {
              const script = document.createElement('script');
              script.src = 'https://js.stripe.com/dahlia/stripe.js';
              script.async = true;
              script.onload = () => resolve();
              script.onerror = () => reject(new Error('Failed to load Stripe.js from js.stripe.com'));
              document.head.appendChild(script);
            }
          });
        }

        if (!window.Stripe) {
          throw new Error('Stripe.js object unavailable after loading.');
        }

        const stripe = window.Stripe(publishableKey);

        const convertedAmount = getConvertedAmount(totalAmountPaisa, currency);

        const clientSecret = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: convertedAmount,
            currency: currency.toLowerCase(),
            packageTitle,
            partySize,
          }),
        })
          .then(async (res) => {
            const data = await res.json();
            if (!res.ok || data.error) {
              throw new Error(data.error || `HTTP ${res.status} from create-checkout-session`);
            }
            return data.client_secret;
          });

        if (!clientSecret) {
          throw new Error('No client_secret returned from server.');
        }

        const checkout = stripe.initCheckoutFormSdk({ clientSecret, appearance });

        const form = checkout.createForm({ layout: 'expanded' });
        form.mount('#checkout-form');

        const loadActionsResult = await checkout.loadActions();
        if (loadActionsResult.type === 'success') {
          form.on('confirm', async (event: any) => {
            try {
              const result = await loadActionsResult.actions.confirm({ formConfirmEvent: event });
              if (result?.type === 'success' || !result?.error) {
                window.location.href = '/booking/BK-1090/success?payment_success=true';
              }
            } catch (error) {
              console.error('Payment confirmation error:', error);
            }
          });
        }

        setLoading(false);
      } catch (err: any) {
        console.error('Failed to initialize Stripe embedded form:', err);
        setErrorMessage(err?.message || 'Failed to initialize payment form');
        setLoading(false);
      }
    }

    initCheckout();
  }, [totalAmountPaisa, currency, packageTitle, partySize]);

  return (
    <div className="space-y-4">
      {loading && (
        <div className="p-6 text-center text-xs text-gray-500 animate-pulse bg-gray-50 rounded-xl border border-gray-200">
          Initializing secure Stripe checkout form...
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
          <strong>Notice:</strong> {errorMessage}
        </div>
      )}

      {/* Container element where the form renders */}
      <div id="checkout-form" className="min-h-[200px]" />
    </div>
  );
}
