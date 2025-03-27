import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedNavigate, mockedGoBack } from '../../../../../__mocks__/react-navigation';
import { addInputSuffix, fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { EditNameScreen } from '../EditNameScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

const mockUseRoute = () => {
  const value = {
    params: {
      name: 'name',
      updateCallback: jest.fn(),
    },
    key: '',
    name: '',
  };
  mockedUseRoute.mockReturnValue(value);
  return value;
};

describe('Profile Name Edit Screen', () => {
  let route: ReturnType<typeof mockUseRoute>;
  beforeEach(() => {
    jest.resetAllMocks();
    route = mockUseRoute();
  });

  it('should render properly', () => {
    const { getByTestId, getByText } = render(<EditNameScreen />);
    expect(getByText('Save')).toBeTruthy();
    expect(getByText('First name')).toBeTruthy();
    expect(getByText('Middle name (optional)')).toBeTruthy();
    expect(getByText('Last name')).toBeTruthy();
    expect(getByTestId('back')).toBeTruthy();
  });

  it('should go back properly', async () => {
    const { getByTestId } = render(<EditNameScreen />);
    const button = getByTestId('back');

    fireEvent.press(button);
    expect(mockedGoBack).toBeCalled();
  });

  it('should handle click properly', async () => {
    const { getByLabelText } = render(<EditNameScreen />);
    const button = getByLabelText('Save');

    fireEvent.press(button);
    expect(mockedNavigate).not.toBeCalled();
  });

  it('should replace helper text with error in middle name', async () => {
    const { getByDisplayValue, getByTestId, getByText, queryByText } = render(<EditNameScreen />);
    const textInput = getByTestId(addInputSuffix('middleName'));

    fireEvent.changeText(textInput, '*');

    await waitFor(() => expect(getByDisplayValue('*')).toBeTruthy());

    fireEvent(textInput, 'blur');

    expect(queryByText('You must include if shown on your ID')).toBeNull();
    expect(getByText('Field cannot contain numbers or special characters')).toBeTruthy();
  });

  test.each([
    { fieldName: 'firstName', value: `O'Nelly`, expected: 'Field cannot contain numbers or special characters' },
    { fieldName: 'middleName', value: 'Hey-Name', expected: 'Field cannot contain numbers or special characters' },
    { fieldName: 'lastName', value: 'Tran Dang', expected: 'Field cannot contain numbers or special characters' },
  ])('should not show error message: $fieldName, $value', async ({ expected, fieldName, value }) => {
    const { getByDisplayValue, getByTestId, queryByText } = render(<EditNameScreen />);
    const textInput = getByTestId(addInputSuffix(fieldName));
    fireEvent.changeText(textInput, value);

    await waitFor(() => expect(getByDisplayValue(value)).toBeTruthy());

    fireEvent(textInput, 'blur');

    await waitFor(() => {
      expect(mockedNavigate).not.toBeCalled();
      expect(queryByText(expected)).toBeNull();
    });
  });

  test.each([
    { fieldName: 'firstName', value: '123', expected: 'Field cannot contain numbers or special characters' },
    { fieldName: 'middleName', value: '456', expected: 'Field cannot contain numbers or special characters' },
    { fieldName: 'lastName', value: 'A789', expected: 'Field cannot contain numbers or special characters' },
  ])('should show error message: $fieldName, $value', async ({ expected, fieldName, value }) => {
    const { getByDisplayValue, getByTestId, getByText } = render(<EditNameScreen />);
    const textInput = getByTestId(addInputSuffix(fieldName));
    fireEvent.changeText(textInput, value);

    await waitFor(() => expect(getByDisplayValue(value)).toBeTruthy());

    fireEvent(textInput, 'blur');

    await waitFor(() => {
      expect(mockedNavigate).not.toBeCalled();
      expect(getByText(expected)).toBeTruthy();
    });
  });

  it('should submit success', async () => {
    const { getByLabelText, getByTestId } = render(<EditNameScreen />);
    const fieldsName = ['firstName', 'middleName', 'lastName'];
    fieldsName.forEach(fieldName => {
      const textInput = getByTestId(addInputSuffix(fieldName));
      fireEvent.changeText(textInput, fieldName);
    });

    await waitFor(() => {
      const button = getByLabelText('Save');

      fireEvent.press(button);
      expect(route.params.updateCallback).toBeCalled();
    });
  });

  it('should navigate with specific screen', async () => {
    const mockedUseRoute1 = useRoute as jest.MockedFunction<typeof useRoute>;

    const value = {
      params: {
        name: 'name',
        updateCallback: jest.fn(),
        navigationTo: {
          screen: 'screen',
          params: {
            isNameChanged: true,
          },
        },
      },
      key: '',
      name: '',
    };

    mockedUseRoute1.mockReturnValue(value);
    const { getByLabelText, getByTestId } = render(<EditNameScreen />);
    const fieldsName = ['firstName', 'middleName', 'lastName'];
    fieldsName.forEach(fieldName => {
      const textInput = getByTestId(addInputSuffix(fieldName));
      fireEvent.changeText(textInput, fieldName);
    });

    await waitFor(() => {
      const button = getByLabelText('Save');

      fireEvent.press(button);
      expect(mockedNavigate).toBeCalledWith(value.params.navigationTo.screen, value.params.navigationTo.params);
    });
  });
});
