import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import type { BoxProps } from '@hero-design/rn/types/components/Box';

type BoxData = {
  title: string;
  value: string;
  boxStyle?: BoxProps;
};

type PriceBoxProps = {
  firstBox: BoxData;
  secondBox: BoxData;
  thirdBox: BoxData;
  style?: StyleProp<ViewStyle>;
};

// TODO: Remove this component once hero points migration is complete
export const PriceBox = ({ firstBox, secondBox, style = {}, thirdBox }: PriceBoxProps) => {
  const { space } = useTheme();

  const renderPriceItem = (title: string, value: string, boxStyle: BoxProps) => {
    return (
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        borderRadius="xlarge"
        paddingVertical="medium"
        {...boxStyle}
      >
        <Typography.Body variant="small" typeface="playful">
          {title}
        </Typography.Body>
        <Typography.Body
          typeface="playful"
          accessibilityLabel="Original price"
          style={{ marginTop: space.small }}
          variant="regular-bold"
        >
          {value}
        </Typography.Body>
      </Box>
    );
  };

  return (
    <Box style={style} flexDirection="row">
      {renderPriceItem(firstBox.title, firstBox.value, {
        borderColor: 'decorativePrimarySurface',
        borderWidth: 'base',
        paddingRight: 'medium',
        ...firstBox.boxStyle,
      })}
      {renderPriceItem(secondBox.title, secondBox.value, {
        backgroundColor: 'decorativePrimarySurface',
        paddingRight: 'large',
        style: {
          marginLeft: -space.xxlarge,
        },
        ...secondBox.boxStyle,
      })}
      {renderPriceItem(thirdBox.title, thirdBox.value, {
        style: {
          marginLeft: -space.xxlarge,
        },
        backgroundColor: 'decorativePrimary',
        ...thirdBox.boxStyle,
      })}
    </Box>
  );
};
