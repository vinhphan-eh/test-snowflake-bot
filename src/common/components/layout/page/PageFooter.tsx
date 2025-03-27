import React from 'react';
import { Box } from '@hero-design/rn';

type PageFooterProps = React.ComponentProps<typeof Box>;

const PageFooter = ({ children, ...boxProps }: PageFooterProps) => <Box {...boxProps}>{children}</Box>;

export default PageFooter;
