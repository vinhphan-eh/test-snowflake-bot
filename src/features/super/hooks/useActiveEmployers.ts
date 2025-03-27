import { trimedUsi } from './useActiveSuperfundMemberships';
import { useGetActiveSuperfundMembershipsQuery } from '../../../new-graphql/generated';

export const useActiveEmployers = () => {
  const { data, isLoading } = useGetActiveSuperfundMembershipsQuery();

  const orgs = data?.me?.orgs || [];

  const currentSwagSuperfundUsi = data?.me?.swagSuperfund?.usi;

  // Only shows org that has activeSuperfundMembership usi matched with swagSuperfund usi
  const activeEmployers = orgs.filter(org => {
    const activeMembershipUsi = org.activeSuperfundMembership?.usi;

    if (activeMembershipUsi && currentSwagSuperfundUsi) {
      return trimedUsi(activeMembershipUsi) === trimedUsi(currentSwagSuperfundUsi);
    }
    return false;
  });

  return {
    isLoading,
    activeEmployers,
  };
};
