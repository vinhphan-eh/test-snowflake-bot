import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Page } from '../../../common/components/layout/page';
import SearchAddressInput from '../../../common/components/search-address-input';
import type { SearchAddressInputRef } from '../../../common/components/search-address-input/SearchAddressInput';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { getValidCountryCodeForShaype } from '../../../common/constants/countries';
import { formatAddressDisplayV2 } from '../../../common/utils/address';
import type { Address, GoogleAddressDetails } from '../../../new-graphql/generated';
import { useIntl, useRegionLocalisation } from '../../../providers/LocalisationProvider';
import { Region } from '../../../providers/LocalisationProvider/constants';
import type { OnboardingScreenNavigationProp } from '../navigation/navigationTypes';
import type { ResidentialAddress } from '../stores/useOnboardingStore';
import { useOnboardingStore } from '../stores/useOnboardingStore';

const ProfileResidentialAddressScreen = () => {
  const { getNextProfileInputPage, setPersonalDetails } = useOnboardingStore();
  const personalDetails = useOnboardingStore(state => state.personalDetails);
  const navigation = useNavigation<OnboardingScreenNavigationProp<'ProfileResidentialAddress'>>();
  const [maxHeight, setMaxHeight] = useState(0);
  const { bottom: bottomInset } = useSafeAreaInsets();
  const [residentialAddress, setResidentialAddress] = useState<ResidentialAddress | null>(null);
  const { colors } = useTheme();
  const [hasInteracted, setHasInteracted] = useState(false);
  const searchAddressInputRef = useRef<SearchAddressInputRef>(null);
  const Intl = useIntl();
  const { currentRegion } = useRegionLocalisation();

  /**
   * Requirement: valid address with basic fields
   */
  const isNextStepNotEligible = useMemo(
    () => !residentialAddress?.streetNumber || !residentialAddress?.streetName || !residentialAddress?.region,
    [residentialAddress]
  );

  /**
   * Requirement: user has interacted and the stored residential address is valid
   * (interaction required to prevent invalid messages displayed by default when screen is rendered)
   */
  const isAddressInvalid = useMemo(
    () => hasInteracted && isNextStepNotEligible,
    [isNextStepNotEligible, hasInteracted]
  );

  const InvalidAdressMessage = useMemo(() => {
    if (!residentialAddress?.streetNumber) {
      return Intl.formatMessage({ id: 'wallet.onboarding.residential_address.errors.missing_street_number' });
    }

    if (!residentialAddress?.streetName) {
      return Intl.formatMessage({ id: 'wallet.onboarding.residential_address.errors.missing_street_name' });
    }

    if (!residentialAddress?.townOrCity) {
      return Intl.formatMessage({ id: 'wallet.onboarding.residential_address.errors.missing_suburb' });
    }

    if (!residentialAddress?.region) {
      return Intl.formatMessage({ id: 'wallet.onboarding.residential_address.errors.missing_state' });
    }

    return Intl.formatMessage({ id: 'wallet.onboarding.residential_address.errors.generic' });
  }, [residentialAddress]);

  const onSubmit = () => {
    if (residentialAddress?.streetName) {
      setPersonalDetails({
        residentialAddress,
      });

      navigation.navigate(getNextProfileInputPage('ProfileResidentialAddress'));
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const onLocationSelect = (address: GoogleAddressDetails) => {
    setHasInteracted(true);

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

  const openManualInput = () => {
    navigation.navigate('ProfileResidentialAddressManual');
  };

  useEffect(() => {
    /**
     * Only prefilling AU address at this step if already set
     *
     * Reason for not prefilling UK address is because for County / Region field (England / Northern Ireland / Scotland / Wales),
     * pre-existing details from HR platform do not map the County with required 3-letter region code (AU flow included this step).
     * Hence, the displayed address will be considered correct but later Weavr will reject the account creation request.
     *
     * Upon agreement, only if the address is invalid then user would reach this screen, and for UK flow, the address box
     * will be left empty by default to allow users search again for the address in valid format
     */
    if (currentRegion === Region.au && personalDetails.residentialAddress) {
      setResidentialAddress(personalDetails.residentialAddress);
      searchAddressInputRef.current?.setAddress(formatAddressDisplayV2(personalDetails.residentialAddress as Address));
    }
  }, [personalDetails?.residentialAddress, currentRegion]);

  return (
    <>
      <CustomStatusBar />
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
        <Page.TopBar onBack={goBack} hideRight title="Personal details" />
        <Page keyboardShouldPersistTaps="handled" style={{ paddingBottom: bottomInset }}>
          <Page.Title>{`What's your residential address?`}</Page.Title>
          <Page.Body marginBottom="xlarge">
            <Typography.Body variant="regular">
              Please ensure that your residential address matches your chosen identification document exactly, including
              any abbreviations, initials, hyphens, etc.
            </Typography.Body>
            <Box marginTop="medium">
              <SearchAddressInput
                errorMessage={InvalidAdressMessage}
                isInvalid={isAddressInvalid}
                maxScreenHeight={maxHeight}
                testID="search-address-input"
                onAddressSelected={onLocationSelect}
                onOpenManualInput={openManualInput}
                ref={searchAddressInputRef}
                textInputStyle={{ backgroundColor: colors.defaultGlobalSurface }}
              />
            </Box>
          </Page.Body>
          <Page.Footer>
            <Button
              text="Next"
              testID="address-btn-next"
              accessibilityLabel="Next"
              disabled={isNextStepNotEligible}
              onPress={onSubmit}
            />
          </Page.Footer>
        </Page>
      </View>
    </>
  );
};

export { ProfileResidentialAddressScreen };
