import { storeDeeplink } from './common/stores/useDeeplinkStore';
import { useBenefitsOrderStore } from './features/benefits/common/screens/orders/stores/useBenefitsOrderStore';
import {
  WithdrawYourEarnedPaySectionKey,
  useWithdrawYourEarnedPaySectionStore,
} from './features/income/instapay-scheduling/stores/useWithdrawYourEarnedPaySectionStore';
import { LIFECYCLE_TRACKING_EVENT_NAMES } from './features/super/lifecycle/constants';
import { type LifecycleTrack } from './features/super/lifecycle/hooks/useLifecycleTracking';
import { navigateFromRoot, navigateToBenefitsTopTabs } from './navigation/rootNavigation';
import { topTabUtils } from './navigation/utils';

export enum NotificationCode {
  // GENERAL = 'ebenefit_notification',
  CARD_ADDED_TO_WALLET = 'ebenefit_card_added_to_wallet',
  WALLET_PROVISIONING_REMINDER_AFTER_24HRS = 'ebenefit_reminder_provisioning_after_24hrs',
  WALLET_PROVISIONING_REMINDER_AFTER_7DAYS = 'ebenefit_reminder_provisioning_after_7days',
  WALLET_UK_KYC_SUCCESS = 'ebenefit_uk_kyc_success',

  SPEND_REMINDER_AFTER_14DAYS = 'ebenefit_reminder_spend_after_14days',
  SPEND_REMINDER_AFTER_7DAYS = 'ebenefit_reminder_spend_after_7days',

  DEEP_LINK = 'ebenefit_deep_link',
  UK_RESUBMISSION = 'ebenefit_uk_kyc_resubmission_reminder',

  HERO_POINTS_RECEIVED = 'ebenefit_hero_points_received',

  SUPER_LIFECYCLE_OFFBOARDING = 'ebenefit_lifecycle_event_offboarding',
  SUPERFUND_CHANGED = 'ebenefit_superfund_changed',
}

export type NotificationPayload = {
  type: string;
  organisation_id: string | number;
  meta: {
    'gcm.message_id'?: string;
    appName?: string;
    member_licence_id?: string;
    objective_id?: number;
    key_result_id?: string;
    comment_id?: string | number;
    announcement_id?: number;
    announcement_type?: string;
    recognition_id?: string;
    payslip_external_id?: string;
    payslip_id?: string;
    start_week?: string;
    new_shifts?: string;
    changed_shifts?: string;
    deleted_shifts?: string;
    induction_content_id?: string;
    order_detail_local_id?: string;
    eh_notification_id?: string;
    recipient?: string;
    web_url?: string;
    lifecycle_event_id?: string;
  };
};

enum WalletDeepLinkUrl {
  dashboard = '/dashboard',
  digital_provisioning = '/digital-provisioning',
  instapay_now_intro = '/instapay-now-intro',
  instapay_get_now = '/instapay-get-now',
  hero_points = '/hero-points',
  hero_points_on_swag_card = '/hero-points-on-swag-card',
  income_dashboard = '/income-dashboard',
  income_recurring_tab = '/income-dashboard/recurring',
  stash_dashboard = '/stash-dashboard',
}

enum BenefitsDeeplinkUrl {
  cashback_online_offers = '/cashback-offers',
  cashback_instore_offers = '/cashback-instore-offers',
  cashback_transactions = '/cashback-transactions',
  store_products = '/store-products',
  group = '/group',
  home = '/home',
  offers = '/offers',
}

enum BillManagementDeeplinkUrl {
  offers = '/offers',
  bill_waitlist = '/waitlist',
}

enum EWAPushNotificationDeeplinkUrl {
  rba_successful_payment = '/recurring_by_amount_successful_payment',
  rbd_successful_payment = '/recurring_by_day_successful_payment',
  rbd_insufficient_balance = '/recurring_by_day_insufficient_balance',
}

export interface DeepLinkPayload {
  url: `${WalletDeepLinkUrl}` | `${BenefitsDeeplinkUrl}` | string;
}

/**
 * Navigation wrapper for deep link and notification handler.
 * Use this to fix delay when core app mount our app stack
 * @param navigateFunction
 */
const workaroundNavigate = (navigateFunction: () => void) => {
  setTimeout(navigateFunction, 50);
};

