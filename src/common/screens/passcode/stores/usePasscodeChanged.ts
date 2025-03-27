import { useCallback } from 'react';
import {
  useCreateUkPasscodeMutation,
  useGetWalletStatusQuery,
  WalletSetupStatus,
} from '../../../../new-graphql/generated';
import { useCheckUKPermission } from '../../../hooks/useCheckUKPermission';

const usePasscodeChanged = () => {
  const setUkPasscode = useCreateUkPasscodeMutation();
  const isUkCustomer = useCheckUKPermission();
  const { data: userData } = useGetWalletStatusQuery();
  const hasWalletStatus = !!(
    userData?.me?.wallet?.details.setupStatus?.status &&
    userData?.me?.wallet?.details.setupStatus?.status !== WalletSetupStatus.None
  );
  const hasPermission = isUkCustomer && hasWalletStatus;

  const onPasscodeChanged = useCallback(
    async (newPasscode: string): Promise<boolean | undefined> => {
      if (!hasPermission) {
        return undefined;
      }

      try {
        await setUkPasscode.mutateAsync({ input: { passcode: newPasscode } });
        return true;
      } catch (_) {
        return false;
      }
    },
    [hasPermission]
  );

  return { onPasscodeChanged };
};

export { usePasscodeChanged };
