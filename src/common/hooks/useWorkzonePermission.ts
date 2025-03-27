import { useEffect, useRef } from 'react';
import { useIsWorkzone } from './useIsWorkzone';
import { useUserPermissionQuery } from '../../new-graphql/generated';
import { useEbenTokenValidForQuery } from '../auth/store/ebenTokenStore';
import { useGetSuperAppToken } from '../auth/store/useSuperAppTokenStore';
import { useSessionStore } from '../stores/useSessionStore';
import { addBreadcrumb } from '../utils/sentry';

enum PermissionKey {
  MONEY = 'MONEY',
  BENEFITS = 'BENEFITS',
}

export const useWorkzonePermission = (): {
  moneyPermission: boolean;
  benefitsPermission: boolean;
  isFetching: boolean;
  isFetched: boolean;
} => {
  const startedToFetch = useRef(false);
  const isEbenTokenValid = useEbenTokenValidForQuery();
  const isWorkzone = useIsWorkzone();
  const { token: superAppToken } = useGetSuperAppToken('useWorkzonePermission');
  const isLoadingKpMetadataLite = useSessionStore(state => state.isLoadingKpMetadataLite);
  const kpRelations = useSessionStore(state => state.kpMetadatalite);

  useEffect(() => {
    if (!startedToFetch.current && isLoadingKpMetadataLite) {
      startedToFetch.current = true;
    }
  }, [isLoadingKpMetadataLite]);

  const kpPartnerIds = kpRelations?.map(e => e.partnerId).filter(e => e) as number[];

  const kpBrandIds = kpRelations?.map(e => e.brandId).filter(e => e) as number[];

  const kpBusinessIds = kpRelations?.map(e => e.businessId).filter(e => e) as number[];

  const kpEmployeeIds = kpRelations?.map(e => e.employeeId).filter(e => e) as number[];

  const {
    data: permissionData,
    isError,
    isFetched,
    isLoading: isLoadingPermission,
  } = useUserPermissionQuery(
    {
      permissionRequest: {
        kpPartnerIds,
        kpBrandIds,
        kpEmployeeIds,
        kpBusinessIds,
      },
    },
    {
      // listen to app token to avoid this query triggered when log out
      enabled: !!superAppToken && isWorkzone && isEbenTokenValid && Array.isArray(kpRelations),
      staleTime: Infinity,
      retryOnMount: false,
    }
  );
  // make sure it already fetched, because default and done fetching has isLoadingKpMetadataLite be false
  if (!kpRelations && !isLoadingKpMetadataLite && startedToFetch.current) {
    if (isWorkzone) {
      addBreadcrumb({
        message: 'Invalid workzone relation data',
        data: {
          relation: kpRelations,
        },
      });
    }

    return {
      moneyPermission: false,
      benefitsPermission: false,
      isFetching: false,
      isFetched: true,
    };
  }

  const userPermission = permissionData?.me?.userPermission?.permissions;

  const moneyPermission = userPermission?.find(e => e.name === PermissionKey.MONEY)?.enabled ?? false;
  const benefitsPermission = userPermission?.find(e => e.name === PermissionKey.BENEFITS)?.enabled ?? false;

  return {
    moneyPermission,
    benefitsPermission,
    isFetching: isLoadingPermission ?? false,
    // After switching account: there is a short time that react-query return wrong isFetched
    // it returns isFetching = true, isFetched = true ==> which theoretically isFetched should be false when isFetching = true => could be react-query bug on v3
    // so need to depend on API response !== undefined to check if it's really fetched
    isFetched: isFetched && (isError ? true : userPermission !== undefined),
  };
};
