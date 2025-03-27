import type { AsyncStorageStatic } from '@react-native-async-storage/async-storage';
import type { KeyValuePair, MultiGetCallback } from '@react-native-async-storage/async-storage/lib/typescript/types';

let dataLake: Record<string, string> = {};

const mockAsyncStorage: AsyncStorageStatic = {
  async getItem(key: string, callback?: (error?: Error, result?: string) => void): Promise<string | null> {
    const data = typeof dataLake[key] !== 'undefined' ? dataLake[key] : null;
    if (callback) {
      callback(undefined, data as any);
    }

    return data;
  },
  async setItem(key: string, value: string, callback?: (error?: Error) => void): Promise<void> {
    dataLake[key] = value;
    if (callback) {
      callback(undefined);
    }
  },
  async removeItem(key: string, callback?: (error?: Error) => void): Promise<void> {
    delete dataLake[key];
    if (callback) {
      callback(undefined);
    }
  },
  async clear(callback?: (error?: Error) => void): Promise<void> {
    dataLake = {};
    if (callback) {
      callback(undefined);
    }
  },
  // @ts-ignore
  async mergeItem(key: string, value: string, callback?: (error?: Error) => void): Promise<void> {
    // TODO
  },
  async multiGet(
    // @ts-ignore
    keys: readonly string[],
    // @ts-ignore
    callback?: MultiGetCallback
  ): Promise<readonly KeyValuePair[]> {
    // TODO
    return [];
  },
  // @ts-ignore
  async multiMerge(keyValuePairs: string[][], callback?: (errors?: Error[]) => void): Promise<void> {
    // TODO
  },
  // @ts-ignore
  async multiSet(keyValuePairs: string[][], callback?: (errors?: Error[]) => void): Promise<void> {
    // TODO
  },
  // @ts-ignore
  async multiRemove(keys: string[], callback?: (errors?: Error[]) => void): Promise<void> {
    keys.forEach(key => {
      delete dataLake[key];
    });
  },
  // @ts-ignore
  async getAllKeys(callback?: (error?: Error, keys?: string[]) => void): Promise<string[]> {
    return Object.keys(dataLake);
  },
};

export default mockAsyncStorage;
