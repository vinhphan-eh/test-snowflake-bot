import { create } from 'zustand';

interface DeeplinkStore {
  // Deep link to handle, in real life, there will be only one deep link to handle at a time
  deeplinkType: keyof DeeplinkParamsList | null;
  deeplinkParams?: DeeplinkParamsList[keyof DeeplinkParamsList];
}

export type DeeplinkParamsList = {
  'cashback-offer': { offerId?: string };
  'cashback-instore-offer': { offerId?: string; postcode?: string; region?: string };
  'cashback-transactions': { offerId?: string };
};
export type DeeplinkType = keyof DeeplinkParamsList;
export type DeeplinkParams = DeeplinkParamsList[DeeplinkType];

export const useDeeplinkStore = create<DeeplinkStore>()(() => ({
  deeplinkType: null,
  deeplinkParams: {},
}));

export const storeDeeplink = ({ deeplinkParams = {}, deeplinkType }: DeeplinkStore) => {
  useDeeplinkStore.setState({
    deeplinkType,
    deeplinkParams,
  });
};

export const clearDeepLink = () => {
  useDeeplinkStore.setState({
    deeplinkType: null,
    deeplinkParams: {},
  });
};
