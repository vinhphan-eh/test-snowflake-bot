import React from 'react';
import { Box, Icon, Typography } from '@hero-design/rn';

type SavingInfoProps = {
  range: string;
  period: string;
};

export const SavingInfo = ({ period, range }: SavingInfoProps) => {
  return (
    <Box flexDirection="row" alignItems="center">
      <Icon intent="primary" icon="goal-outlined" size="xsmall" />
      <Box marginLeft="small">
        <Typography.Caption intent="primary" fontWeight="semi-bold">
          {`${range.substring(0, range.length - 1)}${range.charAt(range.length - 1)} ${period}`}
        </Typography.Caption>
      </Box>
    </Box>
  );
};
