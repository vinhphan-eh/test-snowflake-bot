import React from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Box, Button, Image, Typography, useTheme } from '@hero-design/rn';
import type { HeroDesignColors } from '../../types/hero-design';

interface AdCardProps {
  image: ImageSourcePropType;
  title: string;
  description?: string;
  cta: string;
  onPressCta: () => void;
  /**
   * a11y label to locate this whole component
   */
  accessibilityLabel?: string;
  /**
   * a11y label to locate cta component
   */
  ctaAccessibilityLabel?: string;
  backgroundColor?: HeroDesignColors;
}

export const AdCard = ({
  accessibilityLabel,
  backgroundColor = 'defaultSurface',
  cta,
  ctaAccessibilityLabel,
  description,
  image,
  onPressCta,
  title,
}: AdCardProps) => {
  const { space } = useTheme();

  return (
    <Box borderRadius="xlarge" style={{ overflow: 'hidden' }} accessibilityLabel={accessibilityLabel}>
      <Image source={image} resizeMode="cover" style={{ width: '100%', height: 270 }} />
      <Box
        backgroundColor={backgroundColor}
        padding="medium"
        borderTopLeftRadius="xxxlarge"
        borderTopRightRadius="xxxlarge"
        // Trick to make content box lay on advertise image
        style={{ marginTop: -space.large }}
      >
        <Typography.Title
          style={{ textAlign: 'center', paddingHorizontal: space.medium }}
          typeface="playful"
          level="h3"
        >
          {title}
        </Typography.Title>
        {description && (
          <Typography.Body variant="regular" style={{ textAlign: 'center', marginTop: space.medium }}>
            {description}
          </Typography.Body>
        )}
        <Button
          onPress={onPressCta}
          text={cta}
          style={{ marginTop: space.large }}
          accessibilityLabel={ctaAccessibilityLabel}
        />
      </Box>
    </Box>
  );
};
