import { produce } from 'immer';
import { create } from 'zustand';
import type { Product, ShopProductDetails, SwagStoreOffer } from '../../../../../new-graphql/generated';
import type { StripeCardData } from '../../../common/types/CreditCardData';

const ProductLocation = {
  BUY_AGAIN_CAROUSEL: 'buy again carousel',
  POPULAR_CAROUSEL: 'popular carousel',
  STORE_TAB_SECTION: 'store tab section',

  VIEW_MORE_SCREEN: 'view more screen',

  FEATURED_SECTION: 'featured section',
  HOME_TAB_POPULAR_SECTION: 'home tab popular carousel ',
  BUY_AGAIN_CAROUSEL_HOME_TAB: 'buy again carousel home tab',
  BUY_AGAIN_CAROUSEL_ONLINE_TAB: 'buy again carousel online tab',
  GIFT_CARDS_GRID_ONLINE_TAB: 'gift card grid online tab',
  GIFT_CARDS_CAROUSEL_ONLINE_TAB: 'gift card carousel online tab',
  SEARCH_ALL_PRODUCTS_SCREEN: 'search all products screen',
  GIFT_CARDS_SEARCH_SCREEN: 'gift card search screen',
} as const;

export type ProductLocationKeys = (typeof ProductLocation)[keyof typeof ProductLocation];

export type BalanceType = {
  heroPoints?: number;
  creditCard?: number;
  instapay?: number;
};

type PaymentDetail = {
  balance?: BalanceType;
  selectedCard?: StripeCardData;
};

export type DiscountShopStore = {
  quantity?: number;
  productDetails: Record<string, Partial<ShopProductDetails>>;
  currentId?: string;
  payment?: PaymentDetail;
  location?: ProductLocationKeys;
  maxHeroBalanceToRespectStripeMinimum?: number;
};

export const useDiscountShopStore = create<DiscountShopStore>()(() => ({
  productDetails: {},
}));

export const clearStorePayment = () => {
  useDiscountShopStore.setState({ payment: undefined });
};

export const savePaymentDetail = (data: PaymentDetail) => {
  useDiscountShopStore.setState({
    payment: data,
  });
};

export const saveSelectedCard = (selectedCard: StripeCardData) => {
  useDiscountShopStore.setState(state => ({
    payment: {
      ...state.payment,
      selectedCard,
    },
  }));
};

export const clearEverythingRelatedToPayment = () => {
  useDiscountShopStore.setState({ payment: undefined, maxHeroBalanceToRespectStripeMinimum: undefined });
};

export const prepareDataBeforeNavigate = (item: Product, location: ProductLocationKeys) => {
  const {
    currency,
    discountPrice,
    discountPriceInPoints,
    id,
    image,
    name,
    price,
    priceInPoints,
    productCode,
    serviceFee,
    title,
  } = item;
  useDiscountShopStore.setState(
    produce((state: DiscountShopStore) => {
      // eslint-disable-next-line no-param-reassign
      state.quantity = 1;
      // eslint-disable-next-line no-param-reassign
      state.location = location;
      // eslint-disable-next-line no-param-reassign
      state.currentId = id;
      // eslint-disable-next-line no-param-reassign
      state.productDetails[id] = {
        id,
        name,
        price,
        discountPrice,
        title,
        image,
        productCode,
        serviceFee,
        currency,
        priceInPoints,
        discountPriceInPoints,
      };
    })
  );
};

export const prepareDataBeforeNavigateV2 = (item: SwagStoreOffer, location: ProductLocationKeys) => {
  const {
    currency,
    discountPrice,
    discountPriceInPoints,
    id,
    imageUrl,
    name,
    price,
    priceInPoints,
    productCode,
    serviceFee,
    title,
  } = item;

  useDiscountShopStore.setState(
    produce((state: DiscountShopStore) => {
      // eslint-disable-next-line no-param-reassign
      state.quantity = 1;
      // eslint-disable-next-line no-param-reassign
      state.location = location;
      // eslint-disable-next-line no-param-reassign
      state.currentId = id;
      // eslint-disable-next-line no-param-reassign
      state.productDetails[id] = {
        id,
        name,
        price,
        discountPrice,
        title,
        image: {
          large: {},
          product: {},
          small: {},
          url: imageUrl,
        },
        productCode,
        serviceFee,
        currency,
        priceInPoints,
        discountPriceInPoints,
      };
    })
  );
};

export const getProductDetailFromStore = () => {
  const { currentId, productDetails } = useDiscountShopStore.getState();
  return currentId ? productDetails[currentId] : undefined;
};

export const updateProductDetailWithFreshData = (data: Partial<ShopProductDetails>) => {
  useDiscountShopStore.setState(
    produce((state: DiscountShopStore) => {
      if (state.currentId && state.currentId === data.id) {
        // eslint-disable-next-line no-param-reassign
        state.productDetails[state.currentId] = data;
      }
    })
  );
};

export const cleanUpProductDetail = () => {
  useDiscountShopStore.setState(
    produce((state: DiscountShopStore) => {
      if (state.currentId) {
        // eslint-disable-next-line no-param-reassign
        delete state.productDetails[state.currentId];
        // eslint-disable-next-line no-param-reassign
        state.currentId = undefined;
      }
    })
  );
};
