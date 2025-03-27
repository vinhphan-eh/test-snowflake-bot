import React from 'react';
import { mockedGoBack } from '../../../../../../../../__mocks__/react-navigation';
import { render, fireEvent } from '../../../../../../../common/utils/testing';
import { mockServerNode as mockServer } from '../../../../../../../mock-server/mockServerNode';
import { mockCashbackTransactionsV2Query } from '../../../../../../../new-graphql/generated';
import { aCashbackTransactionsV2 } from '../../../../../../../new-graphql/mocks/generated-mocks';
import { CashbackOverviewScreen } from '../CashbackOverviewScreen';

describe('CashbackOverviewScreen', () => {
  beforeEach(() => {
    mockServer.use(
      mockCashbackTransactionsV2Query((_, res, context) => {
        return res(
          context.status(200),
          context.data({
            me: {
              cashback: {
                transactionsV2: {
                  ...aCashbackTransactionsV2({
                    confirmed: 15,
                    total: 20,
                    pending: 5,
                  }),
                  error: undefined,
                },
              },
            },
          })
        );
      })
    );
  });

  it('should render correctly when user has hero wallet and other linked cards', async () => {
    const { findAllByText, findByText } = render(<CashbackOverviewScreen />);
    expect(await findByText('lifetime cashback')).toBeTruthy();
    expect(await findByText('Pending')).toBeTruthy();
    expect(await findAllByText('Confirmed')).toBeTruthy();
    expect(await findByText('Cashback history')).toBeTruthy();
    expect(await findByText('Cashback activity')).toBeTruthy();
  });

  it('should go back correctly', async () => {
    const { getByTestId } = render(<CashbackOverviewScreen />);
    fireEvent.press(getByTestId('topbar-back-icon'));
    expect(mockedGoBack).toBeCalled();
  });
});
