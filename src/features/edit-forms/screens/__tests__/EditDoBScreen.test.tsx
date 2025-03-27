import React from 'react';
import { useRoute } from '@react-navigation/native';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { mockedNavigate, mockedGoBack } from '../../../../../__mocks__/react-navigation';
import { addInputSuffix, render } from '../../../../common/utils/testing';
import { EditDoBScreen } from '../EditDoBScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

const mockUseRoute = () => {
  const value = {
    params: {
      name: 'name',
      updateCallback: jest.fn(),
      dateOfBirth: '10 Aug 1990',
    },
    key: '',
    name: '',
  };
  mockedUseRoute.mockReturnValue(value);
  return value;
};

describe('Profile Date of Birth Edit Screen', () => {
  let route: ReturnType<typeof mockUseRoute>;

  beforeEach(() => {
    jest.resetAllMocks();
    route = mockUseRoute();
  });

  it('renders properly', () => {
    const { getByLabelText, getByTestId, getByText } = render(<EditDoBScreen />);
    expect(getByTestId('back')).toBeTruthy();
    expect(getByText(`Edit birthday`)).toBeTruthy();
    expect(getByTestId(addInputSuffix('dob'))).toBeTruthy();
    expect(getByLabelText('Save')).toBeTruthy();
  });

  it('should not go to save screen', () => {
    const { getByLabelText } = render(<EditDoBScreen />);
    const saveButton = getByLabelText('Save');
    fireEvent.press(saveButton);
    expect(mockedNavigate).not.toBeCalled();
  });

  it('should be able to go back', () => {
    const { getByTestId } = render(<EditDoBScreen />);
    const saveButton = getByTestId('back');
    fireEvent.press(saveButton);
    expect(mockedGoBack).toBeCalled();
  });

  describe('user input valid date', () => {
    it('works correctly with default start date', async () => {
      const { getByDisplayValue, getByTestId, getByText } = render(<EditDoBScreen />);
      const dobInput = getByTestId(addInputSuffix('dob'));

      await waitFor(() => {
        fireEvent.press(dobInput);
        fireEvent.press(getByText('Confirm'));
      });
      expect(getByDisplayValue('10 Aug 1990')).toBeTruthy();
    });

    it('works correctly when choosing date', async () => {
      const { getByDisplayValue, getByTestId, getByText } = render(<EditDoBScreen />);
      const dobInput = getByTestId(addInputSuffix('dob'));

      await waitFor(() => {
        fireEvent.press(dobInput);

        const date = new Date('1998-09-11');
        fireEvent(getByTestId('datePickerIOS'), 'onChange', {
          nativeEvent: { timestamp: date },
          date,
        });

        fireEvent.press(getByText('Confirm'));
        expect(getByDisplayValue('11 Sep 1998')).toBeTruthy();
      });
    });

    it('should go to next screen when pressing save button', async () => {
      const { getByLabelText, getByTestId } = render(<EditDoBScreen />);
      const dobInput = getByTestId(addInputSuffix('dob'));
      fireEvent(dobInput, 'onConfirm', '11 Sep 1998');

      await waitFor(() => {
        const button = getByLabelText('Save');
        fireEvent.press(button);
        expect(route.params.updateCallback).toBeCalled();
      });
    });

    it('should navigate with specific screen and stack', async () => {
      const mockedUseRoute1 = useRoute as jest.MockedFunction<typeof useRoute>;

      const value = {
        params: {
          name: 'name',
          updateCallback: jest.fn(),
          dateOfBirth: undefined,
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

      const { getByLabelText, getByTestId } = render(<EditDoBScreen />);
      const dobInput = getByTestId(addInputSuffix('dob'));
      fireEvent(dobInput, 'onConfirm', '11 Sep 1998');

      await waitFor(() => {
        const button = getByLabelText('Save');
        fireEvent.press(button);
        expect(mockedNavigate).toBeCalledWith(value.params.navigationTo.screen, value.params.navigationTo.params);
      });
    });
  });
});
