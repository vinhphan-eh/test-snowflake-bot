import React from 'react';
import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { render, fireEvent } from '../../../../common/utils/testing';
import { BillStatus, SubscriptionStatus } from '../../../../new-graphql/generated';
import { BillCard } from '../BillCard';

describe('BillCard', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(
      <BillCard currency="AUD" title="Simply Energy" savedAmount={1.12} amount={124.54} status={BillStatus.Paid} />
    );
    expect(getByTestId('saved-amount')).toBeTruthy();
    expect(getByTestId('amount')).toBeTruthy();
    expect(getByText('Simply Energy')).toBeTruthy();
    expect(getByText('Paid')).toBeTruthy();
    expect(getByTestId('bill-management-card-logo')).toBeTruthy();
  });

  it('should render correctly with overdue status', () => {
    const { getByTestId, getByText } = render(
      <BillCard currency="AUD" title="Simply Energy" savedAmount={1.12} amount={124.54} status={BillStatus.Overdue} />
    );
    expect(getByTestId('saved-amount')).toBeTruthy();
    expect(getByTestId('amount')).toBeTruthy();
    expect(getByText('Simply Energy')).toBeTruthy();
    expect(getByText('Overdue')).toBeTruthy();
  });

  it('should render correctly without amount', () => {
    const { getByTestId, getByText } = render(
      <BillCard currency="AUD" title="Simply Energy" savedAmount={1.12} status={BillStatus.Overdue} />
    );
    expect(getByTestId('saved-amount')).toBeTruthy();
    expect(getByText('Simply Energy')).toBeTruthy();
    expect(getByText('Overdue')).toBeTruthy();
  });

  it('should render correctly without status', () => {
    const { getByTestId, getByText } = render(
      <BillCard currency="AUD" title="Simply Energy" savedAmount={1.12} status={BillStatus.Overdue} />
    );
    expect(getByTestId('saved-amount')).toBeTruthy();
    expect(getByText('Simply Energy')).toBeTruthy();
    expect(getByText('Overdue')).toBeTruthy();
  });

  it('should render correctly without amount and status', () => {
    const { getByTestId, getByText } = render(<BillCard currency="AUD" title="Simply Energy" savedAmount={1.12} />);
    expect(getByTestId('saved-amount')).toBeTruthy();
    expect(getByText('Simply Energy')).toBeTruthy();
  });

  it('should render correctly with due status', () => {
    const { getByTestId, getByText } = render(
      <BillCard
        currency="AUD"
        title="Simply Energy"
        savedAmount={1.12}
        amount={124.54}
        status={BillStatus.Due}
        dueDate="29/09/2023"
      />
    );
    expect(getByTestId('saved-amount')).toBeTruthy();
    expect(getByTestId('amount')).toBeTruthy();
    expect(getByText('Simply Energy')).toBeTruthy();
    expect(getByTestId('bill-card-status')).toBeTruthy();
  });

  it('should render correctly without amount and status, cancel description', () => {
    const { getByTestId, getByText, queryByText } = render(
      <BillCard
        subscriptionStatus={SubscriptionStatus.Cancelled}
        currency="AUD"
        title="Simply Energy"
        savedAmount={1.12}
      />
    );
    expect(queryByText('Renew')).toBeNull();
    expect(getByTestId('saved-amount')).toBeTruthy();
    expect(getByText('Simply Energy')).toBeTruthy();
  });

  it('renew subscription event should work correctly', () => {
    const { getByText } = render(
      <BillCard
        subscriptionStatus={SubscriptionStatus.Cancelled}
        currency="AUD"
        title="Simply Energy"
        savedAmount={1.12}
        signUpLink="signup link"
        onRenew={mockedNavigate}
      />
    );
    fireEvent.press(getByText('Renew'));

    expect(mockedNavigate).toBeCalled();
  });
});
