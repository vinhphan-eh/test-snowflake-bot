import React from 'react';
import { mockedGoBack } from '../../../../../__mocks__/react-navigation';
import { fireEvent, render } from '../../../../common/utils/testing';
import { UkBiometricsScreen } from '../UkBiometricsScreen';

describe('UkBiometricsScreen', () => {
  it('should render properly', () => {
    const { getByText } = render(<UkBiometricsScreen />);
    expect(
      getByText(
        ' For your security, we need to confirm your fingerprint/Face ID before verifying your identity. This will ensure that only you can access any ID documents you upload.'
      )
    ).toBeTruthy();
  });

  it('should navigate back on clicked', async () => {
    const { getByTestId } = render(<UkBiometricsScreen />);
    const button = getByTestId('topbar-back-icon');

    fireEvent.press(button);
    expect(mockedGoBack).toBeCalled();
  });
});
