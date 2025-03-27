import type { CompositeNavigationProp, NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../../navigation/navigationTypes';
import type { SupportStackParamList } from '../../../support/navigation/navigationTypes';
import type { BillStreamParamList } from '../../bill-streaming/navigation/navigationTypes';
import type { CardLinkOffersStackParamList } from '../../cash-back/card-link-offers/navigation/navigationType';
import type { CashbackStackParamList } from '../../cash-back/navigation/navigationTypes';
import type { GroupStackParamList } from '../../group/navigation/navigationType';
import type { SwagStoreStackParamList } from '../../swag-store/navigation/navigationTypes';
import type { OrderHistoryStackParamList } from '../../swag-store/order-history/navigation/navigationType';
import type { DiscountShopParamList } from '../../swag-store/shop/navigation/navigationTypes';
import type { BenefitsTabKeysType } from '../hooks/useBenefitsTabs/constants';
import type { CreditCardData } from '../types/CreditCardData';
import type { UserPaymentSelection } from '../types/UserPaymentSelection';

export type BenefitsStackParamList = {
  CheckoutProduct: { productCode: string; quantity: number };
  ReviewOrder: {
    productCode: string;
    quantity: number;
    creditCardData: CreditCardData | undefined;
    userPaymentSelection: UserPaymentSelection;
  };
  OrderHistoryStack: NavigatorScreenParams<OrderHistoryStackParamList>;
  CardLinkOffersStack: NavigatorScreenParams<CardLinkOffersStackParamList>;
  SupportStack: NavigatorScreenParams<SupportStackParamList>;
  DiscountShopStack: NavigatorScreenParams<DiscountShopParamList>;
  BillStreamStack: NavigatorScreenParams<BillStreamParamList>;
  GroupStack: NavigatorScreenParams<GroupStackParamList>;
  CashbackStack: NavigatorScreenParams<CashbackStackParamList>;
  GeneralSearchScreen?: {
    defaultCategory?: {
      code: string;
      name: string;
    };
    fromTab?: BenefitsTabKeysType;
  };
  SwagStoreStack: NavigatorScreenParams<SwagStoreStackParamList>;
};

export type BenefitsScreenNavigationProp<T extends keyof BenefitsStackParamList> = CompositeNavigationProp<
  StackNavigationProp<BenefitsStackParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type BenefitsScreenRouteProp<T extends keyof BenefitsStackParamList> = RouteProp<BenefitsStackParamList, T>;
