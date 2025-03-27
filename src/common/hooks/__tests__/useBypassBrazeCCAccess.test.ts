import { usePermissionStore } from '../../stores/usePermissionStore';
import { renderHook } from '../../utils/testing';
import { mockUseEbfCountry } from '../__mocks__/useEbfCountry';
import { useBypassBrazeCCAccess } from '../useBypassBrazeCCAccess';

describe('useBypassBrazeCCAccess', () => {
  it('returns false when ehCountryCode is undefined', () => {
    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      ebenBrazeAtSwagDBForSea: { view: true },
      ebenBrazeAtSwagDBForNz: { view: true },
    } as never;

    mockUseEbfCountry.mockReturnValue({
      ehCountryCode: undefined,
      isFetched: true,
      isLoadingEhCountry: false,
      workzoneCountryCode: '',
    });

    const { result } = renderHook(() => useBypassBrazeCCAccess());
    expect(result.current.shouldShowBrazeCC).toBe(false);
  });

  it.each`
    ehCountryCode | seaPermission | nzPermission | expected
    ${'SG'}       | ${true}       | ${true}      | ${true}
    ${'SG'}       | ${true}       | ${false}     | ${true}
    ${'SG'}       | ${false}      | ${true}      | ${false}
    ${'SG'}       | ${false}      | ${false}     | ${false}
    ${'SGP'}      | ${true}       | ${true}      | ${true}
    ${'SGP'}      | ${true}       | ${false}     | ${true}
    ${'SGP'}      | ${false}      | ${true}      | ${false}
    ${'SGP'}      | ${false}      | ${false}     | ${false}
    ${'NZ'}       | ${true}       | ${true}      | ${true}
    ${'NZ'}       | ${true}       | ${false}     | ${false}
    ${'NZ'}       | ${false}      | ${true}      | ${true}
    ${'NZ'}       | ${false}      | ${false}     | ${false}
    ${'NZL'}      | ${true}       | ${true}      | ${true}
    ${'NZL'}      | ${true}       | ${false}     | ${false}
    ${'NZL'}      | ${false}      | ${true}      | ${true}
    ${'NZL'}      | ${false}      | ${false}     | ${false}
    ${'AU'}       | ${true}       | ${true}      | ${false}
  `(
    'should return $expected when country is $ehCountryCode and seaPermission is $seaPermission and nzPermission is $nzPermission',
    ({ ehCountryCode, expected, nzPermission, seaPermission }) => {
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        ebenBrazeAtSwagDBForSea: { view: seaPermission },
        ebenBrazeAtSwagDBForNz: { view: nzPermission },
      } as never;

      mockUseEbfCountry.mockReturnValue({
        ehCountryCode,
        isFetched: true,
        isLoadingEhCountry: false,
        workzoneCountryCode: '',
      });

      const { result } = renderHook(() => useBypassBrazeCCAccess());
      expect(result.current.shouldShowBrazeCC).toBe(expected);
    }
  );
});
