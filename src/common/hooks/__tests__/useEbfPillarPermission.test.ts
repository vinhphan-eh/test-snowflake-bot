/* eslint-disable import/first */
const mockLocalStorageGetItem = jest.fn();
const mockLocalStorageSetItem = jest.fn();

import { useBenefitsPillarAccess } from '../../../features/benefits/common/hooks/useBenefitsPillarAccess';
import { mockUseHasActiveBillSubscription } from '../../../features/bill-management/hooks/__mocks__/useHasActiveBillSubscription';
import { usePermissionStore } from '../../stores/usePermissionStore';
import { renderHook } from '../../utils/testing';
import { mockUseHasPurchaseHistory } from '../__mocks__/useHasPurchaseHistory';
import { useCheckEmptyProviderWhileUsingApp } from '../useCheckEmptyProviderWhileUsingApp';
import {
  useBenefitsPillarPermission,
  useEbfPillarPermission,
  useMoneyPillarPermission,
} from '../useEbfPillarPermission';
import { useIsCountrySupported } from '../useIsCountrySupported';
import { useIsWalletSetupComplete } from '../useIsWalletSetupComplete';
import { useIsWorkzone } from '../useIsWorkzone';
import { useWorkzonePermission } from '../useWorkzonePermission';

const mockUseBenefitsPillarAccess = useBenefitsPillarAccess as jest.MockedFn<typeof useBenefitsPillarAccess>;
const mockUseIsWalletSetupComplete = useIsWalletSetupComplete as jest.MockedFn<typeof useIsWalletSetupComplete>;
const mockUseIsWorkzone = useIsWorkzone as jest.MockedFn<typeof useIsWorkzone>;
const mockUseIsCountrySupported = useIsCountrySupported as jest.MockedFn<typeof useIsCountrySupported>;
const mockUseWorkzonePermission = useWorkzonePermission as jest.MockedFn<typeof useWorkzonePermission>;
const mockUseCheckEmptyProviderWhileUsingApp = useCheckEmptyProviderWhileUsingApp as jest.MockedFn<
  typeof useCheckEmptyProviderWhileUsingApp
>;

jest.mock('../../../features/benefits/common/hooks/useBenefitsPillarAccess');
jest.mock('../useIsWalletSetupComplete');
jest.mock('../useIsWorkzone');
jest.mock('../useIsCountrySupported');
jest.mock('../useWorkzonePermission');
jest.mock('../useCheckEmptyProviderWhileUsingApp');
jest.mock('../../libs/storage/localStorage', () => ({
  ...jest.requireActual('../../libs/storage/localStorage'),
  LocalStorage: {
    setItem: mockLocalStorageSetItem,
    getItem: mockLocalStorageGetItem,
  },
}));

