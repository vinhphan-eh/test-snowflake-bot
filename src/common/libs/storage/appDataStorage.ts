import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StateStorage } from 'zustand/middleware/persist';
import { Storage } from './types';

export enum AppDataStorageKey {
  Example = 'Example',
  PaySplitIntroSeen = 'PaySplitIntroSeen',
  SuperIntroSeen = 'SuperIntroSeen',
  SalarySacrificeIntroSeen = 'SalarySacrificeIntroSeen',
  ContributionPendingTabSeen = 'ContributionPendingTabSeen',
  SetupHeroWalletDismissed = 'SetupHeroWalletDismissed',
  EbenBillStreamingWaitlist = 'EbenBillStreamingWaitlist',
  EbenBillManagementOffer = 'EbenBillManagementOffer',
  HeroPointsIntroSeen = 'HeroPointsIntroSeen',
  RecurringHowItWorksBtsSeen = 'RecurringHowItWorksBtsSeen',
  EstimatedIncomeBtsSeen = 'EstimatedIncomeBtsSeen',
}

/**
 * Normal storage to store insensitive data.
 * - Data won't be clear when user logout
 * - Each data is only used by single user
 */
class AppDataStorageImpl extends Storage<AppDataStorageKey> {
  userId = '';

  private prefix = 'EbenAppData';

  private getActualKey(key: AppDataStorageKey) {
    return `${this.prefix}${this.userId}${key}`;
  }

  async getItem<T>(key: AppDataStorageKey): Promise<T | null> {
    const actualKey = this.getActualKey(key);
    const stringData = await AsyncStorage.getItem(actualKey);
    if (!stringData) {
      return null;
    }

    try {
      const jsonObj = JSON.parse(stringData);
      return jsonObj as T;
    } catch (e) {
      return null;
    }
  }

  setItem<T>(key: AppDataStorageKey, data: T) {
    const actualKey = this.getActualKey(key);
    return AsyncStorage.setItem(actualKey, JSON.stringify(data));
  }

  deleteItem(key: AppDataStorageKey): Promise<void> {
    const actualKey = this.getActualKey(key);
    return AsyncStorage.removeItem(actualKey);
  }

  /**
   * Do nothing. App data will be keep forever
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async deleteAll() {}
}

export const AppDataStorage = new AppDataStorageImpl();

export const ZustandAppDataStorage = (): StateStorage => {
  return {
    getItem: (key: string) => AppDataStorage.getItem<string>(key as AppDataStorageKey),
    setItem: (key: string, value: string) => AppDataStorage.setItem(key as AppDataStorageKey, value),
    removeItem: (key: string) => AppDataStorage.deleteItem(key as AppDataStorageKey),
  };
};
