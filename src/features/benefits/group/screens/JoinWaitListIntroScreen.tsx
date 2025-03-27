import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import JoinWaitList from '../components/JoinWaitList';
import type { GroupNavigationProp, GroupRouteProp } from '../navigation/navigationType';

const JoinWaitListIntroScreen = () => {
  const navigation = useNavigation<GroupNavigationProp<'JoinWaitListIntroScreen'>>();
  const route = useRoute<GroupRouteProp<'JoinWaitListIntroScreen'>>();
  return (
    <JoinWaitList
      onJoinWaitListFailed={() => navigation.navigate('Error')}
      onJoinWaitListSuccess={route.params.onJoinWaitListSuccess}
    />
  );
};

export default JoinWaitListIntroScreen;
