import { StashStatus, type StashItem } from '../../../new-graphql/generated';
import { aMoneyV2 } from '../../../new-graphql/mocks/generated-mocks';

export const EXAMPLE_STASH = {
  id: 'stashId',
  name: 'Holiday Stash',
  image: 'stashImage05',
  targetAmount: 500,
};

export const EXAMPLE_STASH_CREATED: StashItem = {
  id: 'stashId',
  name: 'Holiday Stash',
  targetAmount: aMoneyV2({ units: 500 }),
  balance: aMoneyV2({ units: 0, subUnits: 0 }),
  imageUrl: 'stashImage12',
  createdAtUtc: '2023-04-13T08:53:15.492292Z',
  status: StashStatus.Open,
};

export const STASH_CASH = 'stashCash';
