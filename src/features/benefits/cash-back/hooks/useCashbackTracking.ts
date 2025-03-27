import { useMixpanel } from '../../../../common/hooks/useMixpanel';
import type { KeyedAddress } from '../../../../common/stores/useKeyedAddressStore';
import type { Category, InStoreOffer } from '../../../../new-graphql/generated';
import {
  CASHBACK_MODULE,
  CLICK_LIFE_TIME_CASHBACK_PILL,
  CLICK_MANAGE_ENROLLED_CARDS,
  CLICK_ON_CASHBACK_CATEGORY,
  CLICK_ON_CASHBACK_OFFER,
  CLICK_ON_FEATURED_OFFER_IN_CAROUSEL_AND_GRID,
  CLICK_ON_FEATURED_OFFER_IN_LISTING_PAGE,
  CLICK_ON_INSTORE_PILL_CASHBACK,
  CLICK_ON_MAP_VIEW_OFFER_ICON,
  CLICK_ON_ONLINE_PILL_CASHBACK,
  CLICK_ON_SEARCH_BAR_CASHBACK,
  CLICK_ON_SELECT_LOCATION,
  CLICK_ON_USE_CURRENT_LOCATION,
  CLICK_SHOP_NOW_ON_OFFER_PAGE,
  CLOSE_CASHBACK_IS_ACTIVE_SHEET,
  INTERACT_WITH_MAP_VIEW,
  TYPE_IN_CASHBACK_SEARCH_BAR,
  TYPE_IN_LOCATION_SEARCH_BAR,
  VISIT_CASHBACK_MERCHANT_DETAIL,
  VISIT_CASHBACK_OFFER_DETAIL,
  clickDropdownItem,
} from '../constants';
import type { CashbackSearchType } from '../types';

type OfferMeta = {
  offerId?: string;
  offerName: string;
  platform: 'online' | 'instore';
  offerType?: 'affiliate' | 'card linked';
  category?: string;
  merchantName: string;
  isMultipleLocation?: boolean;
};

type SearchOfferMeta = {
  searchQuery: string;
  categoryFilter: Category | undefined;
  selectedType: CashbackSearchType;
};

type MerchantMeta = {
  merchantId: string;
  platform: 'online' | 'instore';
  merchantName: string;
  offerIds: string[];
  offerNames: string[];
  categories: string[];
};

