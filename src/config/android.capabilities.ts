import type { Capabilities } from '@wdio/types';
import { loadAndroidEnv } from './env.js';

/**
 * Builds W3C Appium 2 capabilities for a local Android emulator.
 * Device and APK come from env so this file stays environment-agnostic.
 */
export function buildAndroidCapabilities(): Capabilities.RequestedStandaloneCapabilities[] {
  const { deviceName, platformVersion, appPath } = loadAndroidEnv();

  return [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': deviceName,
      'appium:platformVersion': platformVersion,
      'appium:app': appPath,
      // My Demo App transitions splash → main; wildcard avoids activity mismatch
      'appium:appWaitActivity': '*',
      'appium:newCommandTimeout': 240,
      'appium:autoGrantPermissions': true,
      'appium:noReset': false,
      'appium:fullReset': false,
    },
  ];
}
