import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Icon, useTheme } from '@hero-design/rn';
import type { IconProps } from '@hero-design/rn/types/components/Icon';
import type { Region, Camera } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE, MapMarker } from 'react-native-maps';
import { useEffectAfterMount } from '../../../../common/shared-hooks/useEffectAfterMount';
import type { KeyedAddress } from '../../../../common/stores/useKeyedAddressStore';
import type { Category, InStoreOffer } from '../../../../new-graphql/generated';
import { DEFAULT_DELTA, MIN_DISTANCE_IN_KM, MIN_ZOOM_LEVEL } from '../constants';
import { useCashbackTracking } from '../hooks/useCashbackTracking';
import { InstoreOfferItem } from '../instore-offer/components/InstoreOfferItem';
import { useCashbackSearchStore } from '../stores/useCashbackSearchStore';
import type { Coordinate } from '../utils/offer';
import { distanceBetween, getVisibilityRange } from '../utils/offer';

const markerSize = 18;

type CashbackMapViewProps = {
  onRegionChangeComplete: (region: Region, camera: Camera) => void;
  data: Array<InStoreOffer>;
  onMapTap: () => void;
  initialRegion: Region;
  onSelectedItemPress: (item: InStoreOffer) => void;
  searchQuery: string;
  categoryFilter?: Category;
  keyedAddress: KeyedAddress | undefined;
  shouldSelectNearestOfferByDefault: React.MutableRefObject<boolean>;
};

