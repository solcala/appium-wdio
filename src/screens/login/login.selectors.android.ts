import type { LoginSelectors } from './login.selectors.types.js';

export const loginSelectors: LoginSelectors = {
  screen: 'android=new UiSelector().resourceIdMatches(".*:id/loginTV")',
  usernameField: 'android=new UiSelector().resourceIdMatches(".*:id/nameET")',
  passwordField: 'android=new UiSelector().resourceIdMatches(".*:id/passwordET")',
  loginButton: '~Tap to login with given credentials',
  usernameError: 'android=new UiSelector().resourceIdMatches(".*:id/nameErrorTV")',
  passwordError: 'android=new UiSelector().resourceIdMatches(".*:id/passwordErrorTV")',
  savedUsername: (username: string) =>
    `android=new UiSelector().textContains("${username}")`,
};
