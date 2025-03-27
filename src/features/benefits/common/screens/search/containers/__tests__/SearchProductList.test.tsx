import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { mockedNavigate } from '../../../../../../../../__mocks__/react-navigation';
import { render, fireEvent, waitFor } from '../../../../../../../common/utils/testing';
import { mockUseGetLocationsQuery } from '../../../../../../../new-graphql/__mocks__/mockLocation';
import { OfferType } from '../../../../../../../new-graphql/generated';
import { mockBillOffer } from '../../../../../../../new-graphql/handlers/custom-mock/billManangement';
import {
  mockInstoreOffersGroupByAdvertisers,
  mockOnlineOffer,
} from '../../../../../../../new-graphql/handlers/custom-mock/cashback';
import { mockSwagStoreOffer } from '../../../../../../../new-graphql/handlers/custom-mock/swagStore';
import {
  mockUseBillStreamPermission,
  mockUseBillStreamPermissionByProvider,
} from '../../../../../bill-streaming/hooks/__mocks__/useBillStreamPermission';
import { mockUseSwagStorePermission } from '../../../../../swag-store/hooks/__mocks__/useSwagStorePermission';
import { mockUseCashbackPermission } from '../../../../hooks/__mocks__/useCashbackPermission';
import { mockUseNearestLocation } from '../../../../hooks/__mocks__/useNearestLocation';
import { mockUseSearchAllProducts } from '../../../../hooks/__mocks__/useSearchAllProducts';
import { SearchProductListInner } from '../SearchProductList';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const mockInstoreAdvertiser = mockInstoreOffersGroupByAdvertisers.me!.cashback!.allAdvertisers.edges[0].node;

const TestComponent = () => {
  const navigation = useNavigation();
  return (
    <SearchProductListInner
      categoryCode="all"
      categoryName="All"
      query="query string"
      navigation={navigation as never}
      allowDataToLoad
      setKeyedAddress={jest.fn()}
      keyedAddress={{
        name: '123 street, city, state, code',
        isCurrentLocation: false,
        latitude: -33.877,
        longitude: 151.205,
      }}
      openSearchLocationBottomSheet={jest.fn()}
    />
  );
};

