import type { ComponentProps } from 'react';
// eslint-disable-next-line ebf-local-rules/no-hd-theme-switcher
import type { ThemeSwitcher } from '@hero-design/rn';
import type { BrandSystemPalette, GlobalSystemPalette } from '@hero-design/rn/types/theme/global/colors/types';

export type HeroDesignColors = keyof GlobalSystemPalette | keyof BrandSystemPalette | undefined;

export type ThemeName = ComponentProps<typeof ThemeSwitcher>['name'];
export type TypographyIntent =
  | 'body'
  | 'subdued'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'inverted'
  | 'archived'
  | 'disabled';
