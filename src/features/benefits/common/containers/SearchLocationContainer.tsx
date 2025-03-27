import React, { useRef, useEffect, useCallback, useState } from 'react';
import { SearchLocationBottomSheet } from './SearchLocationBottomSheet';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { useLoadDeviceLocation } from '../../../../common/hooks/useLoadDeviceLocation';
import type { KeyedAddress } from '../../../../common/stores/useKeyedAddressStore';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '../../cash-back/constants';
import { useCashbackTracking } from '../../cash-back/hooks/useCashbackTracking';

const DEFAULT_KEYED_ADDRESS: KeyedAddress = {
  name: '183 Pitt St, Sydney NSW 2000',
  latitude: DEFAULT_LATITUDE,
  longitude: DEFAULT_LONGITUDE,
  isCurrentLocation: false,
};

export interface SearchLocationContainerChildrenProps {
  setKeyedAddress: (value: KeyedAddress) => void;
  allowDataToLoad: boolean;
  openSearchLocationBottomSheet: () => void;
  keyedAddress: KeyedAddress;
}

type ChildrenFunction = (props: SearchLocationContainerChildrenProps) => React.ReactNode;

export const SearchLocationContainer = ({
  children,
  shouldUseCheckInsteadOfRequest = false,
}: {
  children: ChildrenFunction;
  shouldUseCheckInsteadOfRequest?: boolean;
}) => {
  const locationRef = useRef<BottomSheetRef>(null);
  const { trackClickOnSelectLocation } = useCashbackTracking();
  const [allowDataToLoad, setAllowDataToLoad] = useState(false);

  const { keyedAddress, loadCurrentLocation, setKeyedAddress } = useLoadDeviceLocation({
    onCannotRequestPermission: () => {
      // Do nothing because we always have a fallback location
    },
    onFinish: () => {
      setAllowDataToLoad(true);
    },
    loadPermissionParam: {
      bypassFalsyCallback: true,
      shouldUseCheckInsteadOfRequest,
    },
  });

  useEffect(() => {
    // Only load current location if there is no keyed address
    if (!keyedAddress) {
      loadCurrentLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyedAddress]);

  useEffect(() => {
    if (keyedAddress) {
      // Allow data to load when we have a keyed address in local
      setAllowDataToLoad(true);
    }
  }, [keyedAddress]);

  const openSearchLocationBottomSheet = useCallback(() => {
    locationRef.current?.open();
  }, []);

  const handleOnAddressSelect = (address: KeyedAddress) => {
    trackClickOnSelectLocation(address);
    setKeyedAddress(address);
  };

  return (
    <>
      {children({
        setKeyedAddress,
        allowDataToLoad,
        openSearchLocationBottomSheet,
        keyedAddress: keyedAddress || DEFAULT_KEYED_ADDRESS,
      })}
      <SearchLocationBottomSheet onAddressSelect={handleOnAddressSelect} btsRef={locationRef} />
    </>
  );
};
