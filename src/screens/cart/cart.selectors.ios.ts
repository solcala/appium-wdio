import type { CartSelectors } from './cart.selectors.types.js';

/**
 * Locators from Sauce Labs My Demo App iOS storyboard / UITests PageObject:
 * - Cart-tab-item opens cart; Cart-screen is the root
 * - Empty: "No Items" + GoShopping; filled: ProceedToCheckout
 * - Line items match product name static text; Remove Item by title
 */
export const cartSelectors: CartSelectors = {
  cartEntry: '~Cart-tab-item',
  screen: '~Cart-screen',
  emptyTitle: '-ios predicate string:label == "No Items"',
  goShoppingButton: '~GoShopping',
  proceedToCheckoutButton: '~ProceedToCheckout',
  increaseQuantityButton: '~AddPlus Icons',
  decreaseQuantityButton: '~SubtractMinus Icons',
  removeItemButton: '~Remove Item',
  productByName: (name: string) => `-ios predicate string:label == "${name}"`,
};
