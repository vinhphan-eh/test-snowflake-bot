import React from 'react';
import { Typography, List } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from '../../../../../../navigation/navigationTypes';
import { useIntl } from '../../../../../../providers/LocalisationProvider';

interface HistoryManagementProps {
  onCloseBts: () => void;
}

export const HistoryManagement = (props: HistoryManagementProps) => {
  const { onCloseBts } = props;
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const { formatMessage } = useIntl();

  const onViewHistory = () => {
    onCloseBts();
    navigation.navigate('SupportStack', { screen: 'InstaPayHistory' });
  };

  return (
    <List.Item
      title={<Typography.Body>{formatMessage({ id: 'support.instapayHistory.title' })}</Typography.Body>}
      onPress={onViewHistory}
    />
  );
};
