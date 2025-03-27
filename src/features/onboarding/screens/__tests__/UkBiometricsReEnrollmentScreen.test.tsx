import React from 'react';
import { mockedGoBack } from '../../../../../__mocks__/react-navigation';
import { fireEvent, render, waitFor, act } from '../../../../common/utils/testing';
import { useWeavrBiometrics } from '../../hooks/useWeavrBiometrics';
import { UkBiometricReEnrollmentScreen } from '../UkBiometricReEnrollmentScreen';

jest.mock('../../hooks/useWeavrBiometrics', () => ({
  useWeavrBiometrics: jest.fn(),
}));

describe('UkBiometricReEnrollment', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useWeavrBiometrics as jest.Mock).mockReturnValue({
      getUKToken: jest.fn(() => Promise.resolve('')),
      weavrBeginEnrollment: jest.fn(() => Promise.resolve()),
    });
  });
  it('should render properly', () => {
    const { getByText } = render(<UkBiometricReEnrollmentScreen />);
    expect(getByText('Please confirm your fingerprint / Face ID.')).toBeTruthy();
    expect(
      getByText('For your security, we need to confirm your fingerprint/Face ID before verifying your identity')
    ).toBeTruthy();
  });

  it('should go to dashboard if enroll success', async () => {
    const { getByTestId } = render(<UkBiometricReEnrollmentScreen />);
    const nextButton = getByTestId('uk-re-enroll-biometrics-next-btn');

    act(() => {
      fireEvent.press(nextButton);
    });
    await waitFor(() => {
      expect(mockedGoBack).toBeCalled();
    });
  });
});
