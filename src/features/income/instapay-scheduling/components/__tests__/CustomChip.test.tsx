import React from 'react';
import { fireEvent, render, type RenderAPI, waitFor } from '../../../../../common/utils/testing';
import { CustomChip } from '../CustomChip';

describe('CustomChip', () => {
  test('should render correctly', () => {
    const { getByText } = render(
      <CustomChip
        maxLimitCheck={{
          value: 100,
          errorMessage: 'Maximum exceeded',
        }}
        minLimitCheck={{
          value: 0,
          errorMessage: 'Below minimum',
        }}
        confirmAction={jest.fn()}
        confirmText="Ok"
        labels={['$100', 'Other']}
        onChange={jest.fn()}
        currency="AUD"
      />
    );

    expect(getByText('$100')).toBeDefined();
    expect(getByText('Other')).toBeDefined();
  });

  test('should call onChange when a chip is selected', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <CustomChip
        maxLimitCheck={{
          value: 100,
          errorMessage: 'Maximum exceeded',
        }}
        minLimitCheck={{
          value: 0,
          errorMessage: 'Below minimum',
        }}
        confirmAction={jest.fn()}
        confirmText="Ok"
        labels={['$100', 'Other']}
        onChange={onChange}
        currency="AUD"
      />
    );

    fireEvent.press(getByText('$100'));

    expect(onChange).toHaveBeenCalledWith(100);
  });

  test('should call confirmAction when confirm button is pressed', () => {
    const confirmAction = jest.fn();
    const { getByText } = render(
      <CustomChip
        maxLimitCheck={{
          value: 100,
          errorMessage: 'Maximum exceeded',
        }}
        minLimitCheck={{
          value: 0,
          errorMessage: 'Below minimum',
        }}
        confirmAction={confirmAction}
        confirmText="Ok"
        labels={['$100', 'Other']}
        onChange={jest.fn()}
        currency="AUD"
      />
    );

    fireEvent.press(getByText('$100'));
    fireEvent.press(getByText('Ok'));

    expect(confirmAction).toHaveBeenCalled();
  });

  test('should call onChange with the correct value when Other chip is selected', () => {
    const onChange = jest.fn();
    const { getByTestId, getByText } = render(
      <CustomChip
        maxLimitCheck={{
          value: 500,
          errorMessage: 'Maximum exceeded',
        }}
        minLimitCheck={{
          value: 0,
          errorMessage: 'Below minimum',
        }}
        confirmAction={jest.fn()}
        confirmText="Ok"
        labels={['$500', 'Other']}
        onChange={onChange}
        currency="AUD"
      />
    );

    fireEvent.press(getByText('Other'));
    fireEvent.changeText(getByTestId('custom-chip-input'), '200');
    fireEvent.press(getByText('Ok'));

    expect(onChange).toHaveBeenCalledWith(200);
  });

  test('should disable confirm button when errorMessage is present', () => {
    const { getByTestId, getByText } = render(
      <CustomChip
        maxLimitCheck={{
          value: 100,
          errorMessage: 'Maximum exceeded',
        }}
        minLimitCheck={{
          value: 0,
          errorMessage: 'Below minimum',
        }}
        confirmAction={jest.fn()}
        confirmText="Ok"
        labels={['$100', 'Other']}
        onChange={jest.fn()}
        currency="AUD"
      />
    );

    fireEvent.press(getByText('Other'));
    fireEvent.changeText(getByTestId('custom-chip-input'), '200');

    expect(getByText('Ok')).toBeDisabled();
  });

  describe('input validation', () => {
    let component: RenderAPI;
    const mockedMaximumCheckErrorMessage = 'You exceeded the maximum allowed value';
    const mockedMinimumCheckErrorMessage = 'You inputted a value under the minimum allowed';
    const mockedConfirmAction = jest.fn();

    beforeEach(() => {
      component = render(
        <CustomChip
          maxLimitCheck={{
            value: 500,
            errorMessage: mockedMaximumCheckErrorMessage,
          }}
          minLimitCheck={{
            value: 0.01,
            errorMessage: mockedMinimumCheckErrorMessage,
          }}
          confirmAction={mockedConfirmAction}
          confirmText="Ok"
          labels={['$500', 'Other']}
          onChange={jest.fn()}
          currency="AUD"
        />
      );
    });

    it('should show error message and disable CTA if inputted below minimum', async () => {
      fireEvent.press(component.getByText('Other'));

      const inputBox = component.getByTestId('custom-chip-input');
      fireEvent.changeText(inputBox, '0');
      fireEvent(inputBox, 'blur');

      await waitFor(() => {
        expect(component.getByText(mockedMinimumCheckErrorMessage)).toBeTruthy();
      });

      fireEvent.press(component.getByText('Ok'));

      await waitFor(() => {
        expect(mockedConfirmAction).not.toHaveBeenCalled();
      });
    });

    it('should show error message and disable CTA if inputted above maximum', async () => {
      fireEvent.press(component.getByText('Other'));

      const inputBox = component.getByTestId('custom-chip-input');
      fireEvent.changeText(inputBox, '501');
      fireEvent(inputBox, 'blur');

      await waitFor(() => {
        expect(component.getByText(mockedMaximumCheckErrorMessage)).toBeTruthy();
      });

      fireEvent.press(component.getByText('Ok'));

      await waitFor(() => {
        expect(mockedConfirmAction).not.toHaveBeenCalled();
      });
    });
  });

  test('should accept the value and handle proper value parsing if inputted with comma', () => {
    const onChange = jest.fn();
    const { getByTestId, getByText } = render(
      <CustomChip
        maxLimitCheck={{
          value: 500,
          errorMessage: 'Maximum exceeded',
        }}
        minLimitCheck={{
          value: 0,
          errorMessage: 'Below minimum',
        }}
        confirmAction={jest.fn()}
        confirmText="Ok"
        labels={['$500', 'Other']}
        onChange={onChange}
        currency="AUD"
      />
    );

    fireEvent.press(getByText('Other'));
    fireEvent.changeText(getByTestId('custom-chip-input'), '200,23');
    fireEvent.press(getByText('Ok'));

    expect(onChange).toHaveBeenCalledWith(200.23);
  });
});
