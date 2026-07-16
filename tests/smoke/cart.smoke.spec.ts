import { Cart } from '../../src/screens/cart/CartScreen.js';
import { Catalog } from '../../src/screens/catalog/CatalogScreen.js';
import { ProductDetail } from '../../src/screens/productDetail/ProductDetailScreen.js';

const KNOWN_PRODUCT = 'Sauce Labs Backpack';

describe('Cart smoke', () => {
  it('adds a product and shows it in the cart', async () => {
    await Catalog.openProduct(KNOWN_PRODUCT);
    await ProductDetail.addToCart();
    await Cart.open();
    expect(await Cart.hasProduct(KNOWN_PRODUCT)).toBe(true);
  });
});
