const actualMessaging = jest.requireActual('@react-native-firebase/messaging');

const hasPermission = jest.fn();
const getToken = jest.fn();

const messaging = () => ({
  hasPermission,
  requestPermission: jest.fn(),
  getToken,
});
messaging.AuthorizationStatus = actualMessaging.default.AuthorizationStatus;
export default messaging;

export const mockHasPermission = (status: typeof actualMessaging.default.AuthorizationStatus) => {
  hasPermission.mockResolvedValue(status);
};

export const mockGetToken = (newToken: string) => {
  getToken.mockResolvedValue(newToken);
};
