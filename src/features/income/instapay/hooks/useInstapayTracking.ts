import { useMixpanel } from '../../../../common/hooks/useMixpanel';
import { EventTrackingCategory } from '../../../../common/stores/useSessionStore';
import type { Weekday } from '../../../../new-graphql/generated';
import { REQUEST_GET_ALL_INSTAPAY_AVAILABLE_BALANCES } from '../../../support/constants/mixpanel';
import {
  ACCESS_INSTAPAY_NOW_CAROUSEL,
  CLICK_INSTAPAY_FIND_OUT_HOW_AD,
  CLICK_INSTAPAY_GET_INSTAPAY_AD_DETAIL,
  CLICK_INSTAPAY_HOW_IT_WORK_MENU_SCREEN,
  CLICK_INSTAPAY_LEARN_MORE_AD_DETAIL,
  CLICK_INSTAPAY_SCHEDULING_TILE_ON_INCOME_DASHBOARD,
  CLICK_INSTAPAY_TILE_ON_INCOME_DASHBOARD,
  CLICK_ON_DRAWDOWN_SURVEY_CTA,
  CLICK_ON_DYNAMIC_INSTAPAY_NOW_TILE,
  CLICK_ON_INSTAPAY_EDUCATION_TILE,
  CLICK_ON_INSTAPAY_RECURRING_TILE,
  CLICK_ON_NOT_NOW_ON_DRAWDOWN_SURVEY_SCREEN,
  INSTAPAY_MODULE_NAME,
  PRESS_CONFIRM_RECURRING_BY_DAY,
  PRESS_INSTAPAY_INTRO,
  PRESS_INSTAPAY_NOW_CAROUSEL_GOT_IT_EXPERIMENT,
  PRESS_INSTAPAY_NOW_CAROUSEL_I_AM_NOT_READY,
  PRESS_INSTAPAY_NOW_CAROUSEL_LET_US_GO,
  PRESS_RECURRING_BY_DAY_TILE,
  SELECT_AMOUNT_RECURRING_BY_DAY,
  SELECT_DAY_RECURRING_BY_DAY,
  SUBMIT_DRAWDOWN_SURVEY,
  USER_CICK_ON_EXPERIMENT_TILE_IN_WORK,
  USER_SEE_DYNAMIC_INSTAPAY_NOW_TILE,
  USER_SEE_EXPERIMENT_TILE_IN_WORK,
  USER_SEE_INSTAPAY_EDUCATION_TILE,
  USER_SEE_INSTAPAY_INTRO_CAROUSEL,
  USER_SEE_INSTAPAY_RECURRING_TILE,
  VIEW_RECURRING_BY_DAY_TILE,
} from '../constants/trackingEvents';

export type InstapayNowEventType =
  | 'noHistory_readyWithdraw'
  | 'noHistory_cannotWithdraw'
  | 'readyWithdraw'
  | 'cannotWithdraw';

export type TargetedFeature = 'payslips' | 'rosters' | 'leave' | 'leave_approved' | 'leave submitted' | 'timesheets';

export const getInstapayNowEventType = (noIpnHistory: boolean, isReadyToWithdraw: boolean): InstapayNowEventType => {
  if (noIpnHistory) {
    return isReadyToWithdraw ? 'noHistory_readyWithdraw' : 'noHistory_cannotWithdraw';
  }
  return isReadyToWithdraw ? 'readyWithdraw' : 'cannotWithdraw';
};

