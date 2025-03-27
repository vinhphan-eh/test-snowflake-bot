import React from 'react';
import { Identity } from '@ehrocks/react-native-superapp-communication';
import { render } from '@testing-library/react-native';
import * as ebenToken from '../../auth/services/ebenToken';

// register listeners
import '../../auth/services/ehTokenExchange';

import { setEbenTokenStatus } from '../../auth/store/ebenTokenStore';
import { useUnlinkUkDeviceEnrollment } from '../../hooks/useUnlinkUkDeviceEnrollment';
import { waitFor } from '../../utils/testing';
import { clearAuthState } from '../useAppStore';
import { useAuthStateListener } from '../useAuthStateListener';

const TestApp = () => {
  useAuthStateListener();
  return null;
};

jest.mock('../../auth/store/ebenTokenStore', () => ({
  setEbenTokenStatus: jest.fn(),
}));

jest.mock('../useAppStore', () => ({
  ...jest.requireActual('../useAppStore'),
  clearAuthState: jest.fn(),
}));

jest.mock('../../hooks/useUnlinkUkDeviceEnrollment', () => ({
  useUnlinkUkDeviceEnrollment: jest.fn(),
}));

describe('useAuthStateListener', () => {
  beforeEach(() => {
    jest.spyOn(ebenToken, 'clearEbenToken');
    (useUnlinkUkDeviceEnrollment as jest.Mock).mockReturnValue({
      resetClearedUkDeviceLocalStorage: jest.fn(),
    });
  });

  describe('login effect', () => {
    beforeEach(() => {
      Identity.dispatchLoginEvent('fake-token2');
    });
    it('should force init eben token and clear auth state after triggered', () => {
      render(<TestApp />);
      expect(ebenToken.clearEbenToken).toBeCalledTimes(1);
      expect(clearAuthState).toBeCalledTimes(1);
    });

    it('should reset eben token status', () => {
      render(<TestApp />);
      expect(setEbenTokenStatus).toBeCalledWith('can_exchange');
    });

    it('should clear uk device enrolled status in localStorage', () => {
      const mockResetClearedUkDeviceLocalStorage = jest.fn();
      (useUnlinkUkDeviceEnrollment as jest.Mock).mockReturnValue({
        resetClearedUkDeviceLocalStorage: mockResetClearedUkDeviceLocalStorage,
      });

      render(<TestApp />);
      expect(mockResetClearedUkDeviceLocalStorage).toBeCalledTimes(1);
    });
  });

  describe('token change event', () => {
    beforeEach(() => {
      Identity.dispatchTokenChangedEvent('fake-token2');
    });
    it('should force init eben token and clear auth state after triggered', () => {
      render(<TestApp />);

      expect(ebenToken.clearEbenToken).toBeCalledTimes(1);
      expect(clearAuthState).toBeCalledTimes(1);
    });
  });

  describe('logout effect', () => {
    beforeEach(() => {
      Identity.dispatchLogoutEvent({});
    });

    it('should clear auth state after triggered', async () => {
      render(<TestApp />);

      await waitFor(() => {
        expect(clearAuthState).toBeCalledTimes(1);
      });
    });
  });

  describe('switch account effect', () => {
    beforeEach(() => {
      Identity.dispatchSwitchAccountEvent({
        userId: 'fake-user-id',
        token: 'fake-token',
        loginProvider: 'fake-login-provider',
      });
    });

    it('should clear auth state after triggered', () => {
      render(<TestApp />);
      expect(clearAuthState).toBeCalledTimes(1);
    });
  });
});
