import React, { useEffect, useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Braze from '@braze/react-native-sdk';
import dayjs from 'dayjs';
import { EstBalanceImageContentV3 } from './InstapayNowEstBalanceImageContentV3';
import { InstapaySwagTileBaseV3 } from './InstapaySwagTileBaseV3';
import { InstapaySwagTileSkeletonV3 } from './skeletons/InstapaySwagTileSkeletonV3';
import images from '../../../../common/assets/images';
import { useGetCountryCode } from '../../../../common/hooks/useGetCountryCode';
import { useOneTimeEffect } from '../../../../common/shared-hooks/useOneTimeEffect';
import ThemeSwitcher from '../../../../common/utils/ThemeSwitcher';
import { InstapayPayType, useGetInstapayTransactionsQuery } from '../../../../new-graphql/generated';
import { useEstInstaPayNowBalances } from '../../../income/instapay/hooks/useEstInstaPayNowBalances';
import { useInstaPayAvailableBalances } from '../../../income/instapay/hooks/useInstaPayAvailableBalances';
import { getInstapayNowEventType, useInstapayTracking } from '../../../income/instapay/hooks/useInstapayTracking';
import { useOpenInstaPayFlowFromDashboard } from '../../../income/instapay/hooks/useOpenInstaPayFlowFromDashboard';
import { isInstapayError } from '../../../income/instapay/utils/graphql-processor';
import { useLoadBrazeContentForTiles } from '../hooks/useLoadBrazeContentForTiles';

type InstaPayNowSwagTileV3Props = {
  style?: StyleProp<ViewStyle>;
  underMaintenance: boolean;
};

export const InstaPayNowSwagTileV3 = ({ style, underMaintenance }: InstaPayNowSwagTileV3Props) => {
  const { openInstaPayFlow } = useOpenInstaPayFlowFromDashboard({ underMaintenance });
  const { trackClickOnInstapayNowDynamicTile, trackSeeInstapayNowDynamicTile } = useInstapayTracking();
  const countryCode = useGetCountryCode();

  const [itemState, setItemState] = useState<{
    balance?: number;
    isEligibleForInstapayNow?: boolean;
    updatedAt?: Date;
  }>();

  const {
    estBalance,
    hasEstBalance,
    isLoading: isEstBalanceLoading,
    updatedAt: estBalanceUpdatedAt,
  } = useEstInstaPayNowBalances();
  const { data: historyData, isLoading: isTransactionLoading } = useGetInstapayTransactionsQuery(
    { filters: { payType: InstapayPayType.Instapay } },
    { staleTime: 1000 * 60 * 3 }
  );

  const {
    allOrgsViolatePolicy,
    isError: isBalanceError,
    isLoading: isBalanceLoading,
    isRefetching: isBalanceRefetching,
    sumAvailableBalance,
  } = useInstaPayAvailableBalances({ enabled: true, location: 'V3/InstapayNowSwagTileV3' });
  const shouldSendMixpanelEvent = !isTransactionLoading && !isEstBalanceLoading;

  const transactions =
    historyData?.me?.orgs.flatMap(orgData => {
      const result = orgData.instapay?.transactions;
      if (!result || isInstapayError(result)) {
        return [];
      }
      return result.transactions || [];
    }) || [];

  const noIpnHistory = transactions.length === 0;
  // if users have estBalance, and live balance is in loading
  // we still consider to users have balance for simplicity
  const hasBalance =
    (!isBalanceLoading && sumAvailableBalance > 0) || (!isEstBalanceLoading && hasEstBalance && isBalanceLoading);
  const instapayNowEventType = getInstapayNowEventType(noIpnHistory, hasBalance);

  const isLoading = isTransactionLoading || isBalanceLoading;
  useEffect(() => {
    if (isEstBalanceLoading) {
      return;
    }
    if (isLoading && hasEstBalance) {
      setItemState({
        isEligibleForInstapayNow: true,
        balance: estBalance,
        updatedAt: estBalanceUpdatedAt,
      });
      return;
    }
    // if balance is loaded and valid.
    if (!allOrgsViolatePolicy && (hasEstBalance || sumAvailableBalance > 0)) {
      setItemState({
        isEligibleForInstapayNow: true,
        balance: sumAvailableBalance,
        updatedAt: dayjs().subtract(1, 'minutes').toDate(),
      });
    } else {
      setItemState({
        isEligibleForInstapayNow: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isEstBalanceLoading]);

  const brazeContent = useLoadBrazeContentForTiles({
    isIpNowTile: true,
    validIpNow: !!itemState?.isEligibleForInstapayNow,
  });

  useOneTimeEffect(() => {
    if (shouldSendMixpanelEvent && brazeContent) {
      trackSeeInstapayNowDynamicTile(instapayNowEventType, countryCode);
      return true;
    }
    return false;
  }, [shouldSendMixpanelEvent, brazeContent, countryCode, trackSeeInstapayNowDynamicTile, instapayNowEventType]);

  // if no Braze content, will be no tiles shown.
  if (!brazeContent) {
    return null;
  }

  const { cardId, extras, image } = brazeContent;
  const { amountType, postfixText, prefixText, textColor } = extras;
  const shouldFetchNowBalance = amountType === 'now_balance';

  const onTilePress = () => {
    if (shouldSendMixpanelEvent) {
      trackClickOnInstapayNowDynamicTile(instapayNowEventType, countryCode);
    }
    Braze.logContentCardClicked(cardId);
    openInstaPayFlow();
  };

  // fallback for fetching balance error
  if (isBalanceError) {
    return (
      <InstapaySwagTileBaseV3
        style={style}
        testID="instapay-now-swag-tile"
        isLoading={false}
        imgSrc={images.instapayNowNewUser}
        onPress={onTilePress}
      />
    );
  }

  // show skeleton when loading the estBalance
  if (isEstBalanceLoading && shouldFetchNowBalance) {
    return <InstapaySwagTileSkeletonV3 style={style} testID="instapay-now-skeleton" />;
  }

  const getBalanceTileContent = (balance: number, updatedAt: Date | undefined) => {
    return (
      <ThemeSwitcher name="eBens">
        <EstBalanceImageContentV3
          testID="pay-ready-image-content"
          availableBalance={balance}
          updatedAt={updatedAt}
          typographyIntent={textColor}
          prefixText={prefixText}
          postfixText={postfixText}
          shouldShowAvailableBalance={shouldFetchNowBalance}
        />
      </ThemeSwitcher>
    );
  };

  return (
    <InstapaySwagTileBaseV3
      style={style}
      testID="instapay-now-swag-tile"
      // when users made new transactions, we refetch the data to show the correct balance
      isLoading={isBalanceRefetching}
      imgSrc={image ? { uri: image } : images.instapayEstBalanceBg}
      onPress={onTilePress}
      imgContent={getBalanceTileContent(itemState?.balance ?? 0, itemState?.updatedAt)}
    />
  );
};
