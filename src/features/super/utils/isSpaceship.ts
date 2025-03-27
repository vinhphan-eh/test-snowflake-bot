import { SPACE_SHIP_FUND_USI } from '../constants/usiFunds';

export const isSpaceship = (usi: string): boolean => {
  return usi === SPACE_SHIP_FUND_USI;
};
