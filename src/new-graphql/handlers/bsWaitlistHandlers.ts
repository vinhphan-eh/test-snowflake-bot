import { mockBsJoinWaitListMutation } from '../generated';

export const bsWaitlistHandlers = [
  mockBsJoinWaitListMutation((_, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.data({
        bsJoinWaitList: {
          success: true,
        },
      })
    );
  }),
];
