import { OrderProductType } from '../../../../new-graphql/generated';

export const productTypeWithPurchaseItems: Array<string> = OrderProductType ? [OrderProductType.Giftcard] : [];
