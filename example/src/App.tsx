import {
  SwagPersonalRootProvider,
  swagPersonalSetTopLevelNavigator,
  switchPillar,
} from '@ehrocks/react-native-swag-personal-app';
import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-pluralrules/polyfill';
import {
  HeroDesignProvider,
  getTheme,
  swagLightSystemPalette,
} from '@hero-design/rn';
import '@formatjs/intl-pluralrules/locale-data/en';
import { NavigationContainer } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DevSettings, Linking } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { PermissionData } from '../../src/common/stores/usePermissionStore';
import { useAppSwitcherStore } from './common/app-switcher/store/useAppSwitcher';
import { useKeyPayTokenStore } from './common/auth/store/kpAccessTokenStore';
import { useSessionTokenStore } from './common/auth/store/sessionTokenStore';
import { useSwagUserStore } from './common/auth/store/swagUserStore';
import MainNavigator from './super-app-navigation/MainNavigation';

import Config from 'react-native-config';
import type { BenefitsTabKeysType } from '../../src/features/benefits/common/hooks/useBenefitsTabs/constants';
import type { TabKeysType } from '../../src/navigation/TopTabsNavigator';
import BrazeManager from './features/braze/BrazeManager';
import { useMimicBrazeStore } from './features/braze/useMimicBrazeStore';
import './react-native-debugger';
import { PillarIds } from './super-app-navigation/constants';

export default function App() {
  const [darkmode, setDarkmode] = useState(false);
  const isShowingAppSwitcher = useAppSwitcherStore(state => state.isShowing);
  const toggleAppSwitcher = useAppSwitcherStore(state => state.toggle);
  const sessionToken = useSessionTokenStore(state => state.sessionToken);
  const kpAccessToken = useKeyPayTokenStore(state => state.accessToken);
  const swagUserType = useSwagUserStore(state => state.swagUserType);
  const currentUser = useSwagUserStore(state => state.currentUser);
  const curentOrgId = useSwagUserStore(state => state.currentOrgId);
  const memberId = useSwagUserStore(state => state.memberId);
  const setPillar = useAppSwitcherStore(state => state.setPillar);
  const curentOrgUuid = useSwagUserStore(state => state.currentOrgUuid);
  const contentCards = useMimicBrazeStore(state => state.cards);
  const workzoneCountryCode = useSwagUserStore(
    state => state.workzoneCountryCode,
  );

  useEffect(() => {
    if (__DEV__) {
      DevSettings.addMenuItem('(*) Dark Mode', () => {
        setDarkmode(true);
      });
      DevSettings.addMenuItem('(*) Light Mode', () => {
        setDarkmode(false);
      });
    }
  }, []);

  const brazeManager = {
    contentCards,
    requestContentCardsRefresh: BrazeManager.requestContentCardsRefresh,
  };

  const appLogout = () => {};

  // mock passcode validate
  const passcodeValidate = ({
    inputPasscode = '',
    onSucceededPasscode = () => {},
    onFailedPasscode = () => {},
    onSucceededBiometric = () => {},
    onFailedBiometric = () => {},
  }) => {
    if (inputPasscode === '111111') {
      return onSucceededBiometric?.();
    }
    if (inputPasscode === '222222') {
      return onSucceededPasscode();
    }
    if (inputPasscode === '3333333') {
      return onFailedBiometric?.();
    }
    return onFailedPasscode();
  };

  const mixpanelTracking = {
    eventTracking: () => {},
    screenTracking: () => {},
  };

  const handleFeedbackPrompt = () => {};
  const handleInternalRatingPrompt = () => {};

  const superAppTokenUtils = {
    fetchValidSuperAppToken: () => {
      return Promise.resolve({
        token: sessionToken || kpAccessToken,
        loginProvider: currentUser.loginProvider,
        reason: 'mimic app',
      });
    },
    isSuperAppTokenExpired: () => false,
    freshSuperAppToken: sessionToken || kpAccessToken,
  };

  // used for testing only
  const overridePermission = {
    // hardcoded permission could lead to e2e failure, please use it carefully
    instapay2Alpha: {
      view: true,
    },
    toggleMegaDealsMvpCta: {
      view: true,
    },
    toggleMegaDealsCommunitiesCtas: {
      view: true,
    },
    instapayEstimatedIncome: {
      view: true,
    },
  } as unknown as PermissionData;

  const getEnvironmentConfig = useCallback(() => Config, []);

  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const { url } = event;

      const [scheme, path] = url.split('://');
      const [pillar, tab] = path.split('/');
      if (scheme !== 'swagpersonalappexample') {
        return;
      }
      if (pillar === 'benefits') {
        switchPillar({
          to: {
            pillarId: PillarIds.BENEFITS_APP,
            tab: tab as BenefitsTabKeysType,
          },
        });
      } else if (pillar === 'wallet') {
        switchPillar({
          to: {
            pillarId: PillarIds.WALLET_APP,
            tab: tab as TabKeysType,
          },
        });
      }
    };

    Linking.addEventListener('url', handleDeepLink);

    return () => {
      Linking.removeAllListeners('url');
      BrazeManager.cleanUp();
    };
  }, []);

  const swagLightTheme = useMemo(
    () => getTheme(undefined, swagLightSystemPalette),
    [],
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroDesignProvider theme={swagLightTheme}>
        <NavigationContainer ref={swagPersonalSetTopLevelNavigator}>
          <SafeAreaProvider>
            <SwagPersonalRootProvider
              appSwitcherVisibility={isShowingAppSwitcher}
              setAppSwitcherVisibility={toggleAppSwitcher}
              superAppLogout={appLogout}
              currentUser={currentUser}
              passcodeValidate={passcodeValidate}
              swagUserType={swagUserType}
              currentOrgId={curentOrgId}
              memberId={memberId}
              workzoneCountryCode={workzoneCountryCode}
              currentOrgUuid={curentOrgUuid}
              setPillar={setPillar as any}
              mixpanelTracking={mixpanelTracking}
              handleFeedbackPrompt={handleFeedbackPrompt}
              handleInternalRatingPrompt={handleInternalRatingPrompt}
              overridePermissionForTESTING_ONLY={overridePermission}
              kpMetadatalite={[
                {
                  partnerId: 1,
                  brandId: 1,
                  businessId: 1,
                  employeeId: 1,
                },
              ]}
              brazeManager={brazeManager}
              superAppTokenUtils={superAppTokenUtils}
              swagTextAndImageRebrandEnabled={Config.IS_E2E ? false : true}
              swagRebrandEnabled={true}
              darkModeEnabled={darkmode}
              getEnvironmentConfig={getEnvironmentConfig}>
              <MainNavigator />
            </SwagPersonalRootProvider>
          </SafeAreaProvider>
        </NavigationContainer>
      </HeroDesignProvider>
    </GestureHandlerRootView>
  );
}
