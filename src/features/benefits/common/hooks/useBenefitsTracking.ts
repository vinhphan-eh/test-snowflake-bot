import type { BenefitsTabKeysType } from './useBenefitsTabs/constants';
import { useMixpanel } from '../../../../common/hooks/useMixpanel';
import {
  BENEFITS_MODULE,
  CLICK_ON_BENEFITS_SEARCH_BAR,
  CLICK_ON_CATEGORY_SHORTCUT,
  CLICK_ON_LIFETIME_CASHBACK,
  SELECT_BENEFITS_CATEGORY,
  TYPE_AND_SEARCH_IN_SEARCH_BAR,
  VISIT_BENEFITS_HOME_PAGE,
  CLICK_ON_HP_TILE,
  CLICK_SHOP_NOW_ON_NEARBY_TILE,
  CLICK_ON_LINK_CASHBACK_CARD,
  CLICK_ON_CREATE_STASH_CARD,
  CLICK_ON_FEATURED_OFFERS_SECTION,
  CLICK_ON_MOVIE_CARD_CTA_LOW_HERO_POINTS,
  CLICK_ON_MOVIE_CARD_CTA_NO_HERO_POINTS,
  CLICK_ON_GIFT_CARD_CTA_HIGH_HERO_POINTS,
  CLICK_ON_LIFETIME_CASHBACK_HOME_PAGE,
  CLICK_ON_HP_TILE_HOME_PAGE,
  CLICK_ON_MAP_VIEW_HOME_PAGE,
} from '../constants/mixpanel';

export type SearchLocation =
  | 'search all'
  | 'search online'
  | 'search instore'
  | 'search giftcards'
  | 'search bills'
  | 'instore tab'
  | 'search featured offer'
  | 'search online offers';
type SearchQueryParams = {
  query: string;
  selectedCategory: string;
  location: SearchLocation;
};

type ShortCutParams = {
  selectedCategory: string;
  location: BenefitsTabKeysType;
};

type SelectCategoryParams = {
  selectedCategory: string;
  location: SearchLocation;
};

export const useBenefitsTracking = () => {
  const { eventTracking } = useMixpanel();

  const trackVisitHomePage = () => {
    eventTracking({
      event: VISIT_BENEFITS_HOME_PAGE,
      categoryName: 'user action',
      metaData: {
        module: BENEFITS_MODULE,
      },
    });
  };

  const trackClickOnSearchBar = (location: BenefitsTabKeysType) => {
    eventTracking({
      event: CLICK_ON_BENEFITS_SEARCH_BAR,
      categoryName: 'user action',
      metaData: {
        module: BENEFITS_MODULE,
        location,
      },
    });
  };

  const trackTypeAndSearch = (params: SearchQueryParams) => {
    eventTracking({
      event: TYPE_AND_SEARCH_IN_SEARCH_BAR,
      categoryName: 'user action',
      metaData: {
        module: BENEFITS_MODULE,
        ...params,
      },
    });
  };

  const trackClickOnCategoryShortcut = (params: ShortCutParams) => {
    eventTracking({
      event: CLICK_ON_CATEGORY_SHORTCUT,
      categoryName: 'user action',
      metaData: {
        module: BENEFITS_MODULE,
        ...params,
      },
    });
  };

  const trackSelectCategory = (params: SelectCategoryParams) => {
    eventTracking({
      event: SELECT_BENEFITS_CATEGORY,
      categoryName: 'user action',
      metaData: {
        module: BENEFITS_MODULE,
        ...params,
      },
    });
  };

  const trackClickOnLifeTimeCashback = () => {
    eventTracking({
      event: CLICK_ON_LIFETIME_CASHBACK,
      categoryName: 'user action',
      metaData: {
        module: BENEFITS_MODULE,
      },
    });
  };

  const trackClickOnLifeTimeCashbackHomePage = () => {
    eventTracking({
      event: CLICK_ON_LIFETIME_CASHBACK_HOME_PAGE,
      categoryName: 'user action',
      metaData: {
        module: BENEFITS_MODULE,
      },
    });
  };

  const trackClickOnHPTileHomePage = () => {
    eventTracking({
      event: CLICK_ON_HP_TILE_HOME_PAGE,
      categoryName: 'user action',
      metaData: {
        module: BENEFITS_MODULE,
      },
    });
  };

  const trackClickOnHPTile = () => {
    eventTracking({
      event: CLICK_ON_HP_TILE,
      categoryName: 'user action',
      metaData: {
        module: BENEFITS_MODULE,
      },
    });
  };

  const trackClickShopNowOnNearbyTile = () => {
    eventTracking({
      event: CLICK_SHOP_NOW_ON_NEARBY_TILE,
      categoryName: 'user action',
      metaData: {
        module: BENEFITS_MODULE,
      },
    });
  };

  const trackClickOnLinkCashbackCard = (location: BenefitsTabKeysType) => {
    eventTracking({
      event: CLICK_ON_LINK_CASHBACK_CARD,
      categoryName: 'user action',
      metaData: {
        module: BENEFITS_MODULE,
        location,
      },
    });
  };

  const trackClickOnCreateStashCard = (location: BenefitsTabKeysType) => {
    eventTracking({
      event: CLICK_ON_CREATE_STASH_CARD,
      categoryName: 'user action',
      metaData: {
        module: BENEFITS_MODULE,
        location,
      },
    });
  };

  const trackClickOnFeaturedOffersSection = (location: BenefitsTabKeysType) => {
    eventTracking({
      event: CLICK_ON_FEATURED_OFFERS_SECTION,
      categoryName: 'user action',
      metaData: {
        module: BENEFITS_MODULE,
        location,
      },
    });
  };

  const trackClickOnMovieCardCtaLowHeroPoints = () => {
    eventTracking({
      event: CLICK_ON_MOVIE_CARD_CTA_LOW_HERO_POINTS,
      categoryName: 'user action',
      metaData: {
        module: BENEFITS_MODULE,
      },
    });
  };

  const trackClickOnMovieCardCtaNoHeroPoints = () => {
    eventTracking({
      event: CLICK_ON_MOVIE_CARD_CTA_NO_HERO_POINTS,
      categoryName: 'user action',
      metaData: {
        module: BENEFITS_MODULE,
      },
    });
  };

  const trackClickOnGiftCardCtaHighHeroPoints = () => {
    eventTracking({
      event: CLICK_ON_GIFT_CARD_CTA_HIGH_HERO_POINTS,
      categoryName: 'user action',
      metaData: {
        module: BENEFITS_MODULE,
      },
    });
  };

  const trackClickOnMapViewHomePage = () => {
    eventTracking({
      event: CLICK_ON_MAP_VIEW_HOME_PAGE,
      categoryName: 'user action',
      metaData: {
        module: BENEFITS_MODULE,
      },
    });
  };

  return {
    trackVisitHomePage,
    trackClickOnSearchBar,
    trackTypeAndSearch,
    trackClickOnCategoryShortcut,
    trackSelectCategory,
    trackClickOnLifeTimeCashback,
    trackClickOnHPTile,
    trackClickShopNowOnNearbyTile,
    trackClickOnLinkCashbackCard,
    trackClickOnCreateStashCard,
    trackClickOnFeaturedOffersSection,
    trackClickOnMovieCardCtaLowHeroPoints,
    trackClickOnMovieCardCtaNoHeroPoints,
    trackClickOnGiftCardCtaHighHeroPoints,
    trackClickOnLifeTimeCashbackHomePage,
    trackClickOnHPTileHomePage,
    trackClickOnMapViewHomePage,
  };
};
