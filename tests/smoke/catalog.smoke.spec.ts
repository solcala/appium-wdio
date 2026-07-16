import { Catalog } from '../../src/screens/catalog/CatalogScreen.js';

describe('Catalog smoke', () => {
  it('shows the catalog after launch', async () => {
    expect(await Catalog.isDisplayed()).toBe(true);
  });
});
