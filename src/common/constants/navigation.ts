export const PillarIds = {
  WalletApp: 'WalletApp',
  BenefitsApp: 'BenefitsApp',
} as const;

export const BenefitsTabKeys = {
  HOME: 'benefits-home',
  SETTINGS: 'benefits-settings',
  // v1, remove later
  STORE: 'benefits-store',
  CASHBACK: 'benefits-cashback',
  BILLS: 'benefits-bills',
  // v2
  ONLINE: 'benefits-online',
  INSTORE: 'benefits-instore',
  PURCHASES: 'benefits-purchases',
  NONE: '',
} as const;

export const WalletTabKeys = {
  SPEND: 'spend-tab',
  STASH: 'stash-tab',
  INCOME: 'income-tab',
  BILL_MANAGEMENT: 'bill-management',
  BENEFITS: 'benefits-tab',
  SUPPORT: 'support-tab',
  HERO_DOLLARS: 'hero-dollars-tab',
  HERO_POINTS: 'hero-points-tab',
  CARD: 'card-tab',
  SUPER: 'super-tab',
  NONE: '',
} as const;
