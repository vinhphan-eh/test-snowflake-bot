import { useMemo } from 'react';
import { Dimensions, PixelRatio } from 'react-native';
import { XXHDPI_PIXEL_RATIO, scale } from '../utils/layout';

/** Figma design mostly for iPhone 13. This funtion will calculating the good height of image for small screen devides. Mostly use for Carousel HD component
 * heightReduction: Reduce height
 * heightReductionForLowPixelDensity: Reduce more height to be fit in small screen devices
 * imgOriginalHeight: Image height in figma design
 * pixelRatio: Pixel ratio constants from https://reactnative.dev/docs/pixelratio
 */
export const useScaleImageHeight = ({
  heightReduction = 0,
  heightReductionForLowPixelDensity = 0,
  imgOriginalHeight,
  pixelRatio = XXHDPI_PIXEL_RATIO,
}: {
  imgOriginalHeight: number;
  heightReduction?: number;
  heightReductionForLowPixelDensity?: number;
  pixelRatio?: number;
}) => {
  const { width: screenWidth } = useMemo(() => Dimensions.get('window'), []);
  const scaledHeight = useMemo(() => scale(imgOriginalHeight, 'height'), [imgOriginalHeight]);
  const isLowPixelDensityScreen = useMemo(() => PixelRatio.get() < pixelRatio, [pixelRatio]);
  const imageHeight = useMemo(() => {
    const height = scaledHeight - heightReduction;
    if (isLowPixelDensityScreen) {
      return height - heightReductionForLowPixelDensity;
    }
    return height;
  }, [isLowPixelDensityScreen, scaledHeight, heightReductionForLowPixelDensity, heightReduction]);

  return {
    imageHeight,
    scaledHeight,
    screenWidth,
    isLowPixelDensityScreen,
  };
};
