/* eslint-disable prefer-destructuring */
import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { MockGetCatalogues } from '../../../../../graphql/handlers/custom-mock/catalogues';
import { mockUseGetPromotedGiftcard } from '../../hooks/__mocks__/useGetPromotedGiftCard';
import { prepareDataBeforeNavigate } from '../../shop/store/useDiscountShopStore';
import { PromotedGiftCard } from '../PromotedGiftCards';

jest.mock('../../shop/store/useDiscountShopStore');

const popularItem = MockGetCatalogues[1].items[1];
const buyAgainItem = MockGetCatalogues[1].items[0];

describe('PromotedGiftCard', () => {
  beforeEach(() => {
    mockUseGetPromotedGiftcard.mockImplementation(data => {
      if (data.type === 'buy again') {
        return {
          data: {
            me: {
              swagStore: {
                buyAgainGiftCards: {
                  edges: [
                    {
                      node: buyAgainItem,
                    },
                  ],
                },
              },
            },
          },
          isLoading: false,
          isLoadingError: false,
          isSuccess: true,
        } as never;
      }
      return {
        data: {
          popularGiftCards: [popularItem],
        },
        isLoading: false,
        isLoadingError: false,
        isSuccess: true,
      } as never;
    });
  });

  it('should not render if error', () => {
    mockUseGetPromotedGiftcard.mockImplementation(data => {
      if (data.type === 'buy again') {
        return {
          data: {
            me: {
              swagStore: {
                buyAgainGiftCards: {
                  edges: [],
                },
              },
            },
          },
          isLoading: false,
        } as never;
      }
      return {
        data: {
          popularGiftCards: [],
        },
        isLoading: false,
      } as never;
    });
    const { queryByText } = render(
      <PromotedGiftCard location="buy again carousel" carouselType="buy again" title="Buy Again" />
    );
    expect(queryByText('Buy Again')).toBeNull();
  });

  it('should not render  when no data', () => {
    mockUseGetPromotedGiftcard.mockImplementation(data => {
      if (data.type === 'buy again') {
        return {
          data: {
            me: {
              swagStore: {
                buyAgainGiftCards: {
                  edges: [],
                },
              },
            },
          },
          isLoading: false,
        } as never;
      }
      return {
        data: {
          popularGiftCards: [],
        },
        isLoading: false,
      } as never;
    });
    const { queryByText } = render(
      <PromotedGiftCard location="buy again carousel" carouselType="buy again" title="Buy Again" />
    );
    expect(queryByText('Buy Again')).toBeNull();
  });

  it('should render skeleton loading when is loading', () => {
    mockUseGetPromotedGiftcard.mockImplementation(data => {
      if (data.type === 'buy again') {
        return {
          data: {
            me: {
              swagStore: {
                buyAgainGiftCards: {
                  edges: [
                    {
                      node: buyAgainItem,
                    },
                  ],
                },
              },
            },
          },
          isLoading: true,
          isLoadingError: false,
          isSuccess: true,
        } as never;
      }
      return {
        data: {
          popularGiftCards: [popularItem],
        },
        isLoading: true,
        isLoadingError: false,
        isSuccess: true,
      } as never;
    });
    const { getByTestId } = render(
      <PromotedGiftCard location="buy again carousel" carouselType="buy again" title="Buy Again" />
    );
    expect(getByTestId('skeleton-loading')).toBeTruthy();
  });

  describe('Buy again', () => {
    it('should render correctly', () => {
      const { getByText } = render(
        <PromotedGiftCard location="buy again carousel" carouselType="buy again" title="Buy Again" />
      );
      expect(getByText('Buy Again')).toBeTruthy();
      expect(getByText(buyAgainItem.name)).toBeTruthy();
      expect(getByText('Save up to 5%')).toBeTruthy();
    });

    it('should work correctly when clicking item', () => {
      const { getByTestId } = render(
        <PromotedGiftCard location="buy again carousel" carouselType="buy again" title="Buy Again" />
      );

      fireEvent.press(getByTestId('buy-again-shop-item-1'));

      expect(prepareDataBeforeNavigate).toBeCalledWith(buyAgainItem, 'buy again carousel');
      expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
        screen: 'DiscountShopStack',
        params: {
          screen: 'ProductDetail',
          params: {
            productCode: buyAgainItem.productCode,
          },
        },
      });
    });
  });

  describe('Popular gift card', () => {
    it('should render correctly', () => {
      const { getByText } = render(
        <PromotedGiftCard location="popular carousel" carouselType="popular" title="Popular gift cards" />
      );
      expect(getByText('Popular gift cards')).toBeTruthy();
      expect(getByText(popularItem.name)).toBeTruthy();
      expect(getByText('Save up to 5%')).toBeTruthy();
    });

    it('should work correctly when clicking item', () => {
      const { getByTestId } = render(
        <PromotedGiftCard location="popular carousel" carouselType="popular" title="Popular gift cards" />
      );

      fireEvent.press(getByTestId('popular-shop-item-1'));

      expect(prepareDataBeforeNavigate).toBeCalledWith(popularItem, 'popular carousel');
      expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
        screen: 'DiscountShopStack',
        params: {
          screen: 'ProductDetail',
          params: {
            productCode: popularItem.productCode,
          },
        },
      });
    });
  });
});
