import { mockPayWithHdCarouselSeenStatusQuery } from '../generated';

export const cardManagementHandlers = [
  mockPayWithHdCarouselSeenStatusQuery((_, res, ctx) => {
    return res(ctx.status(200), ctx.delay(100), ctx.data({ payWithHDCarouselSeenStatus: { seen: false } }));
  }),
];
