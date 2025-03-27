import React from 'react';
import type { ThemeName } from '../types/hero-design';
import ThemeSwitcher from '../utils/ThemeSwitcher';

export const withHDTheme =
  <T extends object>(Component: () => JSX.Element, name: ThemeName = 'wallet') =>
  (props: T) => {
    return (
      // name isn't doing anything here, will remove in next phase
      <ThemeSwitcher name={name}>
        <Component {...props} />
      </ThemeSwitcher>
    );
  };
