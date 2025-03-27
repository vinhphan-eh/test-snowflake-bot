import { Dimensions, PixelRatio } from 'react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

// based on iPhone 13's scale - figma
const wscale = SCREEN_WIDTH / 390;
const hscale = SCREEN_HEIGHT / 844;

/**
 * Make dp value responsive on different screen resolutions
 * @param size: dp value
 * @param based: scale by width or height
 */
export function scale(size: number, based: 'width' | 'height') {
  const newSize = based === 'height' ? size * hscale : size * wscale;
  return PixelRatio.roundToNearestPixel(newSize);
}

// Pixel ratio constants from https://reactnative.dev/docs/pixelratio
export const XXXHDPI_PIXEL_RATIO = 3.5;
export const XXHDPI_PIXEL_RATIO = 3;
export const XHDPI_PIXEL_RATIO = 2;
export const HDPI_PIXEL_RATIO = 1.5;
export const MDPI_PIXEL_RATIO = 1;
