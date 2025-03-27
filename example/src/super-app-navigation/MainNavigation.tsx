import React from 'react';
// Temp import since super app doesn't need our icon
import { LoginScreen } from '../features/auth/LoginScreen';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { CoreAppMainNavigator } from './CoreAppMainNavigator';
import {KeyPayLoginScreen, KeyPayLoginScreenParams } from '../features/auth/KeyPayLoginScreen';


export type RootStackParamList = {
    LoginScreen: undefined;
    KeyPayLoginScreen: KeyPayLoginScreenParams;
    mainNavigator: undefined;
    Dashboard: undefined;
};

type KeyPayLoginScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'KeyPayLoginScreen'
>;

export type KeyPayLoginScreenProps = {
    navigation: KeyPayLoginScreenNavigationProp;
};


const StackMain = createStackNavigator();


const MainNavigator = () => {
  return (
    <StackMain.Navigator
      initialRouteName={'LoginScreen'}
      screenOptions={{ headerShown: false }}>
        <StackMain.Screen name={'LoginScreen'} component={LoginScreen} />
        <StackMain.Screen name={'KeyPayLoginScreen'} component={KeyPayLoginScreen} />
      <StackMain.Screen
        name={'mainNavigator'}
        component={CoreAppMainNavigator}
      />
    </StackMain.Navigator>
  );
};

export default MainNavigator;
