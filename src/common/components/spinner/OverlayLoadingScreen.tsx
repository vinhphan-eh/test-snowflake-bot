import React from 'react';
import { Box, Spinner } from '@hero-design/rn';

interface OverlayLoadingScreenProps {
  spinnerSize?: 'small' | 'medium';
}

/**
 * Overlay with spinner and opacity background for showing loading indicator for a screen
 */
export const OverlayLoadingScreen = ({ spinnerSize = 'small' }: OverlayLoadingScreenProps) => {
  return (
    <Box
      testID="overlay_loading_screen"
      alignItems="center"
      justifyContent="center"
      style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, backgroundColor: '#0000007a' }}
    >
      <Spinner size={spinnerSize} />
    </Box>
  );
};
