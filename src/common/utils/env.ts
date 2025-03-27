import Config from 'react-native-config';
import { useSessionStore } from '../stores/useSessionStore';

export const getEnvConfig = () => {
  return useSessionStore?.getState()?.getEnvConfig?.() || Config;
};
