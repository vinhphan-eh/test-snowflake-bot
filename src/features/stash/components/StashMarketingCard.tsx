import React from 'react';
import { Image } from 'react-native';
import { Box, Button, Card, Typography, scale, useTheme } from '@hero-design/rn';
import images from '../../../common/assets/images';

type Props = {
  onContinue: () => void;
};

export const StashMarketingCard = ({ onContinue }: Props) => {
  const { space } = useTheme();

  return (
    <Card style={{ margin: space.medium }}>
      <Image resizeMode="cover" source={images.stashMarketing} style={{ width: '100%', position: 'absolute' }} />
      <Card style={{ marginTop: scale(222), overflow: 'hidden' }}>
        <Box backgroundColor="decorativePrimarySurface" padding="medium">
          <Typography.Title
            level="h3"
            typeface="playful"
            style={{ marginBottom: space.smallMedium, textAlign: 'center' }}
          >
            Make a splash with Swag Stash
          </Typography.Title>
          <Typography.Body variant="small" style={{ marginBottom: space.smallMedium, textAlign: 'center' }}>
            Made to help you budget and put aside money effortlessly.
          </Typography.Body>
          <Button
            variant="outlined"
            intent="secondary"
            accessibilityLabel="Tell me more"
            text="Tell me more"
            onPress={onContinue}
          />
        </Box>
      </Card>
    </Card>
  );
};
