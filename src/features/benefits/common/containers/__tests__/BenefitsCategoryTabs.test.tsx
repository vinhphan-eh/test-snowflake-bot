import React from 'react';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { mockUseGetBenefitsCategoriesQuery } from '../../../../../new-graphql/__mocks__/mockBenefits';
import { mockBenefitsCategories } from '../../../../../new-graphql/handlers/custom-mock/benefits';
import { BenefitsCategoryTabs } from '../BenefitsCategoryTabs';

describe('BenefitsCategoryTabs', () => {
  beforeEach(() => {
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
  it('should render items correctly', () => {
    const { getByText } = render(<BenefitsCategoryTabs location="search all" onTabChange={() => {}} tabKey="all" />);

    expect(getByText('All')).toBeTruthy();
    expect(getByText('Gift cards')).toBeTruthy();
    expect(getByText('Bills')).toBeTruthy();
    expect(getByText('Dining')).toBeTruthy();
    expect(getByText('Fashion')).toBeTruthy();
  });

  it('should render nothing when is error', () => {
    mockUseGetBenefitsCategoriesQuery.mockReturnValue({
      data: {
        me: {
          benefits: {
            categories: mockBenefitsCategories,
          },
        },
      },
      isLoading: false,
      isError: true,
    });
    const { queryByText } = render(<BenefitsCategoryTabs location="search all" onTabChange={() => {}} tabKey="all" />);

    expect(queryByText('All')).toBeNull();
  });

  it('should render nothing when is loading', () => {
    mockUseGetBenefitsCategoriesQuery.mockReturnValue({
      data: {
        me: {
          benefits: {
            categories: mockBenefitsCategories,
          },
        },
      },
      isLoading: true,
      isError: false,
    });
    const { queryByText } = render(<BenefitsCategoryTabs location="search all" onTabChange={() => {}} tabKey="all" />);

    expect(queryByText('All')).toBeNull();
  });

  it('onTabChange should work correctly', () => {
    const mockOnTabChange = jest.fn();
    const { getByTestId } = render(
      <BenefitsCategoryTabs location="search all" onTabChange={mockOnTabChange} tabKey="all" />
    );

    fireEvent.press(getByTestId('dining'));

    expect(mockOnTabChange).toHaveBeenCalledWith('dining', 'Dining');
  });
});
