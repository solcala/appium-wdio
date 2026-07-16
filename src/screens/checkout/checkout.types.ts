export type CheckoutAddressInput = {
  readonly fullName: string;
  readonly address1: string;
  readonly address2?: string;
  readonly city: string;
  readonly stateRegion?: string;
  readonly zip: string;
  readonly country: string;
};

export type CheckoutPaymentInput = {
  readonly fullName: string;
  readonly cardNumber: string;
  readonly expirationDate: string;
  readonly securityCode: string;
};
