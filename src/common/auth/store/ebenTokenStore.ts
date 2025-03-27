import { create } from 'zustand';
import type { EbenToken } from '../../libs/storage/types';

/**
 * Success: token is valid to use, no need to exchange
 * Failed: token is failed to exchange, do not retry
 * Can Exchange: no exchange attempt happens yet, can exchange token
 */

const STATUSES = {
  SUCCESS: 'success',
  FAILED: 'failed',
  CAN_EXCHANGE: 'can_exchange',
} as const;

type EbenTokenStatus = (typeof STATUSES)[keyof typeof STATUSES];

interface EbenTokenStore {
  tokenStatus: EbenTokenStatus;
  token: EbenToken | null;
}
export const useEbenTokenStore = create<EbenTokenStore>()(() => ({
  tokenStatus: 'can_exchange',
  token: null,
}));

export const useEbenTokenStatus = () => useEbenTokenStore(state => state.tokenStatus);

export const useEbenTokenValidForQuery = () => {
  const status = useEbenTokenStore(state => state.tokenStatus);
  return status === 'success' || status === 'can_exchange';
};

export const setEbenTokenStatus = (status: EbenTokenStatus) => {
  const currentStatus = useEbenTokenStore.getState().tokenStatus;
  // do not update status to can_exchange if it is already success -> they mean the same thing
  // TODO: there is a rendering issue at Swag that causes the status to be set to can_exchange, to investigate
  if (status === 'can_exchange' && currentStatus === 'success') {
    return;
  }
  useEbenTokenStore.setState({
    tokenStatus: status,
  });
};

export const setEbenTokenToStore = (token: EbenToken) => useEbenTokenStore.setState({ token });

export const getEBenTokenFromStore = () => useEbenTokenStore.getState().token;

export const clearEbenTokenFromStore = () => useEbenTokenStore.setState({ token: null, tokenStatus: 'can_exchange' });