describe('SearchProductList', () => {
  beforeEach(() => {
    mockUseBillStreamPermission.mockReturnValue({
      permission: true,
      isFetched: true,
    });

    mockUseCashbackPermission.mockReturnValue({
      permission: true,
      isFetched: true,
      isLoading: false,
    });

    mockUseSwagStorePermission.mockReturnValue({
      permission: true,
      isFetched: true,
    });

    mockUseNearestLocation.mockReset();
    mockUseNearestLocation.mockReturnValue({
      isError: false,
      isLoading: false,
      isNearestLocationEmptyAfterFetch: false,
      nearestLocation: null,
    });
    mockUseBillStreamPermissionByProvider.mockReturnValue({
      permission: true,
      isFetched: true,
    });

    const nearestAddress = '644 George St, Sydney NSW 2000, Australia';
    mockUseGetLocationsQuery.mockReturnValue({
      data: { getLocations: { addresses: [{ formattedAddress: nearestAddress }] } },
      isLoading: false,
      isSuccess: true,
    });
  });

  it('should render correctly when empty', () => {
    mockUseSearchAllProducts.mockReturnValue({
      billOffers: [],
      instoreCashbackAdvertisers: [],
      isError: false,
      isLoading: false,
      onlineCashbackOffers: [],
      shouldLoadBill: true,
      shouldLoadCashback: true,
      shouldLoadSwagStore: true,
      ssOffers: [],
    });

    mockUseNearestLocation.mockReturnValue({
      isError: false,
      isLoading: false,
      isNearestLocationEmptyAfterFetch: true,
      nearestLocation: null,
    });

    const { getByText } = render(<TestComponent />);
    expect(getByText('No results found!')).toBeTruthy();
    expect(getByText(`Please adjust your search to find the offers you're looking for.`)).toBeTruthy();
  });

  it('should show loading when allowDataToLoad is false', () => {
    const navigation = useNavigation();
    mockUseSearchAllProducts.mockReturnValue({
      billOffers: [],
      instoreCashbackAdvertisers: [],
      isError: false,
      isLoading: false,
      onlineCashbackOffers: [],
      shouldLoadBill: true,
      shouldLoadCashback: true,
      shouldLoadSwagStore: true,
      ssOffers: [],
    });
    const { queryByText } = render(
      <SearchProductListInner
        categoryCode="all"
        categoryName="All"
        query="query string"
        navigation={navigation as never}
        allowDataToLoad={false}
        setKeyedAddress={jest.fn()}
        keyedAddress={{
          name: '123 street, city, state, code',
          isCurrentLocation: false,
          latitude: -33.877,
          longitude: 151.205,
        }}
        openSearchLocationBottomSheet={jest.fn()}
      />
    );
    expect(queryByText('No results found!')).toBeNull();
    expect(queryByText(`Please adjust your search to find the offers you're looking for.`)).toBeNull();
  });

  it.each`
    hasBill  | hasOnlineCashback | hasInstoreCashback | hasGiftCard | expected
    ${true}  | ${false}          | ${false}           | ${false}    | ${true}
    ${false} | ${true}           | ${false}           | ${false}    | ${true}
    ${false} | ${false}          | ${true}            | ${false}    | ${true}
    ${false} | ${false}          | ${false}           | ${true}     | ${true}
    ${true}  | ${true}           | ${true}            | ${true}     | ${false}
  `(
    'should render correctly when hasBill is $hasBill, hasOnlineCashback is $hasOnlineCashback, hasInstoreCashback is $hasInstoreCashback, hasGiftCard is $hasGiftCard',
    ({ expected, hasBill, hasGiftCard, hasInstoreCashback, hasOnlineCashback }) => {
      mockUseNearestLocation.mockReturnValue({
        isError: false,
        isLoading: false,
        isNearestLocationEmptyAfterFetch: false,
        nearestLocation: {
          address: 'World Square Sydney, Sydney, NSW, 2000',
          distance: 0.17,
          latitude: -33.877181,
          locationId: '927796',
          longitude: 151.206879,
        },
      });

      mockUseSearchAllProducts.mockReturnValue({
        billOffers: hasBill ? [mockBillOffer] : [],
        instoreCashbackAdvertisers: hasInstoreCashback ? [mockInstoreAdvertiser] : [],
        isError: false,
        isLoading: false,
        onlineCashbackOffers: hasOnlineCashback ? [mockOnlineOffer] : [],
        shouldLoadBill: true,
        shouldLoadCashback: true,
        shouldLoadSwagStore: true,
        ssOffers: hasGiftCard ? [mockSwagStoreOffer] : [],
      });

      const { queryByTestId } = render(<TestComponent />);
      if (expected) {
        let testId = 'vertical-product-list';
        switch (true) {
          case hasBill:
            testId = 'vertical-bill-product-list';
            break;
          case hasOnlineCashback:
            testId = 'vertical-online-product-list';
            break;
          case hasInstoreCashback:
            testId = 'vertical-instore-product-list';
            break;
          case hasGiftCard:
            testId = 'vertical-giftcard-product-list';
            break;
          default:
            break;
        }
        expect(queryByTestId(testId)).not.toBeNull();
      } else {
        expect(queryByTestId('vertical-product-list')).toBeNull();
      }
    }
  );

  describe('Bill carousel', () => {
    it.each`
      shouldLoadBill | expected
      ${true}        | ${true}
      ${false}       | ${false}
    `('should render correctly when shouldLoadBill is $shouldLoadBill', ({ expected, shouldLoadBill }) => {
      mockUseSearchAllProducts.mockReturnValue({
        billOffers: [mockBillOffer],
        instoreCashbackAdvertisers: [mockInstoreAdvertiser],
        isError: false,
        isLoading: false,
        onlineCashbackOffers: [mockOnlineOffer],
        shouldLoadBill,
        shouldLoadCashback: true,
        shouldLoadSwagStore: true,
        ssOffers: [mockSwagStoreOffer],
      });

      const { queryByTestId } = render(<TestComponent />);
      if (expected) {
        expect(queryByTestId('bill-carousel')).not.toBeNull();
      } else {
        expect(queryByTestId('bill-carousel')).toBeNull();
      }
    });
  });

  describe('Cashback carousel', () => {
    it('onPress should navigate correctly', () => {
      mockUseSearchAllProducts.mockReturnValue({
        billOffers: [mockBillOffer],
        instoreCashbackAdvertisers: [mockInstoreAdvertiser],
        isError: false,
        isLoading: false,
        onlineCashbackOffers: [mockOnlineOffer],
        shouldLoadBill: true,
        shouldLoadCashback: true,
        shouldLoadSwagStore: true,
        ssOffers: [mockSwagStoreOffer],
      });
      const { getByTestId } = render(<TestComponent />);

      fireEvent.press(getByTestId('online-cashback-carousel-header-icon'));
      expect(mockedNavigate).toHaveBeenCalledWith('CashbackStack', {
        screen: 'CashbackSearchScreenV2',
        params: {
          defaultCategory: {
            code: 'all',
            name: 'All',
          },
          offerType: OfferType.Online,
          query: 'query string',
        },
      });
    });

    it.each`
      shouldLoadCashback | expected
      ${true}            | ${true}
      ${false}           | ${false}
    `('should render correctly when shouldLoadCashback is $shouldLoadCashback', ({ expected, shouldLoadCashback }) => {
      mockUseSearchAllProducts.mockReturnValue({
        billOffers: [mockBillOffer],
        instoreCashbackAdvertisers: [mockInstoreAdvertiser],
        isError: false,
        isLoading: false,
        onlineCashbackOffers: [mockOnlineOffer],
        shouldLoadBill: true,
        shouldLoadCashback,
        shouldLoadSwagStore: true,
        ssOffers: [mockSwagStoreOffer],
      });

      const { queryByTestId } = render(<TestComponent />);
      if (expected) {
        expect(queryByTestId('online-cashback-carousel')).not.toBeNull();
      } else {
        expect(queryByTestId('online-cashback-carousel')).toBeNull();
      }
    });
  });

  describe('Instore cashback carousel', () => {
    it('onPress should navigate correctly', () => {
      mockUseSearchAllProducts.mockReturnValue({
        billOffers: [mockBillOffer],
        instoreCashbackAdvertisers: [mockInstoreAdvertiser],
        isError: false,
        isLoading: false,
        onlineCashbackOffers: [mockOnlineOffer],
        shouldLoadBill: true,
        shouldLoadCashback: true,
        shouldLoadSwagStore: true,
        ssOffers: [mockSwagStoreOffer],
      });
      const { getByTestId } = render(<TestComponent />);

      expect(mockUseNearestLocation).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: false,
        })
      );

      fireEvent.press(getByTestId('instore-cashback-carousel-header-icon'));
      expect(mockedNavigate).toHaveBeenCalledWith('CashbackStack', {
        screen: 'InStoreCashbackSearchScreen',
        params: {
          defaultCategory: {
            code: 'all',
            name: 'All',
          },
          query: 'query string',
        },
      });
    });

    it.each`
      fromTab              | shouldLoadCashback | expected
      ${undefined}         | ${true}            | ${true}
      ${undefined}         | ${false}           | ${false}
      ${'benefits-online'} | ${true}            | ${false}
      ${'benefits-online'} | ${false}           | ${false}
    `(
      'should render correctly when shouldLoadCashback is $shouldLoadCashback',
      ({ expected, fromTab, shouldLoadCashback }) => {
        mockUseSearchAllProducts.mockReturnValue({
          billOffers: [mockBillOffer],
          instoreCashbackAdvertisers: [mockInstoreAdvertiser],
          isError: false,
          isLoading: false,
          onlineCashbackOffers: [mockOnlineOffer],
          shouldLoadBill: true,
          shouldLoadCashback,
          shouldLoadSwagStore: true,
          ssOffers: [mockSwagStoreOffer],
        });

        const { queryByTestId } = render(
          <SearchProductListInner
            fromTab={fromTab}
            categoryCode="all"
            categoryName="All"
            query=""
            navigation={{} as never}
            allowDataToLoad
            setKeyedAddress={jest.fn()}
            keyedAddress={{
              name: '123 street, city, state, code',
              isCurrentLocation: false,
              latitude: -33.877,
              longitude: 151.205,
            }}
            openSearchLocationBottomSheet={jest.fn()}
          />
        );
        if (expected) {
          expect(queryByTestId('instore-cashback-carousel')).not.toBeNull();
        } else {
          expect(queryByTestId('instore-cashback-carousel')).toBeNull();
        }
      }
    );

    describe('No nearby location', () => {
      beforeEach(() => {
        mockUseSearchAllProducts.mockReturnValue({
          billOffers: [mockBillOffer],
          instoreCashbackAdvertisers: [],
          isError: false,
          isLoading: false,
          onlineCashbackOffers: [mockOnlineOffer],
          shouldLoadBill: true,
          shouldLoadCashback: true,
          shouldLoadSwagStore: true,
          ssOffers: [mockSwagStoreOffer],
        });
      });

      it('should show nearest location if available', async () => {
        mockUseNearestLocation.mockReturnValue({
          isError: false,
          isLoading: false,
          isNearestLocationEmptyAfterFetch: false,
          nearestLocation: {
            address: 'World Square Sydney, Sydney, NSW, 2000',
            distance: 0.17,
            latitude: -33.877181,
            locationId: '927796',
            longitude: 151.206879,
          },
        });

        const { getByText } = render(<TestComponent />);

        expect(mockUseNearestLocation).toHaveBeenCalledWith(
          expect.objectContaining({
            enabled: true,
          })
        );

        await waitFor(() => {
          expect(getByText('No store found near this location, try Sydney NSW 2000')).toBeTruthy();
        });
      });

      it('should not show in-store cashback carousel if nearest location not found', async () => {
        mockUseNearestLocation.mockReturnValue({
          isError: false,
          isLoading: false,
          isNearestLocationEmptyAfterFetch: true,
          nearestLocation: null,
        });

        const { queryByText } = render(<TestComponent />);

        expect(queryByText('In-store cashback')).toBeNull();

        expect(mockUseGetLocationsQuery).not.toHaveBeenCalled();
      });
    });
  });

  describe('Gift card carousel', () => {
    it('onPress should navigate correctly', () => {
      mockUseSearchAllProducts.mockReturnValue({
        billOffers: [mockBillOffer],
        instoreCashbackAdvertisers: [mockInstoreAdvertiser],
        isError: false,
        isLoading: false,
        onlineCashbackOffers: [mockOnlineOffer],
        shouldLoadBill: true,
        shouldLoadCashback: true,
        shouldLoadSwagStore: true,
        ssOffers: [mockSwagStoreOffer],
      });
      const { getByTestId } = render(<TestComponent />);

      fireEvent.press(getByTestId('giftcard-carousel-header-icon'));
      expect(mockedNavigate).toHaveBeenCalledWith('SwagStoreStack', {
        screen: 'GiftCardsSearchScreen',
        params: {
          query: 'query string',
        },
      });
    });

    it.each`
      shouldLoadSwagStore | expected
      ${true}             | ${true}
      ${false}            | ${false}
    `(
      'should render correctly when shouldLoadSwagStore is $shouldLoadSwagStore',
      ({ expected, shouldLoadSwagStore }) => {
        mockUseSearchAllProducts.mockReturnValue({
          billOffers: [mockBillOffer],
          instoreCashbackAdvertisers: [mockInstoreAdvertiser],
          isError: false,
          isLoading: false,
          onlineCashbackOffers: [mockOnlineOffer],
          shouldLoadBill: true,
          shouldLoadCashback: true,
          shouldLoadSwagStore,
          ssOffers: [mockSwagStoreOffer],
        });

        const { queryByTestId } = render(<TestComponent />);
        if (expected) {
          expect(queryByTestId('giftcard-carousel')).not.toBeNull();
        } else {
          expect(queryByTestId('giftcard-carousel')).toBeNull();
        }
      }
    );
  });
});
