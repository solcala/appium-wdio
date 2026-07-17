import type { CheckoutCompleteSelectors } from './checkoutComplete.selectors.types.js';

/**
 * Locators from Sauce Labs My Demo App iOS TabBar storyboard / CheckoutComplete VC:
 * - CheckoutComplete-screen root
 * - ContinueShopping button identifier
 */
export const checkoutCompleteSelectors: CheckoutCompleteSelectors = {
  screen: '~CheckoutComplete-screen',
  // Full copy: "Thank you for your order. Your order has been dispatched..."
  thankYouMessage:
    '-ios predicate string:label CONTAINS "Thank you for your order"',
  continueShoppingButton: '~ContinueShopping',
};