describe('useMoneyPillarPermission', () => {
  it.each`
    isFetchedActiveBill | isFetchedCountry | isFetchWalletSetup | isFetchedWorkzone | expected
    ${true}             | ${true}          | ${false}           | ${false}          | ${false}
    ${true}             | ${true}          | ${true}            | ${false}          | ${true}
    ${true}             | ${true}          | ${true}            | ${true}           | ${true}
    ${true}             | ${false}         | ${false}           | ${false}          | ${false}
    ${true}             | ${false}         | ${true}            | ${false}          | ${false}
    ${true}             | ${false}         | ${true}            | ${true}           | ${false}
    ${true}             | ${true}          | ${false}           | ${true}           | ${false}
    ${true}             | ${false}         | ${false}           | ${true}           | ${false}
    ${false}            | ${true}          | ${true}            | ${false}          | ${false}
  `(
    'should show fetch status correctly for EH user',
    ({ expected, isFetchedActiveBill, isFetchedCountry, isFetchedWorkzone, isFetchWalletSetup }) => {
      mockUseIsWorkzone.mockReturnValue(false);
      mockUseHasActiveBillSubscription.mockReturnValue({
        hasBillSubscription: false,
        isFetched: isFetchedActiveBill,
        isError: false,
      });
      mockUseIsWalletSetupComplete.mockReturnValue({
        isWalletSetupComplete: false,
        isLoading: false,
        isError: false,
        isFetched: isFetchWalletSetup,
      });
      mockUseIsCountrySupported.mockReturnValue({
        isCountrySupported: true,
        isLoading: false,
        isFetched: isFetchedCountry,
      });
      mockUseWorkzonePermission.mockReturnValue({
        moneyPermission: true,
        benefitsPermission: true,
        isFetching: false,
        isFetched: isFetchedWorkzone,
      });

      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        pillar_money: { view: true },
        eben_money_pillar_black_list: { view: false },
      } as never;

      const hook = renderHook(() => useMoneyPillarPermission());

      expect(hook.result.current.isFetched).toBe(expected);
    }
  );

  it.each`
    isFetchedActiveBill | isFetchedCountry | isFetchWalletSetup | isFetchedWorkzone | expected
    ${true}             | ${true}          | ${false}           | ${false}          | ${false}
    ${true}             | ${true}          | ${true}            | ${false}          | ${false}
    ${true}             | ${true}          | ${true}            | ${true}           | ${true}
    ${true}             | ${false}         | ${false}           | ${false}          | ${false}
    ${true}             | ${false}         | ${true}            | ${false}          | ${false}
    ${true}             | ${false}         | ${true}            | ${true}           | ${true}
    ${true}             | ${true}          | ${false}           | ${true}           | ${false}
    ${true}             | ${false}         | ${false}           | ${true}           | ${false}
    ${false}            | ${false}         | ${false}           | ${true}           | ${false}
  `(
    'should show fetch status correctly for workzone user',
    ({ expected, isFetchedActiveBill, isFetchedCountry, isFetchedWorkzone, isFetchWalletSetup }) => {
      mockUseIsWorkzone.mockReturnValue(true);
      mockUseHasActiveBillSubscription.mockReturnValue({
        hasBillSubscription: false,
        isFetched: isFetchedActiveBill,
        isError: false,
      });
      mockUseIsWalletSetupComplete.mockReturnValue({
        isWalletSetupComplete: false,
        isLoading: false,
        isError: false,
        isFetched: isFetchWalletSetup,
      });
      mockUseIsCountrySupported.mockReturnValue({
        isCountrySupported: true,
        isLoading: false,
        isFetched: isFetchedCountry,
      });
      mockUseWorkzonePermission.mockReturnValue({
        moneyPermission: true,
        benefitsPermission: true,
        isFetching: false,
        isFetched: isFetchedWorkzone,
      });

      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        pillar_money: { view: true },
        eben_money_pillar_black_list: { view: false },
      } as never;

      const hook = renderHook(() => useMoneyPillarPermission());

      expect(hook.result.current.isFetched).toBe(expected);
    }
  );

  it.each`
    pillarMoney | isWorkzone | hasBillSubscription | haveWallet | isCountrySupported | isEhBlacklisted | workzonePermission | expected
    ${true}     | ${false}   | ${false}            | ${false}   | ${true}            | ${false}        | ${false}           | ${true}
    ${true}     | ${false}   | ${false}            | ${false}   | ${false}           | ${false}        | ${false}           | ${false}
    ${true}     | ${false}   | ${false}            | ${false}   | ${true}            | ${true}         | ${false}           | ${false}
    ${true}     | ${false}   | ${false}            | ${true}    | ${true}            | ${true}         | ${false}           | ${true}
    ${false}    | ${false}   | ${false}            | ${false}   | ${true}            | ${false}        | ${false}           | ${false}
    ${false}    | ${false}   | ${false}            | ${true}    | ${false}           | ${true}         | ${false}           | ${true}
    ${true}     | ${true}    | ${false}            | ${false}   | ${true}            | ${false}        | ${false}           | ${false}
    ${true}     | ${true}    | ${false}            | ${false}   | ${true}            | ${false}        | ${true}            | ${true}
    ${true}     | ${true}    | ${false}            | ${false}   | ${false}           | ${false}        | ${false}           | ${false}
    ${true}     | ${true}    | ${false}            | ${true}    | ${false}           | ${false}        | ${false}           | ${true}
    ${true}     | ${false}   | ${true}             | ${false}   | ${true}            | ${true}         | ${false}           | ${true}
    ${true}     | ${true}    | ${true}             | ${false}   | ${false}           | ${false}        | ${false}           | ${true}
    ${false}    | ${false}   | ${true}             | ${false}   | ${false}           | ${true}         | ${false}           | ${true}
  `(
    'should work correctly',
    ({
      expected,
      hasBillSubscription,
      haveWallet,
      isCountrySupported,
      isEhBlacklisted,
      isWorkzone,
      pillarMoney,
      workzonePermission,
    }) => {
      mockUseIsWorkzone.mockReturnValue(isWorkzone);
      mockUseHasActiveBillSubscription.mockReturnValue({ hasBillSubscription, isFetched: true, isError: false });

      mockUseIsWalletSetupComplete.mockReturnValue({
        isWalletSetupComplete: haveWallet,
        isLoading: false,
        isError: false,
        isFetched: true,
      });
      mockUseIsCountrySupported.mockReturnValue({
        isCountrySupported,
        isLoading: false,
        isFetched: true,
      });
      mockUseWorkzonePermission.mockReturnValue({
        moneyPermission: workzonePermission,
        benefitsPermission: true,
        isFetching: false,
        isFetched: true,
      });

      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        pillar_money: { view: pillarMoney },
        eben_money_pillar_black_list: { view: isEhBlacklisted },
      } as never;
      const hook = renderHook(() => useMoneyPillarPermission());

      expect(hook.result.current.permission).toBe(expected);
    }
  );
});

