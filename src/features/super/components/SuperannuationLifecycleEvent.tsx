import React from 'react';
import { Box } from '@hero-design/rn';
import images from '../../../common/assets/images';
import { AdCard } from '../../../common/components/ad-card';
import type { LifecycleEvent } from '../../../new-graphql/generated';
import { useSuperNavigation } from '../hooks/useSuperNavigation';

interface SuperannuationLifecycleEventProps {
  data?: LifecycleEvent;
}

export const SuperannuationLifecycleEvent = ({ data }: SuperannuationLifecycleEventProps) => {
  const { navigateToEventDetails } = useSuperNavigation();

  if (!data) {
    return null;
  }

  const onPressReview = async () => {
    navigateToEventDetails(data);
  };

  return (
    <Box paddingHorizontal="medium" marginBottom="medium">
      <AdCard
        backgroundColor="decorativePrimarySurface"
        title="Tell your fund you're moving employers"
        cta="Review"
        ctaAccessibilityLabel="Review"
        onPressCta={onPressReview}
        image={images.superLifecycleEvent}
      />
    </Box>
  );
};
