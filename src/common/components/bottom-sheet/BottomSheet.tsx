import React, { useCallback, useMemo, useRef } from 'react';
import type {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollViewProps as RNScrollViewProps,
  ScrollViewProps,
  ViewProps,
} from 'react-native';
import { Platform, ScrollView as RNScrollView, StyleSheet } from 'react-native';
import type { BottomSheetModalProps } from '@gorhom/bottom-sheet';
import {
  BottomSheetBackdrop,
  BottomSheetFlatList as BottomSheetFlatListFromLib,
  BottomSheetModal,
  BottomSheetSectionList as BottomSheetSectionListFromLib,
  BottomSheetView as BottomSheetViewFromLib,
} from '@gorhom/bottom-sheet';
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/src/components/bottomSheetBackdrop/types';
import type { Theme } from '@hero-design/rn';
import { Box, Button, Icon, Typography, useTheme } from '@hero-design/rn';
import type { BoxProps } from '@hero-design/rn/types/components/Box';
import type { ButtonProps } from '@hero-design/rn/types/components/Button/Button';
import type { IconButtonProps } from '@hero-design/rn/types/components/Button/IconButton';
import type { IconName } from '@hero-design/rn/types/types';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import { ThemeRenderProp } from './ThemeRenderProp';
import type { ThemeName } from '../../types/hero-design';

const AnimatedScrollView = Animated.createAnimatedComponent<RNScrollViewProps>(RNScrollView);

export type ButtonAction = {
  isDisabled?: boolean;
  title: string;
  onPress?: () => void;
  testID?: string;
  intent?: ButtonProps['intent'];
};

export type BottomSheetProps = {
  title?: string;
  prefixIconName?: IconName;
  prefixIconIntent?: IconButtonProps['intent'];
  prefixIconSize?: IconButtonProps['size'];
  children: React.ReactNode;
  actions?: ButtonAction[];
  onDismiss?: () => void;
  hideRightBtn?: boolean;
  handleIconName?: IconName;
  handleIconIntent?: IconButtonProps['intent'];
  handleIconSize?: IconButtonProps['size'];
  themeName?: ThemeName;
  backgroundColor?: BoxProps['backgroundColor'];
} & Pick<BottomSheetModalProps, 'snapPoints' | 'handleHeight' | 'onChange' | 'contentHeight'>;

export type BottomSheetRef = {
  open: () => void;
  close: () => void;
};

// snap point index to display bottom sheet
const DISPLAY_SNAP_POINT_INDEX = 1;

export const BOTTOM_SHEET_TOP_OFFSET = Platform.OS === 'ios' ? StaticSafeAreaInsets.safeAreaInsetsTop : 0;
export const BOTTOM_SHEET_BOTTOM_OFFSET = Platform.OS === 'ios' ? StaticSafeAreaInsets.safeAreaInsetsBottom : 0;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 11,
  },
});

