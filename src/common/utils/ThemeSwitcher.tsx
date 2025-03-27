import React from 'react';
import type { ReactNode, ComponentProps } from 'react';
import { ThemeSwitcher as HDThemeSwitcher } from '@hero-design/rn';
import { useSessionStore } from '../stores/useSessionStore';

export type ThemeName = ComponentProps<typeof HDThemeSwitcher>['name'];

const ThemeSwitcher = ({ children, name = 'swag' }: { name?: ThemeName; children: ReactNode }) => {
  const swagRebrandEnabled = useSessionStore(s => s.swagRebrandEnabled);
  const themeName = swagRebrandEnabled ? 'swagLight' : name;

  return <HDThemeSwitcher name={themeName}>{children}</HDThemeSwitcher>;
};

export default ThemeSwitcher;
