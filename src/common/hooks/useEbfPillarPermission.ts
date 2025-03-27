import { useEffect, useState } from 'react';
import { useCheckEmptyProviderWhileUsingApp } from './useCheckEmptyProviderWhileUsingApp';
import { useHasPurchaseHistory } from './useHasPurchaseHistory';
import { useIsWalletSetupComplete } from './useIsWalletSetupComplete';
import { useIsWorkzone } from './useIsWorkzone';
import { usePureMoneyPillarPermission } from './usePureMoneyPillarPermission';
import { useBenefitsPillarAccess } from '../../features/benefits/common/hooks/useBenefitsPillarAccess';
import { useHasActiveBillSubscription } from '../../features/bill-management/hooks/useHasActiveBillSubscription';
import { LocalStorage, LocalStorageKey } from '../libs/storage/localStorage';
import { useSessionStore } from '../stores/useSessionStore';
import { addBreadcrumb, logError } from '../utils/sentry';

type EbenPermission = {
  money: boolean;
  benefits: boolean;
};

export const useMoneyPillarPermission = () => {
  const { isFetched: isFetchedPermission, permission: pillarPermission } = usePureMoneyPillarPermission();
  const { isError, isFetched: isFetchedWalletSetup, isWalletSetupComplete } = useIsWalletSetupComplete();
  const hasExistingWallet = isWalletSetupComplete && isFetchedWalletSetup && !isError;
  const { hasBillSubscription, isFetched: isFetchedActiveBill } = useHasActiveBillSubscription();

  const isFetched = isFetchedWalletSetup && isFetchedActiveBill && isFetchedPermission;
  const specialPermissionAccess = hasExistingWallet || hasBillSubscription;

  return {
    // allow existing wallet users bypass permission check
    permission: specialPermissionAccess || pillarPermission,
    isFetched,
  };
};

export const useBenefitsPillarPermission = () => {
  const isWorkzone = useIsWorkzone();
  const { hasPurchaseHistory, isFetched: isFetchPurchaseHistory } = useHasPurchaseHistory();
  const { isAccessible, isFetched: isFetchedBenefitsAccess } = useBenefitsPillarAccess();

  const isFetched = isWorkzone ? isFetchedBenefitsAccess : isFetchedBenefitsAccess && isFetchPurchaseHistory;

  return {
    permission: isAccessible || hasPurchaseHistory,
    isFetched,
  };
};

type PillarPermissionType = {
  moneyPillarPermission: boolean;
  benefitsPillarPermission: boolean;
  isFetchedMoney: boolean;
  isFetchedBenefits: boolean;
  isHydrated: boolean;
};

export const useEbfPillarPermission = (): PillarPermissionType => {
  const [storedPermission, setStorePermission] = useState<EbenPermission | null>();
  const isMissingLoginProvider = useCheckEmptyProviderWhileUsingApp();
  const { loginProvider, userID } = useSessionStore(
    state =>
      state.currentUser ?? {
        loginProvider: '',
        userID: '0',
      }
  );
  const { isFetched: isFetchedMoney, permission: moneyPermission } = useMoneyPillarPermission();
  const { isFetched: isFetchedBenefits, permission: benefitsPermission } = useBenefitsPillarPermission();

  const loadPermissionFromStore = async () => {
    const result = await LocalStorage.getItem<EbenPermission>(LocalStorageKey.EbenPillarPermission);
    setStorePermission(result);
  };

  useEffect(() => {
    loadPermissionFromStore();
  }, []);

  const isFetched = isFetchedMoney && isFetchedBenefits;

  useEffect(() => {
    if (isFetched) {
      // save to store after done fetching
      LocalStorage.setItem<EbenPermission>(LocalStorageKey.EbenPillarPermission, {
        money: moneyPermission,
        benefits: benefitsPermission,
      });
    }
  }, [moneyPermission, benefitsPermission, isFetched]);

  // handle if login provider is empty while using app
  if (isMissingLoginProvider) {
    addBreadcrumb({ message: 'Missing login provider', data: { loginProvider, userID } });
    logError('EbenMissingLoginProvider');

    return {
      moneyPillarPermission: false,
      benefitsPillarPermission: false,
      isFetchedMoney: true,
      isFetchedBenefits: true,
      isHydrated: false,
    };
  }

  if (storedPermission && !isFetched) {
    // having cache from store && is fetching, return value and disable loading
    return {
      moneyPillarPermission: storedPermission.money,
      benefitsPillarPermission: storedPermission.benefits,
      isFetchedMoney: true,
      isFetchedBenefits: true,
      isHydrated: true,
    };
  }

  return {
    moneyPillarPermission: moneyPermission,
    benefitsPillarPermission: benefitsPermission,
    isFetchedMoney,
    isFetchedBenefits,
    isHydrated: false,
  };
};
