import React from 'react';
import { mockReturnIncomeVisibility } from '../../../../../common/hooks/__mocks__/useIncomeVisibility';
import { mockUsePureMoneyPillarPermission } from '../../../../../common/hooks/__mocks__/usePureMoneyPillarPermission';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { render, renderHook } from '../../../../../common/utils/testing';
import { mockUseInstapayExpBrazeCard } from '../../hooks/__mocks__/useInstapayExpBrazeCard';
import { InstapayTimesheetFooterTile } from '../InstapayTimesheetFooterTile';

describe('InstapayTimesheetFooterTile', () => {
  beforeEach(() => {
    mockUseInstapayExpBrazeCard.mockReturnValue({
      contentCard: {
        id: 'customSurveyId',
      } as never,
    });
  });
  it.each`
    timesheetFlag | moneyPillarAccess | showInstapay | expected
    ${true}       | ${true}           | ${true}      | ${true}
    ${true}       | ${true}           | ${false}     | ${false}
    ${true}       | ${false}          | ${true}      | ${false}
    ${true}       | ${false}          | ${false}     | ${false}
    ${false}      | ${true}           | ${true}      | ${false}
    ${false}      | ${true}           | ${false}     | ${false}
    ${false}      | ${false}          | ${true}      | ${false}
  `('should render correctly', ({ expected, moneyPillarAccess, showInstapay, timesheetFlag }) => {
    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      instapaySubmitTimesheets: {
        view: timesheetFlag,
      },
    } as never;
    mockReturnIncomeVisibility({ showInstapay, showIncomeTab: true });

    mockUsePureMoneyPillarPermission.mockReturnValue({
      permission: moneyPillarAccess,
      isFetched: true,
    });

    const { getByTestId, getByText, queryByText } = render(
      <InstapayTimesheetFooterTile closeSuccessSurveyModal={() => {}} />
    );

    if (expected) {
      expect(getByTestId('instapay-experiment-tile')).toBeTruthy();
      expect(getByText('Learn more')).toBeTruthy();
      expect(getByText('Enjoy up to $1000 of your salary each week!')).toBeTruthy();
      expect(getByText('As your employer uses Swag, you have exclusive access to this perk.')).toBeTruthy();
      expect(getByText('Learn more')).toBeTruthy();
      expect(getByText('Maybe later')).toBeTruthy();
    } else {
      expect(queryByText('Got it')).toBeTruthy();
    }
  });
});
