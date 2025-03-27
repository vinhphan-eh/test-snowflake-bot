import React from 'react';
import type { InfiniteData } from 'react-query';
import { mockedNavigate } from '../../../../../../../__mocks__/react-navigation';
import { mockUseIsAccountUK } from '../../../../../../common/hooks/__mocks__/useIsAccountUK';
import * as sessionStore from '../../../../../../common/stores/useSessionStore';
import type { MockQueryResult } from '../../../../../../common/types/react-query';
import { render, fireEvent, renderHook, waitFor } from '../../../../../../common/utils/testing';
import type {
  DiscountHistory,
  GetDiscountOrderHistoryQuery,
  OrderStatus,
} from '../../../../../../new-graphql/generated';
import { OrderProductType, useInfiniteGetDiscountOrderHistoryQuery } from '../../../../../../new-graphql/generated';
import { MockGetOrderHistory } from '../../../../../../new-graphql/handlers/custom-mock/orderHistory';
import { useSwagStoreTracking } from '../../../hooks/useSwagStoreTracking';
import { usePurchaseHistoryStore } from '../../store/usePurchaseHistoryStore';
import { OrderHistoryScreen } from '../OrderHistoryScreen';

const mockUseInfiniteGetDiscountOrderHistoryQuery = useInfiniteGetDiscountOrderHistoryQuery as unknown as jest.Mock<
  MockQueryResult<InfiniteData<GetDiscountOrderHistoryQuery>>
>;
(mockUseInfiniteGetDiscountOrderHistoryQuery as unknown as { getKey: () => string }).getKey = jest.fn();

jest.mock('../../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../../new-graphql/generated'),
  useInfiniteGetDiscountOrderHistoryQuery: jest.fn(),
}));

jest.mock('../../../hooks/useSwagStoreTracking', () => ({
  useSwagStoreTracking: jest.fn(),
}));

const firstPageLength = MockGetOrderHistory['1'].me.swagStore.discountOrderHistory.edges.filter(
  e => e.node.orderDetails[0].productVariant.product.productType === OrderProductType.Giftcard
).length;

const fulfilledItem: DiscountHistory = {
  id: '2306',
  name: 'JB Hi-Fi Gift Card 100 eGift Card',
  memberId: '425a4dd3-3709-4929-ae45-574e7d653649',
  status: 'fulfilled' as OrderStatus,
  createdAt: '2022-09-23T05:27:59+00:00',
  billableAmount: 95.94,
  transactionFee: 0.94,
  freightCost: 0.0,
  orderDetails: [
    {
      id: '2352',
      discount: 5.0,
      quantity: 1,
      price: 100.0,
      billableAmount: 95.94,
      transactionFee: 0.94,
      status: 'fulfilled' as OrderStatus,
      freightCost: 0.0,
      currency: 'AUD',
      purchaseItems: [
        {
          id: 'e1c9a31e-dd2c-4928-b6db-908e73a7b528',
          data: {
            issuedAt: '2022/09/23',
            pinNumber: '3634',
            cardNumber: '502904030365203495',
            serialNumber: '3652034',
            activationUrl:
              'https://stage.viicloud.com.au/digital/dd.aspx?c=502904030365203495&h=0x17c16840805a70de11df825997de8152192a4c461be9d170ddc0fb9e51ee3506',
            orderDetailId: 'fa37a896-93fc-4c9b-8846-cdd2a5de72af',
          },
          purchaseId: '143a6814-6fcb-4d14-b9f3-101583592af7',
          productVariantId: 'cfee754a-7bdb-4602-b5be-ffc5e456d44d',
        },
      ],
      productVariant: {
        variantCode: 'jb-hi-fi-gift-card-100',
        price: 100.0,
        imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/product_variants/9663/CardDesignCorp.jpg',
        discountPrice: 95.0,
        amount: 100.0,
        product: {
          id: '207fb444-f281-4241-8c5e-f42a0e8755af',
          code: 'jb-hi-fi-gift-card',
          name: 'JB Hi-Fi Gift Card',
          title: 'JB Hi-Fi Gift Card',
          imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9641/CardDesignCorp.jpg',
          logoUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9641/CardDesignCorp.jpg',
          email: null,
          description:
            "JB Hi-Fi Gift Cards are the perfect gift no matter what the reason. You can send a Gift Card in the post or by email, however you like. Send it to the lucky recipient or to yourself.  And there's no rush because they never expire.\nPlease be assured that JB Hi-Fi will accept the use of Gift Cards for all of its products, subject to our terms and conditions.",
          howItWorks:
            'To redeem this gift card:</br>1. Go to the Payment section in the Vii app</br>2. Tap Add Payment Method and select Gift Card </br>3. Enter Gift Code',
          productType: 'Giftcard' as OrderProductType,
        },
      },
    },
  ],
};

