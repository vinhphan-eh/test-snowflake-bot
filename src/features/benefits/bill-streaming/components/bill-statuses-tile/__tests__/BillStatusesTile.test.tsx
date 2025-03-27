import React from 'react';
import uuid from 'react-native-uuid';
import { usePermissionStore } from '../../../../../../common/stores/usePermissionStore';
import { fireEvent, render, renderHook } from '../../../../../../common/utils/testing';
import type { Subscription } from '../../../../../../new-graphql/generated';
import { Currency, Pid, SubscriptionStatus, SubscriptionType } from '../../../../../../new-graphql/generated';
import { BillStatusesTile } from '../BillStatusesTile';

const onClickRenew = jest.fn();
const onClickSignUp = jest.fn();

const generateMockSubscription = (updatedData: Partial<Subscription>): Subscription => {
  return {
    id: uuid.v4() as string,
    status: SubscriptionStatus.Active,
    createdAt: '2023-10-29T12:25:20Z',
    updatedAt: '2023-10-30T13:30:46Z',
    provider: { id: Pid.SimplyEnergy, name: 'Simply Energy' },
    totalSaved: { amount: 0, currency: Currency.Aud },
    latestBill: null,
    subscriptionType: SubscriptionType.Gas,
    signUpLink: 'mockSubscription.signUpLink',
    ...updatedData,
  };
};

describe('BillStatusesTile', () => {
  beforeEach(() => {
    onClickRenew.mockClear();
    onClickSignUp.mockClear();
    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      benefitsBillAhmPromoTile: {
        view: true,
      },
      benefitsBillMedibankPromoTile: {
        view: true,
      },
    } as never;
  });

  it('should render 2 sign up buttons if there is no bill found', () => {
    const { getAllByText } = render(<BillStatusesTile subscriptions={[]} onClickRenew={onClickRenew} />);
    expect(getAllByText('Sign up')).toHaveLength(4);
  });

  it('should ignore unspecified subscriptions', () => {
    const { getAllByText } = render(
      <BillStatusesTile
        subscriptions={[
          generateMockSubscription({
            status: SubscriptionStatus.Reject,
            subscriptionType: SubscriptionType.Electricity,
          }),
          generateMockSubscription({
            status: SubscriptionStatus.Unspecified,
            subscriptionType: SubscriptionType.Gas,
          }),
        ]}
        onClickRenew={onClickRenew}
      />
    );
    expect(getAllByText('Sign up')).toHaveLength(4);
  });

  it('should render renew button if there is a cancelled subscription with sign up link available', () => {
    const { getByText } = render(
      <BillStatusesTile
        subscriptions={[
          generateMockSubscription({
            status: SubscriptionStatus.Cancelled,
            subscriptionType: SubscriptionType.Electricity,
          }),
        ]}
        onClickRenew={onClickRenew}
      />
    );
    expect(getByText('Renew')).toBeTruthy();
    fireEvent.press(getByText('Renew'));
    expect(onClickRenew).toBeCalledWith('mockSubscription.signUpLink', 'ENGIE');
  });

  it('should render sign up button if there is cancelled subscription but with no sign up link', () => {
    const { getAllByText } = render(
      <BillStatusesTile
        subscriptions={[
          generateMockSubscription({
            status: SubscriptionStatus.Cancelled,
            subscriptionType: SubscriptionType.Electricity,
            signUpLink: null,
          }),
        ]}
        onClickRenew={onClickRenew}
      />
    );
    expect(getAllByText('Sign up')).toHaveLength(4);
  });
});
