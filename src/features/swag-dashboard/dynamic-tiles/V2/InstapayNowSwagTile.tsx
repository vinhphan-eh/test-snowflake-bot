import React, { useEffect, useState } from 'react';
import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import dayjs from 'dayjs';
import { EstBalanceImageContent } from './InstapayNowEstBalanceImageContent';
import { InstapaySwagTileBase } from './InstapaySwagTileBase';
import { InstapaySwagTileSkeleton } from './skeletons/InstapaySwagTileSkeleton';
import images from '../../../../common/assets/images';
import ThemeSwitcher from '../../../../common/utils/ThemeSwitcher';
import { InstapayPayType, useGetInstapayTransactionsQuery } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useEstInstaPayNowBalances } from '../../../income/instapay/hooks/useEstInstaPayNowBalances';
import { useInstaPayAvailableBalances } from '../../../income/instapay/hooks/useInstaPayAvailableBalances';
import { getInstapayNowEventType, useInstapayTracking } from '../../../income/instapay/hooks/useInstapayTracking';
import { useOpenInstaPayFlowFromDashboard } from '../../../income/instapay/hooks/useOpenInstaPayFlowFromDashboard';
import { isInstapayError } from '../../../income/instapay/utils/graphql-processor';

type InstaPayNowSwagTileProps = {
  style?: StyleProp<ViewStyle>;
  underMaintenance: boolean;
};

export const InstaPayNowSwagTile = ({ style, underMaintenance }: InstaPayNowSwagTileProps) => {
  const { formatMessage } = useIntl();
  const { openInstaPayFlow } = useOpenInstaPayFlowFromDashboard({ underMaintenance });

  const { trackClickOnInstapayNowDynamicTile, trackSeeInstapayNowDynamicTile } = useInstapayTracking();
  const [itemState, setItemState] = useState<{
    title: string;
    image: ImageSourcePropType;
    imageContentKey: 'balance' | undefined;
    balance?: number;
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
  } = useInstaPayAvailableBalances({ enabled: true, location: 'V2/InstapayNowSwagTile' });

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
        title: formatMessage({ id: 'dynamicTiles.instaPayNowSwagTile.accessYourPayNow' }),
        image: images.instapayEstBalanceBg,
        imageContentKey: 'balance',
        balance: estBalance,
        updatedAt: estBalanceUpdatedAt,
      });
      return;
    }
    if (allOrgsViolatePolicy || (isBalanceLoading && !hasEstBalance)) {
      setItemState({
        title: formatMessage({ id: 'dynamicTiles.instaPayNowSwagTile.learnAboutGetPaidOnDemand' }),
        image: images.instapayNowNewUser,
        imageContentKey: undefined,
      });
    } else {
      setItemState({
        title: formatMessage({ id: 'dynamicTiles.instaPayNowSwagTile.accessYourPayNow' }),
        image: images.instapayEstBalanceBg,
        imageContentKey: 'balance',
        balance: sumAvailableBalance,
        updatedAt: dayjs().subtract(1, 'minutes').toDate(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isEstBalanceLoading]);

  useEffect(() => {
    if (shouldSendMixpanelEvent) {
      trackSeeInstapayNowDynamicTile(instapayNowEventType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldSendMixpanelEvent]);

  if (isBalanceError) {
    return null;
  }

  // show skeleton when loading the estBalance
  if (isEstBalanceLoading) {
    return <InstapaySwagTileSkeleton testID="instapay-now-skeleton" />;
  }

  const getBalanceTileContent = (balance: number, updatedAt: Date | undefined) => {
    return (
      <ThemeSwitcher name="eBens">
        <EstBalanceImageContent testID="pay-ready-image-content" availableBalance={balance} updatedAt={updatedAt} />
      </ThemeSwitcher>
    );
  };

  return (
    <InstapaySwagTileBase
      style={style}
      testID="instapay-now-swag-tile"
      title={itemState?.title ?? ''}
      // when users made new transactions, we refetch the data to show the correct balance
      isLoading={isBalanceRefetching}
      imgSrc={itemState?.image}
      onPress={() => {
        if (shouldSendMixpanelEvent) {
          trackClickOnInstapayNowDynamicTile(instapayNowEventType);
        }
        openInstaPayFlow();
      }}
      imgContent={
        itemState?.imageContentKey === 'balance'
          ? getBalanceTileContent(itemState?.balance ?? 0, itemState?.updatedAt)
          : null
      }
    />
  );
};
