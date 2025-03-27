import { useLoadBrazeContentCards } from '../../../../common/hooks/useLoadBrazeContentCards';
import { usePrefetchIncomeVisibility } from '../../../../common/hooks/usePrefetchIncomeVisibility';
import { usePureMoneyPillarPermission } from '../../../../common/hooks/usePureMoneyPillarPermission';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { usePrefetchInstapayBalance } from '../components/instapay-exp-popup/hooks/usePrefetchInstapayBalance';
import { BannerIds, INSTAPAY_TESTIMONIAL_CARD } from '../constants/braze';

export const useInstapayABTestDashboard = () => {
  const { permission: moneyPillarAccess } = usePureMoneyPillarPermission();
  const { instapayNowUnderMaintenance, showInstapay } = usePrefetchIncomeVisibility();
  const { hasBalance } = usePrefetchInstapayBalance('useInstapayPopupBanner');
  const featureFlag = usePermissionStore(state => state?.permissions?.instapayAbTestBannerDashboard?.view ?? false);

  const { cards } = useLoadBrazeContentCards();
  const instapayTestimonialCard = cards?.find(card => card.extras?.id === INSTAPAY_TESTIMONIAL_CARD);
  const bannerCard = cards?.find(card => card.extras?.id === BannerIds.SWAGDB_POPUP_BANNER);

  const showTestimonialCard = featureFlag && moneyPillarAccess && showInstapay && !instapayNowUnderMaintenance;
  const showBannerPopup = showTestimonialCard && hasBalance && !!bannerCard;

  return { showTestimonialCard: showTestimonialCard && !!instapayTestimonialCard, showBannerPopup };
};
