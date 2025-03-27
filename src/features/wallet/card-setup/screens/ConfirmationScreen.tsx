import React from 'react';
import { Box, Button } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DataCard } from '../../../../common/components/data-card';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../../common/components/touch-dismiss-keyboard';
import { queryClient } from '../../../../common/libs/queryClient';
import { formatAddressDisplay } from '../../../../common/utils/address';
import { generateUUID } from '../../../../common/utils/numbers';
import {
  useCreateCardMutation,
  useGetCurrentCardDetailsQuery,
  useGetCurrentUserQuery,
  useUpdateMailingAddressMutation,
} from '../../../../new-graphql/generated';
import { useCheckIsOnboardingStore } from '../../../spend-account/stores/useCheckIsOnboardingStore';
import type { CardSetupScreenNavigationProp, CardSetupScreenRouteProp } from '../navigation/navigationTypes';

export const ConfirmationScreen = () => {
  const navigation = useNavigation<CardSetupScreenNavigationProp<'Confirmation'>>();
  const route = useRoute<CardSetupScreenRouteProp<'Confirmation'>>();
  const { isInOnboardingFlow, pin } = route.params;
  const { data: userData } = useGetCurrentUserQuery();
  const createCard = useCreateCardMutation();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const mailingAddress = userData?.me?.details?.mailingAddress;
  const idempotencyKey = generateUUID();
  const updateMailingAddress = useUpdateMailingAddressMutation();
  const { setIsInOboardingFlow } = useCheckIsOnboardingStore();

  const editAddress = () => {
    navigation.navigate('MailingAddressEdit', {
      mailingAddress: {
        longForm: mailingAddress?.longForm ?? '',
        postcode: mailingAddress?.postcode ?? '',
        region: mailingAddress?.region ?? '',
        townOrCity: mailingAddress?.townOrCity ?? '',
      },
      updateCallback: data => {
        updateMailingAddress
          .mutateAsync({
            input: {
              longForm: data.longForm ?? '',
              country: 'AUS',
              postcode: data.postcode ?? '',
              region: data.region ?? '',
              townOrCity: data.townOrCity ?? '',
            },
          })
          .then(() => {
            queryClient.invalidateQueries(useGetCurrentUserQuery.getKey());
          });
      },
    });
  };

  const handleConfirm = () => {
    createCard
      .mutateAsync({ input: { pin, idempotencyKey } })
      .then(() => {
        queryClient.invalidateQueries(useGetCurrentCardDetailsQuery.getKey());
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Success',
              params: { resetCardPin: false },
            },
          ],
        });
        setIsInOboardingFlow(!!isInOnboardingFlow);
      })
      .catch(() => {
        navigation.navigate('Error', { resetCardPin: false, pin });
      });
  };

  const onHeaderBack = () => {
    navigation.navigate('PinSetupStack', {
      screen: 'ChoosePin',
      params: {
        header: 'Card set-up',
        title: 'Choose a secure 4 digit PIN for your card.',
        repeatedPinScreen: {
          header: 'Card set-up',
          title: 'Repeat your PIN.',
          onPinVerifiedSuccess: newPin => {
            navigation.navigate('Confirmation', { pin: newPin });
          },
        },
      },
    });
  };

  return (
    <TouchOutsideDismissKeyboard>
      <>
        <CustomStatusBar />
        <Page.TopBar hideRight onBack={onHeaderBack} title="Card set-up" />
        <Page keyboardShouldPersistTaps="always" style={{ paddingBottom: bottomInset }}>
          <Page.Title>We need to mail your card. Should we send it to this address?</Page.Title>
          <Page.Body marginBottom="xlarge">
            <Box marginTop="large">
              <DataCard
                data={[
                  {
                    label: 'Mailing address',
                    content: formatAddressDisplay(mailingAddress),
                  },
                ]}
                onPress={editAddress}
                accessibilityLabel="Edit mailing address"
              />
            </Box>
          </Page.Body>
          <Page.Footer>
            <Button
              text="Send my card"
              accessibilityLabel="Send my card"
              onPress={handleConfirm}
              loading={createCard.isLoading}
            />
          </Page.Footer>
        </Page>
      </>
    </TouchOutsideDismissKeyboard>
  );
};
