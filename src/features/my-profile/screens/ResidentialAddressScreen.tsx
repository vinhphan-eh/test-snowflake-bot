import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Button, useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Page } from '../../../common/components/layout/page';
import SearchAddressInput from '../../../common/components/search-address-input';
import type { SearchAddressInputRef } from '../../../common/components/search-address-input/SearchAddressInput';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { getValidCountryCodeForShaype } from '../../../common/constants/countries';
import { formatAddressDisplay, formatAddressDisplayV2 } from '../../../common/utils/address';
import type { Address, GoogleAddressDetails } from '../../../new-graphql/generated';
import type { ResidentialAddress } from '../../onboarding/stores/useOnboardingStore';
import type { MoneyProfileNavigationProp, MoneyProfileScreenRouteProp } from '../navigation/navigationType';

export const ResidentialAddressScreen = () => {
  const navigation = useNavigation<MoneyProfileNavigationProp<'ResidentialAddress'>>();
  const [maxHeight, setMaxHeight] = useState(0);
  const { params } = useRoute<MoneyProfileScreenRouteProp<'ResidentialAddress'>>();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const [residentialAddress, setResidentialAddress] = useState<ResidentialAddress | null>(
    params?.residentialAddress ?? null
  );
  const { colors } = useTheme();
  const searchAddressInputRef = useRef<SearchAddressInputRef>(null);
  const [isLoading, setIsLoading] = useState(false);

  // support both old & new version of address
  const formattedAddress = residentialAddress?.streetName
    ? formatAddressDisplayV2(residentialAddress as Address)
    : formatAddressDisplay(residentialAddress as Address);

  const goBack = () => {
    params.onBack();
  };

  const onLocationSelect = (address: GoogleAddressDetails) => {
    setResidentialAddress({
      unitNumber: address?.unitNumber || '',
      streetNumber: address?.streetNumber || '',
      streetName: address?.streetName || '',
      streetType: address?.streetType || '',
      longForm: address?.addressLine || '',
      country: getValidCountryCodeForShaype(address?.country || ''),
      townOrCity: address?.townOrCity || '',
      postcode: address?.postCode || '',
      region: address?.region || '',
    });
  };

  const onSubmit = async () => {
    if (residentialAddress?.streetName) {
      setIsLoading(true);
      await params.updateCallback(residentialAddress).finally(() => setIsLoading(false));
    }
  };

  const openManualInput = () => {
    navigation.navigate('EditResidentialAddressManual', {
      residentialAddress: residentialAddress as ResidentialAddress,
      updateCallback: async newAddress => {
        setResidentialAddress(newAddress);
        navigation.goBack();
      },
      goBack,
    });
  };

  useEffect(() => {
    searchAddressInputRef.current?.setAddress(formattedAddress);
  }, [formattedAddress]);

  return (
    <>
      <CustomStatusBar backgroundColor={colors.defaultGlobalSurface} />
      <View
        style={{ flex: 1 }}
        onLayout={({
          nativeEvent: {
            layout: { height },
          },
        }) => {
          if (maxHeight !== height) {
            setMaxHeight(height);
          }
        }}
      >
        <Page.TopBar backgroundColor="defaultGlobalSurface" onRightPress={goBack} hideLeft title="Edit" />
        <Page
          keyboardShouldPersistTaps="handled"
          style={{ backgroundColor: colors.defaultGlobalSurface, paddingBottom: bottomInset }}
        >
          <Page.Title>Residential address</Page.Title>
          <Page.Body marginBottom="xlarge">
            <SearchAddressInput
              maxScreenHeight={maxHeight}
              testID="search-address-input"
              onAddressSelected={onLocationSelect}
              onOpenManualInput={openManualInput}
              ref={searchAddressInputRef}
              textInputStyle={{ backgroundColor: colors.defaultGlobalSurface }}
              theme="swag"
            />
          </Page.Body>
          <Page.Footer>
            <Button
              text="Save"
              testID="address-btn-save"
              accessibilityLabel="Save"
              disabled={!residentialAddress?.streetName}
              onPress={onSubmit}
              variant="filled"
              intent="primary"
              loading={isLoading}
            />
          </Page.Footer>
        </Page>
      </View>
    </>
  );
};
