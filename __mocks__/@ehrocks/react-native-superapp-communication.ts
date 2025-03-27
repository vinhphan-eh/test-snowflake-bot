/**
 * Mock this library because it cannot run with our jest config
 */
import EventEmitter from 'events';

const EhTokenEventEmitter = new EventEmitter();

enum EventFromApp {
  AppLogin = 'login',
  AppLogout = 'logout',
  TokenChange = 'tokenChange',
  SwitchAccount = 'switchAccount',
  VerifyCurrentOrg = 'verifyCurrentOrg',
}

const Identity = {
  addLoginListener: (onAppLogin: (token: string) => void) => {
    EhTokenEventEmitter.addListener(EventFromApp.AppLogin, onAppLogin);
  },
  addLogoutListener: (onAppLogout: () => void) => {
    EhTokenEventEmitter.addListener(EventFromApp.AppLogout, onAppLogout);
  },
  addTokenChangedListener: (onTokenChange: (token: string) => void) => {
    EhTokenEventEmitter.addListener(EventFromApp.TokenChange, onTokenChange);
  },
  addSwitchAccountListener: (
    onSwitchAccount: (payload: { userId: string; loginProvider: string; token: string }) => void
  ) => {
    EhTokenEventEmitter.addListener(EventFromApp.SwitchAccount, onSwitchAccount);
  },
  addVerifyCurrentOrgListener: (onVerifyCurrentOrg: () => void) => {
    EhTokenEventEmitter.addListener(EventFromApp.VerifyCurrentOrg, onVerifyCurrentOrg);
  },
  dispatchLoginEvent: (token: string) => {
    EhTokenEventEmitter.emit(EventFromApp.AppLogin, token);
  },
  dispatchLogoutEvent: (payload: {}) => {
    EhTokenEventEmitter.emit(EventFromApp.AppLogout, payload);
  },
  dispatchTokenChangedEvent: (token: string) => {
    EhTokenEventEmitter.emit(EventFromApp.TokenChange, token);
  },
  dispatchSwitchAccountEvent: (payload: { userId: string; loginProvider: string; token: string }) => {
    EhTokenEventEmitter.emit(EventFromApp.SwitchAccount, payload);
  },
  dispatchVerifyCurrentOrgEvent: () => {
    EhTokenEventEmitter.emit(EventFromApp.VerifyCurrentOrg);
  },
};

const NotificationEvent = {
  addOpenNotificationListener: jest.fn(),
};

const DeepLinkEvent = {
  addOpenDeepLinkListener: jest.fn(),
};

export { Identity, NotificationEvent, DeepLinkEvent };
