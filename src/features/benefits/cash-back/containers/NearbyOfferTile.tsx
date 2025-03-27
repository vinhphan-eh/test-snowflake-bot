import React, { useMemo } from 'react';
import type { ViewStyle, StyleProp } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
import type { Region } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE, MapMarker } from 'react-native-maps';
import type { Advertiser } from '../../../../new-graphql/generated';
import { OfferType, useGetCashbackOffersGroupByAdvertiserQuery } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import type { SearchLocationContainerChildrenProps } from '../../common/containers/SearchLocationContainer';
import { SearchLocationContainer } from '../../common/containers/SearchLocationContainer';
import { useBenefitsTracking } from '../../common/hooks/useBenefitsTracking';
import { useCashbackPermission } from '../../common/hooks/useCashbackPermission';
import { DEFAULT_DELTA, DEFAULT_LATITUDE, DEFAULT_LONGITUDE, MIN_DISTANCE_IN_KM } from '../constants';
import type { Coordinate } from '../utils/offer';
import { distanceBetween, getNearByLocationsFromAdvertisers } from '../utils/offer';

type NearbyOfferTileProps = {
  style?: StyleProp<ViewStyle>;
  onShopNowPress: () => void;
  testID?: string;
};

const markerSize = 18;

const { width: screenWidth } = Dimensions.get('window');

export const NearbyOfferTileInner = ({
  allowDataToLoad,
  keyedAddress,
  onShopNowPress,
  style,
  testID,
}: NearbyOfferTileProps & SearchLocationContainerChildrenProps) => {
  const { space } = useTheme();
  const { trackClickShopNowOnNearbyTile } = useBenefitsTracking();
  const { permission } = useCashbackPermission();
  const Intl = useIntl();

  const mapWidth = screenWidth - space.medium * 2;

  const region: Region = {
    longitude: keyedAddress?.longitude || DEFAULT_LONGITUDE,
    latitude: keyedAddress?.latitude || DEFAULT_LATITUDE,
    longitudeDelta: DEFAULT_DELTA,
    latitudeDelta: DEFAULT_DELTA,
  };

  const { data, isError, isLoading } = useGetCashbackOffersGroupByAdvertiserQuery(
    {
      input: {
        first: 10,
        type: OfferType.Instore,
        latitude: region.latitude,
        longitude: region.longitude,
      },
    },
    {
      enabled: !!region && allowDataToLoad && permission,
    }
  );

  const advertisers = useMemo(
    () => (data?.me?.cashback?.allAdvertisers.edges?.map(e => e?.node) ?? []) as Advertiser[],
    [data]
  );

  const offerLocations = useMemo(() => {
    return getNearByLocationsFromAdvertisers(advertisers, region.latitude, region.longitude);
  }, [advertisers, region.latitude, region.longitude]);

  const numOffers = useMemo(() => {
    const offerIdMap: Record<string, boolean> = {};
    offerLocations.forEach(location => {
      offerIdMap[location.offerId] = true;
    });

    return Object.keys(offerIdMap).length;
  }, [offerLocations]);

  const isEmptyAfterFetch = !isLoading && advertisers.length === 0 && !isError;
  if (!permission || isEmptyAfterFetch || isError || isLoading) {
    return null;
  }

  const renderMarkers = () => {
    return offerLocations.map(item => {
      const { id, latitude: offerLat, longitude: offerLong } = item;
      const offerLatitude = Number(offerLat);
      let offerLongitude = Number(offerLong);
      const itemCoord: Coordinate = {
        latitude: offerLatitude,
        longitude: offerLongitude,
      };
      const currentRegion: Coordinate = {
        latitude: region.latitude,
        longitude: region.longitude,
      };
      // prevent overlapping current location marker & offer marker
      const distance = distanceBetween(currentRegion, itemCoord, 'K');
      if (distance < MIN_DISTANCE_IN_KM) {
        offerLongitude += MIN_DISTANCE_IN_KM / 100;
      }
      return (
        <MapMarker
          testID={`offer-marker-${id}`}
          key={id}
          coordinate={{
            latitude: offerLatitude,
            longitude: offerLongitude,
          }}
        >
          <Box
            borderColor="defaultGlobalSurface"
            backgroundColor="secondary"
            borderRadius="rounded"
            borderWidth="medium"
            style={{ width: markerSize, height: markerSize }}
          />
        </MapMarker>
      );
    });
  };

  return (
    <Box
      borderBottomLeftRadius="xlarge"
      borderBottomRightRadius="xlarge"
      justifyContent="flex-end"
      testID={testID}
      style={[{ width: mapWidth, height: mapWidth / 2, overflow: 'hidden' }, style]}
    >
      <MapView
        pointerEvents="none"
        scrollEnabled={false}
        testID="cashback-map-view"
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        region={region}
      >
        <MapMarker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        >
          <Box
            borderColor="defaultGlobalSurface"
            backgroundColor="onInfoSurface"
            borderRadius="rounded"
            style={{ width: markerSize, height: markerSize, borderWidth: 2.5 }}
          />
        </MapMarker>
        {renderMarkers()}
      </MapView>
      <Box
        backgroundColor="defaultGlobalSurface"
        paddingHorizontal="smallMedium"
        paddingVertical="medium"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography.Body variant="regular-bold" style={{ marginRight: space.medium }}>
          {Intl.formatMessage(
            { id: 'benefits.cashback.offerNearby' },
            {
              offerNum: numOffers,
            }
          )}
        </Typography.Body>
        <Button
          onPress={() => {
            trackClickShopNowOnNearbyTile();
            onShopNowPress();
          }}
          variant="inline-text"
          text={Intl.formatMessage({ id: 'benefits.cashback.shopNow' })}
        />
      </Box>
    </Box>
  );
};

export const NearbyOfferTile = (props: NearbyOfferTileProps) => {
  return (
    <SearchLocationContainer shouldUseCheckInsteadOfRequest>
      {childProps => <NearbyOfferTileInner {...props} {...childProps} />}
    </SearchLocationContainer>
  );
};
