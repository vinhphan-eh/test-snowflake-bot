import { useSessionStore } from '../stores/useSessionStore';

/**
 * Checks the account membership table, an empty table (not a member) means they are a candidate
 */

export const useIsCandidateV2 = () => {
  const swagUserType = useSessionStore(state => state.swagUserType);
  return swagUserType === 'non_current_employee' || swagUserType === 'random_user';
};
