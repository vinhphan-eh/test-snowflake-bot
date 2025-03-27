import {
  mockInstapayBankAccountsQuery,
  mockInstapayFeeQuery,
  mockInstapayHistoryV2Query,
  mockInstapayInfoQuery,
} from '../generated';
import {
  anEhMembership,
  anInstapayBankAccount,
  anInstapayHistory,
  anInstapayInfo,
} from '../mocks/generated-mocks';
import { mockGetAllInstapayAvailableBalancesQuery } from '../../new-graphql/generated';
// import { mockDrawdownWageGeneralError, mockDrawdownWageRefuseMaxBalanceExceed } from './custom-mock/drawdownWage';

export const incomeHandlers = [
  mockInstapayBankAccountsQuery((_, res, ctx) => {
    return res(
      ctx.delay(600),
      ctx.data({
        instapayBankAccounts: [
          anInstapayBankAccount({
            accountName: 'Duc Nguyen',
            bsb: '123666',
            accountNumber: '11209000',
            fee: 400,
            external_id: '123',
          }),
          anInstapayBankAccount({
            accountName: 'Duc Nguyen Saving',
            bsb: '636220',
            accountNumber: '11234577',
            fee: 300,
            external_id: '456',
          }),
        ],
      })
    );
  }),
  mockInstapayFeeQuery((_, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.data({
        instapayFee: {
          fee: 3.5,
        },
      })
    );
  }),
  mockInstapayInfoQuery((_, res, ctx) => {
    return res(
      ctx.delay(200),
      ctx.data({
        instapayInfo: [
          anInstapayInfo({
            membership: anEhMembership({
              orgId: '1',
              orgName: 'Employer 1',
            }),
          }),
          anInstapayInfo({
            membership: anEhMembership({
              orgId: '2',
              orgName: 'Employer 2',
            }),
          }),
        ],
      })
    );
  }),
  mockInstapayHistoryV2Query((_, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.data({
        instapayHistoryV2: [
          anInstapayHistory({ createdAt: new Date('2023-01-05T15:54:02.303Z').toISOString(), id: '1' }),
          anInstapayHistory({ createdAt: new Date('2023-02-05T15:54:02.303Z').toISOString(), id: '2' }),
          anInstapayHistory({ createdAt: new Date('2023-03-05T15:54:02.303Z').toISOString(), id: '3' }),
          anInstapayHistory({ createdAt: new Date('2023-04-05T15:54:02.303Z').toISOString(), id: '4' }),
          anInstapayHistory({ createdAt: new Date('2023-05-05T15:54:02.303Z').toISOString(), id: '5' }),
          anInstapayHistory({ createdAt: new Date('2023-06-05T15:54:02.303Z').toISOString(), id: '6' }),
          anInstapayHistory({ createdAt: new Date('2023-07-05T15:54:02.303Z').toISOString(), id: '7' }),
        ],
      })
    );
  }),
  mockGetAllInstapayAvailableBalancesQuery((_, res, ctx) => {
    return res(
      ctx.data({
        me: {
          orgs: [
            {
              id:1,
              uuid: '1',
              kpBusinessId: 0,
              name: 'eHero',
              member: {
                ehMemberUuid: '1',
                kpEmployeeId: 0,
                work_country: 'AU',
              },
              instapay: {
                balance: { balance: 200, id: '2', __typename: 'InstapayBalance' },
                withdrawalLimit: {
                  withdrawalMaxLimit: 250,
                  withdrawalMinLimit: 100,
                  schedulingWithdrawalMinLimit: 100,
                  __typename: 'InstapayWithdrawalLimit',
                },
              },
            },
            {
              id:1,
              uuid: '2',
              kpBusinessId: 0,
              name: 'eBenefits',
              member: {
                ehMemberUuid: '2',
                kpEmployeeId: 0,
                work_country: 'AU',
              },
              instapay: {
                balance: { balance: 90, id: '1', __typename: 'InstapayBalance' },
                withdrawalLimit: {
                  withdrawalMaxLimit: 250,
                  withdrawalMinLimit: 100,
                  schedulingWithdrawalMinLimit: 100,
                  __typename: 'InstapayWithdrawalLimit',
                },
              },
            },
          ],
        },
      })
    );
  }),
];
