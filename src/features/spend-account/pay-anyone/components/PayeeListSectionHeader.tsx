import React from 'react';
import { Box, Typography } from '@hero-design/rn';

interface PayeeListSectionHeaderProps {
  letter: string;
}

const PayeeListSectionHeader = ({ letter }: PayeeListSectionHeaderProps) => {
  return (
    <Box
      paddingVertical="small"
      paddingHorizontal="medium"
      backgroundColor="neutralGlobalSurface"
      flex={1}
      flexDirection="row"
      justifyContent="space-between"
      accessibilityLabel="payee-list-section-header"
    >
      <Typography.Body variant="small">{letter}</Typography.Body>
    </Box>
  );
};

export { PayeeListSectionHeader };
