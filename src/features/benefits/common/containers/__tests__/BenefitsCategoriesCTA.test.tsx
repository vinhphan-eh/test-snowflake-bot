import React from 'react';
import { render, within } from '../../../../../common/utils/testing';
import { mockUseGetBenefitsCategoriesQuery } from '../../../../../new-graphql/__mocks__/mockBenefits';
import { mockBenefitsCategories } from '../../../../../new-graphql/handlers/custom-mock/benefits';
import { BenefitsCategoriesCTA } from '../BenefitsCategoriesCTA';

describe('ShopByCategories', () => {
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
    const { getByLabelText } = render(<BenefitsCategoriesCTA onItemPress={() => {}} />);
    // some examples of categories
    expect(getByLabelText('Gift cards shortcut')).toBeTruthy();
    expect(getByLabelText('Bills shortcut')).toBeTruthy();
    expect(getByLabelText('Dining shortcut')).toBeTruthy();
    expect(getByLabelText('Fashion shortcut')).toBeTruthy();
  });

  it('should render giftcard shortcut with badge icon', () => {
    const { getByLabelText } = render(<BenefitsCategoriesCTA onItemPress={() => {}} />);
    const giftcardShortcut = getByLabelText('Gift cards shortcut');
    expect(giftcardShortcut).toBeTruthy();
    expect(within(giftcardShortcut).getByTestId('star-circle-outlined')).toBeTruthy();
  });

  it('should render skeleton while loading and empty', () => {
    mockUseGetBenefitsCategoriesQuery.mockReturnValue({
      data: undefined as never,
      isLoading: true,
      isError: false,
    });
    const { getByTestId } = render(<BenefitsCategoriesCTA onItemPress={() => {}} />);
    expect(getByTestId('loading-skeleton')).toBeTruthy();
  });

  it('should render nothing when error', () => {
    mockUseGetBenefitsCategoriesQuery.mockReturnValue({
      data: undefined as never,
      isLoading: false,
      isError: true,
    });
    const { queryByTestId } = render(<BenefitsCategoriesCTA onItemPress={() => {}} testID="shop-by-category" />);
    expect(queryByTestId('shop-by-category')).toBeNull();
  });
});
