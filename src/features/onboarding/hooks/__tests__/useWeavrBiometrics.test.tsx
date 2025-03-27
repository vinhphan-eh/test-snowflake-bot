import messaging from '@react-native-firebase/messaging';
import {
  checkDeviceIsEnrolled,
  checkIsReadyForEnrollment,
  startEnrollment,
} from '@weavr-io/secure-components-react-native';
import { mockGetToken, mockHasPermission } from '../../../../../__mocks__/@react-native-firebase/messaging';
import { mockUseIsAccountUK } from '../../../../common/hooks/__mocks__/useIsAccountUK';
import { renderHook } from '../../../../common/utils/testing';
import { mockServerNode } from '../../../../mock-server/mockServerNode';
import { mockGetUkTokenQuery } from '../../../../new-graphql/generated';
import { useWeavrBiometrics } from '../useWeavrBiometrics';

jest.mock('@react-native-firebase/messaging');
jest.mock('@weavr-io/secure-components-react-native');

const mockWeavrUserToken = (userToken: string) => {
  mockServerNode.use(
    mockGetUkTokenQuery((_, res, ctx) => res(ctx.data({ me: { wallet: { UKToken: { userToken } } } })))
  );
};

describe('useWeavrBiometrics', () => {
  beforeEach(() => {
    mockUseIsAccountUK.mockReturnValue(true);
  });

  it('automatically fetchs the Weavr user token if needed', async () => {
    mockWeavrUserToken('userToken');
    const result = renderHook(() => useWeavrBiometrics());
    expect(await result.result.current.getUKToken()).toBe('userToken');
  });
});

describe('useWeavrBiometrics weavrBeginEnrollment', () => {
  beforeEach(() => {
    mockUseIsAccountUK.mockReturnValue(true);
  });

  it('raises error if weavrUserToken is empty', () => {
    mockWeavrUserToken('');
    const result = renderHook(() => useWeavrBiometrics());
    expect(result.result.current.weavrBeginEnrollment('')).rejects.toThrow('Weavr token is required');
  });

  it('calls SDK startEnrollment if all good', async () => {
    mockWeavrUserToken('userToken');
    mockHasPermission(messaging.AuthorizationStatus.AUTHORIZED);
    mockGetToken('fcmToken');
    (checkIsReadyForEnrollment as jest.Mock).mockResolvedValue(true);
    const result = renderHook(() => useWeavrBiometrics());
    expect(await result.result.current.getUKToken()).toBe('userToken');
    await result.result.current.weavrBeginEnrollment('userToken');

    expect(startEnrollment).toHaveBeenLastCalledWith('fcmToken', 'userToken');
  });

  describe('useWeavrBiometrics checkpointDeviceEnrolled', () => {
    it.each([true, false])(
      'should return appropriately check for device enrollment',
      async (deviceEnrolled: boolean) => {
        mockWeavrUserToken('userToken');

        (checkDeviceIsEnrolled as jest.Mock).mockResolvedValue({
          result: {
            isEnrolled: deviceEnrolled,
          },
        });
        const result = renderHook(() => useWeavrBiometrics());
        expect(await result.result.current.getUKToken()).toBe('userToken');
        const resultCheckDeviceEnrolled = await result.result.current.checkpointDeviceEnrolled();

        expect(resultCheckDeviceEnrolled).toBe(deviceEnrolled);
      }
    );
  });

  describe('useWeavrBiometrics weavrInitiateBiometric', () => {
    it('should return true if initiateBiometric function resolves true', async () => {
      mockWeavrUserToken('userToken');
      const mockInitiateBiometric = jest.fn().mockResolvedValue(true);
      const { result } = renderHook(() => useWeavrBiometrics());
      result.current.weavrInitiateBiometric = mockInitiateBiometric;

      const resultInitiateBiometric = await result.current.weavrInitiateBiometric();

      expect(resultInitiateBiometric).toBe(true);
      expect(mockInitiateBiometric).toHaveBeenCalled();
    });
  });
});
