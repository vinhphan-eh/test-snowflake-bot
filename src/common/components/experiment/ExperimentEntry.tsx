import React from 'react';
import { Pressable, Image } from 'react-native';
import { Typography, useTheme, Box, Icon } from '@hero-design/rn';
import images from '../../assets/images';

export type ExperimentEntryProps = {
  style?: object;
  thumbnailName: keyof typeof images;
  title: string;
  description: string;
  onPress: () => void;
  testID?: string;
  showArrow?: boolean;
  backgroundColor?: string;
};

export const ExperimentEntry = ({
  backgroundColor,
  description,
  onPress,
  showArrow = true,
  style,
  testID,
  thumbnailName,
  title,
}: ExperimentEntryProps) => {
  const { colors, radii, space } = useTheme();
  const unPressedBackgroundColor = backgroundColor ?? colors.defaultGlobalSurface;
  return (
    <Pressable
      style={({ pressed }) => [
        {
          borderRadius: radii.xlarge,
          backgroundColor: pressed ? colors.decorativePrimarySurface : unPressedBackgroundColor,
          padding: space.small,
        },
        style,
      ]}
      testID={testID}
      onPress={onPress}
    >
      <Box display="flex" flexDirection="row" alignItems="center">
        <Image source={images[thumbnailName]} resizeMode="contain" />
        <Box paddingLeft="smallMedium" flex={1} paddingRight="small">
          <Typography.Body typeface="playful" variant="small-bold" style={{ marginBottom: space.small }}>
            {title}
          </Typography.Body>
          <Typography.Caption intent="subdued">{description}</Typography.Caption>
        </Box>
        {showArrow && (
          <Box marginLeft="xsmall">
            <Icon icon="arrow-right" intent="primary" />
          </Box>
        )}
      </Box>
    </Pressable>
  );
};
