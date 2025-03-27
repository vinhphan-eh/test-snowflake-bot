import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { Box, Button, Image } from '@hero-design/rn';
import MeaPushProvisioning, { MppCardDataParameters } from '@meawallet/react-native-mpp';
import { useNavigation, useRoute } from '@react-navigation/native';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../../../common/assets/images';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { joinPhoneNumberParts } from '../../../../common/utils/phoneNumber';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import { useGetCurrentUserQuery, useGetOemProvisioningQuery } from '../../../../new-graphql/generated';
import { useDigitalCardSetup } from '../../../wallet/card-setup/stores/useCardSetup';
import type { DigitalWalletScreenNavigationProp, DigitalWalletScreenRouteProp } from '../navigation/navigationTypes';
import { useDigitalWalletStore } from '../stores/useDigitalWalletStore';

export const DigitalWalletSetupScreen = () => {
  const navigation = useNavigation<DigitalWalletScreenNavigationProp<'DigitalWalletSetup'>>();
  const route = useRoute<DigitalWalletScreenRouteProp<'DigitalWalletSetup'>>();
  const { isOnboarding } = route.params;
  const setSkipDigitalProvisioning = useDigitalCardSetup(state => state.setSkipDigitalProvisioning);
  const { bottom: bottomInset } = useSafeAreaInsets();

  const { data: personalDetails } = useGetCurrentUserQuery();
  const { addCardToDigitalWallet, canAddToWallet, getDigitalWalletStatus } = useDigitalWalletStore(state => state);

  useGetOemProvisioningQuery(undefined, {
    enabled: !canAddToWallet,
    onSuccess: data => {
      const oemData = data.me?.wallet?.card?.oemProvisioning;
      if (oemData) {
        const base64HolderName = Base64.stringify(Utf8.parse(oemData.cardHolderName));
        const cardParamaters = MppCardDataParameters.withCardSecret(
          `${oemData.cardToken}#${oemData.expiryDate}#${base64HolderName}`,
          `001#${oemData.otp}`
        );
        getDigitalWalletStatus(cardParamaters);
      }
    },
  });

  const onShowAddPaymentPassView = async () => {
    try {
      const cardDisplayName = `${personalDetails?.me?.details?.firstName} ${personalDetails?.me?.details?.lastName}`;
      const phoneNumber = joinPhoneNumberParts(
        personalDetails?.me?.details?.phoneNumber?.number ?? '',
        personalDetails?.me?.details?.phoneNumber?.countryCode ?? ''
      );
      const address = personalDetails?.me?.details?.residentialAddress;
      await addCardToDigitalWallet(cardDisplayName, {
        address1: address?.longForm ?? undefined,
        address2: undefined,
        administrativeArea: address?.region,
        countryCode: 'AU',
        locality: address?.townOrCity,
        name: cardDisplayName,
        phoneNumber,
        postalCode: address?.postcode,
      });
      navigation.navigate('DigitalWalletOutcome', { isOnboarding, outcome: 'success' });
    } catch (error) {
      navigation.navigate('DigitalWalletOutcome', { isOnboarding, outcome: 'failure' });
    }
  };

  const onSkip = () => {
    setSkipDigitalProvisioning();

    if (isOnboarding) {
      navigation.navigate('CardSetupStack', { screen: 'CardSetupComplete' });
    } else {
      navigateToTopTabs('card-tab');
    }
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar hideRight onBack={navigation.goBack} title="Digital wallet set-up" />
      <Page style={{ paddingBottom: bottomInset }}>
        <Page.Body>
          <Box alignItems="center" paddingTop="large">
            {Platform.OS === 'ios' && (
              <Box flexDirection="row" alignItems="center">
                <Image
                  resizeMode="contain"
                  style={{
                    width: 96,
                    height: 32,
                  }}
                  accessibilityLabel="Swag Brand Mark"
                  source={images.swagDark}
                />
                <Box marginHorizontal="medium" bgColor="onDefaultGlobalSurface" style={{ height: 56, width: 1 }} />
                <Image
                  resizeMode="contain"
                  style={{
                    height: 33,
                    width: 76,
                  }}
                  accessibilityLabel="Apple Pay Brand Mark"
                  source={images.applePayMark}
                />
              </Box>
            )}
            <Page.Title>{Platform.OS === 'ios' ? 'Set up Apple Pay.' : 'Set up Google Pay.'}</Page.Title>
          </Box>
          <Box flex={1} alignItems="center" justifyContent="center">
            {Platform.OS === 'ios' ? (
              <Image
                resizeMode="contain"
                style={{ height: 340, width: 167 }}
                accessibilityLabel="Apple Pay Phone"
                source={images.applePayPhone}
              />
            ) : (
              <Image
                resizeMode="contain"
                style={{ height: 370, width: 184 }}
                accessibilityLabel="Google Pay Phone"
                source={images.googlePayPhone}
              />
            )}
          </Box>
        </Page.Body>
        <Page.Footer justifyContent="flex-end" flex={1}>
          {canAddToWallet &&
            (Platform.OS === 'ios' ? (
              <MeaPushProvisioning.ApplePay.AddPassButton
                style={{ height: 54 }}
                accessibilityLabel="Add to Apple Wallet"
                addPassButtonStyle="black"
                onPress={onShowAddPaymentPassView}
              />
            ) : (
              <TouchableOpacity
                activeOpacity={0.6}
                accessibilityLabel="Add to Google Pay"
                style={{
                  height: 56,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 56,
                  backgroundColor: 'black',
                }}
                onPress={onShowAddPaymentPassView}
              >
                <Image resizeMode="contain" style={{ height: 56, flex: 1 }} source={images.googlePayButton} />
              </TouchableOpacity>
            ))}
          <Box marginTop="medium">
            <Button text={`I'll do this later`} variant="outlined" testID="do-this-later-btn" onPress={onSkip} />
          </Box>
        </Page.Footer>
      </Page>
    </>
  );
};
