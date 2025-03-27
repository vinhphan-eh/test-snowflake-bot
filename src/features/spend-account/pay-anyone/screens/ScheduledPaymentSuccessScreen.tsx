import React from 'react';
import { Box, scale, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { OutcomeTemplate } from '../../../../common/components/outcome-template/OutcomeTemplate';
import { queryClient } from '../../../../common/libs/queryClient';
import { getDefaultCurrency } from '../../../../common/utils/currency';
import { createCurrencyFormatter } from '../../../../common/utils/numbers';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import { useGetActiveScheduledPaymentsQuery } from '../../../../new-graphql/generated';
import type { PayAnyoneScreenNavigationProp } from '../navigation/navigationTypes';
import { usePayAnyoneStore } from '../stores/usePayAnyoneStore';

export const ScheduledPaymentSuccessScreen = () => {
  const navigation = useNavigation<PayAnyoneScreenNavigationProp<'ScheduledPaymentSuccess'>>();

  const formatCurrency = createCurrencyFormatter();
  const auPayAnyoneStore = usePayAnyoneStore();
  const { space } = useTheme();

  const { payeeDetails, paymentDetails, resetData } = auPayAnyoneStore;
  const onNext = () => {
    navigateToTopTabs('spend-tab');
    resetData();
  };

  const onNavigateToManageScheduledPayments = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'ScheduledPaymentDashboard',
        },
      ],
    });
    queryClient.invalidateQueries(useGetActiveScheduledPaymentsQuery.getKey());
    resetData();
  };

  return (
    <OutcomeTemplate
      title="Payment scheduled"
      content={
        <Box marginTop="small">
          <Typography.Body typeface="playful" style={{ textAlign: 'center' }} intent="subdued" variant="regular">
            You will send{' '}
            <Typography.Body typeface="playful" intent="subdued" variant="regular-bold">
              {formatCurrency(Number(paymentDetails.amount), {
                currency: getDefaultCurrency('AU'),
                precision: 2,
              })}
            </Typography.Body>{' '}
            to{' '}
            <Typography.Body typeface="playful" intent="subdued" variant="regular-bold">
              {payeeDetails.accountName}
            </Typography.Body>{' '}
            for{' '}
            <Typography.Body typeface="playful" intent="subdued" variant="regular-bold">
              {paymentDetails.description}
            </Typography.Body>
            .
          </Typography.Body>
        </Box>
      }
      actions={[
        {
          buttonTitle: 'Manage scheduled payments',
          onNext: onNavigateToManageScheduledPayments,
          variant: 'outlined',
          style: {
            marginBottom: space.medium,
          },
        },
        { buttonTitle: 'Done', onNext },
      ]}
      imageName="flying"
      imageHeight={scale(156)}
      imageWidth={scale(156)}
    />
  );
};
