import { generateUUID } from '../../common/utils/numbers';
import { TestGetInstaPayAvailableBalancesQueryData } from '../../features/income/instapay/utils/test-objects';
import {
  CurrencyType,
  Sign,
  WalletSetupStatus,
  WalletStatusReason,
  mockDrawdownInstapayMutation,
  mockGetAllInstapayAvailableBalancesQuery,
  mockGetAllInstapayRecurringByDaySubscriptionQuery,
  mockGetBankAccountsForOrgQuery,
  mockGetInstapaySchedulingVisibilityQuery,
  mockGetInstapayTransactionsQuery,
  mockGetInstapayUserTransactionsQuery,
  mockGetInstapayVisibilityQuery,
  mockGetWalletStatusQuery,
  mockInstapayUsageVerificationQuery,
} from '../generated';
import { aMoneyV2, anInstapayBankAccount } from '../mocks/generated-mocks';

export const instapayHandlers = [
  mockGetInstapayVisibilityQuery((_, res, ctx) => {
    return res(
      ctx.data({
        me: {
          featureVisibility: {
            instapayNow: {
              showInstapay: true,
              showEstIncome: true,
              underMaintenance: false,
            },
          },
        },
      })
    );
  }),
  mockGetBankAccountsForOrgQuery((_, res, ctx) => {
    return res(
      ctx.data({
        me: {
          org: {
            instapay: {
              bankAccounts: [
                anInstapayBankAccount({
                  externalId: '1',
                  accountName: 'NOT_TRUSTED',
                  beneficiaryId: '',
                }),
                anInstapayBankAccount({
                  externalId: '2',
                  accountName: 'TRUSTED',
                  fee: {
                    type: CurrencyType.CurrencyTypeAud,
                    units: 5,
                    subUnits: 0,
                    sign: Sign.Positive,
                  },
                }),
              ],
            },
          },
        },
      })
    );
  }),
  mockDrawdownInstapayMutation((_, res, ctx) => {
    return res(
      ctx.data({
        instapay: {
          drawdown: {
            transactionId: '1',
            messageCode: '',
            success: true,
            version: 1,
          },
        },
      })
    );
  }),
  mockGetInstapayUserTransactionsQuery((req, res, ctx) => {
    let transactions = Array.from({ length: 30 }, (_, i) => {
      if (i % 2 == 0) {
        return {
          id: generateUUID(),
          memberId: 'memberId',
          abaLodgementReference: 'IP0000004JFGWQCXDF6JRECZ30YD',
          amount: {
            units: 1,
            subUnits: 0,
            type: CurrencyType.CurrencyTypeAud,
          },
          bankAccount: {
            accountName: 'bank account',
          },
          createdAt: '2024-04-24T14:25:04.011Z',
          adminFee: aMoneyV2({ units: 1, subUnits: 0 }),
        };
      }
      return {
        id: generateUUID(),
        memberId: 'memberId',
        abaLodgementReference: 'DP0000004JFGF59AZTYRJPB4AY5X',
        amount: {
          units: 100,
          subUnits: 5,
          type: CurrencyType.CurrencyTypeAud,
        },
        bankAccount: {
          accountName: 'bank account',
        },
        createdAt: '2024-04-24T15:25:04.011Z',
        adminFee: aMoneyV2({ units: 10, subUnits: 5 }),
      };
    });
    if (req.variables.filters.payType === 'DAILYPAY') {
      transactions = transactions.filter(item => item.abaLodgementReference.startsWith('DP'));
    } else if (req.variables.filters.payType === 'INSTAPAY') {
      transactions = transactions.filter(item => item.abaLodgementReference.startsWith('IP'));
    }

    let after = 0;
    if (req.variables.after) {
      after = parseInt(req.variables.after, 10);
    }
    transactions = transactions.slice(after, after + 10);
    const pageInfo =
      transactions.length == 10
        ? {
            endCursor: (after + 10).toString(),
            hasNextPage: transactions.length == 10,
          }
        : null;

    return res(
      ctx.delay(100),
      ctx.data({
        me: {
          orgs: [
            {
              ehMemberUuid: 'ehMemberUuid',
              kpEmployeeId: 123,
              name: 'Org Name',
            },
          ],
          instapay: {
            transactions: {
              transactions,
              pageInfo,
            },
          },
        },
      })
    );
  }),
  mockInstapayUsageVerificationQuery((_, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.data({
        me: {
          orgs: [
            {
              instapay: {
                isFirstTime: true,
              },
            },
          ],
        },
      })
    );
  }),
  mockGetWalletStatusQuery((_, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.data({
        me: {
          wallet: {
            details: {
              setupStatus: {
                status: WalletSetupStatus.Completed,
                message: WalletStatusReason.None,
              },
              status: WalletSetupStatus.Completed,
            },
          },
        },
      })
    );
  }),
  mockGetInstapayTransactionsQuery((_, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.data({
        me: {
          orgs: [
            {
              instapay: {
                transactions: {
                  transactions: [
                    {
                      id: '5906e902-78a6-4304-ba22-a6e4c694c1b2',
                      amount: {
                        units: 1,
                        subUnits: 0,
                        type: CurrencyType.CurrencyTypeAud,
                      },
                      bankAccount: {
                        accountName: 'bank account',
                      },
                      createdAt: '2024-04-24T14:25:04.011Z',
                    },
                  ],
                },
              },
            },
          ],
        },
      })
    );
  }),
  mockGetAllInstapayAvailableBalancesQuery((_, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.data(
        TestGetInstaPayAvailableBalancesQueryData)
      )
  }),
  mockGetInstapaySchedulingVisibilityQuery((_, res, ctx) => {
    return res(
      ctx.data({
        me: {
          featureVisibility: {
            instapayScheduling:{
              __typename: 'Permission',
              view: true
            }
          },
        },
      })
    );
  }),
  mockGetAllInstapayRecurringByDaySubscriptionQuery((_, res, ctx) => {
    return res(
      ctx.data({
        me: {
         orgs:[{
          uuid: "5679d11c-6c72-4a33-b387-4896d4e6d13b",
          kpBusinessId: 0,
            recurringByDay:{
              currentSubscription:null
            }
         }]
        },
      })
    );
  })
];
