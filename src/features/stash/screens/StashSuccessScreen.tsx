import React from 'react';
import { Box, Typography, scale, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { OutcomeTemplate } from '../../../common/components/outcome-template/OutcomeTemplate';
import { useSessionStore } from '../../../common/stores/useSessionStore';
import { STASH_CASH } from '../constants';
import { useGetStashDetails } from '../hooks/useGetStashDetails';
import type { StashNavigationProp } from '../navigation/navigationTypes';
import { useCreateStashStore } from '../stores/useCreateStashStore';

export const StashSuccessScreen = () => {
  const navigation = useNavigation<StashNavigationProp<'StashSuccess'>>();
  const { name, resetData } = useCreateStashStore();
  const { space } = useTheme();
  const stash = useGetStashDetails({ name });
  const handleInternalRatingPrompt = useSessionStore(state => state.handleInternalRatingPrompt);

  const onNavigateToStashIndividual = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'StashIndividual', params: { id: stash.id } }],
    });
    resetData();
    handleInternalRatingPrompt?.(STASH_CASH);
  };

  const onNavigateToStashCash = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'StashDepositCash', params: { stash } }],
    });
    resetData();
  };

  return (
    <OutcomeTemplate
      title="Stash created"
      content={
        <Box marginTop="small">
          <Typography.Body
            typeface="playful"
            style={{ textAlign: 'center' }}
            intent="subdued"
            variant="regular"
            testID="stashSuccess-message"
          >
            Would you like to add some money to your{' '}
            <Typography.Body typeface="playful" intent="subdued" variant="regular-bold">
              {name}
            </Typography.Body>{' '}
            Stash now?
          </Typography.Body>
        </Box>
      }
      actions={[
        {
          buttonTitle: 'Not now',
          variant: 'outlined',
          onNext: onNavigateToStashIndividual,
          style: {
            marginBottom: space.medium,
          },
        },
        {
          buttonTitle: 'Stash some cash',
          onNext: onNavigateToStashCash,
        },
      ]}
      imageName="flying"
      imageHeight={scale(156)}
      imageWidth={scale(156)}
    />
  );
};
