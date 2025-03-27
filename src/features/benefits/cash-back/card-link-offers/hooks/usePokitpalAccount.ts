import { queryClient } from '../../../../../common/libs/queryClient';
import {
  CashbackBankLinkedStatus,
  useCashbackUpdateBankDetailsMutation,
  useCashbackUpdateBankLinkedStatusMutation,
  useCashbackUserBankDetailsQuery,
  useCashbackUserInfoQuery,
  useGetEWalletAuAccountDetailsQuery,
  type UpdateBankDetailsInput,
} from '../../../../../new-graphql/generated';
import { AutoEnrolStatus } from '../constants/autoEnrol';

export const usePokitpalAccount = () => {
  const { isLoading: isLoadingUserBank, refetch: refetchUserBank } = useCashbackUserBankDetailsQuery(
    {},
    { enabled: false }
  );
  const { mutateAsync: updateBankDetailAsync } = useCashbackUpdateBankDetailsMutation();
  const { data: walletData, isLoading: isWalletLoading } = useGetEWalletAuAccountDetailsQuery();
  const { mutateAsync: updateBankStatusAsync } = useCashbackUpdateBankLinkedStatusMutation();
  const { data, isLoading: isLoadingStatus } = useCashbackUserInfoQuery();

  const isLoading = isLoadingUserBank || isWalletLoading || isLoadingStatus;
  const walletDetails = walletData?.me?.wallet?.details;
  const bankLinkedStatus = data?.me?.cashback?.cashbackUserInfo.bankLinkedStatus ?? false;
  const statusMessage = data?.me?.cashback?.cashbackUserInfo.bankLinkedMessage;

  const fetchUserBank = async () => {
    try {
      const response = await refetchUserBank();
      return response.data?.me?.cashback?.userBankDetails;
    } catch {
      return undefined;
    }
  };

  const updateBankStatus = async (status: boolean, message: string) => {
    const mappedStatus = status ? CashbackBankLinkedStatus.Success : CashbackBankLinkedStatus.Failed;

    if (mappedStatus !== bankLinkedStatus || message !== statusMessage) {
      await updateBankStatusAsync({
        updateBankLinkedStatus: {
          status,
          message,
        },
      });

      queryClient.invalidateQueries(useCashbackUserInfoQuery.getKey());
    }
  };

  const registerUserBankIfDoNotExist = async (allowOverride = false) => {
    try {
      const userBank = await fetchUserBank();

      const shouldRegisterNewBankDetail =
        (!userBank?.bsb || !userBank?.accountNumber) && bankLinkedStatus !== CashbackBankLinkedStatus.Success;
      const alreadyUpdatedBankDetail = userBank?.bsb && userBank?.accountNumber;

      if (shouldRegisterNewBankDetail || allowOverride) {
        // register user bank
        if (walletDetails?.accountNumber && walletDetails?.bsb) {
          const updateBankDetails: UpdateBankDetailsInput = {
            accountNumber: walletDetails.accountNumber,
            bsb: walletDetails.bsb,
          };
          await updateBankDetailAsync({
            updateBankDetails,
          });

          await updateBankStatus(true, AutoEnrolStatus.BANK_UPDATED);
          return true;
        }
        // no wallet detail
        await updateBankStatus(false, AutoEnrolStatus.MISSING_WALLET_DETAIL);
        return false;
      }

      if (alreadyUpdatedBankDetail && bankLinkedStatus !== CashbackBankLinkedStatus.Success) {
        // update status if haven't done it yet
        await updateBankStatus(true, AutoEnrolStatus.BANK_UPDATED);
        return true;
      }
    } catch {
      await updateBankStatus(false, AutoEnrolStatus.INTERNAL_SERVER);
      return false;
    }

    return false;
  };

  return {
    isLoading,
    registerUserBankIfDoNotExist,
  };
};
