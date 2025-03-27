import { create } from 'zustand';

interface SessionTokenStore {
  sessionToken: string;
}

/**
 * Mimic store for session token
 */
export const useSessionTokenStore = create<SessionTokenStore>()(() => ({
  sessionToken: '',
}));
