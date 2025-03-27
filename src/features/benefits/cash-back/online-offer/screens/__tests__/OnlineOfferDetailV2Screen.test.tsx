import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedNavigate } from '../../../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../../../test-setup/after-env/mixpanel.setup';
import { useInAppBrowser } from '../../../../../../common/shared-hooks/useInAppBrowser';
import { useSessionStore } from '../../../../../../common/stores/useSessionStore';
import type { MockQueryResult } from '../../../../../../common/types/react-query';
import { render, fireEvent, renderHook, act } from '../../../../../../common/utils/testing';
import { MockCardLinkCashbackDetail } from '../../../../../../graphql/handlers/custom-mock/cashbackDetail';

import {
  useGetCashbackTermsAndConditionsQuery,
  useCashbackLinkedCardsQuery,
  useGetCashbackTermsAndConditionsAcceptanceQuery,
  useGetOnlineOfferByIdQuery,
  useCashbackOnboardStatusQuery,
} from '../../../../../../new-graphql/generated';
import type {
  GetOnlineOfferByIdQuery,
  GetCashbackTermsAndConditionsAcceptanceQuery,
  CashbackLinkedCardsQuery,
  GetCashbackTermsAndConditionsQuery,
  CashbackOnboardStatusQuery,
} from '../../../../../../new-graphql/generated';
import { mockCashbackLinkedCards, mockOnlineOffer } from '../../../../../../new-graphql/handlers/custom-mock/cashback';
import { OnlineOfferDetailV2Screen } from '../OnlineOfferDetailV2Screen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;
const mockUseCashbackLinkedCardsQuery = useCashbackLinkedCardsQuery as unknown as jest.Mock<
  MockQueryResult<CashbackLinkedCardsQuery>
>;
const mockUseGetOnlineOfferByIdQuery = useGetOnlineOfferByIdQuery as unknown as jest.Mock<
  MockQueryResult<GetOnlineOfferByIdQuery>
>;

const mockUseInAppBrowser = useInAppBrowser as jest.Mock<ReturnType<typeof useInAppBrowser>>;
const mockUseCashbackOnboardStatusQuery = useCashbackOnboardStatusQuery as unknown as jest.Mock<
  MockQueryResult<CashbackOnboardStatusQuery>
>;
const mockUseCashbackTermsAndConditionsAcceptanceQuery =
  useGetCashbackTermsAndConditionsAcceptanceQuery as unknown as jest.Mock<
    MockQueryResult<GetCashbackTermsAndConditionsAcceptanceQuery>
  >;

const mockUseCashbackTermsAndConditionsQuery = useGetCashbackTermsAndConditionsQuery as unknown as jest.Mock<
  MockQueryResult<GetCashbackTermsAndConditionsQuery>
>;

jest.mock('../../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../../new-graphql/generated'),
  useGetOnlineOfferByIdQuery: jest.fn(),
  useGetCashbackTermsAndConditionsAcceptanceQuery: jest.fn(),
  useCashbackLinkedCardsQuery: jest.fn(),
  useGetCashbackTermsAndConditionsQuery: jest.fn(),
  useCashbackOnboardStatusQuery: jest.fn(),
}));

jest.mock('../../../../../../common/shared-hooks/useInAppBrowser', () => ({
  useInAppBrowser: jest.fn(),
}));

