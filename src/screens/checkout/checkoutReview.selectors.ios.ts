import type { CheckoutReviewSelectors } from './checkoutReview.selectors.types.js';

/**
 * Locators from Sauce Labs My Demo App iOS TabBar storyboard:
 * - No dedicated Review-screen a11y id; use "Review your order" heading
 * - Place Order button title
 */
export const checkoutReviewSelectors: CheckoutReviewSelectors = {
  screen: '-ios predicate string:label == "Review your order"',
  placeOrderButton:
    '-ios class chain:**/XCUIElementTypeButton[`name == "Place Order"`]',
};
