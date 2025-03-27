import React, { useMemo } from 'react';
import type { ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import { Typography, useTheme } from '@hero-design/rn';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { createCurrencyFormatter, type SupportedCurrency } from '../../../../common/utils/numbers';
import type { SwagStoreOffer } from '../../../../new-graphql/generated';
import { useInfiniteGetSsAllOffersQuery } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { CategoryCodes } from '../../common/constants/benefits';
import { ProductSearchTemplate } from '../../common/containers/ProductSearchTemplate';
import { getDiscountPercentage } from '../../common/utils/calculations';
import { GiftCardGridItem } from '../components/GiftCardGridItem';
import { useServiceFeeFeature } from '../shop/hooks/useServiceFeeFeature';

const ITEM_PER_PAGE = 10;

interface GiftCardsSearchListViewProps {
  initData?: SwagStoreOffer[];
  isShowNavBar?: boolean;
  isShowSearchBar?: boolean;
  onItemPressed: (item: SwagStoreOffer) => void;
  query: string;
  setSearchQuery?: (text: string) => void;
  testID?: string;
  isShowBackIcon?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const GiftCardsSearchListView = ({
  initData,
  isShowBackIcon = true,
  isShowNavBar = true,
  isShowSearchBar = true,
  onItemPressed,
  query,
  setSearchQuery = () => {},
  style,
  testID,
}: GiftCardsSearchListViewProps) => {
  const { colors, space } = useTheme();
  const { formatMessage } = useIntl();

  const formatCurrency = createCurrencyFormatter();
  const { getPriceWithFee } = useServiceFeeFeature();
  const currentOrgId = useSessionStore(state => state.currentOrgId ?? '');

  const { data, fetchNextPage, hasNextPage, isError, isFetchingNextPage, isLoading } = useInfiniteGetSsAllOffersQuery(
    {
      allOffersInput: {
        categoryCode: CategoryCodes.GiftCard,
        first: ITEM_PER_PAGE,
        query,
        orgId: currentOrgId,
      },
    },
    {
      cacheTime: 0,
      getNextPageParam: previousPage => {
        const { pageInfo } = previousPage.me?.swagStore?.allOffers || {
          pageInfo: {
            hasNextPage: false,
            endCursor: null,
          },
        };

        if (pageInfo.hasNextPage) {
          return {
            allOffersInput: {
              categoryCode: CategoryCodes.GiftCard,
              orgId: currentOrgId,
              first: ITEM_PER_PAGE,
              after: pageInfo.endCursor,
              query,
            },
          };
        }
        return undefined;
      },
    }
  );
  // const giftCards = data?.pages?.flatMap(page => page.me?.swagStore?.allOffers?.edges.map(e => e?.node) ?? []) || [];
  const giftCards = useMemo(() => {
    const res = data?.pages?.flatMap(page => page.me?.swagStore?.allOffers?.edges.map(e => e?.node) ?? []) ?? [];

    if (res.length > 0) {
      return res;
    }
    return initData ?? [];
  }, [initData, data]);

  const onEndReached = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };

  const renderFooter = (item: SwagStoreOffer) => {
    const discountPriceWithServiceFee = getPriceWithFee(item.discountPrice, item.serviceFee);

    if (item.discountPriceInPoints) {
      return (
        <Typography.Caption intent="subdued" style={{ marginTop: space.xsmall }}>
          {formatMessage({ id: 'benefits.online.from' })}
          <Typography.Caption intent="primary" fontWeight="semi-bold">
            {formatCurrency(item.discountPriceInPoints, { currency: 'POINTS' })}
          </Typography.Caption>
          {formatMessage({ id: 'benefits.online.or' })}
          {formatCurrency(discountPriceWithServiceFee, { currency: (item.currency as SupportedCurrency) ?? 'AUD' })}
        </Typography.Caption>
      );
    }

    return (
      <Typography.Caption>
        {formatMessage(
          { id: 'benefits.online.saveUpTo' },
          { discount: getDiscountPercentage(item.price, getPriceWithFee(item.discountPrice, item.serviceFee)) }
        )}
      </Typography.Caption>
    );
  };
  const renderItem: ListRenderItem<SwagStoreOffer> = ({ index, item }) => {
    return (
      <GiftCardGridItem
        testID={`gift-card-item-${index}`}
        key={Math.random().toString()}
        title={item.name}
        imgSrc={{
          uri: item?.imageUrl ?? '',
        }}
        onPress={() => onItemPressed(item)}
        style={{ marginBottom: space.large }}
        renderFooter={() => renderFooter(item)}
      />
    );
  };

  return (
    <ProductSearchTemplate<SwagStoreOffer>
      location="search giftcards"
      selectedCategory={CategoryCodes.GiftCard}
      testID={testID}
      defaultQuery={query}
      keyExtractor={item => item.id}
      style={[{ backgroundColor: colors.defaultGlobalSurface }, style]}
      onChangeText={setSearchQuery}
      title={formatMessage({ id: 'benefits.online.giftCards' })}
      placeholder={formatMessage({ id: 'benefits.giftcard.searchGiftCards' })}
      products={giftCards}
      isLoading={isLoading}
      renderItem={renderItem}
      onEndReached={onEndReached}
      isFetchingNextPage={isFetchingNextPage}
      isError={isError}
      isShowNavBar={isShowNavBar}
      isShowSearchBar={isShowSearchBar}
      isShowBackIcon={isShowBackIcon}
    />
  );
};
