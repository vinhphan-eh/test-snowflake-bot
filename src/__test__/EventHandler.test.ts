import { waitFor } from '@testing-library/react-native';
import { storeDeeplink } from '../common/stores/useDeeplinkStore';
import { usePermissionStore } from '../common/stores/usePermissionStore';
import { renderHook } from '../common/utils/testing';
import type { NotificationPayload } from '../EventHandler';
import {
  handleDeeplink,
  handleNotificationLifecycleTracking,
  handleNotificationNavigation,
  NotificationCode,
} from '../EventHandler';
import { useWithdrawYourEarnedPaySectionStore } from '../features/income/instapay-scheduling/stores/useWithdrawYourEarnedPaySectionStore';
import * as rootNavigation from '../navigation/rootNavigation';
import { topTabUtils } from '../navigation/utils';

jest.mock('../common/stores/useDeeplinkStore', () => ({
  storeDeeplink: jest.fn(),
}));

const mockLifecycleTracking = jest.fn();

const initialPermissionsState = {
  instapay: {
    view: true,
  },
  superAppBenefits: {
    view: true,
  },
  superAppWallet: {
    view: true,
  },
  superAppSettings: {
    view: true,
  },
  superAppHome: {
    view: true,
  },
  superAppCashback: {
    view: true,
  },
  superAppBenefitsFeaturedOffers: {
    view: true,
  },
  superAppCashbackCategories: {
    view: true,
  },
  heroPoints: {
    view: false,
  },
};

