import React from 'react';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { InlineTextLink } from '../../../../common/components/inline-text-link';
import { OutcomeTemplate } from '../../../../common/components/outcome-template/OutcomeTemplate';
import { PillarIds, WalletTabKeys } from '../../../../common/constants/navigation';
import { switchPillar } from '../../../../common/stores/useMiniAppSwitcherStore';
import {
  EwaPushNotificationFeature,
  useOptInEwaPushNotificationByFeatureMutation,
} from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { InstaPaySuccessScreenAdTile } from '../../instapay/components/InstapaySuccessScreenAdTile';
import { isInstapayError } from '../../instapay/utils/graphql-processor';
import type {
  InstaPaySchedulingRouteProp,
  InstaPaySchedulingScreenNavigationProp,
} from '../navigation/navigationTypes';
import { useInstaPaySchedulingStore } from '../stores/useInstaPaySchedulingStore';

export const InstaPaySchedulingSuccessScreen = () => {
  const route = useRoute<InstaPaySchedulingRouteProp<'InstaPaySchedulingSuccess'>>() || {};
  const navigation = useNavigation<InstaPaySchedulingScreenNavigationProp<'InstaPaySchedulingSuccess'>>();
  const { space } = useTheme();
  const { action, formattedAmount, orgId, payDay = '' } = route.params;
  const { formatMessage } = useIntl();
  let title = formatMessage({ id: 'common.success' });
  let content = formatMessage({ id: 'instapay.scheduling.successScreen.modification.subtitle' });
  const isByAmount = action === 'creation' || action === 'byAmountModification';
  const isByDay = action === 'byDayCreation' || action === 'byDayModification';
  const isCreation = action === 'creation' || action === 'byDayCreation';
  const isUpdate = action === 'byAmountModification' || action === 'byDayModification';
  const { isLoading: isOptingInPushNotification, mutateAsync: optInPushNotification } =
    useOptInEwaPushNotificationByFeatureMutation();
  const currentMembership = useInstaPaySchedulingStore(state => state.membership);

  if (isByAmount) {
    title = formatMessage(
      {
        id: 'instapay.scheduling.successScreen.title',
      },
      {
        amount: formattedAmount,
      }
    );
    content = formatMessage({
      id: 'instapay.scheduling.successScreen.subtitle',
    });
  }

  if (isByDay) {
    title = formatMessage(
      {
        id:
          formattedAmount === formatMessage({ id: 'instapay.scheduling.byDaySubscription.amountOption.anyBalances' })
            ? 'instapay.scheduling.successScreen.byDay.anyBalanceTitle'
            : 'instapay.scheduling.successScreen.byDay.title',
      },
      {
        amount: formattedAmount,
        day: payDay,
      }
    );
    content = formatMessage({
      id: 'instapay.scheduling.successScreen.subtitle',
    });
  }

  const navigateBackToIncomeTab = () => {
    switchPillar({
      to: {
        pillarId: PillarIds.WalletApp,
        tab: WalletTabKeys.INCOME,
      },
    });
  };

  const onNext = () => {
    if (isUpdate) {
      navigateBackToIncomeTab();
    } else {
      navigation.replace('InstaPaySchedulingOptOutSurvey');
    }
  };

  const navigateToErrorScreen = () => {
    navigation.replace('InstaPaySchedulingError');
  };

  const onPressedOptIn = async () => {
    try {
      const response = await optInPushNotification({
        input: {
          feature: isByAmount
            ? EwaPushNotificationFeature.EwaRecurringByAmount
            : EwaPushNotificationFeature.EwaRecurringByDay,
          orgId: orgId ?? currentMembership?.getId() ?? '',
        },
      });

      const apiResult = response?.ewaPushNotification?.optInByFeature;
      if (isInstapayError(apiResult) || !apiResult?.success) {
        navigateToErrorScreen();
        return;
      }

      navigation.replace('IncomeStack', {
        screen: 'EWAPushNotificationManagement',
        params: {
          orgId,
        },
      });
    } catch {
      navigateToErrorScreen();
    }
  };

  const onPressedMaybeLater = () => {
    navigateBackToIncomeTab();
  };

  const onPressedFindOutMore = () => {
    navigation.replace('IncomeStack', {
      screen: 'EWAPushNotificationManagement',
      params: {
        orgId,
      },
    });
  };

  const Actions = isCreation ? (
    <Box marginBottom="small">
      <InstaPaySuccessScreenAdTile
        caption={formatMessage({ id: 'instapay.pushNotification.recurringSuccessCTA.title' })}
        content={
          <Box>
            <Typography.Body
              style={{
                marginBottom: space.medium,
              }}
            >
              {formatMessage({ id: 'instapay.pushNotification.recurringSuccessCTA.description' })}{' '}
              <InlineTextLink
                variant="regular"
                onPress={onPressedFindOutMore}
                style={{ marginBottom: space.small }}
                intent="primary"
                disabled={isOptingInPushNotification}
              >
                {formatMessage({ id: 'common.findOutMore' })}.
              </InlineTextLink>
            </Typography.Body>
          </Box>
        }
        navigationButtonText={formatMessage({
          id: 'common.yes',
        })}
        navigationButtonProps={{
          loading: !!isOptingInPushNotification,
        }}
        onPressed={onPressedOptIn}
        testID="recurring-push-notif-opt-in-cta"
      />
      <Button
        variant="text"
        onPress={onPressedMaybeLater}
        accessibilityLabel="Maybe later"
        text={formatMessage({ id: 'common.maybeLater' })}
        disabled={!!isOptingInPushNotification}
      />
    </Box>
  ) : (
    [
      {
        buttonTitle: formatMessage({
          id: 'common.done',
        }),
        onNext,
      },
    ]
  );

  return (
    <OutcomeTemplate
      actions={Actions}
      title={title}
      content={content}
      imageName="flying-instapay"
      imageHeight={152}
      imageWidth={212}
    />
  );
};
