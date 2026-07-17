import type { ChainablePromiseElement } from 'webdriverio';
import { isIOS } from '../../helpers/platform.js';
import { waitForDisplayed, waitForExist } from '../../helpers/waits.js';

/**
 * Best-effort keyboard dismiss. My Demo App UITextFields do not resign on Return.
 * On Simulator, ⌘K toggles the software keyboard when a hardware keyboard is connected.
 */
export async function dismissCheckoutKeyboard(): Promise<void> {
  if (!isIOS()) {
    return;
  }

  const keyboard = $('-ios class chain:**/XCUIElementTypeKeyboard');
  if (!(await keyboard.isDisplayed().catch(() => false))) {
    return;
  }

  // XCUIKeyModifierCommand = 1 << 20 — toggles software keyboard on Simulator (⌘K)
  try {
    await driver.execute('mobile: keys', {
      keys: [{ key: 'k', modifierFlags: 1_048_576 }],
    });
  } catch {
    await driver.execute('mobile: backgroundApp', { seconds: 1 }).catch(() => undefined);
  }

  await browser.waitUntil(
    async () => !(await keyboard.isDisplayed().catch(() => false)),
    {
      timeout: 8_000,
      timeoutMsg:
        'Expected software keyboard to be hidden (try Simulator ⌘K / Connect Hardware Keyboard)',
    }
  );
}

/** Clear and type into a checkout form field after it is on screen. */
export async function fillField(
  element: ChainablePromiseElement,
  value: string,
  timeoutMsg: string
): Promise<void> {
  await waitForExist(element, { timeoutMsg });

  if (isIOS()) {
    try {
      await element.click();
    } catch {
      const location = await element.getLocation();
      const size = await element.getSize();
      await driver.execute('mobile: tap', {
        x: Math.round(location.x + size.width / 2),
        y: Math.round(location.y + size.height / 2),
      });
    }
    await element.clearValue().catch(() => undefined);
    await element.addValue(value);
    return;
  }

  await element.scrollIntoView({ direction: 'down' });
  await waitForDisplayed(element, { timeoutMsg });
  await element.clearValue();
  await element.setValue(value);
}

/** Tap a checkout CTA after ensuring the software keyboard is not covering it. */
export async function tapCheckoutControl(
  element: ChainablePromiseElement,
  timeoutMsg: string
): Promise<void> {
  await waitForExist(element, { timeoutMsg });
  if (isIOS()) {
    await dismissCheckoutKeyboard();
    if (await element.isDisplayed().catch(() => false)) {
      await element.click();
      return;
    }
    const location = await element.getLocation();
    const size = await element.getSize();
    await driver.execute('mobile: tap', {
      x: Math.round(location.x + size.width / 2),
      y: Math.round(location.y + size.height / 2),
    });
    return;
  }
  await element.scrollIntoView({ direction: 'down' });
  await waitForDisplayed(element, { timeoutMsg });
  await element.click();
}
