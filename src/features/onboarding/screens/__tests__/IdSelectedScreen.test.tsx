import React from 'react';
import { mockedGoBack, mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { fireEvent, render } from '../../../../common/utils/testing';
import { IdSelectionScreen } from '../IdSelectionScreen';

describe('Identity Document Selection Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render properly', () => {
    const { getByTestId, getByText } = render(<IdSelectionScreen />);
    expect(getByText('We need to verify your ID. Which ID would you like to use?')).toBeTruthy();
    expect(getByTestId("Australian driver's licence")).toBeTruthy();
    expect(getByTestId('Australian passport')).toBeTruthy();
  });

  it('should navigate to Drivers Licence screen when Licence item selected', async () => {
    const { getByTestId } = render(<IdSelectionScreen />);
    const item = getByTestId("Australian driver's licence");

    fireEvent.press(item);
    expect(mockedNavigate).toBeCalledWith('DriversLicence');
  });

  it('should navigate to Passport screen when Passport item selected', async () => {
    const { getByTestId } = render(<IdSelectionScreen />);
    const item = getByTestId('Australian passport');

    fireEvent.press(item);
    expect(mockedNavigate).toBeCalledWith('Passport');
  });

  it('should go back previous screen by using back chevron', () => {
    const { getByTestId } = render(<IdSelectionScreen />);
    const button = getByTestId('topbar-back-icon');
    fireEvent.press(button);
    expect(mockedGoBack).toBeCalled();
  });
});
