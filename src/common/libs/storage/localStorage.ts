import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StateStorage } from 'zustand/middleware/persist';
import type { Storage } from './types';

/**
 * Must start with "Eben" prefix to avoid duplicate
 */
export enum LocalStorageKey {
  EbenExample = 'Eben Example key',
  RecoverCardStore = 'EbenShowActivationCardAlert',

  PaySplitStore = 'EbenSkippedPayStream',
  PaySplitAlertHeroWalletFee = 'EbenClosedAlertHeroWalletFee',
  DigitalProvisioningStore = 'EbenSkippedDigitalProvisioning',
  SelectedOrg = 'EbenSelectedOrg',
  KeyedAddress = 'EbenKeyedAddress',

  PurchaseHistoryStore = 'EbenPurchaseHistoryStore',
  EbenPillarPermission = 'EbenPillarPermission',

  EbenConsolidateIntroSeen = 'EbenConsolidateIntroSeen',

  EbenLatestUserResidentialAddress = 'EbenLatestUserResidentialAddress',
  EbenBillManagement = 'EbenBillManagement',

  EbenOnboardingReferenceId = 'EbenOnboardingReferenceId',
  EbenBillStreamingWidget = 'EbenBillStreamingWidget',

  EBenClearedUkDeviceOnAppLogin = 'EBenClearedUkDeviceOnAppLogin',

  EBenAlertAtmIssue = 'EBenAlertAtmIssue',
}

/**
 * Normal storage to store insensitive data.
 * - Should be used be default
 * - Data will be clear when user logout
 */
export const LocalStorage: Storage<LocalStorageKey> = {
  async getItem<T>(key: LocalStorageKey): Promise<T | null> {
    const stringData = await AsyncStorage.getItem(key);
    if (!stringData) {
      return null;
    }

    try {
      const jsonObj = JSON.parse(stringData);
      return jsonObj as T;
    } catch (e) {
      return null;
    }
  },

  setItem<T>(key: LocalStorageKey, data: T) {
    return AsyncStorage.setItem(key, JSON.stringify(data));
  },

  deleteItem(key: LocalStorageKey): Promise<void> {
    return AsyncStorage.removeItem(key);
  },

  deleteAll(): Promise<void> {
    return AsyncStorage.multiRemove(Object.values(LocalStorageKey));
  },
};

export const ZustandLocalStorage = (): StateStorage => {
  return {
    getItem: (key: string) => LocalStorage.getItem<string>(key as LocalStorageKey),
    setItem: (key: string, value: string) => LocalStorage.setItem(key as LocalStorageKey, value),
    removeItem: (key: string) => LocalStorage.deleteItem(key as LocalStorageKey),
  };
};
