import React from 'react';
import { mockedNavigate } from '../../../../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../../../../test-setup/after-env/mixpanel.setup';
import { render, waitFor, fireEvent } from '../../../../../../../common/utils/testing';
import { CurrencyType, Sign } from '../../../../../../../new-graphql/generated';
import { aSchedulingSubscription } from '../../../../../../../new-graphql/mocks/generated-mocks';
import { mockedSharedIPSchedulingEventProperties } from '../../../../hooks/useInstaPaySchedulingEventTracking';
import { CLICKED_ON_EDIT_TO_MODIFY_EXISTING_RECURRING_WITHDRAWAL } from '../../../../mixpanelEvents';
import { RecurringSectionSubscriptionDetails } from '../RecurringSectionSubscriptionDetails';

describe('RecurringSectionSubscriptionDetails', () => {
  it('should render properly for amount with decimal values', async () => {
    const { getByText } = render(
      <RecurringSectionSubscriptionDetails
        subscription={{
          ...aSchedulingSubscription({
            amount: {
              sign: Sign.Positive,
              units: 123,
              subUnits: 50,
              type: CurrencyType.CurrencyTypeAud,
            },
          }),
          organisationId: 'organisationId',
        }}
        currency="AUD"
      />
    );

    await waitFor(() => {
      expect(getByText('Your recurring payments are set to:')).toBeTruthy();
      expect(getByText('Withdraw every $123.50 earned.')).toBeTruthy();
      expect(getByText(`Whenever it's ready, at 9pm.`)).toBeTruthy();
      expect(getByText('Edit')).toBeTruthy();
    });
  });

  it('should render properly for amount without decimal values', async () => {
    const { getByText } = render(
      <RecurringSectionSubscriptionDetails
        subscription={{
          ...aSchedulingSubscription({
            amount: {
              sign: Sign.Positive,
              units: 135,
              subUnits: 0,
              type: CurrencyType.CurrencyTypeAud,
            },
          }),
          organisationId: 'organisationId',
        }}
        currency="AUD"
      />
    );

    await waitFor(() => {
      expect(getByText('Your recurring payments are set to:')).toBeTruthy();
      expect(getByText('Withdraw every $135 earned.')).toBeTruthy();
      expect(getByText(`Whenever it's ready, at 9pm.`)).toBeTruthy();
      expect(getByText('Edit')).toBeTruthy();
    });
  });

  it('should navigate to modification flow while pressed on Edit', async () => {
    const { getByTestId } = render(
      <RecurringSectionSubscriptionDetails
        subscription={{
          ...aSchedulingSubscription({
            id: 'mockedId',
            amount: {
              sign: Sign.Positive,
              units: 135,
              subUnits: 50,
              type: CurrencyType.CurrencyTypeAud,
            },
            bankAccountExternalId: 'mockedBankAccountExternalId',
          }),
          organisationId: 'organisationId',
        }}
        currency="AUD"
      />
    );

    fireEvent.press(getByTestId('recurring-section-subscription-edit'));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('InstaPaySchedulingStack', {
        screen: 'InstaPaySchedulingModification',
      });
      expect(mockedEventTracking).toHaveBeenCalledWith({
        ...mockedSharedIPSchedulingEventProperties(),
        event: CLICKED_ON_EDIT_TO_MODIFY_EXISTING_RECURRING_WITHDRAWAL,
      });
    });
  });
});
