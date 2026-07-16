import type { LoginSelectors } from './login.selectors.types.js';

/**
 * Locators from Sauce Labs My Demo App iOS Authentication storyboard:
 * - No dedicated a11y ids on fields; use text/secure text field class chain
 * - Login CTA is a button titled "Login"
 * - Validation errors are UIAlertController ("Validation Error!") — handled in screen via driver alerts
 * - Preset usernames are buttons whose title contains the email
 */
export const loginSelectors: LoginSelectors = {
  screen: '-ios predicate string:label == "User Name"',
  // Class chain: storyboard fields lack accessibilityConfiguration
  usernameField: '-ios class chain:**/XCUIElementTypeTextField[1]',
  passwordField: '-ios class chain:**/XCUIElementTypeSecureTextField[1]',
  loginButton: '-ios class chain:**/XCUIElementTypeButton[`name == "Login"`]',
  // Alerts are read via driver.getAlertText() in the screen; these keep the type shared
  usernameError: '~Validation Error!',
  passwordError: '~Validation Error!',
  savedUsername: (username: string) =>
    `-ios predicate string:type == "XCUIElementTypeButton" AND label CONTAINS "${username}"`,
};
