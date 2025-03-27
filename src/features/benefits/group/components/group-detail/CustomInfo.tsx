import React from 'react';
import { Box, Typography } from '@hero-design/rn';

type CustomInfoProps = {
  header: string;
  footer: string;
  value: string;
  suffix: string;
};

export const CustomInfo = ({ footer, header, suffix, value }: CustomInfoProps) => {
  return (
    <Box flexDirection="column" alignItems="center">
      <Typography.Caption>{header}</Typography.Caption>
      <Box flexDirection="row" alignItems="flex-start">
        <Typography.Title testID="custom-info-value-test-id" level="h2" typeface="playful">
          {value}
        </Typography.Title>
        <Typography.Body typeface="playful" variant="small-bold">
          {suffix}
        </Typography.Body>
      </Box>
      <Typography.Caption>{footer}</Typography.Caption>
    </Box>
  );
};
