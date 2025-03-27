import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { mockUseSpendVisibility } from '../../../../../common/hooks/__mocks__/useSpendVisibility';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { render, renderHook, fireEvent } from '../../../../../common/utils/testing';
import { MockGetCatalogues } from '../../../../../graphql/handlers/custom-mock/catalogues';
import { mockUseGetCashbackOffersGroupByAdvertiserQuery } from '../../../../../new-graphql/__mocks__/mockBenefits';
import { mockInstoreOffersGroupByAdvertisers } from '../../../../../new-graphql/handlers/custom-mock/cashback';
import { mockUseCheckCompletelyOnboardCashback } from '../../../cash-back/hooks/__mocks__/useCheckCompletelyOnboardCashback';
import { mockUseGetPromotedGiftcard } from '../../../swag-store/hooks/__mocks__/useGetPromotedGiftCard';
import { mockUseSwagStorePermission } from '../../../swag-store/hooks/__mocks__/useSwagStorePermission';
import { mockUseCashbackPermission } from '../../hooks/__mocks__/useCashbackPermission';
import { mockUseIsBenefitsNewUser } from '../../hooks/__mocks__/useIsBenefitsNewUser';
import { BenefitsHomeScreenV2 } from '../BenefitsHomeScreenV2';

const buyAgainGiftCards = MockGetCatalogues[0].items;

describe('BenefitsHomeScreenV2', () => {
  beforeEach(() => {
    mockedEventTracking.mockRestore();
    mockUseGetPromotedGiftcard.mockReturnValue({
      data: {
        me: {
          swagStore: {
            buyAgainGiftCards: {
              edges: buyAgainGiftCards.map(item => ({ node: item })),
            },
          },
        },
      },
      isLoading: false,
      isError: false,
    } as never);

    const permissionHook = renderHook(() => usePermissionStore());
    permissionHook.result.current.permissions = {
      ebenStoreBuyAgainCarousel: {
        view: true,
      },
    } as never;

    mockUseSwagStorePermission.mockReturnValue({
      permission: true,
      isLoading: false,
      isFetched: true,
    });

    mockUseGetCashbackOffersGroupByAdvertiserQuery.mockReturnValue({
      data: mockInstoreOffersGroupByAdvertisers,
    });

    mockUseCashbackPermission.mockReturnValue({
      isLoading: false,
      permission: true,
      isFetched: true,
    });

    mockUseSpendVisibility.mockReturnValue({
      isLoading: false,
      showStashTab: true,
      showCardTab: true,
      showSpendTab: true,
      isError: false,
    });

    mockUseCheckCompletelyOnboardCashback.mockReturnValue({
      isCompleted: true,
      isLoading: false,
      isError: false,
      isFetched: true,
    });

    mockUseIsBenefitsNewUser.mockReturnValue({
      isNewUser: false,
    });
  });

  it('should navigate to search all products correctly', () => {
    const { getByTestId } = render(<BenefitsHomeScreenV2 />);

    fireEvent.press(getByTestId('search-box'));

    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Click on benefits search bar',
      metaData: {
        location: 'benefits-home',
        module: 'Benefits pillar',
      },
    });

    expect(mockedNavigate).toHaveBeenCalledWith('BenefitsStack', {
      screen: 'GeneralSearchScreen',
    });
  });

  it('should navigate to search all products correctly by clicking category shortcut', () => {
    const { getByText } = render(<BenefitsHomeScreenV2 />);

    fireEvent.press(getByText('Travel'));

    expect(mockedEventTracking).toHaveBeenCalledWith({
      event: 'Click on category shortcut',
      categoryName: 'user action',
      metaData: {
        module: 'Benefits pillar',
        location: 'benefits-home',
        selectedCategory: 'travel',
      },
    });

    expect(mockedNavigate).toHaveBeenCalledWith('BenefitsStack', {
      screen: 'GeneralSearchScreen',
      params: {
        defaultCategory: {
          code: 'travel',
          name: 'Travel',
        },
      },
    });
  });

  it('should track visit page correctly', () => {
    render(<BenefitsHomeScreenV2 />);

    expect(mockedEventTracking).toHaveBeenCalledWith({
      event: 'Visit benefits home page',
      categoryName: 'user action',
      metaData: {
        module: 'Benefits pillar',
      },
    });
  });

  it('should render correctly for old user', () => {
    const { getByLabelText, getByTestId } = render(<BenefitsHomeScreenV2 />);
    expect(getByTestId('search-box')).toBeTruthy();
    expect(getByTestId('balance-tiles')).toBeTruthy();
    expect(getByTestId('benefits-categories-cta')).toBeTruthy();
    expect(getByLabelText('Promote Widgets List')).toBeTruthy();
    expect(getByTestId('nearby-offer-tile')).toBeTruthy();
    expect(getByLabelText('buy again gift cards')).toBeTruthy();
  });
});
