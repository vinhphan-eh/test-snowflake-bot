import React from 'react';
import { Box, scale, Typography } from '@hero-design/rn';
import { OutcomeTemplate } from '../../../../common/components/outcome-template/OutcomeTemplate';
import { queryClient } from '../../../../common/libs/queryClient';
import { getDefaultCurrency } from '../../../../common/utils/currency';
import { createCurrencyFormatter } from '../../../../common/utils/numbers';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import {
  useGetEWalletAuAccountDetailsQuery,
  useGetEWalletUkAccountDetailsQuery,
  useInfiniteGetWalletTransactionsV2Query,
  type CountryOfOrigin,
} from '../../../../new-graphql/generated';
import { useRegionLocalisation } from '../../../../providers/LocalisationProvider';
import { Region } from '../../../../providers/LocalisationProvider/constants';
import { DEFAULT_TRANSACTION_PAGE_LIMIT } from '../../utils/transaction';
import { usePayAnyoneStore } from '../stores/usePayAnyoneStore';
import { useUkPayAnyoneStore } from '../stores/useUkPayAnyoneStore';

export const SuccessScreen = () => {
  const formatCurrency = createCurrencyFormatter();
  const ukPayAnyoneStore = useUkPayAnyoneStore();
  const auPayAnyoneStore = usePayAnyoneStore();
  const { currentRegion } = useRegionLocalisation();

  const { payeeDetails, paymentDetails, resetData } = currentRegion === 'GB' ? ukPayAnyoneStore : auPayAnyoneStore;
  const onNext = () => {
    queryClient.invalidateQueries(
      useInfiniteGetWalletTransactionsV2Query.getKey({
        limit: DEFAULT_TRANSACTION_PAGE_LIMIT,
        offset: 0,
        country: currentRegion as CountryOfOrigin,
      })
    );

    if (currentRegion === Region.gb) {
      queryClient.invalidateQueries(useGetEWalletUkAccountDetailsQuery.getKey());
    } else {
      queryClient.invalidateQueries(useGetEWalletAuAccountDetailsQuery.getKey());
    }

    navigateToTopTabs('spend-tab');
    resetData();
  };

  return (
    <OutcomeTemplate
      title="Payment sent"
      content={
        <Box marginTop="small">
          <Typography.Body typeface="playful" style={{ textAlign: 'center' }} intent="subdued" variant="regular">
            You sent{' '}
            <Typography.Body typeface="playful" intent="subdued" variant="regular-bold">
              {formatCurrency(Number(paymentDetails.amount), {
                currency: getDefaultCurrency(currentRegion ?? 'AU'),
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
      actions={[{ buttonTitle: 'Done', onNext }]}
      imageName="flying"
      imageHeight={scale(156)}
      imageWidth={scale(156)}
    />
  );
};
