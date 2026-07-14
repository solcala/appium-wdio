import { byPlatform } from '../../helpers/platform.js';
import { waitAndClick, waitForDisplayed } from '../../helpers/waits.js';
import { sideMenuSelectors as androidSelectors } from './sideMenu.selectors.android.js';
import { sideMenuSelectors as iosSelectors } from './sideMenu.selectors.ios.js';

class SideMenuComponent {
  private get selectors() {
    return byPlatform({
      android: androidSelectors,
      ios: iosSelectors,
    });
  }

  private get menuButton() {
    return $(this.selectors.menuButton);
  }

  private get logInItem() {
    return $(this.selectors.logInItem);
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
