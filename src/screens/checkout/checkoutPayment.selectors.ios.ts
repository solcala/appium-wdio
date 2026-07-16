import type { CheckoutPaymentSelectors } from './checkoutPayment.selectors.types.js';

/**
 * Locators from Sauce Labs My Demo App iOS TabBar storyboard:
 * - Payment-screen root
 * - Card fields ordered before optional billing address: name, number, expiry, CVV
 * - Review Order button title (no dedicated a11y id)
 */
const screenRoot = '**/XCUIElementTypeOther[`name == "Payment-screen"`]';

export const checkoutPaymentSelectors: CheckoutPaymentSelectors = {
  screen: '~Payment-screen',
  fullNameField: `-ios class chain:${screenRoot}/**/XCUIElementTypeTextField[1]`,
  cardNumberField: `-ios class chain:${screenRoot}/**/XCUIElementTypeTextField[2]`,
  expirationDateField: `-ios class chain:${screenRoot}/**/XCUIElementTypeTextField[3]`,
  securityCodeField: `-ios class chain:${screenRoot}/**/XCUIElementTypeTextField[4]`,
  reviewOrderButton:
    '-ios class chain:**/XCUIElementTypeButton[`name == "Review Order"`]',
};
