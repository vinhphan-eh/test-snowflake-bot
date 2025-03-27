import React from 'react';
import { fireEvent, render } from '../../../../../../common/utils/testing';
import { WorkSuccessWithInstapayAd } from '../WorkSuccessWithInstapayAd';

describe('WorkSuccessWithInstapayAd', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(
      <WorkSuccessWithInstapayAd
        onCancel={() => {}}
        title="Title"
        description="Description"
        feature="payslips"
        onActionEffect={() => {}}
      />
    );

    expect(getByText('Title')).toBeTruthy();
    expect(getByText('Description')).toBeTruthy();
    expect(getByTestId('instapay-exp-card')).toBeTruthy();
  });

  it('onCancel works correctly', () => {
    const mockOnCancel = jest.fn();
    const { getByText } = render(
      <WorkSuccessWithInstapayAd
        onActionEffect={() => {}}
        onCancel={mockOnCancel}
        title="Title"
        description="Description"
        feature="payslips"
      />
    );

    fireEvent.press(getByText('Maybe later'));

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('onActionEffect works correctly', () => {
    const mockOnActionEffect = jest.fn();
    const { getByText } = render(
      <WorkSuccessWithInstapayAd
        onActionEffect={mockOnActionEffect}
        onCancel={() => {}}
        title="Title"
        description="Description"
        feature="payslips"
      />
    );

    fireEvent.press(getByText('Withdraw now'));

    expect(mockOnActionEffect).toHaveBeenCalledTimes(1);
  });
});
