import { byPlatform } from '../../helpers/platform.js';
import { waitAndClick, waitForDisplayed } from '../../helpers/waits.js';
import { fillField } from './checkout.form.js';
import type { CheckoutPaymentInput } from './checkout.types.js';
import { checkoutPaymentSelectors as androidSelectors } from './checkoutPayment.selectors.android.js';
import { checkoutPaymentSelectors as iosSelectors } from './checkoutPayment.selectors.ios.js';

class CheckoutPaymentScreen {
  private get selectors() {
    return byPlatform({
      android: androidSelectors,
      ios: iosSelectors,
    });
  }

  private get screen() {
    return $(this.selectors.screen);
  }

  private get fullNameField() {
    return $(this.selectors.fullNameField);
  }

  private get cardNumberField() {
    return $(this.selectors.cardNumberField);
  }

  private get expirationDateField() {
    return $(this.selectors.expirationDateField);
  }

  private get securityCodeField() {
    return $(this.selectors.securityCodeField);
  }

  private get reviewOrderButton() {
    return $(this.selectors.reviewOrderButton);
  }

  async waitUntilLoaded(): Promise<void> {
    await waitForDisplayed(this.screen, {
      timeoutMsg: 'Expected Checkout Payment screen to be displayed',
    });
  }

  async isDisplayed(): Promise<boolean> {
    await this.waitUntilLoaded();
    return this.screen.isDisplayed();
  }

  async fill(payment: CheckoutPaymentInput): Promise<void> {
    await this.waitUntilLoaded();
    await fillField(
      this.fullNameField,
      payment.fullName,
      'Expected cardholder name field'
    );
    await fillField(
      this.cardNumberField,
      payment.cardNumber,
      'Expected card number field'
    );
    await fillField(
      this.expirationDateField,
      payment.expirationDate,
      'Expected expiration date field'
    );
    await fillField(
      this.securityCodeField,
      payment.securityCode,
      'Expected security code field'
    );
  }

  async continueToReview(): Promise<void> {
    await this.waitUntilLoaded();
    const button = this.reviewOrderButton;
    await button.scrollIntoView();
    await waitAndClick(button, {
      timeoutMsg: 'Expected Review Order button to be displayed',
    });
  }
}

export const CheckoutPayment = new CheckoutPaymentScreen();
