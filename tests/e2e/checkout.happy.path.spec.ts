import {
  checkoutProductName,
  standardPayment,
  standardShippingAddress,
} from '../../src/fixtures/checkout.js';
import { standardUser } from '../../src/fixtures/users.js';
import { Cart } from '../../src/screens/cart/CartScreen.js';
import { Catalog } from '../../src/screens/catalog/CatalogScreen.js';
import { CheckoutAddress } from '../../src/screens/checkout/CheckoutAddressScreen.js';
import { CheckoutComplete } from '../../src/screens/checkout/CheckoutCompleteScreen.js';
import { CheckoutPayment } from '../../src/screens/checkout/CheckoutPaymentScreen.js';
import { CheckoutReview } from '../../src/screens/checkout/CheckoutReviewScreen.js';
import { SideMenu } from '../../src/screens/components/SideMenuComponent.js';
import { Login } from '../../src/screens/login/LoginScreen.js';
import { ProductDetail } from '../../src/screens/productDetail/ProductDetailScreen.js';

describe('Checkout happy path', function () {
  // Full checkout crosses several screens; keep above shared cold-start budget
  this.timeout(300_000);

  it('logs in, buys a product, and completes checkout', async () => {
    const user = standardUser();
    const shipping = standardShippingAddress();
    const payment = standardPayment({ fullName: shipping.fullName });

    await SideMenu.openLogIn();
    // Preset chip auto-fills username+password and avoids the iOS keyboard covering Login
    await Login.selectSavedUsername(user.username);
    await Login.submit();

    expect(await Catalog.isDisplayed()).toBe(true);

    await Catalog.openProduct(checkoutProductName);
    await ProductDetail.addToCart();

    await Cart.open();
    expect(await Cart.hasProduct(checkoutProductName)).toBe(true);
    await Cart.proceedToCheckout();

    await CheckoutAddress.fill(shipping);
    await CheckoutAddress.continueToPayment();

    await CheckoutPayment.fill(payment);
    await CheckoutPayment.continueToReview();

    await CheckoutReview.placeOrder();

    await CheckoutComplete.waitForThankYou();
    expect(await CheckoutComplete.isDisplayed()).toBe(true);
  });
});
