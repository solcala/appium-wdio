/**
 * Shared WDIO options for local Appium runs (Android emulator + iOS Simulator).
 * Platform-specific configs merge this with their capabilities.
 */
export const sharedConfig: Omit<WebdriverIO.Config, 'capabilities'> = {
  runner: 'local',
  tsConfigPath: './tsconfig.json',

  specs: ['./tests/**/*.ts'],
  exclude: [],

  // Local simulators/emulators do not tolerate uncontrolled parallel sessions
  maxInstances: 1,

  logLevel: 'info',
  bail: 0,
  waitforTimeout: 15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,

  // Default Appium port; @wdio/appium-service starts/stops the server
  port: 4723,
  services: [
    [
      'appium',
      {
        args: {
          // Enables useful mobile commands locally without over-opening security
          relaxedSecurity: true,
        },
        // Prefer the project-local Appium binary from node_modules
        command: 'appium',
      },
    ],
  ],

  framework: 'mocha',
  reporters: ['spec'],

  mochaOpts: {
    ui: 'bdd',
    // Mobile cold starts are slow; fail on explicit waits, not short Mocha timeouts
    timeout: 120000,
  },
};