const extractDeeplink = (url: string) => {
  const [deeplinkWithoutQueryParams] = url.split('?');
  // deeplink format of bill management is platform_redirect/benefits/bill-management/....
  // so, we need to split by the bill management key before benefits key
  const splitUrl = deeplinkWithoutQueryParams.split(
    /hero-wallet\/earned-wage-access|hero-wallet|benefits\/bill-management|benefits/
  );

  // for everyone has tried to use query params, we can not use it due to super app limitation ... use nested path instead
  // for more details, please read this https://employmenthero.slack.com/archives/C9J3Z1KNH/p1708414905089869
  return { deepLinkUrl: splitUrl };
};

const handleWalletDeeplink = (payload: DeepLinkPayload) => {
  const { deepLinkUrl } = extractDeeplink(payload.url);
  if (deepLinkUrl.length === 1) {
    return;
  }

  switch (deepLinkUrl[1]) {
    case `${WalletDeepLinkUrl.dashboard}`:
    case `${WalletDeepLinkUrl.dashboard}/`:
    case '/':
    case '':
      workaroundNavigate(() => {
        topTabUtils.setSelectedTab?.('spend-tab');
      });
      break;
    case `${WalletDeepLinkUrl.digital_provisioning}`:
    case `${WalletDeepLinkUrl.digital_provisioning}/`:
      workaroundNavigate(() => {
        topTabUtils.setSelectedTab?.('spend-tab');
        navigateFromRoot('DigitalWalletStack', { screen: 'DigitalWalletSetup', params: { isOnboarding: true } });
      });
      break;
    case `${WalletDeepLinkUrl.instapay_now_intro}`:
    case `${WalletDeepLinkUrl.instapay_now_intro}/`:
    case `${WalletDeepLinkUrl.instapay_get_now}`:
    case `${WalletDeepLinkUrl.instapay_get_now}/`:
      workaroundNavigate(() => {
        topTabUtils.setSelectedTab?.('income-tab');
      });
      break;
    case `${WalletDeepLinkUrl.hero_points_on_swag_card}`:
    case `${WalletDeepLinkUrl.hero_points_on_swag_card}/`:
      workaroundNavigate(() => {
        topTabUtils.setSelectedTab?.('card-tab');
        navigateFromRoot('CardManagementStack', {
          screen: 'RedeemHPWithSwagCardSetting',
          params: { viaDeepLink: true },
        });
      });
      break;
    case `${WalletDeepLinkUrl.hero_points}`:
    case `${WalletDeepLinkUrl.hero_points}/`:
      workaroundNavigate(() => {
        topTabUtils.setSelectedTab?.('hero-points-tab');
      });
      break;
    case `${WalletDeepLinkUrl.income_dashboard}`:
      workaroundNavigate(() => {
        topTabUtils.setSelectedTab?.('income-tab');
      });
      break;
    case `${WalletDeepLinkUrl.income_recurring_tab}`:
    case `${WalletDeepLinkUrl.income_recurring_tab}/`:
      workaroundNavigate(() => {
        topTabUtils.setSelectedTab?.('income-tab');
        useWithdrawYourEarnedPaySectionStore.setState({
          selectedTabKey: WithdrawYourEarnedPaySectionKey.RECURRING,
        });
      });
      break;
    case `${WalletDeepLinkUrl.stash_dashboard}`:
    case `${WalletDeepLinkUrl.stash_dashboard}/`:
      workaroundNavigate(() => {
        topTabUtils.setSelectedTab?.('stash-tab');
      });
      break;
    default:
      break;
  }
};

