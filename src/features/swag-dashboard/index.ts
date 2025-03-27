import { useBenefitsTiles } from './benefits/useBenefitsTiles';
import type { SWAGDashboardTile } from './types';

export const useMoneySWAGDashboardTiles = (): SWAGDashboardTile[] => {
  const instaPayTile = null;

  const allTiles: SWAGDashboardTile[] = [];

  if (instaPayTile) {
    allTiles.push(instaPayTile);
  }

  return allTiles;
};

export const useBenefitsSWAGDashboardTiles = (): SWAGDashboardTile[] => {
  const benefitsTiles = useBenefitsTiles();

  return benefitsTiles;
};
