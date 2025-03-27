import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DataCard } from '../../../../common/components/data-card';
import { Page } from '../../../../common/components/layout/page';
import { OverlayLoadingScreen } from '../../../../common/components/spinner';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { queryClient } from '../../../../common/libs/queryClient';
import { formatAddressDisplay } from '../../../../common/utils/address';
import {
  useGetCurrentCardDetailsQuery,
  useGetCurrentUserQuery,
  useRequestNewCardMutation,
  useUpdateCardPinMutation,
  useUpdateMailingAddressMutation,
} from '../../../../new-graphql/generated';
import type { RequestNewCardScreenNavigationProp } from '../navigation/navigationTypes';
import { useRequestNewCardStore } from '../stores/useRequestNewCardStore';

const defaultValue = {
  longForm: '',
  country: 'AUS',
  postcode: '',
  region: '',
  townOrCity: '',
};

export const ConfirmMailingAddressScreen = () => {
  const { data: userData } = useGetCurrentUserQuery();
  const { mailingAddress } = userData?.me?.details ?? {};
  const [address, setAddress] = useState(mailingAddress ?? defaultValue);
  const setShowCardActivationAlert = useRequestNewCardStore(state => state.setShowCardActivationAlert);
  const setShowResetPinAlert = useRequestNewCardStore(state => state.setShowResetPinAlert);

  const { bottom: bottomInset } = useSafeAreaInsets();
  const navigation = useNavigation<RequestNewCardScreenNavigationProp<'ConfirmMailingAddress'>>();
  const { isLoading: isMutatingAddress, mutateAsync: addressMutateAsync } = useUpdateMailingAddressMutation();
  const { isLoading: isRequestingNewCard, mutateAsync: requestNewCardMutateAsync } = useRequestNewCardMutation();
  const updatePin = useUpdateCardPinMutation();

  const haveEditAddress = useRef(false);

  const { country } = address;
  const isLoading = isRequestingNewCard || isMutatingAddress;

  useEffect(() => {
    // this handles when mailingAddress is not in react-query cache, expire cacheTime
    // mailingAddress staleTime is 0, it will refetch, but useState is not subcribed to that fresh value
    // so the default value of address not correct, but 99% it's correct
    setAddress(mailingAddress ?? defaultValue);
  }, [mailingAddress]);

  const onGoBack = () => {
    navigation.goBack();
  };

  const onEditAddress = () => {
    navigation.navigate('CardSetupStack', {
      screen: 'MailingAddressEdit',
      params: {
        mailingAddress: address,
        updateCallback: data => {
          haveEditAddress.current = true;
          setAddress({
            ...data,
            longForm: data.longForm ?? '',
            postcode: data.postcode ?? '',
            townOrCity: data.townOrCity ?? '',
            region: data.region ?? '',
            country: country ?? 'AUS',
          });
        },
      },
    });
  };

  const updateCardPin = (pin: string) => {
    // TODO: investigate how to test this
    return updatePin
      .mutateAsync({ cardPIN: pin })
      .then(() => {
        setShowResetPinAlert(false);
        navigation.navigate('RequestNewCardSuccess');
      })
      .catch(() => {
        setShowResetPinAlert(true);
        navigation.navigate('SetPinError');
      });
  };

  const requestNewCard = () => {
    const { longForm, postcode, region, townOrCity } = address;
    const addressToSend = {
      country,
      postcode,
      region,
      townOrCity,
      longForm,
    };

    requestNewCardMutateAsync({
      address: { address: addressToSend },
    })
      .then(() => {
        setShowCardActivationAlert(true);
        queryClient.invalidateQueries(useGetCurrentCardDetailsQuery.getKey());
        navigation.navigate('PinSetupStack', {
          screen: 'ChoosePin',
          params: {
            header: 'Damaged, lost or stolen card',
            title: 'Choose a PIN for your new card.',
            repeatedPinScreen: {
              header: 'Damaged, lost or stolen card',
              title: 'Repeat your PIN.',
              onPinVerifiedSuccess: (pin, setLoading) => {
                setLoading(true);
                updateCardPin(pin).finally(() => setLoading(false));
              },
            },
          },
        });
      })
      .catch(() => {
        navigation.navigate('RequestNewCardError');
      });
  };

  const onConfirm = () => {
    if (haveEditAddress.current) {
      addressMutateAsync({ input: address }).then(() => {
        queryClient.invalidateQueries(useGetCurrentUserQuery.getKey());
      });
    }
    requestNewCard();
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar onBack={onGoBack} title="Damaged, lost or stolen card" hideRight />
      <Page style={{ paddingBottom: bottomInset }}>
        <Page.Title>Your new card will be sent to this address:</Page.Title>
        <Page.Body>
          <DataCard
            accessibilityLabel="Edit address"
            data={[
              {
                label: 'Mailing address',
                content: formatAddressDisplay(address),
              },
            ]}
            onPress={onEditAddress}
          />
        </Page.Body>
        <Page.Footer>
          <Button text="Order card" accessibilityLabel="Order card" onPress={onConfirm} />
        </Page.Footer>
      </Page>
      {isLoading && <OverlayLoadingScreen />}
    </>
  );
};
