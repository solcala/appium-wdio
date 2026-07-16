export type CatalogSelectors = {
  /** Root / screen identity element for the product catalog */
  readonly screen: string;
  /** Control that opens the sort options sheet */
  readonly sortButton: string;
  /** Locator for a product tile/label by visible product name */
  productByName(name: string): string;
};