describe('OnlineOffersDetailScreen', () => {
  const mockOpenUrl = jest.fn();
  beforeEach(() => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentOrgId = '123';

    mockUseCashbackTermsAndConditionsAcceptanceQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            termsAndConditionsAcceptance: {
              isAccepted: true,
            },
          },
        },
      },
    });

    mockUseCashbackOnboardStatusQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            onboardStatus: {
              hasCLOOnboarded: true,
            },
          },
        },
      },
    });

    mockUseCashbackLinkedCardsQuery.mockReturnValue({
      data: mockCashbackLinkedCards,
    });

    mockUseCashbackTermsAndConditionsQuery.mockReturnValue({
      data: {},
    });

    mockUseGetOnlineOfferByIdQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            onlineOfferById: mockOnlineOffer,
          },
        },
      },
      isError: false,
      isLoading: false,
    });

    mockUseInAppBrowser.mockReturnValue({
      openUrl: mockOpenUrl,
    });
    mockedUseRoute.mockReturnValue({ params: { offerId: 1234 }, key: '', name: '' });
  });

  it('should render loading at initialize', async () => {
    mockUseGetOnlineOfferByIdQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            onlineOfferById: mockOnlineOffer,
          },
        },
      },
      isError: false,
      isLoading: true,
    });
    const { findByLabelText } = render(<OnlineOfferDetailV2Screen />);
    expect(await findByLabelText('spinner')).toBeTruthy();
  });

  it('should not render loading at initialize when having data in store', () => {
    mockedUseRoute.mockReturnValue({ params: { offerId: 1234, offer: mockOnlineOffer }, key: '', name: '' });
    mockUseGetOnlineOfferByIdQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            onlineOfferById: mockOnlineOffer,
          },
        },
      },
      isError: false,
      isLoading: true,
    });
    const { queryByLabelText } = render(<OnlineOfferDetailV2Screen />);
    expect(queryByLabelText('spinner')).toBeNull();
  });

  it('should render cashback detail correctly', async () => {
    const cashbackDetail = mockOnlineOffer;

    mockUseGetOnlineOfferByIdQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            onlineOfferById: mockOnlineOffer,
          },
        },
      },
      isError: false,
      isLoading: false,
    });

    const { findByLabelText, getByLabelText, getByText } = render(<OnlineOfferDetailV2Screen />);
    expect(await findByLabelText('Offer image')).toBeTruthy();
    expect(getByText(cashbackDetail.advertiserName)).toBeTruthy();
    expect(getByText(cashbackDetail.title.toLowerCase())).toBeTruthy();
    expect(getByText('Online offer')).toBeTruthy();
    expect(getByText('How this Online offer works')).toBeTruthy();
    expect(getByText(`Access the retailer via ‘Shop now’. Accept cookies if prompted.`)).toBeTruthy();
    expect(getByText('Complete payment for your transaction.')).toBeTruthy();
    expect(getByText('View your pending transaction and cashback in your dashboard.')).toBeTruthy();
    expect(getByText('Description')).toBeTruthy();
    expect(getByText(`About ${cashbackDetail.advertiserName}`)).toBeTruthy();
    expect(getByText('Terms and conditions')).toBeTruthy();
    expect(getByLabelText('Shop now')).toBeTruthy();
  });

  it('should render cashback detail correctly for card link', async () => {
    mockUseGetOnlineOfferByIdQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            onlineOfferById: { ...mockOnlineOffer, isCardLinkedOffer: true },
          },
        },
      },
      isError: false,
      isLoading: false,
    });

    const cashbackDetail = MockCardLinkCashbackDetail;
    const { findByLabelText, getByLabelText, getByText } = render(<OnlineOfferDetailV2Screen />);
    expect(await findByLabelText('Offer image')).toBeTruthy();
    expect(getByText(cashbackDetail.supplierName)).toBeTruthy();
    expect(getByText(cashbackDetail.title.toLowerCase())).toBeTruthy();
    expect(getByText('Online offer')).toBeTruthy();
    expect(getByText('How this Online offer works')).toBeTruthy();
    expect(getByText(`Access the retailer via ‘Shop now’. Accept cookies if prompted.`)).toBeTruthy();
    expect(getByText('Pay for your transaction with any enrolled card.')).toBeTruthy();
    expect(getByText('View your pending transaction and cashback in your dashboard.')).toBeTruthy();
    expect(getByText('Description')).toBeTruthy();
    expect(getByText(`About ${cashbackDetail.supplierName}`)).toBeTruthy();
    expect(getByText('Terms and conditions')).toBeTruthy();
    expect(getByLabelText('Shop now')).toBeTruthy();
  });

  it('should show error page properly', async () => {
    mockUseGetOnlineOfferByIdQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            onlineOfferById: mockOnlineOffer,
          },
        },
      },
      isError: true,
      isLoading: false,
    });

    const { findByText, queryByLabelText, queryByText } = render(<OnlineOfferDetailV2Screen />);
    expect(await findByText('Please try again later')).toBeTruthy();
    expect(queryByText('How this Online offer works')).toBeNull();
    expect(queryByText('Description')).toBeNull();
    expect(queryByText('Terms and conditions')).toBeNull();
    expect(queryByLabelText('Shop now')).toBeNull();
  });

  it('should track visit online offer detail', () => {
    render(<OnlineOfferDetailV2Screen />);
    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Visit cashback offer detail',
      metaData: {
        offerId: '12323',
        category: '1',
        merchantName: 'Gourmet Basket',
        module: 'Cashback',
        offerName: '8% Cashback on All Purchases',
        offerType: 'affiliate',
        platform: 'online',
      },
    });
  });

  it('should open a browser when Shop now is clicked', async () => {
    jest.useFakeTimers({ doNotFake: ['nextTick', 'setImmediate'] });

    const { findByText, getByLabelText } = render(<OnlineOfferDetailV2Screen />);
    const button = getByLabelText('Shop now');
    fireEvent.press(button);

    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Click shop now in specific online offer page',
      metaData: {
        category: '1',
        merchantName: 'Gourmet Basket',
        module: 'Cashback',
        offerName: '8% Cashback on All Purchases',
        offerType: 'affiliate',
        platform: 'online',
      },
    });
    expect(await findByText('Cashback is active')).toBeTruthy();
    expect(
      await findByText(`You will be directed to ${mockOnlineOffer.advertiserName}. Make sure you don’t leave the link!`)
    ).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(mockOpenUrl).toHaveBeenCalledWith(mockOnlineOffer.trackingUrl);
  });

  it('should navigate to cards screen when no enrolled card and is card link type', async () => {
    mockUseCashbackLinkedCardsQuery.mockReturnValue({
      data: {
        me: { cashback: { linkedCards: { cards: [] } } },
      },
    });

    mockUseGetOnlineOfferByIdQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            onlineOfferById: { ...mockOnlineOffer, isCardLinkedOffer: true },
          },
        },
      },
      isError: false,
      isLoading: false,
    });

    const { getByLabelText } = render(<OnlineOfferDetailV2Screen />);
    expect(getByLabelText('Shop now')).toBeTruthy();
    fireEvent.press(getByLabelText('Shop now'));

    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Click shop now in specific online offer page',
      metaData: {
        category: '1',
        merchantName: 'Gourmet Basket',
        module: 'Cashback',
        offerName: '8% Cashback on All Purchases',
        offerType: 'card linked',
        platform: 'online',
      },
    });
    expect(mockedNavigate).toHaveBeenCalledWith('BenefitsStack', {
      screen: 'CardLinkOffersStack',
      params: {
        screen: 'AddCardCashbackDashboard',
      },
    });
  });

  it('should open browser when is card link type and have card linked', async () => {
    mockUseGetOnlineOfferByIdQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            onlineOfferById: { ...mockOnlineOffer, isCardLinkedOffer: true },
          },
        },
      },
      isError: false,
      isLoading: false,
    });

    const { findByText, getByLabelText } = render(<OnlineOfferDetailV2Screen />);
    fireEvent.press(getByLabelText('Shop now'));
    expect(await findByText('Cashback is active')).toBeTruthy();
    expect(
      await findByText(`You will be directed to ${mockOnlineOffer.advertiserName}. Make sure you don’t leave the link!`)
    ).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Click shop now in specific online offer page',
      metaData: {
        category: '1',
        merchantName: 'Gourmet Basket',
        module: 'Cashback',
        offerName: '8% Cashback on All Purchases',
        offerType: 'card linked',
        platform: 'online',
      },
    });
    expect(mockOpenUrl).toHaveBeenCalledWith(mockOnlineOffer.trackingUrl);
  });

  it('should work correctly when clicking dropdown', async () => {
    mockUseGetOnlineOfferByIdQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            onlineOfferById: mockOnlineOffer,
          },
        },
      },
      isError: false,
      isLoading: false,
    });

    const { getByText } = render(<OnlineOfferDetailV2Screen />);

    const dropDownItem = getByText('Description');
    expect(dropDownItem).toBeTruthy();

    fireEvent.press(dropDownItem);

    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Click description dropdown',
      metaData: {
        category: '1',
        merchantName: 'Gourmet Basket',
        module: 'Cashback',
        offerName: '8% Cashback on All Purchases',
        offerType: 'affiliate',
        platform: 'online',
      },
    });
  });

  it('should launch cashback introduction when not onboarded', () => {
    mockUseCashbackOnboardStatusQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            onboardStatus: {
              hasCLOOnboarded: false,
            },
          },
        },
      },
      isFetched: true,
      isError: false,
    });
    render(<OnlineOfferDetailV2Screen />);

    expect(mockedNavigate).toHaveBeenCalledWith('BenefitsStack', {
      screen: 'CardLinkOffersStack',
      params: {
        screen: 'CashbackIntroduction',
        params: {
          onPressNotReady: expect.anything(),
        },
      },
    });
  });
});
