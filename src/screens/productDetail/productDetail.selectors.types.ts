export type ProductDetailSelectors = {
  /** Root / screen identity element for product details */
  readonly screen: string;
  /** Add-to-cart CTA */
  readonly addToCartButton: string;
  /** Increase quantity control */
  readonly increaseQuantityButton: string;
  /** Decrease quantity control */
  readonly decreaseQuantityButton: string;
  /** Current quantity value */
  readonly quantityValue: string;
  /** Color swatch by color name (e.g. Black, Green, Gray, Blue) */
  colorByName(color: string): string;
};
