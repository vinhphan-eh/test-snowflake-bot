import Braze from '@braze/react-native-sdk';
import type { BrazeCustomEvents } from '../braze/constants';

import { storeBrazeCustomEvent, useBrazeStore } from '../braze/stores/useBrazeStore';

export const useLoadBrazeContentCards = () => {
  const contentCards = useBrazeStore(state => state.cards);
  const requestContentCardsRefresh = useBrazeStore(state => state.requestContentCardsRefresh);

  /**
   *
   * @description logCustomEvent and store event to pendingEvents
   */
  const logCustomEvent = (eventName: BrazeCustomEvents) => {
    Braze.logCustomEvent(eventName);
    storeBrazeCustomEvent(eventName);
  };

  return {
    cards: contentCards || [],
    requestContentCardsRefresh,
    logCustomEvent,
  };
};
