import { DeepLinkEvent } from '@ehrocks/react-native-superapp-communication';

export type BenefitsItemType = {
  type: 'cashback';
  title: string;
  content: string;
  action: () => void;
};

const openDeepLink = (deepLink: string) => {
  DeepLinkEvent.dispatchOpenDeepLinkEvent({ url: deepLink });
};

const cashback1: BenefitsItemType = {
  type: 'cashback',
  title: 'Hello Fresh',
  content: 'Get up to $210 off your first five boxes',
  action: () => openDeepLink('platform_redirect/benefits/cashback-offers/936843'),
};

const cashback2: BenefitsItemType = {
  type: 'cashback',
  title: 'Agoda',
  content: '5% Cashback on purchases',
  action: () => openDeepLink('platform_redirect/benefits/cashback-offers/936753'),
};

const cashback3: BenefitsItemType = {
  type: 'cashback',
  title: 'The Iconic',
  content: '3% Cashback',
  action: () => openDeepLink('platform_redirect/benefits/cashback-offers/933832'),
};

const cashback4: BenefitsItemType = {
  type: 'cashback',
  title: 'Booktopia',
  content: '5.5% Cashback',
  action: () => openDeepLink('platform_redirect/benefits/cashback-offers/937950'),
};

const cashback5: BenefitsItemType = {
  type: 'cashback',
  title: 'The North Face',
  content: '5.5% Cashback',
  action: () => openDeepLink('platform_redirect/benefits/cashback-offers/936781'),
};

// #region Only for Xmas23 Campaign

const cashback6: BenefitsItemType = {
  type: 'cashback',
  title: 'The Iconic',
  content: '20% cashback on all orders',
  action: () => openDeepLink('platform_redirect/benefits/cashback-offers/945793'),
};

const cashback7: BenefitsItemType = {
  type: 'cashback',
  title: 'Booking.com',
  content: '20% cashback on all bookings',
  action: () => openDeepLink('platform_redirect/benefits/cashback-offers/945800'),
};

const cashback8: BenefitsItemType = {
  type: 'cashback',
  title: 'Adore Beauty',
  content: '25% cashback on orders over $100',
  action: () => openDeepLink('platform_redirect/benefits/cashback-offers/945796'),
};

const cashback9: BenefitsItemType = {
  type: 'cashback',
  title: 'Red Balloon',
  content: '20% cashback on all orders',
  action: () => openDeepLink('platform_redirect/benefits/cashback-offers/945797'),
};

const cashback10: BenefitsItemType = {
  type: 'cashback',
  title: 'Myer',
  content: '15% cashback on purchases',
  action: () => openDeepLink('platform_redirect/benefits/cashback-offers/945798'),
};

export const ehBenefitsTilesXmas23 = [cashback6, cashback7];
export const wzBenefitsTilesXmas23 = [cashback6, cashback7];
export const candidateBenefitsTilesXmas23 = [cashback6, cashback7, cashback8, cashback9, cashback10];

// #endregion

export const ehBenefitsTiles = [cashback1, cashback2];
export const wzBenefitsTiles = [cashback1, cashback2];
export const candidateBenefitsTiles = [cashback1, cashback2, cashback3, cashback4, cashback5];