describe('Order History Screen', () => {
  const mockSetAlert = jest.fn();
  const mockTrackFn = jest.fn();
  const mockTrackClickOderItem = jest.fn();

  beforeEach(() => {
    mockUseInfiniteGetDiscountOrderHistoryQuery.mockReturnValue({
      isLoading: false,
      data: {
        pages: [MockGetOrderHistory['1']],
      } as never,
    });

    jest.spyOn(sessionStore, 'useSessionStore').mockReturnValue({
      currentOrgId: '123',
    });
    mockUseIsAccountUK.mockReturnValue(false);

    (useSwagStoreTracking as jest.Mock).mockReturnValue({
      trackClickAlertPurchaseHistory: mockTrackFn,
      trackClickIntoBoughtOrderItem: mockTrackClickOderItem,
    });

    const purchaseHistoryStore = renderHook(() => usePurchaseHistoryStore());
    purchaseHistoryStore.result.current.showMultiProductsAlert = true;
    purchaseHistoryStore.result.current.setAlertVisibility = mockSetAlert;
  });
  it('should render loading at initialize', async () => {
    mockUseInfiniteGetDiscountOrderHistoryQuery.mockReturnValue({
      isLoading: true,
      data: {
        pages: [MockGetOrderHistory['1']],
      } as never,
    });
    const { findByLabelText } = render(<OrderHistoryScreen />);
    expect(await findByLabelText('Spinner')).toBeTruthy();
  });

  it('should render order items list', async () => {
    const { getAllByLabelText } = render(<OrderHistoryScreen />);
    const orderItems = getAllByLabelText('Order item');
    expect(orderItems.length).toBe(firstPageLength);
  });

  it('should show alert for multiple products and work correctly', async () => {
    const { findByTestId, findByText, getByText } = render(<OrderHistoryScreen />);

    fireEvent.press(await findByTestId('alert-close-icon')); // press close alert icon
    expect(mockSetAlert).toBeCalledWith(false);
    expect(mockTrackFn).toBeCalled();

    expect(getByText('Gift card Purchase history')).toBeTruthy();
    expect(await findByText('Don’t worry, your purchase history for other items still exist!')).toBeTruthy();
    expect(
      await findByText('We’re working on bringing them here soon. For now, they can be viewed in your HR web app.')
    ).toBeTruthy();
  });

  it('should show general error ui when error at initialize', async () => {
    mockUseInfiniteGetDiscountOrderHistoryQuery.mockReturnValue({
      isLoading: false,
      isLoadingError: true,
      data: {
        pages: [MockGetOrderHistory['1']],
      } as never,
    });
    const { findByText, queryAllByLabelText, queryByLabelText } = render(<OrderHistoryScreen />);
    expect(await findByText(`We're sorry, something went wrong`)).toBeTruthy();
    expect(await findByText('Please try again later')).toBeTruthy();
    expect(queryByLabelText('Order item list')).toBeNull();
    expect(queryAllByLabelText('Order item').length).toEqual(0);
  });

  it('should show no purchase when no items found', async () => {
    mockUseInfiniteGetDiscountOrderHistoryQuery.mockReturnValue({
      isLoading: false,
      isLoadingError: false,
      data: {
        pages: [
          {
            me: {
              swagStore: {
                discountOrderHistory: {
                  edges: [],
                },
              },
            },
          },
        ],
      } as never,
    });
    const { findByText, queryAllByLabelText, queryByText } = render(<OrderHistoryScreen />);
    expect(queryByText('Don’t worry, your purchase history for other items still exist!')).toBeNull();
    expect(
      queryByText('We’re working on bringing them here soon. For now, they can be viewed in your HR web app.')
    ).toBeNull();
    expect(await findByText('You haven’t made any purchases.')).toBeTruthy();
    expect(queryAllByLabelText('Order item').length).toEqual(0);
  });

  it('should go to order details', async () => {
    mockUseInfiniteGetDiscountOrderHistoryQuery.mockReturnValue({
      isLoading: false,
      isLoadingError: false,
      data: {
        pages: [MockGetOrderHistory['1']],
      } as never,
    });
    const { findAllByLabelText, findAllByTestId } = render(<OrderHistoryScreen />);
    const orderItems = await findAllByLabelText('Order item');

    const purchaseItem = await findAllByTestId('purchase_item_0');
    expect(purchaseItem).toBeTruthy();
    expect(orderItems.length).toBe(4);
    fireEvent.press(purchaseItem[1]);
    await waitFor(() => {
      expect(mockTrackClickOderItem).toBeCalledWith({
        productName: 'jb hi fi gift card 100',
        productCategory: 'Giftcard',
        purchaseAmount: '$95.94',
      });
      expect(mockedNavigate).toBeCalledWith('OrderDetails', {
        name: 'jb hi fi gift card 100',
        orderDetails: fulfilledItem.orderDetails[0],
        purchaseItem: fulfilledItem.orderDetails?.[0].purchaseItems?.[0],
      });
    });
  });

  it('should not show alert if account is UK', async () => {
    mockUseIsAccountUK.mockReturnValue(true);
    const { getByText } = render(<OrderHistoryScreen />);
    expect(() => getByText('Don’t worry, your purchase history for other items still exist!')).toThrowError();
  });
});
