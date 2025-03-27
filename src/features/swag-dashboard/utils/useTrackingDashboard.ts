import { useMixpanel } from '../../../common/hooks/useMixpanel';
import { EventTrackingCategory } from '../../../common/stores/useSessionStore';
import { CASHBACK_WIDGET, CLICK_DASHBOARD_WIDGETS_ACTION, DASHBOARD_MODULE } from '../constants';

const useTrackingDashboard = () => {
  const { eventTracking } = useMixpanel();

  return {
    trackingClickOnDashboardWidget: (widget: string) =>
      eventTracking({
        event: CLICK_DASHBOARD_WIDGETS_ACTION,
        categoryName: EventTrackingCategory.USER_ACTION,
        metaData: {
          module: DASHBOARD_MODULE,
          widget,
        },
      }),
    trackingClickOnDashboardCashbackWidget: (supplier: string) =>
      eventTracking({
        event: CLICK_DASHBOARD_WIDGETS_ACTION,
        categoryName: EventTrackingCategory.USER_ACTION,
        metaData: {
          module: DASHBOARD_MODULE,
          widget: CASHBACK_WIDGET,
          supplier,
        },
      }),
  };
};

export default useTrackingDashboard;
