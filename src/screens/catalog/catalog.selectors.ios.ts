import type { CatalogSelectors } from './catalog.selectors.types.js';

/**
 * Locators from Sauce Labs My Demo App iOS storyboard / UITests PageObject:
 * - Catalog-screen root otherElements identifier
 * - Sort control uses SortNameAscending Icons image (no dedicated a11y id)
 * - Product titles are "Product Name" static texts; labels include color
 *   suffix (e.g. "Sauce Labs Backpack - Black"), so match with CONTAINS
 */
export const catalogSelectors: CatalogSelectors = {
  screen: '~Catalog-screen',
  // Image-backed button; no accessibilityConfiguration in storyboard
  sortButton: '~SortNameAscending Icons',
  productByName: (name: string) =>
    `-ios predicate string:name == "Product Name" AND label CONTAINS "${name}"`,
  productTapTarget: (name: string) =>
    `-ios predicate string:name == "Product Name" AND label CONTAINS "${name}"`,
};
