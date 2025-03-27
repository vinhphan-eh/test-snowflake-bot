import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, Image, Typography, useTheme } from '@hero-design/rn';
import images from '../../../../common/assets/images';

type OvalCheckInfoRowProps = {
  text: string;
  style?: StyleProp<ViewStyle>;
};

export const OvalCheckInfoRow = ({ style = {}, text }: OvalCheckInfoRowProps) => {
  const { space } = useTheme();
  return (
    <Box
      borderRadius="xlarge"
      style={style}
      backgroundColor="defaultGlobalSurface"
      flexDirection="row"
      alignItems="center"
      padding="small"
    >
      <Image
        resizeMode="contain"
        style={{ marginRight: space.medium, width: space.large, height: space.large }}
        source={images.icGreenCheckOval}
      />
      <Typography.Body style={{ flexShrink: 1 }} variant="small-bold" typeface="playful">
        {text}
      </Typography.Body>
    </Box>
  );
};
