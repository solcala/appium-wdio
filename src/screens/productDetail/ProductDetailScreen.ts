import { byPlatform } from '../../helpers/platform.js';
import { waitAndClick, waitForDisplayed } from '../../helpers/waits.js';
import { productDetailSelectors as androidSelectors } from './productDetail.selectors.android.js';
import { productDetailSelectors as iosSelectors } from './productDetail.selectors.ios.js';

class ProductDetailScreen {
  private get selectors() {
    return byPlatform({
      android: androidSelectors,
      ios: iosSelectors,
    });
  }

  private get screen() {
    return $(this.selectors.screen);
  }

  private get addToCartButton() {
    return $(this.selectors.addToCartButton);
  }

  private get increaseQuantityButton() {
    return $(this.selectors.increaseQuantityButton);
  }

  private get decreaseQuantityButton() {
    return $(this.selectors.decreaseQuantityButton);
  }

  private get quantityValue() {
    return $(this.selectors.quantityValue);
  }

  private colorByName(color: string) {
    return $(this.selectors.colorByName(color));
  }

  async waitUntilLoaded(): Promise<void> {
    await waitForDisplayed(this.screen, {
      timeoutMsg: 'Expected Product Detail screen to be displayed',
    });
  }

  async isDisplayed(): Promise<boolean> {
    await this.waitUntilLoaded();
    return this.screen.isDisplayed();
  }

  async selectColor(color: string): Promise<void> {
    await this.waitUntilLoaded();
    const swatch = this.colorByName(color);
    await waitForDisplayed(swatch, {
      timeoutMsg: `Expected color "${color}" to be displayed on Product Detail`,
    });
    await swatch.scrollIntoView();
    await waitAndClick(swatch);
  }

  async increaseQuantity(): Promise<void> {
    await this.waitUntilLoaded();
    await waitAndClick(this.increaseQuantityButton, {
      timeoutMsg: 'Expected increase quantity control to be displayed',
    });
  }

  async decreaseQuantity(): Promise<void> {
    await this.waitUntilLoaded();
    await waitAndClick(this.decreaseQuantityButton, {
      timeoutMsg: 'Expected decrease quantity control to be displayed',
    });
  }

  async getQuantity(): Promise<string> {
    await this.waitUntilLoaded();
    await waitForDisplayed(this.quantityValue, {
      timeoutMsg: 'Expected quantity value to be displayed',
    });
    return this.quantityValue.getText();
  }

  async addToCart(): Promise<void> {
    await this.waitUntilLoaded();
    const button = this.addToCartButton;
    await button.scrollIntoView();
    await waitAndClick(button, {
      timeoutMsg: 'Expected Add to Cart button to be displayed',
    });
  }
}

export const ProductDetail = new ProductDetailScreen();
