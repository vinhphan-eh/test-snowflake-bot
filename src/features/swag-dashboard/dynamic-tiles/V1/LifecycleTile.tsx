import React from 'react';
import { Dashboard } from '@ehrocks/rn-swag-ui';
import { Box, Icon, scale, Spinner, Typography, useTheme } from '@hero-design/rn';
import { PillarIds, WalletTabKeys } from '../../../../common/constants/navigation';
import { switchPillar } from '../../../../common/stores/useMiniAppSwitcherStore';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { parseJSON } from '../../../../common/utils/common';
import ThemeSwitcher from '../../../../common/utils/ThemeSwitcher';
import {
  useGetEventsPaginatedQuery,
  useGetFundNotifyPreferenceQuery,
  type GetEventsInput,
  type GetFundNotifyPreferenceInput,
} from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { LIFECYCLE_EVENT_DELIVERY_STATUS, LIFECYCLE_EVENTS } from '../../../super/lifecycle/constants';
import type { OffboardingEventData } from '../../../super/lifecycle/types/event';
import { isLifecycleOffboardingDownloadChoiceFormFlow } from '../../../super/utils/helper';
import { formatSubTitle } from '../../utils/common';

export const LifecycleTile = () => {
  const theme = useTheme();
  const Intl = useIntl();
  const superfundLifecycleV1Permission = usePermissionStore(state => state.permissions?.superfundLifecycleV1?.view);

  const getMostRecentOffboardingEvent: GetEventsInput = {
    code: LIFECYCLE_EVENTS.OFFBOARDING,
    order_by: 'created_at',
    order_direction: 'desc',
    delivery_status: LIFECYCLE_EVENT_DELIVERY_STATUS.INITIAL,
    accepted: false,
  };

  const {
    data: getEventsPaginatedData,
    isError: isGetEventsPaginatedError,
    isLoading: isGetEventsPaginatedLoading,
  } = useGetEventsPaginatedQuery(
    {
      input: getMostRecentOffboardingEvent,
    },
    { enabled: superfundLifecycleV1Permission }
  );

  const eventData = getEventsPaginatedData?.me?.lifecycle?.events?.[0]?.data;
  const parsedEventData = parseJSON<OffboardingEventData>(eventData ?? '{}');

  const displayFundName = parsedEventData?.fund_name ?? 'your super';
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

  const isShowingLifecycleEvent =
    superfundLifecycleV1Permission &&
    !isGetEventsPaginatedError &&
    !isGetEventsPaginatedLoading &&
    getEventsPaginatedData?.me?.lifecycle?.events &&
    getEventsPaginatedData?.me?.lifecycle?.events.length > 0 &&
    isNotifyFundEnabled === false && // Only show if user has not enabled notify fund
    !isGetNotifyFundPreferenceLoading &&
    fundUsi &&
    !isLifecycleOffboardingDownloadChoiceFormFlow(fundUsi);

  const onPress = () => {
    switchPillar({
      to: {
        pillarId: PillarIds.WalletApp,
        tab: WalletTabKeys.SUPER,
      },
    });
  };

  if (!isShowingLifecycleEvent) {
    return null;
  }

  return (
    <ThemeSwitcher name="wallet">
      <Dashboard.WidgetCard
        testID="lifecycle-test-id"
        style={[
          {
            height: scale(160),
            width: scale(134),
            padding: theme.space.smallMedium,
            marginLeft: theme.space.smallMedium,
            backgroundColor: theme.colors.neutralGlobalSurface,
          },
        ]}
        onPress={onPress}
        variant="half-width"
      >
        <Box
          style={{
            alignItems: 'flex-end',
            height: theme.sizes.xlarge,
          }}
        >
          <Icon icon="salary-sacrifice" intent="primary" />
        </Box>

        {isGetEventsPaginatedLoading ? (
          <Box style={{ height: theme.space.large, alignSelf: 'center' }}>
            <Spinner testID="spinner" size="small" intent="primary" />
          </Box>
        ) : (
          <Box flexGrow={1} justifyContent="flex-end">
            <>
              <Box>
                <Typography.Caption intent="primary">
                  {Intl.formatMessage({ id: 'dynamicTiles.lifecycle.title' })}
                </Typography.Caption>
              </Box>

              <Box
                style={{
                  marginVertical: theme.space.small,
                }}
              >
                <Typography.Title intent="primary" level="h5" typeface="playful">
                  {Intl.formatMessage({
                    id: 'dynamicTiles.lifecycle.offboardingTitle',
                  })}
                </Typography.Title>
              </Box>
            </>

            <Typography.Caption intent="primary">
              {formatSubTitle(`${Intl.formatMessage({ id: 'dynamicTiles.lifecycle.subtitle' })} ${displayFundName}`)}
            </Typography.Caption>
          </Box>
        )}
      </Dashboard.WidgetCard>
    </ThemeSwitcher>
  );
};
