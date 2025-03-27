import React from 'react';
import { fireEvent, render, renderHook, waitFor } from '../../../../../../../common/utils/testing';
import * as useGetEwaPushNotificationStatus from '../../../hooks/useGetEwaPushNotificationStatus';
import { EWARecurringPushNotificationManagement } from '../EWARecurringPushNotificationManagement';
import { useRoute } from '@react-navigation/native';
import { useInstaPaySchedulingStore } from '../../../../../instapay-scheduling/stores/useInstaPaySchedulingStore';
import {
  aRecurringByDaySubscription,
  aSchedulingSubscription,
} from '../../../../../../../new-graphql/mocks/generated-mocks';
import { EwaPushNotificationFeature } from '../../../../../../../../e2e/new-graphql/generated';
import { TestInstaPayOrgKeyPayHasBalance } from '../../../../utils/test-objects';
import { EwaPushNotificationType } from '../../../../../../../new-graphql/generated';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('EWARecurringPushNotificationManagement', () => {
  const defaultStatusResponse = {
    shouldRenderSection: true,
    isLoading: false,
    featureLevelOptedIn: false,
    statusesByType: [],
  };
  const mockedOrgId = 'currentOrgId';

  beforeEach(() => {
    mockedUseRoute.mockReturnValue({ params: { orgId: mockedOrgId }, key: '', name: '' });

    jest
      .spyOn(useGetEwaPushNotificationStatus, 'useGetEwaPushNotificationStatus')
      .mockReturnValue(defaultStatusResponse);
  });

  it('should not render if there are no opt in status or the fetch was failed', async () => {
    jest.spyOn(useGetEwaPushNotificationStatus, 'useGetEwaPushNotificationStatus').mockReturnValue({
      ...defaultStatusResponse,
      shouldRenderSection: false,
    });

    const { queryByTestId } = render(<EWARecurringPushNotificationManagement />);

    await waitFor(() => {
      expect(queryByTestId('ewa-recurring-push-notification-management')).not.toBeTruthy();
    });
  });

  describe('feature and membership identification', () => {
    it('should identify the current recurring feature correctly for Recurring by Amount', async () => {
      const { result: schedulingStore } = renderHook(() => useInstaPaySchedulingStore());
      schedulingStore.current.setCurrentSubscription({
        ...aSchedulingSubscription(),
        organisationId: mockedOrgId,
      });

      render(<EWARecurringPushNotificationManagement />);

      await waitFor(() => {
        expect(useGetEwaPushNotificationStatus.useGetEwaPushNotificationStatus).toHaveBeenCalledWith({
          feature: EwaPushNotificationFeature.EwaRecurringByAmount,
          orgId: mockedOrgId,
        });
      });
    });

    it('should identifty the current recurring feature correctly for Recurring by Day', async () => {
      const { result: schedulingStore } = renderHook(() => useInstaPaySchedulingStore());
      schedulingStore.current.setCurrentByDaySubscription({
        ...aRecurringByDaySubscription(),
        organisationId: mockedOrgId,
      });

      render(<EWARecurringPushNotificationManagement />);

      await waitFor(() => {
        expect(useGetEwaPushNotificationStatus.useGetEwaPushNotificationStatus).toHaveBeenCalledWith({
          feature: EwaPushNotificationFeature.EwaRecurringByDay,
          orgId: mockedOrgId,
        });
      });
    });

    it('should use stored membership if there is no orgId passed through the route', async () => {
      mockedUseRoute.mockReturnValue({ params: {}, key: '', name: '' });
      const { result: schedulingStore } = renderHook(() => useInstaPaySchedulingStore());
      schedulingStore.current.setMembership({
        ...TestInstaPayOrgKeyPayHasBalance,
        getId: () => '123456',
      });

      render(<EWARecurringPushNotificationManagement />);

      await waitFor(() => {
        expect(useGetEwaPushNotificationStatus.useGetEwaPushNotificationStatus).toHaveBeenCalledWith({
          feature: expect.anything(),
          // Using the ID retrieved from stored membership
          orgId: '123456',
        });
      });
    });
  });

  it('should render the header and spinner while fetching opt in status', async () => {
    jest.spyOn(useGetEwaPushNotificationStatus, 'useGetEwaPushNotificationStatus').mockReturnValue({
      ...defaultStatusResponse,
      isLoading: true,
    });

    const { getByTestId, getByText } = render(<EWARecurringPushNotificationManagement />);

    await waitFor(() => {
      expect(getByTestId('ewa-recurring-push-notification-loading-spinner')).toBeTruthy();
      expect(getByText('EWA Recurring')).toBeTruthy();
    });
  });

  describe('opted in status successfully loaded', () => {
    beforeEach(() => {
      jest.spyOn(useGetEwaPushNotificationStatus, 'useGetEwaPushNotificationStatus').mockReturnValue({
        ...defaultStatusResponse,
        featureLevelOptedIn: true,
        statusesByType: [
          {
            type: EwaPushNotificationType.RecurringByDaySuccessfulPayment,
            optedIn: true,
          },
          {
            type: EwaPushNotificationType.RecurringByDayInsufficientBalance,
            optedIn: false,
          },
        ],
      });
    });

    it('should render the toggles properly', async () => {
      const { getByText } = render(<EWARecurringPushNotificationManagement />);

      await waitFor(() => {
        // Header
        expect(getByText('EWA Recurring')).toBeTruthy();

        // Master toggle
        expect(getByText('Notifications')).toBeTruthy();

        // Child toggles for each type
        expect(getByText('Successful Payments')).toBeTruthy();
        expect(getByText('Insufficient Balance')).toBeTruthy();
      });
    });

    it('should open the bottomsheet if pressed on any info icon', async () => {
      const { getAllByTestId } = render(<EWARecurringPushNotificationManagement />);

      fireEvent.press(getAllByTestId('setting_toggle_icon')?.[0]);

      await waitFor(() => {
        expect(getAllByTestId('recurring-push-notification-bts')).toHaveLength(1);
      });
    });
  });
});
