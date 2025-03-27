import type { PropsWithChildren } from 'react';
import React, { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { featureFlagHttpClient } from './common/api/featureFlagClient';
import { useGetSuperAppToken } from './common/auth/store/useSuperAppTokenStore';
import { useIsCandidateV2 } from './common/hooks/useIsCandidate';
import { useIsWorkzone } from './common/hooks/useIsWorkzone';
import type { PermissionData } from './common/stores/usePermissionStore';
import { usePermissionStore } from './common/stores/usePermissionStore';
import { useGetNoOrgPermissionsQuery } from './new-graphql/generated';

const mapPermission = (permissions: Record<string, never>): PermissionData => ({
  instapay: permissions?.instapay || permissions?.instapay_multi_org,
  superAppBenefits: permissions?.super_app_benefits,
  superAppHome: permissions?.super_app_home,
  superAppWallet: permissions?.super_app_wallet,
  superAppSettings: permissions?.super_app_settings,
  superAppCashback: permissions?.super_app_cashback,
  superAppBenefitsFeaturedOffers: permissions?.super_app_benefits_featured_offers,
  superAppCashbackCategories: permissions?.super_app_cashback_categories,
  superAppInstoreOffer: permissions?.super_app_instore_offer,
  ebenDevHeroDollarPayment: permissions?.eben_dev_hero_dollar_payment,
  ebenCashbackStoreList: permissions?.eben_cashback_store_list,
  pillar_money: permissions?.pillar_money,
  pillar_benefits: permissions?.pillar_benefits,
  eben_money_pillar_black_list: permissions?.eben_money_pillar_black_list,
  eben_benefits_pillar_black_list: permissions?.eben_benefits_pillar_black_list,
  ebenStorePopularList: permissions?.eben_store_popular_list,
  ebenStoreBuyAgainCarousel: permissions?.eben_store_buy_again_carousel,
  superChoiceSwag: permissions?.super_choice_swag_v2,
  toggleMegaDealsMvpCta: permissions?.toggle_mega_deals_mvp_cta,
  toggleMegaDealsCommunitiesCtas: permissions?.toggle_mega_deals_communities_ctas,
  ebenPaySplitExpGroupA: permissions?.eben_paysplit_experiment_group_a,
  ebenPaySplitExpGroupB: permissions?.eben_paysplit_experiment_group_b,
  ebenPaySplitExpGroupC: permissions?.eben_paysplit_experiment_group_c,
  ebenServiceFee: permissions?.eben_service_fee,
  eBenSpendHeroDollarsOnSwagCard: permissions?.eben_spend_hero_dollars_on_swag_card,
  eBenStash: permissions?.eben_stash,
  eBenMoneyScheduledPayment: permissions?.eben_money_scheduled_payment,
  eBenWhitelistedUkMoney: permissions?.eben_whitelisted_uk_money,
  eBenWhitelistedUkBenefits: permissions?.eben_whitelisted_uk_benefits,
  eBenWhitelistedNzBenefits: permissions?.eben_whitelisted_nz_benefits,
  instapay2Alpha: permissions?.instapay_2_alpha,
  superSalarySacrifice: permissions?.super_salary_sacrifice,
  customFundAssetSwag: permissions?.custom_fund_asset_swag,
  superConsolidation: permissions?.super_consolidation,
  benefitsBillStreaming: permissions?.benefits_bill_streaming_v2,
  seOfferTiles: permissions?.benefits_se_offer_tiles,
  benefitsForceUpdate: permissions?.benefits_force_update,
  benefitsStoreAppUK: permissions?.benefits_store_app_uk,
  benefitsStoreAppNZ: permissions?.benefits_store_app_nz,
  billStreamingWaitlist: permissions?.bill_streaming_waitlist,
  benefitsPillarHomepage: permissions?.benefits_pillar_homepage,
  internationalBenefitsRefused: permissions?.international_benefits_refused,
  benefitsXmas23Cashback: permissions?.benefits_xmas23_cashback,
  heroPoints: permissions?.hero_points,
  cashbackDashboardV2: permissions?.benefits_cashback_v2,
  skipMegaDealsSurvey: permissions?.skip_mega_deals_survey,
  ebenSwagInterestBearingAccountExperiment: permissions?.eben_swag_interest_bearing_account_experiment,
  eBenPayeeAddressBook: permissions?.eben_payee_address_book,
  benefitsIAv2: permissions?.benefits_ia_v2,
  benefitsCashbackMultipleLocations: permissions?.benefits_cashback_multiple_locations,
  benefitsBillHealthInsuranceWaitlist: permissions?.health_insurance_waitlist,
  rostersInstapayExperiment: permissions?.rosters_instapay_experiment,
  timesheetsInstapayExperiment: permissions?.timesheets_instapay_experiment,
  customSurveyInstapayExperiment: permissions?.custom_survey_instapay_experiment,
  payslipsExperimentInstapay: permissions?.payslips_experiment_instapay,
  payslipsExperimentBudgeting: permissions?.payslips_experiment_budgeting,
  ebenInstapayNowSimplifiedExperiment: permissions?.eben_instapay_now_simplified_experiment,
  instapayOnboardingWidget: permissions?.swagdb_instapay_onboarding_widget,
  ebenInstapayNowUsageIncentiveV2Experiment: permissions?.eben_instapay_now_usage_incentive_experiment_v2,
  instapayExpPopupRosters: permissions?.instapay_braze_popup_rosters,
  instapayExpPopupPayslips: permissions?.instapay_popup_view_payslips_v2,
  instapayExpPopupLeave: permissions?.instapay_popup_view_leave,
  instapaySubmitTimesheets: permissions?.instapay_tile_submit_timesheets_v2,
  swagMobileManageMyPayInstapayBalanceTile: permissions?.swag_mobile_manage_my_pay_instapay_balance_tile,
  benefitsBillAhmPromoTile: permissions?.benefits_bill_ahm_promo_tile,
  benefitsBillMedibankPromoTile: permissions?.benefits_bill_medibank_promo_tile,
  instapayBrazeSubmitLeave: permissions?.instapay_braze_submit_leave,
  instapayBrazeLeaveApproved: permissions?.instapay_braze_leave_approved,
  instapayBrazeSubmitTimesheets: permissions?.instapay_braze_submit_timesheets,
  instapayAbTestBannerDashboard: permissions?.instapay_abtest_banner_dashboard,
  superfundLifecycleV1: permissions?.superfund_lifecycle_v1,
  benefitsFitnessFirst: permissions?.benefits_fitness_first,
  benefitsGoodlifeFitness: permissions?.benefits_goodlife_fitness,
  ebenBrazeAtSwagDBForNz: permissions?.eben_braze_at_swagdb_for_nz,
  ebenBrazeAtSwagDBForSea: permissions?.eben_braze_at_swagdb_for_sea,
});

type PermissionProviderProps = PropsWithChildren<{ currentOrgId?: string; memberId?: string }>;

const PermissionProvider = ({ children, currentOrgId, memberId }: PermissionProviderProps) => {
  const { token: superAppToken } = useGetSuperAppToken('PermissionProvider');
  const isCandidate = useIsCandidateV2();
  const isWorkZone = useIsWorkzone();
  const overridePermissionForTesting = usePermissionStore(state => state.overridePermissionForTESTING_ONLY);

  const shouldHardCodePermissions = isWorkZone || isCandidate;

  const { data: memberPermission, isFetched: isFetchedMemberPermission } = useQuery(
    ['permission', { memberId, currentOrgId }],
    async () => {
      const permission = await featureFlagHttpClient.get<Record<string, never>>(
        `/api/v2/organisations/${currentOrgId}/members/${memberId}/permission`,
        {
          headers: {
            'session-token': superAppToken,
          },
        }
      );
      return permission.data;
    },
    { enabled: !!superAppToken && !shouldHardCodePermissions && !!currentOrgId && !!memberId }
  );

  const { data: candidatePermission, isFetched: isFetchedCandidatePermission } = useGetNoOrgPermissionsQuery(
    { candidate: isCandidate },
    { enabled: !!superAppToken && shouldHardCodePermissions }
  );

  const permissions = useMemo(
    () =>
      memberPermission
        ? mapPermission(memberPermission)
        : candidatePermission?.me?.noOrgPermissions ?? ({} as PermissionData),
    [memberPermission, candidatePermission]
  );

  const isFetchedPermission = isFetchedMemberPermission || isFetchedCandidatePermission;

  useEffect(() => {
    if (permissions) {
      usePermissionStore.setState({
        permissions: { ...permissions, ...(overridePermissionForTesting || {}) },
        isFetchedPermission,
      });
    }
  }, [permissions, isFetchedPermission, overridePermissionForTesting]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default PermissionProvider;
