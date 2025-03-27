import React from 'react';
import { Box, Typography } from '@hero-design/rn';
import { CustomFundLogo } from './CustomFundLogo';
import type { SwagSuperfund } from '../../../new-graphql/generated';

type SuperfundHeaderProps = {
  swagSuperfund: SwagSuperfund;
};

const SuperfundHeader = ({ swagSuperfund }: SuperfundHeaderProps) => {
  const { fundName, memberNumber, usi } = swagSuperfund;
  return (
    <Box
      backgroundColor="defaultGlobalSurface"
      borderBottomStartRadius="xxxlarge"
      borderBottomEndRadius="xxxlarge"
      flexDirection="column"
      display="flex"
      marginBottom="medium"
      padding="medium"
    >
      <Box flex={1}>
        <Typography.Title level="h3" testID="superfund-name-test-id" typeface="playful">
          {fundName}
        </Typography.Title>
      </Box>
      <Box flex={1} flexDirection="row" justifyContent="space-between" marginTop="small">
        <Typography.Body variant="small">{`Member number: ${memberNumber}`}</Typography.Body>
        <CustomFundLogo usi={usi} />
      </Box>
    </Box>
  );
};

export default SuperfundHeader;
