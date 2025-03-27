import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { GeneralError } from '../../../common/components/error';
import { switchPillar } from '../../../common/stores/useMiniAppSwitcherStore';
import { useSessionStore } from '../../../common/stores/useSessionStore';
import type { ThemeName } from '../../../common/types/hero-design';
import ThemeSwitcher from '../../../common/utils/ThemeSwitcher';
import { useIntl } from '../../../providers/LocalisationProvider';
import { useSSOTracking } from '../hooks/useSSOTracking';
import type { SSOScreenRouteProp } from '../navigation/navigationTypes';

export const SSOErrorScreen = () => {
  const Intl = useIntl();
  const route = useRoute<SSOScreenRouteProp<'SSOError'>>();
  const { trackClickBackToSwag, trackVisitSSOScreen } = useSSOTracking();
  const { pillar } = route.params;
  const themeName: ThemeName = pillar === 'BenefitsApp' ? 'eBens' : 'wallet';
  const isRebrand = useSessionStore().swagTextAndImageRebrandEnabled;
  const ctaText = isRebrand
    ? Intl.formatMessage({ id: 'sso.backToDashboard' })
    : Intl.formatMessage({ id: 'sso.backToSwag' });

  useEffect(() => {
    trackVisitSSOScreen();
  }, []);

  return (
    <ThemeSwitcher name={themeName}>
      <GeneralError
        variant="full-screen"
        title={Intl.formatMessage({ id: 'sso.ssoIsRequiredToAccessThisFeature' })}
        themeName={themeName}
        ctaText={ctaText}
        onCtaPress={() => {
          trackClickBackToSwag();
          switchPillar({
            to: {
              pillarId: 'SwagApp',
            },
          });
        }}
      />
    </ThemeSwitcher>
  );
};
