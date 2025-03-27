import React from 'react';
import { render } from '../../../../../../../../common/utils/testing';
import { WalletSetupStatus } from '../../../../../../../../new-graphql/generated';
import { Alert } from '../Alert';

describe('Alert', () => {
  it('Should show alert if wallet status is in progress', () => {
    const { getByTestId, getByText } = render(<Alert walletStatus={WalletSetupStatus.InProgress} />);
    expect(getByTestId('alert')).toBeTruthy();
    expect(
      getByText('We’re checking your details. Come back later to see the status of your Spend account application.')
    ).toBeTruthy();
  });

  it('Should show alert if wallet status is failed', () => {
    const { getByTestId, getByText } = render(<Alert walletStatus={WalletSetupStatus.Failed} />);
    expect(getByTestId('alert')).toBeTruthy();
    expect(
      getByText('Sorry, you didn’t qualify for a Spend account. Try again later or', { exact: false })
    ).toBeTruthy();
  });

  it.each([undefined, null, WalletSetupStatus.Completed, WalletSetupStatus.None])(
    'should not show alert if status is %s',
    status => {
      const { queryByTestId } = render(<Alert walletStatus={status} />);
      expect(queryByTestId('alert')).toBeNull();
    }
  );
});
