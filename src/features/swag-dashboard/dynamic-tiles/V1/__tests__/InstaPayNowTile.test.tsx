import React from 'react';
import { mockReturnIncomeVisibility } from '../../../../../common/hooks/__mocks__/useIncomeVisibility';
import { mockedSwitchPillar } from '../../../../../common/stores/__mocks__/useMiniAppSwitcherStore';
import { fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { Region } from '../../../../../providers/LocalisationProvider/constants';
import * as useInstaPayAvailableBalances from '../../../../income/instapay/hooks/useInstaPayAvailableBalances';
import * as useTrackingDashboard from '../../../utils/useTrackingDashboard';
import { InstaPayNowTile } from '../InstaPayNowTile';

const mockUseInstaPayAvailableBalances = ({
  allOrgsViolatePolicy,
  sumAvailableBalance,
  sumReachedMinimumBalances,
}: {
  allOrgsViolatePolicy: boolean;
  sumAvailableBalance: number;
  sumReachedMinimumBalances: number;
}) =>
  jest.spyOn(useInstaPayAvailableBalances, 'useInstaPayAvailableBalances').mockReturnValue({
    allOrgsViolatePolicy,
    sumReachedMinimumBalances,
    sumAvailableBalance,
    country: Region.au,
    orgs: [],
    findOrgById: jest.fn(),
    isError: false,
    isLoading: false,
  } as never);

const mockTrackingClickDashboardWidget = jest.fn();

describe('InstaPayNowTile', () => {
  beforeEach(() => {
    jest.spyOn(useTrackingDashboard, 'default').mockReturnValue({
      trackingClickOnDashboardWidget: mockTrackingClickDashboardWidget,
      trackingClickOnDashboardCashbackWidget: jest.fn(),
    });
  });

  describe('permission is false', () => {
    it.each`
      showIncomeTab | allOrgsViolatePolicy
      ${false}      | ${false}
      ${true}       | ${true}
    `('should not render', ({ allOrgsViolatePolicy, showIncomeTab }) => {
      mockReturnIncomeVisibility({ showIncomeTab });
      mockUseInstaPayAvailableBalances({
        allOrgsViolatePolicy,
        sumReachedMinimumBalances: 200,
        sumAvailableBalance: 200,
      });
      const { queryByTestId } = render(<InstaPayNowTile />);
      expect(queryByTestId('instapay-now-tile')).toBeNull();
    });
  });

  describe('permission is true', () => {
    beforeEach(() => {
      mockReturnIncomeVisibility({ showIncomeTab: true });
      mockUseInstaPayAvailableBalances({
        allOrgsViolatePolicy: false,
        sumReachedMinimumBalances: 200,
        sumAvailableBalance: 200,
      });
    });

    it('should render loading at initialize', async () => {
      mockReturnIncomeVisibility({ showIncomeTab: true, isLoading: true });

      const { findByTestId } = render(<InstaPayNowTile />);

      await waitFor(() => {
        expect(findByTestId('spinner')).toBeTruthy();
      });
    });

    it('should render properly', async () => {
      const { getByText } = render(<InstaPayNowTile />);

      await waitFor(() => {
        expect(getByText('$200.00')).toBeTruthy();
        expect(getByText('InstaPay Now')).toBeTruthy();
        expect(getByText('Ready to go!')).toBeTruthy();
      });
    });

    it('should call actions correctly when not seen intro', async () => {
      const { getByTestId } = render(<InstaPayNowTile />);
      fireEvent.press(getByTestId('instapay-now-tile'));

      await waitFor(() => {
        expect(mockedSwitchPillar).toHaveBeenCalledWith({ to: { pillarId: 'WalletApp', tab: 'income-tab' } });
        expect(mockTrackingClickDashboardWidget).toHaveBeenCalledWith('InstaPay');
      });
    });
  });
});
