import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedEventTracking } from '../../../../../../../test-setup/after-env/mixpanel.setup';
import { render, fireEvent } from '../../../../../../common/utils/testing';
import {
  mockUseGetBenefitsCategoriesQuery,
  mockUseInfiniteGetCashbackOffersGroupByAdvertiserQuery,
} from '../../../../../../new-graphql/__mocks__/mockBenefits';
import { mockBenefitsCategories } from '../../../../../../new-graphql/handlers/custom-mock/benefits';
import { mockInstoreOffersGroupByAdvertisers } from '../../../../../../new-graphql/handlers/custom-mock/cashback';
import { InStoreCashbackSearchScreenInner } from '../InStoreCashbackSearchScreen';

const mockUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

const getDefaultProps = () => {
  return {
    keyedAddress: {
      name: '123 street, city and state, code',
      isCurrentLocation: false,
      latitude: -33.877,
      longitude: 151.205,
    },
    openSearchLocationBottomSheet: jest.fn(),
    allowDataToLoad: true,
    setKeyedAddress: jest.fn(),
  };
};

describe('InStoreCashbackSearchScreen', () => {
  const props = getDefaultProps();

  const setup = () => {
    return render(<InStoreCashbackSearchScreenInner {...props} />);
  };

  beforeEach(() => {
    mockUseRoute.mockReturnValue({
      params: undefined,
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
    mockUseInfiniteGetCashbackOffersGroupByAdvertiserQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        pages: [mockInstoreOffersGroupByAdvertisers],
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
    const { getByText } = setup();

    fireEvent.press(getByText(category));
    expect(getByText(expected)).toBeTruthy();
  });

  it('should render default correctly', () => {
    const { getByText } = setup();

    expect(getByText('Search all offers')).toBeTruthy();
    expect(getByText('In-store cashback')).toBeTruthy();
  });

  it('should track selecting category correctly', () => {
    const { getByText } = setup();

    fireEvent.press(getByText('Fashion'));

    expect(mockedEventTracking).toBeCalledWith({
      categoryName: 'user action',
      event: 'Select benefits category',
      metaData: {
        location: 'search instore',
        module: 'Benefits pillar',
        selectedCategory: 'fashion',
      },
    });
  });
});
