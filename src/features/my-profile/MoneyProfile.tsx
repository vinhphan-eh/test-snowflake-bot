import React, { useEffect, useState } from 'react';
import type { ListRenderItem } from 'react-native';
import { FlatList } from 'react-native';
import { Box, Icon, List, Spinner, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { MoneyProfileNavigationProp } from './navigation/navigationType';
import { filterDialCodeFromMobileCountryCode } from '../../common/constants/countries';
import { queryClient } from '../../common/libs/queryClient';
import { openEbenPasscode } from '../../common/screens/passcode/stores/usePasscodeStore';
import { formatAddressDisplay, formatAddressDisplayV2 } from '../../common/utils/address';
import { formatStringToDate } from '../../common/utils/date';
import { joinPhoneNumberParts } from '../../common/utils/phoneNumber';
import {
  UserDetailChangeRequestType,
  useGetMoneyProfileQuery,
  useUpdateWalletProfileMutation,
  type UpdateWalletProfileInput,
} from '../../new-graphql/generated';
import type { ResidentialAddress } from '../onboarding/stores/useOnboardingStore';

type InfoItem = {
  title: string;
  subTitle: string;
  onPress: () => void;
  warning?: boolean;
  testID: string;
};

// basic session cache
let haveOpenedPasscode = false;

type MoneyProfileProps = {
  onExitPasscode: () => void;
};

export const MoneyProfile = ({ onExitPasscode }: MoneyProfileProps) => {
  const navigation = useNavigation<MoneyProfileNavigationProp<'EditName'>>();
  const [finishFraudCheck, setFinishFraudCheck] = useState(haveOpenedPasscode);
  const { space } = useTheme();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { mutateAsync } = useUpdateWalletProfileMutation<Error>();
  const { data: profileData, isLoading } = useGetMoneyProfileQuery();

  const openingNameChangeRequest = profileData?.me?.profileChangeRequests?.requests?.find(
    x => x?.type === UserDetailChangeRequestType.Name
  );

  const openingDoBChangeRequest = profileData?.me?.profileChangeRequests?.requests?.find(
    x => x?.type === UserDetailChangeRequestType.DateOfBirth
  );

  const currentUser = profileData?.me?.details;

  const { dateOfBirth, firstName, lastName, middleName, phoneNumber, residentialAddress } = currentUser ?? {
    dateOfBirth: '',
    phoneNumber: undefined,
    firstName: '',
    lastName: '',
    middleName: undefined,
  };
  const { countryCode, number } = phoneNumber ?? {
    countryCode: '',
    number: '',
  };

  // support both old & new version of address
  const formattedAddress = residentialAddress?.streetName
    ? formatAddressDisplayV2(residentialAddress)
    : formatAddressDisplay(residentialAddress);

  useEffect(() => {
    if (!finishFraudCheck) {
      openEbenPasscode(
        true,
        () => {
          haveOpenedPasscode = true;
          setFinishFraudCheck(true);
        },
        onExitPasscode
      );
    }
  }, [finishFraudCheck]);

  const submitChanges = async (data: Partial<UpdateWalletProfileInput>) => {
    await mutateAsync({ input: data });
  };

  const openWaitingScreen = (isNameChanged?: boolean) =>
    navigation.navigate('Waiting', {
      isNameChanged,
      onBack: () => {
        navigation.pop(1);
      },
    });

  const editName = () => {
    if (openingNameChangeRequest) {
      openWaitingScreen(true);
    } else {
      navigation.navigate('EditName', {
        name: {
          firstName: firstName ?? '',
          lastName: lastName ?? '',
          middleName: middleName ?? '',
        },
        updateCallback: data => {
          submitChanges({ name: data }).then(() => {
            queryClient.invalidateQueries(useGetMoneyProfileQuery.getKey());
          });
        },
        navigationTo: {
          screen: 'Waiting',
          params: {
            isNameChanged: true,
            onBack: () => {
              navigation.pop(2);
            },
          },
        },
        pageTitle: 'Your name',
        topBarTitle: 'Edit',
      });
    }
  };

  const editDateOfBirth = () => {
    if (openingDoBChangeRequest) {
      openWaitingScreen();
    } else {
      navigation.navigate('EditDoB', {
        dateOfBirth: dateOfBirth ?? '',
        updateCallback: data => {
          submitChanges({ dateOfBirth: data }).then(() => {
            queryClient.invalidateQueries(useGetMoneyProfileQuery.getKey());
          });
        },
        navigationTo: {
          screen: 'Waiting',
          params: {
            onBack: () => {
              navigation.pop(2);
            },
          },
        },
        pageTitle: 'Your birthday',
        topBarTitle: 'Edit',
      });
    }
  };

  const editPhoneNumber = () => {
    navigation.navigate('EditPhoneNumber', {
      phoneNumber: phoneNumber || null,
      updateCallback: async data => {
        try {
          // Remove the country name from country code
          const newMobileNumber = {
            ...data,
            countryCode: filterDialCodeFromMobileCountryCode(data.countryCode),
          };
          await submitChanges({ phoneNumber: newMobileNumber });
          navigation.goBack();
        } catch (e) {
          if (e instanceof Error) {
            if (e.message?.includes('There is already another customer using the desired phone number')) {
              navigation.navigate('PhoneNumberDuplicated', {
                onBack: () => {
                  navigation.pop(2);
                },
              });
            } else {
              navigation.navigate('SomethingWentWrong', {
                onBack: () => {
                  navigation.pop(2);
                },
              });
            }
          }
        }
      },
      goBack: navigation.goBack,
    });
  };

  const editResidentialAddress = () => {
    navigation.navigate('ResidentialAddress', {
      residentialAddress: residentialAddress as ResidentialAddress,
      updateCallback: async (payload: ResidentialAddress) => {
        try {
          await submitChanges({
            residentialAddress: {
              country: 'AUS',
              postcode: payload.postcode,
              region: payload.region,
              streetName: payload.streetName,
              streetNumber: payload.streetNumber,
              streetType: payload.streetType,
              townOrCity: payload.townOrCity,
              unitNumber: payload.unitNumber,
              addressLine1: payload.longForm,
            },
          }).then(() => {
            queryClient.invalidateQueries(useGetMoneyProfileQuery.getKey());
          });
          navigation.goBack();
        } catch (e) {
          navigation.navigate('SomethingWentWrong', {
            onBack: () => {
              navigation.pop(2);
            },
          });
        }
      },
      onBack: navigation.goBack,
    });
  };

  const listData: Array<InfoItem> = isLoading
    ? []
    : [
        {
          title: 'Full name',
          subTitle: middleName ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`,
          onPress: editName,
          warning: !!openingNameChangeRequest,
          testID: 'fullName',
        },
        {
          title: 'Mobile number',
          subTitle: joinPhoneNumberParts(number, countryCode),
          onPress: editPhoneNumber,
          testID: 'phoneNumber',
        },
        {
          title: 'Residential address',
          subTitle: formattedAddress,
          onPress: editResidentialAddress,
          testID: 'address',
        },
        {
          title: 'Birthday',
          subTitle: formatStringToDate(dateOfBirth ?? '', 'YYYY-MM-DD', 'DD MMM YYYY'),
          onPress: editDateOfBirth,
          warning: !!openingDoBChangeRequest,
          testID: 'birthday',
        },
      ];

  const renderItem: ListRenderItem<InfoItem> = itemData => {
    const { onPress, subTitle, testID, title, warning } = itemData.item;

    return (
      <List.Item
        variant="card"
        style={{ marginBottom: space.medium }}
        title={title}
        subtitle={subTitle}
        onPress={onPress}
        prefix={warning ? <Icon icon="warning" intent="warning" size="small" /> : undefined}
        suffix={
          warning ? (
            <Icon icon="edit-template-outlined" intent="disabled-text" size="small" />
          ) : (
            'edit-template-outlined'
          )
        }
        testID={testID}
      />
    );
  };

  if (!finishFraudCheck) {
    return null;
  }

  return (
    <FlatList
      data={listData}
      keyExtractor={e => e.title}
      style={{ flex: 1, paddingHorizontal: space.medium }}
      contentContainerStyle={{ paddingBottom: bottomInset, flex: 1 }}
      renderItem={renderItem}
      ListEmptyComponent={() => (
        <Box style={{ height: 150 }}>
          <Spinner testID="spinner" />
        </Box>
      )}
    />
  );
};