const handleBenefitsDeeplinkV2 = (payload: DeepLinkPayload) => {
  const { deepLinkUrl: splitUrl } = extractDeeplink(payload.url);

  if (splitUrl.length === 1) {
    return;
  }
  const [, benefitsDeeplinkUrl] = splitUrl;

  const splitUrlParams = benefitsDeeplinkUrl.split('/').filter(Boolean);
  const deeplinkIDParams = splitUrlParams[1] ?? '';

  switch (benefitsDeeplinkUrl) {
    case `${BenefitsDeeplinkUrl.offers}/general/fitness`:
    case `${BenefitsDeeplinkUrl.offers}/general/fitness/`:
      workaroundNavigate(() => {
        navigateFromRoot('BenefitsStack', {
          screen: 'GeneralSearchScreen',
          params: {
            defaultCategory: {
              code: 'fitness',
              name: 'Fitness',
            },
          },
        });
      });
      break;
    case `${BenefitsDeeplinkUrl.offers}/fitness`:
    case `${BenefitsDeeplinkUrl.offers}/fitness/`:
      workaroundNavigate(() => {
        navigateFromRoot('BenefitsStack', {
          screen: 'BillStreamStack',
          params: {
            screen: 'BillOfferSearchScreen',
            params: {
              defaultCategory: {
                code: 'fitness',
                name: 'Fitness',
              },
            },
          },
        });
      });
      break;
    case `${BenefitsDeeplinkUrl.cashback_online_offers}`:
    case `${BenefitsDeeplinkUrl.cashback_online_offers}/`:
      navigateFromRoot('BenefitsStack', {
        screen: 'GeneralSearchScreen',
      });
      break;
    case `${BenefitsDeeplinkUrl.cashback_online_offers}/${deeplinkIDParams}`:
    case `${BenefitsDeeplinkUrl.cashback_online_offers}/${deeplinkIDParams}/`:
      workaroundNavigate(() => {
        topTabUtils.setSelectedBenefitsTab?.('benefits-online');
        navigateFromRoot('BenefitsStack', {
          screen: 'CashbackStack',
          params: { screen: 'OnlineOfferDetail', params: { offerId: deeplinkIDParams } },
        });
      });
      break;
    case `${BenefitsDeeplinkUrl.cashback_instore_offers}/`:
    case `${BenefitsDeeplinkUrl.cashback_instore_offers}`:
      workaroundNavigate(() => {
        topTabUtils.setSelectedBenefitsTab?.('benefits-instore');
      });
      break;
    case `${BenefitsDeeplinkUrl.cashback_instore_offers}/${deeplinkIDParams}`:
    case `${BenefitsDeeplinkUrl.cashback_instore_offers}/${deeplinkIDParams}/`:
      workaroundNavigate(() => {
        topTabUtils.setSelectedBenefitsTab?.('benefits-instore');

        navigateFromRoot('BenefitsStack', {
          screen: 'CashbackStack',
          params: { screen: 'InstoreOfferDetailV2', params: { offerLocationId: deeplinkIDParams } },
        });
      });
      break;
    case `${BenefitsDeeplinkUrl.cashback_instore_offers}/${splitUrlParams.slice(1).join('/')}`:
    case `${BenefitsDeeplinkUrl.cashback_instore_offers}/${splitUrlParams.slice(1).join('/')}/`:
      workaroundNavigate(() => {
        topTabUtils.setSelectedBenefitsTab?.('benefits-instore');
        // hacky way to get postcode and region
        // the format of deeplinkIDParams is /postcode/{postcode}/region/{region}
        const deeplinkIDParamsSplit = splitUrl[1].split('/');
        let postcode;
        let region;
        if (deeplinkIDParamsSplit.length === 6) {
          // eslint-disable-next-line prefer-destructuring
          postcode = deeplinkIDParamsSplit[3];
          // eslint-disable-next-line prefer-destructuring
          region = deeplinkIDParamsSplit[5];
        }
        storeDeeplink({
          deeplinkType: 'cashback-instore-offer',
          deeplinkParams: {
            postcode,
            region,
          },
        });
      });
      break;
    case `${BenefitsDeeplinkUrl.cashback_transactions}`:
    case `${BenefitsDeeplinkUrl.cashback_transactions}/`:
    case `${BenefitsDeeplinkUrl.cashback_transactions}/${deeplinkIDParams}`:
    case `${BenefitsDeeplinkUrl.cashback_transactions}/${deeplinkIDParams}/`:
      workaroundNavigate(() => {
        topTabUtils.setSelectedBenefitsTab?.('benefits-purchases');
        useBenefitsOrderStore.setState({ pendingChangeBenefitsOrdersTab: 'cashback' });
      });
      break;
    case `${BenefitsDeeplinkUrl.store_products}`:
    case `${BenefitsDeeplinkUrl.store_products}/`:
      workaroundNavigate(() => {
        navigateFromRoot('BenefitsStack', {
          screen: 'GeneralSearchScreen',
          params: {
            defaultCategory: {
              code: 'giftcard',
              name: 'Gift cards',
            },
          },
        });
      });
      break;
    case `${BenefitsDeeplinkUrl.store_products}/${deeplinkIDParams}`:
    case `${BenefitsDeeplinkUrl.store_products}/${deeplinkIDParams}/`:
      workaroundNavigate(() => {
        navigateFromRoot('BenefitsStack', {
          screen: 'GeneralSearchScreen',
          params: {
            defaultCategory: {
              code: 'giftcard',
              name: 'Gift cards',
            },
          },
        });
        navigateFromRoot('BenefitsStack', {
          screen: 'DiscountShopStack',
          params: {
            screen: 'ProductDetail',
            params: {
              productCode: deeplinkIDParams,
            },
          },
        });
      });
      break;
    case `${BenefitsDeeplinkUrl.group}/${deeplinkIDParams}`:
    case `${BenefitsDeeplinkUrl.group}/${deeplinkIDParams}/`:
      workaroundNavigate(() => {
        navigateFromRoot('BenefitsStack', {
          screen: 'GroupStack',
          params: {
            screen: 'GroupDetailScreen',
            params: {
              group: {
                memberAvatars: [],
                description: '',
                howItWorks: '',
                id: deeplinkIDParams,
                imageSrc: '',
                memberCount: 0,
                promoTitle: '',
                savingPeriod: '',
                savingRange: '',
                shareContent: '',
                subtitle: '',
                title: '',
              },
            },
          },
        });
      });
      break;
    case `${BenefitsDeeplinkUrl.home}`:
      workaroundNavigate(() => {
        topTabUtils.setSelectedBenefitsTab?.('benefits-home');
      });
      break;
    default:
      break;
  }
};

