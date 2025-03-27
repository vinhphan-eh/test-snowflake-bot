import React from 'react';
import { BottomSheetSectionList } from '@gorhom/bottom-sheet';
import type { BottomSheetSectionListProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types';

/**
 * A pre-integrated React Native SectionList with Drawer gestures.
 */

export type DrawerSectionListProps<ItemT, SectionT> = BottomSheetSectionListProps<ItemT, SectionT>;

const DrawerSectionList = <ItemT, SectionT>({ children, ...props }: DrawerSectionListProps<ItemT, SectionT>) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <BottomSheetSectionList {...props}>{children}</BottomSheetSectionList>;
};

export default DrawerSectionList;