export const useInstapayTracking = () => {
  const mixpanelTracking = useMixpanel();

  const trackViewRecurringByDayTile = () => {
    mixpanelTracking?.eventTracking({
      event: VIEW_RECURRING_BY_DAY_TILE,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
      },
    });
  };

  const trackPressRecurringByDayTile = () => {
    mixpanelTracking?.eventTracking({
      event: PRESS_RECURRING_BY_DAY_TILE,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
      },
    });
  };

  const trackSelectDayRecurringByDay = (day: string) => {
    mixpanelTracking?.eventTracking({
      event: SELECT_DAY_RECURRING_BY_DAY,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
        day,
      },
    });
  };

  const trackSelectAmountRecurringByDay = (min: number, max: number) => {
    mixpanelTracking?.eventTracking({
      event: SELECT_AMOUNT_RECURRING_BY_DAY,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
        max,
        min,
      },
    });
  };

  const trackPressConfirmRecurringByDay = (min: number, max: number, day: Weekday) => {
    mixpanelTracking?.eventTracking({
      event: PRESS_CONFIRM_RECURRING_BY_DAY,
      categoryName: 'user action',
      metaData: {
        module: PRESS_CONFIRM_RECURRING_BY_DAY,
        max,
        min,
        day,
      },
    });
  };

  const trackPressAdModal = () => {
    mixpanelTracking?.eventTracking({
      event: CLICK_INSTAPAY_FIND_OUT_HOW_AD,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
      },
    });
  };

  const trackPressGetInstapayAdDetail = () => {
    mixpanelTracking?.eventTracking({
      event: CLICK_INSTAPAY_GET_INSTAPAY_AD_DETAIL,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
      },
    });
  };

  const trackPressLearnMoreAdDetail = () => {
    mixpanelTracking?.eventTracking({
      event: CLICK_INSTAPAY_LEARN_MORE_AD_DETAIL,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
      },
    });
  };

  const trackPressHowItWorkMenuScreen = () => {
    mixpanelTracking?.eventTracking({
      event: CLICK_INSTAPAY_HOW_IT_WORK_MENU_SCREEN,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
      },
    });
  };

  const trackPressInstapayTileOnIncomeDashboard = (tileState: string) => {
    mixpanelTracking?.eventTracking({
      event: CLICK_INSTAPAY_TILE_ON_INCOME_DASHBOARD,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
        tileState,
      },
    });
  };

  const trackAccessIntapayNowCarousel = () => {
    mixpanelTracking?.eventTracking({
      event: ACCESS_INSTAPAY_NOW_CAROUSEL,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
      },
    });
  };

  const trackPressIntapayNowCarouselLetUsGo = () => {
    mixpanelTracking?.eventTracking({
      event: PRESS_INSTAPAY_NOW_CAROUSEL_LET_US_GO,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
      },
    });
  };

  const trackPressIntapayNowCarouselGotItExperimental = () => {
    mixpanelTracking?.eventTracking({
      event: PRESS_INSTAPAY_NOW_CAROUSEL_GOT_IT_EXPERIMENT,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
      },
    });
  };

  const trackPressIntapayNowCarouselIAmNotReady = () => {
    mixpanelTracking?.eventTracking({
      event: PRESS_INSTAPAY_NOW_CAROUSEL_I_AM_NOT_READY,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
      },
    });
  };

  const trackPressInstapayIntro = () => {
    mixpanelTracking?.eventTracking({
      event: PRESS_INSTAPAY_INTRO,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
      },
    });
  };

  const trackUserSeeInstapayEducationTile = (location: string) => {
    mixpanelTracking?.eventTracking({
      event: USER_SEE_INSTAPAY_EDUCATION_TILE,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
        location,
      },
    });
  };

  const trackClickInstapayEducationTile = (location: string) => {
    mixpanelTracking?.eventTracking({
      event: CLICK_ON_INSTAPAY_EDUCATION_TILE,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
        location,
      },
    });
  };

  const trackClickGotItAtCarousel = (destination: string) => {
    mixpanelTracking?.eventTracking({
      event: CLICK_ON_INSTAPAY_EDUCATION_TILE,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
        destination,
      },
    });
  };

  const trackVisitInstapayIntroCarousel = (carouselType: string) => {
    mixpanelTracking?.eventTracking({
      event: USER_SEE_INSTAPAY_INTRO_CAROUSEL,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
        carouselType,
      },
    });
  };

  const trackSeeInstapayNowDynamicTile = (type: InstapayNowEventType, country?: string) => {
    mixpanelTracking?.eventTracking({
      event: USER_SEE_DYNAMIC_INSTAPAY_NOW_TILE,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
        type,
        ehCountry: country,
      },
    });
  };

  const trackClickOnInstapayNowDynamicTile = (type: InstapayNowEventType, country?: string) => {
    mixpanelTracking?.eventTracking({
      event: CLICK_ON_DYNAMIC_INSTAPAY_NOW_TILE,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
        type,
        ehCountry: country,
      },
    });
  };

  const trackSeeInstapayRecurringTile = (isRecurringSetUp: boolean, country?: string) => {
    mixpanelTracking?.eventTracking({
      event: USER_SEE_INSTAPAY_RECURRING_TILE,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
        isRecurringSetUp,
        ehCountry: country,
      },
    });
  };

  const trackClickOnInstapayRecurringTile = (isRecurringSetUp: boolean, country?: string) => {
    mixpanelTracking?.eventTracking({
      event: CLICK_ON_INSTAPAY_RECURRING_TILE,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
        isRecurringSetUp,
        ehCountry: country,
      },
    });
  };

  const trackPressInstapaySchedulingAdModal = (option: string) => {
    mixpanelTracking?.eventTracking({
      event: CLICK_INSTAPAY_SCHEDULING_TILE_ON_INCOME_DASHBOARD,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
        location: 'Income Dashboard',
        selectedOption: option,
      },
    });
  };

  const trackUserSeeInstapayExperimentTile = (feature: TargetedFeature, isZeroBalance = false) => {
    mixpanelTracking?.eventTracking({
      event: USER_SEE_EXPERIMENT_TILE_IN_WORK,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
        feature: isZeroBalance ? `${feature} (IP balance is 0)` : feature,
      },
    });
  };

  const trackUserClickInstapayExperimentTile = (feature: TargetedFeature, isZeroBalance = false) => {
    mixpanelTracking?.eventTracking({
      event: USER_CICK_ON_EXPERIMENT_TILE_IN_WORK,
      categoryName: 'user action',
      metaData: {
        module: INSTAPAY_MODULE_NAME,
        feature: isZeroBalance ? `${feature} (IP balance is 0)` : feature,
      },
    });
  };

  const trackRequestGetAllInstapayAvailableBalances = (location: string) => {
    mixpanelTracking?.eventTracking({
      event: REQUEST_GET_ALL_INSTAPAY_AVAILABLE_BALANCES,
      categoryName: EventTrackingCategory.NETWORK,
      metaData: {
        module: INSTAPAY_MODULE_NAME,
        location,
      },
    });
  };

  const trackClickDrawdownSurveyCTA = () => {
    mixpanelTracking?.eventTracking({
      event: CLICK_ON_DRAWDOWN_SURVEY_CTA,
      categoryName: EventTrackingCategory.USER_ACTION,
      metaData: {
        module: INSTAPAY_MODULE_NAME,
      },
    });
  };

  const trackSubmitDrawdownSurvey = (answers: { [key: string]: string | string[] }) => {
    mixpanelTracking?.eventTracking({
      event: SUBMIT_DRAWDOWN_SURVEY,
      categoryName: EventTrackingCategory.USER_ACTION,
      metaData: {
        module: INSTAPAY_MODULE_NAME,
        answers,
      },
    });
  };

  const trackClickNotNowOnDrawdownSurveyScreen = () => {
    mixpanelTracking?.eventTracking({
      event: CLICK_ON_NOT_NOW_ON_DRAWDOWN_SURVEY_SCREEN,
      categoryName: EventTrackingCategory.USER_ACTION,
      metaData: {
        module: INSTAPAY_MODULE_NAME,
      },
    });
  };

  return {
    trackPressAdModal,
    trackPressLearnMoreAdDetail,
    trackPressGetInstapayAdDetail,
    trackPressHowItWorkMenuScreen,
    trackPressInstapayTileOnIncomeDashboard,
    trackAccessIntapayNowCarousel,
    trackPressIntapayNowCarouselLetUsGo,
    trackPressIntapayNowCarouselIAmNotReady,
    trackPressInstapayIntro,
    trackUserSeeInstapayEducationTile,
    trackClickInstapayEducationTile,
    trackPressIntapayNowCarouselGotItExperimental,
    trackClickGotItAtCarousel,
    trackVisitInstapayIntroCarousel,
    trackSeeInstapayNowDynamicTile,
    trackClickOnInstapayNowDynamicTile,
    trackPressInstapaySchedulingAdModal,
    trackUserSeeInstapayExperimentTile,
    trackUserClickInstapayExperimentTile,
    trackRequestGetAllInstapayAvailableBalances,
    trackSeeInstapayRecurringTile,
    trackClickOnInstapayRecurringTile,
    trackClickDrawdownSurveyCTA,
    trackSubmitDrawdownSurvey,
    trackClickNotNowOnDrawdownSurveyScreen,
    trackViewRecurringByDayTile,
    trackPressRecurringByDayTile,
    trackSelectDayRecurringByDay,
    trackSelectAmountRecurringByDay,
    trackPressConfirmRecurringByDay,
  };
};
