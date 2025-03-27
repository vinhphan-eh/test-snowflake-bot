import React, { useState } from 'react';
import { Alert, Box, Button, Typography, useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetSuperAppToken } from '../../../../common/auth/store/useSuperAppTokenStore';
import type { DataCardItem } from '../../../../common/components/data-card';
import { DataCard } from '../../../../common/components/data-card';
import { Page } from '../../../../common/components/layout/page';
import { OverlayLoadingScreen } from '../../../../common/components/spinner';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { formatToBSBValue } from '../../../../common/utils/numbers';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import {
  EventLogKind,
  useSavePayAccountMutation,
  useStoreEventMutation,
  type SavePayAccountMutation,
  type SavePayAccountMutationVariables,
} from '../../../../new-graphql/generated';
import { useCheckExistingCard } from '../../../spend-account/hooks/useCheckExistingCard';
import { SUBMIT_PAY_SPLIT_EVENT } from '../constants/trackingEvents';
import { useInitPaySplitFlowStore } from '../hooks/useInitPaySplitFlowStore';
import { PaySplitTestingGroup, usePaySplitABTesting } from '../hooks/usePaySplitABTesting';
import type { Allocation } from '../hooks/usePaySplitFlowStore';
import { usePaySplitFlowStore } from '../hooks/usePaySplitFlowStore';
import type { PaySplitTrackingParams } from '../hooks/useTrackPaySplitABTesting';
import { useTrackPaySplitABTesting } from '../hooks/useTrackPaySplitABTesting';
import type { PaySplitRouteProp, PaySplitScreenNavigationProp } from '../navigation/navigationTypes';
import { PaySplitIntroEntryPoint } from '../navigation/navigationTypes';

interface OrgListController {
  isConfirmDisabled: boolean;
  isSubmitting: boolean;

  getList(): Allocation[];

  onBack(): void;

  onConfirm(): void;

  onEdit(a: Allocation): void;

  formatWallet(): string;

  getNonEditableLabel(): string;
}

const useOrgListController = (): OrgListController => {
  const navigation = useNavigation<PaySplitScreenNavigationProp<'PaySplitOrgList'>>();
  const store = usePaySplitFlowStore();
  const { token } = useGetSuperAppToken('useOrgListController');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync } = useSavePayAccountMutation();
  const { mutateAsync: eventLog } = useStoreEventMutation();

  const { testingGroup } = usePaySplitABTesting();

  const { trackEvent } = useTrackPaySplitABTesting();

  const logEvents = async (requests: SavePayAccountMutationVariables[]) => {
    try {
      await Promise.all(
        requests.map(r =>
          eventLog({
            input: {
              kind: EventLogKind.Paysplit,
              payload: [
                {
                  key: 'split',
                  value: r.input.bankSplitType,
                },
              ],
            },
          })
        )
      );
    } catch (e) {
      // do not break the flow for an error here
    }
  };

  return {
    isSubmitting,

    onConfirm: async () => {
      if (!token) {
        return;
      }
      setIsSubmitting(true);
      let isSuccessfullySubmitted: boolean;
      const requests = store.getPayAccountRequests(token);
      try {
        const result: SavePayAccountMutation[] = await Promise.all(requests.map(r => mutateAsync(r)));
        if (result) {
          logEvents(requests);
        }
        isSuccessfullySubmitted = true;
        navigation.navigate('PaySplitOutcome');
      } catch (e) {
        isSuccessfullySubmitted = false;
        navigation.navigate('PaySplitError');
      } finally {
        const data2TrackByOrg: PaySplitTrackingParams[] = store
          .getAllocations()
          .filter(allocation => allocation.isChanged)
          .map(allocation => {
            return {
              isSuccessfullySubmitted,
              targetOrgId: allocation.membership.orgId,
              targetMemberId: allocation.membership.memberId,
              splitType: allocation.type,
              splitValue: allocation.amount,
            };
          });
        data2TrackByOrg.forEach(data2Track => {
          trackEvent(SUBMIT_PAY_SPLIT_EVENT, data2Track);
        });
      }
    },

    onEdit: (a: Allocation) => {
      store.startEditing(a);
      if (testingGroup === PaySplitTestingGroup.C && store.getOptions().isPercentageEnabled()) {
        navigation.navigate('PaySplitPercentageAllocation');
        return;
      }
      navigation.navigate('PaySplitSelectAllocation');
    },

    getList: () => Object.values(store.allocations),

    formatWallet: (): string => {
      const w = store.data.eWallet;
      return `${w.name}\n${formatToBSBValue(w.bsb)} ${w.accountNumber}`;
    },

    getNonEditableLabel: (): string =>
      store.allocations
        .filter(a => !a.isEditable)
        .map(a => a.membership.orgName)
        .reduce((a, b) => (!a ? b : `${a}, ${b}`), ''),

    onBack: () => navigateToTopTabs('spend-tab'),
    isConfirmDisabled: !store.isChangePending(),
  };
};

