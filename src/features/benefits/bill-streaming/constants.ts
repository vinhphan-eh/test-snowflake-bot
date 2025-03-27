import type { ImageSourcePropType } from 'react-native';

export const WAITLIST_POLICY_LINK = 'https://employmenthero.com/legals/privacy-policy/';
export const EH_GROUP_LINK = 'https://employmenthero.com/legals/privacy-policy/data-processing/affiliates/';

export type BillOfferDetailData = {
  headerTitle: string;
  coverImg: ImageSourcePropType;
  logoImg: ImageSourcePropType;
  title: string;
  supplier: string;
  estBill: string;
  youPay: string;
  swagSaving: string;
  dropdown: {
    description: string | JSX.Element;
    howItWorks: string | JSX.Element;
    aboutCompany: string | JSX.Element;
    termsAndConditions: string | JSX.Element;
  };
};

// Mixpanel constants
export const BENEFITS_BILL_MODULE = 'Benefits Bill';
export const VISIT_BILL_PAGE_EVENT = 'Visit benefits bill page';
export const CLICK_ON_COMING_SOON_EVENT = 'Click on bill features coming soon';
export const CLICK_ON_BILL_TILE_EVENT = 'Click on bill tile';
export const VISIT_BILL_OFFER_DETAIL_PAGE_EVENT = 'Visit bill offer detail page';
export const CLICK_BILL_SIGN_UP_EVENT = 'Click on Bill sign up';
export const CLICK_GOT_IT_EVENT = 'Click Got it';
export const CLICK_OFFER_TILE_EVENT = 'Click on online offer tile';
export const CLICK_GO_TO_BILL_MGMT_EVENT = 'Click go to bill management';
export const CLICK_GO_BACK_TO_BILL_EVENT = 'Click on Back to bill';
export const CLICK_JOIN_THE_WAITLIST = `Click 'join the waitlist'`;
export const SELECT_STATE_TO_VIEW_SE_OFFER = `Select a state to view SE offer`;

export const BILL_MGMT_MODULE_NAME = 'Bill Mgmt';
