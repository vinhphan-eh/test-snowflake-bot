import {
  mockGetGroupsQuery,
  mockGetGroupCategoriesQuery,
  mockGetGroupDetailQuery,
  mockJoinWaitListWithCategoriesMutation,
  mockJoinGroupWithConsentAgreementMutation,
  mockGetUserGroupMembershipAndConsentQuery,
} from '../generated';
import { aGroupMembership } from '../mocks/generated-mocks';
import {
  MockGroupCategories,
  MockGroups,
  MockJoinWaitListWithCategoriesMutationResponeData,
} from './custom-mock/group';

export const groupHandlers = [
  mockGetGroupCategoriesQuery((_, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.data({
        group: {
          categories: MockGroupCategories,
        },
      })
    );
  }),
  mockJoinWaitListWithCategoriesMutation((_, res, ctx) => {
    return res(ctx.delay(1000), ctx.data(MockJoinWaitListWithCategoriesMutationResponeData));
  }),
  mockGetGroupsQuery((_, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.data({
        group: {
          groups: [...MockGroups],
        },
      })
    );
  }),
  mockGetGroupDetailQuery((_, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.data({
        group: {
          groupDetail: MockGroups[0],
        },
      })
    );
  }),
  mockGetUserGroupMembershipAndConsentQuery((_, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.data({
        me: {
          group: { groupMembership: aGroupMembership() },
          userGroupConsent: null,
        },
      })
    );
  }),
  mockJoinGroupWithConsentAgreementMutation((_, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.data({
        group: {
          joinGroup: {
            groupMembership: aGroupMembership(),
          },
          createConsentGroupAgreement: {
            consented: true,
          },
        },
      })
    );
  }),
];
