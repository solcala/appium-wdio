/**
 * App-fixed catalog products (Sauce Labs My Demo App).
 * Used when iOS does not expose dollar amounts in the accessibility tree.
 */
export const catalogProductPricesByName: Readonly<Record<string, number>> = {
  'Sauce Labs Onesie': 7.99,
  'Sauce Labs Bike Light': 9.99,
  'Sauce Labs Bolt T-Shirt': 15.99,
  'Test.allTheThings() T-Shirt': 15.99,
  'Sauce Labs Backpack': 29.99,
  'Sauce Labs Fleece Jacket': 49.99,
};

/** Strip iOS color suffix ("Sauce Labs Backpack - Black" → base name). */
export function catalogProductBaseName(title: string): string {
  return title.replace(/\s+-\s+[A-Za-z].*$/, '').trim();
}

export function catalogPriceForTitle(title: string): number | undefined {
  return catalogProductPricesByName[catalogProductBaseName(title)];
}
