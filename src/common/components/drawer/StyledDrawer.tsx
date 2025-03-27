import { View } from 'react-native';
import styled from '@emotion/native';
import type { BottomSheetProps } from '@gorhom/bottom-sheet';
import BottomSheet from '@gorhom/bottom-sheet';

// TODO: Integrate theme

const StyledBottomSheet = styled(BottomSheet)<BottomSheetProps>({ flex: 1 });

const StyledBottomSheetHandleContainer = styled(View)({
  alignItems: 'center',
  paddingVertical: 8,
});

const StyledBottomSheetHandle = styled(View)({
  height: 4,
  width: 56,
  borderRadius: 4,
  backgroundColor: '#5A5B5F',
});

export { StyledBottomSheet, StyledBottomSheetHandleContainer, StyledBottomSheetHandle };
