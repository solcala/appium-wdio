import type {
  CheckoutAddressInput,
  CheckoutPaymentInput,
} from '../screens/checkout/checkout.types.js';

/** Product used by the happy-path checkout flow (visible on both platforms). */
export const checkoutProductName = 'Sauce Labs Backpack';

/**
 * Shipping address for happy-path checkout.
 * Matches My Demo App sample hints; state omitted (optional + flaky on Android).
 */
export const standardShippingAddress: CheckoutAddressInput = {
  fullName: 'Rebecca Winter',
  address1: 'Mandorley 112',
  address2: 'Entrance 1',
  city: 'Truro',
  zip: '89750',
  country: 'United Kingdom',
};

/**
 * Payment details for happy-path checkout.
 * Card number is digits only; expiry is in the future relative to 2026.
 */
export const standardPayment: CheckoutPaymentInput = {
  fullName: 'Rebecca Winter',
  cardNumber: '3258125675687891',
  expirationDate: '12/30',
  securityCode: '123',
};
