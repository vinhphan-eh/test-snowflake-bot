import { create } from 'zustand';

export type PermissionData = {
  instapay: {
    view: boolean;
  };
  superAppBenefits: {
    view: boolean;
  };
  superAppHome: {
    view: boolean;
  };
  superAppWallet: {
    view: boolean;
  };
  superAppSettings: {
    view: boolean;
  };
  superAppCashback: {
    view: boolean;
  };
  superAppBenefitsFeaturedOffers: {
    view: boolean;
  };
  superAppCashbackCategories: {
    view: boolean;
  };
  superAppInstoreOffer?: {
    view: boolean;
  };
  ebenDevHeroDollarPayment?: {
    view: boolean;
  };
  ebenCashbackStoreList?: {
    view: boolean;
  };
  pillar_money?: {
    view: boolean;
  };
  pillar_benefits?: {
    view: boolean;
  };
  eben_money_pillar_black_list?: {
    view: boolean;
  };
  eben_benefits_pillar_black_list?: {
    view: boolean;
  };
  ebenStorePopularList?: {
    view: boolean;
  };
  ebenStoreBuyAgainCarousel?: {
    view: boolean;
  };
  superChoiceSwag?: {
    view: boolean;
  };
  toggleMegaDealsMvpCta?: {
    view: boolean;
  };
  toggleMegaDealsCommunitiesCtas?: {
    view: boolean;
  };
  ebenPaySplitExpGroupA?: {
    view: boolean;
  };
  ebenPaySplitExpGroupB?: {
    view: boolean;
  };
  ebenPaySplitExpGroupC?: {
    view: boolean;
  };
  ebenServiceFee?: {
    view?: boolean;
  };
  eBenSpendHeroDollarsOnSwagCard?: {
    view?: boolean;
  };
  eBenStash?: {
    view?: boolean;
  };
  eBenMoneyScheduledPayment?: {
    view?: boolean;
  };
  eBenWhitelistedUkMoney?: {
    view?: boolean;
  };
  eBenWhitelistedUkBenefits?: {
    view?: boolean;
  };
  eBenWhitelistedNzBenefits?: {
    view?: boolean;
  };
  instapay2Alpha?: {
    view?: boolean;
  };
  superSalarySacrifice?: {
    view: boolean;
  };
  customFundAssetSwag?: {
    view: boolean;
  };
  superConsolidation?: {
    view: boolean;
  };
  benefitsBillStreaming?: {
    view: boolean;
  };
  seOfferTiles?: {
    view: boolean;
  };
  benefitsForceUpdate?: {
    view: boolean;
  };
  benefitsStoreAppUK?: {
    view: boolean;
  };
  benefitsStoreAppNZ?: {
    view: boolean;
  };
  billStreamingWaitlist?: {
    view: boolean;
  };
  benefitsPillarHomepage?: {
    view: boolean;
  };
  internationalBenefitsRefused?: {
    view: boolean;
  };
  benefitsXmas23Cashback?: {
    view: boolean;
  };
  heroPoints?: {
    view: boolean;
  };
  cashbackDashboardV2?: {
    view: boolean;
  };
  skipMegaDealsSurvey?: {
    view: boolean;
  };
  ebenSwagInterestBearingAccountExperiment?: {
    view: boolean;
  };
  eBenPayeeAddressBook?: {
    view?: boolean;
  };
  benefitsIAv2?: {
    view?: boolean;
  };
  benefitsBillHealthInsuranceWaitlist?: {
    view?: boolean;
  };
  benefitsCashbackMultipleLocations?: {
    view?: boolean;
  };
  rostersInstapayExperiment?: {
    view?: boolean;
  };
  timesheetsInstapayExperiment?: {
    view?: boolean;
  };
  customSurveyInstapayExperiment?: {
    view?: boolean;
  };
  payslipsExperimentInstapay?: {
    view?: boolean;
  };
  payslipsExperimentBudgeting?: {
    view?: boolean;
  };
  ebenInstapayNowSimplifiedExperiment?: {
    view?: boolean;
  };
  instapayOnboardingWidget?: {
    view?: boolean;
  };
  superfundLifecycleV1?: {
    view?: boolean;
  };
  ebenInstapayNowUsageIncentiveV2Experiment?: {
    view?: boolean;
  };
  additionalCashbackIPDailyExperiment?: {
    view?: boolean;
  };
  benefitsBillMedibankPromoTile?: {
    view?: boolean;
  };
  benefitsBillAhmPromoTile?: {
    view?: boolean;
  };
  instapayExpPopupRosters?: {
    view?: boolean;
  };
  instapayExpPopupPayslips?: {
    view?: boolean;
  };
  instapaySubmitTimesheets?: {
    view?: boolean;
  };
  instapayExpPopupLeave?: {
    view?: boolean;
  };
  swagMobileManageMyPayInstapayBalanceTile?: {
    view?: boolean;
  };
  instapayBrazeSubmitLeave?: {
    view?: boolean;
  };
  instapayBrazeLeaveApproved?: {
    view?: boolean;
  };
  instapayBrazeSubmitTimesheets?: {
    view?: boolean;
  };
  instapayAbTestBannerDashboard?: {
    view?: boolean;
  };
  benefitsFitnessFirst?: {
    view?: boolean;
  };
  benefitsGoodlifeFitness?: {
    view?: boolean;
  };
  ebenBrazeAtSwagDBForSea?: {
    view?: boolean;
  };
  ebenBrazeAtSwagDBForNz?: {
    view?: boolean;
  };
};

type PermissionDataStore = {
  permissions?: PermissionData;
  isFetchedPermission?: boolean;
  /**
   * @deprecated
   * must not use this, for testing only
   */
  overridePermissionForTESTING_ONLY?: PermissionData;
};

export const usePermissionStore = create<PermissionDataStore>()(() => ({}));
