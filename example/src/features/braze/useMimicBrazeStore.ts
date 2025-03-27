import type { ContentCard } from '@braze/react-native-sdk';
import { create } from 'zustand';

type BrazeStoreData = {
  cards: Array<ContentCard> | undefined;
};

export const useMimicBrazeStore = create<BrazeStoreData>()(() => ({
  cards: undefined,
}));


