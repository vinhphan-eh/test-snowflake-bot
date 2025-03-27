import React, { useMemo } from 'react';
import type { ListRenderItem } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useTheme, Icon, Typography, Box } from '@hero-design/rn';
import { navigateToBenefitsTopTabs } from '../../../../navigation/rootNavigation';
import type { Advertiser } from '../../../../new-graphql/generated';
import { OfferType, useInfiniteGetCashbackOffersGroupByAdvertiserQuery } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { DefaultProductItemSkeleton } from '../../common/components/skeletons/DefaultProductItemSkeleton';
import { CategoryCodes } from '../../common/constants/benefits';
import { ProductSearchTemplate } from '../../common/containers/ProductSearchTemplate';
import type { SearchLocationContainerChildrenProps } from '../../common/containers/SearchLocationContainer';
import { useHideElementOnScroll } from '../../common/hooks/useHideElementOnScroll';
import { InstoreCashbackAdvertiserGridItem } from '../instore-offer/components/InstoreCashbackAdvertiserGridItem';
import { ShowMapViewBtn } from '../instore-offer/components/ShowMapViewBtn';
import { setDefaultSearchQuery } from '../instore-offer/hooks/useInstoreTabStore';
import { extractCityAndState } from '../utils/offer';

const ITEM_PER_PAGE = 10;

interface InStoreCashbackSearchListViewProps {
  categoryCode: string;
  categoryName: string;
  initData?: Advertiser[];
  isShowNavBar?: boolean;
  isShowSearchBar?: boolean;
  onItemPressed: (item: Advertiser) => void;
  query: string;
  renderTop?: () => React.ReactNode;
  setSearchQuery?: (text: string) => void;
  testID?: string;
}

export const InStoreCashbackSearchListView = ({
  allowDataToLoad,
  categoryCode,
  categoryName,
  initData,
  isShowNavBar = true,
  isShowSearchBar = true,
  keyedAddress,
  onItemPressed,
  openSearchLocationBottomSheet,
  query,
  renderTop,
  setSearchQuery = () => {},
  testID,
}: InStoreCashbackSearchListViewProps & SearchLocationContainerChildrenProps) => {
  const { colors, space } = useTheme();
  const Intl = useIntl();
  const { onScroll, visibleSharedValue } = useHideElementOnScroll();

  const { data, fetchNextPage, hasNextPage, isError, isFetchingNextPage, isLoading } =
    useInfiniteGetCashbackOffersGroupByAdvertiserQuery(
      {
        input: {
          first: ITEM_PER_PAGE,
          query,
          type: OfferType.Instore,
          latitude: keyedAddress.latitude,
          longitude: keyedAddress.longitude,
          // all: don't pass categoryCode to load all cashback offers
          ...(categoryCode !== CategoryCodes.All ? { categoryCode } : {}),
        },
      },
      {
        cacheTime: 0,
        enabled: allowDataToLoad,
        getNextPageParam: previousPage => {
          const { pageInfo } = previousPage.me?.cashback?.allAdvertisers || {
            pageInfo: {
              hasNextPage: false,
              endCursor: null,
            },
          };

          if (pageInfo.hasNextPage) {
            return {
              input: {
                first: ITEM_PER_PAGE,
                after: pageInfo.endCursor,
                query,
                type: OfferType.Instore,
                latitude: keyedAddress.latitude,
                longitude: keyedAddress.longitude,
                // all: don't pass categoryCode to load all cashback offers
                ...(categoryCode !== CategoryCodes.All ? { categoryCode } : {}),
              },
            };
          }
          return undefined;
        },
      }
    );

  const advertisers = useMemo(() => {
    const res = (data?.pages?.flatMap(page => page.me?.cashback?.allAdvertisers?.edges.map(e => e?.node) ?? []) ??
      []) as Array<Advertiser>;

    if (res.length > 0) {
      return res;
    }
    return initData ?? [];
  }, [initData, data]);

  const placeholder = Intl.formatMessage(
    { id: 'benefits.cashback.searchOffers' },
    {
      offerType: ` ${categoryName.toLowerCase()} `,
    }
  );

  const onEndReached = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };

  const renderItem: ListRenderItem<Advertiser> = ({ index, item }) => {
    return (
      <InstoreCashbackAdvertiserGridItem
        item={item}
        latitude={keyedAddress.latitude}
        longitude={keyedAddress.longitude}
        onPress={() => onItemPressed(item)}
        index={index}
      />
    );
  };

  const title = Intl.formatMessage({
    id: 'benefits.cashback.instoreCashback',
  });

  return (
    <>
      <ProductSearchTemplate<Advertiser>
        location="search instore"
        selectedCategory={categoryName.toLowerCase()}
        testID={testID}
        defaultQuery={query}
        keyExtractor={item => item.id}
        style={{ backgroundColor: colors.defaultGlobalSurface }}
        onChangeText={setSearchQuery}
        renderTop={renderTop}
        onScroll={onScroll}
        title={title}
        placeholder={placeholder}
        products={advertisers}
        categoryCode={categoryCode}
        isLoading={isLoading || !allowDataToLoad} // Show loading while waiting for permission
        renderItem={renderItem}
        onEndReached={onEndReached}
        isFetchingNextPage={isFetchingNextPage}
        isError={isError}
        renderItemSkeleton={() => <DefaultProductItemSkeleton heightRatio={100 / 171} />}
        isShowNavBar={isShowNavBar}
        isShowSearchBar={isShowSearchBar}
        extraPaddingBottom={space['5xlarge']} // render extra padding because there is the floating map button
        ListHeaderComponent={() => (
          <Box
            style={{
              marginBottom: space.medium,
            }}
          >
            <Typography.Title accessibilityLabel={title} level="h3" typeface="playful">
              {title}
            </Typography.Title>
            <TouchableOpacity
              onPress={openSearchLocationBottomSheet}
              testID="select-location-con"
              style={{
                flexDirection: 'row',
                alignSelf: 'baseline',
                marginTop: space.medium,
                alignItems: 'center',
              }}
            >
              <Icon testID="near-me" icon="near-me" size="xsmall" intent="primary" />
              <Typography.Body style={{ marginLeft: space.small, flex: 1 }} intent="primary" variant="small">
                {extractCityAndState(keyedAddress)}
              </Typography.Body>
            </TouchableOpacity>
          </Box>
        )}
      />
      <ShowMapViewBtn
        visibleSharedValue={visibleSharedValue}
        onPress={() => {
          navigateToBenefitsTopTabs('benefits-instore');
          setDefaultSearchQuery({
            query,
            categoryCode,
            categoryName,
          });
        }}
      />
    </>
  );
};
