export type CreditCardData = {
  lastDigits: string;
  type: 'Visa' | 'Mastercard' | 'Discover' | 'Amex' | 'JCB' | 'Diners' | 'Maestro' | 'UnionPay';
  nonce: string;
  isDefault: boolean;
  deviceData: string;
};

export interface StripeCardData {
  label: string;
  image: string;
  clientToken: string;
}
