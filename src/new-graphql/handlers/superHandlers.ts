import {
  mockGetActiveSuperfundMembershipsQuery,
  mockCreateSwagSuperfundMutation,
  mockSubmitSuperContributionMutation,
  mockGetSwagSuperfundAndSuperContributionQuery,
  mockGetSuperContributionsQuery,
  mockStopContributionByContributionIdMutation,
  mockCreateSuperConsolidationMutation,
  mockGetSuperConsolidationQuery,
  mockGetSuperConsolidationSupportRequestQuery,
  mockCreateSuperConsolidationSupportRequestMutation,
} from '../generated';
import {
  aSuperConsolidation,
  aSuperConsolidationRequestSupport,
  aSuperContribution,
  aSwagSuperfund,
} from '../mocks/generated-mocks';
import { MockGetActiveSuperfundMemberships } from './custom-mock/activeSuperfundMemberships';
import { MockGetOrgs, MockGetSuperContributions } from './custom-mock/superContributions';

export const superHandlers = [
  mockGetActiveSuperfundMembershipsQuery((_, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.data({
        me: {
          orgs: [...MockGetActiveSuperfundMemberships],
        },
      })
    );
  }),
  mockCreateSwagSuperfundMutation((_, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.data({
        createSwagSuperfund: {
          superfund: aSwagSuperfund(),
        },
      })
    );
  }),
  mockGetSwagSuperfundAndSuperContributionQuery((_, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.data({
        me: {
          id: 'be03fb96-a749-4dc5-b856-c10cb94582ba',
          swagSuperfund: aSwagSuperfund(),
          activeSuperContribution: aSuperContribution(),
        },
      })
    );
  }),
  mockSubmitSuperContributionMutation((_, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.data({
        submitSuperContribution: {
          contribution: aSuperContribution(),
        },
      })
    );
  }),
  mockStopContributionByContributionIdMutation((_, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.data({
        stopContributionByContributionId: {
          contribution: aSuperContribution(),
        },
      })
    );
  }),
  mockGetSuperContributionsQuery((_, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.data({
        me: {
          orgs: [...MockGetOrgs],
          superContributions: [...MockGetSuperContributions],
        },
      })
    );
  }),
  mockGetSuperConsolidationQuery((_, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.data({
        me: {
          superConsolidation: aSuperConsolidation(),
        },
      })
    );
  }),
  mockCreateSuperConsolidationMutation((_, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.data({
        createSuperConsolidation: {
          consolidation: aSuperConsolidation(),
        },
      })
    );
  }),
  mockGetSuperConsolidationSupportRequestQuery((_, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.data({
        me: {
          superConsolidationRequestSupport: aSuperConsolidationRequestSupport(),
        },
      })
    );
  }),

  mockCreateSuperConsolidationSupportRequestMutation((_, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.data({
        createSuperConsolidationRequestSupport: {
          consolidationRequestSupport: aSuperConsolidationRequestSupport(),
        },
      })
    );
  }),
];
