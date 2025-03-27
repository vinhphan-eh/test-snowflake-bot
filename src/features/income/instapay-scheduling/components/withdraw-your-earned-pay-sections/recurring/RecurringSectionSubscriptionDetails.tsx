import React from 'react';
import { Box, Typography } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { RecurringSectionBody } from './RecurringSectionBody';
import { getFloatAmountFromMoneyV2 } from '../../../../../../common/utils/currency';
import { createCurrencyFormatter, type SupportedCurrency } from '../../../../../../common/utils/numbers';
import type { RootStackNavigationProp } from '../../../../../../navigation/navigationTypes';
import { useIntl } from '../../../../../../providers/LocalisationProvider';
import type { SchedulingSubscriptionWithOrgDetails } from '../../../hooks/useCheckInstapaySchedulingPermission';
import { useInstaPaySchedulingEventTracking } from '../../../hooks/useInstaPaySchedulingEventTracking';

type RecurringSectionSubscriptionDetailsProps = {
  subscription: SchedulingSubscriptionWithOrgDetails;
  currency: SupportedCurrency;
};

export const RecurringSectionSubscriptionDetails = ({
  currency,
  subscription,
}: RecurringSectionSubscriptionDetailsProps) => {
  const { formatMessage } = useIntl();
  const formatCurrency = createCurrencyFormatter();
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const { trackUserClickedOnEditRecurringSubscription } = useInstaPaySchedulingEventTracking();

  const navigateToModification = () => {
    trackUserClickedOnEditRecurringSubscription();
    navigation.navigate('InstaPaySchedulingStack', {
      screen: 'InstaPaySchedulingModification',
    });
  };

  return (
    <Box>
      <RecurringSectionBody
        title={formatMessage(
          { id: 'instapay.scheduling.options.byAmount.detailSection.title' },
          {
            amount: (
              <Typography.Body variant="regular-bold">
                {formatCurrency(getFloatAmountFromMoneyV2(subscription.amount), {
                  currency,
                  precision: subscription.amount.subUnits ? 2 : 0,
                })}
              </Typography.Body>
            ),
          }
        )}
        caption={formatMessage({ id: 'instapay.scheduling.confirmation.amountInfo.wheneverItsReady' })}
        onEdit={navigateToModification}
      />
    </Box>
  );
};
