import { useHasActiveBillSubscription } from './useHasActiveBillSubscription';
import { useSessionStore } from '../../../common/stores/useSessionStore';
import { useBillStreamPermission } from '../../benefits/bill-streaming/hooks/useBillStreamPermission';

export const useBillManagementMoneyAccess = () => {
  const { permission: billStreamingPermission } = useBillStreamPermission();
  const isTerminated = useSessionStore(state => state.currentUser?.attributes?.terminated);
  const { hasBillSubscription } = useHasActiveBillSubscription();

  return {
    permission: hasBillSubscription || (!isTerminated && billStreamingPermission),
  };
};
