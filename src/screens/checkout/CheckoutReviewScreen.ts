import { byPlatform } from '../../helpers/platform.js';
import { waitAndClick, waitForDisplayed } from '../../helpers/waits.js';
import { checkoutReviewSelectors as androidSelectors } from './checkoutReview.selectors.android.js';
import { checkoutReviewSelectors as iosSelectors } from './checkoutReview.selectors.ios.js';

class CheckoutReviewScreen {
  private get selectors() {
    return byPlatform({
      android: androidSelectors,
      ios: iosSelectors,
    });
  }

  private get screen() {
    return $(this.selectors.screen);
  }

  private get placeOrderButton() {
    return $(this.selectors.placeOrderButton);
  }

  async waitUntilLoaded(): Promise<void> {
    await waitForDisplayed(this.screen, {
      timeoutMsg: 'Expected Checkout Review screen to be displayed',
    });
  }

  async isDisplayed(): Promise<boolean> {
    await this.waitUntilLoaded();
    return this.screen.isDisplayed();
  }

  async placeOrder(): Promise<void> {
    await this.waitUntilLoaded();
    const button = this.placeOrderButton;
    await waitForDisplayed(button, {
      timeoutMsg: 'Expected Place Order button to be displayed',
    });
    await button.scrollIntoView();
    await waitAndClick(button);
  }
}

export const CheckoutReview = new CheckoutReviewScreen();
