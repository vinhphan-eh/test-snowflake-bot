import React from 'react';
import { mockReturnIncomeVisibility } from '../../../common/hooks/__mocks__/useIncomeVisibility';
import { usePermissionStore } from '../../../common/stores/usePermissionStore';
import { render, renderHook } from '../../../common/utils/testing';
import { mockUseInstapayExpBrazeCard } from '../../income/instapay/hooks/__mocks__/useInstapayExpBrazeCard';
import { PayslipsTile } from '../PayslipsTile';

describe('PayslipsTile', () => {
  describe('when payslips experiment instapay permission is available', () => {
    beforeEach(() => {
      mockUseInstapayExpBrazeCard.mockReturnValue({
        contentCard: undefined,
      });
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        payslipsExperimentBudgeting: {
          view: true,
        },
        payslipsExperimentInstapay: {
          view: true,
        },
      } as never;
    });

    it('should render correctly when instapay payslips tile is visible', () => {
      mockReturnIncomeVisibility({ showIncomeTab: true, showInstapay: true });

      const screen = render(<PayslipsTile />);

      // instapay payslips tile
      expect(screen.getByText('Sick of waiting to get paid?')).toBeDefined();
      expect(screen.getByText('Access up to $1000 of your salary per week!')).toBeDefined();
      expect(screen.getByText('Learn more')).toBeDefined();

      // budgeting payslips tile
      expect(screen.getByText('Take control of your finance')).toBeDefined();
      expect(screen.getByText('Set your budget with ease')).toBeDefined();
      expect(screen.getByText('Try Budgeting')).toBeDefined();
      // should not show intro image when payslips tile is visible
      expect(screen.queryByTestId('budgeting-intro-image')).toBeNull();
    });

    it('should render correctly when instapay payslips tile is loading', () => {
      mockReturnIncomeVisibility({ isLoading: true });
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        payslipsExperimentBudgeting: {
          view: true,
        },
        payslipsExperimentInstapay: {
          view: true,
        },
      } as never;

      const screen = render(<PayslipsTile />);

      // instapay payslips tile is not visible
      expect(screen.queryByText('Sick of waiting to get paid?')).toBeNull();
      expect(screen.getByTestId('skeleton-loading')).toBeDefined();

      // budgeting payslips tile is visible without image
      expect(screen.getByText('Take control of your finance')).toBeDefined();
      expect(screen.getByText('Set your budget with ease')).toBeDefined();
      expect(screen.getByText('Try Budgeting')).toBeDefined();
      // should not show intro image when payslips tile is loading
      expect(screen.queryByTestId('budgeting-intro-image')).toBeNull();
    });

    it.each`
      showIncomeTab | showInstapay | isError
      ${false}      | ${true}      | ${false}
      ${true}       | ${false}     | ${false}
      ${true}       | ${true}      | ${true}
    `(
      'should render correctly when instapay payslips tile is not visible showIncomeTab: $showIncomeTab, showInstapay: $showInstapay, isError: $isError',
      ({ isError, showIncomeTab, showInstapay }) => {
        mockReturnIncomeVisibility({ showIncomeTab, isError, showInstapay });
        const permissionStore = renderHook(() => usePermissionStore());
        permissionStore.result.current.permissions = {
          payslipsExperimentBudgeting: {
            view: true,
          },
          payslipsExperimentInstapay: {
            view: true,
          },
        } as never;

        const screen = render(<PayslipsTile />);
        expect(screen.queryByText('Sick of waiting to get paid?')).toBeNull();

        // budgeting payslips tile is visible with intro image
        expect(screen.getByText('Take control of your finance')).toBeDefined();
        expect(screen.getByText('Set your budget with ease')).toBeDefined();
        expect(screen.getByText('Try Budgeting')).toBeDefined();
        expect(screen.queryByTestId('budgeting-intro-image')).toBeDefined();
      }
    );

    it('should render correctly when budgeting tile permission is not available', () => {
      mockReturnIncomeVisibility({ showIncomeTab: true, showInstapay: true });
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        payslipsExperimentBudgeting: {
          view: false,
        },
        payslipsExperimentInstapay: {
          view: true,
        },
      } as never;

      const screen = render(<PayslipsTile />);

      // instapay tile
      expect(screen.getByText('Sick of waiting to get paid?')).toBeDefined();
      expect(screen.getByText('Access up to $1000 of your salary per week!')).toBeDefined();
      expect(screen.getByText('Learn more')).toBeDefined();

      // budgeting tile should not be visible

      expect(screen.queryByText('Take control of your finance')).toBeNull();
    });
  });

  describe('when payslips experiment instapay permission is not available', () => {
    beforeEach(() => {
      mockReturnIncomeVisibility({ showIncomeTab: true, showInstapay: true });
    });

    it('should render correctly when budgeting tile permission is available', () => {
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        payslipsExperimentBudgeting: {
          view: true,
        },
        payslipsExperimentInstapay: {
          view: false,
        },
      } as never;

      const screen = render(<PayslipsTile />);
      // instapay payslips tile is not visible
      expect(screen.queryByText('Sick of waiting to get paid?')).toBeNull();

      // budgeting payslips tile is visible with intro image
      expect(screen.getByText('Take control of your finance')).toBeDefined();
      expect(screen.getByText('Set your budget with ease')).toBeDefined();
      expect(screen.getByText('Try Budgeting')).toBeDefined();
      expect(screen.queryByTestId('budgeting-intro-image')).toBeDefined();
    });

    it('should render correctly when budgeting tile permission is not available', () => {
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        payslipsExperimentBudgeting: {
          view: false,
        },
        payslipsExperimentInstapay: {
          view: false,
        },
      } as never;

      const screen = render(<PayslipsTile />);
      // payslips-tile should not be visible
      expect(screen.queryByTestId('payslips-tile')).toBeNull();
    });
  });
});
