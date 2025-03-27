import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { fireEvent, waitFor, within, addInputSuffix, render } from '../../../../common/utils/testing';
import { useOnboardingStore } from '../../stores/useOnboardingStore';
import { TaxObligationsEntryScreen } from '../TaxObligationsEntryScreen';

describe('Tax Obligations Entry Screen', () => {
  it('should render properly', () => {
    const { findByLabelText, getByTestId, getByText } = render(<TaxObligationsEntryScreen />);
    expect(getByText('Tax obligations')).toBeTruthy();
    expect(getByTestId('topbar-back-icon')).toBeTruthy();
    expect(getByText('Which countries do you have tax obligations in?')).toBeTruthy();
    expect(getByTestId('country-code')).toBeTruthy();
    expect(getByTestId(addInputSuffix('trn'))).toBeTruthy();
    expect(findByLabelText('Tax Obligation List')).toBeTruthy();
    expect(getByText('Add country')).toBeTruthy();
    expect(getByText('Next')).toBeTruthy();
  });

  describe('Add Obligation Data', () => {
    it('should not add new data when user does not pick country', async () => {
      const { getByLabelText, getByTestId } = render(<TaxObligationsEntryScreen />);
      const textInput = getByTestId(addInputSuffix('trn'));
      fireEvent.changeText(textInput, '123');
      const buttonAddCountry = getByLabelText('Button Add Country');
      fireEvent.press(buttonAddCountry);
      const taxObligationList = within(getByLabelText('Tax Obligation List'));
      const taxObligationItems = taxObligationList.queryAllByRole('menuitem');
      expect(taxObligationItems.length).toEqual(0);
    });

    it('should add new data when user does pick a country', async () => {
      const { getByLabelText, getByTestId, getByText } = render(<TaxObligationsEntryScreen />);
      const selectCountry = getByTestId('country-code');
      fireEvent.press(selectCountry);
      const countryComp = getByText('Afghanistan');
      fireEvent.press(countryComp);
      const buttonAddCountry = getByLabelText('Button Add Country');
      const taxObligationList = getByLabelText('Tax Obligation List');
      let taxObligationItems = [];

      await waitFor(() => {
        fireEvent.press(buttonAddCountry);
        taxObligationItems = within(taxObligationList).getAllByRole('menuitem');
      });
      expect(taxObligationItems.length).toEqual(1);
    });
  });

  test.each([{ fieldName: 'trn', value: '123! 12321 cxzcxz!@@!', expected: 'Field cannot contain special symbol.' }])(
    'should show error message: $fieldName, $value',
    async ({ expected, fieldName, value }) => {
      const { getByDisplayValue, getByTestId, getByText } = render(<TaxObligationsEntryScreen />);
      const textInput = getByTestId(addInputSuffix(fieldName));
      fireEvent.changeText(textInput, value);

      await waitFor(() => expect(getByDisplayValue(value)).toBeTruthy());

      fireEvent(textInput, 'blur');

      await waitFor(() => {
        expect(mockedNavigate).not.toBeCalled();
        expect(getByText(expected)).toBeTruthy();
      });
    }
  );

  it('should submit success', async () => {
    const { getByLabelText, getByTestId, getByText } = render(<TaxObligationsEntryScreen />);
    const { result } = renderHook(() => useOnboardingStore());
    const selectCountry = getByTestId('country-code');
    fireEvent.press(selectCountry);
    const countryComp = getByText('Afghanistan');
    fireEvent.press(countryComp);
    const buttonAddCountry = getByLabelText('Button Add Country');
    const taxObligationList = getByLabelText('Tax Obligation List');
    let taxObligationItems = [];

    await waitFor(() => {
      fireEvent.press(buttonAddCountry);
      taxObligationItems = within(taxObligationList).getAllByRole('menuitem');
    });

    expect(taxObligationItems.length).toEqual(1);
    const button = getByLabelText('Submit');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('ProfileName');
      expect(result.current.taxObligations).toEqual([
        {
          name: 'Afghanistan',
          country: 'AFG',
          reason: 'NOT_APPLICABLE',
        },
      ]);
    });
  });
});
