import { checkDeviceIsEnrolled } from '@weavr-io/secure-components-react-native';
import type { WeavrError } from '@weavr-io/secure-components-react-native/lib/typescript/types/WeavrError';
import { renderHook, waitFor } from '../../utils/testing';
import { mockUseCheckUKPermissionWithLoadingState } from '../__mocks__/useCheckUKPermission';
import { useCheckUkDeviceEnrollment } from '../useCheckUkDeviceEnrollment';

jest.mock('@weavr-io/secure-components-react-native');

describe('useCheckUkDeviceEnrolment', () => {
  it('should return UNKNOWN if UK permission is not granted', async () => {
    const mockCheckDeviceIsEnrolled = checkDeviceIsEnrolled as jest.MockedFunction<typeof checkDeviceIsEnrolled>;
    mockUseCheckUKPermissionWithLoadingState.mockReturnValue({ hasPermission: false, isLoading: false });

    mockCheckDeviceIsEnrolled.mockResolvedValue({ error: undefined, result: { isEnrolled: true } });

    const { result } = renderHook(() => useCheckUkDeviceEnrollment({ enabled: true }));

    await waitFor(async () => expect(result.current.data).toBe('UNKNOWN'));
  });

  it('should return UNKNOWN if UK permission is granted but checkDeviceIsEnrolled returns error', async () => {
    const mockCheckDeviceIsEnrolled = checkDeviceIsEnrolled as jest.MockedFunction<typeof checkDeviceIsEnrolled>;
    mockUseCheckUKPermissionWithLoadingState.mockReturnValue({ hasPermission: true, isLoading: false });

    mockCheckDeviceIsEnrolled.mockResolvedValue({
      error: { message: 'error' } as WeavrError,
      result: { isEnrolled: true },
    });

    const { result } = renderHook(() => useCheckUkDeviceEnrollment({ enabled: true }));

    await waitFor(async () => expect(result.current.data).toBe('UNKNOWN'));
  });
});