describe('useBenefitsPillarPermission', () => {
  it.each`
    hasPurchaseHistory | benefitsAccess | expected
    ${true}            | ${false}       | ${true}
    ${true}            | ${true}        | ${true}
    ${false}           | ${false}       | ${false}
    ${false}           | ${true}        | ${true}
  `('should return correct permission', ({ benefitsAccess, expected, hasPurchaseHistory }) => {
    mockUseHasPurchaseHistory.mockReturnValue({
      hasPurchaseHistory,
      isLoading: false,
      isError: false,
      isFetched: true,
    });
    mockUseBenefitsPillarAccess.mockReturnValue({
      isAccessible: benefitsAccess,
      isFetched: true,
      isFetching: false,
    });

    const hook = renderHook(() => useBenefitsPillarPermission());

    expect(hook.result.current.permission).toBe(expected);
  });

  it.each`
    isWorkzone | isFetchedBenefitsAccess | isFetchedPurchaseHistory | expected
    ${true}    | ${true}                 | ${true}                  | ${true}
    ${true}    | ${false}                | ${true}                  | ${false}
    ${true}    | ${false}                | ${false}                 | ${false}
    ${true}    | ${true}                 | ${false}                 | ${true}
    ${false}   | ${true}                 | ${true}                  | ${true}
    ${false}   | ${false}                | ${true}                  | ${false}
    ${false}   | ${false}                | ${false}                 | ${false}
    ${false}   | ${true}                 | ${false}                 | ${false}
  `(
    'should return correct fetch status',
    ({ expected, isFetchedBenefitsAccess, isFetchedPurchaseHistory, isWorkzone }) => {
      mockUseIsWorkzone.mockReturnValue(isWorkzone);

      mockUseHasPurchaseHistory.mockReturnValue({
        hasPurchaseHistory: true,
        isLoading: false,
        isError: false,
        isFetched: isFetchedPurchaseHistory,
      });
      mockUseBenefitsPillarAccess.mockReturnValue({
        isAccessible: true,
        isFetched: isFetchedBenefitsAccess,
        isFetching: false,
      });

      const hook = renderHook(() => useBenefitsPillarPermission());

      expect(hook.result.current.isFetched).toBe(expected);
    }
  );
});

describe('useEbfPillarPermission', () => {
  beforeEach(() => {
    mockUseBenefitsPillarAccess.mockReturnValue({
      isAccessible: true,
      isFetched: true,
      isFetching: false,
    });
    mockUseHasPurchaseHistory.mockReturnValue({
      hasPurchaseHistory: false,
      isLoading: false,
      isError: false,
      isFetched: true,
    });
    mockUseHasActiveBillSubscription.mockReturnValue({ hasBillSubscription: false, isFetched: true, isError: false });
    mockUseCheckEmptyProviderWhileUsingApp.mockReturnValue(false);
    mockUseIsWorkzone.mockReturnValue(false);
    mockUseIsWalletSetupComplete.mockReturnValue({
      isWalletSetupComplete: false,
      isLoading: true,
      isError: false,
      isFetched: true,
    });
    mockUseIsCountrySupported.mockReturnValue({
      isCountrySupported: true,
      isLoading: true,
      isFetched: true,
    });
    mockUseWorkzonePermission.mockReturnValue({
      moneyPermission: true,
      benefitsPermission: true,
      isFetching: true,
      isFetched: true,
    });

    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      pillar_money: { view: true },
      eben_money_pillar_black_list: { view: false },
      pillar_benefits: { view: true },
      eben_benefits_pillar_black_list: { view: false },
    } as never;
  });

  it('should work correctly when login provider is empty while having token', () => {
    mockUseCheckEmptyProviderWhileUsingApp.mockReturnValue(true);

    const hook = renderHook(() => useEbfPillarPermission());
    const result = hook.result.current;

    expect(result.isFetchedMoney).toBe(true);
    expect(result.isFetchedBenefits).toBe(true);
    expect(result.benefitsPillarPermission).toBe(false);
    expect(result.moneyPillarPermission).toBe(false);
  });

  it('should work correctly when there is no cache', () => {
    const hook = renderHook(() => useEbfPillarPermission());
    const result = hook.result.current;

    expect(result.isFetchedMoney).toBe(true);
    expect(result.isFetchedBenefits).toBe(true);
    expect(result.benefitsPillarPermission).toBe(true);
    expect(result.moneyPillarPermission).toBe(true);
  });

  it('should work correctly when there is cache and done loading', () => {
    mockLocalStorageGetItem.mockReturnValue({
      money: false,
      benefits: true,
    });
    mockUseIsWalletSetupComplete.mockReturnValue({
      isWalletSetupComplete: false,
      isLoading: false,
      isError: false,
      isFetched: true,
    });
    mockUseIsCountrySupported.mockReturnValue({
      isCountrySupported: true,
      isLoading: false,
      isFetched: true,
    });
    mockUseWorkzonePermission.mockReturnValue({
      moneyPermission: true,
      benefitsPermission: true,
      isFetching: false,
      isFetched: true,
    });

    const hook = renderHook(() => useEbfPillarPermission());
    const result = hook.result.current;

    expect(result.isFetchedBenefits).toBe(true);
    expect(result.isFetchedMoney).toBe(true);
    expect(result.benefitsPillarPermission).toBe(true);
    expect(result.moneyPillarPermission).toBe(true);
  });
});
