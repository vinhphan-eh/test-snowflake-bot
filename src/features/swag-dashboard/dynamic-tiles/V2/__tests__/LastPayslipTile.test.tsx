import React from 'react';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { LastPayslipTile } from '../LastPayslipTile';

describe('LastPayslipTile', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <LastPayslipTile
        currencyCode="AUD"
        lastPayDate="12 Sep 2022"
        amount={5000}
        onPress={() => {}}
        onIconPress={() => {}}
        showValue={false}
      />
    );
    expect(getByText('Last pay slip')).toBeTruthy();
    expect(getByText('12 Sep 2022')).toBeTruthy();
    expect(getByText('******')).toBeTruthy();
  });

  it('should show the value correctly', () => {
    const { getByTestId, getByText } = render(
      <LastPayslipTile
        currencyCode="AUD"
        lastPayDate="12 Sep 2022"
        amount={5000}
        onPress={() => {}}
        onIconPress={() => {}}
        showValue
      />
    );
    fireEvent.press(getByTestId('last-payslip-tile-button-icon'));
    expect(getByText('Last pay slip')).toBeTruthy();
    expect(getByText('12 Sep 2022')).toBeTruthy();
    expect(getByText('$5,000.00')).toBeTruthy();
  });

  it('should handle onPress correctly', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <LastPayslipTile
        currencyCode="AUD"
        lastPayDate="12 Sep 2022"
        amount={5000}
        onPress={onPress}
        onIconPress={() => {}}
        showValue={false}
      />
    );
    fireEvent.press(getByTestId('last-payslip-tile'));
    expect(onPress).toHaveBeenCalled();
  });

  it('should handle onIconPress correctly', () => {
    const onIconPress = jest.fn();
    const { getByTestId } = render(
      <LastPayslipTile
        currencyCode="AUD"
        lastPayDate="12 Sep 2022"
        amount={5000}
        onIconPress={onIconPress}
        onPress={() => {}}
        showValue={false}
      />
    );
    fireEvent.press(getByTestId('last-payslip-tile-button-icon'));
    expect(onIconPress).toHaveBeenCalled();
  });
});
