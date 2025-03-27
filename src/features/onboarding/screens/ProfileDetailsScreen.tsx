import React, { useRef, useState } from 'react';
import { Alert, Button, List, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import DeviceInfo from 'react-native-device-info';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomSheetRef } from '../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetView } from '../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD as BottomSheet } from '../../../common/components/bottom-sheet/BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from '../../../common/components/bottom-sheet/useBottomSheetDynamicSnapPoints';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { filterDialCodeFromMobileCountryCode } from '../../../common/constants/countries';
import { DISPLAY_FORMAT } from '../../../common/constants/date';
import { useCheckUKPermission } from '../../../common/hooks/useCheckUKPermission';
import { useMixpanel } from '../../../common/hooks/useMixpanel';
import { queryClient } from '../../../common/libs/queryClient';
import { formatAddressDisplayV2 } from '../../../common/utils/address';
import type { StartUkWalletCreationInput } from '../../../new-graphql/generated';
import { useGetWalletStatusQuery, useStartUkWalletCreationMutation } from '../../../new-graphql/generated';
import { useRegionLocalisation } from '../../../providers/LocalisationProvider';
import { MIN_AGE_FOR_UK, MIN_AGE_FOR_AU } from '../constants/common';
import {
  MONEY_MODULE_NAME,
  MONEY_OPEN_SSA_COMPLETE_ALL_DETAILS,
  MONEY_OPEN_SSA_CONFIRM_DETAILS_CONFIRMATION,
} from '../constants/trackingEvents';
import type { OnboardingScreenNavigationProp } from '../navigation/navigationTypes';
import { useOnboardingStore } from '../stores/useOnboardingStore';

