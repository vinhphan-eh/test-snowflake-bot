import { useQuery } from 'react-query';
import { createHttpClient } from '../api/httpClient';
import { useGetSuperAppToken } from '../auth/store/useSuperAppTokenStore';
import { useSessionStore } from '../stores/useSessionStore';
import { isEnabledForEh } from '../types/react-query';
import { getEnvConfig } from '../utils/env';

const httpClient = createHttpClient();

export type EmploymentHistory = {
  contract_type: string;
  employment_type: string;
  end_date: string;
  id: number;
  in_review: boolean;
  industry_standard_job_title: string;
  start_date: string;
  title: string;
};

type Response = {
  data: {
    items: Array<EmploymentHistory>;
  };
};

export const useFetchEmploymentHistory = () => {
  const orgId = useSessionStore(state => state.currentOrgId ?? '');
  const memberId = useSessionStore(state => state.memberId ?? '');
  const { loginProvider, token } = useGetSuperAppToken('useFetchEmploymentHistory');

  const { data, isError, isLoading } = useQuery(
    ['GetEmploymentHistory'],
    async () => {
      const { data: responseData } = await httpClient.get<Response>(
        `${
          getEnvConfig().MAIN_APP_ENDPOINT
        }/api/v3/organisations/${orgId}/members/${memberId}/employment_histories?page=0&per=100`,
        {
          headers: {
            session_token: token,
          },
        }
      );
      return responseData?.data?.items || [];
    },
    { enabled: !!orgId && !!memberId && isEnabledForEh(token, loginProvider), staleTime: Infinity, retryOnMount: false }
  );

  return { data, isLoading, isError };
};

export const PrefetchEmploymentHistory = () => {
  useFetchEmploymentHistory();
  return null;
};
