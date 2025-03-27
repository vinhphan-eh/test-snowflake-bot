import React from 'react';
import { defineWalletAppScreens } from '@ehrocks/react-native-swag-personal-app';
import { createStackNavigator } from '@react-navigation/stack';
import { PillarsSwitch } from './PillarsSwitch';
import { CORE_SETTINGS_STACK } from '../../../src/navigation/rootNavigation';
import { ProfileScreen } from '../features/profile/ProfileScreen';
import { useKeyPayTokenStore } from '../common/auth/store/kpAccessTokenStore';
import { withHDTheme } from '../../../src/common/hoc/withHDTheme';
import { defineMoneyProfileScreens } from '../../../src/features/my-profile/navigation';

const Stack = createStackNavigator();

const CORE_DASH_BOARD = 'dashboard';
const CORE_WORK_ZONE = 'workzone';

export const SwagStack = () => {
  const kpAccessToken = useKeyPayTokenStore(state => state.accessToken);
  const screenName = kpAccessToken ? CORE_WORK_ZONE : CORE_DASH_BOARD;

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={screenName}>
      <Stack.Screen name={screenName} component={PillarsSwitch} />
      {defineWalletAppScreens()}
      <Stack.Screen
        name={CORE_SETTINGS_STACK}
        component={withHDTheme(ProfileScreen)}
      />
      {defineMoneyProfileScreens()}
    </Stack.Navigator>
  );
};
