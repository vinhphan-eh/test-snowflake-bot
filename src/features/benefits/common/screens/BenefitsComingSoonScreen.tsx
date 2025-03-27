import React from 'react';
import { ScrollView } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../../../common/assets/images';
import { AnnouncementCard } from '../../../../common/components/announcement-card';
import { InlineTextLink } from '../../../../common/components/inline-text-link';
import { useInAppBrowser } from '../../../../common/shared-hooks/useInAppBrowser';
import { BENEFITS_CASHBACK_FAQ_LINK } from '../../../support/constants/supportLinks';
import useBrandName from '../../../../common/hooks/useBrandName';
import useStoreName from '../../../../common/hooks/useStoreName';
import { useIntl } from '../../../../providers/LocalisationProvider';

interface BenefitsComingSoonScreenProps {
  openCountrySelector: () => void;
}

export const BenefitsComingSoonScreen = ({ openCountrySelector }: BenefitsComingSoonScreenProps) => {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { openUrl } = useInAppBrowser();
  const { space } = useTheme();
  const brandName = useBrandName();
  const storeName = useStoreName();
  const { formatMessage } = useIntl();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: bottomInset > 0 ? bottomInset : space.medium }}
    >
      <Box marginHorizontal="medium" marginTop="medium" testID="coming soon">
        <AnnouncementCard
          accessibilityLabel={`${brandName} Benefits are coming soon`}
          title={formatMessage(
            {
              id: 'benefits.comingSoon.title',
            },
            {
              brandName,
            }
          )}
          description={formatMessage({ id: 'benefits.comingSoon.description' })}
          subtitle={formatMessage({ id: 'benefits.comingSoon.subtitle' }, { storeName })}
          image={images.benefitsComingSoonCard}
          backgroundColor="decorativePrimarySurface"
        />
        <Box marginTop="large">
          <Typography.Body variant="regular" style={{ textAlign: 'center' }}>
            For more information, please{' '}
            <InlineTextLink
              variant="regular"
              onPress={() => openUrl(BENEFITS_CASHBACK_FAQ_LINK)}
              accessibilityLabel="visit our FAQs"
            >
              visit our FAQs
            </InlineTextLink>
            .
          </Typography.Body>
        </Box>
        <Box marginTop="large" flexDirection="row" justifyContent="center">
          <Typography.Body variant="regular" style={{ textAlign: 'center' }}>
            Incorrect region?{' '}
          </Typography.Body>
          <InlineTextLink variant="regular" onPress={openCountrySelector} accessibilityLabel="Update your region.">
            Update your region.
          </InlineTextLink>
        </Box>
      </Box>
    </ScrollView>
  );
};
