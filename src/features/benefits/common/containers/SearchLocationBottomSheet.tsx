import React, { useRef } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { Icon, Typography, useTheme } from '@hero-design/rn';
import { GoogleAddressInput } from '../../../../common/components/autocomplete-address-input/GoogleAddressInput';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD } from '../../../../common/components/bottom-sheet/BottomSheetWithHD';
import TouchOutsideDismissKeyboard from '../../../../common/components/touch-dismiss-keyboard';
import { useLoadDeviceLocation } from '../../../../common/hooks/useLoadDeviceLocation';
import type { KeyedAddress } from '../../../../common/stores/useKeyedAddressStore';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useCashbackTracking } from '../../cash-back/hooks/useCashbackTracking';
import { NoLocationServiceBottomSheet } from '../components/NoLocationServiceBottomSheet';

type SearchLocationBottomSheetProps = {
  btsRef: React.RefObject<BottomSheetRef>;
  onAddressSelect: (address: KeyedAddress) => void;
};

export const SearchLocationBottomSheet = ({ btsRef, onAddressSelect }: SearchLocationBottomSheetProps) => {
  const Intl = useIntl();
  const { space } = useTheme();

  const noServiceBsRef = useRef<BottomSheetRef>(null);
  const { trackClickOnUseCurrentLocation, trackTypeInLocationSearchBar } = useCashbackTracking();

  const { loadCurrentLocation } = useLoadDeviceLocation({
    onCannotRequestPermission: () => {
      noServiceBsRef.current?.open();
    },
    onRequestSuccess: address => {
      if (address) {
        btsRef.current?.close();
        noServiceBsRef.current?.close();
        onAddressSelect(address);
      }
    },
  });

  const onUseCurrentLocation = () => {
    trackClickOnUseCurrentLocation();
    loadCurrentLocation();
  };

  return (
    <>
      <BottomSheetWithHD
        themeName="eBens"
        snapPoints={['1%', '100%']}
        title={Intl.formatMessage({ id: 'benefits.cashback.searchLocation' })}
        ref={btsRef}
        handleIconName="cancel"
        handleIconSize="xsmall"
        onDismiss={() => Keyboard.dismiss()}
      >
        <TouchOutsideDismissKeyboard>
          <BottomSheetView style={{ flex: 1 }}>
            <GoogleAddressInput
              testID="auto-complete-address-input"
              style={{ marginHorizontal: space.medium }}
              inbetweenCompo={
                <TouchableOpacity
                  onPress={onUseCurrentLocation}
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'baseline',
                    alignItems: 'center',
                    marginTop: space.medium,
                  }}
                >
                  <Icon size="xsmall" intent="primary" icon="near-me-outlined" />
                  <Typography.Body style={{ marginLeft: space.small }} intent="primary">
                    {Intl.formatMessage({ id: 'benefits.cashback.useCurrentLocation' })}
                  </Typography.Body>
                </TouchableOpacity>
              }
              onSearchTextChange={(key: string) => {
                if (key) {
                  trackTypeInLocationSearchBar(key);
                }
              }}
              onLocationSelect={address => {
                btsRef.current?.close();
                onAddressSelect({
                  name: address?.formattedAddress ?? '',
                  latitude: address?.geometry?.latitude ?? 0,
                  longitude: address?.geometry?.longitude ?? 0,
                  isCurrentLocation: false,
                });
              }}
            />
          </BottomSheetView>
        </TouchOutsideDismissKeyboard>
      </BottomSheetWithHD>
      <NoLocationServiceBottomSheet bsRef={noServiceBsRef} />
    </>
  );
};
