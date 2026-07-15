import { buildIosCapabilities } from './src/config/ios.capabilities.js';
import { sharedConfig } from './wdio.shared.conf.js';

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  // iOS first-session WDA compile can exceed the shared 120s connection timeout
  connectionRetryTimeout: 300000,
  capabilities: buildIosCapabilities(),
};
