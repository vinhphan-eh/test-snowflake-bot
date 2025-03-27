import React from 'react';
import { Box } from '@hero-design/rn';

type PageBodyProps = React.ComponentProps<typeof Box>;

const PageBody = ({ children, ...boxProps }: PageBodyProps) => (
  <Box flex={1} {...boxProps}>
    {children}
  </Box>
);

export default PageBody;
