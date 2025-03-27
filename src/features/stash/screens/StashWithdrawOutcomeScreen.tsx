import React from 'react';
import { Typography, useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OutcomeTemplate } from '../../../common/components/outcome-template/OutcomeTemplate';
import { queryClient } from '../../../common/libs/queryClient';
import { createCurrencyFormatter } from '../../../common/utils/numbers';
import { navigateToTopTabs } from '../../../navigation/rootNavigation';
import { useGetStashesQuery } from '../../../new-graphql/generated';
import type { StashNavigationProp, StashRouteProp } from '../navigation/navigationTypes';

export const StashWithdrawOutcomeScreen = () => {
  const navigation = useNavigation<StashNavigationProp<'StashWithdrawOutcome'>>();
  const route = useRoute<StashRouteProp<'StashWithdrawOutcome'>>();
  const { amount, id, isClosed, isError, name } = route.params;
  const { space } = useTheme();
  const formatCurrency = createCurrencyFormatter();
  const stashQueryKey = useGetStashesQuery.getKey();

  const onBackToStashDetails = () => {
    queryClient.invalidateQueries(stashQueryKey);
    navigation.navigate('StashIndividual', { id });
  };

  const onNavigateToStashDashboard = () => {
    queryClient.invalidateQueries(stashQueryKey);
    navigateToTopTabs('stash-tab');
  };

  const onRetry = () => {
    navigation.goBack();
  };

  return isError ? (
    <OutcomeTemplate
      title="We're sorry, something went wrong"
      content="Please try again later"
      imageName="ice-cream-income"
      actions={[
        {
          buttonTitle: 'Close',
          variant: 'outlined',
          testId: 'withdraw-outcome-close-btn',
          onNext: onBackToStashDetails,
        },
        {
          buttonTitle: 'Try again',
          style: { marginTop: space.medium },
          testId: 'withdraw-outcome-retry-btn',
          onNext: onRetry,
        },
      ]}
    />
  ) : (
    <OutcomeTemplate
      title="Your money was moved"
      content={
        isClosed ? (
          <Typography.Body
            typeface="playful"
            variant="regular"
            intent="subdued"
            style={{ textAlign: 'center', marginTop: space.small }}
          >
            You withdrew{' '}
            <Typography.Body typeface="playful" variant="regular-bold" intent="subdued">
              {formatCurrency(Number(amount))}{' '}
            </Typography.Body>
            and closed your{' '}
            <Typography.Body typeface="playful" variant="regular-bold" intent="subdued">
              {name}{' '}
            </Typography.Body>
            Stash
          </Typography.Body>
        ) : (
          <Typography.Body
            typeface="playful"
            variant="regular"
            intent="subdued"
            style={{ textAlign: 'center', marginTop: space.small }}
          >
            You withdrew{' '}
            <Typography.Body typeface="playful" variant="regular-bold" intent="subdued">
              {formatCurrency(Number(amount))}{' '}
            </Typography.Body>
            to your Spend account.
          </Typography.Body>
        )
      }
      imageName="flying2"
      actions={[
        {
          buttonTitle: 'Done',
          testId: 'withdraw-outcome-done-btn',
          onNext: isClosed ? onNavigateToStashDashboard : onBackToStashDetails,
        },
      ]}
    />
  );
};
