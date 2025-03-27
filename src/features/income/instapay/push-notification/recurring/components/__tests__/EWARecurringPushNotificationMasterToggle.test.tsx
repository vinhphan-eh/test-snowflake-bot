import React from 'react';
import { act, fireEvent, render, waitFor } from '../../../../../../../common/utils/testing';
import { EWARecurringPushNotificationMasterToggle } from '../EWARecurringPushNotificationMasterToggle';
import {
  EwaPushNotificationFeature,
  mockOptInEwaPushNotificationByFeatureMutation,
  mockOptOutEwaPushNotificationByFeatureMutation,
  useGetEwaPushNotificationOptInStatusByFeatureQuery,
} from '../../../../../../../new-graphql/generated';
import { mockServerNode } from '../../../../../../../mock-server/mockServerNode';
import { useToast } from '../../../../../../../common/shared-hooks/useToast';
import {
  optimalUpdateEWARecurringPushNotificationOptInStatus,
  type OptimalUpdatePushNotificationFeatureOptInStatusProps,
} from '../../helper';
import { queryClient } from '../../../../../../../common/libs/queryClient';

jest.mock('../../../../../../../common/libs/queryClient', () => ({
  queryClient: {
    setQueryData: jest.fn(),
    cancelQueries: jest.fn(),
    invalidateQueries: jest.fn(),
  },
}));

jest.mock('../../../../../../../common/shared-hooks/useToast', () => ({
  useToast: jest.fn(),
}));

jest.mock('../../helper', () => ({
  optimalUpdateEWARecurringPushNotificationOptInStatus: jest.fn(() => Promise.resolve()),
}));

const mockOptIn = (isSuccess: boolean) => {
  mockServerNode.use(
    mockOptInEwaPushNotificationByFeatureMutation((_, res, ctx) =>
      res(
        ctx.data({
          ewaPushNotification: {
            optInByFeature: {
              success: isSuccess,
            },
          },
        })
      )
    )
  );
};

const mockOptOut = (isSuccess: boolean) => {
  mockServerNode.use(
    mockOptOutEwaPushNotificationByFeatureMutation((_, res, ctx) =>
      res(
        ctx.data({
          ewaPushNotification: {
            optOutByFeature: {
              success: isSuccess,
            },
          },
        })
      )
    )
  );
};

const mockedOrgId = 'currentOrganisation';
const mockShowToast = jest.fn();
const mockedFeature = EwaPushNotificationFeature.EwaRecurringByAmount;
const QUERY_KEY = useGetEwaPushNotificationOptInStatusByFeatureQuery.getKey({
  feature: mockedFeature,
  orgId: mockedOrgId,
});

const buildOptimalUpdatePayload = (isOptingIn: boolean): OptimalUpdatePushNotificationFeatureOptInStatusProps => ({
  featureLevelUpdate: {
    optedIn: isOptingIn,
  },
  orgId: mockedOrgId,
  recurringFeature: mockedFeature,
  setOldState: expect.anything(),
});

describe('EWARecurringPushNotificationMasterToggle', () => {
  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({
      show: mockShowToast,
    });
  });

  it('should render properly', async () => {
    const { getByText } = render(
      <EWARecurringPushNotificationMasterToggle
        isOptedIn={false}
        currentRecurringFeature={mockedFeature}
        orgId={mockedOrgId}
      />
    );

    await waitFor(() => {
      expect(getByText('Notifications')).toBeTruthy();
    });
  });

  describe('successful actions', () => {
    test.each([
      {
        optedIn: false,
      },
      {
        optedIn: true,
      },
    ])('correct opt in / out action if current state is optedIn = $optedIn', async ({ optedIn }) => {
      if (optedIn) {
        mockOptOut(true);
      } else {
        mockOptIn(true);
      }
      const expectedAfterStatus = !optedIn;

      const { findByLabelText } = render(
        <EWARecurringPushNotificationMasterToggle
          isOptedIn={optedIn}
          currentRecurringFeature={mockedFeature}
          orgId={mockedOrgId}
        />
      );

      const enableToggle = await findByLabelText('Notifications toggle');
      expect(enableToggle).toBeTruthy();
      act(() => {
        fireEvent.press(enableToggle);
      });

      await waitFor(() => {
        // Expect not to have called showing the error toast
        expect(mockShowToast).not.toHaveBeenCalled();

        expect(optimalUpdateEWARecurringPushNotificationOptInStatus).toHaveBeenCalledWith(
          buildOptimalUpdatePayload(expectedAfterStatus)
        );
      });
    });
  });

  describe('unsuccessful actions due to server error', () => {
    it('should show error toast and revert to old status if error came from api response', async () => {
      mockOptIn(false);

      const { findByLabelText } = render(
        <EWARecurringPushNotificationMasterToggle
          isOptedIn={false}
          currentRecurringFeature={mockedFeature}
          orgId={mockedOrgId}
        />
      );

      const enableToggle = await findByLabelText('Notifications toggle');
      expect(enableToggle).toBeTruthy();
      act(() => {
        fireEvent.press(enableToggle);
      });

      await waitFor(() => {
        // Expect not to have called showing the error toast
        expect(mockShowToast).toHaveBeenCalledWith({
          content: 'Sorry, we could not process your request. Try again later.',
        });

        // Optimal update is asynchronous so should have been called also
        expect(optimalUpdateEWARecurringPushNotificationOptInStatus).toHaveBeenCalledWith(
          buildOptimalUpdatePayload(true)
        );

        // Expect revert to old state steps
        expect(queryClient.cancelQueries).toHaveBeenCalledWith(QUERY_KEY);
        expect(queryClient.invalidateQueries).toHaveBeenCalledWith(QUERY_KEY);
      });
    });

    it('should show error toast and revert to old status if error thrown from the request', async () => {
      mockServerNode.use(
        mockOptOutEwaPushNotificationByFeatureMutation((_, res, ctx) => {
          return res(ctx.status(400), ctx.errors([{ message: 'No org found!' }]));
        })
      );

      const { findByLabelText } = render(
        <EWARecurringPushNotificationMasterToggle
          isOptedIn
          currentRecurringFeature={mockedFeature}
          orgId={mockedOrgId}
        />
      );

      const enableToggle = await findByLabelText('Notifications toggle');
      expect(enableToggle).toBeTruthy();
      act(() => {
        fireEvent.press(enableToggle);
      });

      await waitFor(() => {
        // Expect not to have called showing the error toast
        expect(mockShowToast).toHaveBeenCalledWith({
          content: 'Sorry, we could not process your request. Try again later.',
        });

        // Optimal update is asynchronous so should have been called also
        expect(optimalUpdateEWARecurringPushNotificationOptInStatus).toHaveBeenCalledWith(
          buildOptimalUpdatePayload(false)
        );

        // Expect revert to old state steps
        expect(queryClient.cancelQueries).toHaveBeenCalledWith(QUERY_KEY);
        expect(queryClient.invalidateQueries).toHaveBeenCalledWith(QUERY_KEY);
      });
    });
  });
});
