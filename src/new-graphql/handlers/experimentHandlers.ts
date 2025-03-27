import { WaitListStatus } from '../../new-graphql/generated';
import {mockExperimentGetUserWaitListQuery, mockExperimentAddEventMutation, mockExperimentSubscribeMutation } from '../../new-graphql/generated';

export const experimentHandlers = [
  mockExperimentGetUserWaitListQuery((_, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.data({
        me: {
          experiment: {
            waitList: {
              projectID: '123',
              status: WaitListStatus.Unsubscribed
            },
            }
          }
        })
    );
  }),
  mockExperimentAddEventMutation((_, res, context) => {
    return res(context.delay(1000), context.data({}));
  }),
  mockExperimentSubscribeMutation((_, res, context) => {
    return res(context.delay(1000), context.data({}));
  }),
];
