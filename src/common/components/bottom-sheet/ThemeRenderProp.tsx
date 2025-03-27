import type { ReactElement } from 'react';
import React from 'react';
import type { Theme } from '@hero-design/rn';
import { useTheme } from '@hero-design/rn';
import type { ThemeName } from '../../types/hero-design';
import ThemeSwitcher from '../../utils/ThemeSwitcher';

type ChildrenWithTheme = (theme: Theme) => ReactElement;

type Props = {
  themeName: ThemeName;
  children: ReactElement | ChildrenWithTheme;
};

const RenderWithTheme = ({ children }: Pick<Props, 'children'>) => {
  const theme = useTheme();
  return typeof children === 'function' ? children(theme) : children;
};

export const ThemeRenderProp = ({ children, themeName }: Props) => {
  return (
    <ThemeSwitcher name={themeName}>
      <RenderWithTheme>{children}</RenderWithTheme>
    </ThemeSwitcher>
  );
};
