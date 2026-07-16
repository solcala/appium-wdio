import type { ChainablePromiseElement } from 'webdriverio';
import { waitForDisplayed } from '../../helpers/waits.js';

/** Clear and type into a checkout form field after it is displayed. */
export async function fillField(
  element: ChainablePromiseElement,
  value: string,
  timeoutMsg: string
): Promise<void> {
  await waitForDisplayed(element, { timeoutMsg });
  await element.scrollIntoView();
  await element.clearValue();
  await element.setValue(value);
}
