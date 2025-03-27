import { useMixpanel } from '../../../../common/hooks/useMixpanel';
import {
  CLICK_ON_BACK_BTN,
  CLICK_ON_CONTINUE_TO_CHOOSE_HOW_TO_GET_PAID,
  CLICK_ON_FINISH_ONBOARDING,
  CLICK_ON_HOME_OWNER_TILE,
  CLICK_ON_NEXT_BTN,
  CLICK_ON_REMIND_ME_BTN,
  CLICK_ON_SKIP_TO_EXIT_ONBOARDING,
  CLICK_ON_SPENDER_TILE,
  INSTAPAY_MODULE,
} from '../constants/mixpanel';

type SkipBtnLocation =
  | 'Choose Old/New way'
  | 'Choose Instapay Daily/Now'
  | 'Instapay Daily Intro'
  | 'Instapay Now Intro';

type CarouselIntroType = 'Instapay Now Intro' | 'Instapay Daily Intro';

type PayOption = 'old way' | 'new way' | 'instapay daily' | 'instapay now';

export const useInstapayOnboardTracking = () => {
  const { eventTracking } = useMixpanel();

  const trackClickFinishOnboarding = () => {
    eventTracking({
      event: CLICK_ON_FINISH_ONBOARDING,
      categoryName: 'user action',
      metaData: { module: INSTAPAY_MODULE },
    });
  };

  const trackClickSkipOnboarding = (location: SkipBtnLocation) => {
    eventTracking({
      event: CLICK_ON_SKIP_TO_EXIT_ONBOARDING,
      categoryName: 'user action',
      metaData: { module: INSTAPAY_MODULE, location },
    });
  };

  const trackClickOnContinue = (selection: PayOption) => {
    eventTracking({
      event: CLICK_ON_CONTINUE_TO_CHOOSE_HOW_TO_GET_PAID,
      categoryName: 'user action',
      metaData: { module: INSTAPAY_MODULE, selection },
    });
  };

  const trackClickOnSpenderTile = () => {
    eventTracking({
      event: CLICK_ON_SPENDER_TILE,
      categoryName: 'user action',
      metaData: { module: INSTAPAY_MODULE },
    });
  };

  const trackClickOnHomeOwnerTile = () => {
    eventTracking({
      event: CLICK_ON_HOME_OWNER_TILE,
      categoryName: 'user action',
      metaData: { module: INSTAPAY_MODULE },
    });
  };

  const trackClickOnNextBtn = (location: CarouselIntroType) => {
    eventTracking({
      event: CLICK_ON_NEXT_BTN,
      categoryName: 'user action',
      metaData: { module: INSTAPAY_MODULE, location },
    });
  };

  const trackClickOnBackBtn = (location: CarouselIntroType) => {
    eventTracking({
      event: CLICK_ON_BACK_BTN,
      categoryName: 'user action',
      metaData: { module: INSTAPAY_MODULE, location },
    });
  };

  const trackClickOnRemindMeBtn = (location: CarouselIntroType) => {
    eventTracking({
      event: CLICK_ON_REMIND_ME_BTN,
      categoryName: 'user action',
      metaData: { module: INSTAPAY_MODULE, location },
    });
  };

  return {
    trackClickFinishOnboarding,
    trackClickSkipOnboarding,
    trackClickOnContinue,
    trackClickOnSpenderTile,
    trackClickOnHomeOwnerTile,
    trackClickOnNextBtn,
    trackClickOnBackBtn,
    trackClickOnRemindMeBtn,
  };
};
