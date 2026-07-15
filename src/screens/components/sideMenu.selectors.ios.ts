import type { SideMenuSelectors } from './sideMenu.selectors.types.js';

/**
 * Locators from Sauce Labs My Demo App iOS storyboard / UITests PageObject:
 * - More-tab-item opens the menu (tab bar, not Android hamburger)
 * - Login row container: "Login Button"; tappable control: "LogOut-menu-item"
 * - Visible label text is "Login" when logged out (may be off-screen until scrolled)
 */
export const sideMenuSelectors: SideMenuSelectors = {
  menuButton: '~More-tab-item',
  logInItem: '~Login Button',
  logInButton: '~LogOut-menu-item',
};
