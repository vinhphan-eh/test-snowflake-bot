import { act, renderHook } from '../../../../../../common/utils/testing';
import { mockProductDetailStock } from '../../../../../../graphql/handlers/custom-mock/productDetail';
import { mockSwagStoreOffer } from '../../../../../../new-graphql/handlers/custom-mock/swagStore';
import {
  prepareDataBeforeNavigateV2,
  prepareDataBeforeNavigate,
  useDiscountShopStore,
  updateProductDetailWithFreshData,
  getProductDetailFromStore,
  cleanUpProductDetail,
} from '../useDiscountShopStore';

const mockSwagStoreOfferId = '04065d37-7be6-42c1-a43c-8bdf34c0aa8f';
const mockProductDetailStockId = '207fb444-f281-4241-8c5e-f42a0e8755af';

const newSwagStoreOffer = {
  id: '04065d37-7be6-42c1-a43c-8bdf34c0aa8f',
  name: 'New name',
  title: 'New title',
  price: 100,
  discountPrice: 95,
  serviceFee: 0,
  productCode: 'priceline',
  imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/4774/Image_gift_card_pricelinepharmacy.png',
  productType: 'GROCERY',
  description:
    'Valid only in-store, cannot be used online. This eGift Card is only accepted at Myer stores, and is NOT accepted at any Coles Group stores.\r\n\r\nAny unused amount will remain on your eGift Card and can be used towards your next purchase.',
  termsAndConditions:
    'Valid only in-store, cannot be used online. Treat this gift card as cash. Lost or stolen gift cards will not be replaced or refunded. Not to be used for the payment of credit or store accounts, online purchases and some leased businesses. Not redeemable for cash and cannot be exchanged. Any unused amount after the expiry date of this card will not be refunded or credited. Gift cards are not reloadable. To be used for the purchase of goods and services at Myer stores around Australia. For full Terms of Use visit myer.com.au/giftcards or call 1300 398 226.',
  country: 'AU',
  currency: '',
  priceInPoints: 2193,
  discountPriceInPoints: 2084,
};

describe('useDiscountShoptStore', () => {
  it('prepareDataBeforeNavigateV2 should save data correctly', () => {
    const store = renderHook(() => useDiscountShopStore());

    act(() => {
      prepareDataBeforeNavigateV2(mockSwagStoreOffer, 'buy again carousel');
    });

    expect(store.result.current.currentId).toBe(mockSwagStoreOfferId);
    expect(store.result.current.productDetails[mockSwagStoreOfferId]).toMatchObject({
      id: '04065d37-7be6-42c1-a43c-8bdf34c0aa8f',
      discountPrice: 95,
      discountPriceInPoints: 2084,
      name: 'Priceline Gift Card',
      price: 100,
      priceInPoints: 2193,
      productCode: 'priceline',
      serviceFee: 0,
      title: 'Priceline Gift Card',
    });
    expect(store.result.current.location).toBe('buy again carousel');
  });

  it('prepareDataBeforeNavigate should save data correctly', () => {
    const store = renderHook(() => useDiscountShopStore());

    act(() => {
      prepareDataBeforeNavigate(mockProductDetailStock(), 'buy again carousel');
    });

    expect(store.result.current.currentId).toBe(mockProductDetailStockId);
    expect(store.result.current.productDetails[mockProductDetailStockId]).toMatchObject({
      id: '207fb444-f281-4241-8c5e-f42a0e8755af',
      name: 'JB Hi-Fi Gift Card',
      title: 'JB Hi-Fi Gift Card',
      price: 100,
      discountPrice: 95,
      priceInPoints: 220,
      discountPriceInPoints: 209,
      productCode: 'jb-hi-fi-gift-card',
    });
    expect(store.result.current.location).toBe('buy again carousel');
  });

  it('updateProductDetailWithFreshData should update product detail correctly', () => {
    const store = renderHook(() => useDiscountShopStore());
    store.result.current.currentId = mockProductDetailStockId;

    act(() => {
      prepareDataBeforeNavigateV2(mockSwagStoreOffer, 'buy again carousel');
    });

    expect(store.result.current.currentId).toBe(mockSwagStoreOfferId);
    expect(store.result.current.productDetails[mockSwagStoreOfferId]).toMatchObject({
      id: '04065d37-7be6-42c1-a43c-8bdf34c0aa8f',
      discountPrice: 95,
      discountPriceInPoints: 2084,
      name: 'Priceline Gift Card',
      price: 100,
      priceInPoints: 2193,
      productCode: 'priceline',
      serviceFee: 0,
      title: 'Priceline Gift Card',
    });
    expect(store.result.current.location).toBe('buy again carousel');

    act(() => {
      updateProductDetailWithFreshData(newSwagStoreOffer);
    });

    expect(store.result.current.currentId).toBe(mockSwagStoreOfferId);
    expect(store.result.current.productDetails[mockSwagStoreOfferId]).toMatchObject({
      id: '04065d37-7be6-42c1-a43c-8bdf34c0aa8f',
      discountPrice: 95,
      discountPriceInPoints: 2084,
      name: 'New name',
      price: 100,
      priceInPoints: 2193,
      productCode: 'priceline',
      serviceFee: 0,
      title: 'New title',
    });
  });

  it('getProductDetailFromStore should return product detail correctly', () => {
    const store = renderHook(() => useDiscountShopStore());
    store.result.current.currentId = mockProductDetailStockId;
    store.result.current.productDetails[mockProductDetailStockId] = mockProductDetailStock();
    store.result.current.productDetails[mockSwagStoreOfferId] = mockSwagStoreOffer;

    const returnDetail = getProductDetailFromStore();

    expect(returnDetail).toMatchObject({
      id: '207fb444-f281-4241-8c5e-f42a0e8755af',
      name: 'JB Hi-Fi Gift Card',
      title: 'JB Hi-Fi Gift Card',
      price: 100,
      discountPrice: 95,
      priceInPoints: 220,
      discountPriceInPoints: 209,
      productCode: 'jb-hi-fi-gift-card',
    });
  });

  it('cleanUpProductDetail should return product detail correctly', () => {
    const store = renderHook(() => useDiscountShopStore());
    store.result.current.currentId = mockProductDetailStockId;
    store.result.current.productDetails[mockProductDetailStockId] = mockProductDetailStock();
    store.result.current.productDetails[mockSwagStoreOfferId] = mockSwagStoreOffer;

    expect(Object.keys(store.result.current.productDetails).length).toBe(2);

    act(() => {
      cleanUpProductDetail();
    });

    const returnDetail = getProductDetailFromStore();

    expect(returnDetail).toBeUndefined();
    expect(Object.keys(store.result.current.productDetails).length).toBe(1);
  });
});
