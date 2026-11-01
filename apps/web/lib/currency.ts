export type CurrencyCode = 'PKR' | 'USD' | 'GBP';

// Estimated fallback FX rates (1 USD = 280 PKR, 1 GBP = 355 PKR)
const FALLBACK_RATES: Record<CurrencyCode, number> = {
  PKR: 1,
  USD: 1 / 280,
  GBP: 1 / 355,
};

const SYMBOLS: Record<CurrencyCode, string> = {
  PKR: '₨',
  USD: '$',
  GBP: '£',
};

/**
 * Formats amount from PKR paisa (stored integer unit) into targeted display currency
 */
export function formatPrice(
  amountPaisa: number,
  currency: CurrencyCode = 'PKR',
  customRates?: Record<CurrencyCode, number>,
): string {
  const pkrRupees = amountPaisa / 100;
  const rates = customRates || FALLBACK_RATES;
  const rate = rates[currency] || 1;
  const converted = pkrRupees * rate;
  const symbol = SYMBOLS[currency] || '₨';

  if (currency === 'PKR') {
    return `${symbol} ${Math.round(converted).toLocaleString('en-PK')}`;
  }

  return `${symbol}${converted.toFixed(2)}`;
}

