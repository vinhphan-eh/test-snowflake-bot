import { type CurrentUserQuery, EWalletSetupStatus, mockCurrentUserQuery } from '../generated';
import { aCurrentUser } from '../mocks/generated-mocks';
import { mockGetCurrentUserQuery } from '../../new-graphql/generated';

export const userHandlers = [
  mockCurrentUserQuery((_, res, context) => {
    const result: CurrentUserQuery = {
      currentUser: aCurrentUser({ eWalletSetupStatus: EWalletSetupStatus.None }),
    };
    return res(context.data(result));
  }),
  mockGetCurrentUserQuery((_, res, context) => {
    const result: CurrentUserQuery = {
      currentUser: aCurrentUser({ eWalletSetupStatus: EWalletSetupStatus.None }),
    };
    return res(context.data(result));
  }),
];
