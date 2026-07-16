import type { CheckoutReviewSelectors } from './checkoutReview.selectors.types.js';

export const checkoutReviewSelectors: CheckoutReviewSelectors = {
  screen: 'android=new UiSelector().text("Review your order")',
  placeOrderButton: '~Completes the process of checkout',
};
