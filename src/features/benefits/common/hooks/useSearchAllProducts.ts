import { useCashbackPermission } from './useCashbackPermission';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import type { Advertiser } from '../../../../new-graphql/generated';
import { OfferType, Pid, useSearchAllProductsQuery } from '../../../../new-graphql/generated';
import {
  useBillStreamPermission,
  useBillStreamPermissionByProvider,
} from '../../bill-streaming/hooks/useBillStreamPermission';
import { useSwagStorePermission } from '../../swag-store/hooks/useSwagStorePermission';
import type { CategoryCode } from '../constants/benefits';
import { CategoryCodes } from '../constants/benefits';

export type SearchAllParams = {
  query: string;
  categoryCode: string;
  itemPerPage: number;
  latitude: number;
  longitude: number;
  allowDataToLoad: boolean;
};

const validGiftCardCategories: CategoryCode[] = ['giftcard', 'all'];

export const useSearchAllProducts = (params: SearchAllParams) => {
  const { categoryCode, itemPerPage, latitude, longitude, query } = params;
  const currentOrgId = useSessionStore(state => state.currentOrgId ?? '');
  const { isFetched: isFetchedBill, permission: billStreamPermission } = useBillStreamPermission();
  const { isFetched: isFetchedSwagStore, permission: swagStorePermission } = useSwagStorePermission();
  const { isFetched: isFetchedCashback, permission: cashbackPermission } = useCashbackPermission();

  // use to check which product should be loaded/showed base on category tab/code
  const shouldLoadSwagStore = validGiftCardCategories.includes(categoryCode as CategoryCode) && swagStorePermission;
  const shouldLoadCashback = cashbackPermission && categoryCode !== CategoryCodes.GiftCard;

  const { data, isError, isLoading } = useSearchAllProductsQuery(
    {
      onlineInput: {
        first: itemPerPage,
        query,
        // all: don't pass categoryCode to load all cashback offers
        ...(categoryCode !== CategoryCodes.All ? { categoryCode } : {}),
      },
      instoreInput: {
        type: OfferType.Instore,
        first: itemPerPage,
        query,
        latitude,
        longitude,
        // all: don't pass categoryCode to load all cashback offers
        ...(categoryCode !== CategoryCodes.All ? { categoryCode } : {}),
      },
      billInput: {
        first: itemPerPage,
        query,
        ...(categoryCode !== CategoryCodes.All ? { categoryCode } : {}),
      },
      ssInput: {
        first: itemPerPage,
        query,
        orgId: currentOrgId,
        // it won't load gift card if category code isn't giftcard
        ...(shouldLoadSwagStore ? { categoryCode: CategoryCodes.GiftCard } : {}),
      },
    },
    { enabled: isFetchedBill && isFetchedSwagStore && isFetchedCashback && params.allowDataToLoad, cacheTime: 0 }
  );

  const onlineCashbackOffers = shouldLoadCashback
    ? data?.me?.cashback?.onlineOffers?.edges.map(e => e?.node) ?? []
    : [];

  const instoreCashbackAdvertisers = (
    shouldLoadCashback ? data?.me?.cashback?.instoreAdvertisers?.edges.map(e => e?.node) ?? [] : []
  ) as Advertiser[];

  const { permission: billENGIEPromoPermission } = useBillStreamPermissionByProvider(Pid.SimplyEnergy);
  const { permission: billAhmPromoPermission } = useBillStreamPermissionByProvider(Pid.Ahm);
  const { permission: billMedibankPermission } = useBillStreamPermissionByProvider(Pid.Medibank);
  const { permission: billFitnessFirstPermission } = useBillStreamPermissionByProvider(Pid.FitnessFirst);
  const { permission: billGoodlifeHealthClubsPermission } = useBillStreamPermissionByProvider(Pid.GoodlifeHealthClubs);

  let billOffers = billStreamPermission ? data?.me?.billManagement?.offersV3?.edges.map(e => e?.node) ?? [] : [];

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

  const ssOffers = shouldLoadSwagStore ? data?.me?.swagStore?.allOffers?.edges.map(e => e?.node) ?? [] : [];

  return {
    onlineCashbackOffers,
    billOffers,
    ssOffers,
    isLoading,
    isError,
    shouldLoadBill: billStreamPermission,
    shouldLoadSwagStore,
    shouldLoadCashback,
    instoreCashbackAdvertisers,
  };
};
