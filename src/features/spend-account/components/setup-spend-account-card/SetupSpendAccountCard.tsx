import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Box, Button, Typography, scale, useTheme } from '@hero-design/rn';
import images from '../../../../common/assets/images';
import { useIsWorkzone } from '../../../../common/hooks/useIsWorkzone';
import { WalletSetupStatus } from '../../../../new-graphql/generated';
import { useIntl, useRegionLocalisation } from '../../../../providers/LocalisationProvider';
import { Region } from '../../../../providers/LocalisationProvider/constants';

// #region
const styles = StyleSheet.create({
  root: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 0,
  },
  withFontSize6xLarge: {
    fontSize: scale(36),
    lineHeight: scale(44),
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 2,
    elevation: 5,
  },
});
// #endregion

type Props = {
  onContinue: () => void;
  eWalletSetupStatus: WalletSetupStatus | null | undefined;
};

type FeatureItemProps = {
  children: string;
};

const FeatureItem = ({ children }: FeatureItemProps) => {
  const { space } = useTheme();

  return (
    <Box
      flexDirection="row"
      backgroundColor="defaultGlobalSurface"
      borderRadius="rounded"
      padding="small"
      marginBottom="small"
      alignItems="center"
    >
      <Image source={images.setupSpendAccountCheck} style={{ marginRight: space.small }} />
      <Typography.Body
        variant="small-bold"
        typeface="playful"
        numberOfLines={1}
        adjustsFontSizeToFit
        style={{ flex: 1 }}
      >
        {children}
      </Typography.Body>
    </Box>
  );
};

export const SetupSpendAccountCard = ({ eWalletSetupStatus, onContinue }: Props) => {
  const { space } = useTheme();
  const { currentRegion } = useRegionLocalisation();
  const isWorkzone = useIsWorkzone();
  const { formatMessage } = useIntl();

  const getCTACaption = () => {
    const defaultCTACaption = formatMessage({ id: 'spend-account.onboarding.ctaCaptions.setUpNow' });
    const reviewApplicationCTACaption = formatMessage({
      id: 'spend-account.onboarding.ctaCaptions.reviewApplication',
    });

    switch (currentRegion) {
      case Region.gb:
        switch (eWalletSetupStatus) {
          case WalletSetupStatus.InProgress:
          case WalletSetupStatus.Failed:
            return reviewApplicationCTACaption;
          default:
            return defaultCTACaption;
        }
      default: // AU
        switch (eWalletSetupStatus) {
          case WalletSetupStatus.InProgress:
            return reviewApplicationCTACaption;
          default:
            return defaultCTACaption;
        }
    }
  };

  const renderSpendAccountCard = () => {
    switch (currentRegion) {
      case Region.gb:
        return (
          <Box
            backgroundColor="decorativePrimarySurface"
            borderRadius="large"
            marginBottom="medium"
            style={styles.root}
          >
            <Box padding="medium" style={{ zIndex: 1 }}>
              <Box marginBottom="small">
                <Typography.Title typeface="playful" level="h3" style={styles.withFontSize6xLarge}>
                  Make money moves with a Swag Spend Account
                </Typography.Title>
                <Box alignItems="center" marginVertical="large">
                  <Image resizeMode="contain" source={images.swagMastercardFloating} />
                </Box>
              </Box>

              <Button accessibilityLabel="Set up now" text={getCTACaption()} onPress={onContinue} />
            </Box>
            <Image resizeMode="cover" source={images.swagSetupSpendAccount} style={styles.background} />
          </Box>
        );
      default:
        return (
          <Box marginBottom="medium">
            <Box borderRadius="xxxlarge" style={{ overflow: 'hidden' }}>
              <Image resizeMode="cover" source={images.setupSpendAccountCardBg} style={{ width: '100%' }} />
            </Box>

            <Box
              backgroundColor="decorativePrimarySurface"
              borderRadius="xxxlarge"
              padding="medium"
              style={[{ top: -space.xxxxlarge, elevation: 2 }, styles.shadow]}
            >
              <Typography.Title
                level="h3"
                typeface="playful"
                style={{ textAlign: 'center', marginBottom: space.medium }}
              >
                Make money moves with a Spend account
              </Typography.Title>

              <FeatureItem>Get your own Swag Visa Debit card</FeatureItem>
              {!isWorkzone && <FeatureItem>{formatMessage({ id: 'heroPoints.redeem.onYourCard' })}</FeatureItem>}
              <FeatureItem>Budget better with Stash accounts</FeatureItem>

              <Button
                accessibilityLabel="Set up now"
                text={getCTACaption()}
                onPress={onContinue}
                style={{ marginTop: space.small }}
              />
            </Box>
          </Box>
        );
    }
  };

  return renderSpendAccountCard();
};
