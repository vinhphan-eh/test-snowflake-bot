import { Identity } from '@ehrocks/react-native-superapp-communication';
import { useAppStore } from '../../app/useAppStore';
import { queryClient } from '../../libs/queryClient';
import { LocalStorage } from '../../libs/storage/localStorage';
import { mockClearSuperAppTokenStore } from '../store/__mocks__/useSuperAppTokenStore';
import './ehTokenExchange';

jest.mock('../../app/useAppStore', () => ({
  useAppStore: { setState: jest.fn() },
}));

describe('ehTokenExchange', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(LocalStorage, 'deleteAll');
    jest.spyOn(queryClient, 'clear');
  });

  describe('eh token change event', () => {
    beforeEach(() => {
      Identity.dispatchTokenChangedEvent('fake-token1');
    });

    it('should set correct app event', () => {
      expect(useAppStore.setState).toBeCalledWith({
        currentAuthEffect: 'tokenChange',
      });
    });
  });

  describe('login event', () => {
    beforeEach(() => {
      Identity.dispatchLoginEvent('fake-token2');
    });

    it('should set correct app event', () => {
      expect(useAppStore.setState).toBeCalledWith({
        currentAuthEffect: 'logIn',
      });
    });
  });

  describe('logout event', () => {
    beforeEach(() => {
      Identity.dispatchLogoutEvent({});
    });

    it('should set correct app event', () => {
      expect(useAppStore.setState).toBeCalledWith({
        currentAuthEffect: 'logOut',
      });
    });

    it('should clear data correctly', () => {
      expect(LocalStorage.deleteAll).toBeCalledTimes(1);
      expect(queryClient.clear).toBeCalled();
      expect(mockClearSuperAppTokenStore).toBeCalled();
    });
  });

  describe('switch account event', () => {
    beforeEach(() => {
      Identity.dispatchSwitchAccountEvent({
        userId: 'fake-user-id',
        token: 'fake-token',
        loginProvider: 'fake-login-provider',
      });
    });

    it('should set correct app event', () => {
      expect(useAppStore.setState).toBeCalledWith({
        currentAuthEffect: 'switchAccount',
      });
    });

    it('should clear data correctly', () => {
      expect(LocalStorage.deleteAll).toBeCalledTimes(1);
      expect(queryClient.clear).toBeCalled();
      expect(mockClearSuperAppTokenStore).toBeCalled();
    });
  });

  describe('verify current org event', () => {
    beforeEach(() => {
      Identity.dispatchVerifyCurrentOrgEvent();
    });

    it('should clear data correctly', () => {
      expect(LocalStorage.deleteAll).toBeCalledTimes(1);
      expect(queryClient.clear).toBeCalled();
      expect(mockClearSuperAppTokenStore).toBeCalled();
    });
  });
});
