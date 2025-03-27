import { create } from 'zustand';

type MembershipDetail = {
  abn: string;
  fundType: string;
  fundName: string;
  memberNumber: string;
  usi: string;
};

export type ActiveMembershipStore = {
  membershipDetail: MembershipDetail | null;
};

type ActiveMembershipStoreActions = {
  clearMembershipDetail: () => void;
  saveMembershipDetail: (membership: MembershipDetail) => void;
};

const initialData: ActiveMembershipStore = {
  membershipDetail: null,
};

export const useActiveMembershipStore = create<ActiveMembershipStore & ActiveMembershipStoreActions>()(set => ({
  ...initialData,
  saveMembershipDetail: membership => {
    set({ membershipDetail: membership });
  },
  clearMembershipDetail: () => set({ ...initialData }),
}));
