const CustomEvents = {
  BRAZE_EVENT_CLICK_INSTAPAY_POPUP_BANNER_SWAGDB: 'click_instapay_popup_banner_at_swagdb',
} as const;

/**
 * Custom events are defined on Braze console under Data setting
 */
export type BrazeCustomEvents = (typeof CustomEvents)[keyof typeof CustomEvents];
