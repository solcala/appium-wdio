import { buildIosCapabilities } from './src/config/ios.capabilities.js';
import { sharedConfig } from './wdio.shared.conf.js';

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  capabilities: buildIosCapabilities(),
};
