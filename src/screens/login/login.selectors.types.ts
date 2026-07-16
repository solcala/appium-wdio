export type LoginSelectors = {
  /** Root / screen identity element for the login form */
  readonly screen: string;
  readonly usernameField: string;
  readonly passwordField: string;
  readonly loginButton: string;
  /** Username validation / field error */
  readonly usernameError: string;
  /** Password validation / locked-user error */
  readonly passwordError: string;
  /** Preset username chip/button that auto-fills credentials */
  savedUsername(username: string): string;
};
