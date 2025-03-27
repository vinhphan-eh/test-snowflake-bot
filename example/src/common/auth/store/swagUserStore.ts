import type {
  CurrentSessionUser,
  SwagUserType,
} from '../../../../../src/common/stores/useSessionStore';
import { create } from 'zustand';

export interface SwagUserTypeStore {
  swagUserType?: SwagUserType;

  currentUser: CurrentSessionUser;
  currentOrgId: string;
  memberId: string;
  currentOrgUuid: string;
  workzoneCountryCode: string;
}

/**
 * Mimic store for swag user
 */
export const useSwagUserStore = create<SwagUserTypeStore>()(() => ({
  swagUserType: undefined,
  currentUser: {
    isEhPayroll: undefined,
    userID: '',
    loginProvider: undefined,
    attributes: {
      terminated: false,
    },
    email: '',
  },
  currentOrgId: '',
  memberId: '',
  currentOrgUuid: '',
  workzoneCountryCode: '',
}));
