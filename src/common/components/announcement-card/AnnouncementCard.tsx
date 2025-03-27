import React from 'react';
import type { ImageSourcePropType } from 'react-native';
import type { Theme } from '@hero-design/rn';
import { Box, Image, Typography, useTheme } from '@hero-design/rn';

type AnnouncementCardProps = {
  image: ImageSourcePropType;
  title: string;
  description?: string;
  subtitle?: string;
  accessibilityLabel?: string;
  backgroundColor?: keyof Theme['colors'];
};

export const AnnouncementCard = ({
  accessibilityLabel,
  backgroundColor = 'defaultGlobalSurface',
  description,
  image,
  subtitle,
  title,
}: AnnouncementCardProps) => {
  const { space } = useTheme();

  return (
    <Box borderRadius="xlarge" style={{ overflow: 'hidden' }} accessibilityLabel={accessibilityLabel}>
      <Box
        style={{
          height: 250,
        }}
      >
        <Image
          source={image}
          resizeMode="cover"
          style={{
            position: 'absolute',
            width: '100%',
            top: 0,
            height: '200%',
          }}
        />
      </Box>
      <Box
        backgroundColor={backgroundColor}
        padding="medium"
        borderTopLeftRadius="xxxlarge"
        borderTopRightRadius="xxxlarge"
        // Trick to make content box lay on advertise image
        style={{ marginTop: -space.large }}
      >
        <Typography.Title level="h3" typeface="playful" style={{ textAlign: 'center' }}>
          {title}
        </Typography.Title>
        <Typography.Body variant="regular" typeface="playful" style={{ marginTop: space.large }}>
          {description}
        </Typography.Body>
        <Typography.Body variant="small" style={{ marginTop: space.medium }}>
          {subtitle}
        </Typography.Body>
      </Box>
    </Box>
  );
};
