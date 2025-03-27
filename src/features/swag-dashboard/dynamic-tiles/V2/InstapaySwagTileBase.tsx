import React from 'react';
import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity, ImageBackground } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import { InstapaySwagTileSkeleton } from './skeletons/InstapaySwagTileSkeleton';
import { scale } from '../../../../common/utils/layout';

const defaultImgWidth = scale(171, 'width');
const defaultImgHeight = (defaultImgWidth * 144) / 171;

export type InstapaySwagTileBaseProps = {
  imgContent?: React.ReactNode;
  imgWidth?: number;
  imgHeight?: number;
  isLoading: boolean;
  imgSrc?: ImageSourcePropType;
  title: string;
  subTitle?: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  testID?: string;
};

export const InstapaySwagTileBase = ({
  imgContent,
  imgHeight = defaultImgHeight,
  imgSrc,
  imgWidth = defaultImgWidth,
  isLoading,
  onPress,
  style,
  subTitle,
  testID,
  title,
}: InstapaySwagTileBaseProps) => {
  const { radii, space } = useTheme();

  if (isLoading) {
    return <InstapaySwagTileSkeleton testID={`${testID}-skeleton`} style={{ marginRight: space.medium }} />;
  }
  return (
    <TouchableOpacity testID={testID} onPress={onPress} activeOpacity={0.5} style={[{ width: imgWidth }, style]}>
      <Box
        backgroundColor="disabledOnDefaultGlobalSurface"
        style={{ width: imgWidth, height: imgHeight, borderRadius: radii.xlarge, overflow: 'hidden' }}
      >
        {imgSrc ? (
          <ImageBackground
            accessibilityLabel="Product Image"
            resizeMode="cover"
            style={{
              width: imgWidth,
              height: imgHeight,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            source={imgSrc}
          >
            {imgContent}
          </ImageBackground>
        ) : null}
      </Box>
      <Typography.Body
        testID={`${testID}-title`}
        accessibilityLabel={title}
        style={{ marginTop: space.small }}
        variant="small-bold"
      >
        {title}
      </Typography.Body>
      {subTitle ? (
        <Typography.Caption
          testID={`${testID}-subtitle`}
          style={{ marginTop: space.small }}
          accessibilityLabel={subTitle}
          intent="subdued"
        >
          {subTitle}
        </Typography.Caption>
      ) : undefined}
    </TouchableOpacity>
  );
};
