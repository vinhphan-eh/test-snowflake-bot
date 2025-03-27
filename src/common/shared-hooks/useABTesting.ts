import { useEffect, useState } from 'react';
import remoteConfig from '@react-native-firebase/remote-config';

export const useABTesting = ({ remoteConfigParameter }: { remoteConfigParameter: string }) => {
  const [data, setData] = useState<string>('');

  const getData = async () => {
    const { lastFetchStatus } = remoteConfig();
    if (lastFetchStatus !== 'success') {
      await remoteConfig().fetchAndActivate();
    }
    const value = remoteConfig().getValue(remoteConfigParameter).asString();
    setData(value);
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    data,
  };
};
