import type { CatalogSelectors } from './catalog.selectors.types.js';

export const catalogSelectors: CatalogSelectors = {
  screen: '~title',
  sortButton: '~Shows current sorting order and displays available sorting options',
  productByName: (name: string) => `android=new UiSelector().text("${name}")`,
  // Only productIV is clickable in ProductsAdapter; title text alone does not navigate.
  // XPath: sibling image with runtime content-desc "Product Image".
  productTapTarget: (name: string) =>
    `//*[@text="${name}"]/preceding-sibling::*[@content-desc="Product Image"]`,
};
