import { mockServerNode } from '../../../../../mock-server/mockServerNode';
import {
  EwaPushNotificationFeature,
  EwaPushNotificationType,
  mockGetEwaPushNotificationOptInStatusByFeatureQuery,
  useGetEwaPushNotificationOptInStatusByFeatureQuery,
  type GetEwaPushNotificationOptInStatusByFeatureQuery,
} from '../../../../../new-graphql/generated';
import { optimalUpdateEWARecurringPushNotificationOptInStatus } from './helper';
import { waitFor } from '../../../../../common/utils/testing';
import { queryClient } from '../../../../../common/libs/queryClient';

jest.mock('../../../../../common/libs/queryClient', () => ({
  queryClient: {
    setQueryData: jest.fn(),
    cancelQueries: jest.fn(),
    invalidateQueries: jest.fn(),
  },
}));

describe('optimalUpdateEWARecurringPushNotificationOptInStatus', () => {
  const mockedOrgId = 'organisationId';
  const mockedRecurringFeature = EwaPushNotificationFeature.EwaRecurringByDay;
  const QUERY_KEY = useGetEwaPushNotificationOptInStatusByFeatureQuery.getKey({
    feature: mockedRecurringFeature,
    orgId: mockedOrgId,
  });
  const mockSetQueryData = queryClient.setQueryData as jest.Mock;

  describe('valid status cases', () => {
    const oldStatus = {
      me: {
        org: {
          ewaPushNotification: {
            optInStatusByFeature: {
              featureLevelOptedIn: true,
              statuses: [
                {
                  type: EwaPushNotificationType.RecurringByDaySuccessfulPayment,
                  optedIn: true,
                },
                {
                  type: EwaPushNotificationType.RecurringByDayInsufficientBalance,
                  optedIn: false,
                },
              ],
            },
          },
        },
      },
    };

    beforeEach(() => {
      mockServerNode.use(
        mockGetEwaPushNotificationOptInStatusByFeatureQuery((_, res, ctx) => {
          return res(ctx.data(oldStatus));
        })
      );
    });

    it('should reset query data properly for type-level update', async () => {
      const exepctedNewStatus: GetEwaPushNotificationOptInStatusByFeatureQuery = {
        me: {
          org: {
            ewaPushNotification: {
              optInStatusByFeature: {
                // The change of the first PN type to false will end up making all types available set to false
                // so the feature-level opted in should also be updated to false
                featureLevelOptedIn: false,
                statuses: [
                  {
                    type: EwaPushNotificationType.RecurringByDaySuccessfulPayment,
                    optedIn: false,
                  },
                  {
                    type: EwaPushNotificationType.RecurringByDayInsufficientBalance,
                    optedIn: false,
                  },
                ],
              },
            },
          },
        },
      };

      mockSetQueryData.mockImplementationOnce((_key, updaterFunc) => {
        expect(updaterFunc(oldStatus)).toEqual({ ...exepctedNewStatus });
      });

      await optimalUpdateEWARecurringPushNotificationOptInStatus({
        recurringFeature: mockedRecurringFeature,
        orgId: mockedOrgId,
        typeLevelUpdate: {
          type: EwaPushNotificationType.RecurringByDaySuccessfulPayment,
          optedIn: false,
        },
      });

      await waitFor(() => {
        expect(queryClient.cancelQueries).toHaveBeenCalledWith(QUERY_KEY);
        expect(queryClient.setQueryData).toHaveBeenCalledWith(QUERY_KEY, expect.any(Function));
      });
    });

    it('should reset query data properly for feature-level update', async () => {
      const exepctedNewStatus: GetEwaPushNotificationOptInStatusByFeatureQuery = {
        me: {
          org: {
            ewaPushNotification: {
              optInStatusByFeature: {
                featureLevelOptedIn: true,
                statuses: [
                  {
                    type: EwaPushNotificationType.RecurringByDaySuccessfulPayment,
                    optedIn: true,
                  },
                  {
                    type: EwaPushNotificationType.RecurringByDayInsufficientBalance,
                    optedIn: true,
                  },
                ],
              },
            },
          },
        },
      };

      mockSetQueryData.mockImplementationOnce((_key, updaterFunc) => {
        expect(updaterFunc(oldStatus)).toEqual({ ...exepctedNewStatus });
      });

      await optimalUpdateEWARecurringPushNotificationOptInStatus({
        recurringFeature: mockedRecurringFeature,
        orgId: mockedOrgId,
        featureLevelUpdate: {
          optedIn: true,
        },
      });

      await waitFor(() => {
        expect(queryClient.cancelQueries).toHaveBeenCalledWith(QUERY_KEY);
        expect(queryClient.setQueryData).toHaveBeenCalledWith(QUERY_KEY, expect.any(Function));
      });
    });
  });

  it('should exit the function if no update details were passed', async () => {
    await optimalUpdateEWARecurringPushNotificationOptInStatus({
      recurringFeature: mockedRecurringFeature,
      orgId: mockedOrgId,
    });

    await waitFor(() => {
      expect(queryClient.cancelQueries).not.toHaveBeenCalled();
      expect(queryClient.setQueryData).not.toHaveBeenCalled();
    });
  });

  it('should request invalidate queries to refetch status from API if the old response is invalid', async () => {
    mockServerNode.use(
      mockGetEwaPushNotificationOptInStatusByFeatureQuery((_, res, ctx) => {
        return res(
          ctx.data({
            me: {
              org: undefined,
            },
          })
        );
      })
    );

    mockSetQueryData.mockImplementationOnce((_key, updaterFunc) => {
      updaterFunc();
    });

    await optimalUpdateEWARecurringPushNotificationOptInStatus({
      recurringFeature: mockedRecurringFeature,
      orgId: mockedOrgId,
      featureLevelUpdate: {
        optedIn: true,
      },
    });

    await waitFor(() => {
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith(QUERY_KEY);
    });
  });
});
