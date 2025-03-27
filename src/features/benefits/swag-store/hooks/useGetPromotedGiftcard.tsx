import { useGetSuperAppToken } from '../../../../common/auth/store/useSuperAppTokenStore';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { isEnabledForEh } from '../../../../common/types/react-query';
import { usePopularGiftCardsQuery } from '../../../../graphql/generated';
import { useGetBuyAgainGiftCardsQuery } from '../../../../new-graphql/generated';

export type PromotedGiftcardType = 'popular' | 'buy again';
export const useGetPromotedGiftcard = ({ type }: { type: PromotedGiftcardType }) => {
  const { loginProvider, token } = useGetSuperAppToken('useGetPromotedGiftcard');
  const orgId = useSessionStore(state => state.currentOrgId ?? '');
  const buyAgainResponse = useGetBuyAgainGiftCardsQuery(
    { input: { orgId } },
    { enabled: !!orgId && type === 'buy again' && isEnabledForEh(token, loginProvider) }
  );

  const popularResponse = usePopularGiftCardsQuery(
    { ehToken: token ?? '', orgId },
    { enabled: !!orgId && type === 'popular' && isEnabledForEh(token, loginProvider) }
  );

  return type === 'buy again' ? buyAgainResponse : popularResponse;
};
