import type { ProductDetailSelectors } from './productDetail.selectors.types.js';

function normalizeColor(color: string): string {
  return color.charAt(0).toUpperCase() + color.slice(1).toLowerCase();
}

export const productDetailSelectors: ProductDetailSelectors = {
  screen: '~Displays selected product',
  addToCartButton: '~Tap to add product to cart',
  increaseQuantityButton: '~Increase item quantity',
  decreaseQuantityButton: '~Decrease item quantity',
  quantityValue: 'android=new UiSelector().resourceIdMatches(".*:id/noTV")',
  colorByName: (color: string) => `~${normalizeColor(color)} color`,
};
