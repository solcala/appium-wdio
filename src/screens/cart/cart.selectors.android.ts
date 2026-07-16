import type { CartSelectors } from './cart.selectors.types.js';

export const cartSelectors: CartSelectors = {
  cartEntry: '~View cart',
  screen: 'android=new UiSelector().text("My Cart")',
  emptyTitle: 'android=new UiSelector().text("No Items")',
  goShoppingButton: 'android=new UiSelector().text("Go Shopping")',
  proceedToCheckoutButton: '~Confirms products for checkout',
  increaseQuantityButton: '~Increase item quantity',
  decreaseQuantityButton: '~Decrease item quantity',
  removeItemButton: '~Removes product from cart',
  productByName: (name: string) => `android=new UiSelector().text("${name}")`,
};
