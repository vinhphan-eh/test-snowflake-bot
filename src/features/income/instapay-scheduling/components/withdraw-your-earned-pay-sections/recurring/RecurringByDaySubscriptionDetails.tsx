import React from 'react';
import { Box, Typography } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { RecurringSectionBody } from './RecurringSectionBody';
import { getFloatAmountFromMoneyV2 } from '../../../../../../common/utils/currency';
import { createCurrencyFormatter, type SupportedCurrency } from '../../../../../../common/utils/numbers';
import { capitalize } from '../../../../../../common/utils/string';
import type { RootStackNavigationProp } from '../../../../../../navigation/navigationTypes';
import type { RecurringByDaySubscription } from '../../../../../../new-graphql/generated';
import { useIntl } from '../../../../../../providers/LocalisationProvider';
import { MAX_RECURRING_BY_DAY_AMOUNT } from '../../../constants';
import { useInstaPaySchedulingEventTracking } from '../../../hooks/useInstaPaySchedulingEventTracking';

type Props = {
  subscription: RecurringByDaySubscription;
  currency: SupportedCurrency;
};

export const RecurringByDaySubscriptionDetails = ({ currency, subscription }: Props) => {
  const { formatMessage } = useIntl();
  const formatCurrency = createCurrencyFormatter();
  const { trackUserClickedOnEditRecurringSubscription } = useInstaPaySchedulingEventTracking();
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();

  const navigateToModification = () => {
    trackUserClickedOnEditRecurringSubscription();
    navigation.navigate('InstaPaySchedulingStack', {
      screen: 'InstaPayRecurringByDay',
      params: {
        action: 'modification',
      },
    });
  };
  const { firstPaymentDate, maximumPayAmount } = subscription;
  const amount = getFloatAmountFromMoneyV2(maximumPayAmount);
  const startDate = firstPaymentDate ? dayjs(firstPaymentDate) : undefined;
  const showStartingDate = startDate?.isAfter(dayjs());
  return (
    <Box>
      <RecurringSectionBody
        title={formatMessage(
          { id: 'instapay.scheduling.options.byDay.title' },
          {
            day: capitalize(subscription.payDay),
            amount: (
              <Typography.Body variant="regular-bold">
                {amount === MAX_RECURRING_BY_DAY_AMOUNT
                  ? formatMessage({ id: 'instapay.scheduling.options.byDay.availableBalance' })
                  : formatCurrency(amount, {
                      currency,
                      precision: 0,
                    })}
              </Typography.Body>
            ),
          }
        )}
        caption={formatMessage(
          {
            id: showStartingDate
              ? 'instapay.scheduling.confirmation.amountInfo.wheneverItsReadyWithStartingDate'
              : 'instapay.scheduling.confirmation.amountInfo.wheneverItsReady',
          },
          {
            starting_date: showStartingDate ? `${startDate?.format('DD/MM/YYYY')}` : '',
          }
        )}
        onEdit={navigateToModification}
      />
    </Box>
  );
};
