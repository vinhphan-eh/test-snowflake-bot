import { usePaySplitABTesting } from './usePaySplitABTesting';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { PAY_SPLIT_MODULE_NAME } from '../constants/trackingEvents';

export interface PaySplitTrackingParams {
  targetOrgId: string;
  targetMemberId: string;
  [otherField: string]: unknown;
}

/**
 * Track Pay Split A/B testing with some predefined data
 */
export const useTrackPaySplitABTesting = () => {
  const { testingGroup } = usePaySplitABTesting();
  const { mixpanelTracking } = useSessionStore();

  const trackEvent = (event: string, params: PaySplitTrackingParams) => {
    mixpanelTracking?.eventTracking({
      event,
      categoryName: 'user action',
      metaData: {
        module: PAY_SPLIT_MODULE_NAME,
        testingGroup,
        ...params,
      },
    });
  };

  return { trackEvent };
};
