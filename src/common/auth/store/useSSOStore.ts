import { create } from 'zustand';

export const SSO_STATUSES = {
  // status from super app: 'disabled' | 'required' | 'completed'
  DISABLED: 'disabled',
  REQUIRED: 'required',
  COMPLETED: 'completed',
} as const;

export type SSOStatus = (typeof SSO_STATUSES)[keyof typeof SSO_STATUSES];
type HandleSSOParams = {
  onSuccess?: () => void;
  onFailure?: () => void;
  onCancel?: () => void;
};

export type SSOStoreData = {
  /**
   * status of SSO fetched at app launch, could be outdated if SSO setting is changed suddenly by admin,
   * reactively updated if status is changed by user action, ex: during handleSSOFlow
   */
  status?: SSOStatus;
  handleSSOFlow?: (params: HandleSSOParams) => void;
  /**
   * get fresh SSO status from the server to avoid outdated status
   */
  checkStatus?: () => Promise<SSOStatus>;
};

export const useSSOStore = create<SSOStoreData>(() => ({}));
