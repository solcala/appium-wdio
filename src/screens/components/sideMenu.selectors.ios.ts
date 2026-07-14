import type { SideMenuSelectors } from './sideMenu.selectors.types.js';

/**
 * Locators from Sauce Labs My Demo App iOS storyboard / UITests PageObject:
 * - More-tab-item opens the menu (tab bar, not Android hamburger)
 * - Login label text is "Login" (not "Log In")
 * - Tappable control keeps accessibility id LogOut-menu-item
 */
export const sideMenuSelectors: SideMenuSelectors = {
  menuButton: '~More-tab-item',
  logInItem: '-ios predicate string:label == "Login"',
  logInButton: '~LogOut-menu-item',
};
