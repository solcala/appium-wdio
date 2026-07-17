/**
 * Sauce Labs My Demo App credentials shown on the Login screen.
 * Password for all listed users is 10203040.
 */
export type TestUser = {
  readonly username: string;
  readonly password: string;
};

/** Standard unlocked user (bod@example.com). */
export const standardUser: TestUser = {
  username: 'bod@example.com',
  password: '10203040',
};

/** Locked-out user for negative login flows (Phase 12). */
export const lockedUser: TestUser = {
  username: 'alice@example.com',
  password: '10203040',
};
