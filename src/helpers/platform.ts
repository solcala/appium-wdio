/**
 * Session platform helpers for shared screen objects.
 * Prefer these over scattering driver.isAndroid checks in specs.
 */
export function isAndroid(): boolean {
  return driver.isAndroid;
}

export function isIOS(): boolean {
  return driver.isIOS;
}

export function byPlatform<T>(options: { android: T; ios: T }): T {
  if (isAndroid()) {
    return options.android;
  }
  if (isIOS()) {
    return options.ios;
  }
  throw new Error('Unsupported platform: expected an Android or iOS Appium session');
}
