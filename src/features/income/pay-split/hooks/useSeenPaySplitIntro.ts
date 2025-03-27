import { AppDataStorage, AppDataStorageKey } from '../../../../common/libs/storage/appDataStorage';

export const useSeenPaySplitIntro = () => {
  const hasUserSeenThis = async () => {
    return AppDataStorage.getItem<boolean>(AppDataStorageKey.PaySplitIntroSeen);
  };

  const markSeen = () => {
    return AppDataStorage.setItem<boolean>(AppDataStorageKey.PaySplitIntroSeen, true);
  };

  return { hasUserSeenThis, markSeen };
};
