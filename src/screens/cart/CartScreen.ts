import { byPlatform, isIOS } from '../../helpers/platform.js';
import { waitAndClick, waitForDisplayed } from '../../helpers/waits.js';
import { cartSelectors as androidSelectors } from './cart.selectors.android.js';
import { cartSelectors as iosSelectors } from './cart.selectors.ios.js';

class CartScreen {
  private get selectors() {
    return byPlatform({
      android: androidSelectors,
      ios: iosSelectors,
    });
  }

  private get cartEntry() {
    return $(this.selectors.cartEntry);
  }

  private get screen() {
    return $(this.selectors.screen);
  }

  private get emptyTitle() {
    return $(this.selectors.emptyTitle);
  }

  private get goShoppingButton() {
    return $(this.selectors.goShoppingButton);
  }

  private get proceedToCheckoutButton() {
    return $(this.selectors.proceedToCheckoutButton);
  }

  private get increaseQuantityButton() {
    return $(this.selectors.increaseQuantityButton);
  }

  private get decreaseQuantityButton() {
    return $(this.selectors.decreaseQuantityButton);
  }

  private get removeItemButton() {
    return $(this.selectors.removeItemButton);
  }

  private productByName(name: string) {
    return $(this.selectors.productByName(name));
  }

  async open(): Promise<void> {
    await waitAndClick(this.cartEntry, {
      timeoutMsg: 'Expected cart entry control to be displayed',
    });
    await this.waitUntilLoaded();
  }

  /**
   * Cart can open empty or with items. iOS always exposes Cart-screen;
   * Android shows either "My Cart" or "No Items".
   */
  async waitUntilLoaded(): Promise<void> {
    if (isIOS()) {
      await waitForDisplayed(this.screen, {
        timeoutMsg: 'Expected Cart screen to be displayed',
      });
      return;
    }

    await browser.waitUntil(
      async () => {
        const hasItems = await this.screen.isDisplayed().catch(() => false);
        const isEmpty = await this.emptyTitle.isDisplayed().catch(() => false);
        return hasItems || isEmpty;
      },
      {
        timeout: 15_000,
        timeoutMsg: 'Expected Cart screen (My Cart or No Items) to be displayed',
      }
    );
  }

  async waitUntilEmpty(): Promise<void> {
    await waitForDisplayed(this.emptyTitle, {
      timeoutMsg: 'Expected empty cart ("No Items") to be displayed',
    });
  }

  async isEmpty(): Promise<boolean> {
    await this.waitUntilLoaded();
    return this.emptyTitle.isDisplayed();
  }

  async waitForProduct(name: string): Promise<void> {
    await this.waitUntilLoaded();
    const product = this.productByName(name);
    await waitForDisplayed(product, {
      timeoutMsg: `Expected product "${name}" to be displayed in the cart`,
    });
  }

  async hasProduct(name: string): Promise<boolean> {
    await this.waitForProduct(name);
    return this.productByName(name).isDisplayed();
  }

  async increaseQuantity(): Promise<void> {
    await this.waitUntilLoaded();
    await waitAndClick(this.increaseQuantityButton, {
      timeoutMsg: 'Expected increase quantity control to be displayed in the cart',
    });
  }

  async decreaseQuantity(): Promise<void> {
    await this.waitUntilLoaded();
    await waitAndClick(this.decreaseQuantityButton, {
      timeoutMsg: 'Expected decrease quantity control to be displayed in the cart',
    });
  }

  async removeItem(): Promise<void> {
    await this.waitUntilLoaded();
    await waitAndClick(this.removeItemButton, {
      timeoutMsg: 'Expected Remove Item control to be displayed in the cart',
    });
  }

  async goShopping(): Promise<void> {
    await this.waitUntilEmpty();
    await waitAndClick(this.goShoppingButton, {
      timeoutMsg: 'Expected Go Shopping button to be displayed on empty cart',
    });
  }

  async proceedToCheckout(): Promise<void> {
    await this.waitUntilLoaded();
    const button = this.proceedToCheckoutButton;
    await waitForDisplayed(button, {
      timeoutMsg: 'Expected Proceed To Checkout button to be displayed',
    });
    await button.scrollIntoView();
    await waitAndClick(button);
  }
}

export const Cart = new CartScreen();
