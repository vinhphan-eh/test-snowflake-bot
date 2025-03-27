import { useIsCountrySupportedBenefits } from '../../../../../common/hooks/useIsCountrySupported';
import { useIsOmopAccountUK } from '../../../../../common/hooks/useIsOmopAccountUK';
import { useIsWorkzone } from '../../../../../common/hooks/useIsWorkzone';
import { useWorkzonePermission } from '../../../../../common/hooks/useWorkzonePermission';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { renderHook } from '../../../../../common/utils/testing';
import { useBenefitsPillarAccessForOmop, useBenefitsPillarAccessLegacy } from '../useBenefitsPillarAccess';

const mockUseWorkzonePermission = useWorkzonePermission as jest.MockedFn<typeof useWorkzonePermission>;
const mockUseIsWorkzone = useIsWorkzone as jest.MockedFn<typeof useIsWorkzone>;
const mockUseIsCountrySupported = useIsCountrySupportedBenefits as jest.MockedFn<typeof useIsCountrySupportedBenefits>;
const mockUseIsOmopAccountUK = useIsOmopAccountUK as jest.MockedFn<typeof useIsOmopAccountUK>;

jest.mock('../../../../../common/hooks/useWorkzonePermission');
jest.mock('../../../../../common/hooks/useIsWorkzone');
jest.mock('../../../../../common/hooks/useIsCountrySupported');
jest.mock('../../../../../common/hooks/useIsOmopAccountUK');

describe('useBenefitsPillarAccessLegacy', () => {
  it.each`
    pillarPermission | pillarBlackListed | internationalRefused | isWorkzone | workzonePermission | isCountrySupported | expected
    ${true}          | ${false}          | ${false}             | ${false}   | ${false}           | ${true}            | ${true}
    ${true}          | ${true}           | ${false}             | ${false}   | ${false}           | ${true}            | ${false}
    ${false}         | ${false}          | ${false}             | ${false}   | ${false}           | ${true}            | ${false}
    ${false}         | ${true}           | ${false}             | ${false}   | ${false}           | ${true}            | ${false}
    ${true}          | ${false}          | ${false}             | ${true}    | ${false}           | ${true}            | ${false}
    ${true}          | ${false}          | ${false}             | ${true}    | ${true}            | ${true}            | ${true}
    ${true}          | ${false}          | ${false}             | ${false}   | ${false}           | ${false}           | ${false}
    ${true}          | ${false}          | ${false}             | ${true}    | ${true}            | ${false}           | ${false}
    ${true}          | ${false}          | ${true}              | ${false}   | ${false}           | ${true}            | ${false}
    ${true}          | ${true}           | ${true}              | ${false}   | ${false}           | ${true}            | ${false}
    ${false}         | ${false}          | ${true}              | ${false}   | ${false}           | ${true}            | ${false}
    ${false}         | ${true}           | ${true}              | ${false}   | ${false}           | ${true}            | ${false}
    ${true}          | ${false}          | ${true}              | ${true}    | ${false}           | ${true}            | ${false}
    ${true}          | ${false}          | ${true}              | ${true}    | ${true}            | ${true}            | ${true}
    ${true}          | ${false}          | ${true}              | ${false}   | ${false}           | ${false}           | ${false}
    ${true}          | ${false}          | ${true}              | ${true}    | ${true}            | ${false}           | ${false}
  `(
    'should work correctly',
    ({
      expected,
      internationalRefused,
      isCountrySupported,
      isWorkzone,
      pillarBlackListed,
      pillarPermission,
      workzonePermission,
    }) => {
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        pillar_benefits: {
          view: pillarPermission,
        },
        eben_benefits_pillar_black_list: {
          view: pillarBlackListed,
        },
        internationalBenefitsRefused: {
          view: internationalRefused,
        },
      } as never;

      mockUseIsCountrySupported.mockReturnValue({
        isCountrySupported,
        isLoading: false,
        isFetched: true,
      });

      mockUseIsWorkzone.mockReturnValue(isWorkzone);
      mockUseWorkzonePermission.mockReturnValue({
        benefitsPermission: workzonePermission,
        isFetching: false,
        moneyPermission: false,
        isFetched: true,
      });

      const hook = renderHook(() => useBenefitsPillarAccessLegacy());

      expect(hook.result.current.isAccessible).toBe(expected);
    }
  );
});

describe('useBenefitsPillarAccessForOmop', () => {
  it.each`
    isOmopAccountUK | pillarBenefitsPermission | expected
    ${true}         | ${true}                  | ${true}
    ${true}         | ${false}                 | ${false}
    ${false}        | ${true}                  | ${false}
    ${false}        | ${false}                 | ${false}
  `('should work correctly', ({ expected, isOmopAccountUK, pillarBenefitsPermission }) => {
    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      pillar_benefits: {
        view: pillarBenefitsPermission,
      },
    } as never;
    mockUseIsOmopAccountUK.mockReturnValue({
      isOmopAccountUK,
      isFetched: true,
      isLoading: false,
    });

    const hook = renderHook(() => useBenefitsPillarAccessForOmop());
    expect(hook.result.current.isAccessible).toBe(expected);
  });
});
