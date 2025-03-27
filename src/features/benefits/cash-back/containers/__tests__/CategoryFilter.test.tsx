import React from 'react';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { render, fireEvent } from '../../../../../common/utils/testing';
import type { CashbackCategoriesQuery } from '../../../../../new-graphql/generated';
import { useCashbackCategoriesQuery } from '../../../../../new-graphql/generated';
import { mockCashbackCategories } from '../../../../../new-graphql/handlers/custom-mock/cashback';
import { CategoryFilter } from '../CategoryFilter';

const mockUseCashbackCategoriesQuery = useCashbackCategoriesQuery as unknown as jest.Mock<
  MockQueryResult<CashbackCategoriesQuery>
>;
(mockUseCashbackCategoriesQuery as unknown as { getKey: () => string }).getKey = jest.fn();

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useCashbackCategoriesQuery: jest.fn(),
}));

describe('CategoryFilter', () => {
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

  it('should render correctly when no selected category', () => {
    const { getByTestId, getByText } = render(
      <CategoryFilter
        location="instore tab"
        selectedCategory=""
        onSelectionChange={() => {}}
        onClearFilter={() => {}}
      />
    );

    // some examples of categories
    expect(getByTestId('filter-outlined-btn')).toBeTruthy();
    expect(getByTestId('clear-filter-btn')).toBeDisabled();
    expect(getByText('Dining')).toBeTruthy();
    expect(getByText('Finance')).toBeTruthy();
  });

  it('should render correctly when having selected category', () => {
    const { getByTestId, getByText } = render(
      <CategoryFilter
        location="instore tab"
        selectedCategory="12"
        onSelectionChange={() => {}}
        onClearFilter={() => {}}
      />
    );

    expect(getByTestId('filter-btn')).toBeTruthy();
    expect(getByTestId('clear-filter-btn')).toBeTruthy();
    expect(getByText('Dining')).toBeTruthy();
    expect(getByText('Finance')).toBeTruthy();
  });

  it('should render correctly when having error', () => {
    mockUseCashbackCategoriesQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            categories: mockCashbackCategories,
          },
        },
      },
      isLoading: false,
      isError: true,
    });

    const { getByTestId } = render(
      <CategoryFilter
        location="instore tab"
        selectedCategory=""
        onSelectionChange={() => {}}
        onClearFilter={() => {}}
      />
    );

    expect(getByTestId('filter-outlined-btn')).toBeDisabled();
  });

  it('onSelectionChange should work correctly', () => {
    const mockOnSelectionChange = jest.fn();

    const { getByText } = render(
      <CategoryFilter
        location="instore tab"
        selectedCategory=""
        onSelectionChange={mockOnSelectionChange}
        onClearFilter={() => {}}
      />
    );

    fireEvent.press(getByText('Dining'));

    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Select benefits category',
      metaData: {
        location: 'instore tab',
        module: 'Benefits pillar',
        selectedCategory: 'dining',
      },
    });

    expect(mockOnSelectionChange).toBeCalledWith({
      categoryCode: 'dining',
      name: 'Dining',
      imageUrl: '',
    });
  });

  it('onClearFilter should work correctly', () => {
    const mockOnClear = jest.fn();

    const { getByTestId } = render(
      <CategoryFilter
        location="instore tab"
        selectedCategory="12"
        onSelectionChange={() => {}}
        onClearFilter={mockOnClear}
      />
    );

    fireEvent.press(getByTestId('clear-filter-btn'));

    expect(mockOnClear).toBeCalled();
  });
});
