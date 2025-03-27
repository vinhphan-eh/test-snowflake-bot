import React from 'react';
import { fireEvent, render } from '../../../../../../common/utils/testing';
import { Currency, Pid, SubscriptionStatus, SubscriptionType } from '../../../../../../new-graphql/generated';
import { BillCategory } from '../BillCategory';

const onClickSignUp = jest.fn();
const onClickRenew = jest.fn();

const mockSubscription = {
  id: '37122f2c-63dd-4ed0-b047-68bc6f88911d',
  status: SubscriptionStatus.Active,
  createdAt: '2023-10-29T12:25:20Z',
  updatedAt: '2023-10-30T13:30:46Z',
  provider: { id: Pid.SimplyEnergy, name: 'Simply Energy' },
  totalSaved: { amount: 0, currency: Currency.Aud },
  latestBill: null,
  subscriptionType: SubscriptionType.Gas,
  signUpLink: 'mockSubscription.signUpLink',
};

describe('BillCategory', () => {
  beforeEach(() => {
    onClickSignUp.mockClear();
  });

  it('should render correctly when there no subscription', () => {
    const { getByText } = render(
      <BillCategory
        providerName="Okay Energy"
        category="Gas"
        icon="propane-tank-outlined"
        onClickSignUp={onClickSignUp}
        onClickRenew={onClickRenew}
      />
    );

    expect(getByText('Gas')).toBeTruthy();
    fireEvent.press(getByText('Sign up'));
    expect(onClickSignUp).toBeCalledTimes(1);
  });

  it.each`
    status                          | text
    ${SubscriptionStatus.Active}    | ${'APPROVED'}
    ${SubscriptionStatus.Pending}   | ${'PENDING APPROVAL'}
    ${SubscriptionStatus.Submitted} | ${'PENDING APPROVAL'}
  `('should render correctly when there is $status subscription', ({ status, text }) => {
    const { getByText } = render(
      <BillCategory
        providerName="Okay Energy"
        category="Gas"
        icon="propane-tank-outlined"
        onClickSignUp={onClickSignUp}
        subscription={{
          ...mockSubscription,
          status,
        }}
        onClickRenew={onClickRenew}
      />
    );

    expect(getByText('Gas')).toBeTruthy();
    expect(getByText(text)).toBeTruthy();
  });

  it('should render correctly when there is cancelled subscription with sign up link available', () => {
    const { getByText } = render(
      <BillCategory
        providerName="ENGIE"
        category="Gas"
        icon="propane-tank-outlined"
        onClickSignUp={onClickSignUp}
        subscription={{
          ...mockSubscription,
          status: SubscriptionStatus.Cancelled,
        }}
        onClickRenew={onClickRenew}
      />
    );

    expect(getByText('Gas')).toBeTruthy();
    fireEvent.press(getByText('Renew'));
    expect(onClickRenew).toBeCalledWith('mockSubscription.signUpLink', 'ENGIE');
  });

  it('should render correctly when there is cancelled subscription with sign up link unavailable', () => {
    const { getByText } = render(
      <BillCategory
        providerName="Okay Energy"
        category="Gas"
        icon="propane-tank-outlined"
        onClickSignUp={onClickSignUp}
        subscription={{
          ...mockSubscription,
          status: SubscriptionStatus.Cancelled,
          signUpLink: null,
        }}
        onClickRenew={onClickRenew}
      />
    );

    expect(getByText('Gas')).toBeTruthy();
    fireEvent.press(getByText('Sign up'));
    expect(onClickSignUp).toBeCalledTimes(1);
  });
});
