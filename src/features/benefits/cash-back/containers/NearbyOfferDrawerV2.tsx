import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import type { LayoutChangeEvent, ListRenderItem } from 'react-native';
import { Keyboard, Platform, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import type { BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import type { BottomSheetMethods } from '@gorhom/bottom-sheet/src/types';
import { Box, Icon, Spinner, Typography, useTheme } from '@hero-design/rn';
import type { IconProps } from '@hero-design/rn/types/components/Icon';
import type { Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Drawer from '../../../../common/components/drawer';
import { OutcomeTemplate } from '../../../../common/components/outcome-template/OutcomeTemplate';
import type { KeyedAddress } from '../../../../common/stores/useKeyedAddressStore';
import type { Advertiser } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { OfferSkeleton } from '../components/skeletons/OfferSkeleton';
import { InstoreAdvertiserItem } from '../instore-offer/components/InstoreAdvertiserItem';
import { useCashbackSearchStore } from '../stores/useCashbackSearchStore';
import { extractCityAndState, getNearByLocationsFromAdvertisers } from '../utils/offer';

// Clone from NearbyOfferDrawer. Add support for Advertiser type, which includes multiple offers and multiple locations.

type NearbyOfferDrawerV2Props = {
  data: Array<Advertiser>;
  currentRegion: Region;
  onSelectLocation: () => void;
  drawerRef: React.RefObject<BottomSheetMethods>;
  onItemPress: (item: Advertiser) => void;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  onEndReached: () => void;
  onScrollBeginDrag?: () => void;
  keyedAddress: KeyedAddress;
  isFetched: boolean;
  shouldSelectNearestOfferByDefault: React.MutableRefObject<boolean>;
};

const eventShow = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
const evenHide = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

export const NearbyOfferDrawerV2 = ({
  currentRegion,
  data,
  drawerRef,
  isFetched,
  isFetchingNextPage,
  isLoading,
  keyedAddress,
  onEndReached,
  onItemPress,
  onScrollBeginDrag,
  onSelectLocation,
  shouldSelectNearestOfferByDefault,
}: NearbyOfferDrawerV2Props) => {
  const { colors, radii, shadows, space } = useTheme();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const storeIndex = useRef(0);
  const flatlistRef = useRef<BottomSheetFlatListMethods>(null);
  const Intl = useIntl();
  const [snapPoints, setSnapPoints] = useState<Array<number | string>>(['1%', '100%']);
  const setMinSnap = useCashbackSearchStore(state => state.setMinDrawerSnap);
  const minSnap = useCashbackSearchStore(state => state.minDrawerSnap);

  const offerLocations = useMemo(() => {
    return getNearByLocationsFromAdvertisers(data, currentRegion.latitude, currentRegion.longitude);
  }, [data, currentRegion]);

  const numNearbyOffers = useMemo(() => {
    const offerMap: Record<string, boolean> = {};
    offerLocations.forEach(offer => {
      offerMap[offer.offerId] = true;
    });

    return Object.keys(offerMap).length;
  }, [offerLocations]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(eventShow, () => {
      drawerRef.current?.snapToIndex(2);
    });
    const keyboardDidHideListener = Keyboard.addListener(evenHide, () => {
      drawerRef.current?.snapToIndex(1);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const renderSelectLocation = () => {
    const { name: address } = keyedAddress;
    const icon: IconProps['icon'] = address ? 'near-me' : 'near-me-outlined';
    return (
      <TouchableOpacity
        onPress={onSelectLocation}
        testID="select-location-con"
        style={{ flexDirection: 'row', alignSelf: 'baseline', marginVertical: space.large + 2, alignItems: 'center' }}
      >
        <Icon testID={icon} size="xsmall" intent="primary" icon={icon} />
        <Typography.Body style={{ marginLeft: space.small }} intent="primary" variant="small">
          {extractCityAndState(keyedAddress)}
        </Typography.Body>
      </TouchableOpacity>
    );
  };

  const onTitleLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }: LayoutChangeEvent) => {
    if (snapPoints.length === 2) {
      const bottomGap = bottomInset || space.large;
      const position = height + bottomGap + space.medium;
      if (minSnap === 0) {
        setMinSnap(position);
      }
      setSnapPoints([position, '75%', '100%']);
    }
  };

  const onTitlePress = () => {
    Keyboard.dismiss();
    switch (storeIndex.current) {
      case 0: {
        drawerRef.current?.snapToIndex(1);
        break;
      }
      case 1: {
        drawerRef.current?.snapToIndex(2);
        break;
      }
      default:
        break;
    }
  };

  const renderHeader = () => {
    return (
      <>
        <TouchableWithoutFeedback
          testID="drawer-header"
          hitSlop={{ top: 10, left: 20, bottom: 10, right: 20 }}
          onPress={onTitlePress}
        >
          <Box onLayout={onTitleLayout} flexDirection="row">
            <Icon icon="format-list-bulleted" />
            <Typography.Body variant="regular-bold" style={{ marginLeft: space.small }}>
              {Intl.formatMessage(
                { id: 'benefits.cashback.offerNearby' },
                {
                  offerNum: numNearbyOffers,
                }
              )}
            </Typography.Body>
          </Box>
        </TouchableWithoutFeedback>
        {renderSelectLocation()}
      </>
    );
  };

  const renderItem: ListRenderItem<Advertiser> = ({ index, item }: { item: Advertiser; index: number }) => {
    return (
      <InstoreAdvertiserItem
        testID={`advertiser-${index}`}
        onPress={() => onItemPress(item)}
        item={item}
        longitude={currentRegion.longitude}
        latitude={currentRegion.latitude}
      />
    );
  };

  const renderNotFound = useCallback(() => {
    return (
      <OutcomeTemplate
        bodyStyle={{ justifyContent: 'flex-start' }}
        title={Intl.formatMessage({ id: 'benefits.error.noResults' })}
        content={Intl.formatMessage({ id: 'benefits.error.pleaseAdjustYourSearch' })}
        imageName="goggles"
        backgroundColor="defaultGlobalSurface"
      />
    );
  }, []);

  const renderEmpty = useCallback(() => {
    if (isLoading) {
      return (
        <Box testID="skeleton-loading">
          <OfferSkeleton />
          <OfferSkeleton marginTop="medium" />
          <OfferSkeleton marginTop="medium" />
          <OfferSkeleton marginTop="medium" />
          <OfferSkeleton marginTop="medium" />
          <OfferSkeleton marginTop="medium" />
        </Box>
      );
    }

    if (shouldSelectNearestOfferByDefault.current && isFetched) {
      // eslint-disable-next-line no-param-reassign
      shouldSelectNearestOfferByDefault.current = false;
      drawerRef.current?.snapToIndex(1);
    }
    return renderNotFound();
  }, [isLoading, isFetched]);

  return (
    <Drawer
      ref={drawerRef}
      onChange={index => {
        storeIndex.current = index;

        if (index === 0) {
          flatlistRef.current?.scrollToOffset({ animated: false, offset: 0 });
        }
      }}
      backgroundStyle={{
        backgroundColor: colors.defaultGlobalSurface,
      }}
      style={{
        backgroundColor: colors.defaultGlobalSurface,
        borderRadius: radii.xlarge,
        ...shadows.default,
      }}
      snapPoints={snapPoints}
    >
      <BottomSheetFlatList
        ref={flatlistRef}
        keyboardShouldPersistTaps="always"
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        keyboardDismissMode="on-drag"
        ListEmptyComponent={renderEmpty}
        onEndReached={onEndReached}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: bottomInset, paddingHorizontal: space.medium }}
        data={data}
        onScrollBeginDrag={onScrollBeginDrag}
        ListFooterComponent={
          isFetchingNextPage ? <Spinner accessibilityLabel="spinner" size="small" intent="primary" /> : null
        }
      />
    </Drawer>
  );
};
