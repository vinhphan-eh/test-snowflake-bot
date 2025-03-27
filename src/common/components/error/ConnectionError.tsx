import React from 'react';
import { Box, Error, Image } from '@hero-design/rn';
import type { ErrorProps } from './types';
import images from '../../assets/images';

const connectionErrorImage = (
  <>
    <Box
      style={{
        height: '100%',
        width: '100%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        backgroundColor="defaultGlobalSurface"
        style={{
          height: '100%',
          width: '100%',
          borderRadius: 100,
        }}
      />
    </Box>
    <Box
      style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        source={images.bellHand}
        resizeMode="contain"
        style={{
          height: '100%',
          width: '100%',
        }}
      />
    </Box>
  </>
);

export const ConnectionError = ({
  ctaText = 'Try again',
  description = 'Your internet seems to be sleeping',
  image,
  onCtaPress,
  testID,
  title = 'Wake up your connection!',
  variant = 'in-page',
}: Omit<ErrorProps, 'themeName'>) => (
  <Error
    variant={variant}
    title={title}
    description={description}
    image={image || connectionErrorImage}
    ctaText={ctaText}
    onCtaPress={onCtaPress}
    testID={testID}
  />
);
