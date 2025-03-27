import { renderHook } from '@testing-library/react-native';
import { useIsWorkzone } from '../../../../../common/hooks/useIsWorkzone';
import { useWorkzonePermission } from '../../../../../common/hooks/useWorkzonePermission';
import { useIsAbleToShowGroups } from '../useIsAbleToShowGroups';

jest.mock('../../../../../common/hooks/useIsWorkzone');
jest.mock('../../../../../common/hooks/useWorkzonePermission');

const mockUseIsWorkzone = useIsWorkzone as jest.MockedFn<typeof useIsWorkzone>;
const mockWorkzonePermission = useWorkzonePermission as jest.MockedFn<typeof useWorkzonePermission>;

describe('useIsAbleToShowGroups', () => {
  it('should not show groups for workzone benefits blacklisted', () => {
    mockUseIsWorkzone.mockReturnValue(true);
    mockWorkzonePermission.mockReturnValue({
      benefitsPermission: false,
      isFetched: true,
      isFetching: false,
      moneyPermission: true,
    });
    const { result } = renderHook(() => useIsAbleToShowGroups());

    expect(result.current).toBe(false);
  });

  it('should not show groups for workzone money blacklisted', () => {
    mockUseIsWorkzone.mockReturnValue(true);
    mockWorkzonePermission.mockReturnValue({
      benefitsPermission: true,
      isFetched: true,
      isFetching: false,
      moneyPermission: false,
    });
    const { result } = renderHook(() => useIsAbleToShowGroups());

    expect(result.current).toBe(false);
  });

  it('should not show groups for workzone blacklisted', () => {
    mockUseIsWorkzone.mockReturnValue(true);
    mockWorkzonePermission.mockReturnValue({
      benefitsPermission: false,
      isFetched: true,
      isFetching: false,
      moneyPermission: false,
    });
    const { result } = renderHook(() => useIsAbleToShowGroups());

    expect(result.current).toBe(false);
  });
});
