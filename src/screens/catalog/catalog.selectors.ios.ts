import type { CatalogSortOption } from './catalog.sort.js';
import type { CatalogSelectors } from './catalog.selectors.types.js';

/**
 * Locators from Sauce Labs My Demo App iOS storyboard / UITests PageObject:
 * - Catalog-screen root otherElements identifier
 * - Sort toolbar UIButton keeps storyboard title "Button" (image name is not
 *   exposed as accessibility name on this build)
 * - Sort sheet options use button titles ("Name - Ascending", …)
 * - Product titles are "Product Name" static texts; labels may include color
 *   suffix (e.g. "Sauce Labs Backpack - Black"), so match with CONTAINS
 */
const SORT_OPTION_BY_KEY: Record<CatalogSortOption, string> = {
  nameAsc: '~Name - Ascending',
  nameDesc: '~Name - Descending',
  priceAsc: '~Price - Ascending',
  priceDesc: '~Price - Descending',
};

export const catalogSelectors: CatalogSelectors = {
  screen: '~Catalog-screen',
  // Storyboard title="Button"; only one visible Button on the catalog chrome
  sortButton:
    '-ios predicate string:name == "Button" AND type == "XCUIElementTypeButton"',
  sortModal: '~Sort by:',
  productByName: (name: string) =>
    `-ios predicate string:name == "Product Name" AND label CONTAINS "${name}"`,
  productTapTarget: (name: string) =>
    `-ios predicate string:name == "Product Name" AND label CONTAINS "${name}"`,
  sortOption: (option: CatalogSortOption) => SORT_OPTION_BY_KEY[option],
  productTitles: '-ios predicate string:name == "Product Name"',
  productPrices: '-ios predicate string:name == "Product Price"',
};
