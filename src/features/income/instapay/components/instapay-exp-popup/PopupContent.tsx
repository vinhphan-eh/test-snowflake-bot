import React from 'react';
import { Dimensions, Image } from 'react-native';
import type { CaptionedContentCard } from '@braze/react-native-sdk';
import { Box, useTheme, Typography, Button } from '@hero-design/rn';
import { useIntl } from '../../../../../providers/LocalisationProvider';

const { width } = Dimensions.get('window');
// from figma
const DEFAULT_ASPECT_RATIO = 1.62;

type ContentProps = {
  brazeCard: CaptionedContentCard;
  onPress: () => void;
};

export const PopupContent = ({ brazeCard, onPress }: ContentProps) => {
  const { space } = useTheme();
  const Intl = useIntl();

  const {
    extras: { actionText = '' } = { actionText: Intl.formatMessage({ id: 'common.learnMore' }) },
    image = '',
    imageAspectRatio = 0,
    title = '',
  } = brazeCard ?? {};
  const imageWith = width - space.medium * 2;
  const imageHeight = imageWith / (imageAspectRatio || DEFAULT_ASPECT_RATIO);

  if (!brazeCard) {
    return null;
  }

  return (
    <Box marginHorizontal="medium">
      {image ? (
        <Image testID="braze-image" style={{ width: imageWith, height: imageHeight }} source={{ uri: image }} />
      ) : null}
      <Typography.Title
        accessibilityLabel={title}
        style={{ marginLeft: space.small, marginTop: space.medium }}
        level="h4"
        typeface="playful"
      >
        {title}
      </Typography.Title>
      <Button accessibilityLabel={actionText} style={{ marginTop: space.medium }} onPress={onPress} text={actionText} />
    </Box>
  );
};