// Suggestion: don't try to add custom view that could rerender multiple times
// to Bottom Sheet because it will lose keyboard focus state when rerender
// We could do it as children of BottomSheet
const BottomSheet = React.forwardRef<BottomSheetRef, BottomSheetProps>(
  (
    {
      actions,
      backgroundColor,
      children,
      contentHeight,
      handleHeight,
      handleIconIntent = 'primary',
      handleIconName = 'arrow-down',
      handleIconSize = 'medium',
      hideRightBtn = false,
      onChange,
      onDismiss,
      prefixIconIntent = 'primary',
      prefixIconName,
      prefixIconSize = 'medium',
      snapPoints,
      themeName = 'wallet',
      title,
    },
    ref
  ) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const onClose = useCallback(() => {
      bottomSheetModalRef.current?.dismiss();
    }, []);

    React.useImperativeHandle(ref, () => ({
      open: () => {
        bottomSheetModalRef.current?.present();
      },
      close: onClose,
    }));

    const renderBackdrop = useCallback(
      // eslint-disable-next-line react/jsx-props-no-spreading
      (backdropProps: BottomSheetDefaultBackdropProps) => (
        <BottomSheetBackdrop {...backdropProps} pressBehavior="close" opacity={0.48} />
      ),
      []
    );

    const renderHeader = (theme: Theme) => {
      if (title !== undefined) {
        return (
          <Box
            borderTopLeftRadius="xlarge"
            borderTopRightRadius="xlarge"
            backgroundColor={backgroundColor}
            flexDirection="row"
            alignItems="center"
            paddingVertical="medium"
          >
            {prefixIconName && (
              <Icon
                icon={prefixIconName}
                size={prefixIconSize}
                intent={prefixIconIntent}
                style={{ marginLeft: theme.space.large }}
              />
            )}
            <Box marginHorizontal="large" flex={1}>
              <Typography.Title level="h5">{title}</Typography.Title>
            </Box>
            {!hideRightBtn && (
              <Button.Icon
                intent={handleIconIntent}
                size={handleIconSize}
                style={{ marginRight: theme.space.large }}
                icon={handleIconName}
                onPress={onClose}
                testID="bts_right_btn"
              />
            )}
          </Box>
        );
      }

      return <Box marginTop="small" />;
    };

    const renderFooter = () => {
      const renderButton = (item: ButtonAction) => {
        return (
          <Button
            testID={item.testID}
            key={item.title}
            disabled={item.isDisabled}
            text={item.title}
            variant="text"
            intent={item.intent ?? 'primary'}
            onPress={() => {
              item.onPress?.();
            }}
          />
        );
      };

      return (
        <Box backgroundColor={backgroundColor} style={{ paddingBottom: BOTTOM_SHEET_BOTTOM_OFFSET }}>
          {!!actions?.length && (
            <Box
              flexDirection="row"
              paddingHorizontal="smallMedium"
              justifyContent="flex-end"
              borderTopColor="disabledOnDefaultGlobalSurface"
              style={{ borderTopWidth: StyleSheet.hairlineWidth }}
            >
              {actions.map(renderButton)}
            </Box>
          )}
        </Box>
      );
    };

    const header = () => <ThemeRenderProp themeName={themeName}>{renderHeader}</ThemeRenderProp>;
    const footer = () => <ThemeRenderProp themeName={themeName}>{renderFooter}</ThemeRenderProp>;
    /**
     * When bottom sheet is shown, sometimes it's animated to not correct snap point index.
     * This behavior causes bottom sheet is not fully display.
     * Need to animate to correct index to fix issue.
     */
    const fixAnimateSnapPointIssue = useCallback(
      (fromIndex: number, toIndex: number) => {
        // -1 is closed state https://gorhom.github.io/react-native-bottom-sheet/props/#index
        if (fromIndex === -1 && toIndex !== DISPLAY_SNAP_POINT_INDEX) {
          bottomSheetModalRef.current?.snapToIndex(DISPLAY_SNAP_POINT_INDEX);
        }
      },
      [bottomSheetModalRef]
    );

    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={DISPLAY_SNAP_POINT_INDEX}
        topInset={BOTTOM_SHEET_TOP_OFFSET}
        backdropComponent={renderBackdrop}
        snapPoints={snapPoints}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
        onChange={onChange}
        onDismiss={onDismiss}
        onAnimate={fixAnimateSnapPointIssue}
        handleComponent={header}
        footerComponent={footer}
        style={styles.bottomSheetContainer}
        handleHeight={handleHeight}
        contentHeight={contentHeight}
      >
        {children}
      </BottomSheetModal>
    );
  }
);

const BottomSheetScrollView = ({ children, ...props }: ScrollViewProps) => {
  const { colors } = useTheme();
  const isDragging = useSharedValue(false);
  const isMomentum = useSharedValue(false);

  const onScrollBeginDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    props.onScrollBeginDrag?.(event);

    isDragging.value = true;
  };

  const onScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    props.onScrollEndDrag?.(event);

    isDragging.value = false;
  };

  const onMomentumScrollBegin = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    props.onMomentumScrollBegin?.(event);

    isMomentum.value = true;
  };

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    props.onMomentumScrollEnd?.(event);

    isMomentum.value = false;
  };

  /**
   * Show border top when user is scrolling or still momentum
   */
  const onScrollStyle = useAnimatedStyle(() => {
    return {
      borderTopWidth: isDragging.value || isMomentum.value ? 1 : 0,
      borderTopColor: colors.secondaryOutline,
    };
  });

  const style = useMemo(() => {
    if (props.style) {
      const flattenStyle = StyleSheet.flatten(props.style);
      return [flattenStyle, onScrollStyle];
    }

    return onScrollStyle;
  }, [onScrollStyle, props.style]);

  return (
    // FIXME: Use AnimatedScrollView here due to the BottomSheetScrollViewFromLib event handlers don't work as expected
    // Needs to look back in the future
    <AnimatedScrollView
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      style={style}
      onScrollBeginDrag={onScrollBeginDrag}
      onScrollEndDrag={onScrollEndDrag}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onMomentumScrollEnd={onMomentumScrollEnd}
    >
      {children}
    </AnimatedScrollView>
  );
};

const BottomSheetView = (props: ViewProps) => {
  return (
    <BottomSheetViewFromLib
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      style={{ flex: 1 }}
    >
      {props.children}
    </BottomSheetViewFromLib>
  );
};

const BottomSheetFlatList = BottomSheetFlatListFromLib;

const BottomSheetSectionList = BottomSheetSectionListFromLib;

export { BottomSheetFlatList, BottomSheetScrollView, BottomSheetView, BottomSheet, BottomSheetSectionList };
