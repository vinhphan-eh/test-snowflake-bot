import React from 'react';
import { Typography, useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OutcomeTemplate } from '../../../common/components/outcome-template/OutcomeTemplate';
import { queryClient } from '../../../common/libs/queryClient';
import { useSessionStore } from '../../../common/stores/useSessionStore';
import { createCurrencyFormatter } from '../../../common/utils/numbers';
import { navigateToTopTabs } from '../../../navigation/rootNavigation';
import { useGetStashesQuery } from '../../../new-graphql/generated';
import { STASH_CASH } from '../constants';
import type { StashNavigationProp, StashRouteProp } from '../navigation/navigationTypes';

export const StashDepositSuccessScreen = () => {
  const navigation = useNavigation<StashNavigationProp<'StashDepositSuccess'>>();
  const handleInternalRatingPrompt = useSessionStore(state => state.handleInternalRatingPrompt);
  const {
    params: { amount, id, name },
  } = useRoute<StashRouteProp<'StashDepositSuccess'>>();
  const { space } = useTheme();
  const formatCurrency = createCurrencyFormatter();
  const stashQueryKey = useGetStashesQuery.getKey();

  const onDone = () => {
    queryClient.invalidateQueries(stashQueryKey);
    navigateToTopTabs('stash-tab');
    handleInternalRatingPrompt?.(STASH_CASH);
  };

  const onViewDetails = () => {
    queryClient.invalidateQueries(stashQueryKey);
    navigation.navigate('StashIndividual', { id });
    handleInternalRatingPrompt?.(STASH_CASH);
  };

  return (
    <OutcomeTemplate
      actions={[
        {
          buttonTitle: 'View in Stash',
          variant: 'outlined',
          onNext: onViewDetails,
          style: { marginBottom: space.medium },
        },
        {
          buttonTitle: 'Done',
          onNext: onDone,
        },
      ]}
      title="Your cash is stashed!"
      content={
        <Typography.Body typeface="playful" intent="subdued">
          You transferred
          <Typography.Body typeface="playful" variant="regular-bold" intent="subdued">
            {` ${formatCurrency(amount ?? 0)} `}
          </Typography.Body>
          to
          <Typography.Body typeface="playful" variant="regular-bold" intent="subdued">
            {` ${name}`}
          </Typography.Body>
        </Typography.Body>
      }
      imageName="flying2"
    />
  );
};
