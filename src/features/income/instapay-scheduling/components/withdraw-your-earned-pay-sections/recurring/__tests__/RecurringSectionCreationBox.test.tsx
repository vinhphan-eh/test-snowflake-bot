import React from 'react';
import { mockedNavigate } from '../../../../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../../../../test-setup/after-env/mixpanel.setup';
import { fireEvent, render, waitFor } from '../../../../../../../common/utils/testing';
import type { InstaPayOrg } from '../../../../../instapay/hooks/useInstaPayAvailableBalances';
import { mockedSharedIPSchedulingEventProperties } from '../../../../hooks/useInstaPaySchedulingEventTracking';
import { CLICKED_ON_WITHDRAW_EVERY_EARNED_AMOUNT_DURING_RECURRING_WITHDRAWAL_CREATION } from '../../../../mixpanelEvents';
import { RecurringSectionCreationBox } from '../RecurringSectionCreationBox';

describe('RecurringSectionCreationBox', () => {
  it('should render the options and elements properly', async () => {
    const { getByText } = render(<RecurringSectionCreationBox openHowItWorks={jest.fn()} currency="AUD" />);

    await waitFor(() => {
      expect(getByText('Set a withdrawal amount')).toBeTruthy();
      expect(getByText('$500')).toBeTruthy();
      expect(getByText('$300')).toBeTruthy();
      expect(getByText('$100')).toBeTruthy();
      expect(getByText('How it works')).toBeTruthy();

      // Select $500 option by default
      expect(getByText('Withdraw every $300 earned')).toBeTruthy();
    });
  });

  it('should call passed method to open How It Works bottom sheet on pressed', async () => {
    const mockedOpenHowItWorks = jest.fn();

    const { getByTestId } = render(
      <RecurringSectionCreationBox openHowItWorks={mockedOpenHowItWorks} currency="AUD" />
    );

    fireEvent.press(getByTestId('recurring-section-creation-box-how-it-works'));

    await waitFor(() => {
      expect(mockedOpenHowItWorks).toHaveBeenCalled();
    });
  });

  it('should update the CTA caption and allow navigation properly when switched to another option', async () => {
    const { getByText } = render(<RecurringSectionCreationBox openHowItWorks={jest.fn()} currency="AUD" />);

    fireEvent.press(getByText('$100'));

    await waitFor(() => {
      expect(getByText('Withdraw every $100 earned')).toBeTruthy();
    });

    fireEvent.press(getByText('Withdraw every $100 earned'));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('InstaPaySchedulingStack', {
        screen: 'InstaPaySchedulingBankAccountSelection',
      });
      expect(mockedEventTracking).toHaveBeenCalledWith({
        ...mockedSharedIPSchedulingEventProperties({
          amount: 100,
        }),
        event: CLICKED_ON_WITHDRAW_EVERY_EARNED_AMOUNT_DURING_RECURRING_WITHDRAWAL_CREATION,
      });
    });
  });

  it('should render properly and update the amount on changing the value of Other option', async () => {
    const { getByTestId, getByText } = render(
      <RecurringSectionCreationBox
        openHowItWorks={jest.fn()}
        currency="AUD"
        membership={
          {
            limit: { schedulingMin: 50 },
          } as InstaPayOrg
        }
      />
    );

    fireEvent.press(getByText('Other'));

    await waitFor(() => {
      expect(getByText('maximum $1,000, minimum $50')).toBeTruthy();
      expect(getByTestId('custom-chip-input')).toBeTruthy();
    });

    fireEvent.changeText(getByTestId('custom-chip-input'), '123.56');

    await waitFor(() => {
      expect(getByText('Withdraw every $123.56 earned')).toBeTruthy();
    });
  });
});
