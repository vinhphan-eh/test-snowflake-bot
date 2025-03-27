import React from 'react';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { render } from '../../../../../common/utils/testing';
import type { CashbackCategoriesQuery } from '../../../../../new-graphql/generated';
import { useCashbackCategoriesQuery } from '../../../../../new-graphql/generated';
import { mockCashbackCategories } from '../../../../../new-graphql/handlers/custom-mock/cashback';
import { ShopByCategories } from '../ShopByCategories';

const mockUseCashbackCategoriesQuery = useCashbackCategoriesQuery as unknown as jest.Mock<
  MockQueryResult<CashbackCategoriesQuery>
>;
(mockUseCashbackCategoriesQuery as unknown as { getKey: () => string }).getKey = jest.fn();

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useCashbackCategoriesQuery: jest.fn(),
}));

describe('ShopByCategories', () => {
  beforeEach(() => {
    mockUseCashbackCategoriesQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            categories: mockCashbackCategories,
          },
        },
      },
      isLoading: false,
      isError: false,
    });
  });

  it('should render correctly', () => {
    const { getByText } = render(<ShopByCategories onItemPress={() => {}} />);
    expect(getByText('Shop by category')).toBeTruthy();
  });

  it('should not render title when hideTitle is true', () => {
    const { queryByText } = render(<ShopByCategories hideTitle onItemPress={() => {}} />);
    expect(queryByText('Shop by category')).toBeNull();
  });

  it('should render items correctly', () => {
    const { getByLabelText } = render(<ShopByCategories onItemPress={() => {}} />);
    // some examples of categories
    expect(getByLabelText('Dining shortcut')).toBeTruthy();
    expect(getByLabelText('Fashion shortcut')).toBeTruthy();
  });

  it('should render skeleton while loading and empty', () => {
    mockUseCashbackCategoriesQuery.mockReturnValue({
      data: undefined as never,
      isLoading: true,
      isError: false,
    });
    const { getByTestId } = render(<ShopByCategories onItemPress={() => {}} />);
    expect(getByTestId('loading-skeleton')).toBeTruthy();
  });

  it('should render nothing when error', () => {
    mockUseCashbackCategoriesQuery.mockReturnValue({
      data: undefined as never,
      isLoading: false,
      isError: true,
    });
    const { queryByTestId } = render(<ShopByCategories onItemPress={() => {}} testID="shop-by-category" />);
    expect(queryByTestId('shop-by-category')).toBeNull();
  });
});
