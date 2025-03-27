import React from 'react';
import { Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { waitForElementToBeRemoved, type RenderAPI } from '@testing-library/react-native';
import { mockInitPaymentSheet, mockPresentPaymentSheet } from '../../../../../../../test-setup/after-env/stripe.setup';
import { mockUseIsAccountAU } from '../../../../../../common/hooks/__mocks__/useIsAccountAU';
import { appVersion } from '../../../../../../common/libs/appVersion';
import { usePermissionStore, type PermissionData } from '../../../../../../common/stores/usePermissionStore';
import { useSessionStore } from '../../../../../../common/stores/useSessionStore';
import { fireEvent, render, renderHook, waitFor } from '../../../../../../common/utils/testing';
import { mockServerNode } from '../../../../../../mock-server/mockServerNode';
import {
  mockCreateStripeClientTokenMutation,
  mockGetDiscountShopProductDetailQuery,
  mockGetHeroPointsBalanceQuery,
  mockGetStripePublishableKeyQuery,
  mockMakeStripePaymentMutation,
  type GetDiscountOrderHistoryQuery,
  type GetDiscountShopProductDetailQuery,
} from '../../../../../../new-graphql/generated';
import {
  aHeroPoints,
  aProduct,
  aPublishableKey,
  aShopProductDetails,
  aShopProductVariant,
} from '../../../../../../new-graphql/mocks/generated-mocks';
import { prepareDataBeforeNavigate } from '../../store/useDiscountShopStore';
import { ProductDetailScreen } from '../ProductDetailScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('ProductDetailScreen', () => {
  beforeEach(() => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentOrgId = '123';

    mockedUseRoute.mockReturnValue({ params: { productCode: 'productCode' }, key: '', name: '' });
    usePermissionStore.setState({
      permissions: {
        heroPoints: { view: true },
        ebenServiceFee: { view: true },
      } as unknown as PermissionData,
    });
  });

  it('should show error page properly', async () => {
    mockServerNode.use(
      mockGetDiscountShopProductDetailQuery((_, res, ctx) => {
        return res(ctx.delay(100), ctx.status(400), ctx.errors([{ message: 'some error' }]));
      })
    );
    const { findByText, queryByLabelText } = render(<ProductDetailScreen />);
    expect(await findByText('Please try again later')).toBeTruthy();
    expect(queryByLabelText('Main image')).toBeNull();
    expect(queryByLabelText('Description')).toBeNull();
    expect(queryByLabelText('How it works')).toBeNull();
    expect(queryByLabelText('Terms and conditions')).toBeNull();
    expect(queryByLabelText('Quantity selection')).toBeNull();
    expect(queryByLabelText('Buy now')).toBeNull();
  });

  it('should disable Buy button when stock is zero', async () => {
    mockServerNode.use(
      mockGetDiscountShopProductDetailQuery((_, res, context) =>
        res(
          context.data({
            me: {
              swagStore: {
                discountShopProductDetails: {
                  product: aShopProductDetails({
                    name: 'Product Name',
                    productVariants: [
                      aShopProductVariant({
                        price: 100,
                        discountPrice: 95,
                        priceInPoints: 1000,
                        discountPriceInPoints: 950,
                        stockAvailable: false,
                        numberInStock: 0,
                      }),
                    ],
                  }),
                },
              },
            },
          } as unknown as GetDiscountOrderHistoryQuery)
        )
      )
    );
    const { findByTestId } = render(<ProductDetailScreen />);
    const buyButton = await findByTestId('buy-button');
    expect(buyButton).toBeDisabled();
  });

  describe('Giftcard product', () => {
    const mockProduct = aShopProductDetails({
      name: 'Product Name',
      productType: 'giftcard',
      price: 10,
      discountPrice: 5,
      serviceFee: 1,
      productVariants: [
        aShopProductVariant({
          price: 100,
          discountPrice: 95,
          priceInPoints: 1000,
          discountPriceInPoints: 950,
          stockAvailable: true,
          numberInStock: 3,
        }),
      ],
    });
    beforeEach(() => {
      mockServerNode.use(
        // Default single-variant product
        mockGetDiscountShopProductDetailQuery((_, res, context) =>
          res(
            context.data({
              me: {
                swagStore: {
                  discountShopProductDetails: {
                    product: mockProduct,
                  },
                },
              },
            } as unknown as GetDiscountShopProductDetailQuery)
          )
        ),
        // Mock Points balance
        mockGetHeroPointsBalanceQuery((_, res, context) =>
          res(
            context.data({
              me: {
                heroPoints: aHeroPoints({ balance: 1000 }),
              },
            })
          )
        ),
        // Mock stripe public key
        mockGetStripePublishableKeyQuery((_, res, context) =>
          res(
            context.data({
              me: {
                swagStore: {
                  stripePublishableKey: {
                    ...aPublishableKey(),
                    __typename: 'PublishableKey',
                  },
                },
              },
            })
          )
        )
      );
    });

    describe('no Hero Points balance', () => {
      let renderAPI: RenderAPI;

      beforeEach(async () => {
        mockServerNode.use(
          // Mock Points balance
          mockGetHeroPointsBalanceQuery((_, res, context) =>
            res(
              context.data({
                me: {
                  heroPoints: aHeroPoints({ balance: 0 }),
                },
              })
            )
          )
        );

        renderAPI = render(<ProductDetailScreen />);

        await waitForElementToBeRemoved(() => renderAPI.getByTestId('screen-loading-spinner'));
      });

      it('should not display hero points slider', async () => {
        // Hero Points slider is available
        expect(renderAPI.queryByTestId('hero-points-slider')).toBeFalsy();
      });

      it('should render pay with credit card by default', async () => {
        expect(renderAPI.getByText('Pay $99.85')).toBeTruthy();
      });

      describe('hit pay button', () => {
        const mockPurchaseMutation = jest.fn();
        const mockPaymentIntentMutation = jest.fn();

        beforeEach(() => {
          mockInitPaymentSheet.mockImplementation(() => Promise.resolve({ paymentOption: {}, error: null }));
          mockPresentPaymentSheet.mockImplementation(() => Promise.resolve({ paymentOption: {}, error: null }));
          Platform.OS = 'ios';

          mockServerNode.use(
            mockMakeStripePaymentMutation((req, res, context) => {
              mockPurchaseMutation(req.variables);
              return res(context.data({}));
            }),
            mockCreateStripeClientTokenMutation((req, res, context) => {
              mockPaymentIntentMutation(req.variables);
              return res(
                context.data({ payment: { createStripeClientToken: { clientToken: 'PAYMENT_INTENT_TOKEN' } } })
              );
            })
          );
        });

        it('should init payment intent with correct amount & currency', async () => {
          fireEvent.press(renderAPI.getByTestId('buy-button'));

          await waitFor(() => {
            expect(mockPaymentIntentMutation).toBeCalledWith({
              createStripeClientTokenInput: {
                amount: '99.85',
                currency: mockProduct.currency,
                ehToken: 'mockedToken',
                orgId: '123',
                // generated by uuidv4(), so just expect a string.
                idempotencyKey: expect.any(String),
              },
            });
          });
        });

        it('should pay with Stripe', async () => {
          fireEvent.press(renderAPI.getByTestId('buy-button'));

          await waitFor(() => {
            expect(mockInitPaymentSheet).toBeCalledWith(
              expect.objectContaining({ paymentIntentClientSecret: 'PAYMENT_INTENT_TOKEN' })
            );
            expect(mockPresentPaymentSheet).toBeCalled();
          });
        });

        it('should submit correct variables to BFF API', async () => {
          fireEvent.press(renderAPI.getByTestId('buy-button'));

          await waitFor(() => {
            expect(mockPurchaseMutation).toBeCalledWith({
              makeStripePaymentInput: {
                deviceData: '',
                ehPlatform: `ios_${appVersion.CURRENT_PERSONAL_VERSION}`,
                ehToken: 'mockedToken',
                items: [
                  {
                    quantity: 1,
                    variantCode: 'consequatur',
                  },
                ],
                nonce: 'PAYMENT_INTENT_TOKEN',
                orgId: '123',
                paymentMethod: {
                  creditCard: '95.95',
                  heroPoints: '0',
                  instapay: '0',
                },
                serviceFee: '0.95',
              },
            });
          });
        });
      });
    });

    describe('hero points enough to cover the whole order by default', () => {
      beforeEach(() => {
        mockServerNode.use(
          // Mock Points balance
          mockGetHeroPointsBalanceQuery((_, res, context) =>
            res(
              context.data({
                me: {
                  heroPoints: aHeroPoints({ balance: 999999 }),
                },
              })
            )
          )
        );
      });

      it('should render pay with points', async () => {
        const renderAPI = render(<ProductDetailScreen />);

        await waitForElementToBeRemoved(() => renderAPI.getByTestId('screen-loading-spinner'));

        expect(renderAPI.getByText('Pay 950 PTS')).toBeTruthy();
      });
    });

    it('should render product item', async () => {
      mockUseIsAccountAU.mockReturnValue(true);
      const renderAPI = render(<ProductDetailScreen />);

      await waitForElementToBeRemoved(() => renderAPI.getByTestId('screen-loading-spinner'));

      expect(renderAPI.queryByText('Product Name')).toBeTruthy();
      expect(renderAPI.queryByText('Save $4.95')).toBeTruthy();

      // Hero Points slider is available
      expect(await renderAPI.findByTestId('hero-points-slider')).toBeTruthy();
      // Card info is available
      expect(renderAPI.queryByTestId('card-info')).toBeTruthy();

      // Product details accordion is available
      expect(renderAPI.queryByTestId('product-details-accordion')).toBeTruthy();

      // Buy now button is available
      expect(renderAPI.queryByTestId('buy-button')).toBeTruthy();
    });

    it('should allow purchase only single variant', async () => {
      const renderAPI = render(<ProductDetailScreen />);

      await waitForElementToBeRemoved(() => renderAPI.getByTestId('screen-loading-spinner'));

      expect(renderAPI.queryByTestId('single-variant-quantity-select')).toBeTruthy();
    });

    describe('When having cache of product detail', () => {
      beforeEach(() => {
        prepareDataBeforeNavigate(aProduct(), 'view more screen');
      });

      it('should not render loading of whole screen', () => {
        const renderAPI = render(<ProductDetailScreen />);

        expect(renderAPI.queryByTestId('screen-loading-spinner')).toBeFalsy();
      });

      it('should disable buy button while loading latest product data', () => {
        const renderAPI = render(<ProductDetailScreen />);

        expect(renderAPI.getByTestId('buy-button')).toBeDisabled();
      });
    });
  });

  describe('Movie ticket product', () => {
    const mockProduct = aShopProductDetails({
      name: 'Product Name',
      productType: 'ticket',
      productVariants: [
        aShopProductVariant({
          price: 100,
          discountPrice: 95,
          priceInPoints: 1000,
          discountPriceInPoints: 950,
          stockAvailable: true,
          numberInStock: 3,
        }),
        aShopProductVariant({
          price: 100,
          discountPrice: 95,
          priceInPoints: 1000,
          discountPriceInPoints: 950,
          stockAvailable: true,
          numberInStock: 3,
        }),
      ],
    });

    beforeEach(() => {
      mockServerNode.use(
        // Default single-variant product
        mockGetDiscountShopProductDetailQuery((_, res, context) =>
          res(
            context.data({
              me: {
                swagStore: {
                  discountShopProductDetails: {
                    product: mockProduct,
                  },
                },
              },
            } as unknown as GetDiscountShopProductDetailQuery)
          )
        ),
        // Mock Points balance
        mockGetHeroPointsBalanceQuery((_, res, context) =>
          res(
            context.data({
              me: {
                heroPoints: aHeroPoints({ balance: 1000 }),
              },
            })
          )
        ),
        // Mock stripe public key
        mockGetStripePublishableKeyQuery((_, res, context) =>
          res(
            context.data({
              me: {
                swagStore: {
                  stripePublishableKey: {
                    ...aPublishableKey(),
                    __typename: 'PublishableKey',
                  },
                },
              },
            })
          )
        )
      );
    });

    it('should allow purchase multiple variants', async () => {
      const renderAPI = render(<ProductDetailScreen />);

      await waitForElementToBeRemoved(() => renderAPI.getByTestId('screen-loading-spinner'));

      expect(renderAPI.getByTestId('multi-variant-quantity-select')).toBeTruthy();
    });
  });
});
