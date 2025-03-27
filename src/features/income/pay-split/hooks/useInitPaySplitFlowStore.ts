import { useEffect } from 'react';
import type { PaySplitFlowStore } from './usePaySplitFlowStore';
import { usePaySplitFlowStore } from './usePaySplitFlowStore';
import type { PaySplitNetworkData } from './usePaySplitNetworkData';
import { usePaySplitNetworkData } from './usePaySplitNetworkData';
import type { PaySplitScreenNavigationProp, PaySplitStackParamList } from '../navigation/navigationTypes';

interface InitPaySplitFlowStoreWrapper {
  store: PaySplitFlowStore;
  isError: boolean;
  isLoading: boolean;
  data: PaySplitNetworkData;
}

export const useInitPaySplitFlowStore = (
  navigation: PaySplitScreenNavigationProp<keyof PaySplitStackParamList>
): InitPaySplitFlowStoreWrapper => {
  const store = usePaySplitFlowStore();
  const { data, isError, isLoading } = usePaySplitNetworkData();

  useEffect(() => {
    if (!isError && !isLoading) {
      store.initialise(data);
    }
  }, [isError, isLoading]);

  useEffect(() => {
    if (isError) {
      navigation.navigate('PaySplitError');
    }
  }, [isError]);

  return { data, isError, isLoading, store };
};
