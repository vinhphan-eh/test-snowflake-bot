import React from 'react';
import { HeroPointsAdTile } from './HeroPointsAdTile';
import { BenefitsTabKeys, PillarIds } from '../../../common/constants/navigation';
import useStoreName from '../../../common/hooks/useStoreName';
import { switchPillar } from '../../../common/stores/useMiniAppSwitcherStore';
import ThemeSwitcher from '../../../common/utils/ThemeSwitcher';
import { useTracking } from '../hooks/useTracking';

export const TurnPointsToGiftCardsTile = ({ fillFullWidth }: { fillFullWidth: boolean }) => {
  const { trackClickTurnPointsToGiftCardsTile } = useTracking();
  const storeName = useStoreName();

  const onPressTile = () => {
    trackClickTurnPointsToGiftCardsTile();
    switchPillar({
      to: {
        pillarId: PillarIds.BenefitsApp,
        tab: BenefitsTabKeys.STORE,
      },
    });
  };

  return (
    <ThemeSwitcher name="eBens">
      <HeroPointsAdTile
        isLoading={false} // Not require any loading state at the moment
        onPressTile={onPressTile}
        accessibilityLabel="turn points to gift cards tile"
        thumbnailName="heroPointsAdTile2"
        title={`Turn your points into gift cards in the ${storeName} store`}
        description="Shop now"
        fillFullWidth={fillFullWidth}
      />
    </ThemeSwitcher>
  );
};
