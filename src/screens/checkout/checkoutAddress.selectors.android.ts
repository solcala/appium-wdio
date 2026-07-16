import type { CheckoutAddressSelectors } from './checkoutAddress.selectors.types.js';

export const checkoutAddressSelectors: CheckoutAddressSelectors = {
  screen: 'android=new UiSelector().text("Enter a shipping address")',
  fullNameField: 'android=new UiSelector().resourceIdMatches(".*:id/fullNameET")',
  address1Field: 'android=new UiSelector().resourceIdMatches(".*:id/address1ET")',
  address2Field: 'android=new UiSelector().resourceIdMatches(".*:id/address2ET")',
  cityField: 'android=new UiSelector().resourceIdMatches(".*:id/cityET")',
  stateRegionField: 'android=new UiSelector().resourceIdMatches(".*:id/stateET")',
  zipField: 'android=new UiSelector().resourceIdMatches(".*:id/zipET")',
  countryField: 'android=new UiSelector().resourceIdMatches(".*:id/countryET")',
  toPaymentButton: '~Saves user info for checkout',
};
