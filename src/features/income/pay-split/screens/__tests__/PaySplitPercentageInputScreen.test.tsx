import React from 'react';
import type { RenderAPI } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { createAllocation, initFlowStore, testEWallet, testOrg1 } from './store-utils.test';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { addInputSuffix, fireEvent, render, renderHook, waitFor } from '../../../../../common/utils/testing';
import { PaySplitType } from '../../../../../new-graphql/generated';
import { usePaySplitFlowStore } from '../../hooks/usePaySplitFlowStore';
import { PaySplitPercentageInputScreen } from '../PaySplitPercentageInputScreen';

const changeTextAndWaitForRender = async (renderAPI: RenderAPI, input: ReactTestInstance, value: string) => {
  fireEvent.changeText(input, value);
  await waitFor(() => expect(renderAPI.getByDisplayValue(value)).toBeTruthy());
  fireEvent(input, 'blur');
};

const waitABit = async () => {
  return new Promise(r => {
    setTimeout(r);
  });
};

describe('PaySplit Percentage Input Screen', () => {
  describe('validate value', () => {
    it('should not enable next when no value input', () => {
      const { getByLabelText } = render(<PaySplitPercentageInputScreen />);

      const nextBtn = getByLabelText('Next');
      expect(nextBtn).toBeDisabled();
    });

    it('should show error when value > 100', async () => {
      const screen = render(<PaySplitPercentageInputScreen />);

      const percentageInput = screen.getByTestId(addInputSuffix('percentage-value'));

      await changeTextAndWaitForRender(screen, percentageInput, '101');

      expect(screen.queryByText('You have exceeded the maximum. Please adjust amount.')).toBeTruthy();

      const nextBtn = screen.getByLabelText('Next');
      expect(nextBtn).toBeDisabled();
    });

    it.each`
      inputValue
      ${'abc'}
      ${'1.2'}
      ${'a1'}
    `('should display error when input non digit characters', async ({ inputValue }) => {
      const screen = render(<PaySplitPercentageInputScreen />);

      const percentageInput = screen.getByTestId(addInputSuffix('percentage-value'));

      await changeTextAndWaitForRender(screen, percentageInput, inputValue);

      expect(screen.queryByText('Field cannot contain words.')).toBeTruthy();

      const nextBtn = screen.getByLabelText('Next');
      expect(nextBtn).toBeDisabled();
    });

    it.each(['0', '10', '12', '20'])('should accept only positive integer', async inputValue => {
      const screen = render(<PaySplitPercentageInputScreen />);

      const percentageInput = screen.getByTestId(addInputSuffix('percentage-value'));

      await changeTextAndWaitForRender(screen, percentageInput, inputValue);

      const nextBtn = screen.getByLabelText('Next');
      expect(nextBtn).toBeEnabled();
    });
  });

  describe('input valid value', () => {
    let screen: RenderAPI;
    const nextPercentageAmount = 100;

    beforeEach(async () => {
      await initFlowStore(
        {
          allocations: [createAllocation(false, testOrg1, PaySplitType.Percentage, 50)],
          eWallet: testEWallet,
          cardSetupDone: true,
        },
        () => {
          // simulate what should have happened in previous screen (OrgListScreen)
          const { getAllocations, startEditing } = usePaySplitFlowStore();
          const a = getAllocations();
          startEditing(a[0]);
        }
      );
      screen = render(<PaySplitPercentageInputScreen />);

      const percentageInput = screen.getByTestId(addInputSuffix('percentage-value'));

      await changeTextAndWaitForRender(screen, percentageInput, nextPercentageAmount.toString());
    });

    it('should go back to Org list and save data when click confirm', async () => {
      const nextBtn = screen.getByLabelText('Next');

      expect(nextBtn).toBeEnabled();

      fireEvent.press(nextBtn);
      await waitABit();

      const confirmBtn = screen.getByText('Got it!');
      fireEvent.press(confirmBtn);

      await waitFor(() => {
        expect(mockedNavigate).toBeCalledWith('PaySplitOrgList');
      });

      const {
        result: {
          current: { getAllocations },
        },
      } = renderHook(() => usePaySplitFlowStore());

      const [targetAllocation] = getAllocations();
      expect(targetAllocation.amount).toEqual(nextPercentageAmount);
    });
  });
});
