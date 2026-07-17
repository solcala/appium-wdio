import {
  catalogPriceForTitle,
} from '../../fixtures/catalog.js';
import { byPlatform, isIOS } from '../../helpers/platform.js';
import { waitAndClick, waitForDisplayed } from '../../helpers/waits.js';
import type { CatalogSortOption } from './catalog.sort.js';
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

  private get sortModal() {
    return $(this.selectors.sortModal);
  }

  private productByName(name: string) {
    return $(this.selectors.productByName(name));
  }

  private productTapTarget(name: string) {
    return $(this.selectors.productTapTarget(name));
  }

  private sortOption(option: CatalogSortOption) {
    return $(this.selectors.sortOption(option));
  }

  async waitUntilLoaded(): Promise<void> {
    // Catalog chrome can lag MainActivity slightly after splash (esp. CI)
    await waitForDisplayed(this.screen, {
      timeout: 30_000,
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
    await waitAndClick(this.productTapTarget(name), {
      timeoutMsg: `Expected tappable target for product "${name}" to be displayed`,
    });
  }

  async openSort(): Promise<void> {
    await this.waitUntilLoaded();
    await waitAndClick(this.sortButton, {
      timeoutMsg: 'Expected Catalog sort button to be displayed',
    });
    await waitForDisplayed(this.sortModal, {
      timeoutMsg: 'Expected Catalog sort sheet ("Sort by:") to be displayed',
    });
  }

  async selectSort(option: CatalogSortOption): Promise<void> {
    await this.openSort();
    await waitAndClick(this.sortOption(option), {
      timeoutMsg: `Expected sort option "${option}" to be displayed`,
    });
    await waitForDisplayed(this.sortModal, {
      reverse: true,
      timeoutMsg: 'Expected Catalog sort sheet to dismiss after selection',
    });
    await this.waitUntilLoaded();
  }

  /** Visible product titles in DOM/list order. */
  async getVisibleProductTitles(): Promise<string[]> {
    await this.waitUntilLoaded();
    const titles: string[] = [];
    for (const el of await $$(this.selectors.productTitles)) {
      if (!(await el.isDisplayed().catch(() => false))) {
        continue;
      }
      const raw = (await el.getText())?.trim() ?? '';
      if (!raw || raw === 'Product Name') {
        continue;
      }
      titles.push(raw);
    }
    return titles;
  }

  /**
   * Visible product prices in DOM/list order.
   * Android reads price labels; iOS maps titles via catalog fixtures because
   * the a11y tree exposes identifier "Product Price" instead of the amount.
   */
  async getVisibleProductPrices(): Promise<number[]> {
    await this.waitUntilLoaded();

    if (isIOS()) {
      const prices: number[] = [];
      for (const title of await this.getVisibleProductTitles()) {
        const price = catalogPriceForTitle(title);
        if (price !== undefined) {
          prices.push(price);
        }
      }
      return prices;
    }

    const prices: number[] = [];
    for (const el of await $$(this.selectors.productPrices)) {
      if (!(await el.isDisplayed().catch(() => false))) {
        continue;
      }
      const raw = (await el.getText())?.trim() ?? '';
      const value = parsePrice(raw);
      if (value !== undefined) {
        prices.push(value);
      }
    }
    return prices;
  }

  /**
   * Whether visible prices match the selected price sort.
   * Android sorts numerically; iOS compares ProductPrice as String.
   */
  async areVisiblePricesSorted(
    direction: 'asc' | 'desc'
  ): Promise<boolean> {
    const prices = await this.getVisibleProductPrices();
    if (prices.length < 2) {
      return false;
    }

    if (isIOS()) {
      const keys = prices.map((price) => price.toFixed(2));
      return direction === 'asc'
        ? isNonDecreasing(keys)
        : isNonIncreasing(keys);
    }

    return direction === 'asc'
      ? isNonDecreasing(prices)
      : isNonIncreasing(prices);
  }
}

function parsePrice(raw: string): number | undefined {
  const match = raw.replace(/,/g, '').match(/(\d+(?:\.\d+)?)/);
  if (!match) {
    return undefined;
  }
  return Number.parseFloat(match[1]);
}

function isNonDecreasing(values: ReadonlyArray<string | number>): boolean {
  for (let i = 1; i < values.length; i += 1) {
    if (values[i]! < values[i - 1]!) {
      return false;
    }
  }
  return true;
}

function isNonIncreasing(values: ReadonlyArray<string | number>): boolean {
  for (let i = 1; i < values.length; i += 1) {
    if (values[i]! > values[i - 1]!) {
      return false;
    }
  }
  return true;
}

export const Catalog = new CatalogScreen();
