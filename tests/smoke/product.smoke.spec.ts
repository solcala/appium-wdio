import { Catalog } from '../../src/screens/catalog/CatalogScreen.js';
import { ProductDetail } from '../../src/screens/productDetail/ProductDetailScreen.js';

const KNOWN_PRODUCT = 'Sauce Labs Backpack';

describe('Product detail smoke', () => {
  it('opens a known product from the catalog', async () => {
    await Catalog.openProduct(KNOWN_PRODUCT);
    expect(await ProductDetail.isDisplayed()).toBe(true);
  });
});
