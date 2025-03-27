import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../../navigation/navigationTypes';
import type { Category, InStoreOffer, OnlineOffer, InstoreOfferV2, OfferType } from '../../../../new-graphql/generated';
import type { CashbackSearchType } from '../types';

export type CashbackStackParamList = {
  CashbackSearch?: {
    selectedSearchType?: CashbackSearchType;
    selectedCategory?: Category;
  };
  OnlineOfferDetail: { offerId: string; offer?: OnlineOffer };
  FailedScreen: undefined;
  InstoreOfferDetail: { offerId: string; offer?: InStoreOffer };
  InstoreOfferDetailV2: { advertiserId?: string; offerLocationId?: string; offers?: InstoreOfferV2[] };
  FeaturedOffersSearchScreen: undefined;
  CashbackSearchScreenV2: {
    defaultCategory?: {
      code: string;
      name: string;
    };
    query?: string;
    offerType: OfferType;
  };
  InStoreCashbackSearchScreen: {
    defaultCategory?: {
      code: string;
      name: string;
    };
    query?: string;
  };
};

export type CashbackNavigationProp<T extends keyof CashbackStackParamList> = CompositeNavigationProp<
  StackNavigationProp<CashbackStackParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type CashbackRouteProp<T extends keyof CashbackStackParamList> = RouteProp<CashbackStackParamList, T>;
