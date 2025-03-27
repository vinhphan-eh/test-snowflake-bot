import React, { useRef, forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import type { CaptionedContentCard } from '@braze/react-native-sdk';
import Braze from '@braze/react-native-sdk';
import { Box } from '@hero-design/rn';
import { usePrefetchInstapayBalance } from './hooks/usePrefetchInstapayBalance';
import { PopupContent } from './PopupContent';
import { useInstapayExpPopupStore } from './stores/useInstapayExpPopupStore';
import type { BottomSheetRef } from '../../../../../common/components/bottom-sheet/BottomSheet';
import { CustomBottomSheetView } from '../../../../../common/components/bottom-sheet/CustomBottomSheetView';
import { useIncomeVisibility } from '../../../../../common/hooks/useIncomeVisibility';
import { useLoadBrazeContentCards } from '../../../../../common/hooks/useLoadBrazeContentCards';
import { useOneTimeEffect } from '../../../../../common/shared-hooks/useOneTimeEffect';
import { switchPillar } from '../../../../../common/stores/useMiniAppSwitcherStore';
import { durationSinceDate } from '../../../../../common/utils/date';
import { useGetInstapayAdsQuery } from '../../../../../new-graphql/generated';
import {
  INSTAPAY_POPUP_BRAZE_CARD_ID,
  INSTAPAY_POPUP_CARD_ZERO_BALANCE_BRAZE_ID,
  ROSTER_POPUP_BRAZED_ID,
  ROSTER_POPUP_ZERO_BALANCE_BRAZED_ID,
  getPopupIdByFeature,
} from '../../constants/braze';
import type { TargetedFeature } from '../../hooks/useInstapayTracking';
import { useInstapayTracking } from '../../hooks/useInstapayTracking';
import { useOpenInstaPayFlowFromDashboard } from '../../hooks/useOpenInstaPayFlowFromDashboard';

export type InstapayExpPopupProps = {
  onHavingBrazeCard?: () => void;
};

export type InstapayExpPopupRef = {
  open: (feature: TargetedFeature) => void;
  close: () => void;
};

const oneDayInMs = 24 * 60 * 60 * 1000;

export const InstapayExpPopup = forwardRef<InstapayExpPopupRef, InstapayExpPopupProps>(({ onHavingBrazeCard }, ref) => {
  const { cards } = useLoadBrazeContentCards();
  const bsRef = useRef<BottomSheetRef>(null);
  const savedFeature = useRef<TargetedFeature | null>(null);
  const isZeroBalance = useRef<boolean>(false);
  const isInstapayNowUnderMaintenance = useRef<boolean>(false);
  const { data } = useGetInstapayAdsQuery();
  const { trackUserClickInstapayExperimentTile, trackUserSeeInstapayExperimentTile } = useInstapayTracking();
  const interval = data?.me?.experiment?.instapayAds?.adDisplayInterval || oneDayInMs;
  const { instapayNowUnderMaintenance } = useIncomeVisibility();
  const { hasZeroBalance } = usePrefetchInstapayBalance('InstapayExpPopup');
  const { openInstaPayFlow } = useOpenInstaPayFlowFromDashboard({
    underMaintenance: instapayNowUnderMaintenance,
  });
  const [card, setCard] = useState<CaptionedContentCard | undefined>(undefined);
  const cardId = card?.id;
  // let useInstapayExpPopupStore hydrate before enter useImperativeHandle
  const saveLastOpenedDate = useInstapayExpPopupStore(state => state.saveLastOpenedDate);

  useEffect(() => {
    isZeroBalance.current = hasZeroBalance;
    isInstapayNowUnderMaintenance.current = instapayNowUnderMaintenance;
  }, [hasZeroBalance, instapayNowUnderMaintenance]);

  useImperativeHandle(
    ref,
    () => ({
      open: feature => {
        // values from outside is not updated, need to update ref to get it work
        // so need to get directly from store to get latest values
        const { hasHydrate, lastOpenedDate } = useInstapayExpPopupStore.getState();
        if (!hasHydrate) {
          return;
        }

        // Not open when InstaPay Now is under maintenance
        if (isInstapayNowUnderMaintenance.current) {
          return;
        }

        const popupId = getPopupIdByFeature(feature, isZeroBalance.current);
        const newCard = cards?.find(item => item.extras.id === popupId) as CaptionedContentCard;
        const newCardId = newCard?.id;

        setCard(newCard);

        const isFinishCoolDown = lastOpenedDate ? durationSinceDate(lastOpenedDate, 'millisecond') > interval : true;
        if (newCardId && isFinishCoolDown) {
          savedFeature.current = feature;
          trackUserSeeInstapayExperimentTile(feature, isZeroBalance.current);
          Braze.logContentCardImpression(newCardId);
          bsRef.current?.open();
          saveLastOpenedDate(new Date());
        }
      },
      close: () => {
        bsRef.current?.close();
      },
    }),
    // having card meaning bts.ref is ready
    [card]
  );

  const onPress = () => {
    if (cardId) {
      Braze.logContentCardClicked(cardId);
    }
    if (savedFeature.current) {
      trackUserClickInstapayExperimentTile(savedFeature.current, hasZeroBalance);
    }
    bsRef.current?.close();
    if (hasZeroBalance) {
      switchPillar({ to: { pillarId: 'WalletApp', tab: 'income-tab' } });
    } else {
      openInstaPayFlow();
    }
  };

  useOneTimeEffect(() => {
    // only call onHavingBrazeCard once after having btsRef (first time having card)
    // card will be updated by different content cards
    // so calling this multiple times could trigger loop
    if (card) {
      onHavingBrazeCard?.();
      return true;
    }
    return false;
  }, [card]);

  useEffect(() => {
    const popupCardIds = [
      INSTAPAY_POPUP_BRAZE_CARD_ID,
      INSTAPAY_POPUP_CARD_ZERO_BALANCE_BRAZE_ID,
      ROSTER_POPUP_BRAZED_ID,
      ROSTER_POPUP_ZERO_BALANCE_BRAZED_ID,
    ];
    // Make sure at least one card is available to user => popup can be displayed
    const defaultCard = cards?.find(item => popupCardIds.includes(item.extras.id)) as CaptionedContentCard;

    if (!card && defaultCard) {
      // only init default card when there is no card
      setCard(defaultCard);
    }
  }, [card, cards]);

  if (!card) {
    return null;
  }
  return (
    <CustomBottomSheetView
      bsRef={bsRef}
      icon="cancel"
      iconSize="xsmall"
      content={() => (
        <Box backgroundColor="decorativePrimarySurface" paddingTop="xlarge" testID="instapay-exp-popup-content">
          <PopupContent brazeCard={card} onPress={onPress} />
        </Box>
      )}
      title=""
      backgroundColor="decorativePrimarySurface"
    />
  );
});
