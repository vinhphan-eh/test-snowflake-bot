import { useEffect, useRef } from 'react';
import { useAutoEnrolHeroWallet } from './useAutoEnrolHeroWallet';
import { queryClient } from '../../../../../common/libs/queryClient';
import {
  useCashbackUpdateAutoEnrolMutation,
  useCashbackUserInfoQuery,
  CashbackAutoEnrolStatus,
  CashbackBankLinkedStatus,
} from '../../../../../new-graphql/generated';
import { useCashbackPermission } from '../../../common/hooks/useCashbackPermission';
import { useCheckCompletelyOnboardCashback } from '../../hooks/useCheckCompletelyOnboardCashback';
import { AutoEnrolStatus } from '../constants/autoEnrol';

export const useCheckAutoEnrollment = ({
  runInBackground,
  shouldDeregisterOldCard,
}: {
  shouldDeregisterOldCard: boolean;
  runInBackground: boolean;
}) => {
  const { autoEnrolCard, isPreparingData } = useAutoEnrolHeroWallet();
  const { permission: cashbackPermission } = useCashbackPermission();
  const { isCompleted } = useCheckCompletelyOnboardCashback();
  const { mutateAsync: updateStatus } = useCashbackUpdateAutoEnrolMutation();
  const { data, isError: isStatusError, isLoading: isLoadingStatus } = useCashbackUserInfoQuery();
  const enrolStatus = data?.me?.cashback?.cashbackUserInfo?.autoEnrolStatus;
  const currentMessage = data?.me?.cashback?.cashbackUserInfo?.autoEnrolMessage;
  const bankLinkedStatus = data?.me?.cashback?.cashbackUserInfo?.bankLinkedStatus;
  const allowTriggerInBackground = useRef(runInBackground);

  const updateEnrolStatus = async (iSuccess: boolean, message: string) => {
    if (enrolStatus === CashbackAutoEnrolStatus.Failed && !iSuccess && currentMessage === message) {
      // stop firing the same result
      return;
    }
    await updateStatus({
      updateAutoEnrolment: {
        status: iSuccess,
        message,
      },
    });

    queryClient.invalidateQueries(useCashbackUserInfoQuery.getKey());
  };

  const triggerAutoEnrol = async () => {
    try {
      await autoEnrolCard(shouldDeregisterOldCard);
      await updateEnrolStatus(
        true,
        shouldDeregisterOldCard ? AutoEnrolStatus.RE_ENROLLED_TO_NEW_SWAG_CARD : AutoEnrolStatus.ENROLLED
      );
    } catch (e) {
      if (e instanceof Error && e?.message) {
        await updateEnrolStatus(false, e.message);
      }
    }
  };

  // shouldDeregisterOldCard override status, because we need to re-enrol to new card
  const shouldTriggerBasedOnStatus =
    (!isStatusError &&
      !isLoadingStatus &&
      (enrolStatus !== CashbackAutoEnrolStatus.Success || bankLinkedStatus !== CashbackBankLinkedStatus.Success)) ||
    shouldDeregisterOldCard;

  useEffect(() => {
    // listener for auto enrol when conditions met
    if (
      cashbackPermission &&
      isCompleted &&
      shouldTriggerBasedOnStatus &&
      !isPreparingData &&
      runInBackground &&
      allowTriggerInBackground.current
    ) {
      // safely prevent it from triggering again
      allowTriggerInBackground.current = false;
      triggerAutoEnrol();
    }
  }, [isCompleted, isPreparingData, shouldTriggerBasedOnStatus, cashbackPermission, runInBackground]);

  return { triggerAutoEnrol, isPreparingData };
};
