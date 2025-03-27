import React from 'react';
import { WalletTabKeys } from '../../../../../common/constants/navigation';
import { mockUseIsAccountAU } from '../../../../../common/hooks/__mocks__/useIsAccountAU';
import { mockedSwitchPillar } from '../../../../../common/stores/__mocks__/useMiniAppSwitcherStore';
import * as usePermissionStore from '../../../../../common/stores/usePermissionStore';
import { render, waitFor, fireEvent } from '../../../../../common/utils/testing';
import * as useTrackingDashboard from '../../../utils/useTrackingDashboard';
import { SalarySacrificeTile } from '../SalarySacrificeTile';

const mockUsePermissionStore = ({
  isFetching,
  permissions,
}: {
  isFetching: boolean;
  permissions: {
    superChoiceSwag?: {
      view: boolean;
    };
  };
}) =>
  jest.spyOn(usePermissionStore, 'usePermissionStore').mockReturnValue({
    isFetchedPermission: !isFetching,
    permissions,
    ...usePermissionStore,
  });

const mockTrackingClickDashboardWidget = jest.fn();

describe('SalarySacrificeTile', () => {
  beforeEach(() => {
    jest.spyOn(useTrackingDashboard, 'default').mockReturnValue({
      trackingClickOnDashboardWidget: mockTrackingClickDashboardWidget,
      trackingClickOnDashboardCashbackWidget: jest.fn(),
    });
  });
  describe('permission is false', () => {
    it.each`
      viewSuperChoiceSwag | isAccountAU
      ${false}            | ${false}
      ${true}             | ${false}
    `('should not render', ({ isAccountAU, viewSuperChoiceSwag }) => {
      mockUsePermissionStore({
        isFetching: false,
        permissions: {
          superChoiceSwag: {
            view: viewSuperChoiceSwag,
          },
        },
      });
      mockUseIsAccountAU.mockReturnValue(isAccountAU);
      const { queryByTestId } = render(<SalarySacrificeTile />);
      expect(queryByTestId('salary-sacrifice-tile')).toBeNull();
    });
  });

  describe('permission is true', () => {
    beforeEach(() => {
      mockUsePermissionStore({
        isFetching: false,
        permissions: {
          superChoiceSwag: {
            view: true,
          },
        },
      });
      mockUseIsAccountAU.mockReturnValue(true);
    });

    it('should render loading at initialize', async () => {
      mockUsePermissionStore({
        isFetching: true,
        permissions: {
          superChoiceSwag: {
            view: true,
          },
        },
      });

      const { findByTestId } = render(<SalarySacrificeTile />);

      await waitFor(() => {
        expect(findByTestId('spinner')).toBeTruthy();
      });
    });

    it('should render properly', async () => {
      const { getByText } = render(<SalarySacrificeTile />);

      await waitFor(() => {
        expect(getByText('Start salary sacrificing')).toBeTruthy();
        expect(getByText('Contribute now')).toBeTruthy();
      });
    });

    it('should call actions correctly', async () => {
      const { getByTestId } = render(<SalarySacrificeTile />);
      fireEvent.press(getByTestId('salary-sacrifice-tile'));

      await waitFor(() => {
        expect(mockedSwitchPillar).toBeCalledWith({
          to: {
            pillarId: 'WalletApp',
            tab: WalletTabKeys.SUPER,
          },
        });
      });
      expect(mockTrackingClickDashboardWidget).toBeCalledWith('Salary Sacrificing');
    });
  });
});
