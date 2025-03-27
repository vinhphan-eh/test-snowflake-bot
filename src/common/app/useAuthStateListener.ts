import { useEffect } from 'react';
import { clearAuthState, useAppStore } from './useAppStore';
import { clearEbenToken } from '../auth/services/ebenToken';
import { setEbenTokenStatus } from '../auth/store/ebenTokenStore';
import { useUnlinkUkDeviceEnrollment } from '../hooks/useUnlinkUkDeviceEnrollment';

/**
 * This hook is used to handle app events effect
 * because listenEventFromCoreApp() is not working for side effects & hooks
 */
export const useAuthStateListener = () => {
  /**
   * IMPORTANT:
   * Any hook depends on token, like useQuery, that placed in this hook
   * only enable it when eben token(useIsEbenTokenValidForQuery) & super app token are ready
   * because this hook is mounted very early, before any token exists => cause error
   * and please do integration test with super app
   */
  const currentAuthEffect = useAppStore(state => state.currentAuthEffect);
  const { resetClearedUkDeviceLocalStorage } = useUnlinkUkDeviceEnrollment();

  const onLogOutEffect = () => {};

  const onLogInEffect = () => {
    // some queries depend on eben token status to enable/disable
    setEbenTokenStatus('can_exchange');
    clearEbenToken();
    resetClearedUkDeviceLocalStorage();
  };

  const onSwitchAccountEffect = () => {};

  const onTokenChangeEffect = () => {
    clearEbenToken();
  };

  const triggerSideEffects = {
    logOut: onLogOutEffect,
    logIn: onLogInEffect,
    switchAccount: onSwitchAccountEffect,
    tokenChange: onTokenChangeEffect,
  };

  useEffect(() => {
    if (currentAuthEffect) {
      triggerSideEffects[currentAuthEffect]();
      clearAuthState();
    }
  }, [currentAuthEffect]);
};
