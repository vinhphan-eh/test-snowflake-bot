import React, { useCallback } from 'react';
import type BottomSheet from '@gorhom/bottom-sheet';
import type { BottomSheetProps } from '@gorhom/bottom-sheet';
import { StyledBottomSheet, StyledBottomSheetHandle, StyledBottomSheetHandleContainer } from './StyledDrawer';

/**
 * An interactive bottom sheet with configurable native views and gestures.
 */

export type DrawerProps = BottomSheetProps;

const Drawer = React.forwardRef<BottomSheet, DrawerProps>(({ children, ...props }, ref) => {
  const renderHandle = useCallback(
    () => (
      <StyledBottomSheetHandleContainer>
        <StyledBottomSheetHandle />
      </StyledBottomSheetHandleContainer>
    ),
    []
  );

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledBottomSheet ref={ref} backgroundStyle={{ borderRadius: 0 }} handleComponent={renderHandle} {...props}>
      {children}
    </StyledBottomSheet>
  );
});

export default Drawer;
