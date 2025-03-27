import { useBillPromotionPermission } from './useBillPromotionPermission';
import { useMixpanel } from '../../../../common/hooks/useMixpanel';
import { EventTrackingCategory } from '../../../../common/stores/useSessionStore';
import {
  VISIT_BILL_PAGE_EVENT,
  BENEFITS_BILL_MODULE,
  CLICK_ON_COMING_SOON_EVENT,
  VISIT_BILL_OFFER_DETAIL_PAGE_EVENT,
  CLICK_BILL_SIGN_UP_EVENT,
  CLICK_GOT_IT_EVENT,
  CLICK_GO_TO_BILL_MGMT_EVENT,
  CLICK_GO_BACK_TO_BILL_EVENT,
  SELECT_STATE_TO_VIEW_SE_OFFER,
  BILL_MGMT_MODULE_NAME,
  CLICK_OFFER_TILE_EVENT,
} from '../constants';

export const useBenefitsBillMgmtTracking = () => {
  const { eventTracking } = useMixpanel();
  const { havingPermission: isPromotion } = useBillPromotionPermission();

  const trackVisitBillPage = () => {
    eventTracking({
      event: VISIT_BILL_PAGE_EVENT,
      categoryName: 'user action',
      metaData: {
        module: BENEFITS_BILL_MODULE,
        promotion: isPromotion ? 'HP x ENGIE Offer' : '',
      },
    });
  };

  const trackClickOnComingSoon = () => {
    eventTracking({
      event: CLICK_ON_COMING_SOON_EVENT,
      categoryName: 'user action',
      metaData: {
        module: BENEFITS_BILL_MODULE,
        promotion: isPromotion ? 'HP x ENGIE Offer' : '',
      },
    });
  };

  const trackClickOnBillTile = (provider: string) => {
    eventTracking({
      event: CLICK_OFFER_TILE_EVENT,
      categoryName: 'user action',
      metaData: {
        provider,
        module: BENEFITS_BILL_MODULE,
        promotion: isPromotion ? 'HP x ENGIE Offer' : '',
      },
    });
  };

  const trackVisitBillOfferDetail = (provider: string) => {
    eventTracking({
      event: VISIT_BILL_OFFER_DETAIL_PAGE_EVENT,
      categoryName: 'user action',
      metaData: {
        provider,
        module: BENEFITS_BILL_MODULE,
        promotion: isPromotion ? 'HP x ENGIE Offer' : '',
      },
    });
  };

  const trackClickOnSignUp = (signUpLink: string, provider: string) => {
    eventTracking({
      event: CLICK_BILL_SIGN_UP_EVENT,
      categoryName: 'user action',
      metaData: {
        module: BENEFITS_BILL_MODULE,
        signUpLink,
        promotion: isPromotion ? 'HP x ENGIE Offer' : '',
        provider,
      },
    });
  };

  const trackClickGotIt = (provider: string) => {
    eventTracking({
      event: CLICK_GOT_IT_EVENT,
      categoryName: 'user action',
      metaData: {
        module: BENEFITS_BILL_MODULE,
        promotion: isPromotion ? 'HP x ENGIE Offer' : '',
        provider,
      },
    });
  };

  const trackClickGoToBillMgmt = () => {
    eventTracking({
      event: CLICK_GO_TO_BILL_MGMT_EVENT,
      categoryName: 'user action',
      metaData: {
        module: BENEFITS_BILL_MODULE,
        promotion: isPromotion ? 'HP x ENGIE Offer' : '',
      },
    });
  };

  const trackClickGoBackToBill = (provider: string) => {
    eventTracking({
      event: CLICK_GO_BACK_TO_BILL_EVENT,
      categoryName: 'user action',
      metaData: {
        module: BENEFITS_BILL_MODULE,
        promotion: isPromotion ? 'HP x ENGIE Offer' : '',
        provider,
      },
    });
  };

  const trackSelectStateToViewSEOffer = (state: string) => {
    eventTracking({
      event: SELECT_STATE_TO_VIEW_SE_OFFER,
      categoryName: EventTrackingCategory.USER_ACTION,
      metaData: {
        module: BILL_MGMT_MODULE_NAME,
        state,
        promotion: isPromotion ? 'HP x ENGIE Offer' : '',
      },
    });
  };

  return {
    trackVisitBillPage,
    trackClickOnComingSoon,
    trackClickOnBillTile,
    trackVisitBillOfferDetail,
    trackClickOnSignUp,
    trackClickGotIt,
    trackClickGoToBillMgmt,
    trackClickGoBackToBill,
    trackSelectStateToViewSEOffer,
  };
};
