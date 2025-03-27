import { useMixpanel } from '../../../../common/hooks/useMixpanel';
import { EventTrackingCategory } from '../../../../common/stores/useSessionStore';
import { BILL_MGMT_MODULE_NAME, CLICK_JOIN_THE_WAITLIST } from '../constants';

const useTrack = () => {
  const { eventTracking } = useMixpanel();
  return {
    trackJoinHealthInsuranceWaitlist: (userId: string) => {
      eventTracking({
        event: CLICK_JOIN_THE_WAITLIST,
        categoryName: EventTrackingCategory.USER_ACTION,
        metaData: {
          module: BILL_MGMT_MODULE_NAME,
          userId,
        },
      });
    },
  };
};

export default useTrack;
