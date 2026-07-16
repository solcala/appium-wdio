export type CartSelectors = {
  /** Control that opens the cart (header icon or tab) */
  readonly cartEntry: string;
  /** Identity for a non-empty cart */
  readonly screen: string;
  /** Identity for an empty cart */
  readonly emptyTitle: string;
  /** Empty-state CTA back to catalog */
  readonly goShoppingButton: string;
  /** Proceed to checkout CTA (non-empty cart) */
  readonly proceedToCheckoutButton: string;
  /** Increase quantity on a cart line item */
  readonly increaseQuantityButton: string;
  /** Decrease quantity on a cart line item */
  readonly decreaseQuantityButton: string;
  /** Remove line item control */
  readonly removeItemButton: string;
  /** Locator for a cart line by product name */
  productByName(name: string): string;
};
