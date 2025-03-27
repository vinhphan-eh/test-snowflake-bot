import type { HrOrg } from '../../../new-graphql/generated';

export type ActiveMembership = {
  id: string;
  fundName: string;
  fundType: string;
  memberId: string;
  memberUuid: string;
  abn: string;
  usi: string;
  memberNumber: string;
  orgNames: string[];
  updatedAt: Date | undefined;
};

type SuperfundMembership = Omit<Partial<HrOrg>, 'paySlip'>;

type ActiveMembershipParams = {
  memberships?: SuperfundMembership[];
};

export const trimedUsi = (usi: string) => usi.replace(/\s/g, '');

export const useActiveSuperfundMemberships = ({
  memberships,
}: ActiveMembershipParams): { membershipsData: ActiveMembership[] } => {
  if (!memberships) {
    return {
      membershipsData: [],
    };
  }

  const groupedMemberships = Object.values(
    memberships.reduce((acc, membership) => {
      const { abn, fundChoice, fundName, memberNumber, updatedAt, usi } = membership.activeSuperfundMembership || {};
      const { memberId, memberUuid, name: orgName, uuid } = membership;

      if (orgName && memberNumber && usi) {
        // Group by memberNumber and usi
        const key = `${trimedUsi(usi)}-${memberNumber}`;

        if (!acc[key]) {
          acc[key] = {
            id: uuid || '',
            abn: abn || '',
            memberId: memberId?.toString() || '',
            memberUuid: memberUuid || '',
            fundType: fundChoice || '',
            fundName: fundName || '',
            memberNumber,
            usi: trimedUsi(usi),
            orgNames: [orgName],
            updatedAt: updatedAt ? new Date(updatedAt?.toString()) : undefined,
          };
        } else {
          acc[key].orgNames.push(orgName);
        }
      }

      return acc;
    }, {} as Record<string, ActiveMembership>)
  );

  return {
    membershipsData: groupedMemberships,
  };
};
