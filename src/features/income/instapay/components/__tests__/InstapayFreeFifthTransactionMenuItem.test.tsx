import React from 'react';
import { mockReturnIncomeVisibility } from '../../../../../common/hooks/__mocks__/useIncomeVisibility';
import { fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { InstapayFreeFifthTransactionMenuItem } from '../InstapayFreeFifthTransactionMenuItem';

const mockOpenUrl = jest.fn();
jest.mock('../../../../../common/shared-hooks/useInAppBrowser', () => {
  return {
    useInAppBrowser: () => {
      return {
        openUrl: mockOpenUrl,
      };
    },
  };
});

describe('InstapayFreeFifthTransactionMenuItem', () => {
  describe('V1', () => {
    beforeEach(() => {
      mockReturnIncomeVisibility({ showIncomeTab: true, showInstapay: true });
    });

    it('should render correctly', () => {
      const { getByText } = render(<InstapayFreeFifthTransactionMenuItem earningProcess={2} />);

      expect(getByText('FREE transaction')).toBeTruthy();
      expect(getByText('on your 5th use!')).toBeTruthy();
    });

    it('should navigate to proper T&C page when pressed on T&C apply caption', async () => {
      const { getByText } = render(<InstapayFreeFifthTransactionMenuItem earningProcess={2} />);

      const tncApplyCaption = getByText('T&C’s apply');
      fireEvent.press(tncApplyCaption);

      await waitFor(() => {
        expect(mockOpenUrl).toHaveBeenCalledWith(
          'https://employmenthero.com/legals/swag-instapay-now-free-transaction/'
        );
      });
    });
  });

  describe('V2', () => {
    beforeEach(() => {
      mockReturnIncomeVisibility({
        showIncomeTab: true,
        showInstapay: true,
        showInstapayNowUsageIncentiveV2: true,
      });
    });

    it('should render correctly', () => {
      const { getByText } = render(<InstapayFreeFifthTransactionMenuItem earningProcess={2} />);

      expect(getByText('FREE transaction')).toBeTruthy();
      expect(getByText('on your 1st and 5th use!')).toBeTruthy();
    });

    it('should navigate to proper T&C page when pressed on T&C apply caption', async () => {
      const { getByText } = render(<InstapayFreeFifthTransactionMenuItem earningProcess={2} />);

      const tncApplyCaption = getByText('T&C’s apply');
      fireEvent.press(tncApplyCaption);

      await waitFor(() => {
        expect(mockOpenUrl).toHaveBeenCalledWith(
          'https://employmenthero.com/legals/swag-instapay-now-new-user-free-transaction-offer/'
        );
      });
    });
  });
});
