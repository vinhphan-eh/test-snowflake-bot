import { useIncomeVisibility } from './useIncomeVisibility';

export const usePrefetchIncomeVisibility = () => {
  const data = useIncomeVisibility({ retryOnMount: false });
  return data;
};

export const PrefetchIncomeVisibility = () => {
  usePrefetchIncomeVisibility();
  return null;
};
