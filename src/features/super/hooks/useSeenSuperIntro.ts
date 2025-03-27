import { AppDataStorage, AppDataStorageKey } from '../../../common/libs/storage/appDataStorage';

export const useSeenSuperIntro = () => {
  const hasUserSeenThis = () => {
    return AppDataStorage.getItem<boolean>(AppDataStorageKey.SuperIntroSeen);
  };

  const markSeen = () => {
    return AppDataStorage.setItem<boolean>(AppDataStorageKey.SuperIntroSeen, true);
  };

  return { hasUserSeenThis, markSeen };
};
