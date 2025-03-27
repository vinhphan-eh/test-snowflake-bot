import React from 'react';
import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity, Image } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import type { CaptionProps } from '@hero-design/rn/types/components/Typography/Caption';
import { scale } from '../../../../common/utils/layout';

export type ProductItemProps = {
  imgSrc?: ImageSourcePropType;
  logoSrc?: ImageSourcePropType;
  imgWidth: number;
  imgHeight: number;
  title: string;
  kicker?: string;
  subTitle?: string;
  subTitleIntent?: CaptionProps['intent'];
  numberOfLines?: number;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  testID?: string;
  renderFooter?: () => React.ReactNode;
};

export const ProductItem = ({
  imgHeight,
  imgSrc,
  imgWidth,
  kicker,
  logoSrc,
  numberOfLines = 1,
  onPress,
  renderFooter,
  style,
  subTitle,
  subTitleIntent = 'subdued',
  testID,
  title,
}: ProductItemProps) => {
  const { colors, radii, space } = useTheme();
  return (
    <TouchableOpacity testID={testID} onPress={onPress} activeOpacity={0.5} style={[{ width: imgWidth }, style]}>
      <Box
        backgroundColor="disabledOnDefaultGlobalSurface"
        style={{ width: imgWidth, height: imgHeight, borderRadius: radii.medium, overflow: 'hidden' }}
      >
        {imgSrc ? (
          <Image
            accessibilityLabel="Product Image"
            resizeMode="cover"
            style={{ width: imgWidth, height: imgHeight }}
            source={imgSrc}
          />
        ) : null}
        {logoSrc ? (
          <Box
            style={{
              width: scale(30, 'width'),
              height: scale(30, 'width'),
              position: 'absolute',
              bottom: space.small,
              left: space.small,
              borderRadius: radii.base,
              backgroundColor: colors.defaultGlobalSurface,
            }}
          >
            <Image
              accessibilityLabel="Product Logo"
              resizeMode="center"
              style={{
                flex: 1,
              }}
              source={logoSrc}
            />
          </Box>
        ) : null}
      </Box>
      {kicker ? (
        <Typography.Caption
          style={{ marginTop: space.small }}
          accessibilityLabel={kicker}
          numberOfLines={numberOfLines}
          intent={subTitleIntent}
        >
          {kicker}
        </Typography.Caption>
      ) : undefined}
      <Typography.Body
        accessibilityLabel={title}
        style={{ marginTop: space.small }}
        numberOfLines={numberOfLines}
        variant="small-bold"
      >
        {title}
      </Typography.Body>
      {subTitle ? (
        <Typography.Caption
          style={{ marginTop: space.small }}
          accessibilityLabel={subTitle}
          numberOfLines={numberOfLines}
          intent={subTitleIntent}
        >
          {subTitle}
        </Typography.Caption>
      ) : undefined}
      {renderFooter?.()}
    </TouchableOpacity>
  );
};