const handleBillManagementDeeplinkV2 = (payload: DeepLinkPayload) => {
  const { deepLinkUrl: splitUrl } = extractDeeplink(payload.url);

  if (splitUrl.length === 1) {
    return;
  }
  const [, bmDeeplinkUrl] = splitUrl;

  const splitUrlParams = bmDeeplinkUrl.split('/').filter(Boolean);
  const deeplinkIDParams = splitUrlParams[1] ?? '';

  switch (bmDeeplinkUrl) {
    case `${BillManagementDeeplinkUrl.offers}`:
    case `${BillManagementDeeplinkUrl.offers}/`:
      navigateFromRoot('BenefitsStack', {
        screen: 'GeneralSearchScreen',
        params: {
          defaultCategory: {
            code: 'bill',
            name: 'Bills',
          },
        },
      });
      break;
    case `${BillManagementDeeplinkUrl.offers}/${deeplinkIDParams}`:
    case `${BillManagementDeeplinkUrl.offers}/${deeplinkIDParams}/`:
      workaroundNavigate(() => {
        navigateFromRoot('BenefitsStack', {
          screen: 'GeneralSearchScreen',
          params: {
            defaultCategory: {
              code: 'bill',
              name: 'Bills',
            },
          },
        });
        navigateFromRoot('BenefitsStack', {
          screen: 'BillStreamStack',
          params: {
            screen: 'BillOfferDetailScreen',
            params: {
              offerId: deeplinkIDParams,
              onBackToBill: () => {
                navigateToBenefitsTopTabs('benefits-home');
              },
            },
          },
        });
      });
      break;
    case `${BillManagementDeeplinkUrl.bill_waitlist}/health-insurance`:
    case `${BillManagementDeeplinkUrl.bill_waitlist}/health-insurance/`:
      workaroundNavigate(() => {
        navigateFromRoot('BillStreamWaitlist', {
          screen: 'HealthInsuranceJoinWaitlistScreen',
        });
      });
      break;
    default:
      break;
  }
};

const handleEWAPushNotificationDeeplink = (payload: DeepLinkPayload) => {
  const { deepLinkUrl } = extractDeeplink(payload.url);
  if (deepLinkUrl.length === 1) {
    return;
  }

  const [, eventType] = deepLinkUrl;

  switch (eventType) {
    case `${EWAPushNotificationDeeplinkUrl.rba_successful_payment}`:
    case `${EWAPushNotificationDeeplinkUrl.rba_successful_payment}/`:
    case `${EWAPushNotificationDeeplinkUrl.rbd_successful_payment}`:
    case `${EWAPushNotificationDeeplinkUrl.rbd_successful_payment}/`:
      workaroundNavigate(() => {
        topTabUtils.setSelectedTab?.('income-tab');
        navigateFromRoot('SupportStack', {
          screen: 'InstaPayHistory',
        });
        useWithdrawYourEarnedPaySectionStore.setState({
          selectedTabKey: WithdrawYourEarnedPaySectionKey.RECURRING,
        });
      });
      break;
    case `${EWAPushNotificationDeeplinkUrl.rbd_insufficient_balance}`:
    case `${EWAPushNotificationDeeplinkUrl.rbd_insufficient_balance}/`:
      workaroundNavigate(() => {
        topTabUtils.setSelectedTab?.('income-tab');
        useWithdrawYourEarnedPaySectionStore.setState({
          selectedTabKey: WithdrawYourEarnedPaySectionKey.RECURRING,
        });
      });
      break;
    default:
      break;
  }
};

