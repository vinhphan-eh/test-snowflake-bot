import type { ContentCard } from '@braze/react-native-sdk';
import { produce } from 'immer';
import { create } from 'zustand';
import type { BrazeCustomEvents } from '../constants';

type BrazeStoreData = {
  cards: Array<ContentCard> | undefined;
  pendingEvents: Array<BrazeCustomEvents>;
  requestContentCardsRefresh: () => Promise<Array<ContentCard>>;
};

/**
 * Receive braze utils from super app
 */
export const useBrazeStore = create<BrazeStoreData>()(() => ({
  cards: undefined,
  pendingEvents: [],
  requestContentCardsRefresh: () => Promise.resolve([]),
}));

export const clearBrazeStore = () => {
  useBrazeStore.setState({ cards: undefined, pendingEvents: [] });
};

export const storeBrazeCustomEvent = (eventName: BrazeCustomEvents) => {
  useBrazeStore.setState(
    produce((state: BrazeStoreData) => {
      state.pendingEvents.push(eventName);
    })
  );
};
