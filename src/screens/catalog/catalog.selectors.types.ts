import type { CatalogSortOption } from './catalog.sort.js';

export type CatalogSelectors = {
  /** Root / screen identity element for the product catalog */
  readonly screen: string;
  /** Control that opens the sort options sheet */
  readonly sortButton: string;
  /** Sort sheet heading / identity ("Sort by:") */
  readonly sortModal: string;
  /** Locator for a product tile/label by visible product name */
  productByName(name: string): string;
  /** Tappable control that opens product details for the given name */
  productTapTarget(name: string): string;
  /** Sort sheet row for the given option */
  sortOption(option: CatalogSortOption): string;
  /** All product title nodes in list/grid order */
  readonly productTitles: string;
  /** All product price nodes in list/grid order */
  readonly productPrices: string;
};
