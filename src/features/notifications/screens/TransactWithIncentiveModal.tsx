import React from 'react';
import { Image, Platform } from 'react-native';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../../common/assets/images';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { navigateToTopTabs } from '../../../navigation/rootNavigation';

export const TransactWithIncentiveModal = () => {
  const { colors, space } = useTheme();
  const { bottom: bottomInset } = useSafeAreaInsets();

  const goToWallet = () => navigateToTopTabs('spend-tab');

  return (
    <Box flex={1} backgroundColor="decorativePrimary" style={{ paddingBottom: bottomInset }}>
      <CustomStatusBar backgroundColor={colors.decorativePrimary} />
      <Image
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
        }}
        source={images.googleApplePayIncentiveDecoration}
      />
      <Box paddingHorizontal="medium" flex={1} paddingBottom="medium">
        <Box alignItems="flex-end" paddingTop="medium" paddingRight="small">
          <Button.Icon icon="cancel" onPress={goToWallet} size="xsmall" intent="text" testID="Close" />
        </Box>
        <Box flex={1} alignItems="center" marginBottom="xlarge">
          {Platform.OS === 'ios' ? (
            <Image
              resizeMode="contain"
              accessibilityLabel="Apple Pay Phone"
              style={{ flex: 1 }}
              source={images.applePayPhone}
            />
          ) : (
            <Image
              resizeMode="contain"
              accessibilityLabel="Google Pay Phone"
              style={{ flex: 1 }}
              source={images.googlePayPhone}
            />
          )}
        </Box>
        <Box>
          <Typography.Title level="h1" typeface="playful" style={{ marginBottom: space.medium }}>
            Tap with {Platform.OS === 'ios' ? 'Apple Pay' : 'Google Pay'} to get $10 on us
          </Typography.Title>
          <Typography.Body variant="regular" style={{ marginBottom: space.medium }}>
            Use {Platform.OS === 'ios' ? 'Apple Pay' : 'Google Pay'} to make a contactless payment in-store or online
            within the next 14 days and we&apos;ll credit $10 to your Swag Visa Debit card for you to spend.
          </Typography.Body>
          <Button testID="Get started" text="Get started" onPress={goToWallet} style={{ marginTop: space.xxxxlarge }} />
        </Box>
      </Box>
    </Box>
  );
};
