import React from 'react';
import { Badge, Box, Typography } from '@hero-design/rn';
import type { BoxProps } from '@hero-design/rn/types/components/Box';

type StepInstructionProps = {
  data: Array<string>;
} & BoxProps;

export const StepInstruction = ({ data, ...boxProps }: StepInstructionProps) => {
  return (
    <Box {...boxProps}>
      {data.map((element, index) => {
        const moreThanOneLine = element.length > 40;
        return (
          <Box
            alignItems={moreThanOneLine ? 'flex-start' : 'center'}
            marginBottom="medium"
            key={element}
            flexDirection="row"
          >
            <Badge content={index + 1} intent="primary" style={{ marginRight: 4 }} />
            <Typography.Body variant="small" style={{ marginTop: moreThanOneLine ? -4 : 0 }}>
              {element}
            </Typography.Body>
          </Box>
        );
      })}
    </Box>
  );
};
