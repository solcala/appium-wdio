import { buildAndroidCapabilities } from './src/config/android.capabilities.js';
import { sharedConfig } from './wdio.shared.conf.js';

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  capabilities: buildAndroidCapabilities(),
};
