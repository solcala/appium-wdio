import { byPlatform, isIOS } from '../../helpers/platform.js';
import { waitAndClick, waitForDisplayed } from '../../helpers/waits.js';
import { loginSelectors as androidSelectors } from './login.selectors.android.js';
import { loginSelectors as iosSelectors } from './login.selectors.ios.js';

class LoginScreen {
  private get selectors() {
    return byPlatform({
      android: androidSelectors,
      ios: iosSelectors,
    });
  }

  private get screen() {
    return $(this.selectors.screen);
  }

  private get usernameField() {
    return $(this.selectors.usernameField);
  }

  private get passwordField() {
    return $(this.selectors.passwordField);
  }

  private get loginButton() {
    return $(this.selectors.loginButton);
  }

  private get usernameError() {
    return $(this.selectors.usernameError);
  }

  private get passwordError() {
    return $(this.selectors.passwordError);
  }

  private savedUsername(username: string) {
    return $(this.selectors.savedUsername(username));
  }

  async waitUntilLoaded(): Promise<void> {
    await waitForDisplayed(this.screen, {
      timeoutMsg: 'Expected Login screen to be displayed',
    });
  }

  async isDisplayed(): Promise<boolean> {
    await this.waitUntilLoaded();
    return this.screen.isDisplayed();
  }

  async enterUsername(username: string): Promise<void> {
    await this.waitUntilLoaded();
    const field = this.usernameField;
    await waitForDisplayed(field, {
      timeoutMsg: 'Expected username field to be displayed',
    });
    await field.clearValue();
    await field.setValue(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.waitUntilLoaded();
    const field = this.passwordField;
    await waitForDisplayed(field, {
      timeoutMsg: 'Expected password field to be displayed',
    });
    await field.clearValue();
    await field.setValue(password);
  }

  async submit(): Promise<void> {
    await this.waitUntilLoaded();
    await waitAndClick(this.loginButton, {
      timeoutMsg: 'Expected Login button to be displayed',
    });
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.submit();
  }

  /** Tap a preset username chip to auto-fill username + password. */
  async selectSavedUsername(username: string): Promise<void> {
    await this.waitUntilLoaded();
    const chip = this.savedUsername(username);
    await waitForDisplayed(chip, {
      timeoutMsg: `Expected saved username "${username}" to be displayed`,
    });
    await chip.scrollIntoView();
    await waitAndClick(chip);
  }

  /**
   * Android: inline field errors. iOS: UIAlertController text via getAlertText().
   */
  async getErrorMessage(): Promise<string> {
    await browser.waitUntil(
      async () => (await this.readErrorMessage()) !== undefined,
      {
        timeout: 15_000,
        timeoutMsg: 'Expected a login error to be displayed',
      }
    );
    const message = await this.readErrorMessage();
    if (message === undefined) {
      throw new Error('Expected a login error to be displayed');
    }
    return message;
  }

  async waitForErrorContaining(text: string): Promise<void> {
    await browser.waitUntil(
      async () => {
        const message = await this.readErrorMessage();
        return message !== undefined && message.includes(text);
      },
      {
        timeout: 15_000,
        timeoutMsg: `Expected login error containing "${text}"`,
      }
    );
  }

  private async readErrorMessage(): Promise<string | undefined> {
    if (isIOS()) {
      try {
        return await driver.getAlertText();
      } catch {
        return undefined;
      }
    }

    if (await this.passwordError.isDisplayed().catch(() => false)) {
      return this.passwordError.getText();
    }
    if (await this.usernameError.isDisplayed().catch(() => false)) {
      return this.usernameError.getText();
    }
    return undefined;
  }

  async dismissError(): Promise<void> {
    if (isIOS()) {
      await this.waitForAlert();
      await driver.acceptAlert();
      return;
    }
    // Android errors are inline; nothing to dismiss
  }

  private async waitForAlert(): Promise<void> {
    await browser.waitUntil(
      async () => {
        try {
          await driver.getAlertText();
          return true;
        } catch {
          return false;
        }
      },
      {
        timeout: 15_000,
        timeoutMsg: 'Expected login validation alert to be displayed',
      }
    );
  }
}

export const Login = new LoginScreen();
