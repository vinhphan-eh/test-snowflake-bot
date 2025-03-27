import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedGoBack, mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { anAddress } from '../../../../../../e2e/new-graphql/mocks/generated-mocks';
import { addInputSuffix, fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { MailingAddressEditScreen } from '../MailingAddressEditScreen';

const mockSetBoardingData = jest.fn();
const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

const mockUseRoute = () => {
  const value = {
    params: {
      mailingAddress: anAddress(),
      updateCallback: jest.fn(),
    },
    key: '',
    name: '',
  };
  mockedUseRoute.mockReturnValue(value);
  return value;
};

jest.mock('../../stores/useCardSetup', () => {
  return {
    useCardSetup: () => mockSetBoardingData,
  };
});

describe('Mailing Address Edit Screen', () => {
  let route: ReturnType<typeof mockUseRoute>;
  beforeEach(() => {
    jest.resetAllMocks();
    route = mockUseRoute();
  });

  it('renders properly', () => {
    const { getByTestId, getByText } = render(<MailingAddressEditScreen />);
    expect(getByText('Save')).toBeTruthy();
    expect(getByText('Edit mailing address')).toBeTruthy();
    expect(getByText('Address')).toBeTruthy();
    expect(getByText('Suburb')).toBeTruthy();
    expect(getByTestId('region-input')).toBeTruthy();
    expect(getByText('Postcode')).toBeTruthy();
  });

  it('should handle click properly', async () => {
    const { getByLabelText } = render(<MailingAddressEditScreen />);
    const button = getByLabelText('Save');

    fireEvent.press(button);
    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  it('should go back properly', async () => {
    const { getByTestId } = render(<MailingAddressEditScreen />);
    const button = getByTestId('dismiss');

    fireEvent.press(button);
    expect(mockedGoBack).toHaveBeenCalled();
  });

  test.each([
    { fieldName: 'longForm', value: '123!@', expected: 'Field cannot contain special symbols' },
    { fieldName: 'townOrCity', value: 'A789!', expected: 'Field cannot contain special symbols and numbers' },
    { fieldName: 'postcode', value: '78', expected: 'Postcode must be 4 digits' },
  ])('should show error message: $fieldName, $value', async ({ expected, fieldName, value }) => {
    const { getByDisplayValue, getByTestId, getByText } = render(<MailingAddressEditScreen />);
    const textInput = getByTestId(addInputSuffix(fieldName));
    fireEvent.changeText(textInput, value);

    await waitFor(() => expect(getByDisplayValue(value)).toBeTruthy());

    fireEvent(textInput, 'blur');

    await waitFor(() => {
      expect(mockedNavigate).not.toHaveBeenCalled();
      expect(getByText(expected)).toBeTruthy();
    });
  });

  it('should submit success', async () => {
    const { getByLabelText, getByTestId, getByText } = render(<MailingAddressEditScreen />);
    const inputs = [
      { fieldName: 'longForm', value: '123/12 fake address' },
      { fieldName: 'townOrCity', value: 'fake city' },
      { fieldName: 'postcode', value: '1234' },
    ];

    const stateSelectInput = getByTestId(addInputSuffix('region'));

    inputs.forEach(({ fieldName, value }) => {
      const textInput = getByTestId(addInputSuffix(fieldName));
      fireEvent.changeText(textInput, value);
    });

    fireEvent.press(stateSelectInput);

    await waitFor(() => {
      const stateOption = getByText('SA');
      fireEvent.press(stateOption);
      const button = getByLabelText('Save');
      fireEvent.press(button);
      expect(route.params.updateCallback).toHaveBeenCalled();
      expect(mockedGoBack).toHaveBeenCalled();
    });
  });
});
