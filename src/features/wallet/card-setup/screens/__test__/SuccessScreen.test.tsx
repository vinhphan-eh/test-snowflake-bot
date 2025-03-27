import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { mockNavigateToTopTabs } from '../../../../../navigation/__mocks__/rootNavigation';
import { SuccessScreen } from '../SuccessScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('Success Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockedUseRoute.mockReturnValue({ params: { resetCardPin: false }, key: '', name: '' });
  });

  it('should render properly', () => {
    const { getByText } = render(<SuccessScreen />);
    expect(getByText('Your card is on the way!')).toBeTruthy();
    expect(
      getByText(`It should arrive in 7-10 business days. Now let's add your card to your digital wallet.`)
    ).toBeTruthy();
  });

  it('should go to digital provisioning setup', () => {
    const { getByText } = render(<SuccessScreen />);
    const button = getByText('Next');
    fireEvent.press(button);
    expect(mockedNavigate).toBeCalledWith('DigitalWalletStack', {
      screen: 'DigitalWalletSetup',
      params: { isOnboarding: true },
    });
  });

  it('should go to Wallet dashboard', () => {
    mockedUseRoute.mockReturnValue({ params: { resetCardPin: true }, key: '', name: '' });
    const { getByText } = render(<SuccessScreen />);
    const button = getByText('Done');
    fireEvent.press(button);
    expect(getByText('Nice one!')).toBeTruthy();
    expect(getByText('Your Visa debit card PIN has been updated.')).toBeTruthy();
    expect(mockNavigateToTopTabs).toBeCalledWith('card-tab');
  });
});