export const useCashbackTracking = () => {
  const { eventTracking } = useMixpanel();

  const trackClickOnCashbackOffer = (meta: OfferMeta) => {
    eventTracking({
      event: CLICK_ON_CASHBACK_OFFER,
      categoryName: 'user action',
      metaData: {
        ...meta,
        module: CASHBACK_MODULE,
      },
    });
  };

  const trackClickShopNowOnOfferPage = (meta: OfferMeta) => {
    eventTracking({
      event: CLICK_SHOP_NOW_ON_OFFER_PAGE,
      categoryName: 'user action',
      metaData: {
        ...meta,
        module: CASHBACK_MODULE,
      },
    });
  };

  const trackCloseCashbackIsActiveSheet = (meta: OfferMeta) => {
    eventTracking({
      event: CLOSE_CASHBACK_IS_ACTIVE_SHEET,
      categoryName: 'user action',
      metaData: {
        ...meta,
        module: CASHBACK_MODULE,
      },
    });
  };

  const trackClickDropdown = (label: string, meta: OfferMeta) => {
    eventTracking({
      event: clickDropdownItem(label),
      categoryName: 'user action',
      metaData: {
        ...meta,
        module: CASHBACK_MODULE,
      },
    });
  };

  const trackClickManageEnrolledCard = () => {
    eventTracking({
      event: CLICK_MANAGE_ENROLLED_CARDS,
      categoryName: 'user action',
      metaData: {
        module: CASHBACK_MODULE,
      },
    });
  };

  const trackClickLifetimeCashbackTile = () => {
    eventTracking({
      event: CLICK_LIFE_TIME_CASHBACK_PILL,
      categoryName: 'user action',
      metaData: {
        module: CASHBACK_MODULE,
      },
    });
  };

  const trackClickOnSearchBar = () => {
    eventTracking({
      event: CLICK_ON_SEARCH_BAR_CASHBACK,
      categoryName: 'user action',
      metaData: {
        module: CASHBACK_MODULE,
      },
    });
  };

  const trackClickOnOnlinePill = () => {
    eventTracking({
      event: CLICK_ON_ONLINE_PILL_CASHBACK,
      categoryName: 'user action',
      metaData: {
        module: CASHBACK_MODULE,
      },
    });
  };

  const trackClickOnInStorePill = () => {
    eventTracking({
      event: CLICK_ON_INSTORE_PILL_CASHBACK,
      categoryName: 'user action',
      metaData: {
        module: CASHBACK_MODULE,
      },
    });
  };

  const trackClickOnCashbackCategory = (categoryFilter: Category) => {
    eventTracking({
      event: CLICK_ON_CASHBACK_CATEGORY,
      categoryName: 'user action',
      metaData: {
        module: CASHBACK_MODULE,
        category: categoryFilter,
      },
    });
  };

  const trackTypeInSearchCashbackOffer = (meta: SearchOfferMeta) => {
    eventTracking({
      event: TYPE_IN_CASHBACK_SEARCH_BAR,
      categoryName: 'user action',
      metaData: {
        ...meta,
        module: CASHBACK_MODULE,
      },
    });
  };

  const trackTypeInLocationSearchBar = (searchTerm: string) => {
    eventTracking({
      event: TYPE_IN_LOCATION_SEARCH_BAR,
      categoryName: 'user action',
      metaData: {
        searchTerm,
        module: CASHBACK_MODULE,
      },
    });
  };

  const trackClickOnSelectLocation = (address: KeyedAddress) => {
    eventTracking({
      event: CLICK_ON_SELECT_LOCATION,
      categoryName: 'user action',
      metaData: {
        ...address,
        module: CASHBACK_MODULE,
      },
    });
  };

  const trackClickOnUseCurrentLocation = () => {
    eventTracking({
      event: CLICK_ON_USE_CURRENT_LOCATION,
      categoryName: 'user action',
      metaData: {
        module: CASHBACK_MODULE,
      },
    });
  };

  const trackInteractWithMapView = () => {
    eventTracking({
      event: INTERACT_WITH_MAP_VIEW,
      categoryName: 'user action',
      metaData: {
        module: CASHBACK_MODULE,
      },
    });
  };

  const trackClickOnMapViewOfferIcon = (item: InStoreOffer) => {
    eventTracking({
      event: CLICK_ON_MAP_VIEW_OFFER_ICON,
      categoryName: 'user action',
      metaData: {
        item,
        module: CASHBACK_MODULE,
      },
    });
  };

  const trackVisitCashbackOfferDetail = (meta: OfferMeta) => {
    eventTracking({
      event: VISIT_CASHBACK_OFFER_DETAIL,
      categoryName: 'user action',
      metaData: {
        ...meta,
        module: CASHBACK_MODULE,
      },
    });
  };

  const trackVisitCashbackMerchantDetail = (meta: MerchantMeta) => {
    eventTracking({
      event: VISIT_CASHBACK_MERCHANT_DETAIL,
      categoryName: 'user action',
      metaData: {
        ...meta,
        module: CASHBACK_MODULE,
      },
    });
  };

  const trackClickOnFeaturedOfferInListingPage = (meta: OfferMeta) => {
    eventTracking({
      event: CLICK_ON_FEATURED_OFFER_IN_LISTING_PAGE,
      categoryName: 'user action',
      metaData: {
        ...meta,
        module: CASHBACK_MODULE,
      },
    });
  };

  const trackClickOnFeaturedOfferInCarousel = (meta: OfferMeta) => {
    eventTracking({
      event: CLICK_ON_FEATURED_OFFER_IN_CAROUSEL_AND_GRID,
      categoryName: 'user action',
      metaData: {
        ...meta,
        module: CASHBACK_MODULE,
      },
    });
  };

  const trackClickOnFeaturedOfferInGrid = (meta: OfferMeta) => {
    eventTracking({
      event: CLICK_ON_FEATURED_OFFER_IN_CAROUSEL_AND_GRID,
      categoryName: 'user action',
      metaData: {
        ...meta,
        module: CASHBACK_MODULE,
      },
    });
  };

  return {
    trackClickOnCashbackOffer,
    trackClickShopNowOnOfferPage,
    trackCloseCashbackIsActiveSheet,
    trackClickDropdown,
    trackClickManageEnrolledCard,
    trackClickLifetimeCashbackTile,
    trackClickOnSearchBar,
    trackClickOnOnlinePill,
    trackClickOnInStorePill,
    trackTypeInSearchCashbackOffer,
    trackClickOnCashbackCategory,
    trackTypeInLocationSearchBar,
    trackClickOnSelectLocation,
    trackClickOnUseCurrentLocation,
    trackClickOnMapViewOfferIcon,
    trackInteractWithMapView,
    trackVisitCashbackOfferDetail,
    trackVisitCashbackMerchantDetail,
    trackClickOnFeaturedOfferInListingPage,
    trackClickOnFeaturedOfferInCarousel,
    trackClickOnFeaturedOfferInGrid,
  };
};
