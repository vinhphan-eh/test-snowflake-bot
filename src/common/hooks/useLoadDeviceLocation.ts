import { useCallback, useEffect, useState } from 'react';
import type { NativeEventSubscription } from 'react-native';
import { AppState, Platform } from 'react-native';
import { useLocation } from './useLocation';
import { useGetLocationsQuery } from '../../new-graphql/generated';
import type { KeyedAddress } from '../stores/useKeyedAddressStore';

export type LoadLocationParams = {
  onCannotRequestPermission?: () => void;
  onLocationTurnOnBySetting?: () => void;
  onLocationTurnOffBySetting?: () => void;
  onRequestSuccess?: (position: KeyedAddress | undefined) => void;
  onFinish?: () => void;
  loadPermissionParam?: {
    bypassFalsyCallback: boolean;
    shouldUseCheckInsteadOfRequest: boolean;
  };
};

type LocationCoord = {
  latitude: number;
  longitude: number;
};

export const useLoadDeviceLocation = ({
  loadPermissionParam = {
    shouldUseCheckInsteadOfRequest: false,
    bypassFalsyCallback: false,
  },
  onCannotRequestPermission = () => {},
  onFinish = () => {},
  onLocationTurnOffBySetting = () => {},
  onLocationTurnOnBySetting = () => {},
  onRequestSuccess = () => {},
}: LoadLocationParams) => {
  const { checkPermission, getCurrentLocation, keyedAddress, resetLocation, setKeyedAddress } = useLocation();

  const [locationCoord, setLocationCoord] = useState<LocationCoord>();

  const { data, isFetching } = useGetLocationsQuery(
    {
      input: { longitude: locationCoord?.longitude, latitude: locationCoord?.latitude },
    },
    {
      enabled: !!locationCoord,
    }
  );

  // this hook will be triggered when
  // 1. first time load, we call getLocationQuery
  // 2. locationCoord doesn't changed, so data of location is on cache -< isFetching not changed, `loadCurrentLocation` is called then reference of locationCoord is updated
  // 3. location changes, getLocationQuery is refetched, and locationCoord reference also get updated
  useEffect(() => {
    if (isFetching) {
      return;
    }
    if (data?.getLocations?.addresses?.length && locationCoord !== undefined) {
      const location = data.getLocations?.addresses[0];
      const result: KeyedAddress = {
        name: location?.formattedAddress || 'Your current location',
        latitude: locationCoord.latitude,
        longitude: locationCoord.longitude,
        isCurrentLocation: true,
      };
      onRequestSuccess(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, locationCoord]);

  const loadCurrentLocation = async () => {
    const { bypassFalsyCallback, shouldUseCheckInsteadOfRequest } = loadPermissionParam;
    await getCurrentLocation({
      shouldUseCheckInsteadOfRequest,
      onSuccess: async currentPosition => {
        const { latitude, longitude } = currentPosition.coords;
        setLocationCoord({ latitude, longitude });
      },
      onCannotRequestPermission: () => {
        resetLocation();
        if (!bypassFalsyCallback) {
          onCannotRequestPermission();
        }
      },
      onFinish,
    });
  };

  // on IOS, have to handle cases when user changes permission in app setting
  // for android, it will reset the app, can ignore
  const checkLocationIfUserTouchAppSetting = useCallback(async () => {
    const status = await checkPermission();
    if (status !== 'granted' && keyedAddress) {
      // granted => no permission
      onLocationTurnOffBySetting();
      resetLocation();
    } else if (status === 'granted' && !keyedAddress) {
      // no permission => granted
      onLocationTurnOnBySetting();
      await loadCurrentLocation();
    }
  }, [keyedAddress]);

  useEffect(() => {
    const listener: NativeEventSubscription = AppState.addEventListener('change', state => {
      if (state === 'active' && Platform.OS === 'ios') {
        checkLocationIfUserTouchAppSetting();
      }
    });

    return () => {
      listener.remove();
    };
  }, [checkLocationIfUserTouchAppSetting]);

  return {
    keyedAddress,
    loadCurrentLocation,
    setKeyedAddress,
  };
};
