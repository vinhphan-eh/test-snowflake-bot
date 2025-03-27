import React from 'react';
import { fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import * as useSeenEstimatedIncomeHowItWorksBts from '../../../instapay/hooks/useSeenEstimatedIncomeHowItWorksBts';
import { EstimatedIncomeTileBottomSheet } from '../EstimatedIncomeTileBottomSheet';

describe('EstimatedIncomeTileBottomSheet', () => {
  const mockedSetSeen = jest.fn();

  beforeEach(() => {
    jest.spyOn(useSeenEstimatedIncomeHowItWorksBts, 'useSeenEstimatedIncomeHowItWorksBts').mockReturnValue({
      setSeen: mockedSetSeen,
      isSeen: false,
      hasHydrate: true,
    });
  });

  it('should display the content properly and update seen state if opened', async () => {
    const { getByTestId, getByText } = render(
      <EstimatedIncomeTileBottomSheet isOpening setIsOpening={jest.fn()} isUK={false} />
    );

    await waitFor(() => {
      expect(getByText('Getting started')).toBeTruthy();
      expect(getByText('Income and Total on Payday:')).toBeTruthy();
      expect(getByText('Payday Estimate:')).toBeTruthy();
      expect(
        getByText('Plan your budget carefully and be mindful of the actual amount you’ll receive on payday.')
      ).toBeTruthy();
      expect(getByText('Got it')).toBeTruthy();
      expect(getByTestId('estimated-income-tile-bts')).toBeVisible();
      expect(mockedSetSeen).toHaveBeenCalledWith(true);
    });
  });

  it('should not dipslay if not opened', async () => {
    const { queryByTestId } = render(
      <EstimatedIncomeTileBottomSheet isOpening={false} setIsOpening={jest.fn()} isUK={false} />
    );

    await waitFor(() => {
      expect(queryByTestId('estimated-income-tile-bts')).not.toBeTruthy();
    });
  });

  it('should close the bottom sheet if pressed on Got it button', async () => {
    const mockedSetIsOpening = jest.fn();

    const { getByText } = render(
      <EstimatedIncomeTileBottomSheet isOpening setIsOpening={mockedSetIsOpening} isUK={false} />
    );

    fireEvent.press(getByText('Got it'));

    await waitFor(() => {
      expect(mockedSetIsOpening).toHaveBeenCalledWith(false);
    });
  });
});
