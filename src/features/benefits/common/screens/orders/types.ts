import type { DiscountHistory, OrderDetails, OrderPurchaseItem } from '../../../../../new-graphql/generated';

export const BenefitsOrderTabKeys = {
  BILLS: 'bills',
  CASHBACK: 'cashback',
  GIFTCARDS: 'gift-cards',
  NONE: '',
} as const;

type TabKeysIndexes = keyof typeof BenefitsOrderTabKeys;

export type BenefitsOrderTabKeysType = (typeof BenefitsOrderTabKeys)[TabKeysIndexes];

export type GiftCardPurchaseItem = {
  order: DiscountHistory;
  purchaseItem?: OrderPurchaseItem;
  orderDetail: OrderDetails;
};
