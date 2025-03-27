/* eslint-disable import/first */
const mockUseIsWorkzone = jest.fn();

import { usePermissionStore, type PermissionData } from '../../stores/usePermissionStore';
import { act, renderHook } from '../../utils/testing';
import { mockUseIsAccountAU } from '../__mocks__/useIsAccountAU';
import { mockUseIsAccountUK } from '../__mocks__/useIsAccountUK';
import { useHeroPointsVisibility } from '../useHeroPointsVisibility';

jest.mock('../useIsWorkzone', () => ({
  useIsWorkzone: mockUseIsWorkzone,
}));

describe('useHeroPointsVisibility', () => {
  beforeEach(() => {
    mockUseIsWorkzone.mockReturnValue(false);
    mockUseIsAccountAU.mockReturnValue(true);
    mockUseIsAccountUK.mockReturnValue(false);

    act(() => {
      const mockPermissions: PermissionData = {
        heroPoints: { view: true },
      } as PermissionData;
      usePermissionStore.setState({ permissions: mockPermissions });
    });
  });

  it('should return true when all conditions are met', () => {
    const { result } = renderHook(() => useHeroPointsVisibility());
    expect(result.current).toBe(true);
  });

  it('should return false when is not AU user', () => {
    mockUseIsAccountAU.mockReturnValueOnce(false);
    const { result } = renderHook(() => useHeroPointsVisibility());
    expect(result.current).toBe(false);
  });

  it('should return false when isWorkzoneUser is true', () => {
    mockUseIsWorkzone.mockReturnValueOnce(true);
    const { result } = renderHook(() => useHeroPointsVisibility());
    expect(result.current).toBe(false);
  });

  it('should return true when user is from UK', () => {
    mockUseIsAccountAU.mockReturnValueOnce(false);
    mockUseIsAccountUK.mockReturnValueOnce(true);
    mockUseIsWorkzone.mockReturnValueOnce(false);
    const { result } = renderHook(() => useHeroPointsVisibility());
    expect(result.current).toBe(true);
  });

  it('should return false when user is not from AU or UK', () => {
    mockUseIsAccountAU.mockReturnValueOnce(false);
    mockUseIsAccountUK.mockReturnValueOnce(false);
    mockUseIsWorkzone.mockReturnValueOnce(false);
    const { result } = renderHook(() => useHeroPointsVisibility());
    expect(result.current).toBe(false);
  });

  it('should return false when heroPointsPermission is false', () => {
    act(() => {
      const mockPermissions: PermissionData = {
        heroPoints: { view: false },
      } as PermissionData;
      usePermissionStore.setState({ permissions: mockPermissions });
    });

    const { result } = renderHook(() => useHeroPointsVisibility());
    expect(result.current).toBe(false);
  });
});
