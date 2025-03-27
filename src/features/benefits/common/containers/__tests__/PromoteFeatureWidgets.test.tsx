import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { mockUseSpendVisibility } from '../../../../../common/hooks/__mocks__/useSpendVisibility';
import { useHeroPointsVisibility } from '../../../../../common/hooks/useHeroPointsVisibility';
import { mockedSwitchPillar } from '../../../../../common/stores/__mocks__/useMiniAppSwitcherStore';
import { render, fireEvent } from '../../../../../common/utils/testing';
import {
  useGetDiscountShopProductDetailQuery,
  useGetHeroPointsBalanceQuery,
} from '../../../../../new-graphql/generated';
import { mockUseCheckCompletelyOnboardCashback } from '../../../cash-back/hooks/__mocks__/useCheckCompletelyOnboardCashback';
import { mockUseCashbackPermission } from '../../hooks/__mocks__/useCashbackPermission';
import { PromoteFeatureWidgets } from '../PromoteFeatureWidgets';

jest.mock('../../../../../common/hooks/useHeroPointsVisibility', () => ({
  useHeroPointsVisibility: jest.fn(),
}));

jest.mock('../../../../../new-graphql/generated', () => ({
  useGetHeroPointsBalanceQuery: jest.fn(),
  useGetDiscountShopProductDetailQuery: jest.fn(),
}));

const mockUseHeroPointsVisibility = useHeroPointsVisibility as jest.MockedFunction<typeof useHeroPointsVisibility>;

