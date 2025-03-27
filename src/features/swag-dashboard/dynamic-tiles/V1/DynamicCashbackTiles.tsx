import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { DeepLinkEvent } from '@ehrocks/react-native-superapp-communication';
import CashbackTile from './CashbackTile';
import { useDynamicCashbackTilesVisibility } from './hooks/useDynamicCashbackTilesVisibility';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import type { OnlineOffer } from '../../../../new-graphql/generated';
import useTrackingDashboard from '../../utils/useTrackingDashboard';

const openDeepLink = (deepLink: string) => {
  DeepLinkEvent.dispatchOpenDeepLinkEvent({ url: deepLink });
};

interface CashbackTilesProps {
  travelOnlineOffers: Array<OnlineOffer>;
  style?: StyleProp<ViewStyle>;
}

export const CashbackTiles = ({ style, travelOnlineOffers }: CashbackTilesProps) => {
  const setPillar = useSessionStore(state => state.setPillar);
  const { trackingClickOnDashboardCashbackWidget } = useTrackingDashboard();
  const onPress = (offerID: string) => {
    setPillar?.('BenefitsApp');
    openDeepLink(`platform_redirect/benefits/cashback-offers/${offerID}`);
  };

  return (
    <>
      {travelOnlineOffers.map(travelOnlineOffer => (
        <CashbackTile
          testID={`dynamic-cashback-tile-${travelOnlineOffer.id}`}
          key={travelOnlineOffer.id}
          permission
          backgroundSource={travelOnlineOffer.imageUrl}
          logoSource={travelOnlineOffer.logoUrl}
          title={travelOnlineOffer.cashback}
          subtitle={travelOnlineOffer.title}
          style={style}
          onPress={() => {
            trackingClickOnDashboardCashbackWidget(travelOnlineOffer.advertiserName);
            onPress(travelOnlineOffer.id);
          }}
        />
      ))}
    </>
  );
};

export const DynamicCashbackTiles = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  const { travelOnlineOffers, visibleDynamicCashbackTiles } = useDynamicCashbackTilesVisibility();

  if (!visibleDynamicCashbackTiles) {
    return null;
  }

  return <CashbackTiles travelOnlineOffers={travelOnlineOffers} style={style} />;
};
