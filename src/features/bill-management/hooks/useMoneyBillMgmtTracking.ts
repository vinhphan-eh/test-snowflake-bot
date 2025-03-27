import { useMixpanel } from '../../../common/hooks/useMixpanel';
import {
  CLICK_BILL_SUBSCRIPTION_EVENT,
  CLICK_MAKE_PAYMENT_EVENT,
  MONEY_BILL_MODULE,
  VISIT_BILLING_INFO_PAGE_EVENT,
  VISIT_MONEY_BILL_PAGE_EVENT,
} from '../constant';

type SubscriptionTrackingParam = {
  provider: string;
  planType: string;
};
export const useMoneyBillMgmtTracking = () => {
  const { eventTracking } = useMixpanel();

  const trackClickBillSubscription = (params: SubscriptionTrackingParam) => {
    eventTracking({
      event: CLICK_BILL_SUBSCRIPTION_EVENT,
      categoryName: 'user action',
      metaData: {
        ...params,
        module: MONEY_BILL_MODULE,
      },
    });
  };

  const trackVisitMoneyBillPage = () => {
    eventTracking({
      event: VISIT_MONEY_BILL_PAGE_EVENT,
      categoryName: 'user action',
      metaData: {
        module: MONEY_BILL_MODULE,
      },
    });
  };

  const trackVisitBillingInfoPage = (params: SubscriptionTrackingParam) => {
    eventTracking({
      event: VISIT_BILLING_INFO_PAGE_EVENT,
      categoryName: 'user action',
      metaData: {
        ...params,
        module: MONEY_BILL_MODULE,
      },
    });
  };

  const trackClickMakePayment = (params: SubscriptionTrackingParam) => {
    eventTracking({
      event: CLICK_MAKE_PAYMENT_EVENT,
      categoryName: 'user action',
      metaData: {
        ...params,
        module: MONEY_BILL_MODULE,
      },
    });
  };

  return { trackClickBillSubscription, trackVisitMoneyBillPage, trackVisitBillingInfoPage, trackClickMakePayment };
};
