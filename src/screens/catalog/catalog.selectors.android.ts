import type { CatalogSelectors } from './catalog.selectors.types.js';

export const catalogSelectors: CatalogSelectors = {
  screen: '~title',
  sortButton: '~Shows current sorting order and displays available sorting options',
  productByName: (name: string) => `android=new UiSelector().text("${name}")`,
};
