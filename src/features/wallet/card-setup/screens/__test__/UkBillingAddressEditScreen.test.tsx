import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedGoBack } from '../../../../../../__mocks__/react-navigation';
import { act, fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { UkBillingAddressEditScreen } from '../UkBillingAddressEditScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

const mockAddress = {
  longForm: '123 Main St',
  townOrCity: 'London',
  region: 'Greater London',
  postcode: 'SW1A 1AA',
};
const mockUseRoute = () => {
  const value = {
    params: {
      address: mockAddress,
      updateCallback: jest.fn(),
    },
    key: '',
    name: '',
  };
  mockedUseRoute.mockReturnValue(value);
  return value;
};

describe('UkBillingAddressEditScreen', () => {
  let route: ReturnType<typeof mockUseRoute>;

  beforeEach(() => {
    route = mockUseRoute();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the mailing address form with the user data', async () => {
    const { getByTestId, getByText } = render(<UkBillingAddressEditScreen />);

    await waitFor(() => expect(getByText('Edit billing address')).toBeDefined());
    expect(getByTestId('longForm-input'));
    expect(getByTestId('addressLine2-input'));
    expect(getByTestId('townOrCity-input'));
    expect(getByTestId('postcode-input'));
    expect(getByText('Save')).toBeDefined();
  });

  it('updates the billing address and navigates back to the UK billing address screen when the save button is pressed', async () => {
    const { getByLabelText, getByTestId } = render(<UkBillingAddressEditScreen />);
    const newAddress = {
      longForm: '456 New St',
      addressLine2: 'Apt 5',
      townOrCity: 'Manchester',
      postcode: 'SW1A 1AA',
    };
    const saveButton = getByLabelText('Save');

    await waitFor(() => expect(saveButton).toBeDefined());
    act(() => {
      fireEvent.changeText(getByTestId('longForm-input'), newAddress.longForm);
      fireEvent.changeText(getByTestId('addressLine2-input'), newAddress.addressLine2);
      fireEvent.changeText(getByTestId('townOrCity-input'), newAddress.townOrCity);
      fireEvent.changeText(getByTestId('postcode-input'), newAddress.postcode);
    });

    await waitFor(() => {
      expect(saveButton).toBeEnabled();
    });

    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(route.params.updateCallback).toBeCalled();
      expect(mockedGoBack).toHaveBeenCalled();
    });
  });
});
