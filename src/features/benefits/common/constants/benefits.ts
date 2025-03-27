export const CategoryCodes = {
  Bill: 'bill',
  All: 'all',
  GiftCard: 'giftcard',
} as const;

export type CategoryCode = (typeof CategoryCodes)[keyof typeof CategoryCodes];

export const EH_POLICY_LINK = 'https://employmenthero.com/legals/privacy-policy/';
export const MEDIBANK_POCILY_LINK = 'https://www.medibank.com.au/privacy/';
