import type { SideMenuSelectors } from './sideMenu.selectors.types.js';

/**
 * Provisional iOS locators (aligned with common My Demo App a11y labels).
 * Batch 7.2 will verify/adjust against Appium Inspector on Simulator.
 */
export const sideMenuSelectors: SideMenuSelectors = {
  menuButton: '~View menu',
  logInItem: '~Log In',
};
