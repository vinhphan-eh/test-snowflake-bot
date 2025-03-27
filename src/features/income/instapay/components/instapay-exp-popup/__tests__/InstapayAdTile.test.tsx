import React from 'react';
import { mockReturnIncomeVisibility } from '../../../../../../common/hooks/__mocks__/useIncomeVisibility';
import { mockUseLoadBrazeContentCards } from '../../../../../../common/hooks/__mocks__/useLoadBrazeContentCards';
import { fireEvent, render } from '../../../../../../common/utils/testing';
import { mockUseInstapayExpForLeave } from '../../../hooks/__mocks__/useInstapayExpForLeave';
import { mockUseOpenInstaPayFlowFromDashboard } from '../../../hooks/__mocks__/useOpenInstaPayFlowFromDashboard';
import { InstapayAdTile } from '../InstapayAdTile';

const mockLoadBrazeContentCards = (
  cards = [
    {
      id: 'card_id',
      title: 'title',
      cardDescription: 'cardDescription',
      extras: {
        id: 'instapay_exp_leave_approved',
        actionText: 'Braze action',
      },
    },
  ]
) => {
  mockUseLoadBrazeContentCards.mockReturnValue({
    cards: cards as never,
    requestContentCardsRefresh: jest.fn(),
    logCustomEvent: jest.fn(),
  });
};

describe('TileContent', () => {
  const mockOpenInstaPayFlow = jest.fn();
  beforeEach(() => {
    mockUseOpenInstaPayFlowFromDashboard.mockReturnValue({
      openInstaPayFlow: mockOpenInstaPayFlow,
    });
    mockReturnIncomeVisibility({ showInstapay: true, showIncomeTab: true });
    mockUseInstapayExpForLeave.mockReturnValue({
      showTileAtApprovedLeave: true,
      showTileAtSubmitLeave: false,
    });
    mockLoadBrazeContentCards();
  });

  describe('Tile Content hide when:', () => {
    it('has Braze content cards return empty', async () => {
      mockLoadBrazeContentCards([]);
      const comp = render(<InstapayAdTile targetedFeature="leave_approved" isAnnualLeave />);
      expect(comp.queryByTestId('titleContent')).toBeNull();
    });

    it('has instapay under maintain', async () => {
      mockReturnIncomeVisibility({ showInstapay: true, showIncomeTab: true, instapayNowUnderMaintenance: true });
      const comp = render(<InstapayAdTile targetedFeature="leave_approved" isAnnualLeave />);
      expect(comp.queryByTestId('titleContent')).toBeNull();
    });

    it('has instapay exp for leave checking false', async () => {
      mockUseInstapayExpForLeave.mockReturnValueOnce({
        showTileAtApprovedLeave: false,
        showTileAtSubmitLeave: false,
      });
      const comp = render(<InstapayAdTile targetedFeature="leave_approved" isAnnualLeave />);
      expect(comp.queryByTestId('titleContent')).toBeNull();
    });
  });

  describe('Tile Content show when', () => {
    it('all condition pass', async () => {
      const comp = render(<InstapayAdTile targetedFeature="leave_approved" isAnnualLeave />);
      expect(comp.queryByTestId('titleContent')).toBeTruthy();
      expect(comp.queryByText('title')).toBeTruthy();
      expect(comp.queryByText('cardDescription')).toBeTruthy();

      const button = comp.getByText('Braze action');
      fireEvent.press(button);
      expect(mockOpenInstaPayFlow).toHaveBeenCalled();
    });
  });
});
