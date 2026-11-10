'use client';

import React, { useEffect, useRef, useState } from 'react';

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

export function StripeEmbeddedForm() {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    async function initCheckout() {
      try {
        const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';

        // Wait for Stripe.js (dahlia) to be available on window
        if (!window.Stripe) {
          await new Promise<void>((resolve) => {
            const check = setInterval(() => {
              if (window.Stripe) {
                clearInterval(check);
                resolve();
              }
            }, 100);
            setTimeout(() => {
              clearInterval(check);
              resolve();
            }, 5000);
          });
        }

        if (!window.Stripe) {
          throw new Error('Stripe.js failed to load from https://js.stripe.com/dahlia/stripe.js');
        }

        const stripe = window.Stripe(publishableKey);

        const clientSecret = fetch('/api/create-checkout-session', { method: 'POST' })
          .then((response) => response.json())
          .then((json) => {
            if (json.error) throw new Error(json.error);
            return json.client_secret;
          });

        const checkout = stripe.initCheckoutFormSdk({ clientSecret, appearance });

        const form = checkout.createForm({ layout: 'expanded' });
        form.mount('#checkout-form');

        const loadActionsResult = await checkout.loadActions();
        if (loadActionsResult.type === 'success') {
          form.on('confirm', async (event: any) => {
            try {
              await loadActionsResult.actions.confirm({ formConfirmEvent: event });
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
  }, []);

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
