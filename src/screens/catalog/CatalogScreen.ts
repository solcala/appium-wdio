import { byPlatform } from '../../helpers/platform.js';
import { waitAndClick, waitForDisplayed } from '../../helpers/waits.js';
import { catalogSelectors as androidSelectors } from './catalog.selectors.android.js';
import { catalogSelectors as iosSelectors } from './catalog.selectors.ios.js';

class CatalogScreen {
  private get selectors() {
    return byPlatform({
      android: androidSelectors,
      ios: iosSelectors,
    });
  }

  private get screen() {
    return $(this.selectors.screen);
  }

  private get sortButton() {
    return $(this.selectors.sortButton);
  }

  private productByName(name: string) {
    return $(this.selectors.productByName(name));
  }

  async waitUntilLoaded(): Promise<void> {
    await waitForDisplayed(this.screen, {
      timeoutMsg: 'Expected Catalog screen to be displayed',
    });
  }

  async isDisplayed(): Promise<boolean> {
    await this.waitUntilLoaded();
    return this.screen.isDisplayed();
  }

  async openProduct(name: string): Promise<void> {
    await this.waitUntilLoaded();
    const product = this.productByName(name);
    await waitForDisplayed(product, {
      timeoutMsg: `Expected product "${name}" to be displayed in the catalog`,
    });
    await product.scrollIntoView();
    await waitAndClick(product);
  }

  async openSort(): Promise<void> {
    await this.waitUntilLoaded();
    await waitAndClick(this.sortButton, {
      timeoutMsg: 'Expected Catalog sort button to be displayed',
    });
  }
}

export const Catalog = new CatalogScreen();
