import React, { useEffect } from 'react';
import {
  Button,
  View,
  type ButtonProps,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ScrollViewProps,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { fireEvent, render, waitFor } from '../../../../../common/utils/testing';

import { CashbackTermsAndConditionsBottomSheet } from '../CashbackTermsAndConditionsBottomSheet';

const accept = jest.fn().mockResolvedValue({});
const showToast = jest.fn();

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useAcceptTncMutation: () => ({
    mutateAsync: accept,
  }),
  useGetCashbackTermsAndConditionsQuery: () => ({
    data: {
      me: {
        cashback: {
          termsAndConditions: {
            items: [
              {
                title: 'Title',
                content: 'Content',
              },
            ],
          },
        },
      },
    },
  }),
}));

jest.mock('../../../../../common/components/bottom-sheet/BottomSheetWithHD', () => ({
  BottomSheetWithHD: ({
    actions,
    children,
  }: {
    actions: (ButtonProps & {
      testID: string;
    })[];
    children: React.ReactNode;
  }) => (
    <View>
      {children}
      {actions.map(action => (
        <Button key={action.testID} {...action} />
      ))}
    </View>
  ),
}));

jest.mock('../../../../../common/components/bottom-sheet/BottomSheet', () => {
  return {
    BottomSheetScrollView: ({ children, onMomentumScrollEnd, ...props }: ScrollViewProps) => {
      useEffect(() => {
        onMomentumScrollEnd?.({
          nativeEvent: {
            contentOffset: {
              x: 0,
              y: 1000,
            },
            contentSize: {
              width: 200,
              height: 1000,
            },
            layoutMeasurement: {
              width: 0,
              height: 0,
            },
          },
        } as NativeSyntheticEvent<NativeScrollEvent>);
      }, [onMomentumScrollEnd]);

      return <ScrollView {...props}>{children}</ScrollView>;
    },
  };
});

jest.mock('../../../../../common/shared-hooks/useToast', () => ({
  useToast: () => ({
    show: showToast,
  }),
}));

describe('CashbackTermsAndConditionsBottomSheet', () => {
  beforeEach(() => {
    accept.mockResolvedValue({});
  });

  it('renders content properly', () => {
    const { getByTestId } = render(
      <CashbackTermsAndConditionsBottomSheet onSuccess={() => {}} onDismiss={() => {}} btsRef={{} as never} />
    );

    const content = getByTestId('content');
    expect(content).toBeTruthy();
  });

  it('should handle accepting correctly', async () => {
    const onSuccess = jest.fn();
    const { getByText } = render(
      <CashbackTermsAndConditionsBottomSheet onSuccess={onSuccess} onDismiss={() => {}} btsRef={{} as never} />
    );

    fireEvent.press(getByText('Accept'));
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('should show toast message if accepting fails', async () => {
    accept.mockRejectedValue(new Error('some error'));

    const { getByText } = render(
      <CashbackTermsAndConditionsBottomSheet onSuccess={() => {}} onDismiss={() => {}} btsRef={{} as never} />
    );

    fireEvent.press(getByText('Accept'));
    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith({
        content: 'Something went wrong, please try again later',
        intent: 'error',
      });
    });
  });
});
