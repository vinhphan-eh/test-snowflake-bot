import { Platform } from 'react-native';
import type { GeolocationError, GeolocationResponse } from '@react-native-community/geolocation';
import Geolocation from '@react-native-community/geolocation';
import { PERMISSIONS } from 'react-native-permissions';
import { usePermission } from '../shared-hooks/usePermission';
import { useKeyedAddressStore } from '../stores/useKeyedAddressStore';

type GetCurrentLocationParams = {
  onSuccess: (position: GeolocationResponse) => void;
  onError?: (error: GeolocationError) => void;
  onCannotRequestPermission?: () => void;
  onFinish?: () => void;
  shouldUseCheckInsteadOfRequest?: boolean;
};

export const useLocation = () => {
  const { keyedAddress, setKeyedAddress } = useKeyedAddressStore();
  const { check: checkLocationPermission, request: requestLocationPermission } = usePermission(
    Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
  );

  const keyedLocation = () => {
    return keyedAddress?.name || '';
  };

  const resetLocation = () => {
    setKeyedAddress(undefined);
  };

  const checkPermission = async () => {
    const status = await checkLocationPermission();
    return status;
  };

  const requestPermission = async () => {
    const status = await requestLocationPermission();
    return status;
  };

  const getCurrentLocation = async (params: GetCurrentLocationParams) => {
    const requestStatus = await (params.shouldUseCheckInsteadOfRequest ? checkPermission : requestPermission)();
    const { onCannotRequestPermission, onError, onFinish, onSuccess } = params;
    if (requestStatus === 'granted') {
      Geolocation.setRNConfiguration({
        skipPermissionRequests: true,
        authorizationLevel: 'whenInUse',
      });
      Geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true,
        timeout: 5000,
      });
    } else if (requestStatus === 'blocked') {
      onCannotRequestPermission?.();
    }
    onFinish?.();
  };

  return {
    keyedLocation,
    keyedAddress,
    requestPermission,
    getCurrentLocation,
    checkPermission,
    resetLocation,
    setKeyedAddress,
  };
};
