import type { CheckoutCompleteSelectors } from './checkoutComplete.selectors.types.js';

export const checkoutCompleteSelectors: CheckoutCompleteSelectors = {
  screen: 'android=new UiSelector().text("Checkout Complete")',
  thankYouMessage: 'android=new UiSelector().text("Thank you for your order")',
  continueShoppingButton: '~Tap to open catalog',
};
