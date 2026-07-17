import type { Capabilities } from '@wdio/types';
import { loadIosEnv } from './env.js';

/**
 * Builds W3C Appium 2 capabilities for a local iOS Simulator.
 * Device and .app path come from env so this file stays environment-agnostic.
 */
export function buildIosCapabilities(): Capabilities.RequestedStandaloneCapabilities[] {
  const { deviceName, platformVersion, appPath } = loadIosEnv();

  return [
    {
      platformName: 'iOS',
      'appium:automationName': 'XCUITest',
      'appium:deviceName': deviceName,
      'appium:platformVersion': platformVersion,
      'appium:app': appPath,
      'appium:newCommandTimeout': 240,
      'appium:noReset': false,
      'appium:fullReset': false,
      // Avoid software keyboard covering footer CTAs (To Payment / Review Order)
      'appium:connectHardwareKeyboard': true,
      // Surfaces WDA/xcodebuild errors in Appium logs during local setup
      'appium:showXcodeLog': true,
      // First WDA build on a new Xcode/runtime can exceed default client timeouts
      'appium:wdaLaunchTimeout': 120000,
      'appium:wdaConnectionTimeout': 120000,
    },
  ];
}
