import type { ChainablePromiseElement } from 'webdriverio';

export interface WaitOptions {
  readonly timeout?: number;
  readonly interval?: number;
  readonly reverse?: boolean;
  readonly timeoutMsg?: string;
}

const DEFAULT_TIMEOUT_MS = 15_000;

/**
 * Thin wrappers around WDIO explicit waits.
 * Prefer these (or expect-webdriverio) over browser.pause / fixed sleeps.
 */
export async function waitForDisplayed(
  element: ChainablePromiseElement,
  options: WaitOptions = {}
): Promise<void> {
  await element.waitForDisplayed({
    timeout: options.timeout ?? DEFAULT_TIMEOUT_MS,
    interval: options.interval,
    reverse: options.reverse,
    timeoutMsg: options.timeoutMsg,
  });
}

export async function waitForExist(
  element: ChainablePromiseElement,
  options: WaitOptions = {}
): Promise<void> {
  await element.waitForExist({
    timeout: options.timeout ?? DEFAULT_TIMEOUT_MS,
    interval: options.interval,
    reverse: options.reverse,
    timeoutMsg: options.timeoutMsg,
  });
}

export async function waitForEnabled(
  element: ChainablePromiseElement,
  options: WaitOptions = {}
): Promise<void> {
  await element.waitForEnabled({
    timeout: options.timeout ?? DEFAULT_TIMEOUT_MS,
    interval: options.interval,
    reverse: options.reverse,
    timeoutMsg: options.timeoutMsg,
  });
}

export async function waitAndClick(
  element: ChainablePromiseElement,
  options: WaitOptions = {}
): Promise<void> {
  await waitForDisplayed(element, options);
  await element.click();
}

/**
 * Use this only for animations or state transitions that have no DOM change.
 * MUST be documented in the calling test with why it is used.
 */
export async function waitStable(ms: number = 1000): Promise<void> {
  // @workaround: This is a controlled wait for non-DOM animations.
  // Use sparingly and document in the spec.
  await browser.pause(ms);
}
