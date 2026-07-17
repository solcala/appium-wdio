import type { CatalogSortOption } from './catalog.sort.js';
import type { CatalogSelectors } from './catalog.selectors.types.js';

const SORT_OPTION_BY_KEY: Record<CatalogSortOption, string> = {
  nameAsc: '~Ascending order by name',
  nameDesc: '~Descending order by name',
  priceAsc: '~Ascending order by price',
  priceDesc: '~Descending order by price',
};

export const catalogSelectors: CatalogSelectors = {
  // Prefer resource-id over content-desc "title" (same TextView; more stable on CI)
  screen: 'android=new UiSelector().resourceIdMatches(".*:id/productTV")',
  sortButton: '~Shows current sorting order and displays available sorting options',
  sortModal: 'android=new UiSelector().resourceIdMatches(".*:id/sortTV")',
  productByName: (name: string) => `android=new UiSelector().text("${name}")`,
  // Only productIV is clickable in ProductsAdapter; title text alone does not navigate.
  // XPath: sibling image with runtime content-desc "Product Image".
  productTapTarget: (name: string) =>
    `//*[@text="${name}"]/preceding-sibling::*[@content-desc="Product Image"]`,
  sortOption: (option: CatalogSortOption) => SORT_OPTION_BY_KEY[option],
  productTitles: 'android=new UiSelector().resourceIdMatches(".*:id/titleTV")',
  productPrices: 'android=new UiSelector().resourceIdMatches(".*:id/priceTV")',
};
