import { useIsAccountAU } from './useIsAccountAU';
import { useIsOmopAccountUK } from './useIsOmopAccountUK';
import { useIsWalletSetupComplete } from './useIsWalletSetupComplete';
import { useCheckCardByRegion } from '../../features/spend-account/hooks/useCheckCardByRegion';
import { usePermissionStore } from '../stores/usePermissionStore';
import { useSessionStore } from '../stores/useSessionStore';

/**
 * A bag of booleans to determine visibility of the "Income" tab and sub-tabs
 */
interface SpendVisibility {
  showSpendTab: boolean;
  showCardTab: boolean;
  showStashTab: boolean;

  isLoading: boolean;
  isError: boolean;
}

/**
 * Legacy useSpendVisibility helps to calculate the visibility of the Spend, Card & Stash tab. Use for non OMOP user
 * @deprecated will remove after OMOP migration
 */
export const useSpendVisibilityLegacy = (): SpendVisibility => {
  const { isError: isWalletError, isLoading: isWalletLoading, isWalletSetupComplete } = useIsWalletSetupComplete();
  const { isCardLoading, isCardNotFound, isServerDown: isCardError } = useCheckCardByRegion();

  const walletFFPermission = !!usePermissionStore(state => state.permissions?.superAppWallet?.view);

  const isBlacklisted = !!usePermissionStore(state => state.permissions?.eben_money_pillar_black_list?.view);
  /**
   * The superAppWallet feature flag has included the check for blacklisted organisations. However, upon agreement,
   * it is expected to also allow users who previously have successfully created SSA to access Spend tab.
   * => walletPermission will be defined by whether a user (has SSA and is blacklisted) or (is allowed through feature flag check).
   * In this case, feature flag permission could be overridden by successful wallet setup
   */
  // Only allow overridden FF permission check by wallet setup status if is blacklisted
  const shouldOverridePermissionForBlacklisted = isBlacklisted && isWalletSetupComplete;
  const walletPermission = shouldOverridePermissionForBlacklisted || walletFFPermission;

  const isAU = useIsAccountAU();
  const stashFFPermission = !!usePermissionStore(state => state.permissions?.eBenStash?.view);

  /**
   * Similar to wallet permission, stashPermission from feature flag (eBenStash) could be overridden by successful
   * wallet setup to allow users from blacklisted organisations with valid SSA continue to use the feature
   */
  const stashPermission = isAU && (shouldOverridePermissionForBlacklisted || stashFFPermission);

  const stashVisibility = stashPermission && walletPermission && !isCardNotFound && isWalletSetupComplete;

  const isError = isWalletError || isCardError;
  // When one of these APIs are failed to fetch
  // => the whole Spend feature will be hidden
  // This to prevent looping issues can happen with Spend's APIs. Example
  // - Screen A make query 1 => render loading => query 1 fail (loop point) => render component B
  // => component B make query 1 => render loading of screen A => loop point
  if (isError) {
    return {
      showSpendTab: false,
      showCardTab: false,
      showStashTab: false,
      isLoading: false,
      isError,
    };
  }

  return {
    showSpendTab: walletPermission,
    showCardTab: !isCardNotFound,
    showStashTab: stashVisibility,
    isLoading: isWalletLoading || isCardLoading,
    isError,
  };
};

/**
 * useSpendVisibility helps to calculate the visibility of the Spend, Card & Stash tab
 */
export const useSpendVisibilityForOmop = (): SpendVisibility => {
  const { isOmopAccountUK } = useIsOmopAccountUK();

  const { isError: isWalletError, isLoading: isWalletLoading, isWalletSetupComplete } = useIsWalletSetupComplete();
  const isBlacklisted = !!usePermissionStore(state => state.permissions?.eben_money_pillar_black_list?.view);
  const shouldOverridePermissionForBlacklisted = isBlacklisted && isWalletSetupComplete;

  const walletFFPermission = !!usePermissionStore(state => state.permissions?.superAppWallet?.view);
  const walletPermission = shouldOverridePermissionForBlacklisted || walletFFPermission;

  const showSpendTab = isOmopAccountUK && walletPermission;
  const showCardTab = false;
  const showStashTab = false;
  return { showSpendTab, showCardTab, showStashTab, isLoading: isWalletLoading, isError: isWalletError };
};

/**
 * Conditional hook to get the correct useSpendVisibility hook.
 * Can remove the conditional part after OMOP migration
 */
export const useSpendVisibility = (): SpendVisibility => {
  const isOmopAccount = useSessionStore(state => state.currentUser?.isOmopAccount);
  const legacyPermission = useSpendVisibilityLegacy();
  const omopPermission = useSpendVisibilityForOmop();

  return isOmopAccount ? omopPermission : legacyPermission;
};
