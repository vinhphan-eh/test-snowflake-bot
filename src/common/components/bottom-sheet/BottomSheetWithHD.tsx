import type { ReactElement } from 'react';
import React from 'react';
import type { Theme } from '@hero-design/rn';
import type { BottomSheetRef, BottomSheetProps } from './BottomSheet';
import { BottomSheet } from './BottomSheet';
import { ThemeRenderProp } from './ThemeRenderProp';
import type { ThemeName } from '../../types/hero-design';

type ChildrenWithTheme = (theme: Theme) => ReactElement;

type BottomSheetWithHDProps = Omit<BottomSheetProps, 'children'> & {
  themeName?: ThemeName;
  children: ReactElement | ChildrenWithTheme;
};

export const BottomSheetWithHD = React.forwardRef<BottomSheetRef, BottomSheetWithHDProps>(
  ({ children, themeName = 'wallet', ...rest }, ref) => {
    return (
      <BottomSheet {...rest} ref={ref} themeName={themeName}>
        <ThemeRenderProp themeName={themeName}>{children}</ThemeRenderProp>
      </BottomSheet>
    );
  }
);
