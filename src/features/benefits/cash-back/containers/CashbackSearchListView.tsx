import React, { useMemo } from 'react';
import type { ListRenderItem } from 'react-native';
import { useTheme } from '@hero-design/rn';
import type { InStoreOffer, OnlineOffer } from '../../../../new-graphql/generated';
import { OfferType, useInfiniteGetCashbackOffersQuery } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { DefaultProductItemSkeleton } from '../../common/components/skeletons/DefaultProductItemSkeleton';
import { CategoryCodes } from '../../common/constants/benefits';
import { ProductSearchTemplate } from '../../common/containers/ProductSearchTemplate';
import { isOnlineOffer } from '../../common/utils/cashbackOffer';
import { CashbackGridItem } from '../components/CashbackGridItem';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '../constants';

const ITEM_PER_PAGE = 10;

interface CashbackSearchListViewProps {
  categoryCode: string;
  categoryName: string;
  initData?: OnlineOffer[];
  isShowNavBar?: boolean;
  isShowSearchBar?: boolean;
  offerType: OfferType;
  onItemPressed: (item: OnlineOffer | InStoreOffer) => void;
  query: string;
  renderTop?: () => React.ReactNode;
  setSearchQuery?: (text: string) => void;
  testID?: string;
}

export const CashbackSearchListView = ({
  categoryCode,
  categoryName,
  initData,
  isShowNavBar = true,
  isShowSearchBar = true,
  offerType,
  onItemPressed,
  query,
  renderTop,
  setSearchQuery = () => {},
  testID,
}: CashbackSearchListViewProps) => {
  const { colors, space } = useTheme();
  const Intl = useIntl();
  const { data, fetchNextPage, hasNextPage, isError, isFetchingNextPage, isLoading } =
    useInfiniteGetCashbackOffersQuery(
      {
        input: {
          first: ITEM_PER_PAGE,
          query,
          type: offerType,
          latitude: DEFAULT_LATITUDE,
          longitude: DEFAULT_LONGITUDE,
          // all: don't pass categoryCode to load all cashback offers
          ...(categoryCode !== CategoryCodes.All ? { categoryCode } : {}),
        },
      },
      {
        cacheTime: 0,
        getNextPageParam: previousPage => {
          const { pageInfo } = previousPage.me?.cashback?.allOffers || {
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
                type: offerType,
                latitude: DEFAULT_LATITUDE,
                longitude: DEFAULT_LONGITUDE,
                // all: don't pass categoryCode to load all cashback offers
                ...(categoryCode !== CategoryCodes.All ? { categoryCode } : {}),
              },
            };
          }
          return undefined;
        },
      }
    );
  const offers = useMemo(() => {
    const onlineOffers = (data?.pages?.flatMap(page => page.me?.cashback?.allOffers?.edges.map(e => e?.node) ?? []) ??
      []) as Array<OnlineOffer>;

    if (onlineOffers.length > 0) {
      return onlineOffers;
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

  const renderItem: ListRenderItem<OnlineOffer | InStoreOffer> = ({ index, item }) => {
    const { advertiserName, imageUrl, logoUrl, title } = item;
    if (isOnlineOffer(item)) {
      return (
        <CashbackGridItem
          kicker={advertiserName}
          numberOfLines={1}
          testID={`online-offer-${index}`}
          title={title}
          imgSrc={
            imageUrl
              ? {
                  uri: imageUrl,
                }
              : undefined
          }
          logoSrc={
            logoUrl
              ? {
                  uri: logoUrl,
                }
              : undefined
          }
          onPress={() => onItemPressed(item)}
          style={{ marginBottom: space.large }}
          subTitle={Intl.formatMessage({ id: 'benefits.cashback.onlineType' })}
        />
      );
    }
    return (
      <CashbackGridItem
        kicker={advertiserName}
        numberOfLines={1}
        testID={`instore-offer-${index}`}
        title={title}
        imgSrc={
          imageUrl
            ? {
                uri: imageUrl,
              }
            : undefined
        }
        logoSrc={
          logoUrl
            ? {
                uri: logoUrl,
              }
            : undefined
        }
        onPress={() => onItemPressed(item)}
        style={{ marginBottom: space.large }}
        subTitle="5 stores nearby you"
      />
    );
  };

  return (
    <ProductSearchTemplate<OnlineOffer | InStoreOffer>
      location="search online"
      selectedCategory={categoryName.toLowerCase()}
      testID={testID}
      defaultQuery={query}
      keyExtractor={item => item.id}
      style={{ backgroundColor: colors.defaultGlobalSurface }}
      onChangeText={setSearchQuery}
      renderTop={renderTop}
      title={Intl.formatMessage({
        id: offerType === OfferType.Online ? 'benefits.cashback.onlineCashback' : 'benefits.cashback.instoreCashback',
      })}
      categoryCode={categoryCode}
      placeholder={placeholder}
      products={offers}
      isLoading={isLoading}
      renderItem={renderItem}
      onEndReached={onEndReached}
      isFetchingNextPage={isFetchingNextPage}
      isError={isError}
      renderItemSkeleton={() => <DefaultProductItemSkeleton heightRatio={100 / 171} />}
      isShowNavBar={isShowNavBar}
      isShowSearchBar={isShowSearchBar}
    />
  );
};
