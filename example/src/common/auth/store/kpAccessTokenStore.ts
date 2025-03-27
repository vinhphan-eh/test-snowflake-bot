import { create } from 'zustand';

interface KeyPayTokenStore {
  accessToken: string;
}

/**
 * Mimic store for keypay access token
 */
export const useKeyPayTokenStore = create<KeyPayTokenStore>()(() => ({
  accessToken: '',
}));
