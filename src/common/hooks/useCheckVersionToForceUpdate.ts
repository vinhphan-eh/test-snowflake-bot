import DeviceInfo from 'react-native-device-info';
import semver from 'semver';
import { useMinSupportVersionQuery } from '../../new-graphql/generated';

const getCoerceVersion = (version: string) => semver.coerce(version)?.version ?? '';

export const useCheckVersionToForceUpdate = () => {
  const { data, isError, isLoading } = useMinSupportVersionQuery();

  const minSupportVersion = getCoerceVersion(data?.me?.minSupportVersion?.benefits.minSupportAppVersion ?? '');
  const deviceAppVersion = getCoerceVersion(DeviceInfo.getVersion());

  if (!minSupportVersion || !deviceAppVersion || isLoading || isError) {
    return { shouldUpdate: false };
  }

  return { shouldUpdate: semver.lt(deviceAppVersion, minSupportVersion) };
};
