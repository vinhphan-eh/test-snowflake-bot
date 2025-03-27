import { useMixpanel } from '../../../../common/hooks/useMixpanel';
import type { EventTrackingParams } from '../../../../common/stores/useSessionStore';
import { useRegionLocalisation } from '../../../../providers/LocalisationProvider';
import { INSTAPAY_MODULE_NAME } from '../../instapay/constants/trackingEvents';
import { InstaPaySchedulingAdCTAVersion } from '../constants';
import {
  CLICKED_CONFIRM_ON_WITHDRAW_NOW_DRAWDOWN_CONFIRMATION_SCREEN,
  CLICKED_NEXT_FROM_BANK_ACCOUNTS_SELECTION_DURING_WITHDRAW_NOW,
  CLICKED_ON_CANCEL_FROM_RECURRING_WITHDRAWAL_MODIFICATION,
  CLICKED_ON_CONFIRM_FROM_RECURRING_CREATION_CONFIRMATION_SCREEN,
  CLICKED_ON_EDIT_TO_MODIFY_EXISTING_RECURRING_WITHDRAWAL,
  CLICKED_ON_NEXT_FROM_RECURRING_BANK_SELECTION_SCREEN,
  CLICKED_ON_SCHEDULING_CTA_FROM_DRAWDOWN_SUCCESS_SCREEN,
  CLICKED_ON_SCHEDULING_CTA_FROM_MENU_SCREEN_ON_ERROR,
  CLICKED_ON_TRY_RECURRING_WITHDRAWAL_CTA_ON_NOW_TAB,
  CLICKED_ON_UPDATE_FROM_RECURRING_WITHDRAWAL_MODIFICATION,
  CLICKED_ON_WITHDRAW_AMOUNT_NOW_BUTTON_ON_NOW_TAB,
  CLICKED_ON_WITHDRAW_EVERY_EARNED_AMOUNT_DURING_RECURRING_WITHDRAWAL_CREATION,
  CONFIRMED_RECURRING_WITHDRAWAL_CANCELLATION,
  INSTAPAY_SCHEDULING_MODULE_NAME,
  SUBMIT_SURVEY_FOR_OPTING_OUT_SCHEDULING,
  SWITCHED_TO_DAILY_TAB,
  SWITCHED_TO_NOW_TAB,
  SWITCHED_TO_RECURRING_TAB,
  VIEWED_ERROR_ON_NOW_TAB,
  VIEWED_ERROR_ON_RECURRING_TAB,
} from '../mixpanelEvents';

export const sharedIPSchedulingEventProperties = (otherMetadata?: Record<string, unknown>) =>
  ({
    categoryName: 'user action',
    metaData: {
      module: INSTAPAY_SCHEDULING_MODULE_NAME,
      ...otherMetadata,
    },
  } as EventTrackingParams);

// Used for AU unit testing
export const mockedSharedIPSchedulingEventProperties = (otherMetadata?: Record<string, unknown>) =>
  sharedIPSchedulingEventProperties({
    ...otherMetadata,
    currentRegion: 'AU',
  });

