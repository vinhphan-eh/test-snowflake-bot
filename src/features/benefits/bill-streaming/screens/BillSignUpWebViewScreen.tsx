import React, { useState } from 'react';
import { Box, FAB, useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { Page } from '../../../../common/components/layout/page';
import { OverlayLoadingScreen } from '../../../../common/components/spinner';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { queryClient } from '../../../../common/libs/queryClient';
import { useToast } from '../../../../common/shared-hooks/useToast';
import { getEnvConfig } from '../../../../common/utils/env';
import { Pid, useBmSubmitSubscriptionMutation, useGetSubscriptionsQuery } from '../../../../new-graphql/generated';
import { useRegionLocalisation } from '../../../../providers/LocalisationProvider';
import { useBillPromotionPermission } from '../hooks/useBillPromotionPermission';
import type { BillStreamNavigationProp, BillStreamRouteProp } from '../navigation/navigationTypes';

const FINAL_STEP_ENDPOINT = 'checkout/thankyou';

export const BillSignUpWebViewScreen = () => {
  const { space } = useTheme();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const Toast = useToast();
  const {
    params: { headers, onBackToBill, title, url },
  } = useRoute<BillStreamRouteProp<'BillSignUpWebView'>>();

  const [isLoading, setIsLoading] = useState(true);
  const { mutateAsync: submitSubscriptionAsync } = useBmSubmitSubscriptionMutation();
  const [showFab, setShowFab] = useState(false);
  const { formatMessage } = useRegionLocalisation();
  const navigation = useNavigation<BillStreamNavigationProp<'BillSignUpWebView'>>();
  const { havingPermission: isPromotion } = useBillPromotionPermission();

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar
        onBack={navigation.goBack}
        title={title || formatMessage({ id: 'benefits.bill.signUpTitle' })}
        hideRight
      />
      <Box backgroundColor="defaultGlobalSurface" style={{ paddingBottom: bottomInset }} flex={1}>
        <WebView
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={async ({ nativeEvent }) => {
            // onNavigationStateChange triggered twice when url change: https://github.com/react-native-webview/react-native-webview/issues/1584
            // this event is triggered when start to load and end to load
            // our logic runs at onEnd
            setIsLoading(false);
            if (nativeEvent.url.includes(FINAL_STEP_ENDPOINT)) {
              // call create subscription & show fab
              try {
                // SUBMITTED -> PENDING -> APPROVED
                // create subscription (SUBMITTED)
                // simple energy returns subscription to server -> BE will map to subscription status PENDING
                // TODO: check FINAL_STEP_ENDPOINT if it's the same for edit subscription/ create subscription with same email
                await submitSubscriptionAsync({
                  input: {
                    providerId: Pid.SimplyEnergy,
                    isHPPromoEligible: isPromotion,
                  },
                });
                // TODO: need to test
                queryClient.invalidateQueries(useGetSubscriptionsQuery.getKey());

                setShowFab(true);
              } catch {
                Toast.show({
                  content: 'Failed to create subscription.',
                });
              }
            }
          }}
          basicAuthCredential={
            getEnvConfig().ENV === 'dev'
              ? {
                  username: 'sunrise_test',
                  password: 'Sn!ff$C0nf!d3nc3',
                }
              : undefined
          }
          source={{ uri: url, headers }}
          style={{ flex: 1 }}
        />
        {isLoading && <OverlayLoadingScreen />}
        {showFab && (
          <FAB
            title="Back to Bill"
            icon="arrow-leftwards"
            onPress={() => {
              onBackToBill();
            }}
            style={{
              position: 'absolute',
              bottom: space.large + bottomInset,
              right: space.medium,
            }}
          />
        )}
      </Box>
    </>
  );
};