const PaySplitOrgListScreen = () => {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const controller = useOrgListController();
  const navigation = useNavigation<PaySplitScreenNavigationProp<'PaySplitOrgList'>>();
  const route = useRoute<PaySplitRouteProp<'PaySplitOrgList'>>() || {};
  const { isOnboarding } = route.params || {};

  const { isLoading } = useInitPaySplitFlowStore(navigation);
  const { isCardNotFound } = useCheckExistingCard();
  const { space } = useTheme();

  const [showAlert, setShowAlert] = React.useState(true);

  const closeAlert = () => {
    setShowAlert(false);
  };

  const splitDetail = (a: Allocation): DataCardItem[] =>
    !a.isAssigned && !a.isChanged
      ? []
      : [
          {
            label: 'Depositing each pay cycle',
            content: a.formatAmount(),
          },
          {
            label: 'To this account',
            content: controller.formatWallet(),
          },
        ];

  const displayOptions = () =>
    controller.getList().map(a => (
      <DataCard
        key={a.membership.orgId}
        data={[
          {
            label: 'Employer',
            content: a.membership.orgName,
          },
          ...splitDetail(a),
        ]}
        onPress={() => controller.onEdit(a)}
        style={{ marginBottom: space.medium }}
        disabled={!a.isEditable}
        testID={`dataCardOrgId=${a.membership.orgId}`}
      />
    ));

  const nonEditableLabel = controller.getNonEditableLabel();
  const warningMessage = `You’ve allocated all (100%) of your pay to your Swag Spend account for ${nonEditableLabel}. To make any changes go to your Employment Hero HR login.`;
  const warning = () =>
    nonEditableLabel && showAlert ? (
      <Box marginBottom="medium" testID="oneHundredPercentWarning">
        <Alert intent="warning" content={warningMessage} onClose={closeAlert} />
      </Box>
    ) : null;

  const onIntroPressed = () => {
    navigation.navigate('PaySplitStack', {
      screen: 'PaySplitIntro',
      params: { entryPoint: PaySplitIntroEntryPoint.OrgListSCreenInfoBtn },
    });
  };

  const skipToCardSetup = () => {
    navigation.navigate('CardSetupStack', {
      screen: 'PinSetupStack',
      params: {
        screen: 'ChoosePin',
        params: {
          header: 'Card set-up',
          title: 'Choose a secure 4 digit PIN for your card.',
          repeatedPinScreen: {
            header: 'Card set-up',
            title: 'Repeat your PIN.',
            onPinVerifiedSuccess: newPin => {
              navigation.navigate('CardSetupStack', {
                screen: 'Confirmation',
                params: { pin: newPin, isInOnboardingFlow: true },
              });
            },
          },
        },
      },
    });
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar onBack={controller.onBack} title="Pay Split" onRightPress={onIntroPressed} iconRight="circle-info" />
      <Page style={{ paddingBottom: bottomInset }}>
        <Page.Title>Get paid into your Swag Spend account with Pay Split</Page.Title>
        <Page.Body>
          <Typography.Body variant="regular" style={{ marginBottom: space.smallMedium }}>
            Select an employer.
          </Typography.Body>
          <Box>
            {warning()}
            {displayOptions()}
          </Box>
        </Page.Body>
        <Page.Footer>
          {isOnboarding && isCardNotFound && (
            <Button
              style={{ marginBottom: space.medium }}
              intent="secondary"
              onPress={skipToCardSetup}
              accessibilityLabel="I'll do this later"
              variant="outlined"
              text="I'll do this later"
            />
          )}
          <Button
            onPress={controller.onConfirm}
            loading={controller.isSubmitting}
            accessibilityLabel="Confirm"
            disabled={controller.isConfirmDisabled}
            text="Confirm"
          />
        </Page.Footer>
      </Page>
      {isLoading && <OverlayLoadingScreen />}
    </>
  );
};

export { PaySplitOrgListScreen };
