import React from 'react';
import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { mockServerNode } from '../../../../mock-server/mockServerNode';
import { mockNavigateToTopTabs } from '../../../../navigation/__mocks__/rootNavigation';
import { mockGetWalletStatusQuery, WalletSetupStatus, WalletStatusReason } from '../../../../new-graphql/generated';
import { aSetupStatus } from '../../../../new-graphql/mocks/generated-mocks';
import { WaitingScreen } from '../WaitingScreen';

describe('Waiting screen', () => {
  it('should render correctly', () => {
    const { getByText } = render(<WaitingScreen />);
    expect(getByText('Checking your details')).toBeTruthy();
    expect(
      getByText(
        'This can take up to 1 business day. Feel free to come back later to check the status of your Swag Spend account application. You may be contacted via email if we require more information.'
      )
    ).toBeTruthy();
  });

  test('should go back to Dashboard when an user click close button', () => {
    const { getByText } = render(<WaitingScreen />);
    const button = getByText('Close');
    fireEvent.press(button);
    expect(mockNavigateToTopTabs).toBeCalledWith('spend-tab');
  });

  it('should navigate Success Screen when API returns e-wallet setup completed', async () => {
    mockServerNode.use(
      mockGetWalletStatusQuery((_, res, ctx) =>
        res(
          ctx.data({
            me: {
              wallet: {
                details: {
                  setupStatus: aSetupStatus({ status: WalletSetupStatus.Completed }),
                  status: '',
                },
              },
            },
          })
        )
      )
    );

    render(<WaitingScreen />);

    await waitFor(
      () => {
        expect(mockedNavigate).toBeCalledWith('Success');
      },
      { timeout: 10000 }
    );
  });

  it('should navigate Decline Screen when API returns e-wallet setup declined', async () => {
    mockServerNode.use(
      mockGetWalletStatusQuery((_, res, ctx) =>
        res(
          ctx.data({
            me: {
              wallet: {
                details: {
                  setupStatus: aSetupStatus({
                    status: WalletSetupStatus.Failed,
                    message: WalletStatusReason.ManualRejected,
                  }),
                  status: 'FAILED',
                },
              },
            },
          })
        )
      )
    );

    render(<WaitingScreen />);

    await waitFor(
      () => {
        expect(mockedNavigate).toBeCalledWith('Decline');
      },
      { timeout: 10000 }
    );
  });
});
