import type { CatalogSelectors } from './catalog.selectors.types.js';

/**
 * Locators from Sauce Labs My Demo App iOS storyboard / UITests PageObject:
 * - Catalog-screen root otherElements identifier
 * - Sort control uses SortNameAscending Icons image (no dedicated a11y id)
 * - Product name is a static text whose label matches the product title
 */
export const catalogSelectors: CatalogSelectors = {
  screen: '~Catalog-screen',
  // Image-backed button; no accessibilityConfiguration in storyboard
  sortButton: '~SortNameAscending Icons',
  productByName: (name: string) => `-ios predicate string:label == "${name}"`,
};
