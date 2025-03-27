import React from 'react';
import type { ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useTheme, Typography, Icon, Box } from '@hero-design/rn';
import { InstoreCashbackAdvertiserCarouselItem } from './InstoreCashbackAdvertiserCarouselItem';
import { InstoreCashbackOfferCarouselEmptyState } from './InstoreCashbackOfferCarouselEmptyState';
import type { KeyedAddress } from '../../../../../common/stores/useKeyedAddressStore';
import type { Advertiser, OfferLocation } from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { ProductCarousel } from '../../../common/components/ProductCarousel';
import { useCashbackPermission } from '../../../common/hooks/useCashbackPermission';
import { CashbackCarouselItemSkeleton } from '../../components/skeletons/CashbackCarouselItemSkeleton';
import { extractCityAndState } from '../../utils/offer';

type InstoreCashbackOfferCarouselProps = {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  testID?: string;
  isLoading: boolean;
  advertisers: Array<Advertiser>;
  isError: boolean;
  onNavigateToDetail: (item: Advertiser) => void;
  keyedAddress: KeyedAddress;
  setKeyedAddress: (value: KeyedAddress) => void;
  openSearchLocationBottomSheet: () => void;
  nearestLocation: OfferLocation | null;
};
export const InstoreCashbackOfferCarousel = ({
  advertisers,
  isError,
  isLoading,
  keyedAddress,
  nearestLocation,
  onNavigateToDetail,
  onPress,
  openSearchLocationBottomSheet,
  setKeyedAddress,
  style,
  testID,
}: InstoreCashbackOfferCarouselProps) => {
  const Intl = useIntl();
  const { space } = useTheme();
  const { permission } = useCashbackPermission();

  const isEmptyAfterFetch = !isLoading && advertisers?.length === 0 && !isError;

  const renderItem: ListRenderItem<Advertiser> = ({ index, item }) => {
    const isLastIndex = index === advertisers.length - 1;
    return (
      <InstoreCashbackAdvertiserCarouselItem
        item={item}
        isLastIndex={isLastIndex}
        onPress={() => onNavigateToDetail(item)}
        latitude={keyedAddress.latitude}
        longitude={keyedAddress.longitude}
        index={index}
      />
    );
  };
  const renderItemSkeleton = () => (
    <CashbackCarouselItemSkeleton style={{ marginRight: space.smallMedium }} testID="item-skeleton" />
  );
  if (isError || !permission) {
    return null;
  }

  return (
    <ProductCarousel<Advertiser>
      style={style}
      keyExtractor={item => item.id}
      title={Intl.formatMessage({
        id: 'benefits.cashback.instoreCashback',
      })}
      testID={testID}
      isLoading={isLoading}
      onPress={onPress}
      products={advertisers}
      renderItem={renderItem}
      renderItemSkeleton={renderItemSkeleton}
      isEmptyAfterFetch={isEmptyAfterFetch}
      renderEmptyState={() =>
        nearestLocation && (
          <InstoreCashbackOfferCarouselEmptyState setKeyedAddress={setKeyedAddress} nearestLocation={nearestLocation} />
        )
      }
      renderSecondaryButton={() => (
        <Box marginLeft="medium" flex={1} flexDirection="row" justifyContent="flex-end">
          <TouchableOpacity
            onPress={openSearchLocationBottomSheet}
            testID="select-location-con"
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon testID="near-me" icon="near-me" size="xsmall" intent="primary" />

            <Typography.Caption
              style={{ marginLeft: space.xsmall, textAlign: 'right' }}
              intent="primary"
              numberOfLines={1}
            >
              {extractCityAndState(keyedAddress)}
            </Typography.Caption>
          </TouchableOpacity>
        </Box>
      )}
    />
  );
};
