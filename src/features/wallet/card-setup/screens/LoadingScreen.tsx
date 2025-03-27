import React, { useEffect, useState } from 'react';
import { Box, Spinner } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OutcomeTemplate } from '../../../../common/components/outcome-template/OutcomeTemplate';
import { useUpdateCardPinMutation } from '../../../../new-graphql/generated';
import { useRequestNewCardStore } from '../../../card-management/request-new-card/stores/useRequestNewCardStore';
import type { CardSetupScreenNavigationProp, CardSetupScreenRouteProp } from '../navigation/navigationTypes';

export const LoadingScreen = () => {
  const route = useRoute<CardSetupScreenRouteProp<'Confirmation'>>();
  const { pin } = route.params;
  const resetPin = useUpdateCardPinMutation();
  const navigation = useNavigation<CardSetupScreenNavigationProp<'Loading'>>();
  const setShowResetPinAlert = useRequestNewCardStore(state => state.setShowResetPinAlert);

  const [showSpinner, setShowSpinner] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => {
      setShowSpinner(false);
    }, 5 * 1000);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    resetPin
      .mutateAsync({ cardPIN: pin })
      .then(() => {
        setShowResetPinAlert(false);
        navigation.navigate('Success', { resetCardPin: true });
      })
      .catch(() => {
        navigation.navigate('Error', { resetCardPin: true });
      });
  }, []);

  return (
    <OutcomeTemplate
      title="Resetting your PIN."
      content={
        <Box flex={1} marginTop="large">
          {showSpinner && <Spinner size="small" />}
        </Box>
      }
    />
  );
};
