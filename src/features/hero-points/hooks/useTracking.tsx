import { useMixpanel } from '../../../common/hooks/useMixpanel';
import { EventTrackingCategory } from '../../../common/stores/useSessionStore';
import {
  CLICK_OPEN_SPEND_ACCOUNT_TO_REDEEM_HERO_POINTS_TILE,
  CLICK_REDEEM_HERO_POINTS_WITH_SWAG_CARD_TILE,
  CLICK_TRANSACTION_LIST_ITEM,
  CLICK_TREAT_YOURSELF_CARD,
  CLICK_TURN_POINTS_TO_GIFT_CARDS_TILE,
  COMPONENT_PAY_WITH_HERO_POINTS_TILE,
  COMPONENT_TRANSACTION_LIST_ITEM,
  COMPONENT_TREAT_YOURSELF_CARD,
  COMPONENT_TURN_YOUR_POINTS_INTO_GIFT_CARDS_TILE,
  MODULE,
} from '../constants';

export const useTracking = () => {
  const { eventTracking } = useMixpanel();

  const trackClickTreatYourselfCard = () => {
    eventTracking({
      event: CLICK_TREAT_YOURSELF_CARD,
      categoryName: EventTrackingCategory.USER_ACTION,
      metaData: {
        module: MODULE,
        component: COMPONENT_TREAT_YOURSELF_CARD,
      },
    });
  };

  const trackClickTransactionList = () => {
    eventTracking({
      event: CLICK_TRANSACTION_LIST_ITEM,
      categoryName: EventTrackingCategory.USER_ACTION,
      metaData: {
        module: MODULE,
        component: COMPONENT_TRANSACTION_LIST_ITEM,
      },
    });
  };

  const trackClickOpenSpendAccountToPayWithHeroPointsTile = () => {
    eventTracking({
      event: CLICK_OPEN_SPEND_ACCOUNT_TO_REDEEM_HERO_POINTS_TILE,
      categoryName: EventTrackingCategory.USER_ACTION,
      metaData: {
        module: MODULE,
        component: COMPONENT_PAY_WITH_HERO_POINTS_TILE,
      },
    });
  };

  const trackClickSpendHeroPointsWithSwagCardTile = () => {
    eventTracking({
      event: CLICK_REDEEM_HERO_POINTS_WITH_SWAG_CARD_TILE,
      categoryName: EventTrackingCategory.USER_ACTION,
      metaData: {
        module: MODULE,
        component: COMPONENT_PAY_WITH_HERO_POINTS_TILE,
      },
    });
  };

  const trackClickTurnPointsToGiftCardsTile = () => {
    eventTracking({
      event: CLICK_TURN_POINTS_TO_GIFT_CARDS_TILE,
      categoryName: EventTrackingCategory.USER_ACTION,
      metaData: {
        module: MODULE,
        component: COMPONENT_TURN_YOUR_POINTS_INTO_GIFT_CARDS_TILE,
      },
    });
  };

  return {
    trackClickTreatYourselfCard,
    trackClickTransactionList,
    trackClickOpenSpendAccountToPayWithHeroPointsTile,
    trackClickSpendHeroPointsWithSwagCardTile,
    trackClickTurnPointsToGiftCardsTile,
  };
};
