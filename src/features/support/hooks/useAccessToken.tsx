import { useState, useEffect } from 'react';
import { getEbenAccessToken } from '../../../common/auth/services/ebenToken';
import { useGetSuperAppToken } from '../../../common/auth/store/useSuperAppTokenStore';
import { useToast } from '../../../common/shared-hooks/useToast';

export const useAccessToken = () => {
  const tokenRes = useGetSuperAppToken('useAccessToken');
  const [ebenToken, setEbenToken] = useState<string>();
  const Toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getEbenAccessToken(tokenRes);
      setEbenToken(token);
    };

    fetchData().catch(() =>
      Toast.show({
        content: "We're sorry, something's gone wrong.",
      })
    );

    // update eBenToken every 30s since the token will be updated 1m before expiration
    const interval = setInterval(async () => {
      const token = await getEbenAccessToken(tokenRes);
      setEbenToken(token);
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return ebenToken;
};
