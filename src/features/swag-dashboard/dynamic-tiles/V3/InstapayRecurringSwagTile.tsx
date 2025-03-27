import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import Braze from '@braze/react-native-sdk';
import { Box, Typography } from '@hero-design/rn';
import { InstapaySwagTileBaseV3 } from './InstapaySwagTileBaseV3';
import { InstapaySwagTileSkeletonV3 } from './skeletons/InstapaySwagTileSkeletonV3';
import images from '../../../../common/assets/images';
import { CurrencyText } from '../../../../common/components/currency-text/CurrencyText';
import { useGetCountryCode } from '../../../../common/hooks/useGetCountryCode';
import { useIsAccountUK } from '../../../../common/hooks/useIsAccountUK';
import { useOneTimeEffect } from '../../../../common/shared-hooks/useOneTimeEffect';
import { switchPillar } from '../../../../common/stores/useMiniAppSwitcherStore';
import { getFloatAmountFromMoneyV2 } from '../../../../common/utils/currency';
import ThemeSwitcher from '../../../../common/utils/ThemeSwitcher';
import {
  useGetSchedulingSubscriptionsQuery,
  type GetSchedulingSubscription,
  type GetSchedulingSubscriptionsQuery,
  type SchedulingSubscription,
} from '../../../../new-graphql/generated';
import { useInstapayTracking } from '../../../income/instapay/hooks/useInstapayTracking';
import { isInstapayError } from '../../../income/instapay/utils/graphql-processor';
import {
  WithdrawYourEarnedPaySectionKey,
  useWithdrawYourEarnedPaySectionStore,
} from '../../../income/instapay-scheduling/stores/useWithdrawYourEarnedPaySectionStore';
import { useLoadBrazeContentForTiles } from '../hooks/useLoadBrazeContentForTiles';

type InstapayRecurringSwagTileProps = {
  style?: StyleProp<ViewStyle>;
};

// Helper function to get scheduled amount, 0 also indicate not register for recurring withdrawal
function getScheduledAmount(schedulingSubsData: GetSchedulingSubscriptionsQuery | undefined): number {
  const instapaySchedulingSubs = schedulingSubsData?.me?.orgs
    .filter(organisation => !isInstapayError(organisation?.instapay?.schedulingSubscriptions))
    .map(
      organisation => (organisation?.instapay?.schedulingSubscriptions as GetSchedulingSubscription)?.subscriptions?.[0]
    )
    .filter(subscription => (subscription as SchedulingSubscription)?.id);

  const v2Money = instapaySchedulingSubs?.at(0)?.amount;
  return v2Money ? getFloatAmountFromMoneyV2(v2Money) : 0;
}

export const InstapayRecurringSwagTile = ({ style }: InstapayRecurringSwagTileProps) => {
  const { trackClickOnInstapayRecurringTile, trackSeeInstapayRecurringTile } = useInstapayTracking();
  const {
    data: schedulingSubsData,
    isError: isGetSchedulingSubscriptionsError,
    isLoading: isScheduledSubscriptionsLoading,
  } = useGetSchedulingSubscriptionsQuery();
  const isUKAccount = useIsAccountUK();
  const countryCode = useGetCountryCode();

  const amount = getScheduledAmount(schedulingSubsData);
  const isRecurringSetUp = amount > 0;

  const brazeContent = useLoadBrazeContentForTiles({ isRecurringSetUp });

  useOneTimeEffect(() => {
    if (brazeContent) {
      trackSeeInstapayRecurringTile(isRecurringSetUp, countryCode);
      return true;
    }
    return false;
  }, [brazeContent, isRecurringSetUp, countryCode, trackSeeInstapayRecurringTile]);

  if (!brazeContent) {
    return null;
  }

  const { cardId, extras, image } = brazeContent;
  const { amountType, postfixText, prefixText, textColor } = extras;
  const shouldFetchScheduledBalance = amountType === 'scheduled';

  const onTilePress = () => {
    trackClickOnInstapayRecurringTile(isRecurringSetUp, countryCode);
    if (cardId) {
      Braze.logContentCardClicked(cardId);
    }

    switchPillar({ to: { pillarId: 'WalletApp', tab: 'income-tab' } });
    useWithdrawYourEarnedPaySectionStore.setState({ selectedTabKey: WithdrawYourEarnedPaySectionKey.RECURRING });
  };

  if (isGetSchedulingSubscriptionsError) {
    return (
      <InstapaySwagTileBaseV3
        style={style}
        testID="instapay-recurring-swag-fall-over-tile"
        isLoading={false}
        imgSrc={images.instapayMasterYourFinance}
        onPress={onTilePress}
      />
    );
  }

  // show skeleton when loading the estBalance
  if (isScheduledSubscriptionsLoading && shouldFetchScheduledBalance) {
    return <InstapaySwagTileSkeletonV3 style={style} testID="instapay-recurring-skeleton" />;
  }

  const getTileContent = () => {
    const shouldShowScheduledBalance = shouldFetchScheduledBalance && amount > 0;
    return (
      <ThemeSwitcher name="eBens">
        <Box style={{ width: '100%', height: '100%' }} padding="medium" justifyContent="center" alignItems="center">
          {prefixText ? (
            <Typography.Caption
              intent={textColor}
              style={{
                textAlign: 'center',
              }}
            >
              {prefixText}
            </Typography.Caption>
          ) : null}
          {shouldShowScheduledBalance ? (
            <CurrencyText
              amount={amount}
              renderCurrency={currency => (
                <Typography.Title intent={textColor} typeface="playful" level="h3">
                  {currency}
                </Typography.Title>
              )}
              isShowDecimal={false}
              currency={isUKAccount ? 'GBP' : 'AUD'}
            />
          ) : null}
          {postfixText ? (
            <Typography.Caption
              intent={textColor}
              style={{
                textAlign: 'center',
              }}
            >
              {postfixText}
            </Typography.Caption>
          ) : null}
        </Box>
      </ThemeSwitcher>
    );
  };

  return (
    <InstapaySwagTileBaseV3
      style={style}
      testID="instapay-recurring-swag-tile"
      isLoading={false}
      imgSrc={image ? { uri: image } : images.instapayRecurringSetupBg}
      onPress={onTilePress}
      imgContent={getTileContent()}
    />
  );
};
