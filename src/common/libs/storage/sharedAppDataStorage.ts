import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StateStorage } from 'zustand/middleware/persist';
import { Storage } from './types';

export enum SharedAppDataStorageKey {
  Example = 'Example',
  InstapayExpPopup = 'InstapayExpPopup',
}

/**
 * Normal storage to store insensitive data.
 * - Data won't be clear when user logout
 * - Shared accross all accounts, if you want to store data for each user, use AppDataStorage
 */
class SharedAppDataStorageImpl extends Storage<SharedAppDataStorageKey> {
  private prefix = 'EbenSharedAppData';

  private getActualKey(key: SharedAppDataStorageKey) {
    return `${this.prefix}${key}`;
  }

  async getItem<T>(key: SharedAppDataStorageKey): Promise<T | null> {
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

  setItem<T>(key: SharedAppDataStorageKey, data: T) {
    const actualKey = this.getActualKey(key);
    return AsyncStorage.setItem(actualKey, JSON.stringify(data));
  }

  deleteItem(key: SharedAppDataStorageKey): Promise<void> {
    const actualKey = this.getActualKey(key);
    return AsyncStorage.removeItem(actualKey);
  }

  /**
   * Do nothing. App data will be keep forever
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async deleteAll() {}
}

export const SharedAppDataStorage = new SharedAppDataStorageImpl();

export const ZustandSharedAppDataStorage = (): StateStorage => {
  return {
    getItem: (key: string) => SharedAppDataStorage.getItem<string>(key as SharedAppDataStorageKey),
    setItem: (key: string, value: string) => SharedAppDataStorage.setItem(key as SharedAppDataStorageKey, value),
    removeItem: (key: string) => SharedAppDataStorage.deleteItem(key as SharedAppDataStorageKey),
  };
};
