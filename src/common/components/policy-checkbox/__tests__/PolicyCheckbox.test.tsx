import React, { useImperativeHandle, useState } from 'react';
import type { ScrollViewProps } from 'react-native';
import { ScrollView, Text } from 'react-native';
import { fireEvent, render, waitFor } from '../../../utils/testing';
import PolicyCheckbox from '../index';

type MockProps = {
  children: React.ReactNode;
};

jest.mock('../../bottom-sheet/BottomSheet.tsx', () => {
  return {
    BottomSheet: React.forwardRef((props: MockProps, ref) => {
      const [isShowing, setIsShowing] = useState(false);

      useImperativeHandle(ref, () => ({
        open: () => setIsShowing(true),
        close: () => setIsShowing(false),
      }));

      if (isShowing) {
        // eslint-disable-next-line react/jsx-no-useless-fragment
        return <>{props.children}</>;
      }

      return null;
    }),
    BottomSheetScrollView: ({ children, ...props }: ScrollViewProps) => {
      return (
        <ScrollView
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        >
          {children}
        </ScrollView>
      );
    },
  };
});

describe('PolicyCheckbox', () => {
  it('renders content properly', async () => {
    const { getByTestId } = render(<PolicyCheckbox testId="policy_test" title="Privacy Policy" content="" />);
    const checkbox = getByTestId('policy_test');
    fireEvent.press(checkbox);

    await waitFor(() => {
      const text = getByTestId('policy_test_text');
      expect(text).toBeTruthy();
    });
  });

  it('renders content properly', async () => {
    const { getByTestId } = render(
      <PolicyCheckbox testId="policy_test" title="Privacy Policy" customContent={<Text>hey</Text>} />
    );
    const checkbox = getByTestId('policy_test');
    fireEvent.press(checkbox);

    await waitFor(() => {
      const content = getByTestId('policy_test_custom_content');
      expect(content).toBeTruthy();
    });
  });
});
