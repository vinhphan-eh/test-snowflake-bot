import React from 'react';
import { Box } from '@hero-design/rn';
import images from '../../../common/assets/images';
import { AdCard } from '../../../common/components/ad-card';
import useBrandName from '../../../common/hooks/useBrandName';
import { useSeenSuperIntro } from '../hooks/useSeenSuperIntro';
import { useSuperNavigation } from '../hooks/useSuperNavigation';

export const SuperannuationAd = () => {
  const { hasUserSeenThis: hasUserSeenSuperIntro } = useSeenSuperIntro();
  const { navigateToActiveMembership, navigateToSuperIntro } = useSuperNavigation();
  const brandName = useBrandName();

  const onPressLearnMore = async () => {
    const seenSuperIntro = await hasUserSeenSuperIntro();
    if (seenSuperIntro) {
      navigateToActiveMembership();
    } else {
      navigateToSuperIntro();
    }
  };

  return (
    <Box paddingHorizontal="medium">
      <AdCard
        title="Put the Super in Superannuation"
        description={`Connect your superannuation to ${brandName}`}
        cta="Learn more"
        ctaAccessibilityLabel="Learn more"
        onPressCta={onPressLearnMore}
        image={images.superAd}
      />
    </Box>
  );
};
