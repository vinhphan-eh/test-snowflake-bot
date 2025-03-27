import { create } from 'zustand';
import { userInputToMachineNumber } from '../../../common/utils/numbers';

interface SubmitSuperContributionData {
  contributionType: string;
  setContributionType: (name: string) => void;
  contributionValue: string;
  setContributionValue: (value: string) => void;
  preserveAmount: string;
  setPreserveAmount: (preserveAmount: string) => void;
  isContributionEnded: boolean;
  setContributionEnded: (isContributionEnded: boolean) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate?: string;
  setEndDate: (date: string | undefined) => void;
  membershipUuid: string;
  setMembershipUuid: (membershipUuid: string) => void;
  orgNames: string;
  setOrgNames: (orgNames: string) => void;
  isCreatedOrUpdatedContribution: boolean;
  setCreatedOrUpdatedContribution: (isCreatedOrUpdatedContribution: boolean) => void;
  acknowledgedNoContributionTracking: boolean;
  setAcknowledgedNoContributionTracking: (acknowledgedNoContributionTracking: boolean) => void;
  resetData: () => void;
}

const useSubmitSuperContributionStore = create<SubmitSuperContributionData>()(set => ({
  contributionType: '',
  setContributionType: (contributionType: string) => set({ contributionType }),
  contributionValue: '',
  setContributionValue: (contributionValue: string) =>
    set({ contributionValue: userInputToMachineNumber({ inputValue: contributionValue }) }),
  preserveAmount: '',
  setPreserveAmount: (preserveAmount: string) =>
    set({ preserveAmount: userInputToMachineNumber({ inputValue: preserveAmount }) }),
  isContributionEnded: false,
  setContributionEnded: (isContributionEnded: boolean) => set({ isContributionEnded }),
  startDate: '',
  setStartDate: (startDate: string) => set({ startDate }),
  endDate: undefined,
  setEndDate: (endDate: string | undefined) => set({ endDate }),
  membershipUuid: '',
  setMembershipUuid: (membershipUuid: string) => set({ membershipUuid }),
  orgNames: '',
  setOrgNames: (orgNames: string) => set({ orgNames }),
  isCreatedOrUpdatedContribution: false,
  setCreatedOrUpdatedContribution: (isCreatedOrUpdatedContribution: boolean) => set({ isCreatedOrUpdatedContribution }),
  acknowledgedNoContributionTracking: false,
  setAcknowledgedNoContributionTracking: (acknowledgedNoContributionTracking: boolean) =>
    set({ acknowledgedNoContributionTracking }),
  resetData: () =>
    set({
      contributionType: '',
      contributionValue: '',
      preserveAmount: '',
      isContributionEnded: false,
      startDate: '',
      endDate: undefined,
      acknowledgedNoContributionTracking: false,
    }),
}));

export { useSubmitSuperContributionStore };
