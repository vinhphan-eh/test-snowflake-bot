import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box } from '@hero-design/rn';
import type { Space } from '@hero-design/rn/types/theme/global/space';

type BulletLineV2Props = {
  children: React.ReactNode;
  size: number;
  betweenGap: keyof Space | undefined;
  style?: StyleProp<ViewStyle>;
};

export const BulletLineV2 = ({ betweenGap, children, size, style }: BulletLineV2Props) => {
  return (
    <Box style={style} flexDirection="row">
      <Box
        marginRight={betweenGap}
        style={{ borderRadius: size / 2, width: size, height: size, marginTop: size }}
        backgroundColor="onDefaultGlobalSurface"
      />
      <Box style={{ width: '95%' }}>{children}</Box>
    </Box>
  );
};