export const CashbackMapView = ({
  categoryFilter,
  data,
  initialRegion,
  keyedAddress,
  onMapTap,
  onRegionChangeComplete,
  onSelectedItemPress,
  searchQuery,
  shouldSelectNearestOfferByDefault,
}: CashbackMapViewProps) => {
  const mapRef = useRef<MapView>(null);
  const { colors, radii, shadows, space } = useTheme();
  const minDrawerSnap = useCashbackSearchStore(state => state.minDrawerSnap);
  const regionRef = useRef<Region | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<InStoreOffer | undefined>(undefined);
  const [currentZoomLevel, setCurrentZoomLevel] = useState(0);
  const { trackClickOnMapViewOfferIcon } = useCashbackTracking();

  const { latitude, latitudeDelta, longitude, longitudeDelta } = initialRegion;

  const showSelectedItem = minDrawerSnap > 0 && !!selectedOffer;

  const animateToRegion = (param: { lat: number; long: number; latDelta?: number; longDelta?: number }) => {
    const { lat, latDelta, long, longDelta } = param;
    if (regionRef.current) {
      const { latitudeDelta: refLatDelta, longitudeDelta: refLongDelta } = regionRef.current;

      mapRef.current?.animateToRegion({
        latitude: lat,
        longitude: long,
        latitudeDelta: latDelta ?? refLatDelta,
        longitudeDelta: longDelta ?? refLongDelta,
      });
    }
  };

  const onBackToCurrentLocation = () => {
    animateToRegion({
      lat: latitude,
      long: longitude,
      latDelta: DEFAULT_DELTA,
      longDelta: DEFAULT_DELTA,
    });
  };

  useEffect(() => {
    // happening once
    if (data.length > 0 && shouldSelectNearestOfferByDefault.current) {
      // eslint-disable-next-line no-param-reassign
      shouldSelectNearestOfferByDefault.current = false;
      const [nearestOffer] = data;
      setSelectedOffer(nearestOffer);
      setTimeout(() => {
        animateToRegion({
          lat: nearestOffer.latitude,
          long: nearestOffer.longitude,
          latDelta: DEFAULT_DELTA,
          longDelta: DEFAULT_DELTA,
        });
      }, 250);
    }
  }, [data]);

  useEffectAfterMount(() => {
    // whenever searchQuery changes, animate to current location
    // because we load inital data batch based on initial zoom level
    // searchQuery triggers new query, so need to get it back to initial zoom to make search consistent
    onBackToCurrentLocation();
  }, [searchQuery, categoryFilter]);

  const isOfferWithinVisibilityRange = (offer: InStoreOffer) => {
    const { max, min } = getVisibilityRange(Math.ceil(currentZoomLevel));
    const distanceToCurrentRegion = distanceBetween(
      {
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
      },
      {
        latitude: offer.latitude,
        longitude: offer.longitude,
      },
      'K'
    );
    return distanceToCurrentRegion >= min && distanceToCurrentRegion <= max;
  };
  useEffect(() => {
    if (selectedOffer) {
      const isDataContainSelectedOffer = data.some(item => item.id === selectedOffer.id);

      const isWithinVisibilityRange = isOfferWithinVisibilityRange(selectedOffer);
      if (!isDataContainSelectedOffer || !isWithinVisibilityRange) {
        setSelectedOffer(undefined);
      }
    }
  }, [initialRegion.latitude, initialRegion.longitude, currentZoomLevel, data, selectedOffer]);

  const onMarkerPressed = (offer: InStoreOffer, lat: number, long: number) => {
    trackClickOnMapViewOfferIcon(offer);
    setSelectedOffer(offer);
    animateToRegion({
      lat,
      long,
    });
  };

  const renderMarkers = () => {
    return data.map(item => {
      const { id, latitude: offerLat, longitude: offerLong } = item;
      const offerLatitude = Number(offerLat);
      let offerLongitude = Number(offerLong);
      const itemCoord: Coordinate = {
        latitude: offerLatitude,
        longitude: offerLongitude,
      };
      const currentRegion: Coordinate = {
        latitude,
        longitude,
      };
      // prevent overlapping current location marker & offer marker
      const distance = distanceBetween(currentRegion, itemCoord, 'K');
      if (distance < MIN_DISTANCE_IN_KM) {
        offerLongitude += MIN_DISTANCE_IN_KM / 100;
      }

      const isWithinVisibilityRange = isOfferWithinVisibilityRange(item);
      const isSelectedOffer = selectedOffer?.id === id;
      if (isWithinVisibilityRange) {
        return (
          <MapMarker
            testID={`offer-marker-${id}`}
            key={id}
            tracksViewChanges={false}
            onPress={() => onMarkerPressed(item, offerLatitude, offerLongitude)}
            hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}
            coordinate={{
              latitude: offerLatitude,
              longitude: offerLongitude,
            }}
          >
            {isSelectedOffer ? (
              <Icon intent="secondary" icon="location-on" />
            ) : (
              <Box
                borderColor="defaultGlobalSurface"
                backgroundColor="secondary"
                borderRadius="rounded"
                borderWidth="medium"
                style={{ width: markerSize, height: markerSize }}
              />
            )}
          </MapMarker>
        );
      }
      return null;
    });
  };

  const renderBackToCurrentLocation = () => {
    const icon: IconProps['icon'] = keyedAddress?.name ? 'near-me' : 'near-me-outlined';
    const intent: IconProps['intent'] = keyedAddress?.name ? 'primary' : 'text';
    return (
      <TouchableOpacity
        testID="back-to-current-location"
        onPress={onBackToCurrentLocation}
        activeOpacity={0.5}
        style={{
          position: 'absolute',
          padding: space.smallMedium,
          backgroundColor: colors.defaultGlobalSurface,
          borderRadius: radii.medium,
          top: space.large,
          right: space.medium,
          ...shadows.default,
        }}
      >
        <Icon intent={intent} testID={icon} icon={icon} size="small" />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <MapView
        testID="cashback-map-view"
        onPress={onMapTap}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ ...StyleSheet.absoluteFillObject }}
        region={{
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta,
        }}
        onRegionChangeComplete={region => {
          regionRef.current = region;
          mapRef.current?.getCamera().then(camera => {
            if (camera.zoom) {
              setCurrentZoomLevel(camera.zoom);
            }
            onRegionChangeComplete(region, camera);
          });
        }}
        minZoomLevel={MIN_ZOOM_LEVEL}
      >
        <MapMarker
          coordinate={{
            latitude,
            longitude,
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
      {showSelectedItem && (
        <InstoreOfferItem
          style={{
            position: 'absolute',
            bottom: minDrawerSnap,
            left: space.medium,
            right: space.medium,
          }}
          item={selectedOffer}
          testID="selected-offer"
          onPress={() => onSelectedItemPress(selectedOffer)}
        />
      )}
      {renderBackToCurrentLocation()}
    </>
  );
};
