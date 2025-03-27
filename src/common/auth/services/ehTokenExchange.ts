import { Identity } from '@ehrocks/react-native-superapp-communication';
import { clearEbenToken } from './ebenToken';
import AppState from '../../app/AppState';
import { useAppStore } from '../../app/useAppStore';
import { clearBrazeStore } from '../../braze/stores/useBrazeStore';
import { queryClient } from '../../libs/queryClient';
import { LocalStorage } from '../../libs/storage/localStorage';
import { clearSuperAppTokenStore } from '../store/useSuperAppTokenStore';

/**
 * Delete all storage data of Personal app
 */
const clearAllStorages = () => {
  clearSuperAppTokenStore();
  clearBrazeStore();
  LocalStorage.deleteAll();
  clearEbenToken();
  queryClient.clear();
};

const onAppLogin = () => {
  AppState.isLoggedOut = false;
  useAppStore.setState({
    currentAuthEffect: 'logIn',
  });
};

const onAppLogout = () => {
  AppState.isLoggedOut = true;
  clearAllStorages();
  setTimeout(() => {
    // isLoggedOut is set to false when receiving login event from super app
    // when login -> logout -> login again, hook like: useUnlinkUkDeviceEnrollment in useAuthStateListener, always there before login event, so it is triggered sooner and failed because isLoggedOut is still true
    // this is a hacky safe cover to advoid that
    AppState.isLoggedOut = false;
  }, 500);
  useAppStore.setState({
    currentAuthEffect: 'logOut',
  });
};

const onSwitchAccount = () => {
  clearAllStorages();
  useAppStore.setState({
    currentAuthEffect: 'switchAccount',
  });
};

const onTokenChange = () => {
  useAppStore.setState({
    currentAuthEffect: 'tokenChange',
  });
};

const onVerifyCurrentOrg = () => {
  clearAllStorages();
};

const listenEventFromCoreApp = () => {
  Identity.addLoginListener(onAppLogin);
  Identity.addLogoutListener(onAppLogout);
  Identity.addSwitchAccountListener(onSwitchAccount);
  Identity.addTokenChangedListener(onTokenChange);
  Identity.addVerifyCurrentOrgListener(onVerifyCurrentOrg);
};

listenEventFromCoreApp();
