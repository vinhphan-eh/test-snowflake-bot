import type Config from 'react-native-config';
import { create } from 'zustand';
import type { LoginProviderType } from '../auth/types/types';

export type LogOutParams = {
  userId: string;
  loginProvider: LoginProviderType;
};

export enum EventTrackingCategory {
  USER_ACTION = 'user action',
  NETWORK = 'network',
}

export type EventTrackingParams = {
  event: string;
  metaData: {
    // Require module name to categorize better
    module: string;
    [key: string]: unknown;
  };
  categoryName: `${EventTrackingCategory}`;
};

export type MixpanelTracking = {
  eventTracking: (params: EventTrackingParams) => void;
  screenTracking: (params: EventTrackingParams) => void;
};

const SwagUser = {
  NON_CURRENT_EMPLOYEE: 'non_current_employee',
  RANDOM_USER: 'random_user',
  CURRENT_EMPLOYEE: 'current_employee',
  PENDING_EMPLOYEE: 'pending_employee',
} as const;

type SwagUserKeys = keyof typeof SwagUser;

export type SwagUserType = (typeof SwagUser)[SwagUserKeys];

type CurrentUserAttribute = {
  terminated?: boolean;
};

export type CurrentSessionUser = {
  userID: string;
  loginProvider: LoginProviderType;
  attributes?: CurrentUserAttribute;
  isEhPayroll?: boolean;
  isOmopAccount?: boolean;
};

export const PILLARS = {
  SWAG_APP: 'SwagApp',
  WORK_APP: 'WorkApp',
  WALLET_APP: 'WalletApp',
  BENEFITS_APP: 'BenefitsApp',
  JOBS_APP: 'JobsApp',
  EXTERNAL_JOBS_APP: 'ExternalJobsApp',
} as const;

export type PillarIds = (typeof PILLARS)[keyof typeof PILLARS];

export type KpRelation = {
  employeeId?: number | null;
  businessId?: number | null;
  brandId?: number | null;
  partnerId?: number | null;
};

// this store values are from app core, getting through App Provider
interface SessionStore {
  superAppLogout?: (params: LogOutParams) => void;
  currentUser?: CurrentSessionUser;

  mixpanelTracking: MixpanelTracking;
  swagUserType?: SwagUserType;
  currentOrgId?: string;
  currentWorkzoneOrgId?: number;
  currentOrgUuid?: string;
  memberId?: string;
  // this ehCountryCode is fetched within our app
  ehCountryCode?: string | null;
  workzoneCountryCode?: string;
  // set current pillar
  setPillar?: (id: PillarIds) => void;
  handleFeedbackPrompt?: (event: string) => void;
  handleInternalRatingPrompt?: (event: string) => void;
  kpMetadatalite?: Array<KpRelation>;
  isLoadingKpMetadataLite?: boolean;
  sessionStatus?: string;
  swagRebrandEnabled?: boolean;
  swagTextAndImageRebrandEnabled?: boolean;
  getEnvConfig?: () => typeof Config;
  darkModeEnabled?: boolean;
}

export const useSessionStore = create<SessionStore>()(() => ({
  mixpanelTracking: {
    eventTracking: () => {},
    screenTracking: () => {},
  },
}));
