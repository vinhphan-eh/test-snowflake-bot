import React, { useMemo, useRef, useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Keyboard } from 'react-native';
import type { BottomSheetMethods } from '@gorhom/bottom-sheet/src/types';
import { Box } from '@hero-design/rn';
import type { Camera } from 'react-native-maps';
import { CashbackMapView } from './CashbackMapView';
import { NearbyOfferDrawerV2 } from './NearbyOfferDrawerV2';
import type { Advertiser, Category, InStoreOffer } from '../../../../new-graphql/generated';
import { OfferType, useInfiniteGetCashbackOffersGroupByAdvertiserQuery } from '../../../../new-graphql/generated';
import type { SearchLocationContainerChildrenProps } from '../../common/containers/SearchLocationContainer';
import { SearchLocationContainer } from '../../common/containers/SearchLocationContainer';
import { DEFAULT_DELTA, MAXIMUM_ZOOM_LEVEL, MIN_ZOOM_LEVEL } from '../constants';
import { useCashbackTracking } from '../hooks/useCashbackTracking';
import { getNearByLocationsFromAdvertisers } from '../utils/offer';

// Clone from PartialMapListView. Add support for Advertiser type, which includes multiple offers and multiple locations.

export type PartialMapListViewV2Props = {
  style?: StyleProp<ViewStyle>;
  onGoToInstoreDetail: (advertiser: Advertiser) => void;
  testID?: string;
  searchQuery: string;
  categoryFilter?: Category;
};

const DEFAULT_ITEM_PER_PAGE = 10;
const DEFAULT_INITIAL_LOAD = 5;

