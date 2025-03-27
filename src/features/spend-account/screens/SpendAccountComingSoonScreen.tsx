import React from 'react';
import { ScrollView } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../../common/assets/images';
import { AnnouncementCard } from '../../../common/components/announcement-card';
import { InlineTextLink } from '../../../common/components/inline-text-link';
import { useInAppBrowser } from '../../../common/shared-hooks/useInAppBrowser';
import { MONEY_FAQ_LINK } from '../../support/constants/supportLinks';

export const SpendAccountComingSoonScreen = ({ openCountrySelector }: { openCountrySelector: () => void }) => {
  const { space } = useTheme();
  const { openUrl } = useInAppBrowser();
  const { bottom: bottomInset } = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: bottomInset > 0 ? bottomInset : space.medium }}
    >
      <Box marginHorizontal="medium" marginTop="medium" testID="coming soon">
        <AnnouncementCard
          accessibilityLabel="Swag Spend account is coming soon"
          title="Swag Spend account is coming soon!"
          description="These features are under construction for your region."
          subtitle="Get your own stylish Swag Visa debit card. Pay anyone instantly using bank transfer. Receive up to 25% savings with our Cashback offers."
          image={images.walletComingSoonCard}
        />
        <Box marginTop="large">
          <Typography.Body variant="regular" style={{ textAlign: 'center' }}>
            For more information, please{' '}
            <InlineTextLink
              variant="regular"
              onPress={() => openUrl(MONEY_FAQ_LINK)}
              accessibilityLabel="visit our FAQs"
            >
              visit our FAQs
            </InlineTextLink>
            .
          </Typography.Body>
        </Box>
        <Box marginTop="large" flexDirection="row" justifyContent="center">
          <Typography.Body variant="regular">Incorrect region? </Typography.Body>
          <Typography.Body variant="regular">
            <InlineTextLink variant="regular" onPress={openCountrySelector} accessibilityLabel="Update your region">
              Update your region.
            </InlineTextLink>
          </Typography.Body>
        </Box>
      </Box>
    </ScrollView>
  );
};
