import React from 'react';
import { WalletTabKeys } from '../../../../../common/constants/navigation';
import { mockUseSpendVisibility } from '../../../../../common/hooks/__mocks__/useSpendVisibility';
import { mockedSwitchPillar } from '../../../../../common/stores/__mocks__/useMiniAppSwitcherStore';

import { render, waitFor, fireEvent } from '../../../../../common/utils/testing';
import * as useTrackingDashboard from '../../../utils/useTrackingDashboard';
import { StashTile } from '../StashTile';

const mockTrackingClickDashboardWidget = jest.fn();

describe('StashTile', () => {
  beforeEach(() => {
    jest.spyOn(useTrackingDashboard, 'default').mockReturnValue({
      trackingClickOnDashboardWidget: mockTrackingClickDashboardWidget,
      trackingClickOnDashboardCashbackWidget: jest.fn(),
    });
  });
  describe('permission is false', () => {
    beforeEach(() => {
      mockUseSpendVisibility.mockReturnValue({
        showSpendTab: false,
        showCardTab: true,
        showStashTab: false,
        isLoading: false,
        isError: false,
      });
    });

    it('should not render', () => {
      const { queryByTestId } = render(<StashTile />);
      expect(queryByTestId('stash-tile')).toBeNull();
    });
  });

  describe('permission is true', () => {
    describe('showStashTab is true', () => {
      beforeEach(() => {
        mockUseSpendVisibility.mockReturnValue({
          showSpendTab: true,
          showCardTab: true,
          showStashTab: true,
          isLoading: false,
          isError: false,
        });
      });

      it('should render loading at initialize', async () => {
        mockUseSpendVisibility.mockReturnValue({
          showSpendTab: true,
          showCardTab: true,
          showStashTab: true,
          isLoading: true,
          isError: false,
        });

        const { findByTestId } = render(<StashTile />);

        await waitFor(() => {
          expect(findByTestId('spinner')).toBeTruthy();
        });
      });

      it('should render properly', async () => {
        const { getByText } = render(<StashTile />);

        await waitFor(() => {
          expect(getByText('Save for your holiday')).toBeTruthy();
          expect(getByText('Create a stash')).toBeTruthy();
        });
      });

      it('should navigate to stash tab', async () => {
        const { getByTestId } = render(<StashTile />);
        fireEvent.press(getByTestId('stash-tile'));

        await waitFor(() => {
          expect(mockedSwitchPillar).toBeCalledWith({
            to: {
              pillarId: 'WalletApp',
              tab: WalletTabKeys.STASH,
            },
          });
        });
        expect(mockTrackingClickDashboardWidget).toBeCalledWith('Stash');
      });
    });

    describe('showStashTab is false and showSpendTab is true', () => {
      beforeEach(() => {
        mockUseSpendVisibility.mockReturnValue({
          showSpendTab: true,
          showCardTab: true,
          showStashTab: false,
          isLoading: false,
          isError: false,
        });
      });

      it('should navigate to spend tab', async () => {
        const { getByTestId } = render(<StashTile />);
        fireEvent.press(getByTestId('stash-tile'));

        await waitFor(() => {
          expect(mockedSwitchPillar).toBeCalledWith({
            to: {
              pillarId: 'WalletApp',
              tab: WalletTabKeys.SPEND,
            },
          });
        });
        expect(mockTrackingClickDashboardWidget).toBeCalledWith('Stash');
      });
    });
  });
});
