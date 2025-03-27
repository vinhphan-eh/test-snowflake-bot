import React from 'react';
import { render, waitFor } from '../../../../../common/utils/testing';
import { mockServerNode } from '../../../../../mock-server/mockServerNode';
import { mockGetBankAccountsForOrgQuery } from '../../../../../new-graphql/generated';
import { mockedNonSSABankAccount, mockedSSABankAccount } from '../../mocks/bankAccountEntriesMocks';
import { ChooseBankAccountsForSchedulingSection } from '../ChooseBankAccountsForSchedulingSection';

describe('ChooseBankAccountsForSchedulingSection', () => {
  it('should show the spinner while loading the list of bank accounts', async () => {
    mockServerNode.use(
      mockGetBankAccountsForOrgQuery((_, res, ctx) => {
        return res(ctx.delay(3000));
      })
    );

    const mockedSetIsLoading = jest.fn();

    const { getByTestId, queryByTestId } = render(
      <ChooseBankAccountsForSchedulingSection setIsLoading={mockedSetIsLoading} selectedSchedulingAmount={123} />
    );

    await waitFor(() => {
      expect(getByTestId('instapay-scheduling-bank-account-spinner')).toBeTruthy();
      expect(mockedSetIsLoading).toHaveBeenLastCalledWith(true);
      expect(queryByTestId('instapay-scheduling-select-bank-account')).not.toBeTruthy();
    });
  });

  it('should render the list of bank accounts properly if loaded successfully', async () => {
    mockServerNode.use(
      mockGetBankAccountsForOrgQuery((_, res, ctx) => {
        return res(
          ctx.data({
            me: {
              org: {
                instapay: {
                  bankAccounts: [
                    {
                      ...mockedSSABankAccount,
                      accountName: 'Swag Spend account',
                      accountNumber: '12345678',
                      bsb: '123456',
                    },
                    {
                      ...mockedNonSSABankAccount,
                      accountName: 'Non SSA account',
                      accountNumber: '87654321',
                      bsb: '654321',
                    },
                  ],
                },
              },
            },
          })
        );
      })
    );

    const { findAllByLabelText, getByTestId, getByText } = render(
      <ChooseBankAccountsForSchedulingSection selectedSchedulingAmount={123} />
    );

    await waitFor(() => {
      expect(getByText('Choose a receiving account'));
      expect(getByText('* Each withdrawal incurs a transaction fee.'));
      expect(getByTestId('instapay-scheduling-select-bank-account')).toBeTruthy();
    });

    const allBankAccountOptions = await findAllByLabelText('radio-card-item');
    expect(allBankAccountOptions).toHaveLength(2);

    // Expect rendering of the first account
    expect(getByText('Swag Spend account')).toBeTruthy();
    expect(getByText('123-456 | 12345678')).toBeTruthy();
    expect(getByText('$1.60 fee')).toBeTruthy(); // 1.3% of $123.00
    expect(getByText('based on 1.3% fee')).toBeTruthy();

    // Expect rendering of the second account
    expect(getByText('Non SSA account')).toBeTruthy();
    expect(getByText('654-321 | 87654321')).toBeTruthy();
    expect(getByText('$1.85 fee')).toBeTruthy(); // 1.3% of $123.00
    expect(getByText('based on 1.5% fee')).toBeTruthy();
  });
});
