import type {
  CheckoutAddressInput,
  CheckoutPaymentInput,
} from '../screens/checkout/checkout.types.js';
import { faker } from './faker.js';

/** Product used by the happy-path checkout flow (visible on both platforms). */
export const checkoutProductName = 'Sauce Labs Backpack';

/** Simple country names the demo checkout accepts without UI friction. */
const CHECKOUT_COUNTRIES = [
  'United Kingdom',
  'United States',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'Brazil',
  'Japan',
] as const;

function futureCardExpiry(): string {
  const date = faker.date.future({ years: 4 });
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${month}/${year}`;
}

function digitsOnlyCardNumber(): string {
  return faker.finance.creditCardNumber('################').replace(/\D/g, '');
}

function personName(): string {
  // Avoid titles/suffixes (e.g. "Ms.", "MD") that can confuse native field binding
  return `${faker.person.firstName()} ${faker.person.lastName()}`;
}

/** Generated shipping address for free-form checkout fields. */
export function standardShippingAddress(): CheckoutAddressInput {
  return {
    fullName: personName(),
    address1: faker.location.streetAddress(),
    address2: `Apt ${faker.number.int({ min: 1, max: 999 })}`,
    city: faker.location.city(),
    zip: faker.location.zipCode('#####'),
    country: faker.helpers.arrayElement(CHECKOUT_COUNTRIES),
  };
}

/**
 * Generated payment details.
 * Pass `fullName` to keep cardholder aligned with shipping (recommended).
 */
export function standardPayment(
  options: { readonly fullName?: string } = {}
): CheckoutPaymentInput {
  return {
    fullName: options.fullName ?? personName(),
    cardNumber: digitsOnlyCardNumber(),
    expirationDate: futureCardExpiry(),
    securityCode: faker.finance.creditCardCVV(),
  };
}
