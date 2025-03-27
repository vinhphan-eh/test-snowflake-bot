import React, { useRef } from 'react';
import { Linking } from 'react-native';
import { Button, useTheme } from '@hero-design/rn';
import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import type { DataCardItem } from '../../../../common/components/data-card';
import { DataCard } from '../../../../common/components/data-card';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { DISPLAY_FORMAT } from '../../../../common/constants/date';
import { getEnvConfig } from '../../../../common/utils/env';
import { useSuperConsolidationNavigation } from '../../hooks/useSuperConsolidationNavigation';
import { useSuperConsolidationTracking } from '../../tracks/useSuperConsolidationTracking';
import { ConsolidationLoadingBottomSheet } from '../components/ConsolidationLoadingBottomSheet';
import type { ConsolidationScreenRouteProp } from '../navigation/navigationTypes';

const formatDate = (date: string) => {
  try {
    return dayjs(new Date(date)).format(DISPLAY_FORMAT);
  } catch {
    return '';
  }
};

let timeOutAction: NodeJS.Timeout;

export const FindYourLostSuperScreen = () => {
  const { clickVisitFundWebsiteInFindYourLostSuper } = useSuperConsolidationTracking();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { navigateBack, navigateToCreateConsolidationFailed } = useSuperConsolidationNavigation();
  const route = useRoute<ConsolidationScreenRouteProp<'FindYourLostSuper'>>();

  const { fundUrl, superConsolidation, title: screenTitle } = route?.params || {};
  const fundName = superConsolidation.fundName || '';
  const usi = superConsolidation.usi || '';

  const { colors } = useTheme();

  const consolidationDataCard: DataCardItem[] = [
    {
      label: 'Fund',
      content: fundName,
    },
    {
      label: 'Request date',
      content: superConsolidation.createdAt ? formatDate(superConsolidation.createdAt) : '',
    },
  ];

  const bsRef = useRef<BottomSheetRef>(null);

  const handleVisitFundWebsite = async () => {
    bsRef.current?.open();
    clickVisitFundWebsiteInFindYourLostSuper({
      fundName,
      usi,
      fundUrl,
    });
    timeOutAction = setTimeout(async () => {
      try {
        if (fundUrl) {
          const supported = await Linking.canOpenURL(fundUrl);
          if (supported && getEnvConfig().IS_E2E !== 'true') {
            await Linking.openURL(fundUrl);
          }
          bsRef.current?.close();
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          navigateToCreateConsolidationFailed({
            errorMessage: error.message || 'failed to create super consolidation',
            fundName,
            usi,
          });
        }
      }
    }, 2000);
  };

  const cleanupTimeout = () => {
    if (timeOutAction) {
      clearTimeout(timeOutAction);
    }
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar hideRight onBack={navigateBack} title={screenTitle} />
      <Page
        keyboardShouldPersistTaps="handled"
        style={{ paddingBottom: bottomInset, backgroundColor: colors.defaultSurface }}
      >
        <Page.Body marginTop="large">
          <DataCard hideIcon data={consolidationDataCard} />
        </Page.Body>

        <Page.Footer>
          <Button
            rightIcon="external-link"
            onPress={handleVisitFundWebsite}
            text="Visit fund website"
            intent="primary"
            accessibilityLabel="Visit fund website"
          />
        </Page.Footer>
        <ConsolidationLoadingBottomSheet onDismiss={cleanupTimeout} bsRef={bsRef} fundName={fundName} />
      </Page>
    </>
  );
};
