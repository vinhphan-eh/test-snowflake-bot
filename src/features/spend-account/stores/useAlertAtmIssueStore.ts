import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { LocalStorageKey, ZustandLocalStorage } from '../../../common/libs/storage/localStorage';

interface AlertAtmIssue {
  hasShownTimestamp?: number;
  setHasShownTimestamp: () => void;
}

const useAlertAtmIssueStore = create<AlertAtmIssue>()(
  persist(
    set => ({
      hasShownTimestamp: undefined,
      setHasShownTimestamp: () => set({ hasShownTimestamp: new Date().valueOf() }),
    }),
    {
      name: LocalStorageKey.EBenAlertAtmIssue,
      storage: createJSONStorage(() => ZustandLocalStorage()),
    }
  )
);

export { useAlertAtmIssueStore };
