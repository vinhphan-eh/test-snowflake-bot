import React from 'react';
import { regionLocalisationMockUtil } from '../../../../../../test-setup/utils/regionLocalisationMockUtil';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { WalletSetupStatus } from '../../../../../new-graphql/generated';
import { SetupSpendAccountCard } from '../SetupSpendAccountCard';

describe('Setup Spend Account Card', () => {
  beforeEach(() => {});

  it('start onboarding when Set up now is pressed', () => {
    const startOnboarding = jest.fn();
    const { getByLabelText } = render(
      <SetupSpendAccountCard eWalletSetupStatus={WalletSetupStatus.None} onContinue={startOnboarding} />
    );

    fireEvent.press(getByLabelText('Set up now'));

    expect(startOnboarding).toBeCalled();
  });

  describe('render correctly', () => {
    it('for AU users', () => {
      regionLocalisationMockUtil('AU');
      const { getByText } = render(
        <SetupSpendAccountCard eWalletSetupStatus={WalletSetupStatus.None} onContinue={jest.fn()} />
      );
      expect(getByText('Make money moves with a Spend account')).toBeTruthy();
    });

    it('for UK users', () => {
      regionLocalisationMockUtil('GB');
      const { getByText } = render(
        <SetupSpendAccountCard eWalletSetupStatus={WalletSetupStatus.None} onContinue={jest.fn()} />
      );
      expect(getByText('Make money moves with a Swag Spend Account')).toBeTruthy();
    });
  });
});
