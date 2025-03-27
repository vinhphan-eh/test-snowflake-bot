import { useTheme } from '@hero-design/rn';
import type { WeavrKYCTheme } from '../types';

const hexToHex8 = (hex: string) => `${hex}FF`;

export const useWeavrKYCTheme = () => {
  const { colors, radii } = useTheme();

  const theme: WeavrKYCTheme = {
    both: {
      colors: {
        // background
        backgroundCommon: { light: hexToHex8(colors.defaultSurface), dark: hexToHex8(colors.darkGlobalSurface) },
        // primary button
        primaryButtonBackground: { light: hexToHex8(colors.primary), dark: hexToHex8(colors.primary) },
        primaryButtonContent: { light: hexToHex8(colors.onPrimary), dark: hexToHex8(colors.onPrimary) },
        primaryButtonBackgroundHighlighted: {
          light: hexToHex8(colors.pressedSurface),
          dark: hexToHex8(colors.pressedSurface),
        },
        primaryButtonContentHighlighted: {
          light: hexToHex8(colors.highlightedSurface),
          dark: hexToHex8(colors.highlightedSurface),
        },
        primaryButtonBackgroundDisabled: {
          light: hexToHex8(colors.disabledOnDefaultGlobalSurface),
          dark: hexToHex8(colors.disabledOnDefaultGlobalSurface),
        },
        primaryButtonContentDisabled: {
          light: hexToHex8(colors.disabledOnDefaultGlobalSurface),
          dark: hexToHex8(colors.disabledOnDefaultGlobalSurface),
        },
      },
      fonts: {
        headline1: { name: 'BeVietnamPro-SemiBold.ttf', size: 18 },
        headline2: { name: 'BeVietnamPro-SemiBold.ttf', size: 20 },
        body: { name: 'BeVietnamPro-Regular.ttf', size: 12 },
        caption: { name: 'BeVietnamPro-Regular.ttf', size: 11 },
        subtitle1: { name: 'BeVietnamPro-SemiBold.ttf', size: 18 },
        subtitle2: { name: 'BeVietnamPro-Regular.ttf', size: 14 },
      },
      metrics: {
        // buttons
        buttonHeight: 60, // only iOS. The primary and secondary buttons height.
        buttonCornerRadius: radii['5xlarge'], // The primary and secondary buttons corner radius.
      },
    },
  };

  return theme;
};
