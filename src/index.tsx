/**
 * Start listen to token exchange event
 */
// eslint-disable-next-line import/order
import './common/auth/services/ehTokenExchange';

/**
 * extend custom parse format
 */
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import { enablePatches, enableMapSet } from 'immer';

enablePatches();
enableMapSet();

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(duration);

/**
 * Provider
 */
export { RootProvider as SwagPersonalRootProvider } from './RootProvider';

/**
 * Navigation
 */
export { defineWalletAppScreens } from './navigation/StackNavigator';
export { defineMoneyProfileScreens } from './features/my-profile/navigation';
export { swagPersonalSetTopLevelNavigator } from './navigation/rootNavigation';
export { WalletAppRootScreen } from './navigation/WalletAppRootScreen';
export { BenefitsAppRootScreen } from './navigation/BenefitsAppRootScreen';

/**
 * Hooks
 */
export { useIsWalletSetupComplete } from './common/hooks/useIsWalletSetupComplete';
export { useInitEhCountryCode } from './common/hooks/useEbfCountry';
export { useCountryPicker } from './providers/CountryPickerProvider/useCountryPicker';
export { useEbfPillarPermission } from './common/hooks/useEbfPillarPermission';
export { useEbenTokenStatus } from './common/auth/store/ebenTokenStore';
export { useLocalisation } from './providers/LocalisationProvider/hooks/useLocalisation';
export { useLoadLanguage } from './providers/LocalisationProvider/hooks/useLoadLanguage';
export { usePasscodeChanged } from './common/screens/passcode';
export { useHeroPointsVisibility } from './common/hooks/useHeroPointsVisibility';
export { useGetMoneyTabs } from './common/hooks/useGetMoneyTabs';
export { useAuthStateListener } from './common/app/useAuthStateListener';
export { useGetMoneyTabsWithIcon } from './common/hooks/useGetMoneyTabsWithIcon';
export { useBenefitsTabs } from './features/benefits/common/hooks/useBenefitsTabs/useBenefitsTabs';
export { useShowInstapayOnboarding } from './features/swag-dashboard/instapay-introduction/hooks/useShowInstapayOnboarding';
export { useMiniAppSwitcherStore } from './common/stores/useMiniAppSwitcherStore';
export { useInstapayExpBrazeCard } from './features/income/instapay/hooks/useInstapayExpBrazeCard';
export { useIncomeVisibility } from './common/hooks/useIncomeVisibility';
export { useInstapayExpPopup } from './features/income/instapay/components/instapay-exp-popup/hooks/useInstapayExpPopup';
export { useInstapayExpForLeave } from './features/income/instapay/hooks/useInstapayExpForLeave';
export { useInstapayExpForTimesheet } from './features/income/instapay/hooks/useInstapayExpForTimesheet';
export { useDynamicCashbackTilesVisibility } from './features/swag-dashboard/dynamic-tiles/V1/hooks/useDynamicCashbackTilesVisibility';
export { useInstapayABTestDashboard } from './features/income/instapay/hooks/useInstapayABTestDashboard';
export { useBypassBrazeCCAccess } from './common/hooks/useBypassBrazeCCAccess';

/**
 * Component/Screen
 */
export { MoneyProfile } from './features/my-profile/MoneyProfile';
export { SwagDashboardMegadealTile } from './features/benefits/group/components/SwagDashboardMegadealTile';

/**
 * SWAG dashboard tiles
 */
export { useMoneySWAGDashboardTiles, useBenefitsSWAGDashboardTiles } from './features/swag-dashboard';

/**
 * utils
 */
export { switchPillar } from './common/stores/useMiniAppSwitcherStore';
/**
 * Hero points widget
 */
export { HeroPointsWidget } from './features/swag-dashboard/hero-points-widget';
/**
 * Dynamic tiles
 */
export { InstapaySwagCarousel } from './features/swag-dashboard/dynamic-tiles/V2/InstapaySwagCarousel';
export { InstapaySwagCarouselV3 } from './features/swag-dashboard/dynamic-tiles/V3/InstapaySwagCarouselV3';
export { InstaPayNowTile } from './features/swag-dashboard/dynamic-tiles/V1/InstaPayNowTile';
export { LifecycleTile } from './features/swag-dashboard/dynamic-tiles/V1/LifecycleTile';
export { SalarySacrificeTile } from './features/swag-dashboard/dynamic-tiles/V1/SalarySacrificeTile';
export { StashTile } from './features/swag-dashboard/dynamic-tiles/V1/StashTile';
export { DynamicCashbackTiles } from './features/swag-dashboard/dynamic-tiles/V1/DynamicCashbackTiles';
export { InstapayRostersExperimentTile } from './features/income/instapay/components/InstapayRostersExperimentTile';
export { InstapayTimesheetsExperimentTile } from './features/income/instapay/components/InstapayTimesheetsExperimentTile';
export { InstapayCustomSurveyFooterTile } from './features/income/instapay/components/InstapayCustomSurveyFooterTile';
export { LastPayslipTile } from './features/swag-dashboard/dynamic-tiles/V2/LastPayslipTile';
export { InstapayOnboardingWidget } from './features/swag-dashboard/instapay-introduction/components/InstapayOnboardingWidget';
export { InstapayTimesheetFooterTile } from './features/income/instapay/components/InstapayTimesheetFooterTile';
export { InstapayAdTile } from './features/income/instapay/components/instapay-exp-popup/InstapayAdTile';
export { InstapayExpCard } from './features/income/instapay/components/InstapayExpCard';
export { InstapayExpCardV2 } from './features/income/instapay/components/InstapayExpCardV2';
export { WorkSuccessWithInstapayAd } from './features/income/instapay/screens/experiments/WorkSuccessWithInstapayAd';
export { InstapayBannerAtSwagDB } from './features/income/instapay/components/InstapayBannerPopup';
export { InstapayTestimonialCard } from './features/income/instapay/components/InstapayTestimonialCard';

/**
 * Work payslips tile
 */
export { PayslipsTile } from './features/swag-payslips/PayslipsTile';

/**
 * Types
 */
export type { BenefitsTabKeysType } from './features/benefits/common/hooks/useBenefitsTabs/constants';
export type { TabKeysType } from './navigation/TopTabsNavigator';
