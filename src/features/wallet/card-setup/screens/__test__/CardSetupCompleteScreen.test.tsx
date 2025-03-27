import React from 'react';
import * as hook from '../../../../../common/hooks/useWalletOnboardingConsumer';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import { fireEvent, render } from '../../../../../common/utils/testing';
import {
  mockNavigateToBenefitsTopTabs,
  mockNavigateToTopTabs,
} from '../../../../../navigation/__mocks__/rootNavigation';
import { CardSetupCompleteScreen } from '../CardSetupCompleteScreen';

describe('Card Setup Complete Screen', () => {
  const mockFeedbackPrompt = jest.fn();

  beforeEach(() => {
    useSessionStore.setState({ handleFeedbackPrompt: mockFeedbackPrompt });
  });

  it('should render properly', () => {
    const { getByText } = render(<CardSetupCompleteScreen />);
    expect(getByText('Hooray!')).toBeTruthy();
    expect(getByText('Your Swag Spend account is ready to go!')).toBeTruthy();
  });

  it('should go to Wallet dashboard', () => {
    const { getByText } = render(<CardSetupCompleteScreen />);
    const button = getByText('Done');
    fireEvent.press(button);
    expect(mockFeedbackPrompt).toBeCalledWith('setupwallet');
    expect(mockNavigateToTopTabs).toBeCalledWith('spend-tab');
  });
  it('should go to Cashback if it comes from cashback', () => {
    jest.spyOn(hook, 'useWalletOnboardingConsumer').mockReturnValue({
      clearConsumer: jest.fn(),
      consumer: hook.WalletOnboardingConsumerType.Cashback,
      setConsumer: jest.fn(),
    });
    const { getByText } = render(<CardSetupCompleteScreen />);
    const button = getByText('Go to Perks');
    fireEvent.press(button);
    expect(mockFeedbackPrompt).toBeCalledWith('setupwallet');
    expect(mockNavigateToBenefitsTopTabs).toBeCalled();
  });
});
