import { Catalog } from '../../src/screens/catalog/CatalogScreen.js';

function isNonDecreasing(values: ReadonlyArray<string>): boolean {
  for (let i = 1; i < values.length; i += 1) {
    if (values[i]! < values[i - 1]!) {
      return false;
    }
  }
  return true;
}

function isNonIncreasing(values: ReadonlyArray<string>): boolean {
  for (let i = 1; i < values.length; i += 1) {
    if (values[i]! > values[i - 1]!) {
      return false;
    }
  }
  return true;
}

describe('Catalog sort', () => {
  it('sorts products by name ascending and descending', async () => {
    expect(await Catalog.isDisplayed()).toBe(true);

    await Catalog.selectSort('nameAsc');
    const namesAsc = await Catalog.getVisibleProductTitles();
    expect(namesAsc.length).toBeGreaterThanOrEqual(2);
    expect(isNonDecreasing(namesAsc)).toBe(true);

    await Catalog.selectSort('nameDesc');
    const namesDesc = await Catalog.getVisibleProductTitles();
    expect(namesDesc.length).toBeGreaterThanOrEqual(2);
    expect(isNonIncreasing(namesDesc)).toBe(true);
  });

  it('sorts products by price ascending and descending', async () => {
    expect(await Catalog.isDisplayed()).toBe(true);

    await Catalog.selectSort('priceAsc');
    expect(await Catalog.areVisiblePricesSorted('asc')).toBe(true);

    await Catalog.selectSort('priceDesc');
    expect(await Catalog.areVisiblePricesSorted('desc')).toBe(true);
  });
});
