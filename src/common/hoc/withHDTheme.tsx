import React from 'react';
import { ThemeSwitcher } from '@hero-design/rn';
import { useSessionStore } from '../stores/useSessionStore';
import type { ThemeName } from '../types/hero-design';

export const withHDTheme =
  <T extends object>(Component: () => JSX.Element, name: ThemeName = 'wallet') =>
  (props: T) => {
    const swagRebrandEnabled = useSessionStore(s => s.swagRebrandEnabled);
    return (
      <ThemeSwitcher name={swagRebrandEnabled ? 'swagLight' : name}>
        <Component {...props} />
      </ThemeSwitcher>
    );
  };
