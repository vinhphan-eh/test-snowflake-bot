/* eslint-disable react-native/no-inline-styles */
import { Identity } from '@ehrocks/react-native-superapp-communication';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { produce } from 'immer';
import React, { useCallback, useEffect, useMemo } from 'react';
import {
  Keyboard,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useKeyPayTokenStore } from '../../common/auth/store/kpAccessTokenStore';
import { useSessionTokenStore } from '../../common/auth/store/sessionTokenStore';
import {
  type SwagUserTypeStore,
  useSwagUserStore,
} from '../../common/auth/store/swagUserStore';
import { USE_SWAG } from '../../super-app-navigation/constants';
import {
  clearUserInfo,
  getIsRememberInfo,
  getUserInfo,
  loginServers,
  notifyMessage,
  saveIsRememberInfo,
  saveUserInfo,
  type UserInfo,
} from './shared';
import { Select } from '@hero-design/rn';
import { useDeeplinkStore } from '../../common/auth/store/deeplinkStore';
import { ChangeEnvComp } from '../../common/switchEnvHelper/ChangeEnvComp';
import { useMimicEnvStore } from '../../common/switchEnvHelper/useMimicEnvStore';
import PillarSelect from '../../common/pillarSwitcher/PillarSelect';
import BrazeManager from '../braze/BrazeManager';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const Config = useMimicEnvStore(state => state.config);
  const [userInfo, setUserInfo] = React.useState<UserInfo>({
    username: '',
    password: '',
    loginServer: {
      url: '',
      isEh: true,
    },
    deeplink: '',
  });
  const [isRemember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const loginServersList = useMemo(
    () =>
      loginServers({
        ehAuth: Config?.EH_AUTH_API_URL,
        kpAuth: Config?.WORKZONE_HOST,
        env: Config?.ENV,
      }),
    [Config],
  );

  useEffect(() => {
    const init = async () => {
      const [userInfo, isRemember] = await Promise.all([
        getUserInfo(),
        getIsRememberInfo(),
      ]);
      setUserInfo(userInfo);
      setRemember(isRemember);
    };
    init();
  }, [loginServersList]);

  const setRememberMe = useCallback((value: boolean) => {
    setRemember(value);
    saveIsRememberInfo(value);
  }, []);

  const fetchUserType = async (token: string) => {
    const baseUrl = `${Config?.MAIN_APP_ENDPOINT}/api/v3/users/swag_user_type/`;
    const userTypeRes = await axios
      .get(baseUrl, {
        headers: {
          'session-token': token,
          'jwt-token': undefined,
        },
      })
      .catch(e => {
        notifyMessage('Get user type failed');
        console.log(e);
      });

    return userTypeRes;
  };

  const onChangeUserName = useCallback((text: string) => {
    setUserInfo(prev => ({ ...prev, username: text }));
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setUserInfo(prev => ({
      ...prev,
      password: text,
    }));
  }, []);

  const onChangeLoginServer = useCallback(
    (idx: number | null) => {
      if (idx === null) {
        return;
      }
      setUserInfo(prev => ({
        ...prev,
        loginServer: loginServersList[idx],
      }));
    },
    [loginServersList],
  );

  const onChangeDeeplink = useCallback((text: string) => {
    setUserInfo(prev => ({
      ...prev,
      deeplink: text,
    }));
  }, []);

  const onLogin = useCallback(async () => {
    if (!userInfo.username || !userInfo.password) {
      notifyMessage('Please input username and password');
      return;
    }
    if (!userInfo.loginServer.isEh) {
      navigation.navigate('KeyPayLoginScreen', {
        userInfo: userInfo,
        isRemember,
      });
      return;
    }
    setLoading(true);
    const response = await axios
      .post(loginServersList[0].url, {
        data: {
          attributes: {
            email: userInfo.username,
            password: userInfo.password,
            device_id: 'device_id_from_mobile_phone',
            device_info: {
              app_version: 0,
              platform: 'ebf_dev',
            },
            workzone_client_id: Config?.CLIENT_ID,
          },
        },
      })
      .then(res => res.data)
      .catch(e => {
        notifyMessage('Login failed');
        console.log(e);
      });
    setLoading(false);

    const { eh_account, kp_account } = response.data;

    if (eh_account || kp_account) {
      const token = eh_account
        ? eh_account.data.attributes?.session_token
        : kp_account.access_token;

      if (token) {
        if (isRemember) {
          saveUserInfo(userInfo);
        } else {
          clearUserInfo();
        }

        if (eh_account) {
          const userUUID = eh_account.data.attributes?.uuid;
          if (userUUID) {
            BrazeManager.init(userUUID);
          }

          useSessionTokenStore.setState({ sessionToken: token });
          // for mimic app: candidate & EH login go here, to test candidate swagUserType, pls hardcord to non_current_employee
          const userTypeRes = await fetchUserType(token);

          useSwagUserStore.setState(
            produce((state: SwagUserTypeStore) => {
              const member = eh_account?.included?.find(
                (obj: { type: string; id: any }) => obj.type === 'members',
              );
              const currentOrgId = `${
                member?.attributes?.organisation_id || ''
              }`;
              const organisation = eh_account?.included?.find(
                (obj: { type: string; id: any }) =>
                  obj.type === 'organisations' && obj.id === currentOrgId,
              );
              const currentOrgUuid = organisation?.attributes?.uuid;

              state.swagUserType = userTypeRes?.data?.data?.user_type;
              state.currentUser.loginProvider = 'eh';
              state.currentUser.userID = userInfo.username; // As we don't have user ID at this state, fake it to differentiate user
              state.currentOrgId = currentOrgId;
              state.memberId = member?.id;
              state.currentOrgUuid = currentOrgUuid;
              state.workzoneCountryCode = userInfo.loginServer.isUk
                ? 'en-GB'
                : 'en-AU';

              if (member) {
                state.currentUser.attributes = {
                  terminated: member?.attributes?.terminated ?? false,
                };
              }
            }),
          );
        } else {
          useKeyPayTokenStore.setState({ accessToken: token });
          useSwagUserStore.setState(
            produce((state: SwagUserTypeStore) => {
              state.swagUserType = undefined;
              state.currentUser.loginProvider = 'kp';
              state.currentUser.userID = userInfo.username; // As we don't have user ID at this state, fake it to differentiate user
              state.workzoneCountryCode = userInfo.loginServer.isUk
                ? 'en-GB'
                : 'en-AU';
            }),
          );
        }

        Identity.dispatchLoginEvent(token);
        useDeeplinkStore.setState({ deeplink: userInfo?.deeplink });
        if (USE_SWAG) {
          navigation.reset({ index: 0, routes: [{ name: 'mainNavigator' }] });
        } else {
          navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
        }
      }
    }
  }, [isRemember, navigation, userInfo]);

  const selectedLoginServerIndex = loginServersList.findIndex(
    item => item.url === userInfo.loginServer.url,
  );
  const selectOptions = loginServersList.map((item, idx) => ({
    text: item.url,
    value: idx,
  }));

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'pink',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {__DEV__ && <ChangeEnvComp />}

        <PillarSelect style={{ marginBottom: 8 }} />

        <TextInput
          placeholder={'User Name'}
          value={userInfo.username}
          style={{
            borderWidth: 1,
            borderRadius: 4,
            padding: 10,
            width: '80%',
          }}
          onChangeText={onChangeUserName}
          testID={'username'}
        />
        <TextInput
          placeholder={'Password Name'}
          value={userInfo.password}
          onChangeText={onChangePassword}
          testID={'password'}
          secureTextEntry
          style={{
            marginTop: 10,
            borderWidth: 1,
            borderRadius: 4,
            padding: 10,
            width: '80%',
          }}
        />
        <TextInput
          placeholder={'With deeplink (optional)'}
          value={userInfo.deeplink}
          style={{
            borderWidth: 1,
            borderRadius: 4,
            padding: 10,
            width: '80%',
            marginTop: 10,
          }}
          onChangeText={onChangeDeeplink}
          testID="deeplink-input"
        />
        <Select
          testID="login-server-select"
          options={selectOptions}
          onConfirm={onChangeLoginServer}
          value={selectedLoginServerIndex}
          label={'Login Server'}
          style={{
            backgroundColor: 'pink',
            marginTop: 10,
            padding: 0,
            margin: 0,
            width: '100%',
          }}
        />
        <Text>Remember me</Text>
        <Switch
          testID="remember-me-switch"
          value={isRemember}
          onValueChange={setRememberMe}
        />
        <TouchableOpacity
          testID={'loginBtn'}
          style={{
            backgroundColor: 'black',
            paddingHorizontal: 20,
            paddingVertical: 12,
            marginTop: 8,
          }}
          disabled={loading}
          onPress={onLogin}>
          <Text style={{ color: 'white' }}>
            {loading ? 'Processing ...' : 'Login'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};
