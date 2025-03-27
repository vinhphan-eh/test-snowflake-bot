import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { render, fireEvent } from '../../../../../common/utils/testing';
import {
  mockUseGetBenefitsCategoriesQuery,
  mockUseInfiniteGetCashbackOffersQuery,
} from '../../../../../new-graphql/__mocks__/mockBenefits';
import { OfferType } from '../../../../../new-graphql/generated';
import { mockBenefitsCategories } from '../../../../../new-graphql/handlers/custom-mock/benefits';
import { mockOnlineOffer } from '../../../../../new-graphql/handlers/custom-mock/cashback';
import { CashbackSearchScreenV2 } from '../CashbackSearchScreenV2';

const mockUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('CashbackSearchScreenV2', () => {
  beforeEach(() => {
    mockUseRoute.mockReturnValue({
      params: {
        offerType: OfferType.Online,
      },
      key: '',
      name: '',
    });
    mockUseGetBenefitsCategoriesQuery.mockReturnValue({
      data: {
        me: {
          benefits: {
            categories: mockBenefitsCategories,
          },
        },
      },
      isLoading: false,
      isError: false,
    });
    mockUseInfiniteGetCashbackOffersQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        pages: [
          {
            me: {
              cashback: {
                allOffers: {
                  edges: [
                    {
                      node: mockOnlineOffer,
                    },
                  ],
                } as never,
              },
            },
          },
        ],
        pageParams: {} as never,
      },
    });
  });
  it.each`
    category        | expected
    ${'All'}        | ${'Search all offers'}
    ${'Fashion'}    | ${'Search fashion offers'}
    ${'Travel'}     | ${'Search travel offers'}
    ${'Bills'}      | ${'Search bills offers'}
    ${'Gift cards'} | ${'Search gift cards offers'}
  `('should show placeholder correctly for $category', ({ category, expected }) => {
    const { getByText } = render(<CashbackSearchScreenV2 />);

    fireEvent.press(getByText(category));
    expect(getByText(expected)).toBeTruthy();
  });

  it('should render default correctly', () => {
    const { queryByTestId } = render(<CashbackSearchScreenV2 />);

    expect(queryByTestId('benefits-category-tabs')).toBeVisible();
    expect(queryByTestId('online-search-screen')).toBeVisible();
  });

  it('should track select category correctly', () => {
    const { getByText } = render(<CashbackSearchScreenV2 />);
    fireEvent.press(getByText('Travel'));

    expect(mockedEventTracking).toBeCalledWith({
      categoryName: 'user action',
      event: 'Select benefits category',
      metaData: {
        location: 'search online',
        module: 'Benefits pillar',
        selectedCategory: 'travel',
      },
    });
  });
});
