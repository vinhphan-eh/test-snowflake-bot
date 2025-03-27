import React from 'react';
import { Button, useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { DataCardItem } from '../../../common/components/data-card';
import { DataCard } from '../../../common/components/data-card';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import useBrandName from '../../../common/hooks/useBrandName';
import { useMixpanel } from '../../../common/hooks/useMixpanel';
import { queryClient } from '../../../common/libs/queryClient';
import {
  useCreateSwagSuperfundMutation,
  useGetSwagSuperfundAndSuperContributionQuery,
} from '../../../new-graphql/generated';
import { CLICK_SUPER_DETAIL_CONFIRM_BUTTON, SUPER_MODULE_NAME } from '../constants/trackingEvents';
import type { SuperScreenNavigationProp, SuperScreenRouteProp } from '../navigation/navigationTypes';

export const SuperDetailConfirmScreen = () => {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const navigation = useNavigation<SuperScreenNavigationProp<'SuperDetailConfirm'>>();
  const route = useRoute<SuperScreenRouteProp<'SuperDetailConfirm'>>();
  const brandName = useBrandName();

  const { eventTracking } = useMixpanel();

  const { isLoading: isSubmittingSwagSuperfund, mutateAsync: createSwagSuperfund } = useCreateSwagSuperfundMutation();

  const { colors } = useTheme();
  const screenTitle = route?.params.title;

  const membership = route?.params.membership;
  const { abn, fundName, fundType, memberNumber, usi } = membership;

  const detailDataCard: DataCardItem[] = [
    {
      label: 'Fund name',
      content: fundName,
    },
    {
      label: 'Member number',
      content: memberNumber,
    },
    {
      label: 'ABN',
      content: abn,
    },
    {
      label: 'USI',
      content: usi,
    },
    {
      label: 'Fund type',
      content: fundType,
    },
  ];

  const onConfirm = async () => {
    eventTracking({
      event: CLICK_SUPER_DETAIL_CONFIRM_BUTTON,
      categoryName: 'user action',
      metaData: {
        module: SUPER_MODULE_NAME,
        fundName,
        memberNumber,
        usi,
        abn,
        fundType,
        trackingAttributes: {
          fundName,
          usi,
          resync: !!route.params.resync,
        },
      },
    });

    try {
      await createSwagSuperfund({
        input: {
          abn,
          fundChoice: fundType,
          fundName,
          memberNumber,
          usi,
        },
      });

      // clear current swag superfund data cache to force query re-fetch current swag superfund
      queryClient.invalidateQueries(useGetSwagSuperfundAndSuperContributionQuery.getKey());
      navigation.navigate('SuperComplete', {
        resync: route?.params.resync,
        trackingAttributes: {
          fundName,
          usi,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        navigation.navigate('SuperConfirmFailed', {
          errorMessage: error.message || `failed to create ${brandName} superfund`,
          trackingAttributes: {
            fundName,
            usi,
            resync: !!route.params.resync,
          },
        });
      }
    }
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar hideRight onBack={navigation.goBack} title={screenTitle} />
      <Page
        keyboardShouldPersistTaps="handled"
        style={{ paddingBottom: bottomInset, backgroundColor: colors.defaultGlobalSurface }}
      >
        <Page.Title>Please confirm your details are correct</Page.Title>
        <Page.Body>
          <DataCard data={detailDataCard} hideIcon disabled />
        </Page.Body>
        <Page.Footer>
          <Button
            loading={isSubmittingSwagSuperfund}
            onPress={onConfirm}
            text="Confirm"
            intent="primary"
            accessibilityLabel="Confirm"
          />
        </Page.Footer>
      </Page>
    </>
  );
};
