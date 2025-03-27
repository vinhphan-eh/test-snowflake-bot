import React, { useEffect, useState } from 'react';
import { Box, Button } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQueryClient } from 'react-query';
import { DataCard } from '../../../../common/components/data-card';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../../common/components/touch-dismiss-keyboard';
import { formatUKAddressDisplay } from '../../../../common/utils/address';
import { getEnvConfig } from '../../../../common/utils/env';
import {
  useCreateUkCardMutation,
  useGetCurrentUserQuery,
  type UniversalAddressInput,
} from '../../../../new-graphql/generated';
import { useGetWeavrAccessToken } from '../../../onboarding/hooks/useGetWeavrAccessToken';
import type { CardSetupScreenNavigationProp } from '../navigation/navigationTypes';

export const UkBillingAddressScreen = () => {
  const navigation = useNavigation<CardSetupScreenNavigationProp<'UkBillingAddress'>>();
  const { data: userData } = useGetCurrentUserQuery();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const mailingAddress = userData?.me?.details?.mailingAddress;
  const [billingAddress, setBillingAddress] = useState<UniversalAddressInput | null>({
    addressLine1: mailingAddress?.longForm ?? '',
    country: 'GB',
    postcode: mailingAddress?.postcode ?? '',
    townOrCity: mailingAddress?.townOrCity ?? '',
  });
  const { accessToken, error, isLoading, startBiometricLogin } = useGetWeavrAccessToken();
  const createUKCard = useCreateUkCardMutation();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (accessToken) {
      if (billingAddress) {
        createUKCard
          .mutateAsync({ accessToken, input: { billingAddress } })
          .then(() => {
            queryClient.invalidateQueries(['GetEWalletUKAccountDetails']);
            navigation.navigate('CardSetupComplete');
          })
          .catch(() => {
            navigation.navigate('Error', { resetCardPin: false });
          });
      }
    }

    if (error) {
      navigation.navigate('Error', { resetCardPin: false });
    }
  }, [accessToken, error]);

  const editAddress = () => {
    navigation.navigate('UkBillingAddressEdit', {
      address: {
        ...billingAddress,
      },
      updateCallback: data => {
        setBillingAddress({
          ...data,
          country: 'GB',
          addressLine1: data?.addressLine1 ?? '',
          postcode: data.postcode ?? '',
          region: data.region ?? undefined,
          state: data.state ?? undefined,
          townOrCity: data.townOrCity ?? '',
        });
      },
    });
  };

  const createUKDebitCard = async () => {
    if (
      !billingAddress?.addressLine1?.length &&
      !billingAddress?.postcode.length &&
      !billingAddress?.townOrCity.length
    ) {
      return;
    }

    if (getEnvConfig().ENV === 'production' || userData?.me?.details?.middleName?.toLowerCase() !== 'sms') {
      await startBiometricLogin();
    }
  };

  const onHeaderBack = () => {
    navigation.goBack();
  };

  return (
    <TouchOutsideDismissKeyboard>
      <>
        <CustomStatusBar />
        <Page.TopBar hideRight onBack={onHeaderBack} title="Card set-up" />
        <Page keyboardShouldPersistTaps="always" style={{ paddingBottom: bottomInset }}>
          <Page.Title>Should we use this billing address for your debit card?</Page.Title>
          <Page.Body marginBottom="xlarge">
            <Box marginTop="large">
              <DataCard
                data={[
                  {
                    label: 'Billing address',
                    content: formatUKAddressDisplay(billingAddress),
                  },
                ]}
                onPress={editAddress}
                accessibilityLabel="Edit billing address"
              />
            </Box>
          </Page.Body>
          <Page.Footer>
            <Button
              text="Next"
              accessibilityLabel="Next"
              onPress={() => {
                createUKDebitCard();
              }}
              loading={isLoading || createUKCard.isLoading}
            />
          </Page.Footer>
        </Page>
      </>
    </TouchOutsideDismissKeyboard>
  );
};
