import { renderHook, waitFor } from '../../../../../../common/utils/testing';
import { mockServerNode } from '../../../../../../mock-server/mockServerNode';
import {
  EwaPushNotificationFeature,
  EwaPushNotificationType,
  InstapayErrorCode,
  mockGetEwaPushNotificationOptInStatusByFeatureQuery,
} from '../../../../../../new-graphql/generated';
import { useGetEwaPushNotificationStatus } from '../useGetEwaPushNotificationStatus';

describe('useGetEwaPushNotificationStatus', () => {
  it('should return proper response while loading the status', async () => {
    mockServerNode.use(
      mockGetEwaPushNotificationOptInStatusByFeatureQuery((_, res, ctx) => {
        return res(ctx.delay(3000));
      })
    );

    const result = renderHook(() =>
      useGetEwaPushNotificationStatus({
        feature: EwaPushNotificationFeature.EwaRecurringByAmount,
        orgId: '',
      })
    );

    await waitFor(() => {
      expect(result.result.current.isLoading).toBeTruthy();
      expect(result.result.current.shouldRenderSection).toBeTruthy();
      expect(result.result.current.featureLevelOptedIn).toBeUndefined();
      expect(result.result.current.statusesByType).toBeUndefined();
    });
  });

  describe('error cases', () => {
    it('should return proper response when encountered API error', async () => {
      mockServerNode.use(
        mockGetEwaPushNotificationOptInStatusByFeatureQuery((_, res, ctx) => {
          return res(ctx.status(400), ctx.errors([{ message: 'No org found!' }]));
        })
      );

      const result = renderHook(() =>
        useGetEwaPushNotificationStatus({
          feature: EwaPushNotificationFeature.EwaRecurringByAmount,
          orgId: '',
        })
      );

      await waitFor(() => {
        expect(result.result.current.isLoading).toBeFalsy();
        expect(result.result.current.shouldRenderSection).toBeFalsy();
        expect(result.result.current.featureLevelOptedIn).toBeUndefined();
        expect(result.result.current.statusesByType).toBeUndefined();
      });
    });

    it('should return proper response when encountered error within the response', async () => {
      const mockedBusinessId = 123456;

      mockServerNode.use(
        mockGetEwaPushNotificationOptInStatusByFeatureQuery((_, res, ctx) => {
          return res(
            ctx.data({
              me: {
                org: {
                  ewaPushNotification: {
                    optInStatusByFeature: {
                      __typename: 'InstapayError',
                      code: InstapayErrorCode.InvalidRequest,
                    },
                  },
                },
              },
            })
          );
        })
      );

      const result = renderHook(() =>
        useGetEwaPushNotificationStatus({
          feature: EwaPushNotificationFeature.EwaRecurringByAmount,
          orgId: `${mockedBusinessId}`,
        })
      );

      await waitFor(() => {
        expect(result.result.current.isLoading).toBeFalsy();
        expect(result.result.current.shouldRenderSection).toBeFalsy();
      });
    });
  });

  describe('successful cases', () => {
    it('should return proper response with correct status for the requesting organisation from response', async () => {
      const mockedStatus = {
        featureLevelOptedIn: false,
        statuses: [
          {
            type: EwaPushNotificationType.RecurringByAmountSuccessfulPayment,
            optedIn: false,
          },
        ],
      };

      mockServerNode.use(
        mockGetEwaPushNotificationOptInStatusByFeatureQuery((_, res, ctx) => {
          return res(
            ctx.data({
              me: {
                org: {
                  ewaPushNotification: {
                    optInStatusByFeature: mockedStatus,
                  },
                },
              },
            })
          );
        })
      );

      const result = renderHook(() =>
        useGetEwaPushNotificationStatus({
          feature: EwaPushNotificationFeature.EwaRecurringByAmount,
          orgId: 'correctOrganisation',
        })
      );

      await waitFor(() => {
        expect(result.result.current.isLoading).toBeFalsy();
        expect(result.result.current.shouldRenderSection).toBeTruthy();
        expect(result.result.current.featureLevelOptedIn).toEqual(mockedStatus.featureLevelOptedIn);
        expect(result.result.current.statusesByType).toStrictEqual(mockedStatus.statuses);
      });
    });

    it('should return correct shouldRenderSection state if response is error-free but there are none statuses returned', async () => {
      mockServerNode.use(
        mockGetEwaPushNotificationOptInStatusByFeatureQuery((_, res, ctx) => {
          return res(
            ctx.data({
              me: {
                org: {
                  ewaPushNotification: {
                    optInStatusByFeature: {
                      featureLevelOptedIn: false,
                      statuses: [],
                    },
                  },
                },
              },
            })
          );
        })
      );

      const result = renderHook(() =>
        useGetEwaPushNotificationStatus({
          feature: EwaPushNotificationFeature.EwaRecurringByAmount,
          orgId: 'correctOrganisation',
        })
      );

      await waitFor(() => {
        expect(result.result.current.isLoading).toBeFalsy();
        expect(result.result.current.shouldRenderSection).toBeFalsy();
        expect(result.result.current.featureLevelOptedIn).toBeFalsy();
        expect(result.result.current.statusesByType).toHaveLength(0);
      });
    });
  });
});
