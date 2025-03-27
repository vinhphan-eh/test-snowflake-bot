import React from 'react';
import { act, fireEvent, render, waitFor } from '../../../../../../../common/utils/testing';
import {
  EwaPushNotificationFeature,
  EwaPushNotificationType,
  mockOptInEwaPushNotificationByTypeMutation,
  mockOptOutEwaPushNotificationByFeatureMutation,
  mockOptOutEwaPushNotificationByTypeMutation,
} from '../../../../../../../new-graphql/generated';
import { mockServerNode } from '../../../../../../../mock-server/mockServerNode';
import { useToast } from '../../../../../../../common/shared-hooks/useToast';
import {
  optimalUpdateEWARecurringPushNotificationOptInStatus,
  type OptimalUpdatePushNotificationFeatureOptInStatusProps,
} from '../../helper';
import { EWARecurringPushNotificationSettingToggleByType } from '../EWARecurringPushNotificationSettingToggleByType';

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
  ...jest.requireActual('../../helper'),
  optimalUpdateEWARecurringPushNotificationOptInStatus: jest.fn(() => Promise.resolve()),
}));

const mockOptIn = (isSuccess: boolean) => {
  mockServerNode.use(
    mockOptInEwaPushNotificationByTypeMutation((_, res, ctx) =>
      res(
        ctx.data({
          ewaPushNotification: {
            optInByType: {
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
    mockOptOutEwaPushNotificationByTypeMutation((_, res, ctx) =>
      res(
        ctx.data({
          ewaPushNotification: {
            optOutByType: {
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
const mockedType = EwaPushNotificationType.RecurringByAmountSuccessfulPayment;

const buildOptimalUpdatePayload = (isOptingIn: boolean): OptimalUpdatePushNotificationFeatureOptInStatusProps => ({
  typeLevelUpdate: {
    type: mockedType,
    optedIn: isOptingIn,
  },
  orgId: mockedOrgId,
  recurringFeature: mockedFeature,
});

describe('EWARecurringPushNotificationSettingToggleByType', () => {
  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({
      show: mockShowToast,
    });
  });

  test.each([
    {
      type: EwaPushNotificationType.RecurringByAmountSuccessfulPayment,
      caption: 'Successful Payments',
    },
    {
      type: EwaPushNotificationType.RecurringByDaySuccessfulPayment,
      caption: 'Successful Payments',
    },
    {
      type: EwaPushNotificationType.RecurringByDayInsufficientBalance,
      caption: 'Insufficient Balance',
    },
  ])('should render properly for type $type', async ({ caption, type }) => {
    const { getByText } = render(
      <EWARecurringPushNotificationSettingToggleByType
        btsAction={jest.fn()}
        optedIn
        orgId={mockedOrgId}
        type={type}
        recurringFeature={mockedFeature}
      />
    );

    await waitFor(() => {
      expect(getByText(caption)).toBeTruthy();
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
        <EWARecurringPushNotificationSettingToggleByType
          btsAction={jest.fn()}
          optedIn={optedIn}
          orgId={mockedOrgId}
          type={mockedType}
          recurringFeature={mockedFeature}
        />
      );

      const enableToggle = await findByLabelText('Successful Payments toggle');
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
        <EWARecurringPushNotificationSettingToggleByType
          btsAction={jest.fn()}
          optedIn={false}
          orgId={mockedOrgId}
          type={mockedType}
          recurringFeature={mockedFeature}
        />
      );

      const enableToggle = await findByLabelText('Successful Payments toggle');
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

        // Expect revert to old state step
        expect(optimalUpdateEWARecurringPushNotificationOptInStatus).toHaveBeenCalledWith(
          buildOptimalUpdatePayload(false)
        );
      });
    });

    it('should show error toast and revert to old status if error thrown from the request', async () => {
      mockServerNode.use(
        mockOptOutEwaPushNotificationByFeatureMutation((_, res, ctx) => {
          return res(ctx.status(400), ctx.errors([{ message: 'No org found!' }]));
        })
      );

      const { findByLabelText } = render(
        <EWARecurringPushNotificationSettingToggleByType
          btsAction={jest.fn()}
          optedIn
          orgId={mockedOrgId}
          type={mockedType}
          recurringFeature={mockedFeature}
        />
      );

      const enableToggle = await findByLabelText('Successful Payments toggle');
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

        // Expect revert to old state step
        expect(optimalUpdateEWARecurringPushNotificationOptInStatus).toHaveBeenCalledWith(
          buildOptimalUpdatePayload(true)
        );
      });
    });
  });

  it('should not render if invalid type or membership is passed', async () => {
    const { queryByTestId } = render(
      <EWARecurringPushNotificationSettingToggleByType
        btsAction={jest.fn()}
        optedIn
        orgId={mockedOrgId}
        type={undefined}
        recurringFeature={mockedFeature}
      />
    );

    await waitFor(() => {
      expect(queryByTestId('ewa_recurring_push_notification_setting_toggle')).not.toBeTruthy();
    });
  });
});
