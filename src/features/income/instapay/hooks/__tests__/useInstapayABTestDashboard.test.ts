import { mockReturnIncomeVisibility } from '../../../../../common/hooks/__mocks__/useIncomeVisibility';
import { mockUseLoadBrazeContentCards } from '../../../../../common/hooks/__mocks__/useLoadBrazeContentCards';
import { mockUsePureMoneyPillarPermission } from '../../../../../common/hooks/__mocks__/usePureMoneyPillarPermission';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { renderHook } from '../../../../../common/utils/testing';
import { mockUsePrefetchInstapayBalance } from '../../components/instapay-exp-popup/hooks/__mocks__/usePrefetchInstapayBalance';
import { useInstapayABTestDashboard } from '../useInstapayABTestDashboard';

describe('useInstapayABTestDashboard', () => {
  describe('showTestimonialCard', () => {
    it.each`
      moneyPillarAccess | showInstapay | instapayNowUnderMaintenance | featureFlag | brazeCard | expected
      ${true}           | ${true}      | ${false}                    | ${true}     | ${true}   | ${true}
      ${true}           | ${true}      | ${false}                    | ${true}     | ${false}  | ${false}
      ${true}           | ${true}      | ${false}                    | ${false}    | ${true}   | ${false}
      ${true}           | ${true}      | ${true}                     | ${true}     | ${true}   | ${false}
      ${true}           | ${true}      | ${true}                     | ${true}     | ${false}  | ${false}
      ${true}           | ${true}      | ${true}                     | ${false}    | ${true}   | ${false}
      ${true}           | ${true}      | ${true}                     | ${false}    | ${false}  | ${false}
      ${true}           | ${false}     | ${false}                    | ${true}     | ${true}   | ${false}
      ${true}           | ${false}     | ${false}                    | ${true}     | ${false}  | ${false}
      ${true}           | ${false}     | ${false}                    | ${false}    | ${true}   | ${false}
      ${true}           | ${false}     | ${false}                    | ${false}    | ${false}  | ${false}
      ${true}           | ${false}     | ${true}                     | ${true}     | ${true}   | ${false}
      ${true}           | ${false}     | ${true}                     | ${true}     | ${false}  | ${false}
      ${true}           | ${false}     | ${true}                     | ${false}    | ${true}   | ${false}
      ${true}           | ${false}     | ${true}                     | ${false}    | ${false}  | ${false}
      ${false}          | ${true}      | ${false}                    | ${true}     | ${true}   | ${false}
    `(
      'should work correctly',
      ({ brazeCard, expected, featureFlag, instapayNowUnderMaintenance, moneyPillarAccess, showInstapay }) => {
        mockUsePureMoneyPillarPermission.mockReturnValue({ permission: moneyPillarAccess, isFetched: true });

        mockUsePrefetchInstapayBalance.mockReturnValue({
          hasBalance: false,
          hasZeroBalance: false,
        });

        mockReturnIncomeVisibility({
          showInstapay,
          showIncomeTab: true,
          instapayNowUnderMaintenance,
        });

        const permissionStore = renderHook(() => usePermissionStore());
        permissionStore.result.current.permissions = {
          instapayAbTestBannerDashboard: {
            view: featureFlag,
          },
        } as never;

        if (brazeCard) {
          mockUseLoadBrazeContentCards.mockReturnValue({
            cards: [{ extras: { id: 'instapay_testimonial_card' } } as never],
            requestContentCardsRefresh: () => Promise.resolve([]),
            logCustomEvent: () => {},
          });
        } else {
          mockUseLoadBrazeContentCards.mockReturnValue({
            cards: [],
            requestContentCardsRefresh: () => Promise.resolve([]),
            logCustomEvent: () => {},
          });
        }

        const { result } = renderHook(() => useInstapayABTestDashboard());
        expect(result.current.showTestimonialCard).toBe(expected);
      }
    );
  });

  describe('showBannerPopup', () => {
    it.each`
      hasBalance | moneyPillarAccess | showInstapay | instapayNowUnderMaintenance | featureFlag | brazeCard | expected
      ${true}    | ${true}           | ${true}      | ${false}                    | ${true}     | ${true}   | ${true}
      ${true}    | ${true}           | ${true}      | ${false}                    | ${true}     | ${false}  | ${false}
      ${true}    | ${true}           | ${true}      | ${false}                    | ${false}    | ${true}   | ${false}
      ${true}    | ${true}           | ${true}      | ${true}                     | ${true}     | ${true}   | ${false}
      ${true}    | ${true}           | ${true}      | ${true}                     | ${true}     | ${false}  | ${false}
      ${true}    | ${true}           | ${true}      | ${true}                     | ${false}    | ${true}   | ${false}
      ${true}    | ${true}           | ${true}      | ${true}                     | ${false}    | ${false}  | ${false}
      ${true}    | ${true}           | ${false}     | ${false}                    | ${true}     | ${true}   | ${false}
      ${true}    | ${true}           | ${false}     | ${false}                    | ${true}     | ${false}  | ${false}
      ${true}    | ${true}           | ${false}     | ${false}                    | ${false}    | ${true}   | ${false}
      ${true}    | ${true}           | ${false}     | ${false}                    | ${false}    | ${false}  | ${false}
      ${true}    | ${true}           | ${false}     | ${true}                     | ${true}     | ${true}   | ${false}
      ${true}    | ${true}           | ${false}     | ${true}                     | ${true}     | ${false}  | ${false}
      ${true}    | ${true}           | ${false}     | ${true}                     | ${false}    | ${true}   | ${false}
      ${true}    | ${true}           | ${false}     | ${true}                     | ${false}    | ${false}  | ${false}
      ${true}    | ${false}          | ${true}      | ${false}                    | ${true}     | ${true}   | ${false}
      ${false}   | ${true}           | ${true}      | ${false}                    | ${true}     | ${true}   | ${false}
    `(
      'should work correctly',
      ({
        brazeCard,
        expected,
        featureFlag,
        hasBalance,
        instapayNowUnderMaintenance,
        moneyPillarAccess,
        showInstapay,
      }) => {
        mockUsePureMoneyPillarPermission.mockReturnValue({ permission: moneyPillarAccess, isFetched: true });

        mockUsePrefetchInstapayBalance.mockReturnValue({
          hasBalance,
          hasZeroBalance: false,
        });

        mockReturnIncomeVisibility({
          showInstapay,
          showIncomeTab: true,
          instapayNowUnderMaintenance,
        });

        const permissionStore = renderHook(() => usePermissionStore());
        permissionStore.result.current.permissions = {
          instapayAbTestBannerDashboard: {
            view: featureFlag,
          },
        } as never;

        if (brazeCard) {
          mockUseLoadBrazeContentCards.mockReturnValue({
            cards: [{ extras: { id: 'instapay_abtest_banner_dashboard' } } as never],
            requestContentCardsRefresh: () => Promise.resolve([]),
            logCustomEvent: () => {},
          });
        } else {
          mockUseLoadBrazeContentCards.mockReturnValue({
            cards: [],
            requestContentCardsRefresh: () => Promise.resolve([]),
            logCustomEvent: () => {},
          });
        }

        const { result } = renderHook(() => useInstapayABTestDashboard());
        expect(result.current.showBannerPopup).toBe(expected);
      }
    );
  });
});