export const useInstaPaySchedulingEventTracking = () => {
  const mixpanelTracking = useMixpanel();
  const { currentRegion } = useRegionLocalisation();

  const getSharedMetadata = (otherMetadata?: Record<string, unknown>) =>
    sharedIPSchedulingEventProperties({
      ...otherMetadata,
      currentRegion: currentRegion ?? 'AU',
    });

  /**
   * Now
   */
  const trackUserSwitchedToNowTab = () => {
    mixpanelTracking?.eventTracking({
      ...getSharedMetadata(),
      event: SWITCHED_TO_NOW_TAB,
    });
  };

  const trackUserViewedErrorsOnNowTab = ({ errorCode }: { errorCode: string }) => {
    mixpanelTracking?.eventTracking({
      ...getSharedMetadata({
        errorCode,
        module: INSTAPAY_MODULE_NAME,
      }),
      event: VIEWED_ERROR_ON_NOW_TAB,
    });
  };

  const trackUserClickedOnWithdrawAmountNowButton = ({ amount }: { amount: number }) => {
    mixpanelTracking?.eventTracking({
      ...getSharedMetadata({
        amount,
        module: INSTAPAY_MODULE_NAME,
      }),
      event: CLICKED_ON_WITHDRAW_AMOUNT_NOW_BUTTON_ON_NOW_TAB,
    });
  };

  const trackUserClickedNextFromBankSelectionDuringNowFlow = () => {
    mixpanelTracking?.eventTracking({
      ...getSharedMetadata({
        module: INSTAPAY_MODULE_NAME,
      }),
      event: CLICKED_NEXT_FROM_BANK_ACCOUNTS_SELECTION_DURING_WITHDRAW_NOW,
    });
  };

  const trackUserConfirmedWithdrawNowDrawdown = () => {
    mixpanelTracking?.eventTracking({
      ...getSharedMetadata({
        module: INSTAPAY_MODULE_NAME,
      }),
      event: CLICKED_CONFIRM_ON_WITHDRAW_NOW_DRAWDOWN_CONFIRMATION_SCREEN,
    });
  };

  const trackUserClickedOnTryRecurringWithdrawalCTA = () => {
    mixpanelTracking?.eventTracking({
      ...getSharedMetadata({
        module: INSTAPAY_MODULE_NAME,
      }),
      event: CLICKED_ON_TRY_RECURRING_WITHDRAWAL_CTA_ON_NOW_TAB,
    });
  };

  /**
   * Recurring
   */
  const trackUserSwitchedToRecurringTab = () => {
    mixpanelTracking?.eventTracking({
      ...getSharedMetadata(),
      event: SWITCHED_TO_RECURRING_TAB,
    });
  };

  const trackUserClickedOnEditRecurringSubscription = () => {
    mixpanelTracking?.eventTracking({
      ...getSharedMetadata(),
      event: CLICKED_ON_EDIT_TO_MODIFY_EXISTING_RECURRING_WITHDRAWAL,
    });
  };

  const trackUserClickedOnUpdateFromRecurringModification = ({ amount }: { amount: number }) => {
    mixpanelTracking?.eventTracking({
      ...getSharedMetadata({
        amount,
      }),
      event: CLICKED_ON_UPDATE_FROM_RECURRING_WITHDRAWAL_MODIFICATION,
    });
  };

  const trackUserClickedOnCancelFromRecurringModification = ({ amount }: { amount: number }) => {
    mixpanelTracking?.eventTracking({
      ...getSharedMetadata({
        amount,
      }),
      event: CLICKED_ON_CANCEL_FROM_RECURRING_WITHDRAWAL_MODIFICATION,
    });
  };

  const trackUserConfirmedRecurringWithdrawalCancellation = () => {
    mixpanelTracking?.eventTracking({
      ...getSharedMetadata(),
      event: CONFIRMED_RECURRING_WITHDRAWAL_CANCELLATION,
    });
  };

  const trackUserClickedOnNextFromRecurringBankSelectionScreen = ({
    amount,
    recurringType,
  }: {
    amount: number;
    recurringType: string;
  }) => {
    mixpanelTracking?.eventTracking({
      ...getSharedMetadata({
        amount,
        recurringType,
      }),
      event: CLICKED_ON_NEXT_FROM_RECURRING_BANK_SELECTION_SCREEN,
    });
  };

  const trackUserClickedOnConfirmScheduleCreation = ({
    amount,
    recurringType,
  }: {
    amount: number;
    recurringType: string;
  }) => {
    mixpanelTracking?.eventTracking({
      ...getSharedMetadata({
        amount,
        recurringType,
      }),
      event: CLICKED_ON_CONFIRM_FROM_RECURRING_CREATION_CONFIRMATION_SCREEN,
    });
  };

  const trackUserClickedOnWithdrawEveryEarnedAmountOnRecurringTab = ({ amount }: { amount: number }) => {
    mixpanelTracking?.eventTracking({
      ...getSharedMetadata({ amount }),
      event: CLICKED_ON_WITHDRAW_EVERY_EARNED_AMOUNT_DURING_RECURRING_WITHDRAWAL_CREATION,
    });
  };

  const trackUserViewedErrorsOnRecurringTab = ({ errorCode }: { errorCode: string }) => {
    mixpanelTracking?.eventTracking({
      ...getSharedMetadata({
        errorCode,
      }),
      event: VIEWED_ERROR_ON_RECURRING_TAB,
    });
  };

  const trackUserClickedOnSchedulingCTA = ({ version }: { version: `${InstaPaySchedulingAdCTAVersion}` }) => {
    const event =
      version === InstaPaySchedulingAdCTAVersion.MENU_SCREEN_ON_ERROR
        ? CLICKED_ON_SCHEDULING_CTA_FROM_MENU_SCREEN_ON_ERROR
        : CLICKED_ON_SCHEDULING_CTA_FROM_DRAWDOWN_SUCCESS_SCREEN;
    mixpanelTracking?.eventTracking({
      ...getSharedMetadata(),
      event,
    });
  };

  const trackUserSubmittedRecurringOptOutSurvey = (category: string, reason: string) => {
    mixpanelTracking?.eventTracking({
      ...getSharedMetadata({ category, reason }),
      event: SUBMIT_SURVEY_FOR_OPTING_OUT_SCHEDULING,
    });
  };

  /**
   * Daily
   */
  const trackUserSwitchedToDailyTab = () => {
    mixpanelTracking?.eventTracking({
      ...getSharedMetadata(),
      event: SWITCHED_TO_DAILY_TAB,
    });
  };
  return {
    trackUserSwitchedToNowTab,
    trackUserViewedErrorsOnNowTab,
    trackUserClickedOnWithdrawAmountNowButton,
    trackUserClickedNextFromBankSelectionDuringNowFlow,
    trackUserConfirmedWithdrawNowDrawdown,

    trackUserClickedOnTryRecurringWithdrawalCTA,
    trackUserSwitchedToRecurringTab,
    trackUserClickedOnEditRecurringSubscription,
    trackUserClickedOnUpdateFromRecurringModification,
    trackUserClickedOnCancelFromRecurringModification,
    trackUserClickedOnNextFromRecurringBankSelectionScreen,
    trackUserConfirmedRecurringWithdrawalCancellation,
    trackUserClickedOnConfirmScheduleCreation,
    trackUserClickedOnWithdrawEveryEarnedAmountOnRecurringTab,
    trackUserViewedErrorsOnRecurringTab,

    trackUserClickedOnSchedulingCTA,
    trackUserSubmittedRecurringOptOutSurvey,
    trackUserSwitchedToDailyTab,
  };
};
