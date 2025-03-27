import React from 'react';
import { Box, useTheme } from '@hero-design/rn';

const UnCheckedRadio = () => {
  const { __hd__: heroDesign } = useTheme();

  return (
    <Box
      borderRadius="rounded"
      borderColor="primary"
      alignItems="center"
      justifyContent="center"
      style={{
        height: heroDesign.radio.sizes.circle,
        width: heroDesign.radio.sizes.circle,
        borderWidth: heroDesign.radio.borderWidths.circle,
      }}
    />
  );
};

const CheckedRadio = ({ testID }: { testID?: string }) => {
  const { __hd__: heroDesign } = useTheme();

  return (
    <Box
      testID={testID}
      borderRadius="rounded"
      borderColor="primary"
      alignItems="center"
      justifyContent="center"
      style={{
        height: heroDesign.radio.sizes.circle,
        width: heroDesign.radio.sizes.circle,
        borderWidth: heroDesign.radio.borderWidths.circle,
      }}
    >
      <Box
        borderRadius="rounded"
        backgroundColor="primary"
        style={{
          height: heroDesign.radio.sizes.innerCircle,
          width: heroDesign.radio.sizes.innerCircle,
        }}
      />
    </Box>
  );
};

export { UnCheckedRadio, CheckedRadio };
