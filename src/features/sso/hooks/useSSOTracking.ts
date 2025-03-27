import { useMixpanel } from '../../../common/hooks/useMixpanel';
import { CLICK_BACK_TO_SWAG, SSO_MINIAPP_MODULE, VISIT_SSO_ERROR_SCREEN } from '../constants';

export const useSSOTracking = () => {
  const { eventTracking } = useMixpanel();

  const trackVisitSSOScreen = () => {
    eventTracking({
      event: VISIT_SSO_ERROR_SCREEN,
      categoryName: 'user action',
      metaData: {
        module: SSO_MINIAPP_MODULE,
      },
    });
  };

  const trackClickBackToSwag = () => {
    eventTracking({
      event: CLICK_BACK_TO_SWAG,
      categoryName: 'user action',
      metaData: {
        module: SSO_MINIAPP_MODULE,
      },
    });
  };

  return {
    trackVisitSSOScreen,
    trackClickBackToSwag,
  };
};
