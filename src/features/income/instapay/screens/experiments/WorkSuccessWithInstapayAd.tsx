import React from 'react';
import { Dimensions, Image, type StyleProp, type ViewStyle } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../../../../common/assets/images';
import { scale } from '../../../../../common/utils/layout';
import ThemeSwitcher from '../../../../../common/utils/ThemeSwitcher';
import { InstapayExpCard } from '../../components/InstapayExpCard';
import type { TargetedFeature } from '../../hooks/useInstapayTracking';

type WorkSuccessWithInstapayAdProps = {
  onCancel: () => void;
  onActionEffect: () => void;
  title: string;
  description: string;
  style?: StyleProp<ViewStyle>;
  feature: TargetedFeature;
};

const { height: windowHeight } = Dimensions.get('window');

const isSmallScreen = windowHeight < 750;

const imgWidth = scale(isSmallScreen ? 90 : 146, 'width');
const imgHeight = imgWidth * 1.06;

const Content = ({ description, feature, onActionEffect, onCancel, style, title }: WorkSuccessWithInstapayAdProps) => {
  const { bottom, top } = useSafeAreaInsets();
  const { space } = useTheme();
  const extraTop = isSmallScreen ? space.small : space.xlarge;
  const titleTop = isSmallScreen ? space.small : space.large;

  return (
    <Box
      backgroundColor="decorativePrimarySurface"
      style={[
        {
          flex: 1,
          alignItems: 'center',
          paddingTop: top + extraTop,
          paddingBottom: bottom || space.medium,
        },
        style,
      ]}
    >
      <Image
        style={{
          width: imgWidth,
          height: imgHeight,
          resizeMode: 'contain',
        }}
        source={images.imgWorkSuccess}
      />
      <Typography.Title style={{ marginTop: titleTop }} typeface="playful" level="h4">
        {title}
      </Typography.Title>
      <Typography.Body style={{ marginTop: space.small }} intent="subdued" typeface="playful" variant="regular">
        {description}
      </Typography.Body>
      <Box flexGrow={1} />
      <InstapayExpCard
        onActionEffect={onActionEffect}
        testID="instapay-exp-card"
        style={{ flex: 0 }}
        marginTop="large"
        onCancel={onCancel}
        feature={feature}
      />
    </Box>
  );
};

export const WorkSuccessWithInstapayAd = (props: WorkSuccessWithInstapayAdProps) => {
  return (
    <ThemeSwitcher name="work">
      <Content {...props} />
    </ThemeSwitcher>
  );
};
