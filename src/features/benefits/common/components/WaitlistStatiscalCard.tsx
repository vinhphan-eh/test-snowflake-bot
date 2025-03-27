import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Typography, useTheme } from '@hero-design/rn';

const screenWidth = Dimensions.get('screen').width;

type WaitlistStatiscalCardProps = {
  title: string;
  description: string;
  testID?: string;
};

export const WaitlistStatiscalCard = ({ description, testID, title }: WaitlistStatiscalCardProps) => {
  const { colors, radii, space } = useTheme();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.defaultGlobalSurface,
        borderRadius: radii.xlarge,
        padding: space.smallMedium,
        width: screenWidth * (157 / 390),
      }}
      testID={testID}
    >
      <Typography.Body variant="regular-bold" typeface="playful">
        {title}
      </Typography.Body>
      <Typography.Caption intent="archived">{description}</Typography.Caption>
    </TouchableOpacity>
  );
};
