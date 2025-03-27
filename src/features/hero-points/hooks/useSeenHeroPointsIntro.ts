import { AppDataStorage, AppDataStorageKey } from '../../../common/libs/storage/appDataStorage';

export const useSeenHeroPointsIntro = () => {
  const hasUserSeenIntro = async () => {
    return AppDataStorage.getItem<boolean>(AppDataStorageKey.HeroPointsIntroSeen);
  };

  const markSeen = () => {
    return AppDataStorage.setItem<boolean>(AppDataStorageKey.HeroPointsIntroSeen, true);
  };

  return { hasUserSeenIntro, markSeen };
};
