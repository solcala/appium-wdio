import { byPlatform } from '../../helpers/platform.js';
import { waitAndClick, waitForDisplayed } from '../../helpers/waits.js';
import { checkoutCompleteSelectors as androidSelectors } from './checkoutComplete.selectors.android.js';
import { checkoutCompleteSelectors as iosSelectors } from './checkoutComplete.selectors.ios.js';

class CheckoutCompleteScreen {
  private get selectors() {
    return byPlatform({
      android: androidSelectors,
      ios: iosSelectors,
    });
  }

  private get screen() {
    return $(this.selectors.screen);
  }

  private get thankYouMessage() {
    return $(this.selectors.thankYouMessage);
  }

  private get continueShoppingButton() {
    return $(this.selectors.continueShoppingButton);
  }

  async waitUntilLoaded(): Promise<void> {
    await waitForDisplayed(this.screen, {
      timeoutMsg: 'Expected Checkout Complete screen to be displayed',
    });
  }

  async isDisplayed(): Promise<boolean> {
    await this.waitUntilLoaded();
    return this.screen.isDisplayed();
  }

  async waitForThankYou(): Promise<void> {
    await this.waitUntilLoaded();
    await waitForDisplayed(this.thankYouMessage, {
      timeoutMsg: 'Expected thank-you message on Checkout Complete',
    });
  }

  async continueShopping(): Promise<void> {
    await this.waitUntilLoaded();
    await waitAndClick(this.continueShoppingButton, {
      timeoutMsg: 'Expected Continue Shopping button to be displayed',
    });
  }
}

export const CheckoutComplete = new CheckoutCompleteScreen();
