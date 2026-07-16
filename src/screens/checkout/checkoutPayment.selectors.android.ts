import type { CheckoutPaymentSelectors } from './checkoutPayment.selectors.types.js';

export const checkoutPaymentSelectors: CheckoutPaymentSelectors = {
  screen: 'android=new UiSelector().text("Enter a payment method")',
  fullNameField: 'android=new UiSelector().resourceIdMatches(".*:id/nameET")',
  cardNumberField: 'android=new UiSelector().resourceIdMatches(".*:id/cardNumberET")',
  expirationDateField:
    'android=new UiSelector().resourceIdMatches(".*:id/expirationDateET")',
  securityCodeField:
    'android=new UiSelector().resourceIdMatches(".*:id/securityCodeET")',
  reviewOrderButton:
    '~Saves payment info and launches screen to review checkout data',
};