export const PartialMapListViewV2Inner = ({
  allowDataToLoad,
  categoryFilter,
  keyedAddress,
  onGoToInstoreDetail,
  openSearchLocationBottomSheet,
  searchQuery,
  style,
  testID,
}: PartialMapListViewV2Props & SearchLocationContainerChildrenProps) => {
  const drawerRef = useRef<BottomSheetMethods>(null);
  const [initialZoomLevel, setInitalZoomLevel] = useState<number>(0);
  const currentZoomLevel = useRef(0);
  const previousLoadAtZoomLevel = useRef(0);
  const cacheItemPerPage = useRef(0);
  const shouldSelectNearestOfferByDefault = useRef(true);

  const { trackInteractWithMapView } = useCashbackTracking();

  const mapRegion = {
    latitude: keyedAddress.latitude,
    longitude: keyedAddress.longitude,
    latitudeDelta: DEFAULT_DELTA,
    longitudeDelta: DEFAULT_DELTA,
  };

  /**
   * Initial items is calculated based on the initial zoom level
   * after that, we will load more items based on the remaining page + total item count (provided at first load)
   * each zoom out will be 1 page
   */
  const floorInitalZoomLevel = Math.floor(initialZoomLevel);
  const initialPage = MAXIMUM_ZOOM_LEVEL - floorInitalZoomLevel;
  const initialItems = DEFAULT_INITIAL_LOAD * initialPage;
  const remainingPage = floorInitalZoomLevel - MIN_ZOOM_LEVEL;

  const allowLoadMore = useRef(false);

  const { data, fetchNextPage, isError, isFetched, isFetchingNextPage, isLoading } =
    useInfiniteGetCashbackOffersGroupByAdvertiserQuery(
      {
        input: {
          first: initialItems,
          query: searchQuery,
          type: OfferType.Instore,
          latitude: mapRegion.latitude,
          longitude: mapRegion.longitude,
          ...(categoryFilter ? { categoryCode: categoryFilter.categoryCode } : {}),
        },
      },
      {
        cacheTime: 0,
        enabled: !!mapRegion && floorInitalZoomLevel > 0 && allowDataToLoad,
      }
    );

  const advertisers = useMemo(
    () =>
      isError
        ? []
        : ((data?.pages?.flatMap(page => page.me?.cashback?.allAdvertisers.edges)?.map(e => e?.node) ??
            []) as Array<Advertiser>),
    [data?.pages, isError]
  );

  const offerLocations = useMemo(() => {
    return getNearByLocationsFromAdvertisers(advertisers, mapRegion.latitude, mapRegion.longitude);
  }, [advertisers, mapRegion.latitude, mapRegion.longitude]);

  const onOfferLocationPress = (offer: InStoreOffer) => {
    Keyboard.dismiss();

    const advertiser = advertisers.find(a => {
      return a.offers.some(advertiserOffer => {
        return advertiserOffer.id === offer.offerId;
      });
    });

    if (advertiser) {
      onGoToInstoreDetail(advertiser);
    }
  };

  const onAdvertiserPress = (advertiser: Advertiser) => {
    Keyboard.dismiss();
    onGoToInstoreDetail(advertiser);
  };

  const computeNextPageForMap = () => {
    const { pageInfo } = data?.pages[data.pages.length - 1]?.me?.cashback?.allAdvertisers ?? {
      pageInfo: {
        hasNextPage: false,
        totalCount: 0,
        endCursor: undefined,
      },
    };

    if (pageInfo.hasNextPage && pageInfo.totalCount && pageInfo.totalCount > initialItems) {
      const itemPerPage = Math.ceil((pageInfo.totalCount - initialItems) / remainingPage);
      const finalItemPerPage = itemPerPage > DEFAULT_ITEM_PER_PAGE ? itemPerPage : DEFAULT_ITEM_PER_PAGE;
      cacheItemPerPage.current = finalItemPerPage;

      // each zoom out will be 1 page
      // but in fact zooming out level not going 1 by 1 level, so we need to calculate the difference from the last zoom level it fetches
      const newPages = Math.floor(previousLoadAtZoomLevel.current) - Math.floor(currentZoomLevel.current);
      if (itemPerPage > 0 && newPages > 0) {
        previousLoadAtZoomLevel.current = Math.floor(currentZoomLevel.current);
        return {
          input: {
            first: finalItemPerPage * newPages,
            after: pageInfo.endCursor,
            query: searchQuery,
            type: OfferType.Instore,
            latitude: mapRegion.latitude,
            longitude: mapRegion.longitude,
            ...(categoryFilter ? { categoryCode: categoryFilter.categoryCode } : {}),
          },
        };
      }
    }
    return undefined;
  };

  const computeNextPage = () => {
    const { pageInfo } = data?.pages[data.pages.length - 1]?.me?.cashback?.allAdvertisers ?? {
      pageInfo: {
        hasNextPage: false,
        totalCount: 0,
        endCursor: undefined,
      },
    };

    if (pageInfo.hasNextPage && pageInfo.totalCount && pageInfo.totalCount > initialItems) {
      const itemPerPage = Math.ceil((pageInfo.totalCount - initialItems) / remainingPage);
      const finalItemPerPage = itemPerPage > DEFAULT_ITEM_PER_PAGE ? itemPerPage : DEFAULT_ITEM_PER_PAGE;
      cacheItemPerPage.current = finalItemPerPage;

      if (itemPerPage > 0) {
        return {
          input: {
            first: finalItemPerPage,
            after: pageInfo.endCursor,
            query: searchQuery,
            type: OfferType.Instore,
            latitude: mapRegion.latitude,
            longitude: mapRegion.longitude,
            ...(categoryFilter ? { categoryCode: categoryFilter.categoryCode } : {}),
          },
        };
      }
    }
    return undefined;
  };

  const onEndReachedMap = async () => {
    if (allowLoadMore.current) {
      allowLoadMore.current = false;
      // to avoid loading pages that the drawer already loaded
      const pageSinceFirstLoad = floorInitalZoomLevel - Math.floor(currentZoomLevel.current);
      const expectLengthForNextPage = initialItems + pageSinceFirstLoad * cacheItemPerPage.current;
      if (expectLengthForNextPage > advertisers.length || cacheItemPerPage.current === 0) {
        await fetchNextPage({
          pageParam: computeNextPageForMap(),
        });
      }
      if (expectLengthForNextPage <= advertisers.length) {
        // for the page we determine it already loaded, we need to update the previousLoadAtZoomLevel
        previousLoadAtZoomLevel.current = Math.floor(currentZoomLevel.current);
      }
    }
  };

  const onEndReached = async () => {
    if (allowLoadMore.current) {
      allowLoadMore.current = false;
      await fetchNextPage({
        pageParam: computeNextPage(),
      });
    }
  };

  const onRegionChange = (camera: Camera) => {
    trackInteractWithMapView();
    if (camera.zoom) {
      if (initialZoomLevel === 0) {
        currentZoomLevel.current = camera.zoom;
        previousLoadAtZoomLevel.current = Math.floor(camera.zoom);
        setInitalZoomLevel(camera.zoom);
      }
      if (
        camera.zoom < currentZoomLevel.current &&
        currentZoomLevel.current !== 0 &&
        camera.zoom < floorInitalZoomLevel
      ) {
        // zooming out from the initial point
        currentZoomLevel.current = camera.zoom;
        allowLoadMore.current = true;
        onEndReachedMap();
      }
    }
  };

  const onMapTab = () => {
    trackInteractWithMapView();
    Keyboard.dismiss();
    drawerRef.current?.snapToIndex(0);
  };

  return (
    <Box testID={testID} style={style}>
      <CashbackMapView
        shouldSelectNearestOfferByDefault={shouldSelectNearestOfferByDefault}
        keyedAddress={keyedAddress}
        categoryFilter={categoryFilter}
        searchQuery={searchQuery}
        initialRegion={mapRegion}
        onMapTap={onMapTab}
        data={offerLocations}
        onRegionChangeComplete={(_, camera) => {
          onRegionChange(camera);
        }}
        onSelectedItemPress={onOfferLocationPress}
      />
      <NearbyOfferDrawerV2
        shouldSelectNearestOfferByDefault={shouldSelectNearestOfferByDefault}
        isFetched={isFetched}
        keyedAddress={keyedAddress}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        onEndReached={onEndReached}
        currentRegion={mapRegion}
        drawerRef={drawerRef}
        onSelectLocation={() => {
          openSearchLocationBottomSheet();
        }}
        data={advertisers}
        onItemPress={onAdvertiserPress}
        onScrollBeginDrag={() => {
          allowLoadMore.current = true;
        }}
      />
    </Box>
  );
};

export const PartialMapListViewV2 = (props: PartialMapListViewV2Props) => {
  return (
    <SearchLocationContainer>
      {childProps => <PartialMapListViewV2Inner {...props} {...childProps} />}
    </SearchLocationContainer>
  );
};
