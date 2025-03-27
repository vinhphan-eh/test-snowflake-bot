import React from 'react';
import { useRoute } from '@react-navigation/native';
import { fireEvent, render } from '../../../../common/utils/testing';
import { PhoneNumberDuplicatedScreen } from '../PhoneNumberDuplicatedScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

const mockUseRoute = () => {
  const value = {
    params: {
      onBack: jest.fn(),
    },
    key: '',
    name: '',
  };
  mockedUseRoute.mockReturnValue(value);
  return value;
};

describe('Phone Number Duplicated Screen', () => {
  let route: ReturnType<typeof mockUseRoute>;
  beforeEach(() => {
    jest.resetAllMocks();
    route = mockUseRoute();
  });

  it('should render correctly', () => {
    const { getByText } = render(<PhoneNumberDuplicatedScreen />);
    expect(getByText(`This phone number already exists in our system.`)).toBeTruthy();
    expect(
      getByText(
        `We're unable to update your mobile number as it is linked to another account. Please try a different mobile number.`
      )
    ).toBeTruthy();
  });

  test('should go back to Profile when an user click close button', () => {
    const { getByText } = render(<PhoneNumberDuplicatedScreen />);
    const button = getByText('Close');
    fireEvent.press(button);
    expect(route.params.onBack).toBeCalled();
  });
});
