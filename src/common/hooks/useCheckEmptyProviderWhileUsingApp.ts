import { useGetSuperAppToken } from '../auth/store/useSuperAppTokenStore';

export const useCheckEmptyProviderWhileUsingApp = () => {
  const { loginProvider, token } = useGetSuperAppToken('useCheckEmptyProviderWhileUsingApp');

  return !loginProvider && !!token;
};
