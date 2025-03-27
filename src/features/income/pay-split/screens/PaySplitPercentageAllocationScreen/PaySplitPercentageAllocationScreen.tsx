import React, { useRef } from 'react';
import { Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CardCarouselOptions } from './components/CardCarouselOptions';
import { ListOptions } from './components/ListOptions';
import type { CardCarouselOption, OptionAmount } from './types';
import images from '../../../../../common/assets/images';
import { Page } from '../../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../../common/components/status-bar/CustomStatusBar';
import type { PaySplitConfirmBottomSheetRef } from '../../components/PaySplitConfirmBottomSheet';
import { PaySplitConfirmBottomSheet } from '../../components/PaySplitConfirmBottomSheet';
import { INPUT_PAY_SPLIT_PERCENTAGE } from '../../constants/trackingEvents';
import { PaySplitTestingGroup, usePaySplitABTesting } from '../../hooks/usePaySplitABTesting';
import { usePaySplitFlowStore } from '../../hooks/usePaySplitFlowStore';
import { useTrackPaySplitABTesting } from '../../hooks/useTrackPaySplitABTesting';
import type { PaySplitScreenNavigationProp } from '../../navigation/navigationTypes';
import useBrandName from '../../../../../common/hooks/useBrandName';
import useStoreName from '../../../../../common/hooks/useStoreName';

const OPTION_A: OptionAmount[] = [15, 10, 5, 'custom'];
const OPTION_B: OptionAmount[] = [50, 30, 10, 'custom'];
const getOptionC = ({ brandName, storeName }: { brandName: string; storeName: string }): CardCarouselOption[] => {
  return [
    {
      image: images.simpleSpender,
      title: 'Simple Spender',
      subtitle: 'Use your Swag Spend account for purchases like treating yourself to a coffee.',
      bodyHeading: '10% of my pay',
      bodyContent: 'to be deposited into my Swag Spend Account, each time I get paid.',
      amount: 10,
    },
    {
      image: images.savySpender,
      title: 'Savvy Spender',
      subtitle: `Use your Swag Spend account for all daily purchases and use it in our ${storeName} Store.`,
      bodyHeading: '30% of my pay',
      bodyContent: 'to be deposited into my Swag Spend Account, each time I get paid.',
      highlightText: `Maximise your ${brandName} benefits with this options`,
      amount: 30,
      isHighlight: true,
      isDefault: true,
    },
    {
      image: images.superSaver,
      title: 'Super Saver',
      subtitle:
        'Use your Spend account to maximise your savings on daily essentials and big-ticket items in the Discount store',
      bodyHeading: '50% of my pay',
      bodyContent: 'to be deposited into my Swag Spend Account, each time I get paid.',
      amount: 50,
    },
    {
      image: images.splitYourWay,
      title: 'Split your way',
      subtitle: 'On top of your budgets? Choose the exact amount to be deposited from your Pay.',
      bodyHeading: 'Set a custom amount',
      bodyContent: 'to be deposited into my Swag Spend Account, each time I get paid.',
      amount: 'custom',
    },
  ];
};

type PageConfigureType = {
  title: string;
  description: string;
  selectionComponent: (props: {
    onNext: (amount: OptionAmount) => void;
    brandName: string;
    storeName: string;
  }) => JSX.Element;
};

const PageConfigure = new Map<PaySplitTestingGroup, PageConfigureType>([
  [
    PaySplitTestingGroup.A,
    {
      title: 'How much of your pay would you like to split into your Swag Spend Account?',
      description: 'This amount will be deposited each pay cycle.',
      selectionComponent: ({ onNext }) => <ListOptions onNext={onNext} options={OPTION_A} />,
    },
  ],
  [
    PaySplitTestingGroup.B,
    {
      title: 'How much of your pay would you like to split?',
      description: 'You can update these settings anytime.',
      selectionComponent: ({ onNext }) => <ListOptions onNext={onNext} options={OPTION_B} />,
    },
  ],
  [
    PaySplitTestingGroup.C,
    {
      title: 'How much of your pay would you like to split?',
      description: 'You can update these settings anytime.',
      selectionComponent: ({ brandName, onNext, storeName }) => (
        <CardCarouselOptions onNext={onNext} options={getOptionC({ brandName, storeName })} />
      ),
    },
  ],
]);

const PaySplitPercentageAllocationScreen = () => {
  const { testingGroup: userExperimentGroup } = usePaySplitABTesting();
  const { trackEvent } = useTrackPaySplitABTesting();

  const navigation = useNavigation<PaySplitScreenNavigationProp<'PaySplitPercentageAllocation'>>();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const confirmBottomSheet = useRef<PaySplitConfirmBottomSheetRef>(null);
  const store = usePaySplitFlowStore();
  const { space } = useTheme();
  const page = PageConfigure.get(userExperimentGroup);
  const brandName = useBrandName();
  const storeName = useStoreName();

  const onDrawerGotIt = () => {
    if (store.active) {
      trackEvent(INPUT_PAY_SPLIT_PERCENTAGE, {
        targetOrgId: store.active.membership.orgId,
        targetMemberId: store.active.membership.memberId,
        splitValue: store.active.amount,
      });
    }

    // final step, so apply
    confirmBottomSheet.current?.close();
    store.finishEditing();

    navigation.navigate('PaySplitOrgList');
  };

  const onNext = (selectedAmount: OptionAmount) => {
    if (selectedAmount === 'custom' && userExperimentGroup === PaySplitTestingGroup.C) {
      navigation.navigate('PaySplitSelectAllocation');
      return;
    }

    if (selectedAmount === 'custom') {
      navigation.navigate('PaySplitPercentageInput');
      return;
    }

    store.edit({ amount: selectedAmount });
    confirmBottomSheet.current?.open();
  };

  const onBack = () => {
    // back to allocation type page, don't stop editing
    navigation.goBack();
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar title="Pay Split" hideRight onBack={onBack} />
      <Page
        contentContainerStyle={{
          paddingHorizontal: 0,
        }}
        style={{ paddingBottom: bottomInset }}
      >
        <Page.Title style={{ paddingHorizontal: space.medium, marginBottom: space.medium }}>{page?.title}</Page.Title>
        <Page.Body>
          <Typography.Body variant="regular" style={{ marginHorizontal: space.medium, marginBottom: space.large }}>
            {page?.description}
          </Typography.Body>
          {userExperimentGroup === PaySplitTestingGroup.C
            ? page?.selectionComponent({ onNext, brandName, storeName })
            : null}
        </Page.Body>
        <Page.Footer style={{ paddingHorizontal: space.medium }}>
          {userExperimentGroup === PaySplitTestingGroup.A || userExperimentGroup === PaySplitTestingGroup.B
            ? page?.selectionComponent({ onNext, brandName, storeName })
            : null}
        </Page.Footer>
        <PaySplitConfirmBottomSheet ref={confirmBottomSheet} onConfirm={onDrawerGotIt} />
      </Page>
    </>
  );
};

export { PaySplitPercentageAllocationScreen };
