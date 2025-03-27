import React from 'react';
import { Box, Button } from '@hero-design/rn';
import type { BoxProps } from '@hero-design/rn/types/components/Box';
import { scale } from '../../../../common/utils/layout';

type BottomButtonsProps = BoxProps & {
  onLeftPress: () => void;
  onRightPress: () => void;
  leftAction: string;
  rightAction: string;
};

export const BottomButtons = ({
  leftAction,
  onLeftPress,
  onRightPress,
  rightAction,
  ...boxProps
}: BottomButtonsProps) => {
  return (
    <Box justifyContent="space-between" flexDirection="row" {...boxProps}>
      <Button onPress={onLeftPress} text={leftAction} variant="text" />
      <Button style={{ width: scale(219, 'width') }} onPress={onRightPress} text={rightAction} />
    </Box>
  );
};
