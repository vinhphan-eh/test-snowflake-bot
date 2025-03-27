import React from 'react';
import { ScrollView } from 'react-native';
import { Box, useTheme, Spinner } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../../common/assets/images';
import { useShowAppSwitcherOnFocus } from '../../../common/shared-hooks/useShowAppSwitcherOnFocus';
import { usePermissionStore } from '../../../common/stores/usePermissionStore';
import type { RootStackNavigationProp } from '../../../navigation/navigationTypes';
import type {
  GetEventsInput,
  GetFundNotifyPreferenceInput,
  LifecycleEvent,
  SwagSuperfund,
} from '../../../new-graphql/generated';
import {
  useGetActiveSuperfundMembershipsQuery,
  useGetEventsPaginatedQuery,
  useGetFundNotifyPreferenceQuery,
  useGetSuperContributionsQuery,
  useGetSwagSuperfundAndSuperContributionQuery,
} from '../../../new-graphql/generated';
import { FundDetailsTile } from '../components/FundDetailsTile';
import { ResyncSuperTile } from '../components/ResyncSuperTile';
import { SuperannuationAd } from '../components/SuperannuationAd';
import { SuperannuationLifecycleEvent } from '../components/SuperannuationLifecycleEvent';
import SuperfundHeader from '../components/SuperfundHeader';
import { VisitSuperFAQ } from '../components/VisitSuperFAQ';
import { ConsolidationTile } from '../consolidation/components/ConsolidationTile';
import { useSuperNavigation } from '../hooks/useSuperNavigation';
import { LIFECYCLE_EVENT_DELIVERY_STATUS, LIFECYCLE_EVENTS } from '../lifecycle/constants';
import BoostYourSuperTile from '../salary-sacrifice/components/BoostYourSuperTile';
import ManageContributionTile from '../salary-sacrifice/components/ManageContributionTile';
import { SuperDetailCard } from '../salary-sacrifice/components/SuperDetailCard';
import { isLifecycleOffboardingDownloadChoiceFormFlow } from '../utils/helper';
import { isSpaceship } from '../utils/isSpaceship';

