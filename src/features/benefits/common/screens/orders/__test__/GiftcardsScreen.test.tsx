import React from 'react';
import { waitForElementToBeRemoved } from '@testing-library/react-native';
import uuid from 'react-native-uuid';
import { useSuperAppTokenStore } from '../../../../../../common/auth/store/useSuperAppTokenStore';
import { useSessionStore } from '../../../../../../common/stores/useSessionStore';
import { render } from '../../../../../../common/utils/testing';
import { mockServerNode } from '../../../../../../mock-server/mockServerNode';
import {
  mockGetDiscountOrderHistoryQuery,
  OrderProductType,
  OrderStatus,
} from '../../../../../../new-graphql/generated';
import {
  aDiscountHistory,
  aDiscountOrderHistory,
  anOrderDetails,
  anOrderProduct,
  anOrderProductVariant,
  anOrderPurchaseItem,
  aDiscountOrderHistoryEdge,
} from '../../../../../../new-graphql/mocks/generated-mocks';
import { GiftcardsTab } from '../GiftcardsTab';

const aMovieTicketProduct = anOrderProduct({
  productType: OrderProductType.Ticket,
});

const aGiftCardProduct = anOrderProduct({
  productType: OrderProductType.Giftcard,
});

const aDropshipProduct = anOrderProduct({
  productType: OrderProductType.Dropship,
});

