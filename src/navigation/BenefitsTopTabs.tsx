import React, { useEffect, useRef, useState } from 'react';
import { Box, Spinner, Tabs } from '@hero-design/rn';
import { useIsFocused } from '@react-navigation/native';
import { addBreadcrumb } from '@sentry/react-native';
import { topTabUtils } from './utils';
import { useEbenTokenValidForQuery } from '../common/auth/store/ebenTokenStore';
import { useGetSuperAppToken } from '../common/auth/store/useSuperAppTokenStore';
import { BenefitsTabKeys } from '../common/constants/navigation';
import { useHandlePendingDeepLink } from '../common/deep-link/useHandlePendingDeepLink';
import { useIsCountrySupportedBenefits } from '../common/hooks/useIsCountrySupported';
import { useIsWorkzone } from '../common/hooks/useIsWorkzone';
import { useMixpanel } from '../common/hooks/useMixpanel';
import { useHandlePendingOpenedNotification } from '../common/notification/useHandlePendingOpenedNotification';
import { setReadyToSwitchTab } from '../common/stores/useMiniAppSwitcherStore';
import { useTopTabStore } from '../common/stores/useTopTabStore';
import { humanize } from '../common/utils/string';
import ThemeSwitcher from '../common/utils/ThemeSwitcher';
import type { BenefitsTabKeysType } from '../features/benefits/common/hooks/useBenefitsTabs/constants';
import { useBenefitsTabs } from '../features/benefits/common/hooks/useBenefitsTabs/useBenefitsTabs';
import { BenefitsComingSoonScreen } from '../features/benefits/common/screens/BenefitsComingSoonScreen';

import { useCountryPicker } from '../providers/CountryPickerProvider/useCountryPicker';

export const BenefitsTopTabs = () => {
  const usePickCountry = useRef(false);
  const { setReady: setDeeplinkReady } = useHandlePendingDeepLink(false);
  const { setReady: setNotiReady } = useHandlePendingOpenedNotification(false);
  const [selectedTabKey, setSelectedTabKey] = useState<BenefitsTabKeysType>(BenefitsTabKeys.NONE);
  const { token: superAppToken } = useGetSuperAppToken('BenefitsTopTabs');
  const isWorkZone = useIsWorkzone();

  const { isCountrySupported, isFetched: isFetchedCountry } = useIsCountrySupportedBenefits();

  const isEbenTokenValid = useEbenTokenValidForQuery();
  const countryPicker = useCountryPicker();
  const { isFetched: isFetchedTab, specialPillarAccess, tabs } = useBenefitsTabs();

  const isFetched = isFetchedCountry && isFetchedTab;

  const { screenTracking } = useMixpanel();

  const tabKeyPrevious = useRef(selectedTabKey);
  const isFocused = useIsFocused();
  const isFocusedPrevious = useRef(isFocused);

  useEffect(() => {
    return () => {
      // clear after unmount
      useTopTabStore.setState({
        selectedTab: undefined,
      });
    };
  }, []);

  useEffect(() => {
    if (tabKeyPrevious.current !== selectedTabKey || isFocusedPrevious.current !== isFocused) {
      if (selectedTabKey !== BenefitsTabKeys.NONE && isFocused) {
        screenTracking({
          event: `Visit ${humanize(selectedTabKey)} tab`,
          categoryName: 'user action',
          metaData: { module: 'Benefits pillar' },
        });
        addBreadcrumb({
          category: 'tab',
          type: 'navigation',
          message: 'selected tab',
          data: { previousTab: tabKeyPrevious.current, currentTab: selectedTabKey },
        });
      }

      tabKeyPrevious.current = selectedTabKey;
      isFocusedPrevious.current = isFocused;
    }
  }, [selectedTabKey, screenTracking, isFocused]);

  useEffect(() => {
    topTabUtils.initBenefitsSelectTab(setSelectedTabKey, isWorkZone);
    return () => {
      topTabUtils.setSelectedBenefitsTab = undefined;
    };
  }, [isWorkZone]);

  useEffect(() => {
    if (selectedTabKey === BenefitsTabKeys.NONE && tabs.length > 0 && isFetched) {
      setSelectedTabKey(tabs[0].key as BenefitsTabKeysType);
      setReadyToSwitchTab(true);
      setDeeplinkReady(true);
      setNotiReady(true);
    }
  }, [isFetched, selectedTabKey, tabs]);

  useEffect(() => {
    if (tabs.length === 0) {
      return;
    }
    // because when coming screen appear, selectedTabKey is Settings as default
    // so gotta jump back to first tab after select valid country
    // not happening on real super app, just mimic
    if (usePickCountry.current && isCountrySupported && selectedTabKey !== BenefitsTabKeys.NONE && tabs.length > 1) {
      // prevent it from running again
      usePickCountry.current = false;
      setSelectedTabKey(tabs[0].key as BenefitsTabKeysType);
    }
    // cover for disappearing tabs
    if (selectedTabKey !== BenefitsTabKeys.NONE && !tabs.some(e => e.key === selectedTabKey)) {
      setSelectedTabKey(tabs[0].key as BenefitsTabKeysType);
    } else if (selectedTabKey !== BenefitsTabKeys.NONE) {
      useTopTabStore.setState({
        selectedTab: selectedTabKey,
      });
    }
  }, [tabs, selectedTabKey, isCountrySupported]);

  // #region render, don't change order
  // loading tabs permission
  if (!selectedTabKey || !superAppToken || !isFetched || !isEbenTokenValid) {
    return (
      <Box style={{ flex: 1 }} backgroundColor="neutralGlobalSurface">
        <Spinner testID="spinner" />
      </Box>
    );
  }

  // only show coming soon when country is supported and don't have special access to pillar
  if (!isCountrySupported && !specialPillarAccess) {
    return (
      <ThemeSwitcher name="eBens">
        <BenefitsComingSoonScreen
          openCountrySelector={() => {
            usePickCountry.current = true;
            countryPicker.open();
          }}
        />
      </ThemeSwitcher>
    );
  }

  return (
    <Tabs.Scroll
      containerStyle={{ flex: 1 }}
      barStyle={{ backgroundColor: 'white' }}
      onTabPress={newTabKey => setSelectedTabKey(newTabKey as BenefitsTabKeysType)}
      selectedTabKey={selectedTabKey}
      tabs={tabs}
      lazy
      lazyPreloadDistance={3}
    />
  );
  // #endregion
};
