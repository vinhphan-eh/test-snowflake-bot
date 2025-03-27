import {
  StashStatus,
  useGetStashesQuery,
  type Maybe,
  type MoneyV2,
  type StashItem,
} from '../../../new-graphql/generated';

interface Params {
  id?: string;
  name?: string;
}

export interface StashDetails {
  balance: Maybe<MoneyV2> | undefined;
  closedAtUtc: string;
  createdAtUtc: string;
  id: string;
  imageUrl: string;
  name: string;
  status: StashStatus;
  targetAmount: Maybe<MoneyV2> | undefined;
}

export const convertStashToStashDetails = (stash: StashItem): StashDetails => ({
  balance: stash.balance,
  closedAtUtc: stash.closedAtUtc || '',
  createdAtUtc: stash.createdAtUtc || '',
  id: stash.id || '',
  imageUrl: stash.imageUrl || '',
  name: stash.name || '',
  status: stash.status || StashStatus.Closed,
  targetAmount: stash.targetAmount,
});

export const useGetStashDetails = ({ id, name }: Params): StashDetails => {
  const { data } = useGetStashesQuery();
  const stashes = (data?.me?.wallet?.stash?.items ?? []) as StashItem[];
  const stash = (stashes.find(item => item.id === id || item.name === name) ?? {}) as StashItem;
  return convertStashToStashDetails(stash);
};
