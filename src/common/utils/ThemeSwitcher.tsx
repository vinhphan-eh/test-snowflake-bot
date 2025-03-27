import React from 'react';
import type { ReactNode, ComponentProps } from 'react';
// eslint-disable-next-line ebf-local-rules/no-hd-theme-switcher
import { ThemeSwitcher as HDThemeSwitcher } from '@hero-design/rn';
import { useSessionStore } from '../stores/useSessionStore';

export type ThemeName = ComponentProps<typeof HDThemeSwitcher>['name'];

// only allow light and dark theme, for now let @params name optional to avoid touching many files
// next phase will remove this dummy component

// eslint-disable-next-line react/no-unused-prop-types
const ThemeSwitcher = ({ children }: { name?: ThemeName; children: ReactNode }) => {
  const darkModeEnabled = useSessionStore(s => s.darkModeEnabled);
  const themeName: ThemeName = darkModeEnabled ? 'ehWorkDark' : 'swagLight';

  return <HDThemeSwitcher name={themeName}>{children}</HDThemeSwitcher>;
};

export default ThemeSwitcher;
