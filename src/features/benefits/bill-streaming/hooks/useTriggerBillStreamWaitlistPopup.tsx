import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useBillStreamingWaitlistPermission } from './useBillStreamingWaitlistPermission';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import { useBillStreamingWaitlistStore } from '../stores/useBillStreamingWaitlistStore';

export const useTriggerBillStreamWaitlistPopup = () => {
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const haveShownBillStreamWaitlistPopup = useBillStreamingWaitlistStore(state => state.haveShownPopup);
  const hasHydrate = useBillStreamingWaitlistStore(state => state.hasHydrate);
  const { havingPermission: billStreamWaitlistPermission } = useBillStreamingWaitlistPermission();

  useEffect(() => {
    if (hasHydrate && !haveShownBillStreamWaitlistPopup && billStreamWaitlistPermission) {
      navigation.navigate('BillStreamWaitlist', { screen: 'BillStreamWaitlistIntro' });
    }
  }, [billStreamWaitlistPermission, hasHydrate, haveShownBillStreamWaitlistPopup, navigation]);
};
