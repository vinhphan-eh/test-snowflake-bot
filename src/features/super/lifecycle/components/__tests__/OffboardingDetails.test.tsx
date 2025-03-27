import React from 'react';
import { waitFor, fireEvent, render } from '../../../../../common/utils/testing';
import OffboardingDetails from '../OffboardingDetails';

describe('should render offboarding details properly', () => {
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

  const mockedOnAcceptNotify = jest.fn();
  const mockedOnBack = jest.fn();

  it('should render offboarding details correctly', () => {
    const { getByText } = render(
      <OffboardingDetails event={eventDetails} onAcceptNotify={mockedOnAcceptNotify} onBack={mockedOnBack} />
    );
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

  it('should call onAcceptNotify and show Privacy agreement bottomsheet when click "Notify fund" button', async () => {
    const { getByTestId, getByText } = render(
      <OffboardingDetails event={eventDetails} onAcceptNotify={mockedOnAcceptNotify} onBack={mockedOnBack} />
    );

    const notifyFundButton = getByTestId('notify-fund-cta');
    fireEvent.press(notifyFundButton);

    await waitFor(() => {
      expect(getByText('Privacy Policy')).toBeTruthy();
      expect(getByText('Accept')).toBeTruthy();
      expect(getByText('Cancel')).toBeTruthy();
    });
  });

  it('should call onBack when click "Do nothing" button', async () => {
    const { getByTestId } = render(
      <OffboardingDetails event={eventDetails} onAcceptNotify={mockedOnAcceptNotify} onBack={mockedOnBack} />
    );

    const notifyFundButton = getByTestId('do-nothing-cta');
    fireEvent.press(notifyFundButton);

    await waitFor(() => {
      expect(mockedOnBack).toHaveBeenCalled();
    });
  });
});
