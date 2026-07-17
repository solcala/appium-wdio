import type { CheckoutAddressSelectors } from './checkoutAddress.selectors.types.js';

/**
 * Locators from Sauce Labs My Demo App iOS TabBar storyboard:
 * - ShippingAddress-screen root
 * - Fields matched by empty-state placeholder values (stable vs class-chain index)
 * - To Payment button title (no dedicated a11y id)
 */
export const checkoutAddressSelectors: CheckoutAddressSelectors = {
  screen: '~ShippingAddress-screen',
  fullNameField: '-ios predicate string:value == "Rebecca Winter"',
  address1Field: '-ios predicate string:value == "Mandorley 112"',
  address2Field: '-ios predicate string:value == "Entrance 1"',
  cityField: '-ios predicate string:value == "Truro"',
  zipField: '-ios predicate string:value == "89750"',
  stateRegionField: '-ios predicate string:value == "Cornwall"',
  countryField: '-ios predicate string:value == "United Kingdom"',
  toPaymentButton: '-ios class chain:**/XCUIElementTypeButton[`name == "To Payment"`]',
};
