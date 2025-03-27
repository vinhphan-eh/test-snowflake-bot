import React, { useMemo, useRef } from 'react';
import { Box, Icon, List, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { PaySplitType } from '../../../../new-graphql/generated';
import type { PaySplitConfirmBottomSheetRef } from '../components/PaySplitConfirmBottomSheet';
import { PaySplitConfirmBottomSheet } from '../components/PaySplitConfirmBottomSheet';
import { SELECT_ALL_OF_PAY } from '../constants/trackingEvents';
import { PaySplitTestingGroup, usePaySplitABTesting } from '../hooks/usePaySplitABTesting';
import { usePaySplitFlowStore } from '../hooks/usePaySplitFlowStore';
import { useTrackPaySplitABTesting } from '../hooks/useTrackPaySplitABTesting';
import type { PaySplitScreenNavigationProp } from '../navigation/navigationTypes';

export const PaySplitSelectAllocationScreen = () => {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const navigation = useNavigation<PaySplitScreenNavigationProp<'PaySplitSelectAllocation'>>();
  const store = usePaySplitFlowStore();
  const confirmAllocateAllBottomSheet = useRef<PaySplitConfirmBottomSheetRef>(null);
  const { space } = useTheme();

  const options = useMemo(() => store.getOptions(), []);
  const { isAllMyPayEnabled, isDollarEnabled, isPercentageEnabled } = options;

  const { testingGroup } = usePaySplitABTesting();

  const { trackEvent } = useTrackPaySplitABTesting();

  const onBack = (): void => {
    navigation.goBack();
  };
  const onSelectDollar = (): void => {
    store.edit({ type: PaySplitType.FixedAmount, amount: 0 });
    navigation.navigate('PaySplitDollarAllocation');
  };
  const onSelectPercentage = (): void => {
    store.edit({ type: PaySplitType.Percentage, amount: 100 });

    if (testingGroup === PaySplitTestingGroup.C) {
      navigation.navigate('PaySplitPercentageInput');
      return;
    }
    navigation.navigate('PaySplitPercentageAllocation');
  };

  const onSelectAllocateAll = () => {
    confirmAllocateAllBottomSheet.current?.open();
  };

  const onConfirmAllocateAll = () => {
    if (store.active) {
      trackEvent(SELECT_ALL_OF_PAY, {
        targetOrgId: store.active.membership.orgId,
        targetMemberId: store.active.membership.memberId,
      });
    }

    store.edit({ type: PaySplitType.Percentage, amount: 100 });
    store.finishEditing();
    navigation.navigate('PaySplitOrgList');
    confirmAllocateAllBottomSheet.current?.close();
  };

  const employer = store.active?.membership.orgName || '[Error]';

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar title="Pay Split" hideRight onBack={onBack} />
      <Page style={{ paddingBottom: bottomInset }}>
        <Page.Title>How would you like to split your pay from {employer}?</Page.Title>
        <Page.Body />
        <Page.Footer>
          {isAllMyPayEnabled() ? (
            <Box key="all-my-pay">
              <List.Item
                variant="card"
                testID="allocateAll"
                title={
                  <Typography.Body variant="regular" style={{ marginLeft: space.smallMedium }}>
                    All of my pay!
                  </Typography.Body>
                }
                suffix={<Icon icon="arrow-right" intent="primary" />}
                onPress={onSelectAllocateAll}
              />
            </Box>
          ) : null}
          {isPercentageEnabled() ? (
            <Box key="percentage" marginTop="medium">
              <List.Item
                variant="card"
                testID="allocPc"
                title={
                  <Typography.Body variant="regular" style={{ marginLeft: space.smallMedium }}>
                    Allocate a percentage
                  </Typography.Body>
                }
                suffix={<Icon icon="arrow-right" intent="primary" />}
                onPress={onSelectPercentage}
              />
            </Box>
          ) : null}
          {isDollarEnabled() ? (
            <Box key="dollar" marginTop="medium">
              <List.Item
                variant="card"
                testID="allocDol"
                title={
                  <Typography.Body variant="regular" style={{ marginLeft: space.smallMedium }}>
                    Allocate an amount
                  </Typography.Body>
                }
                suffix={<Icon icon="arrow-right" intent="primary" />}
                onPress={onSelectDollar}
              />
            </Box>
          ) : null}
        </Page.Footer>
      </Page>
      <PaySplitConfirmBottomSheet onConfirm={onConfirmAllocateAll} ref={confirmAllocateAllBottomSheet} />
    </>
  );
};
