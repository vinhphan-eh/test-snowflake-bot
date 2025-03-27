import React from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Box } from '@hero-design/rn';
import { StashAdCard } from '../../../../common/components/stash-ad-card';
import { useSalarySacrificeNavigation } from '../../hooks/useSalarySacrificeNavigation';
import type { TrackingAttributes } from '../../navigation/navigationTypes';

type BoostYourSuperTileProps = {
  image: ImageSourcePropType;
  trackingAttributes?: TrackingAttributes;
  disabled?: boolean;
};

const BoostYourSuperTile = ({ disabled = false, image, trackingAttributes }: BoostYourSuperTileProps) => {
  const { navigateToSalarySacrifice } = useSalarySacrificeNavigation(trackingAttributes);

  return (
    <Box paddingHorizontal="medium">
      <StashAdCard
        height={150}
        width={285}
        cta="Boost now"
        image={image}
        onPress={navigateToSalarySacrifice}
        title="Boost your super with salary sacrifice"
        disabled={disabled}
      />
    </Box>
  );
};

export default BoostYourSuperTile;
