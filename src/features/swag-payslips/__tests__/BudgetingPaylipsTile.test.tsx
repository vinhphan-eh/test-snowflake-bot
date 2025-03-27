import React from 'react';
import { mockedNavigate } from '../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../test-setup/after-env/mixpanel.setup';
import { fireEvent, render } from '../../../common/utils/testing';
import { BudgetingPayslipsTile } from '../BudgetingPayslipsTile';

describe('BudgetingPayslipsTile', () => {
  it('should render correctly while isShowInstapayTile true', () => {
    const screen = render(<BudgetingPayslipsTile isShowInstapayTile />);

    expect(screen.getByText('Take control of your finance')).toBeDefined();
    expect(screen.getByText('Set your budget with ease')).toBeDefined();
    expect(screen.getByText('Try Budgeting')).toBeDefined();
    expect(screen.queryByTestId('budgeting-intro-image')).toBeNull();
  });

  it('should render correctly while isShowInstapayTile false', () => {
    const screen = render(<BudgetingPayslipsTile isShowInstapayTile={false} />);

    expect(screen.getByText('Take control of your finance')).toBeDefined();
    expect(screen.getByText('Set your budget with ease')).toBeDefined();
    expect(screen.getByText('Try Budgeting')).toBeDefined();
    expect(screen.queryByTestId('budgeting-intro-image')).not.toBeNull();
  });

  it.each`
    isShowInstapayTile | expected
    ${true}            | ${true}
    ${false}           | ${false}
  `(
    'should navigate to BudgetingIntroScreen and track event correctly when isShowInstapayTile is $isShowInstapayTile',
    ({ expected, isShowInstapayTile }) => {
      const screen = render(<BudgetingPayslipsTile isShowInstapayTile={isShowInstapayTile} />);

      const budgetingTile = screen.getByTestId('budgeting-tile');
      fireEvent.press(budgetingTile);
      expect(mockedNavigate).toBeCalledWith('SwagPayslipsExperimentStack', { screen: 'BudgetingIntroScreen' });
      expect(mockedEventTracking).toBeCalledWith({
        event: 'Click on Budgeting tile in Payslips tab',
        categoryName: 'user action',
        metaData: {
          module: 'Payslips Experiment',
          'InstaPay Available': expected,
        },
      });
    }
  );
});