describe('GiftcardsScreen', () => {
  beforeEach(() => {
    useSessionStore.setState({ currentOrgId: 'orgId' });
    useSessionStore.setState({ currentUser: { loginProvider: 'eh', userID: 'mockUserId' } });
    useSuperAppTokenStore.setState({
      isSuperAppTokenExpired: () => false,
      freshSuperAppToken: 'mockToken',
      fetchValidSuperAppToken: async () => ({ token: 'mockToken', loginProvider: 'eh' }),
    });

    mockServerNode.use(
      mockGetDiscountOrderHistoryQuery((_, res, ctx) => {
        return res(
          ctx.data({
            me: {
              swagStore: {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                discountOrderHistory: aDiscountOrderHistory({
                  edges: [
                    // Unfulfilled order for movie tickets
                    aDiscountOrderHistoryEdge({
                      node: aDiscountHistory({
                        name: 'Unfulfilled Movie Voucher for hero',
                        orderDetails: [
                          anOrderDetails({
                            productVariant: anOrderProductVariant({
                              product: aMovieTicketProduct,
                              price: 30,
                              variantCode: 'Unfulfilled-EGOLD-CLASS-SINGLE',
                            }),
                            quantity: 1,
                            purchaseItems: [],
                            status: OrderStatus.Processing,
                          }),
                        ],
                      }),
                    }),
                    // Order for movie tickets
                    aDiscountOrderHistoryEdge({
                      node: aDiscountHistory({
                        name: 'Movie Voucher for hero',
                        orderDetails: [
                          anOrderDetails({
                            price: 22,
                            productVariant: anOrderProductVariant({
                              product: aMovieTicketProduct,
                              price: 22,
                              variantCode: 'EMOVIE-ADULT',
                            }),
                            quantity: 2,
                            purchaseItems: [
                              anOrderPurchaseItem({ id: uuid.v4().toString() }),
                              anOrderPurchaseItem({ id: uuid.v4().toString() }),
                            ],
                            status: OrderStatus.Fulfilled,
                          }),
                          anOrderDetails({
                            productVariant: anOrderProductVariant({
                              product: aMovieTicketProduct,
                              price: 30,
                              variantCode: 'EGOLD-CLASS-SINGLE',
                            }),
                            quantity: 3,
                            purchaseItems: [
                              anOrderPurchaseItem({ id: uuid.v4().toString() }),
                              anOrderPurchaseItem({ id: uuid.v4().toString() }),
                              anOrderPurchaseItem({ id: uuid.v4().toString() }),
                            ],
                            status: OrderStatus.Fulfilled,
                          }),
                        ],
                      }),
                    }),

                    // Order for giftcards
                    aDiscountOrderHistoryEdge({
                      node: aDiscountHistory({
                        name: 'Giftcard for hero',
                        createdAt: '2022-09-23T02:22:27+00:00',
                        orderDetails: [
                          anOrderDetails({
                            price: 10,
                            productVariant: anOrderProductVariant({
                              product: aGiftCardProduct,
                              price: 10,
                              variantCode: 'Giftcard-$10',
                            }),
                            quantity: 2,
                            purchaseItems: [
                              anOrderPurchaseItem({ id: uuid.v4().toString() }),
                              anOrderPurchaseItem({ id: uuid.v4().toString() }),
                            ],
                          }),
                          anOrderDetails({
                            price: 20,
                            productVariant: anOrderProductVariant({
                              product: aGiftCardProduct,
                              price: 20,
                              variantCode: 'Giftcard-$20',
                            }),
                            quantity: 1,
                            purchaseItems: [anOrderPurchaseItem({ id: uuid.v4().toString() })],
                          }),
                        ],
                        status: OrderStatus.Fulfilled,
                      }),
                    }),

                    // Order for dropship
                    aDiscountOrderHistoryEdge({
                      node: aDiscountHistory({
                        name: 'Dropship for hero',
                        orderDetails: [
                          anOrderDetails({
                            productVariant: anOrderProductVariant({
                              product: aDropshipProduct,
                              variantCode: 'Dropship-for-hero-code',
                            }),
                            quantity: 2,
                            purchaseItems: [
                              anOrderPurchaseItem({ id: uuid.v4().toString() }),
                              anOrderPurchaseItem({ id: uuid.v4().toString() }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              },
            },
          })
        );
      })
    );
  });

  it('should render enough movie ticket purchase items', async () => {
    const { findAllByText, getByTestId } = render(<GiftcardsTab />);

    await waitForElementToBeRemoved(() => getByTestId('spinner'));

    const allAdultTickets = await findAllByText('EMOVIE ADULT');
    expect(allAdultTickets.length).toBe(2);
    const allGoldTickets = await findAllByText('EGOLD CLASS SINGLE');
    expect(allGoldTickets.length).toBe(3);

    const allUnfulfilledTickets = await findAllByText('UNFULFILLED EGOLD CLASS SINGLE');
    expect(allUnfulfilledTickets.length).toBe(1);
  });

  it('should render enough giftcard purchase items', async () => {
    const { findAllByText, getByTestId } = render(<GiftcardsTab />);

    await waitForElementToBeRemoved(() => getByTestId('spinner'));

    const allGiftcards20 = await findAllByText('GIFTCARD  20');
    expect(allGiftcards20.length).toBe(1);
    const allGiftcards10 = await findAllByText('GIFTCARD  10');
    expect(allGiftcards10.length).toBe(2);
  });

  it('should not render other product type rather than gift card and movie tickets', async () => {
    const { getByTestId, queryAllByText } = render(<GiftcardsTab />);

    await waitForElementToBeRemoved(() => getByTestId('spinner'));

    const otherProduct = await queryAllByText('DROPSHIP FOR HERO CODE');
    expect(otherProduct.length).toBe(0);
  });

  it('Should render gift cards and movie tickets properly', async () => {
    const { getAllByText, getByTestId, getByText } = render(<GiftcardsTab />);

    await waitForElementToBeRemoved(() => getByTestId('spinner'));

    expect(getByText('Gift card order history')).toBeTruthy();

    // Gift cards
    expect(getAllByText('GIFTCARD 10')).toBeTruthy();
    expect(getAllByText('23 Sep 2022')).toBeTruthy();
    expect(getAllByText('$10.00')).toBeTruthy();

    // Movie tickets
    expect(getAllByText('EMOVIE ADULT')).toBeTruthy();
    expect(getAllByText('$22.00')).toBeTruthy();
  });
});
