import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { HeroPointsAdTile } from './HeroPointsAdTile';
import ThemeSwitcher from '../../../common/utils/ThemeSwitcher';
import type { RootStackNavigationProp } from '../../../navigation/navigationTypes';
import { useIntl } from '../../../providers/LocalisationProvider';
import { useConditionalNavigateOnboardingFlow } from '../../spend-account/hooks/useConditionalNavigateOnboardingFlow';
import { useTracking } from '../hooks/useTracking';

export const PayWithHeroPointsTile = () => {
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const { isLoading: isLoadingOnboarding, nextScreenNavigateParams } = useConditionalNavigateOnboardingFlow()();
  const { formatMessage } = useIntl();

  const { trackClickOpenSpendAccountToPayWithHeroPointsTile } = useTracking();

  const onOpenOnboardingFlow = () => {
    trackClickOpenSpendAccountToPayWithHeroPointsTile();
    if (nextScreenNavigateParams) {
      navigation.navigate(...nextScreenNavigateParams);
    } else {
      navigation.navigate('OnboardingStack', { screen: 'Dashboard' });
    }
  };

  return (
    <ThemeSwitcher name="wallet">
      <HeroPointsAdTile
        isLoading={isLoadingOnboarding}
        onPressTile={onOpenOnboardingFlow}
        thumbnailName="heroPointsAdTile1"
        accessibilityLabel="pay with hero points tile"
        title={formatMessage({ id: 'points.openSpendAccount' })}
        description="Learn more"
      />
    </ThemeSwitcher>
  );
};
