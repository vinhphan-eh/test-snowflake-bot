import { useMixpanel } from '../../../../common/hooks/useMixpanel';
import { EventTrackingCategory } from '../../../../common/stores/useSessionStore';
import {
  ALERT_PURCHASE_HISTORY,
  CLICK_ALERT_PURCHASE_HISTORY,
  CLICK_BUY_NOW,
  clickDropDown,
  CLICK_PRODUCT_ITEM,
  PURCHASE_HISTORY_MODULE,
  SWAG_STORE_MODULE,
  VISIT_PROCESS_ORDER_SUCCESS_SCREEN,
  clickCopyContent,
  CLICK_INTO_BOUGHT_ORDER_ITEM,
  CLICK_REDEEM_GIFTCARD,
  CLICK_HOW_TO_REDEEM,
  clickViewMore,
  SELECT_VARIANT_QUANTITY,
  SELECT_VARIANT,
  CLICK_CANCEL_CARD_PAYMENT,
  CLICK_CONFIRM_ORDER,
} from '../constants';
import type { ProductLocationKeys } from '../shop/store/useDiscountShopStore';

type BuyNowMeta = {
  productName: string;
  productCategory: string;
  source: ProductLocationKeys | '';
  buttonType: 'buy one-click now' | 'buy now';
};

type ProductMeta = {
  productName: string;
  productCategory: string;
};

type ProductItemMeta = ProductMeta & {
  source: ProductLocationKeys;
};

type ConfirmOrderMeta = ProductMeta & {
  serviceFee: number;
  variants: {
    variantCode: string;
    quantity: number;
  }[];
  source: ProductLocationKeys | '';
  paymentMethod: {
    heroPoints: number;
    creditCard: number;
    instapay: number;
  };
};

type CancelCardPaymentMeta = ProductMeta & {
  serviceFee: number;
  variants: {
    variantCode: string;
    quantity: number;
  }[];
  paymentMethod: {
    heroPoints: number;
    creditCard: number;
    instapay: number;
  };
};

type OrderSuccessMeta = ProductMeta & {
  serviceFee: number;
  // @deprecated use variants instead
  quantity?: number;
  variants: {
    variantCode: string;
    quantity: number;
  }[];
  paymentMethod: {
    heroPoints: number;
    creditCard: number;
    instapay: number;
  };
};

type BoughtOrderMeta = ProductMeta & {
  purchaseAmount: string;
};

type SelectVariantMeta = ProductMeta & {
  variantCode: string;
};

type SelectVariantQuantityMeta = ProductMeta & {
  quantity: number;
  variantCode: string;
};

export const useSwagStoreTracking = () => {
  const { eventTracking } = useMixpanel();

  const trackClickAlertPurchaseHistory = () => {
    eventTracking({
      event: CLICK_ALERT_PURCHASE_HISTORY,
      categoryName: EventTrackingCategory.USER_ACTION,
      metaData: {
        module: PURCHASE_HISTORY_MODULE,
        component: ALERT_PURCHASE_HISTORY,
      },
    });
  };

  const trackClickBuyNow = (meta: BuyNowMeta) => {
    eventTracking({
      event: CLICK_BUY_NOW,
      categoryName: 'user action',
      metaData: { ...meta, module: SWAG_STORE_MODULE },
    });
  };

  const trackConfirmOrder = (meta: ConfirmOrderMeta) => {
    eventTracking({
      event: CLICK_CONFIRM_ORDER,
      categoryName: 'user action',
      metaData: { ...meta, module: SWAG_STORE_MODULE },
    });
  };

  const trackClickProductItem = (meta: ProductItemMeta) => {
    eventTracking({
      event: CLICK_PRODUCT_ITEM,
      categoryName: 'user action',
      metaData: { ...meta, module: SWAG_STORE_MODULE },
    });
  };

  const trackClickDropdown = (key: string, meta: ProductMeta) => {
    eventTracking({
      event: clickDropDown(key),
      categoryName: 'user action',
      metaData: { ...meta, module: SWAG_STORE_MODULE },
    });
  };

  const trackOrderSuccess = (meta: OrderSuccessMeta) => {
    eventTracking({
      event: VISIT_PROCESS_ORDER_SUCCESS_SCREEN,
      categoryName: 'user action',
      metaData: { ...meta, module: SWAG_STORE_MODULE },
    });
  };

  const trackSelectVariant = (meta: SelectVariantMeta) => {
    eventTracking({
      event: SELECT_VARIANT,
      categoryName: 'user action',
      metaData: { ...meta, module: SWAG_STORE_MODULE },
    });
  };

  const trackSelectVariantQuantity = (meta: SelectVariantQuantityMeta) => {
    eventTracking({
      event: SELECT_VARIANT_QUANTITY,
      categoryName: 'user action',
      metaData: { ...meta, module: SWAG_STORE_MODULE },
    });
  };

  const trackCopyOrderContent = (label: string, meta: ProductMeta) => {
    eventTracking({
      event: clickCopyContent(label),
      categoryName: 'user action',
      metaData: { ...meta, module: PURCHASE_HISTORY_MODULE },
    });
  };

  const trackClickIntoBoughtOrderItem = (meta: BoughtOrderMeta) => {
    eventTracking({
      event: CLICK_INTO_BOUGHT_ORDER_ITEM,
      categoryName: 'user action',
      metaData: { ...meta, module: PURCHASE_HISTORY_MODULE },
    });
  };

  const trackClickRedeemGiftcard = (meta: ProductMeta) => {
    eventTracking({
      event: CLICK_REDEEM_GIFTCARD,
      categoryName: 'user action',
      metaData: { ...meta, module: PURCHASE_HISTORY_MODULE },
    });
  };

  const trackClickHowToRedeem = (meta: ProductMeta) => {
    eventTracking({
      event: CLICK_HOW_TO_REDEEM,
      categoryName: 'user action',
      metaData: { ...meta, module: PURCHASE_HISTORY_MODULE },
    });
  };

  const trackClickViewMore = (label: string) => {
    eventTracking({
      event: clickViewMore(label),
      categoryName: 'user action',
      metaData: { module: SWAG_STORE_MODULE },
    });
  };

  const trackCancelCardPayment = (meta: CancelCardPaymentMeta) => {
    eventTracking({
      event: CLICK_CANCEL_CARD_PAYMENT,
      categoryName: 'user action',
      metaData: { ...meta, module: SWAG_STORE_MODULE },
    });
  };

  return {
    trackConfirmOrder,
    trackCancelCardPayment,
    trackSelectVariant,
    trackClickAlertPurchaseHistory,
    trackClickBuyNow,
    trackClickProductItem,
    trackClickDropdown,
    trackOrderSuccess,
    trackCopyOrderContent,
    trackClickIntoBoughtOrderItem,
    trackClickRedeemGiftcard,
    trackClickHowToRedeem,
    trackClickViewMore,
    trackSelectVariantQuantity,
  };
};
