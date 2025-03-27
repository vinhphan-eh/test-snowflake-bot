import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Platform, ToastAndroid } from 'react-native';
import Config from 'react-native-config';

export type LoginServer = {
  url: string;
  isEh: boolean;
  isUk?: boolean;
};

export type UserInfo = {
  username: string;
  password: string;
  loginServer: LoginServer;
  deeplink?: string;
};

export const loginServers = ({
  ehAuth,
  kpAuth,
  env,
}: {
  ehAuth?: string;
  kpAuth?: string;
  env?: string;
}): LoginServer[] => [
  {
    url: ehAuth || 'https://mobile.staging.ehrocks.com',
    isEh: true,
  },
  ...(env === 'production'
    ? [
        {
          url: kpAuth || '',
          isEh: false,
        },
      ]
    : [
        {
          url: 'https://test16.keypay.dev',
          isEh: false,
          isUk: true,
        },
        {
          url: 'https://test19.keypay.dev',
          isEh: false,
        },
        {
          url: 'https://test20.keypay.dev',
          isEh: false,
        },
        {
          url: 'https://staging.keypay.dev',
          isEh: false,
        },
      ]),
];

const UserInfoStoreKey = 'temp_user_info';
const IsRememberInfoStoreKey = 'temp_is_remember';

export const getIsRememberInfo = async (): Promise<boolean> => {
  const isRememberInfoStr = await AsyncStorage.getItem(IsRememberInfoStoreKey);
  if (!isRememberInfoStr) {
    return false;
  }
  return JSON.parse(isRememberInfoStr);
};
export const getUserInfo = async (): Promise<UserInfo> => {
  const firstLoginServer = loginServers({
    ehAuth: Config.EH_AUTH_API_URL,
    kpAuth: Config.WORKZONE_HOST,
    env: Config.ENV,
  })[0];
  const userInfoStr = await AsyncStorage.getItem(UserInfoStoreKey);

  if (!userInfoStr) {
    return {
      username: '',
      password: '',
      loginServer: firstLoginServer,
    };
  }
  const rv = JSON.parse(userInfoStr);
  return {
    username: rv.username,
    password: rv.password,
    loginServer: firstLoginServer,
  };
};

export const saveUserInfo = async (userInfo: UserInfo) => {
  await AsyncStorage.setItem(UserInfoStoreKey, JSON.stringify(userInfo));
};

export const saveIsRememberInfo = async (isRemember: boolean) => {
  await AsyncStorage.setItem(
    IsRememberInfoStoreKey,
    JSON.stringify(isRemember),
  );
};

export const clearUserInfo = async () => {
  await AsyncStorage.removeItem(UserInfoStoreKey);
};

export function notifyMessage(msg: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert(msg);
  }
}

export interface TwoFactorAuthInfo {
  twofa_required: boolean;
  twofa_token: string;
  twofa_providers: string[]; // Assuming all providers are strings
  phone_number: string;
  email: string;
}

export interface Token {
  access_token: string;
}

// Type guard for TwoFactorAuthInfo
export function isTwoFactorAuthInfo(obj: unknown): obj is TwoFactorAuthInfo {
  const safeObj = obj as TwoFactorAuthInfo; // Cast to use for property checking
  return (
    safeObj &&
    typeof safeObj.twofa_required === 'boolean' &&
    typeof safeObj.twofa_token === 'string' &&
    Array.isArray(safeObj.twofa_providers) &&
    safeObj.twofa_providers.every((p: unknown) => typeof p === 'string')
  );
}

// Type guard for Token
export function isToken(obj: unknown): obj is Token {
  const safeObj = obj as Token; // Cast to use for property checking
  return safeObj && typeof safeObj.access_token === 'string';
}
