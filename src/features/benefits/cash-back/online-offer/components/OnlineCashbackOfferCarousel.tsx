import React from 'react';
import type { ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@hero-design/rn';
import type { OnlineOffer } from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { ProductCarousel } from '../../../common/components/ProductCarousel';

import { useCashbackPermission } from '../../../common/hooks/useCashbackPermission';
import { CashbackCarouselItem } from '../../components/CashbackCarouselItem';
import { CashbackCarouselItemSkeleton } from '../../components/skeletons/CashbackCarouselItemSkeleton';

type OnlineCashbackOfferCarouselProps = {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  testID?: string;
  isLoading: boolean;
  offers: Array<OnlineOffer>;
  isError: boolean;
  onNavigateToDetail: (item: OnlineOffer) => void;
};
export const OnlineCashbackOfferCarousel = ({
  isError,
  isLoading,
  offers,
  onNavigateToDetail,
  onPress,
  style,
  testID,
}: OnlineCashbackOfferCarouselProps) => {
  const Intl = useIntl();
  const { space } = useTheme();
  const { permission } = useCashbackPermission();

  const isEmptyAfterFetch = !isLoading && offers?.length === 0 && !isError;

  const renderItem: ListRenderItem<OnlineOffer> = ({ index, item }) => {
    const isLastIndex = index === offers.length - 1;
    const { advertiserName, imageUrl, logoUrl, title } = item;
    return (
      <CashbackCarouselItem
        kicker={advertiserName}
        title={title}
        testID={`cashback-item-${index}`}
        numberOfLines={1}
        imgSrc={imageUrl ? { uri: imageUrl } : undefined}
        logoSrc={logoUrl ? { uri: logoUrl } : undefined}
        style={{ marginRight: isLastIndex ? 0 : space.smallMedium }}
        onPress={() => onNavigateToDetail(item)}
        subTitle={Intl.formatMessage({ id: 'benefits.cashback.onlineType' })}
      />
    );
  };
  const renderItemSkeleton = () => (
    <CashbackCarouselItemSkeleton style={{ marginRight: space.smallMedium }} testID="item-skeleton" />
  );
  if (isError || isEmptyAfterFetch || !permission) {
    return null;
  }
  return (
    <ProductCarousel
      style={style}
      keyExtractor={item => item.id}
      title={Intl.formatMessage({
        id: 'benefits.cashback.onlineCashback',
      })}
      testID={testID}
      isLoading={isLoading}
      onPress={onPress}
      products={offers}
      renderItem={renderItem}
      renderItemSkeleton={renderItemSkeleton}
    />
  );
};
