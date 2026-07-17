import { byPlatform } from '../../helpers/platform.js';
import { waitForDisplayed } from '../../helpers/waits.js';
import { fillField, dismissCheckoutKeyboard, tapCheckoutControl } from './checkout.form.js';
import type { CheckoutAddressInput } from './checkout.types.js';
import { checkoutAddressSelectors as androidSelectors } from './checkoutAddress.selectors.android.js';
import { checkoutAddressSelectors as iosSelectors } from './checkoutAddress.selectors.ios.js';

class CheckoutAddressScreen {
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

  private get address1Field() {
    return $(this.selectors.address1Field);
  }

  private get address2Field() {
    return $(this.selectors.address2Field);
  }

  private get cityField() {
    return $(this.selectors.cityField);
  }

  private get stateRegionField() {
    return $(this.selectors.stateRegionField);
  }

  private get zipField() {
    return $(this.selectors.zipField);
  }

  private get countryField() {
    return $(this.selectors.countryField);
  }

  private get toPaymentButton() {
    return $(this.selectors.toPaymentButton);
  }

  async waitUntilLoaded(): Promise<void> {
    await waitForDisplayed(this.screen, {
      timeoutMsg: 'Expected Checkout Address screen to be displayed',
    });
  }

  async isDisplayed(): Promise<boolean> {
    await this.waitUntilLoaded();
    return this.screen.isDisplayed();
  }

  async fill(address: CheckoutAddressInput): Promise<void> {
    await this.waitUntilLoaded();
    await fillField(this.fullNameField, address.fullName, 'Expected full name field');
    await fillField(this.address1Field, address.address1, 'Expected address line 1 field');
    if (address.address2 !== undefined) {
      await fillField(this.address2Field, address.address2, 'Expected address line 2 field');
    }
    await fillField(this.cityField, address.city, 'Expected city field');
    await fillField(this.zipField, address.zip, 'Expected zip field');
    if (address.stateRegion !== undefined) {
      await fillField(
        this.stateRegionField,
        address.stateRegion,
        'Expected state/region field'
      );
    }
    await fillField(this.countryField, address.country, 'Expected country field');
    await dismissCheckoutKeyboard();
  }

  async continueToPayment(): Promise<void> {
    await this.waitUntilLoaded();
    await tapCheckoutControl(this.toPaymentButton, 'Expected To Payment button');
  }
}

export const CheckoutAddress = new CheckoutAddressScreen();
