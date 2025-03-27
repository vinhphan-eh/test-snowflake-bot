import type { Permission, Rationale } from 'react-native-permissions';
import { check, RESULTS, request, openSettings } from 'react-native-permissions';

export const usePermission = (permissionKey: Permission, rationale?: Rationale) => {
  const checkPermission = async () => {
    try {
      const status = await check(permissionKey);
      return status;
    } catch {
      return null;
    }
  };

  const requestPermission = async () => {
    try {
      const checkStatus = await checkPermission();
      if (checkStatus === RESULTS.DENIED) {
        // The permission has not been requested or is denied but requestable
        const requestStatus = await request(permissionKey, rationale);
        return requestStatus;
      }
      return checkStatus;
    } catch {
      return null;
    }
  };

  return {
    check: checkPermission,
    request: requestPermission,
    openSettings,
  };
};