const handleDeeplink = (payload: DeepLinkPayload) => {
  const { url } = payload;

  if (url.match(/\/earned-wage-access/g)) {
    handleEWAPushNotificationDeeplink(payload);

    return;
  }

  if (url.match(/\/hero-wallet/g)) {
    handleWalletDeeplink(payload);

    return;
  }

  if (url.match(/\/bill-management/g)) {
    handleBillManagementDeeplinkV2(payload);

    return;
  }

  if (url.match(/\/benefits/g)) {
    handleBenefitsDeeplinkV2(payload);
  }
};

const getParamsFromUrl = (url: string) => {
  const regex = /[?&]([^=#]+)=([^&#]*)/g;
  const params: Record<string, string> = {};

  const paramArr = [...url.matchAll(regex)];
  paramArr.forEach(item => {
    const [, key, value] = item;
    params[key] = value;
  });

  return params;
};

const handleNotificationNavigation = (payload: NotificationPayload) => {
  switch (payload.type) {
    case NotificationCode.SPEND_REMINDER_AFTER_14DAYS:
      workaroundNavigate(() => {
        topTabUtils.setSelectedTab?.('spend-tab');
        navigateFromRoot('NotificationStack', { screen: 'TransactWithIncentive' });
      });
      break;
    case NotificationCode.CARD_ADDED_TO_WALLET:
    case NotificationCode.SPEND_REMINDER_AFTER_7DAYS:
      workaroundNavigate(() => {
        topTabUtils.setSelectedTab?.('spend-tab');
        navigateFromRoot('CardManagementStack', { screen: 'CardManagementDashboard' });
      });
      break;
    case NotificationCode.WALLET_PROVISIONING_REMINDER_AFTER_24HRS:
    case NotificationCode.WALLET_PROVISIONING_REMINDER_AFTER_7DAYS:
      workaroundNavigate(() => {
        topTabUtils.setSelectedTab?.('spend-tab');
        navigateFromRoot('DigitalWalletStack', { screen: 'DigitalWalletSetup', params: { isOnboarding: true } });
      });
      break;
    case NotificationCode.UK_RESUBMISSION:
      workaroundNavigate(() => {
        topTabUtils.setSelectedTab?.('spend-tab');
        navigateFromRoot('OnboardingStack', { screen: 'UkVerifyIdentityDocumentInfo', params: { userToken: '' } });
      });
      break;
    case NotificationCode.WALLET_UK_KYC_SUCCESS:
      workaroundNavigate(() => {
        topTabUtils.setSelectedTab?.('spend-tab');
      });
      break;
    case NotificationCode.HERO_POINTS_RECEIVED:
      workaroundNavigate(() => {
        topTabUtils.setSelectedTab?.('hero-points-tab');
      });
      break;
    case NotificationCode.SUPERFUND_CHANGED:
      workaroundNavigate(() => {
        topTabUtils.setSelectedTab?.('super-tab');
      });
      break;
    case NotificationCode.SUPER_LIFECYCLE_OFFBOARDING:
      workaroundNavigate(() => {
        topTabUtils.setSelectedTab?.('super-tab');
      });
      break;
    case NotificationCode.DEEP_LINK: {
      // Example URL: 'https://secure.employmenthero.com/platform_redirect?disable_override_host=true&web_url=https://swagapp.com/benefits/&app_deep_path=platform_redirect/benefits/cashback-offers/940904'
      const url = payload.meta.web_url;
      if (!url) {
        return;
      }
      const params = getParamsFromUrl(url);
      const appDeeplink = params.app_deep_path;

      if (!appDeeplink) {
        return;
      }
      handleDeeplink({
        url: appDeeplink,
      });
      break;
    }
    default:
      break;
  }
};

/**
 * Handle lifecycle tracking actions.
 * Use this to inject lifecycle tracking action on notification click event
 */
const handleNotificationLifecycleTracking = (payload: NotificationPayload, lifecycleTrack: LifecycleTrack) => {
  switch (payload.type) {
    case NotificationCode.SUPER_LIFECYCLE_OFFBOARDING:
      lifecycleTrack({
        name: LIFECYCLE_TRACKING_EVENT_NAMES.SWAG_NOTIFICATION_CLICKED,
        data: {
          event: 'offboarding',
        },
        event_id: payload.meta.lifecycle_event_id as string,
      });
      break;
    default:
      break;
  }
};

export { handleNotificationNavigation, handleDeeplink, handleNotificationLifecycleTracking };
