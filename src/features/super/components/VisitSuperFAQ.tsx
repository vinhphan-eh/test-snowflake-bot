import React from 'react';
import { Box, Typography, useTheme } from '@hero-design/rn';
import { InlineTextLink } from '../../../common/components/inline-text-link';
import {
  EMPLOYMENT_HERO_HELP_CENTER_LINK,
  REBRAND_EMPLOYMENT_HERO_HELP_CENTER_LINK,
} from '../../../common/constants/links';
import useBrandName from '../../../common/hooks/useBrandName';
import { useInAppBrowser } from '../../../common/shared-hooks/useInAppBrowser';
import { useSessionStore } from '../../../common/stores/useSessionStore';

export const VisitSuperFAQ = () => {
  const { openUrl } = useInAppBrowser();
  const { space } = useTheme();
  const brandName = useBrandName();
  const { swagTextAndImageRebrandEnabled } = useSessionStore();

  return (
    <Box marginTop="xlarge" style={{ alignItems: 'center' }}>
      <Typography.Body variant="small" style={{ marginBottom: space.small }}>
        {`Want to know more about Super in ${brandName}?`}
      </Typography.Body>
      <InlineTextLink
        variant="small"
        testID="visit-faqs-test-id"
        onPress={() =>
          openUrl(
            swagTextAndImageRebrandEnabled ? REBRAND_EMPLOYMENT_HERO_HELP_CENTER_LINK : EMPLOYMENT_HERO_HELP_CENTER_LINK
          )
        }
      >
        Visit our FAQs
      </InlineTextLink>
    </Box>
  );
};
