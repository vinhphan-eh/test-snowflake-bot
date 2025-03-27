import React from 'react';
import { useRoute } from '@react-navigation/native';
import { fireEvent, render } from '../../../../common/utils/testing';
import { SomethingWentWrongScreen } from '../SomethingWentWrongScreen';

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

describe('Something Went Wrong Screen', () => {
  let route: ReturnType<typeof mockUseRoute>;
  beforeEach(() => {
    jest.resetAllMocks();
    route = mockUseRoute();
  });

  it('should render correctly', () => {
    const { getByText } = render(<SomethingWentWrongScreen />);
    expect(getByText(`We're sorry, something went wrong.`)).toBeTruthy();
    expect(getByText('Please try again later.')).toBeTruthy();
  });

  test('should go back to Profile when an user click close button', () => {
    const { getByText } = render(<SomethingWentWrongScreen />);
    const button = getByText('Close');
    fireEvent.press(button);
    expect(route.params.onBack).toBeCalled();
  });
});
