import React from 'react';
import { fireEvent, render } from '../../../../../../common/utils/testing';
import { WalletSetupStatus } from '../../../../../../new-graphql/generated';
import { HeroWalletStatusCard } from '../HeroWalletStatusCard';

const inProgressMessage =
  'We’re checking your details. Come back later to see the status of your Spend account application.';
const helpCenter = 'Visit our Help Centre';

describe('HeroWalletStatusCard', () => {
  const mockPress = jest.fn();

  it('should display the default screen when status is not given', () => {
    const { getByText } = render(
      <HeroWalletStatusCard navigateToHeroWalletOnboarding={mockPress} navigateToHelpCenter={mockPress} />
    );
    expect(getByText('Claim your cash!')).toBeTruthy();
    expect(getByText('Open a Spend account')).toBeTruthy();
  });

  it('should display in progress screen when e wallet status is in progress', () => {
    const { getByText } = render(
      <HeroWalletStatusCard
        heroWalletStatus={WalletSetupStatus.InProgress}
        navigateToHeroWalletOnboarding={mockPress}
        navigateToHelpCenter={mockPress}
      />
    );
    expect(getByText(inProgressMessage)).toBeTruthy();
  });

  it('should hide alert warning when dismiss button is tapped', () => {
    const { getByTestId, getByText, queryByText } = render(
      <HeroWalletStatusCard
        heroWalletStatus={WalletSetupStatus.InProgress}
        navigateToHeroWalletOnboarding={mockPress}
        navigateToHelpCenter={mockPress}
      />
    );
    expect(getByText(inProgressMessage)).toBeTruthy();

    fireEvent.press(getByTestId('alert-close-icon'));
    expect(queryByText(inProgressMessage)).toBeNull();
    expect(getByText('Application in progress...')).toBeTruthy();
    expect(getByText('Thanks for applying!')).toBeTruthy();
  });

  it('should display declined screen when e wallet status is declined', () => {
    const { getByText } = render(
      <HeroWalletStatusCard
        heroWalletStatus={WalletSetupStatus.Failed}
        navigateToHeroWalletOnboarding={mockPress}
        navigateToHelpCenter={mockPress}
      />
    );
    expect(getByText(helpCenter)).toBeTruthy();
  });

  it('should hide alert error when dismiss button is tapped', () => {
    const { getByTestId, getByText, queryByText } = render(
      <HeroWalletStatusCard
        heroWalletStatus={WalletSetupStatus.Failed}
        navigateToHeroWalletOnboarding={mockPress}
        navigateToHelpCenter={mockPress}
      />
    );
    expect(getByText(helpCenter)).toBeTruthy();

    fireEvent.press(getByTestId('alert-close-icon'));
    expect(queryByText(helpCenter)).toBeNull();
    expect(getByText('Claim your cash!')).toBeTruthy();
    expect(getByText('Open a Spend account')).toBeTruthy();
  });

  it('should display Enrol Swag Visa Debit card screen when e wallet status is completed', () => {
    const { getByText } = render(
      <HeroWalletStatusCard
        heroWalletStatus={WalletSetupStatus.Completed}
        navigateToHeroWalletOnboarding={mockPress}
        navigateToHelpCenter={mockPress}
        onManualHeroWalletEnrolment={mockPress}
      />
    );
    expect(getByText('Enrol Swag Visa Debit card')).toBeTruthy();
  });
});
