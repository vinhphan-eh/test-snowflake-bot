import React from 'react';
import { useRoute } from '@react-navigation/native';
import { fireEvent, render } from '../../../../common/utils/testing';
import { WaitingScreen } from '../WaitingScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;
const mockOnBack = jest.fn();

describe('Waiting screen', () => {
  beforeEach(() => {
    mockedUseRoute.mockReturnValue({
      params: { isNameChanged: false, onBack: mockOnBack },
      key: '',
      name: '',
    });
  });

  it('should render correctly', () => {
    const { getByText } = render(<WaitingScreen />);
    expect(getByText('Checking your details')).toBeTruthy();
    expect(
      getByText(
        "Feel free come back later to check the status of your Birthday update. You may be contacted via email if we require more information. You'll still see your old details until your update has been confirmed."
      )
    ).toBeTruthy();
  });

  test('should go back to Profile when an user click close button', () => {
    const { getByText } = render(<WaitingScreen />);
    const button = getByText('Close this screen');
    fireEvent.press(button);
    expect(mockOnBack).toBeCalled();
  });
});
