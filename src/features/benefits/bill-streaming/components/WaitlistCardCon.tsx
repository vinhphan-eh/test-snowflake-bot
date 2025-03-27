import React from 'react';
import { Box } from '@hero-design/rn';
import type { BoxProps } from '@hero-design/rn/types/components/Box';
import { useNavigation } from '@react-navigation/native';
import { WaitlistCard } from './WaitlistCard';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import { useBillStreamingWaitlistPermission } from '../hooks/useBillStreamingWaitlistPermission';
import { useBillStreamingWaitlistStore } from '../stores/useBillStreamingWaitlistStore';

export const WaitlistCardCon = (props: BoxProps) => {
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const { havingPermission } = useBillStreamingWaitlistPermission();
  const haveDoneRegistration = useBillStreamingWaitlistStore(state => state.haveDoneRegistration);
  const hasHydrate = useBillStreamingWaitlistStore(state => state.hasHydrate);

  if (!havingPermission || haveDoneRegistration || !hasHydrate) {
    return null;
  }

  const goToSignUp = () => {
    navigation.navigate('BillStreamWaitlist', { screen: 'BillStreamWaitlistSignup' });
  };

  return (
    <Box {...props}>
      <WaitlistCard onPress={goToSignUp} />
    </Box>
  );
};
