// https://github.com/gorhom/react-native-bottom-sheet/issues/219#issuecomment-997411299
import React from 'react';
import { View, ScrollView, FlatList, SectionList, Modal } from 'react-native';
import type { BottomSheetModalProps } from '@gorhom/bottom-sheet';
import { useBottomSheetDynamicSnapPoints } from '@gorhom/bottom-sheet';
import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/src/types';

const BottomSheetModalContext = React.createContext(null);

const BottomSheetModalProvider = (props: any) => {
  return <BottomSheetModalContext.Provider {...props} value={{}} />;
};
const BottomSheet = (props: any) => <View {...props} />;
const BottomSheetView = (props: any) => <View {...props} />;

interface MockBottomSheetModalProps extends Omit<BottomSheetModalProps, 'style' | 'children'> {
  children?: React.ReactNode;
}
const BottomSheetModal = React.forwardRef<BottomSheetModalMethods, MockBottomSheetModalProps>((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    snapToIndex: () => {},
    snapToPosition: () => {},
    expand: () => {},
    collapse: () => {},
    close: () => {},
    forceClose: () => {},
    // modal methods
    dismiss: () => {},
    present: () => {},
    // internal
    minimize: () => {},
    restore: () => {},
  }));

  return (
    //@ts-ignore
    <Modal {...props}>
      {props.children}
      {!!props.footerComponent && props.footerComponent({ animatedFooterPosition: 0 as any })}
    </Modal>
  );
});

const BottomSheetBackdrop = (props: any) => <View {...props} />;
const BottomSheetHandle = (props: any) => <View {...props} />;
const BottomSheetFooter = (props: any) => <View {...props} />;
const BottomSheetScrollView = (props: any) => <ScrollView {...props} />;
const BottomSheetFlatList = (props: any) => <FlatList {...props} />;
const BottomSheetSectionList = (props: any) => <SectionList {...props} />;

const useBottomSheet = jest.fn();
const useBottomSheetModal = jest.fn();
const useBottomSheetSpringConfigs = jest.fn();
const useBottomSheetTimingConfigs = jest.fn();
const useBottomSheetInternal = jest.fn();

export { useBottomSheet };
export { useBottomSheetModal };
export { useBottomSheetSpringConfigs };
export { useBottomSheetTimingConfigs };
export { useBottomSheetInternal };
export { useBottomSheetDynamicSnapPoints };

export {
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetHandle,
  BottomSheetModal,
  BottomSheetFooter,
  BottomSheetScrollView,
  BottomSheetFlatList,
  BottomSheetView,
  BottomSheetSectionList,
};

export default BottomSheet;
