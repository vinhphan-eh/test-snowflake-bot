import {
  type EWalletQuery,
  mockEWalletQuery,
  mockGetCurrentCardDetailsQuery,
  mockGetCurrentCardMetaQuery,
  mockGetPayAccountQuery,
  mockInitiateEWalletSetupMutation,
  mockMembershipsQuery,
  mockAllocationsQuery,
  mockPayAccountMutation,
  PaySplitType,
  mockGetPersistentNotificationsQuery,
  mockGetIdvProfileQuery,
} from '../generated';
import {
  anEhMembership,
  anEWalletDetails,
  aPayAccountDetails,
  aPayAccountAllocation,
  aUser,
  aCard,
  aCardMeta,
  aPayAllocation,
  aPersistentNotification,
  anIdvProfile,
} from '../mocks/generated-mocks';

export const eWalletHandlers = [
  mockEWalletQuery((_, res, ctx) => {
    const result: EWalletQuery = {
      eWallet: anEWalletDetails({
        accountName: 'eBenefits saving account',
        accountNumber: '1233311222',
        bsb: '636220',
      }),
    };
    return res(ctx.delay(100), ctx.data(result));
  }),
  mockPayAccountMutation((_, res, ctx) => {
    return res(ctx.delay(100), ctx.data({ payAccount: true }));
  }),
  mockMembershipsQuery((_, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.data({
        memberships: [
          anEhMembership({
            orgId: '1',
            orgName: 'Employer 1',
          }),
          anEhMembership({
            orgId: '2',
            orgName: 'Employer 2',
          }),
        ],
      })
    );
  }),
  mockGetPayAccountQuery((_, res, ctx) => {
    return res(ctx.delay(100), ctx.data({ getPayAccount: aPayAccountAllocation() }));
  }),
  mockAllocationsQuery((_, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.data({
        allocations: [
          aPayAllocation({
            allocation: aPayAccountAllocation({
              bankAccounts: [
                aPayAccountDetails({
                  accountName: 'neque',
                  accountNumber: 'ea',
                  amount: '20',
                  bsb: '123456',
                }),
              ],
              bankSplitType: PaySplitType.Percentage,
            }),
            membership: anEhMembership({
              orgId: '1',
              orgName: 'Employer 1',
            }),
          }),
          aPayAllocation({
            allocation: aPayAccountAllocation({
              bankAccounts: [
                aPayAccountDetails({
                  accountName: 'neque',
                  accountNumber: 'ea',
                  amount: '20',
                  bsb: '123456',
                }),
              ],
              bankSplitType: PaySplitType.FixedAmount,
            }),
            membership: anEhMembership({
              orgId: '2',
              orgName: 'Employer 2',
              xeroConnected: false,
            }),
          }),
          aPayAllocation({
            allocation: aPayAccountAllocation({
              bankAccounts: [
                aPayAccountDetails({
                  accountName: 'neque',
                  accountNumber: 'ea',
                  amount: '20',
                  bsb: '123',
                }),
              ],
              bankSplitType: PaySplitType.FixedAmount,
            }),
            membership: anEhMembership({
              orgId: '3',
              orgName: 'Employer 3',
              xeroConnected: false,
            }),
          }),
        ],
      })
    );
  }),
  mockInitiateEWalletSetupMutation((_, res, ctx) => {
    return res(ctx.delay(100), ctx.data({ initiateEWalletSetup: aUser() }));
  }),
  mockGetCurrentCardDetailsQuery((_, res, ctx) => {
    return res(ctx.delay(100), ctx.data({ getCurrentCardDetails: aCard() }));
  }),
  mockGetCurrentCardMetaQuery((_, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.data({
        getCurrentCardMeta: aCardMeta(),
      })
    );
  }),
  mockGetPersistentNotificationsQuery((_, res, ctx) => {
    return res(ctx.delay(100), ctx.data({ getPersistentNotifications: [aPersistentNotification()] }));
  }),
  mockGetIdvProfileQuery((_, res, ctx) => {
    return res(ctx.delay(100), ctx.data({ getIDVProfile: anIdvProfile() }));
  }),
];
