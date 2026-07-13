import { waitAndClick, waitForDisplayed } from '../../helpers/waits.js';
import { sideMenuSelectors } from './sideMenu.selectors.js';

class SideMenuComponent {
  private get menuButton() {
    return $(sideMenuSelectors.menuButton);
  }

  private get logInItem() {
    return $(sideMenuSelectors.logInItem);
  }

  async open(): Promise<void> {
    await waitAndClick(this.menuButton);
  }

  async openLogIn(): Promise<void> {
    await this.open();
    await waitAndClick(this.logInItem);
  }

  async waitUntilLogInVisible(): Promise<void> {
    await waitForDisplayed(this.logInItem, {
      timeoutMsg: 'Expected Log In menu item to be displayed in the side drawer',
    });
  }

  async isLogInDisplayed(): Promise<boolean> {
    await this.waitUntilLogInVisible();
    return this.logInItem.isDisplayed();
  }
}

export const SideMenu = new SideMenuComponent();
