import { useBillStreamPermission, useBillStreamPermissionByProvider } from './useBillStreamPermission';
import { Pid, useGetBmOfferQuery } from '../../../../new-graphql/generated';
import { CategoryCodes } from '../../common/constants/benefits';

export type SearchAllOnlineOffersParams = {
  query?: string;
  categoryCode?: string;
};

export const useGetAllBillOffers = ({ categoryCode, query = '' }: SearchAllOnlineOffersParams) => {
  const { permission: billPermission } = useBillStreamPermission();
  const { isFetched: isBillENGIEPermissionFetched, permission: billENGIEPromoPermission } =
    useBillStreamPermissionByProvider(Pid.SimplyEnergy);
  const { isFetched: isBillAhmPermissionFetched, permission: billAhmPromoPermission } =
    useBillStreamPermissionByProvider(Pid.Ahm);
  const { isFetched: isBillMedibankPermissionFetched, permission: billMedibankPermission } =
    useBillStreamPermissionByProvider(Pid.Medibank);
  const { isFetched: isFitnessFirstPermissionFetched, permission: billFitnessFirstPermission } =
    useBillStreamPermissionByProvider(Pid.FitnessFirst);
  const { isFetched: isGoodlifeHealthClubsPermissionFetched, permission: billGoodlifeHealthClubsPermission } =
    useBillStreamPermissionByProvider(Pid.GoodlifeHealthClubs);
  const {
    data: bmOfferResponse,
    isError,
    isLoading: isGetBmOfferLoading,
  } = useGetBmOfferQuery(
    {
      input: {
        query,
        ...(categoryCode !== CategoryCodes.All ? { categoryCode } : {}),
      },
    },
    { enabled: billPermission }
  );

  const allBillOffersEdges = bmOfferResponse?.me?.billManagement?.offersV3.edges ?? [];
  let billOffers = allBillOffersEdges.map(edge => edge.node);

  if (!billENGIEPromoPermission) {
    billOffers = billOffers.filter(offer => offer.provider.id !== Pid.SimplyEnergy);
  }
  if (!billAhmPromoPermission) {
    billOffers = billOffers.filter(offer => offer.provider.id !== Pid.Ahm);
  }
  if (!billMedibankPermission) {
    billOffers = billOffers.filter(offer => offer.provider.id !== Pid.Medibank);
  }
  if (!billFitnessFirstPermission) {
    billOffers = billOffers.filter(offer => offer.provider.id !== Pid.FitnessFirst);
  }
  if (!billGoodlifeHealthClubsPermission) {
    billOffers = billOffers.filter(offer => offer.provider.id !== Pid.GoodlifeHealthClubs);
  }

  return {
    billOffers,
    isError,
    isLoading:
      isGetBmOfferLoading ||
      !isBillAhmPermissionFetched ||
      !isBillMedibankPermissionFetched ||
      !isBillENGIEPermissionFetched ||
      !isFitnessFirstPermissionFetched ||
      !isGoodlifeHealthClubsPermissionFetched,
  };
};
