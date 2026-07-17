import type { CheckoutPaymentSelectors } from './checkoutPayment.selectors.types.js';

/**
 * Locators from Sauce Labs My Demo App iOS TabBar storyboard:
 * - Payment-screen root
 * - Card fields matched by empty-state placeholder values
 * - Review Order button title (no dedicated a11y id)
 */
export const checkoutPaymentSelectors: CheckoutPaymentSelectors = {
  screen: '~Payment-screen',
  fullNameField: '-ios predicate string:value == "Maxim Winter"',
  cardNumberField: '-ios predicate string:value == "3258 1265 7568 7896"',
  expirationDateField: '-ios predicate string:value == "03/25"',
  securityCodeField: '-ios predicate string:value == "123"',
  reviewOrderButton:
    '-ios class chain:**/XCUIElementTypeButton[`name == "Review Order"`]',
};