export const SuperDashboardScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  useShowAppSwitcherOnFocus(navigation);
  const { navigateToSuperfundDetails } = useSuperNavigation();

  const { bottom: bottomInset } = useSafeAreaInsets();
  const { space } = useTheme();

  const salarySacrificePermission = usePermissionStore(state => state.permissions?.superSalarySacrifice?.view);
  const customFundAssetPermission = usePermissionStore(state => state.permissions?.customFundAssetSwag?.view);
  const superfundLifecycleV1Permission = usePermissionStore(state => state.permissions?.superfundLifecycleV1?.view);

  // Swag Superfund
  const { data, isLoading } = useGetSwagSuperfundAndSuperContributionQuery();

  // Lifcycle events
  const getEventsParameters: GetEventsInput = {
    code: LIFECYCLE_EVENTS.OFFBOARDING,
    order_by: 'created_at',
    order_direction: 'desc',
    delivery_status: LIFECYCLE_EVENT_DELIVERY_STATUS.INITIAL,
    accepted: false,
  };

  const { data: getEventsPaginatedData, isLoading: isGetEventsPaginatedLoading } = useGetEventsPaginatedQuery(
    {
      input: getEventsParameters,
    },
    { enabled: superfundLifecycleV1Permission }
  );

  const fundUsi = getEventsPaginatedData?.me?.lifecycle?.events?.[0]?.fund_usi;

  // Get user notify fund preference
  const getNotifyFundPreferenceParams: GetFundNotifyPreferenceInput = {
    event_type: LIFECYCLE_EVENTS.OFFBOARDING,
    fund_usi: fundUsi || '',
  };

  const { data: notifyFundPreferenceData, isLoading: isGetNotifyFundPreferenceLoading } =
    useGetFundNotifyPreferenceQuery(
      {
        input: getNotifyFundPreferenceParams,
      },
      { enabled: !!(superfundLifecycleV1Permission && fundUsi) }
    );

  const isNotifyFundEnabled = notifyFundPreferenceData?.me?.lifecycle?.fundNotifyPreference?.enabled;

  const isShowLifecycleEvent =
    superfundLifecycleV1Permission &&
    !isGetEventsPaginatedLoading &&
    getEventsPaginatedData?.me?.lifecycle?.events &&
    getEventsPaginatedData?.me?.lifecycle?.events.length > 0 &&
    isNotifyFundEnabled === false && // Only show if user has not enabled notify fund
    !isGetNotifyFundPreferenceLoading &&
    fundUsi &&
    !isLifecycleOffboardingDownloadChoiceFormFlow(fundUsi);

  const swagSuperfund = data?.me?.swagSuperfund;

  // Super Contribution
  const { data: superContributionData } = useGetSuperContributionsQuery();
  const superContributions = superContributionData?.me?.superContributions;
  const { data: membershipData, isLoading: isLoadingMembership } = useGetActiveSuperfundMembershipsQuery();

  // Super consolidation
  const consolidationPermission = usePermissionStore(state => state.permissions?.superConsolidation?.view);

  const renderSuperDetailsAndSacrifice = (swagSuperfundData: SwagSuperfund) => {
    let image = images.salarySacrificeAd;
    if (isSpaceship(swagSuperfundData.usi) && customFundAssetPermission) {
      image = images.spaceshipContributionTileLogo;
    }

    const showResyncSuperTile =
      swagSuperfundData &&
      membershipData?.me?.orgs &&
      membershipData.me.orgs.length > 0 &&
      !membershipData.me.orgs.some(org => {
        const membership = org?.activeSuperfundMembership;
        return (
          membership?.abn === swagSuperfundData.abn &&
          membership?.usi === swagSuperfundData.usi &&
          membership.fundChoice === swagSuperfundData.fundChoice &&
          membership.fundName === swagSuperfundData.fundName &&
          membership.memberNumber === swagSuperfundData.memberNumber
        );
      });

    if (salarySacrificePermission) {
      if (!superContributions) {
        return (
          <>
            {swagSuperfund && (
              <Box paddingHorizontal="medium" marginBottom="medium">
                <FundDetailsTile onPress={() => navigateToSuperfundDetails(swagSuperfund)} />
              </Box>
            )}
            {showResyncSuperTile && (
              <Box paddingHorizontal="medium" marginBottom="medium">
                <ResyncSuperTile />
              </Box>
            )}
            <BoostYourSuperTile
              image={image}
              disabled={showResyncSuperTile}
              trackingAttributes={{ fundName: swagSuperfund?.fundName ?? '', usi: swagSuperfund?.usi ?? '' }}
            />
          </>
        );
      }

      return (
        <>
          <Box display="flex" flexDirection="row" paddingHorizontal="medium">
            {swagSuperfund && <FundDetailsTile onPress={() => navigateToSuperfundDetails(swagSuperfund)} />}
            {superContributions && (
              <ManageContributionTile
                disabled={showResyncSuperTile}
                trackingAttributes={{ fundName: swagSuperfund?.fundName ?? '', usi: swagSuperfund?.usi ?? '' }}
              />
            )}
          </Box>
          {showResyncSuperTile && (
            <Box paddingHorizontal="medium" paddingTop="medium">
              <ResyncSuperTile />
            </Box>
          )}
        </>
      );
    }

    return <SuperDetailCard data={swagSuperfundData} />;
  };

  if (isLoading || isLoadingMembership) {
    return <Spinner testID="spinner" />;
  }

  return (
    <ScrollView testID="super-dashboard-screen" showsVerticalScrollIndicator={false}>
      <Box style={{ marginBottom: bottomInset + space.medium }}>
        {swagSuperfund ? (
          <>
            <SuperfundHeader swagSuperfund={swagSuperfund} />

            {isShowLifecycleEvent && (
              <SuperannuationLifecycleEvent
                data={getEventsPaginatedData?.me?.lifecycle?.events?.[0] as LifecycleEvent}
              />
            )}

            {renderSuperDetailsAndSacrifice(swagSuperfund)}

            {consolidationPermission && <ConsolidationTile swagSuperfund={swagSuperfund} />}
            <VisitSuperFAQ />
          </>
        ) : (
          <SuperannuationAd />
        )}
      </Box>
    </ScrollView>
  );
};
