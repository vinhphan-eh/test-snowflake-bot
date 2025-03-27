import React from 'react';
import { Pressable } from 'react-native';
import { Icon, Typography, useTheme } from '@hero-design/rn';
import type { SharedValue } from 'react-native-reanimated';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIntl } from '../../../../../providers/LocalisationProvider';

type ShowMapViewBtnProps = {
  visibleSharedValue: SharedValue<number>;
  onPress: () => void;
};

export const ShowMapViewBtn = ({ onPress, visibleSharedValue }: ShowMapViewBtnProps) => {
  const Intl = useIntl();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { colors, space } = useTheme();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: visibleSharedValue.value,
      width: visibleSharedValue.value ? 'auto' : 0,
      height: visibleSharedValue.value ? 'auto' : 0,
      position: 'absolute',
      bottom: bottomInset + space.large,

      alignSelf: 'center',
    };
  });
  const label = Intl.formatMessage({ id: 'benefits.cashback.map' });
  return (
    <Animated.View pointerEvents="box-none" style={animatedStyle}>
      <Pressable
        testID="show-map-view-btn"
        onPress={onPress}
        style={({ pressed }) => [
          {
            flexDirection: 'row',
            borderRadius: 50,
            paddingVertical: space.smallMedium,
            paddingHorizontal: space.large,
            backgroundColor: pressed ? colors.pressedSurface : colors.primary,
            alignItems: 'center',
          },
        ]}
      >
        <Icon
          style={{ marginRight: space.xsmall }}
          testID="map-icon"
          intent="text-inverted"
          icon="map-outlined"
          size="small"
        />
        <Typography.Body accessibilityLabel={label} intent="inverted" variant="regular">
          {label}
        </Typography.Body>
      </Pressable>
    </Animated.View>
  );
};
