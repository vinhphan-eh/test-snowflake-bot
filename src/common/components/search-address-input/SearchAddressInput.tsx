import React, { useEffect, useRef, useState } from 'react';
import type { FlexStyle, StyleProp, ViewStyle } from 'react-native';
import { Keyboard, Platform, Pressable, View } from 'react-native';
import { Box, Icon, scale, TextInput, Typography } from '@hero-design/rn';
import type { BoxProps } from '@hero-design/rn/types/components/Box';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { GoogleAddressDetails } from '../../../new-graphql/generated';
import { useRegionLocalisation } from '../../../providers/LocalisationProvider';
import type { ThemeName } from '../../types/hero-design';
import { GoogleAddressInput } from '../autocomplete-address-input/GoogleAddressInput';
import type { BottomSheetRef } from '../bottom-sheet/BottomSheet';
import { BottomSheetView } from '../bottom-sheet/BottomSheet';
import { BottomSheetWithHD as BottomSheet } from '../bottom-sheet/BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from '../bottom-sheet/useBottomSheetDynamicSnapPoints';

type SearchAddressInputProps = {
  /**
   * label of input
   */
  label?: string;

  isDisabled?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;

  /**
   * test id for testing
   */
  testID?: string;

  onOpenManualInput?: () => void;
  onAddressSelected: (address: GoogleAddressDetails) => void;
  maxScreenHeight: number;
  textInputStyle?: StyleProp<ViewStyle>;
  theme?: ThemeName;
} & BoxProps;

export interface SearchAddressInputRef {
  setAddress: (address: string) => void;
}

export const SearchAddressInput = React.forwardRef<SearchAddressInputRef, SearchAddressInputProps>(
  (
    {
      errorMessage,
      isDisabled,
      isInvalid,
      label = 'Address',
      maxScreenHeight,
      onAddressSelected,
      onOpenManualInput,
      testID,
      textInputStyle,
      theme,
      ...containerProps
    }: SearchAddressInputProps,
    ref
  ) => {
    const [formattedAddress, setAddress] = useState('');
    const btsRef = useRef<BottomSheetRef>(null);
    const { currentRegion } = useRegionLocalisation();
    const offsetY = useSharedValue(0);
    const viewHeight = useSharedValue<number | string>('auto');
    const { bottom: bottomInset } = useSafeAreaInsets();
    const keyboardOpenEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const keyboardHideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const handleViewHeight = (keyboardHeight: number) => {
      offsetY.value = keyboardHeight - bottomInset;
      viewHeight.value = maxScreenHeight - (64 + bottomInset);
    };

    useEffect(() => {
      const keyboardOpenListener = Keyboard.addListener(keyboardOpenEvent, e => {
        const keyboardHeight = e.endCoordinates.height;
        handleViewHeight(keyboardHeight);
      });
      const keyboardHideListener = Keyboard.addListener(keyboardHideEvent, () => {
        offsetY.value = 0;
      });

      return () => {
        keyboardOpenListener.remove();
        keyboardHideListener.remove();
      };
    }, [maxScreenHeight]);

    const animatedContentStyle = useAnimatedStyle(() => {
      return {
        height: viewHeight.value as FlexStyle['height'],
        paddingBottom: offsetY.value,
      };
    });

    const openAddressSearch = () => {
      btsRef.current?.open();
    };

    React.useImperativeHandle(ref, () => ({
      setAddress: (address: string) => {
        setAddress(address);
      },
    }));

    const onLocationSelect = (address?: GoogleAddressDetails) => {
      if (!address) {
        setAddress('');
        return;
      }
      setAddress(address?.formattedAddress || '');
      onAddressSelected(address);
      btsRef.current?.close();
    };

    const { animatedContentHeight, animatedHandleHeight, animatedSnapPoints, handleContentLayout } =
      useBottomSheetDynamicSnapPoints();

    const openManualInput = () => {
      if (onOpenManualInput) {
        btsRef.current?.close();
        onOpenManualInput();
      }
    };
    return (
      <Box testID={testID} {...containerProps}>
        <Pressable onPress={openAddressSearch}>
          <View pointerEvents="none">
            <TextInput
              autoComplete="off"
              label={label}
              value={formattedAddress}
              suffix={<Icon size="small" icon="search-outlined" />}
              accessibilityLabel="Address"
              testID="address-display"
              disabled={isDisabled}
              error={isInvalid ? errorMessage || 'Please enter a valid address' : undefined}
              style={textInputStyle}
            />
          </View>
        </Pressable>
        <BottomSheet
          snapPoints={animatedSnapPoints}
          handleHeight={animatedHandleHeight}
          contentHeight={animatedContentHeight}
          onDismiss={() => {
            viewHeight.value = 'auto';
          }}
          title="Address"
          ref={btsRef}
          handleIconName="cancel"
          handleIconIntent="text"
          handleIconSize="xsmall"
          themeName={theme ?? 'wallet'}
        >
          {hdTheme => (
            <BottomSheetView onLayout={handleContentLayout}>
              <Animated.View style={[animatedContentStyle]}>
                <Box flex={1}>
                  <GoogleAddressInput
                    country={currentRegion}
                    style={{ marginHorizontal: hdTheme.space.medium }}
                    onLocationSelect={onLocationSelect}
                    testID="auto-complete-input"
                  />
                </Box>
                {onOpenManualInput && (
                  <Box
                    style={{ height: scale(64), width: '100%' }}
                    backgroundColor="defaultGlobalSurface"
                    alignItems="flex-end"
                    justifyContent="center"
                    borderTopWidth="medium"
                    borderBottomWidth="medium"
                    borderColor="secondaryOutline"
                    paddingRight="smallMedium"
                  >
                    <Typography.Body
                      variant="regular-bold"
                      onPress={openManualInput}
                      intent="primary"
                      testID="not-find-address-btn"
                    >
                      Can&apos;t find your address?
                    </Typography.Body>
                  </Box>
                )}
              </Animated.View>
            </BottomSheetView>
          )}
        </BottomSheet>
      </Box>
    );
  }
);
