import React from 'react';
import { Box, Button, Image, Typography, useTheme } from '@hero-design/rn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../../../common/assets/images';
import {
  useWalletOnboardingConsumer,
  WalletOnboardingConsumerType,
} from '../../../../common/hooks/useWalletOnboardingConsumer';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { navigateToBenefitsTopTabs, navigateToTopTabs } from '../../../../navigation/rootNavigation';
import { useCheckIsOnboardingStore } from '../../../spend-account/stores/useCheckIsOnboardingStore';
import { useIntl } from '../../../../providers/LocalisationProvider';

const SETUP_WALLET_EVENT = 'setupwallet';

export const CardSetupCompleteScreen = () => {
  const { space } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const { clearConsumer, consumer } = useWalletOnboardingConsumer();
  const handleFeedbackPrompt = useSessionStore(state => state.handleFeedbackPrompt);
  const { setIsInOboardingFlow } = useCheckIsOnboardingStore();
  const { formatMessage } = useIntl();

  const onNext = () => {
    handleFeedbackPrompt?.(SETUP_WALLET_EVENT);

    if (consumer === WalletOnboardingConsumerType.Cashback) {
      navigateToBenefitsTopTabs();
      clearConsumer();
    } else {
      setIsInOboardingFlow(false);
      navigateToTopTabs('spend-tab');
    }
  };

  return (
    <Box flex={1} backgroundColor="decorativePrimarySurface">
      <Image
        source={images.swagSetupSuccessMask}
        resizeMode="cover"
        style={{ position: 'absolute', top: 0, height: '100%', width: '100%', zIndex: 0 }}
      />
      <Box flex={1} padding="medium" style={{ paddingBottom: bottom + space.medium }}>
        <Box flex={1} flexDirection="column" justifyContent="center">
          <Box marginTop="xxxxlarge" marginBottom="medium">
            <Typography.Title level="h1" typeface="playful">
              Hooray!
            </Typography.Title>
          </Box>
          <Typography.Body variant="regular">Your Swag Spend account is ready to go!</Typography.Body>
        </Box>
        <Button
          text={
            consumer === WalletOnboardingConsumerType.Cashback
              ? formatMessage({ id: 'benefits.cardSetUp.goToPerks' })
              : formatMessage({ id: 'common.done' })
          }
          testID="hooray-wallet-btn"
          onPress={onNext}
        />
      </Box>
    </Box>
  );
};