describe('Event Handler', () => {
  beforeEach(() => {
    jest.spyOn(rootNavigation, 'navigateFromRoot');
  });

  describe('Universal link', () => {
    test.each([
      {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/digital-provisioning',
      },
      {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/digital-provisioning/',
      },
      {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/digital-provisioning/?utm_source=facebook',
      },
    ])('should navigate Digital Provisioning screen: $url', async ({ url }) => {
      topTabUtils.setSelectedTab = jest.fn();
      const payload = { url };
      handleDeeplink(payload);

      await waitFor(() => {
        expect(topTabUtils.setSelectedTab).toHaveBeenCalledWith('spend-tab');
        expect(rootNavigation.navigateFromRoot).toHaveBeenCalledWith('DigitalWalletStack', {
          screen: 'DigitalWalletSetup',
          params: { isOnboarding: true },
        });
      });
    });

    test.each([
      { url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/dashboard' },
      { url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/dashboard/' },
      { url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet' },
      { url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/' },
      {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/?utm_source=facebook',
      },
    ])('should navigate Wallet Dashboard screen: $url', async ({ url }) => {
      topTabUtils.setSelectedTab = jest.fn();
      const payload = { url };
      handleDeeplink(payload);

      await waitFor(() => {
        expect(topTabUtils.setSelectedTab).toHaveBeenCalledWith('spend-tab');
      });
    });

    test.each([
      {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/hero-points-on-swag-card',
      },
      {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/hero-points-on-swag-card/',
      },
      {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/hero-points-on-swag-card/?utm_source=facebook',
      },
    ])('should navigate Redeem HP with Swag Card screen: $url', async ({ url }) => {
      topTabUtils.setSelectedTab = jest.fn();
      const payload = { url };
      handleDeeplink(payload);

      await waitFor(() => {
        expect(topTabUtils.setSelectedTab).toHaveBeenCalledWith('card-tab');
        expect(rootNavigation.navigateFromRoot).toHaveBeenCalledWith('CardManagementStack', {
          screen: 'RedeemHPWithSwagCardSetting',
          params: { viaDeepLink: true },
        });
      });
    });

    test.each([
      {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/hero-points',
      },
      {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/hero-points/?utm_source=facebook',
      },
    ])('should navigate Hero Points Dashboard screen: $url', async ({ url }) => {
      topTabUtils.setSelectedTab = jest.fn();
      const payload = { url };
      handleDeeplink(payload);

      await waitFor(() => {
        expect(topTabUtils.setSelectedTab).toHaveBeenCalledWith('hero-points-tab');
      });
    });

    const groupTestCases = [
      {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/benefits/group/1b98b884-61d2-45dc-8da2-c23197c36bc7',
      },
      {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/benefits/group/1b98b884-61d2-45dc-8da2-c23197c36bc7/',
      },
    ];
    test.each(groupTestCases)('should navigate Group Detail screen: $url', async ({ url }) => {
      const payload = { url };
      handleDeeplink(payload);
      await waitFor(() => {
        expect(rootNavigation.navigateFromRoot).toHaveBeenCalledWith('BenefitsStack', {
          screen: 'GroupStack',
          params: {
            screen: 'GroupDetailScreen',
            params: {
              group: {
                memberAvatars: [],
                description: '',
                howItWorks: '',
                id: '1b98b884-61d2-45dc-8da2-c23197c36bc7',
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
    });

    test.each(groupTestCases)('should navigate Group Detail screen ia v2 $url', async ({ url }) => {
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        ...initialPermissionsState,
        benefitsIAv2: {
          view: true,
        },
      };
      const payload = { url };
      handleDeeplink(payload);
      await waitFor(() => {
        expect(rootNavigation.navigateFromRoot).toHaveBeenCalledWith('BenefitsStack', {
          screen: 'GroupStack',
          params: {
            screen: 'GroupDetailScreen',
            params: {
              group: {
                memberAvatars: [],
                description: '',
                howItWorks: '',
                id: '1b98b884-61d2-45dc-8da2-c23197c36bc7',
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
    });

    test.each([
      { url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/benefits/offers/general/fitness' },
      {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/benefits/offers/general/fitness/',
      },
    ])('should navigate benefit offers fitness ia v2 $url', async ({ url }) => {
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        ...initialPermissionsState,
        benefitsIAv2: {
          view: true,
        },
      };
      const payload = { url };
      handleDeeplink(payload);
      await waitFor(() => {
        expect(rootNavigation.navigateFromRoot).toHaveBeenCalledWith('BenefitsStack', {
          screen: 'GeneralSearchScreen',
          params: {
            defaultCategory: {
              code: 'fitness',
              name: 'Fitness',
            },
          },
        });
      });
    });

    test.each([
      { url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/benefits/offers/fitness' },
      { url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/benefits/offers/fitness/' },
    ])('should navigate benefit offers fitness ia v2 $url', async ({ url }) => {
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        ...initialPermissionsState,
        benefitsIAv2: {
          view: true,
        },
      };
      const payload = { url };
      handleDeeplink(payload);
      await waitFor(() => {
        expect(rootNavigation.navigateFromRoot).toHaveBeenCalledWith('BenefitsStack', {
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
    });

    test.each([
      { url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/benefits/store-products' },
      { url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/benefits/store-products' },
    ])('should navigate benefit gift cards search tab ia v2 $url', async ({ url }) => {
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        ...initialPermissionsState,
        benefitsIAv2: {
          view: true,
        },
      };
      const payload = { url };
      handleDeeplink(payload);
      await waitFor(() => {
        expect(rootNavigation.navigateFromRoot).toHaveBeenCalledWith('BenefitsStack', {
          screen: 'GeneralSearchScreen',
          params: {
            defaultCategory: {
              code: 'giftcard',
              name: 'Gift cards',
            },
          },
        });
      });
    });

    describe('In-store cashback offer', () => {
      describe('IA v2', () => {
        beforeEach(() => {
          topTabUtils.setSelectedBenefitsTab = jest.fn();
        });
        test.each([
          {
            url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/benefits/cashback-instore-offers/postcode/2026/region/AU',
          },
        ])('should handle navigate to in-store tab', async ({ url }) => {
          const permissionStore = renderHook(() => usePermissionStore());
          permissionStore.result.current.permissions = {
            ...initialPermissionsState,
            benefitsIAv2: {
              view: true,
            },
          };
          const payload = { url };
          handleDeeplink(payload);

          await waitFor(() => {
            expect(topTabUtils.setSelectedBenefitsTab).toHaveBeenCalledWith('benefits-instore');
          });

          expect(storeDeeplink).toHaveBeenCalledWith({
            deeplinkType: 'cashback-instore-offer',
            deeplinkParams: {
              postcode: '2026',
              region: 'AU',
            },
          });
        });

        test.each([
          {
            url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/benefits/cashback-instore-offers/123_456',
          },
          {
            url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/benefits/cashback-instore-offers/123_456/',
          },
        ])(
          'should navigate to benefits pillar and navigate to new instore-offer details screen with multi-location eanbled: $url',
          async ({ url }) => {
            const permissionStore = renderHook(() => usePermissionStore());
            permissionStore.result.current.permissions = {
              ...initialPermissionsState,
              benefitsIAv2: {
                view: true,
              },
            };
            const payload = { url };
            handleDeeplink(payload);
            await waitFor(() => {
              expect(topTabUtils.setSelectedBenefitsTab).toHaveBeenCalledWith('benefits-instore');
              expect(rootNavigation.navigateFromRoot).toHaveBeenCalledWith('BenefitsStack', {
                screen: 'CashbackStack',
                params: { screen: 'InstoreOfferDetailV2', params: { offerLocationId: '123_456' } },
              });
            });
          }
        );
      });
    });

    test.each([
      {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/benefits/bill-management/offers/1',
      },
      {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/benefits/bill-management/offers/1/',
      },
    ])('should navigate benefit bill detail screen ia v2 $url', async ({ url }) => {
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        ...initialPermissionsState,
        benefitsIAv2: {
          view: true,
        },
      };
      const payload = { url };
      handleDeeplink(payload);
      await waitFor(() => {
        expect(rootNavigation.navigateFromRoot).nthCalledWith(1, 'BenefitsStack', {
          screen: 'GeneralSearchScreen',
          params: {
            defaultCategory: {
              code: 'bill',
              name: 'Bills',
            },
          },
        });
        expect(rootNavigation.navigateFromRoot).nthCalledWith(2, 'BenefitsStack', {
          screen: 'BillStreamStack',
          params: {
            screen: 'BillOfferDetailScreen',
            params: {
              offerId: '1',
              onBackToBill: expect.any(Function),
            },
          },
        });
      });
    });

    test.each([
      { url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/benefits/bill-management/offers' },
      {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/benefits/bill-management/offers/',
      },
    ])('should navigate benefit bills search tab ia v2 $url', async ({ url }) => {
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        ...initialPermissionsState,
        benefitsIAv2: {
          view: true,
        },
      };
      const payload = { url };
      handleDeeplink(payload);
      await waitFor(() => {
        expect(rootNavigation.navigateFromRoot).toHaveBeenCalledWith('BenefitsStack', {
          screen: 'GeneralSearchScreen',
          params: {
            defaultCategory: {
              code: 'bill',
              name: 'Bills',
            },
          },
        });
      });
    });

    test.each([
      {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/benefits/bill-management/waitlist/health-insurance',
      },
      {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/benefits/bill-management/waitlist/health-insurance/',
      },
    ])('should navigate benefit bill health insurance waitlist $url', async ({ url }) => {
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        ...initialPermissionsState,
        benefitsIAv2: {
          view: true,
        },
      };
      const payload = { url };
      handleDeeplink(payload);
      await waitFor(() => {
        expect(rootNavigation.navigateFromRoot).toHaveBeenCalledWith('BillStreamWaitlist', {
          screen: 'HealthInsuranceJoinWaitlistScreen',
        });
      });
    });

    test.each([
      { url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/instapay-now-intro' },
      { url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/instapay-now-intro/' },
      {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/instapay-now-intro?utm_source=facebook',
      },
      {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/instapay-now-intro/?utm_source=facebook',
      },
      { url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/instapay-get-now' },
      { url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/instapay-get-now/' },
      {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/instapay-get-now?utm_source=facebook',
      },
      {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/instapay-get-now/?utm_source=facebook',
      },
    ])('should navigate to Income Dashboard screen: $url', async ({ url }) => {
      topTabUtils.setSelectedTab = jest.fn();
      const payload = { url };
      handleDeeplink(payload);

      await waitFor(() => {
        expect(topTabUtils.setSelectedTab).toHaveBeenCalledWith('income-tab');
      });
    });

    test.each([
      { url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/income-dashboard' },
    ])('should navigate directly to income tab: $url', async ({ url }) => {
      topTabUtils.setSelectedTab = jest.fn();
      const payload = { url };
      handleDeeplink(payload);

      await waitFor(() => {
        expect(topTabUtils.setSelectedTab).toHaveBeenCalledWith('income-tab');
      });
    });

    test.each([
      {
        // this is the url that is used for mimic app
        // https://mobile.staging.ehrocks.com/platform_redirect?web_url=https://mobile.staging.ehrocks.com/products/hero-wallet/&app_deep_path=platform_redirect/hero-wallet/income-dashboard/recurring
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/income-dashboard/recurring',
      },
      {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/income-dashboard/recurring/',
      },
    ])('should navigate directly to income tab with selected tab: $url', async ({ url }) => {
      topTabUtils.setSelectedTab = jest.fn();
      const mockFn = jest.fn();
      useWithdrawYourEarnedPaySectionStore.setState = mockFn;
      const payload = { url };
      handleDeeplink(payload);

      await waitFor(() => {
        expect(topTabUtils.setSelectedTab).toHaveBeenCalledWith('income-tab');
        expect(mockFn).toHaveBeenCalledWith({ selectedTabKey: 'Recurring' });
      });
    });

    test.each([
      {
        // this is the url that is used for mimic app
        // https://mobile.staging.ehrocks.com/platform_redirect?web_url=https://mobile.staging.ehrocks.com/products/hero-wallet/&app_deep_path=platform_redirect/hero-wallet/stash-dashboard
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/stash-dashboard',
      },
      {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/stash-dashboard/',
      },
    ])('should navigate directly to stash tab: $url', async ({ url }) => {
      topTabUtils.setSelectedTab = jest.fn();
      handleDeeplink({ url });

      await waitFor(() => {
        expect(topTabUtils.setSelectedTab).toHaveBeenCalledWith('stash-tab');
      });
    });

    describe('Link triggered from EWA Push Notification', () => {
      test.each([
        {
          eventType: 'recurring_by_amount_successful_payment',
        },
        {
          eventType: 'recurring_by_day_successful_payment',
        },
      ])('should navigate directly to Instapay history screen for event: $eventType', async ({ eventType }) => {
        const url = `https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/earned-wage-access/${eventType}`;

        topTabUtils.setSelectedTab = jest.fn();
        const mockedSectionStore = jest.fn();
        useWithdrawYourEarnedPaySectionStore.setState = mockedSectionStore;
        handleDeeplink({ url });

        await waitFor(() => {
          expect(topTabUtils.setSelectedTab).toHaveBeenCalledWith('income-tab');
          expect(rootNavigation.navigateFromRoot).toHaveBeenCalledWith('SupportStack', {
            screen: 'InstaPayHistory',
          });
          expect(mockedSectionStore).toHaveBeenCalledWith({ selectedTabKey: 'Recurring' });
        });
      });

      test.each([
        {
          eventType: 'recurring_by_day_insufficient_balance',
        },
      ])('should navigate directly to Income tab for event: $eventType', async ({ eventType }) => {
        const url = `https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/earned-wage-access/${eventType}`;

        topTabUtils.setSelectedTab = jest.fn();
        const mockedSectionStore = jest.fn();
        useWithdrawYourEarnedPaySectionStore.setState = mockedSectionStore;
        handleDeeplink({ url });

        await waitFor(() => {
          expect(topTabUtils.setSelectedTab).toHaveBeenCalledWith('income-tab');
          expect(mockedSectionStore).toHaveBeenCalledWith({ selectedTabKey: 'Recurring' });
        });
      });
    });

    test('should return immediately when invalid url', async () => {
      const payload = {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/invalid',
      };
      handleDeeplink(payload);

      await waitFor(() => {
        expect(rootNavigation.navigateFromRoot).not.toBeCalled();
      });
    });

    test('should not do anything when invalid url', async () => {
      const payload = {
        url: 'https://mobile.staging.ehrocks.com/platform_redirect/platform_redirect/hero-wallet/123',
      };
      handleDeeplink(payload);

      await waitFor(() => {
        expect(rootNavigation.navigateFromRoot).not.toBeCalled();
      });
    });

    // this link is used for mimic app
    // https://mobile.staging.ehrocks.com/platform_redirect?web_url=https://mobile.staging.ehrocks.com/products/hero-wallet/&app_deep_path=platform_redirect/hero-wallet/instapay-now-intro
    // https://mobile.staging.ehrocks.com/platform_redirect?web_url=https://mobile.staging.ehrocks.com/products/hero-wallet/&app_deep_path=platform_redirect/hero-wallet/instapay-get-now
  });

  describe('Notification', () => {
    test.each([
      {
        payload: { type: NotificationCode.SPEND_REMINDER_AFTER_14DAYS } as NotificationPayload,
        expectation: {
          screenStack: 'NotificationStack',
          screen: 'TransactWithIncentive',
        },
      },
      {
        payload: { type: NotificationCode.CARD_ADDED_TO_WALLET } as NotificationPayload,
        expectation: {
          screenStack: 'CardManagementStack',
          screen: 'CardManagementDashboard',
        },
      },
      {
        payload: { type: NotificationCode.WALLET_PROVISIONING_REMINDER_AFTER_24HRS } as NotificationPayload,
        expectation: {
          screenStack: 'DigitalWalletStack',
          screen: 'DigitalWalletSetup',
          params: { isOnboarding: true },
        },
      },
    ])(
      'should navigate to: $expectation.screen after clicking notification badge',
      async ({ expectation, payload }) => {
        topTabUtils.setSelectedTab = jest.fn();
        handleNotificationNavigation(payload);

        await waitFor(() => {
          expect(topTabUtils.setSelectedTab).toHaveBeenCalledWith('spend-tab');
          expect(rootNavigation.navigateFromRoot).toHaveBeenCalledWith(expectation.screenStack, {
            screen: expectation.screen,
            params: expectation.params,
          });
        });
      }
    );
  });

  describe('Notification Lifecycle Tracking', () => {
    test('should navigate to super tab', async () => {
      const payload = {
        type: NotificationCode.SUPER_LIFECYCLE_OFFBOARDING,
        meta: { lifecycle_event_id: 'lifecycle_event_id' },
      } as NotificationPayload;
      handleNotificationNavigation(payload);

      await waitFor(() => {
        expect(topTabUtils.setSelectedTab).toHaveBeenCalledWith('super-tab');
      });
    });

    test('should send lifecycle tracking event', async () => {
      const payload = {
        type: NotificationCode.SUPER_LIFECYCLE_OFFBOARDING,
        meta: { lifecycle_event_id: 'lifecycle_event_id' },
      } as NotificationPayload;
      handleNotificationLifecycleTracking(payload, mockLifecycleTracking);

      expect(mockLifecycleTracking).toHaveBeenCalledWith({
        name: 'swag_notification_clicked',
        data: {
          event: 'offboarding',
        },
        event_id: 'lifecycle_event_id',
      });
    });
  });

  test('should not do anything when invalid notification type', () => {
    const payload = { type: 'invalid' } as NotificationPayload;
    handleNotificationNavigation(payload);

    expect(rootNavigation.navigateFromRoot).not.toBeCalled();
  });
});
