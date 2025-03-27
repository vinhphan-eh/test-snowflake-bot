/* eslint-disable react-native/no-inline-styles */
import { Identity } from '@ehrocks/react-native-superapp-communication';
import axios from 'axios';
import { produce } from 'immer';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Config from 'react-native-config';
import { useKeyPayTokenStore } from '../../common/auth/store/kpAccessTokenStore';
import {
  type SwagUserTypeStore,
  useSwagUserStore,
} from '../../common/auth/store/swagUserStore';
import { USE_SWAG } from '../../super-app-navigation/constants';
import type { RootStackParamList } from '../../super-app-navigation/MainNavigation';
import {
  type NavigationProp,
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { TwoFactorAuthSelector } from './TwoFactorAuthSelector';
import {
  clearUserInfo,
  isToken,
  isTwoFactorAuthInfo,
  notifyMessage,
  saveUserInfo,
  type TwoFactorAuthInfo,
  type UserInfo,
} from './shared';
import { TwoFactorAuthCode } from './TwoFactorAuthCode';

export interface KeyPayLoginScreenParams {
  userInfo: UserInfo;
  isRemember: boolean;
}

export interface TwoFaSelection {
  TwofaToken: string;
  TwofaProvider: string;
}

type Progress = 'LOGIN' | 'SELECT_METHOD' | 'ENTER_CODE';

export const KeyPayLoginScreen = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'KeyPayLoginScreen'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'KeyPayLoginScreen'>>();
  const [loading, setLoading] = React.useState(false);
  const [loginFailed, setLoginFailed] = React.useState(false);
  const [twoFaData, setTwoFaData] = useState<TwoFactorAuthInfo | null>(null);
  const [twoFaSelection, setTwoFaSelection] = useState<TwoFaSelection | null>(
    null,
  );
  const [progress, setProgress] = useState<Progress>('LOGIN');

  const { userInfo, isRemember } = route.params;

  const processToken = (token: string) => {
    useKeyPayTokenStore.setState({ accessToken: token });
    useSwagUserStore.setState(
      produce((state: SwagUserTypeStore) => {
        state.swagUserType = 'random_user';
        state.currentUser.loginProvider = 'kp';
        state.currentUser.userID = userInfo.username; // As we don't have user ID at this state, fake it to differentiate user
        state.workzoneCountryCode = userInfo.loginServer.isUk
          ? 'en-GB'
          : 'en-AU';
      }),
    );
    Identity.dispatchLoginEvent(token);
    if (USE_SWAG) {
      navigation.reset({ index: 0, routes: [{ name: 'mainNavigator' }] });
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
    }
  };

  const onLoginData = async (data: unknown) => {
    if (isToken(data)) {
      processToken(data.access_token);
    } else if (isTwoFactorAuthInfo(data)) {
      setProgress('SELECT_METHOD');
      setTwoFaData(data);
    } else {
      notifyMessage('Login failed');
      setLoginFailed(true);
    }
  };

  const on2FaResultData = async (data: unknown) => {
    if (isToken(data)) {
      processToken(data.access_token);
    } else {
      notifyMessage('Bad Response');
      setLoginFailed(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    const url = `${userInfo.loginServer.url}/api/v2/twofactor/mobileauth`;
    axios
      .post(url, {
        Username: userInfo.username,
        Password: userInfo.password,
        DeviceId: '1234',
        ClientId: Config.CLIENT_ID,
      })
      .then(res => {
        if (isRemember) {
          saveUserInfo(userInfo);
        } else {
          clearUserInfo();
        }
        onLoginData(res.data);
      })
      .catch(e => {
        notifyMessage('Login failed');
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const trigger2Fa = (kind: string) => {
    const twoFaSelection: TwoFaSelection = {
      TwofaToken: twoFaData?.twofa_token || '',
      TwofaProvider: kind,
    };
    setTwoFaSelection(twoFaSelection);
    setLoading(true);
    const url = `${userInfo.loginServer.url}/api/v2/twofactor/send`;
    axios
      .post(url, twoFaSelection)
      .then(() => setProgress('ENTER_CODE'))
      .catch(e => {
        notifyMessage('Send 2FA request failed');
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onEnterCode = (code: string) => {
    setLoading(true);
    const url = `${userInfo.loginServer.url}/api/v2/twofactor/verify`;
    const data = {
      TwofaToken: twoFaData?.twofa_token,
      TwofaProvider: twoFaSelection?.TwofaProvider,
      TwofaCode: code,
      DeviceId: '1234',
      RememberDeviceHours: 0,
    };
    axios
      .post(url, data)
      .then(res => on2FaResultData(res.data))
      .catch(e => {
        notifyMessage('Verify 2FA code failed');
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Title/Header section */}
      <View
        style={{
          paddingTop: 20,
          paddingBottom: 20,
          backgroundColor: 'blue',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
          KeyPay Login
        </Text>
      </View>

      {/* Main content section */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {loading && <Text>Loading...</Text>}
        {loginFailed && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>Back</Text>
          </TouchableOpacity>
        )}

        {progress === 'SELECT_METHOD' && !loading && (
          <TwoFactorAuthSelector
            twoFaData={twoFaData}
            onSelected={trigger2Fa}
          />
        )}

        {progress === 'ENTER_CODE' && !loading && (
          <TwoFactorAuthCode onVerify={onEnterCode} />
        )}
      </View>
    </SafeAreaView>
  );
};
