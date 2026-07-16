import type { ProductDetailSelectors } from './productDetail.selectors.types.js';

/**
 * Locators from Sauce Labs My Demo App iOS storyboard / UITests PageObject:
 * - ProductDetails-screen root
 * - Add To Cart button title
 * - Qty via Amount identifier; plus/minus image buttons
 * - Colors: "{Color}ColorUnSelected Icons" (PageObject getColor)
 */
function normalizeColor(color: string): string {
  return color.charAt(0).toUpperCase() + color.slice(1).toLowerCase();
}

export const productDetailSelectors: ProductDetailSelectors = {
  screen: '~ProductDetails-screen',
  addToCartButton: '~Add To Cart',
  increaseQuantityButton: '~AddPlus Icons',
  decreaseQuantityButton: '~SubtractMinus Icons',
  quantityValue: '~Amount',
  colorByName: (color: string) => `~${normalizeColor(color)}ColorUnSelected Icons`,
};
