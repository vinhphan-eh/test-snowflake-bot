import React from 'react';
import type { BoxProps } from '@hero-design/rn/types/components/Box';
import type { IconProps } from '@hero-design/rn/types/components/Icon';
import type { BottomSheetRef, ButtonAction } from './BottomSheet';
import { BottomSheetView } from './BottomSheet';
import { BottomSheetWithHD } from './BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from './useBottomSheetDynamicSnapPoints';
import type { ThemeName } from '../../types/hero-design';

type CustomBottomSheetViewProps = {
  actions?: Array<ButtonAction>;
  content: () => React.ReactNode;
  title: string;
  bsRef?: React.RefObject<BottomSheetRef>;
  icon?: IconProps['icon'];
  iconSize?: IconProps['size'];
  theme?: ThemeName;
  onDismiss?: () => void;
  backgroundColor?: BoxProps['backgroundColor'];
};

export const CustomBottomSheetView = ({
  actions = [],
  backgroundColor,
  bsRef,
  content,
  icon = 'arrow-down',
  iconSize = 'medium',
  onDismiss = () => {},
  theme = 'wallet',
  title,
}: CustomBottomSheetViewProps) => {
  const { animatedContentHeight, animatedHandleHeight, animatedSnapPoints, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(actions.length > 0);

  return (
    <BottomSheetWithHD
      backgroundColor={backgroundColor}
      themeName={theme}
      ref={bsRef}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      actions={actions}
      title={title}
      handleIconName={icon}
      handleIconSize={iconSize}
      onDismiss={onDismiss}
    >
      <BottomSheetView onLayout={handleContentLayout}>{content()}</BottomSheetView>
    </BottomSheetWithHD>
  );
};
