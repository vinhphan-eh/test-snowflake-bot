import React, { useCallback } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import images from '../../../../../../../common/assets/images';
import { useMixpanel } from '../../../../../../../common/hooks/useMixpanel';
import {
  useWalletOnboardingConsumer,
  WalletOnboardingConsumerType,
} from '../../../../../../../common/hooks/useWalletOnboardingConsumer';

import { EventTrackingCategory } from '../../../../../../../common/stores/useSessionStore';
import { useConditionalNavigateOnboardingFlow } from '../../../../../../spend-account/hooks/useConditionalNavigateOnboardingFlow';
import { CASHBACK_MODULE, CLICK_OPEN_A_SPEND_ACCOUNT } from '../../../constants/mixpanel';
import type { CardLinkOffersNavigationProp } from '../../../navigation/navigationType';

export const OpenWallet = () => {
  const navigation = useNavigation<CardLinkOffersNavigationProp<'ManageCashbackDashboard'>>();
  const { isLoading: isLoadingHeroWalletOnboarding, nextScreenNavigateParams } =
    useConditionalNavigateOnboardingFlow()();
  const { setConsumer } = useWalletOnboardingConsumer();
  const { eventTracking } = useMixpanel();

  const goToHeroWalletOnboarding = useCallback(() => {
    eventTracking({
      event: CLICK_OPEN_A_SPEND_ACCOUNT,
      categoryName: EventTrackingCategory.USER_ACTION,
      metaData: {
        module: CASHBACK_MODULE,
      },
    });
    setConsumer(WalletOnboardingConsumerType.Cashback);
    if (nextScreenNavigateParams) {
      navigation.navigate(...nextScreenNavigateParams);
    } else {
      navigation.navigate('OnboardingStack', { screen: 'Dashboard' });
    }
  }, [setConsumer, nextScreenNavigateParams, navigation]);

  const { colors, radii, space } = useTheme();
  if (isLoadingHeroWalletOnboarding) {
    return null;
  }

  return (
    <TouchableOpacity
      accessibilityLabel="open wallet"
      onPress={goToHeroWalletOnboarding}
      style={{
        flex: 1,
        flexDirection: 'row',
        minHeight: 120,
        marginLeft: space.medium,
        borderRadius: radii.xlarge,
        backgroundColor: colors.infoSurface,
        overflow: 'hidden',
      }}
    >
      <ImageBackground source={images.swagOpenAccount} resizeMode="cover" style={{ flex: 1, padding: space.medium }}>
        <Box flex={0.68}>
          <Typography.Body variant="regular-bold">Claim your cashback!</Typography.Body>
          <Typography.Caption style={{ marginTop: space.small }}>Open a Spend account</Typography.Caption>
        </Box>
      </ImageBackground>
    </TouchableOpacity>
  );
};
