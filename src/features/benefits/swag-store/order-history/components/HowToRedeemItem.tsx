import React, { useRef } from 'react';
import { Dimensions } from 'react-native';
import { Box, List, useTheme } from '@hero-design/rn';
import type { MixedStyleDeclaration } from 'react-native-render-html';
import RenderHtml from 'react-native-render-html';

import type { BottomSheetRef } from '../../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetScrollView } from '../../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD } from '../../../../../common/components/bottom-sheet/BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from '../../../../../common/components/bottom-sheet/useBottomSheetDynamicSnapPoints';

type HowToRedeemItemProps = {
  content: string;
  onPress?: () => void;
};

const { width } = Dimensions.get('window');

export const HowToRedeemItem = ({ content, onPress }: HowToRedeemItemProps) => {
  const bsRef = useRef<BottomSheetRef>(null);
  const { fontSizes } = useTheme();
  const textStyle: MixedStyleDeclaration = {
    fontSize: fontSizes.medium,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.48,
  };

  const {
    animatedContentHeight,
    animatedHandleHeight,
    animatedSnapPoints,
    contentContainerHeightStyle,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints();

  return (
    <>
      <List.Item
        onPress={() => {
          bsRef.current?.open();
          onPress?.();
        }}
        suffix="arrow-up"
        testID="how_to_redeem"
        variant="card"
        title="How to redeem"
      />
      <BottomSheetWithHD
        ref={bsRef}
        title="How to redeem"
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        handleIconIntent="text"
      >
        <BottomSheetScrollView
          alwaysBounceVertical={false}
          accessibilityLabel="How to redeem content scroll view"
          style={contentContainerHeightStyle}
          onLayout={handleContentLayout}
        >
          <Box marginBottom="medium" paddingHorizontal="large">
            <RenderHtml baseStyle={textStyle} contentWidth={width} source={{ html: content }} />
          </Box>
        </BottomSheetScrollView>
      </BottomSheetWithHD>
    </>
  );
};
