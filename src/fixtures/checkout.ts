import type {
  CheckoutAddressInput,
  CheckoutPaymentInput,
} from '../screens/checkout/checkout.types.js';

/** Product used by the happy-path checkout flow (visible on both platforms). */
export const checkoutProductName = 'Sauce Labs Backpack';

/**
 * Shipping address matching My Demo App field hints / common sample data.
 */
export const standardShippingAddress: CheckoutAddressInput = {
  fullName: 'Rebecca Winter',
  address1: 'Mandorley 112',
  address2: 'Entrance 1',
  city: 'Truro',
  stateRegion: 'Cornwall',
  zip: '89750',
  country: 'United Kingdom',
};

/**
 * Payment details matching My Demo App field hints.
 * Card number is digits only (screens type into the fields as-is).
 */
export const standardPayment: CheckoutPaymentInput = {
  fullName: 'Rebecca Winter',
  cardNumber: '3258125675687891',
  expirationDate: '03/25',
  securityCode: '123',
};
