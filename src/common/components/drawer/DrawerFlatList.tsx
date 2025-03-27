import React from 'react';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import type { BottomSheetFlatListProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types';

/**
 * A pre-integrated React Native FlatList with Drawer gestures.
 */

export type DrawerFlatListProps<T> = BottomSheetFlatListProps<T>;

const DrawerFlatList = <T,>({ children, ref, ...props }: DrawerFlatListProps<T>) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <BottomSheetFlatList {...props}>{children}</BottomSheetFlatList>;
};

export default DrawerFlatList;
