import React from 'react';
import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { render, fireEvent, waitFor } from '../../../../common/utils/testing';
import { SuperannuationLifecycleEvent } from '../SuperannuationLifecycleEvent';

const eventDetails = {
  id: '1d7b52e0-a7de-4e5a-bd8a-0fab7501a458',
  code: 'offboarding',
  source: 'EH',
  user_id: 'cb250894-49d9-4665-835c-73804b06e0cb',
  owner_id: '7e83e548-501f-487e-ad55-9a431616330e',
  fund_usi: '53226460365001',
  author_type: 'owner',
  author_id: '0ab0fbac-6044-45a6-ba3c-69f1001d019c',
  trigger_time: '2024-07-31T00:00:00.000Z',
  data: '{"member_uuid":"f474e442-8c73-4961-a683-874d66d70e5b","member_number":"123456","fund_name":"Aware Super","termination_date":"2024-07-31","owner_name":"Dat Test Org 1"}',
  delivery_status: 'initial',
  delivered_at: null,
  accepted: false,
  accepted_from: '',
  correlation_id: 'EH_f474e442-8c73-4961-a683-874d66d70e5b_7e83e548-501f-487e-ad55-9a431616330e_1721968379',
  created_at: '2024-07-31T00:00:00.000Z',
  updated_at: '2024-07-31T00:00:00.000Z',
};

describe('Superannuation Lifecycle Event', () => {
  it('should renders correctly', () => {
    const { getByText } = render(<SuperannuationLifecycleEvent data={eventDetails} />);

    expect(getByText("Tell your fund you're moving employers")).toBeTruthy();
    expect(getByText('Review')).toBeTruthy();
  });

  it('should not render when data is missing', () => {
    const { queryByText } = render(<SuperannuationLifecycleEvent />);

    expect(queryByText("Tell your fund you're moving employers")).toBeFalsy();
    expect(queryByText('Review')).toBeFalsy();
  });

  it('should show Event Details Screen when click Review', async () => {
    const { getByText } = render(<SuperannuationLifecycleEvent data={eventDetails} />);

    expect(getByText('Review')).toBeTruthy();
    const reviewButton = getByText('Review');
    fireEvent.press(reviewButton);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('SuperStack', {
        screen: 'EventDetails',
        params: {
          title: 'Details',
          eventDetails,
        },
      });
    });
  });
});
