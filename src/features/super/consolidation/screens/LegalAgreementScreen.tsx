import React, { useRef } from 'react';
import { Linking } from 'react-native';
import { Button } from '@hero-design/rn';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import BulletLine from '../../../../common/components/bullet-line';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import useBrandName from '../../../../common/hooks/useBrandName';
import { queryClient } from '../../../../common/libs/queryClient';
import { getEnvConfig } from '../../../../common/utils/env';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import { useCreateSuperConsolidationMutation, useGetSuperConsolidationQuery } from '../../../../new-graphql/generated';
import { useSuperConsolidationNavigation } from '../../hooks/useSuperConsolidationNavigation';
import { useSuperConsolidationTracking } from '../../tracks/useSuperConsolidationTracking';
import { ConsolidationLoadingBottomSheet } from '../components/ConsolidationLoadingBottomSheet';
import type { ConsolidationScreenRouteProp } from '../navigation/navigationTypes';

let timeOutAction: NodeJS.Timeout;

export const LegalAgreementScreen = () => {
  const { clickFindYourLostSuperInLegalAgreement } = useSuperConsolidationTracking();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const brandName = useBrandName();

  const route = useRoute<ConsolidationScreenRouteProp<'LegalAgreement'>>();
  const { mutateAsync: createSuperConsolidation } = useCreateSuperConsolidationMutation();
  const { navigateBack, navigateToCreateConsolidationFailed } = useSuperConsolidationNavigation();

  const { swagSuperfund, title: screenTitle } = route?.params || {};
  const url = swagSuperfund.superfundMetadata?.externalLink;
  const { fundName, memberNumber, usi } = swagSuperfund;

  const bsRef = useRef<BottomSheetRef>(null);

  const handleFindYourLostSuper = () => {
    clickFindYourLostSuperInLegalAgreement({
      usi,
      fundName,
    });
    bsRef.current?.open();
    timeOutAction = setTimeout(async () => {
      try {
        const payload = {
          memberNumber,
          usi,
          fundName,
        };

        await createSuperConsolidation({ input: payload });
        queryClient.invalidateQueries(useGetSuperConsolidationQuery.getKey({ usi: swagSuperfund?.usi || '' }));

        if (url) {
          const supported = await Linking.canOpenURL(url);
          // Do not open with default browser for e2e testing
          if (supported && getEnvConfig().IS_E2E !== 'true') {
            await Linking.openURL(url);
          }
          bsRef.current?.close();
          navigateToTopTabs('super-tab');
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
      <Page style={{ paddingBottom: bottomInset }}>
        <Page.Title>Before continuing, we just need to make sure you understand a few things.</Page.Title>
        <Page.Body>
          <BulletLine
            variant="regular"
            content={`You will be taken to the web portal of ${fundName} to complete your consolidation.`}
          />

          <BulletLine
            variant="regular"
            content={`${brandName} does not complete any part of the consolidation process. This process is completed by the trustee of ${fundName}.`}
          />

          <BulletLine
            variant="regular"
            content={`${brandName} has not provided any financial advice and you should seek your own elsewhere before consolidating`}
          />
        </Page.Body>

        <Page.Footer>
          <Button
            rightIcon="external-link"
            onPress={handleFindYourLostSuper}
            text="Find your lost super"
            intent="primary"
            accessibilityLabel="Find your lost super"
          />
        </Page.Footer>

        <ConsolidationLoadingBottomSheet onDismiss={cleanupTimeout} bsRef={bsRef} fundName={fundName} />
      </Page>
    </>
  );
};
