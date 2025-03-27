import { DYNAMIC_TILE_SUBTITLE_LIMIT_CHARACTERS } from '../constants';

export const formatSubTitle = (subTitle: string) => {
  const limitCharacters = DYNAMIC_TILE_SUBTITLE_LIMIT_CHARACTERS;
  return subTitle.length > limitCharacters ? `${subTitle.substring(0, limitCharacters)}..` : subTitle;
};
