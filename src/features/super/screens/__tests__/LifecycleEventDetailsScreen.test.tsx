import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedGoBack } from '../../../../../__mocks__/react-navigation';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { fireEvent, render, renderHook, waitFor } from '../../../../common/utils/testing';
import { useAcceptEventMutation } from '../../../../new-graphql/generated';
import { anAcceptEventPayload } from '../../../../new-graphql/mocks/generated-mocks';
import { LifecycleEventDetailsScreen } from '../LifecycleEventDetailsScreen';

const mockShowToast = jest.fn();
const mockCreateTrackingMutateAsync = jest.fn();

jest.mock('../../../../new-graphql/generated', () => ({
  useAcceptEventMutation: jest.fn(),
  useCreateTrackingMutation: () => ({
    mutateAsync: mockCreateTrackingMutateAsync,
  }),
}));

jest.mock('../../../../common/shared-hooks/useToast', () => ({
  useToast: () => ({
    show: mockShowToast,
  }),
}));

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('LifecycleEventDetailsScreen', () => {
  beforeEach(() => {
    mockedUseRoute.mockReturnValue({
      params: {
        title: 'Details',
        eventDetails: {
          id: '1d7b52e0-a7de-4e5a-bd8a-0fab7501a458',
          code: 'offboarding',
          source: 'EH',
          user_id: 'cb250894-49d9-4665-835c-73804b06e0cb',
          owner_id: '7e83e548-501f-487e-ad55-9a431616330e',
          fund_usi: '53226460365001',
          author_type: 'owner',
          author_id: '0ab0fbac-6044-45a6-ba3c-69f1001d019c',
          trigger_time: '2024-07-31',
          data: '{"member_uuid":"f474e442-8c73-4961-a683-874d66d70e5b","member_number":"123456","fund_name":"Aware Super","termination_date":"2024-07-31","owner_name":"Dat Test Org 1"}',
          delivery_status: 'initial',
          delivered_at: null,
          accepted: false,
          accepted_from: '',
          correlation_id: 'EH_f474e442-8c73-4961-a683-874d66d70e5b_7e83e548-501f-487e-ad55-9a431616330e_1721968379',
          created_at: '2024-07-31',
          updated_at: '2024-07-31',
        },
      },
      key: '',
      name: '',
    });
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentUser = {
      userID: 'user-uuid',
      loginProvider: 'eh',
    };
  });

  it('should renders offboarding details correctly', () => {
    (useAcceptEventMutation as jest.Mock).mockReturnValue({
      isLoading: false,
      mutateAsync: () => anAcceptEventPayload(),
    });

    const { getByText } = render(<LifecycleEventDetailsScreen />);

    expect(getByText('Event')).toBeTruthy();
    expect(getByText('Resignation / Termination')).toBeTruthy();
    expect(getByText('When')).toBeTruthy();
    expect(getByText('To')).toBeTruthy();
    expect(getByText('Aware Super')).toBeTruthy();
    expect(getByText('Member account number')).toBeTruthy();
    expect(getByText('123456')).toBeTruthy();
    expect(getByText('Employer')).toBeTruthy();
    expect(getByText('Termination date')).toBeTruthy();
  });

  it('should go back to Super Dashboard when click back button', async () => {
    (useAcceptEventMutation as jest.Mock).mockReturnValue({
      isLoading: false,
      mutateAsync: () => anAcceptEventPayload(),
    });

    const { getByTestId } = render(<LifecycleEventDetailsScreen />);
    const backButton = getByTestId('topbar-back-icon');
    fireEvent.press(backButton);

    expect(mockedGoBack).toHaveBeenCalled();
  });

  it('should show toast when accept event successfully', async () => {
    (useAcceptEventMutation as jest.Mock).mockReturnValue({
      isLoading: false,
      mutateAsync: () => ({
        lifecycle: {
          event: {
            accept: {
              success: true,
              message: 'Accept Event Successfully',
            },
          },
        },
      }),
    });

    const { getByTestId, getByText } = render(<LifecycleEventDetailsScreen />);
    const notifyFundButton = getByTestId('notify-fund-cta');
    fireEvent.press(notifyFundButton);

    // wait for show bottomsheet action
    await waitFor(() => {
      expect(getByText('Privacy Policy')).toBeTruthy();
      expect(getByText('Accept')).toBeTruthy();
      expect(getByText('Cancel')).toBeTruthy();
    });

    const acceptNotifyButton = getByTestId('accept_notify_btn');
    fireEvent.press(acceptNotifyButton);

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalled();
      expect(mockedGoBack).toHaveBeenCalled();
    });
  });

  it('should call create tracking when user accepts', async () => {
    (useAcceptEventMutation as jest.Mock).mockReturnValue({
      isLoading: false,
      mutateAsync: () => ({
        lifecycle: {
          event: {
            accept: {
              success: true,
              message: 'Accept Event Successfully',
            },
          },
        },
      }),
    });

    const { getByTestId, getByText } = render(<LifecycleEventDetailsScreen />);
    const notifyFundButton = getByTestId('notify-fund-cta');
    fireEvent.press(notifyFundButton);

    // wait for show bottomsheet action
    await waitFor(() => {
      expect(getByText('Privacy Policy')).toBeTruthy();
      expect(getByText('Accept')).toBeTruthy();
      expect(getByText('Cancel')).toBeTruthy();
    });

    const acceptNotifyButton = getByTestId('accept_notify_btn');
    fireEvent.press(acceptNotifyButton);

    await waitFor(() => {
      expect(mockCreateTrackingMutateAsync).toHaveBeenLastCalledWith({
        input: {
          name: 'notify_fund_accepted',
          event_id: '1d7b52e0-a7de-4e5a-bd8a-0fab7501a458',
          data: JSON.stringify({
            event: 'offboarding',
          }),
          author_id: 'user-uuid', // author_id is a required field in gRPC, we don't want to loose tracking events when unexpected things happen
          author_type: 'employee', // Temporary hardcoded, until we can get this from superapp,
          channel: 'Swag',
        },
      });
    });
  });
});
