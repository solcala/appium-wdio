import type { CheckoutAddressSelectors } from './checkoutAddress.selectors.types.js';

/**
 * Locators from Sauce Labs My Demo App iOS TabBar storyboard:
 * - ShippingAddress-screen root
 * - Text fields ordered: fullName, address1, address2, city, zip, state, country
 * - To Payment button title (no dedicated a11y id)
 */
const screenRoot =
  '**/XCUIElementTypeOther[`name == "ShippingAddress-screen"`]';

export const checkoutAddressSelectors: CheckoutAddressSelectors = {
  screen: '~ShippingAddress-screen',
  fullNameField: `-ios class chain:${screenRoot}/**/XCUIElementTypeTextField[1]`,
  address1Field: `-ios class chain:${screenRoot}/**/XCUIElementTypeTextField[2]`,
  address2Field: `-ios class chain:${screenRoot}/**/XCUIElementTypeTextField[3]`,
  cityField: `-ios class chain:${screenRoot}/**/XCUIElementTypeTextField[4]`,
  zipField: `-ios class chain:${screenRoot}/**/XCUIElementTypeTextField[5]`,
  stateRegionField: `-ios class chain:${screenRoot}/**/XCUIElementTypeTextField[6]`,
  countryField: `-ios class chain:${screenRoot}/**/XCUIElementTypeTextField[7]`,
  toPaymentButton: '-ios class chain:**/XCUIElementTypeButton[`name == "To Payment"`]',
};
