import React from 'react';
import { Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { DigitalWalletOutcomeScreen } from '../DigitalWalletOutcomeScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('Digital Wallet Outcome Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedUseRoute.mockReturnValue({ params: { outcome: 'success' }, key: '', name: '' });
  });

  describe('Apple Pay', () => {
    beforeEach(() => {
      Platform.OS = 'ios';
    });

    it('should render success outcome', () => {
      mockedUseRoute.mockReturnValue({ params: { outcome: 'success' }, key: '', name: '' });
      const { getByText } = render(<DigitalWalletOutcomeScreen />);
      expect(getByText('Card added to Apple Wallet.')).toBeTruthy();
      expect(getByText('You can now use your card to make mobile payments using Apple Pay.')).toBeTruthy();
    });
  });

  describe('Google Pay', () => {
    beforeEach(() => {
      Platform.OS = 'android';
    });

    it('should render success outcome', () => {
      mockedUseRoute.mockReturnValue({ params: { outcome: 'success' }, key: '', name: '' });
      const { getByText } = render(<DigitalWalletOutcomeScreen />);
      expect(getByText('Card added to Google Wallet.')).toBeTruthy();
      expect(getByText('You can now use your card to make mobile payments using Google Pay.')).toBeTruthy();
    });
  });

  it('should render failure outcome', () => {
    mockedUseRoute.mockReturnValue({ params: { outcome: 'failure' }, key: '', name: '' });
    const { getByText } = render(<DigitalWalletOutcomeScreen />);
    expect(getByText("We're sorry, something went wrong.")).toBeTruthy();
    expect(getByText("Your card hasn't been added to your Wallet. Please try again later.")).toBeTruthy();
  });

  it('should navigate next screen', () => {
    mockedUseRoute.mockReturnValue({ params: { isOnboarding: true, outcome: 'success' }, key: '', name: '' });
    const { getByLabelText } = render(<DigitalWalletOutcomeScreen />);
    const button = getByLabelText('Next');
    fireEvent.press(button);

    expect(mockedNavigate).toBeCalledWith('CardSetupStack', { screen: 'CardSetupComplete' });
  });
});