const numberWithSpaces = (numb: number) => {
  return numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const calculateAge = (birthday: string) => {
  const dayjsDateA = dayjs(new Date());
  const dayjsDateB = dayjs(new Date(birthday));

  return dayjsDateA.diff(dayjsDateB, 'year', true);
};

const ProfileDetailsScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp<'PersonalDetails'>>();
  const setPersonalDetails = useOnboardingStore(state => state.setPersonalDetails);
  const personalDetails = useOnboardingStore(state => state.personalDetails);
  const isUKcustomer = useCheckUKPermission();
  const { formatMessage } = useRegionLocalisation();
  const { eventTracking } = useMixpanel();

  const bs = useRef<BottomSheetRef>(null);
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { space } = useTheme();
  const [showTopAlert, setShowTopAlert] = useState(true);

  const onBack = () => {
    navigation.goBack();
  };

  const editFullName = () => {
    navigation.navigate('EditName', {
      pageTitle: 'Edit Name',
      topBarTitle: 'Edit',
      name: {
        firstName: personalDetails.firstName,
        lastName: personalDetails.lastName,
        middleName: personalDetails.middleName || undefined,
      },
      updateCallback: data => {
        setPersonalDetails(data);
      },
    });
  };

  const editDOB = () => {
    navigation.navigate('EditDoB', {
      pageTitle: 'Edit birthday',
      dateOfBirth: personalDetails.dateOfBirth || '',
      updateCallback: dateOfBirth => {
        setPersonalDetails({ dateOfBirth });
      },
    });
  };

  const editResidentialAddress = () => {
    navigation.navigate('EditResidentialAddressManual', {
      residentialAddress: personalDetails.residentialAddress,
      pageTitle: 'Edit address',
      updateCallback: async data => {
        setPersonalDetails({ residentialAddress: data });
        navigation.goBack();
      },
      goBack: navigation.goBack,
    });
  };

  const editPhoneNumber = () => {
    navigation.navigate('EditPhoneNumber', {
      phoneNumber: personalDetails.phoneNumber || null,
      pageTitle: 'Edit mobile number',
      updateCallback: phoneNumber => {
        setPersonalDetails({ phoneNumber });
        navigation.goBack();
      },
      goBack: navigation.goBack,
    });
  };

  const handleNext = () => {
    if (!isUKcustomer) {
      eventTracking({
        event: MONEY_OPEN_SSA_COMPLETE_ALL_DETAILS,
        categoryName: 'user action',
        metaData: {
          module: MONEY_MODULE_NAME,
        },
      });
    }
    bs.current?.open();
  };

  const formatDate = (date: string) => {
    try {
      return dayjs(new Date(date)).format(DISPLAY_FORMAT);
    } catch {
      return '';
    }
  };

  const getDisplayPhoneNumber = (): string => {
    if (!personalDetails.phoneNumber?.number) {
      return '';
    }

    const { countryCode, number } = personalDetails.phoneNumber;
    return `${filterDialCodeFromMobileCountryCode(countryCode)} ${numberWithSpaces(+number)}`;
  };

  const {
    animatedContentHeight,
    animatedHandleHeight,
    animatedSnapPoints,
    contentContainerHeightStyle,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(true);

  const startUkWalletCreationMutation = useStartUkWalletCreationMutation({
    onError: () => {
      navigation.navigate('GeneralError');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(useGetWalletStatusQuery.getKey());
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'UkPasscode',
          },
        ],
      });
    },
  });

  const startUKWalletCreation = async () => {
    const ipAddress = DeviceInfo.getIpAddressSync();
    const startUkWalletCreationInput: StartUkWalletCreationInput = {
      dateOfBirth: personalDetails.dateOfBirth,
      firstName: personalDetails.firstName,
      middleName: personalDetails.middleName,
      hasConsentedPrivacyPolicy: true,
      hasConsentedTermsConditions: true,
      lastName: personalDetails.lastName,
      phoneNumber: {
        countryCode: filterDialCodeFromMobileCountryCode(personalDetails.phoneNumber.countryCode),
        number: personalDetails.phoneNumber.number,
      },
      residentialAddress: {
        addressLine1: personalDetails.residentialAddress.longForm,
        country: personalDetails.residentialAddress.country ?? 'GB',
        postcode: personalDetails.residentialAddress.postcode,
        region: personalDetails.residentialAddress.region,
        townOrCity: personalDetails.residentialAddress.townOrCity,
        streetName: personalDetails.residentialAddress.streetName,
        streetNumber: personalDetails.residentialAddress.streetNumber,
        streetType: personalDetails.residentialAddress.streetType,
        unitNumber: personalDetails.residentialAddress.unitNumber,
      },
      deviceIpAddress: ipAddress,
    };

    startUkWalletCreationMutation.mutate({ input: startUkWalletCreationInput });
  };

  const confirmDetails = () => {
    bs.current?.close();
    const minAge = isUKcustomer ? MIN_AGE_FOR_UK : MIN_AGE_FOR_AU;
    const isValidAge = calculateAge(personalDetails.dateOfBirth) >= minAge;
    if (!isValidAge) {
      navigation.navigate('AgeNotQualified');
      return;
    }

    if (isUKcustomer) {
      startUKWalletCreation();
    } else {
      eventTracking({
        event: MONEY_OPEN_SSA_CONFIRM_DETAILS_CONFIRMATION,
        categoryName: 'user action',
        metaData: {
          module: MONEY_MODULE_NAME,
        },
      });
      navigation.navigate('IdSelection');
    }
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar title="Personal details" hideRight onBack={onBack} />
      <Page style={{ paddingBottom: bottomInset }}>
        <Page.Title>Please confirm your details are correct{isUKcustomer ? ' and match your ID' : ''}.</Page.Title>
        <Page.Body>
          {showTopAlert && (
            <Alert
              content="Please make sure your details match your ID before you proceed."
              intent="warning"
              onClose={() => setShowTopAlert(false)}
              style={{ marginBottom: space.xxxlarge }}
            />
          )}
          <List.Item
            variant="card"
            style={{ marginBottom: space.medium }}
            title="Full name"
            subtitle={`${personalDetails.firstName} ${personalDetails.middleName ?? ''} ${personalDetails.lastName}`}
            onPress={editFullName}
            suffix="edit-template-outlined"
            testID="fullName"
          />
          <List.Item
            variant="card"
            style={{ marginBottom: space.medium }}
            title="Mobile number"
            subtitle={getDisplayPhoneNumber()}
            onPress={editPhoneNumber}
            suffix="edit-template-outlined"
            testID="mobileNumber"
          />
          <List.Item
            variant="card"
            style={{ marginBottom: space.medium }}
            title="Residential address"
            subtitle={formatAddressDisplayV2({
              ...personalDetails.residentialAddress,
              country: personalDetails.residentialAddress?.country || 'AUS',
            })}
            onPress={editResidentialAddress}
            suffix="edit-template-outlined"
            testID="residentialAddress"
          />
          <List.Item
            variant="card"
            style={{ marginBottom: space.medium }}
            title="Birthday"
            subtitle={formatDate(personalDetails.dateOfBirth)}
            onPress={editDOB}
            suffix="edit-template-outlined"
            testID="birthday"
          />
        </Page.Body>
        <Page.Footer>
          <Button
            text="Next"
            testID="profile-details-next-btn"
            accessibilityLabel="Next"
            loading={startUkWalletCreationMutation.isLoading}
            onPress={handleNext}
          />
        </Page.Footer>
      </Page>
      <BottomSheet
        ref={bs}
        title="Before you proceed"
        actions={[{ testID: 'confirmDetails', title: 'Confirm', onPress: () => confirmDetails() }]}
        handleIconName="cancel"
        handleIconSize="xsmall"
        handleIconIntent="text"
        prefixIconIntent="danger"
        prefixIconName="warning"
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
      >
        <BottomSheetView style={contentContainerHeightStyle} onLayout={handleContentLayout}>
          <Typography.Body variant="regular" testID="confirm-details-text">
            {formatMessage({ id: 'onboarding.detailsConfirmation.bottomSheet' })}
          </Typography.Body>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export { ProfileDetailsScreen };
