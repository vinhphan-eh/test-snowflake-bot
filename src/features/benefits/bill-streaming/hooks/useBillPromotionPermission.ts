import { useHeroPointsVisibility } from '../../../../common/hooks/useHeroPointsVisibility';
import { useIsCandidateV2 } from '../../../../common/hooks/useIsCandidate';
import { useIsEligibleForPromotionQuery } from '../../../../new-graphql/generated';

export const useBillPromotionPermission = (providerId?: string) => {
  const isCandidate = useIsCandidateV2();
  const heroPointsVisibility = useHeroPointsVisibility();
  const { data, isFetched } = useIsEligibleForPromotionQuery({
    input: {
      isCandidate,
      heroPointsFF: heroPointsVisibility,
    },
  });
  const isEligible = data?.me?.billManagement?.isEligibleForPromotion;
  return {
    havingPermission: isEligible && providerId === 'SIMPLY_ENERGY',
    isFetched,
  };
};
