import type { TargetedFeature } from '../hooks/useInstapayTracking';

export const BRAZE_SUBMIT_LEAVE_ID = 'instapay_exp_submit_leave';
export const BRAZE_SUBMIT_TIMESHEET_ID = 'instapay_exp_submit_timesheet';
export const INSTAPAY_POPUP_BRAZE_CARD_ID = 'instapay_exp_popup';
export const ROSTER_POPUP_BRAZED_ID = 'instapay_exp_popup_roster';
export const BRAZE_SUBMIT_LEAVE_ZERO_BALANCE_ID = 'instapay_exp_submit_leave_zero_balance';
export const BRAZE_SUBMIT_TIMESHEET_ZERO_BALANCE_ID = 'instapay_exp_submit_timesheet_zero_balance';
export const INSTAPAY_POPUP_CARD_ZERO_BALANCE_BRAZE_ID = 'instapay_exp_popup_zero_balance';
export const ROSTER_POPUP_ZERO_BALANCE_BRAZED_ID = 'instapay_exp_popup_roster_zero_balance';
export const RECURRING_SWAG_TILE_FOR_NOT_REGISTERED_ID = 'instapay_recurring_swag_tile_for_not_registered_2';
export const IP_NOW_SWAG_TILE_FOR_NOT_VALID_ID = 'instapay_now_swag_tile_for_not_valid';
export const RECURRING_SWAG_TILE_FOR_REGISTERED_ID = 'instapay_recurring_swag_tile_2';
export const IP_NOW_SWAG_TILE_ID = 'instapay_now_swag_tile';

export const getPopupIdByFeature = (feature: TargetedFeature, hasZeroBalance: boolean) => {
  switch (feature) {
    case 'rosters':
      return hasZeroBalance ? ROSTER_POPUP_ZERO_BALANCE_BRAZED_ID : ROSTER_POPUP_BRAZED_ID;
    default:
      return hasZeroBalance ? INSTAPAY_POPUP_CARD_ZERO_BALANCE_BRAZE_ID : INSTAPAY_POPUP_BRAZE_CARD_ID;
  }
};

export const BannerIds = {
  SWAGDB_POPUP_BANNER: 'instapay_abtest_banner_dashboard',
} as const;

export type InstapayBrazeBannerIds = (typeof BannerIds)[keyof typeof BannerIds];

export const INSTAPAY_TESTIMONIAL_CARD = 'instapay_testimonial_card';