describe('PromoteFeatureWidgets', () => {
  const setupMocks = (options = {}) => {
    const defaultOptions = {
      cashbackPermission: true,
      cashbackOnboarded: true,
      showStashTab: true,
      heroPointsBalance: 100,
      productVariants: [],
    };
    const mergedOptions = { ...defaultOptions, ...options };

    mockUseCashbackPermission.mockReturnValue({
      permission: mergedOptions.cashbackPermission,
      isFetched: true,
      isLoading: false,
    });
    mockUseCheckCompletelyOnboardCashback.mockReturnValue({
      isCompleted: mergedOptions.cashbackOnboarded,
      isFetched: true,
      isLoading: false,
      isError: false,
    });
    mockUseSpendVisibility.mockReturnValue({
      showStashTab: mergedOptions.showStashTab,
      isLoading: false,
      isError: false,
      showCardTab: false,
      showSpendTab: false,
    });
    mockUseHeroPointsVisibility.mockReturnValue(true);
    (useGetHeroPointsBalanceQuery as unknown as jest.Mock).mockReturnValue({
      data: { me: { heroPoints: { balance: mergedOptions.heroPointsBalance } } },
      isError: false,
    });
    (useGetDiscountShopProductDetailQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          swagStore: {
            discountShopProductDetails: {
              product: { productVariants: mergedOptions.productVariants },
            },
          },
        },
      },
      isError: false,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    setupMocks();
  });

  it('should render correctly when all conditions met', () => {
    const { getByText } = render(<PromoteFeatureWidgets />);

    expect(getByText('Link a card')).toBeTruthy();
    expect(getByText('Create a stash')).toBeTruthy();
  });

  it('should work correctly when clicking link a card', () => {
    const { getByText } = render(<PromoteFeatureWidgets />);

    fireEvent.press(getByText('Link a card'));

    expect(mockedEventTracking).toBeCalledWith({
      categoryName: 'user action',
      event: 'Click on link cashback card',
      metaData: {
        location: 'benefits-home',
        module: 'Benefits pillar',
      },
    });

    expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
      screen: 'CardLinkOffersStack',
      params: {
        screen: 'AddCardCashbackDashboard',
      },
    });
  });

  it('should work correctly when clicking create a stash', () => {
    const { getByText } = render(<PromoteFeatureWidgets />);

    expect(getByText('Create a stash')).toBeTruthy();

    fireEvent.press(getByText('Create a stash'));

    expect(mockedEventTracking).toBeCalledWith({
      categoryName: 'user action',
      event: 'Click on create stash card',
      metaData: {
        location: 'benefits-home',
        module: 'Benefits pillar',
      },
    });

    expect(mockedSwitchPillar).toBeCalledWith({
      to: {
        pillarId: 'WalletApp',
        tab: 'stash-tab',
      },
    });
  });

  it.each`
    permission | completedOnboard | expected
    ${false}   | ${false}         | ${false}
    ${false}   | ${true}          | ${false}
    ${true}    | ${false}         | ${false}
    ${true}    | ${true}          | ${true}
  `('should display link a card tile correctly', ({ completedOnboard, expected, permission }) => {
    setupMocks({ cashbackPermission: permission, cashbackOnboarded: completedOnboard });

    const { getByText, queryByText } = render(<PromoteFeatureWidgets />);

    if (expected) {
      expect(getByText('Link a card')).toBeTruthy();
    } else {
      expect(queryByText('Link a card')).toBeNull();
    }
  });

  it('should hide create a stash tile when no permission', () => {
    setupMocks({ showStashTab: false });

    const { queryByText } = render(<PromoteFeatureWidgets />);

    expect(queryByText('Create a stash')).toBeNull();
  });

  it.each`
    isLoadingStash | isLoadingCashback | isLoadingOnboard | expected
    ${true}        | ${true}           | ${true}          | ${true}
    ${true}        | ${true}           | ${false}         | ${true}
    ${true}        | ${false}          | ${true}          | ${true}
    ${false}       | ${false}          | ${false}         | ${false}
    ${false}       | ${false}          | ${true}          | ${true}
    ${false}       | ${true}           | ${false}         | ${true}
    ${false}       | ${true}           | ${true}          | ${true}
    ${true}        | ${false}          | ${false}         | ${true}
  `('should render skeleton correctly', ({ expected, isLoadingCashback, isLoadingOnboard, isLoadingStash }) => {
    setupMocks({
      showStashTab: true,
      cashbackPermission: true,
      cashbackOnboarded: true,
    });
    mockUseSpendVisibility.mockReturnValue({
      showStashTab: true,
      isLoading: isLoadingStash,
      isError: false,
      showCardTab: false,
      showSpendTab: false,
    });
    mockUseCashbackPermission.mockReturnValue({
      permission: true,
      isFetched: true,
      isLoading: isLoadingCashback,
    });
    mockUseCheckCompletelyOnboardCashback.mockReturnValue({
      isCompleted: true,
      isFetched: true,
      isLoading: isLoadingOnboard,
      isError: false,
    });

    const { queryByTestId } = render(<PromoteFeatureWidgets />);

    if (expected) {
      expect(queryByTestId('skeleton-loading')).toBeTruthy();
    } else {
      expect(queryByTestId('skeleton-loading')).toBeNull();
    }
  });

  describe('Hero Points Card Widgets', () => {
    it('should return noHeroPointsCard widget when heroPointsBalance is zero', () => {
      setupMocks({
        heroPointsBalance: 0,
        productVariants: [{ variantCode: 'EGOLD_CLASS_SINGLE', discountPriceInPoints: 100 }],
      });

      const { getByText } = render(<PromoteFeatureWidgets />);
      const button = getByText('Buy discounted movie tickets');

      fireEvent.press(button);

      expect(mockedEventTracking).toBeCalledWith({
        categoryName: 'user action',
        event: 'Click on movie card cta no hero points',
        metaData: {
          module: 'Benefits pillar',
        },
      });

      expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
        screen: 'DiscountShopStack',
        params: {
          screen: 'ProductDetail',
          params: {
            productCode: 'MV',
          },
        },
      });
    });

    it('should return lowHeroPointsCard widget when heroPointsBalance is less than discount price in points', () => {
      setupMocks({
        heroPointsBalance: 100,
        productVariants: [{ variantCode: 'EGOLD_CLASS_SINGLE', discountPriceInPoints: 200 }],
      });

      const { getByText } = render(<PromoteFeatureWidgets />);
      const button = getByText('Time to hit the big screen!');

      fireEvent.press(button);

      expect(mockedEventTracking).toBeCalledWith({
        categoryName: 'user action',
        event: 'Click on movie card cta low hero points',
        metaData: {
          module: 'Benefits pillar',
        },
      });

      expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
        screen: 'DiscountShopStack',
        params: {
          screen: 'ProductDetail',
          params: {
            productCode: 'MV',
          },
        },
      });
    });

    it('should return highHeroPointsCard widget when heroPointsBalance is greater than discount price in points', () => {
      setupMocks({
        heroPointsBalance: 100,
        productVariants: [{ variantCode: 'EGOLD_CLASS_SINGLE', discountPriceInPoints: 50 }],
      });

      const { getByText } = render(<PromoteFeatureWidgets />);
      const button = getByText('Treat yourself to a gift card');

      fireEvent.press(button);

      expect(mockedEventTracking).toBeCalledWith({
        categoryName: 'user action',
        event: 'Click on gift card cta high hero points',
        metaData: {
          module: 'Benefits pillar',
        },
      });

      expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
        screen: 'GeneralSearchScreen',
        params: {
          defaultCategory: {
            code: 'giftcard',
            name: 'Gift cards',
          },
        },
      });
    });

    it('should return empty array when isErrorProductDetail is true', () => {
      setupMocks({ productVariants: null });
      (useGetDiscountShopProductDetailQuery as unknown as jest.Mock).mockReturnValue({
        data: null,
        isError: true,
      });

      const { queryByText } = render(<PromoteFeatureWidgets />);

      expect(queryByText('Buy discounted movie tickets')).toBeNull();
      expect(queryByText('Time to hit the big screen!')).toBeNull();
      expect(queryByText('Treat yourself to a gift card')).toBeNull();
    });
  });
});
