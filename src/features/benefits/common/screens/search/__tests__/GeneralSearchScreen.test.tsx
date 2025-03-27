import React from 'react';
import { mockedEventTracking } from '../../../../../../../test-setup/after-env/mixpanel.setup';
import { render, fireEvent } from '../../../../../../common/utils/testing';
import {
  mockUseGetBenefitsCategoriesQuery,
  mockUseGetCashbackOffersGroupByAdvertiserQuery,
} from '../../../../../../new-graphql/__mocks__/mockBenefits';
import { mockBenefitsCategories } from '../../../../../../new-graphql/handlers/custom-mock/benefits';
import { mockBillOffer } from '../../../../../../new-graphql/handlers/custom-mock/billManangement';
import {
  mockInstoreOffersGroupByAdvertisers,
  mockOnlineOffer,
} from '../../../../../../new-graphql/handlers/custom-mock/cashback';
import { mockSwagStoreOffer } from '../../../../../../new-graphql/handlers/custom-mock/swagStore';
import { mockUseSearchAllProducts } from '../../../hooks/__mocks__/useSearchAllProducts';
import { GeneralSearchScreen } from '../GeneralSearchScreen';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const mockAdvertiser = mockInstoreOffersGroupByAdvertisers.me!.cashback!.allAdvertisers.edges[0]!.node;

describe('GeneralSearchScreen', () => {
  beforeEach(() => {
    mockUseSearchAllProducts.mockReturnValue({
      billOffers: [mockBillOffer],
      instoreCashbackAdvertisers: [mockAdvertiser],
      isError: false,
      isLoading: false,
      onlineCashbackOffers: [mockOnlineOffer],
      shouldLoadBill: true,
      shouldLoadCashback: true,
      shouldLoadSwagStore: true,
      ssOffers: [mockSwagStoreOffer],
    });

    mockUseGetCashbackOffersGroupByAdvertiserQuery.mockReturnValue({
      data: mockInstoreOffersGroupByAdvertisers,
      isLoading: false,
      isError: false,
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
  });

  it('should render correctly', () => {
    const { getByTestId, getByText } = render(<GeneralSearchScreen />);
    expect(getByTestId('products-list')).toBeTruthy();
    expect(getByText('Search all offers')).toBeTruthy();
  });

  it('should track select category correctly', () => {
    const { getByText } = render(<GeneralSearchScreen />);
    fireEvent.press(getByText('Fashion'));

    expect(mockedEventTracking).toBeCalledWith({
      categoryName: 'user action',
      event: 'Select benefits category',
      metaData: {
        location: 'search all',
        module: 'Benefits pillar',
        selectedCategory: 'fashion',
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
    const { getByText } = render(<GeneralSearchScreen />);

    fireEvent.press(getByText(category));
    expect(getByText(expected)).toBeTruthy();
  });
});
