import React, { useState } from 'react';
import { Button } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { RecurringManagement } from './RecurringManagement';
import type { RootStackNavigationProp } from '../../../../../../navigation/navigationTypes';
import { useIntl } from '../../../../../../providers/LocalisationProvider';
import { useInstaPaySchedulingStore } from '../../../stores/useInstaPaySchedulingStore';
import {
  useWithdrawYourEarnedPaySectionStore,
  WithdrawYourEarnedPaySectionKey,
} from '../../../stores/useWithdrawYourEarnedPaySectionStore';

export const WithdrawYourEarnedPayManagement = () => {
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const { formatMessage } = useIntl();

  const { currentByDaySubscription, currentSubscription: currentSchedulingSubscription } = useInstaPaySchedulingStore();
  const selectedTabKey = useWithdrawYourEarnedPaySectionStore(state => state.selectedTabKey);
  const [showManageBts, setShowManageBts] = useState(false);

  const onClose = () => setShowManageBts(false);

  const onPressEWAManage = () => {
    if (
      selectedTabKey === WithdrawYourEarnedPaySectionKey.RECURRING &&
      (currentSchedulingSubscription || currentByDaySubscription)
    ) {
      setShowManageBts(true);
    } else {
      navigation.navigate('SupportStack', { screen: 'InstaPayHistory' });
    }
  };

  return (
    <>
      <Button
        testID="ewa-manage"
        intent="primary"
        variant="text"
        text={formatMessage({ id: 'instapay.manage.title' })}
        onPress={onPressEWAManage}
      />
      {selectedTabKey === WithdrawYourEarnedPaySectionKey.RECURRING && (
        <RecurringManagement open={showManageBts} onCloseBts={onClose} />
      )}
    </>
  );
};
