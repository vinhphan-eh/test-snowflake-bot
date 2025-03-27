import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedNavigate } from '../../../../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../../../../test-setup/after-env/mixpanel.setup';
import { usePermissionStore } from '../../../../../../../common/stores/usePermissionStore';
import { useSessionStore } from '../../../../../../../common/stores/useSessionStore';
import type { MockQueryResult } from '../../../../../../../common/types/react-query';
import { fireEvent, render, waitFor, within, renderHook } from '../../../../../../../common/utils/testing';
import type {
  CashbackOnboardStatusQuery,
  GetInstoreOfferByIdQuery,
  GetInstoreOffersByAdvertiserIdQuery,
  GetLocationsQuery,
} from '../../../../../../../new-graphql/generated';
import {
  useGetInstoreOffersByAdvertiserIdQuery,
  useGetInstoreOfferByIdQuery,
  useGetLocationsQuery,
  useCashbackOnboardStatusQuery,
} from '../../../../../../../new-graphql/generated';
import {
  mockInstoreOffersByAdvertiserId,
  mockInstoreOffer,
} from '../../../../../../../new-graphql/handlers/custom-mock/cashback';
import type { InStoreOfferDetailV2ScreenInnerProps } from '../index';
import { InStoreOfferDetailV2ScreenInner, InStoreOfferDetailV2Screen } from '../index';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

const mockUseGetInstoreOffersByAdvertiserIdQuery = useGetInstoreOffersByAdvertiserIdQuery as unknown as jest.Mock<
  MockQueryResult<GetInstoreOffersByAdvertiserIdQuery>
>;

const mockUseGetInstoreOfferByIdQuery = useGetInstoreOfferByIdQuery as unknown as jest.Mock<
  MockQueryResult<GetInstoreOfferByIdQuery>
>;

const mockUseCashbackOnboardStatusQuery = useCashbackOnboardStatusQuery as unknown as jest.Mock<
  MockQueryResult<CashbackOnboardStatusQuery>
>;

const mockUseGetLocationsQuery = useGetLocationsQuery as unknown as jest.Mock<MockQueryResult<GetLocationsQuery>>;

jest.mock('../../../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../../../new-graphql/generated'),
  useGetInstoreOffersByAdvertiserIdQuery: jest.fn(),
  useGetInstoreOfferByIdQuery: jest.fn(),
  useGetLocationsQuery: jest.fn(),
  useCashbackOnboardStatusQuery: jest.fn(),
}));

const nearestAddress = 'SHOP 229A CASUARINA S/C, CASUARINA, NT, 810';

describe('In-store offer details V2 screen', () => {
  const initialPermissionsState = {
    instapay: {
      view: true,
    },
    superAppBenefits: {
      view: true,
    },
    superAppWallet: {
      view: true,
    },
    superAppSettings: {
      view: true,
    },
    superAppHome: {
      view: true,
    },
    superAppCashback: {
      view: true,
    },
    superAppBenefitsFeaturedOffers: {
      view: true,
    },
    superAppCashbackCategories: {
      view: false,
    },
    superAppInstoreOffer: {
      view: true,
    },
    ebenCashbackStoreList: {
      view: true,
    },
    heroPoints: {
      view: false,
    },
  };

  beforeEach(() => {
    mockedUseRoute.mockReturnValue({ params: { advertiserId: '1234' }, key: '', name: '' });
    usePermissionStore.setState({ permissions: initialPermissionsState });

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

    mockUseGetInstoreOffersByAdvertiserIdQuery.mockReturnValue({
      isError: false,
      data: mockInstoreOffersByAdvertiserId,
    });
    mockUseGetLocationsQuery.mockReturnValue({
      data: {
        getLocations: { addresses: [{ formattedAddress: nearestAddress }] },
      },
      isLoading: false,
      isSuccess: true,
    });
  });

  describe('InStoreOfferDetailV2ScreenInner', () => {
    let props: InStoreOfferDetailV2ScreenInnerProps | null = null;

    const setup = () => {
      if (!props) {
        throw new Error('props is not set');
      }

      return render(<InStoreOfferDetailV2ScreenInner {...props} />);
    };

    beforeEach(() => {
      props = {
        keyedAddress: {
          name: '123 street, city, state, code',
          isCurrentLocation: false,
          latitude: -33.877,
          longitude: 151.205,
        },
        setKeyedAddress: jest.fn(),
        openSearchLocationBottomSheet: jest.fn(),
        allowDataToLoad: true,
        advertiserId: '1234',
      };
    });

    it('should render loading at initialize when there is no cache in store and detail is fetching', async () => {
      mockUseGetInstoreOffersByAdvertiserIdQuery.mockReturnValue({
        isError: false,
        data: mockInstoreOffersByAdvertiserId,
        isLoading: true,
      });
      const { findByLabelText } = render(
        <InStoreOfferDetailV2ScreenInner
          keyedAddress={{
            name: '123 street, city, state, code',
            isCurrentLocation: false,
            latitude: -33.877,
            longitude: 151.205,
          }}
          setKeyedAddress={jest.fn()}
          openSearchLocationBottomSheet={jest.fn()}
          allowDataToLoad
          advertiserId="1234"
        />
      );
      expect(await findByLabelText('spinner')).toBeTruthy();
    });

    it('should not render loading at initialize when having data from store', () => {
      mockUseGetInstoreOffersByAdvertiserIdQuery.mockReturnValue({
        isError: false,
        data: mockInstoreOffersByAdvertiserId,
      });
      mockedUseRoute.mockReturnValue({
        params: {
          advertiserId: '123',
          offers: mockInstoreOffersByAdvertiserId.me?.cashback?.instoreOffersByAdvertiserId.offers,
        },
        key: '',
        name: '',
      });

      const { queryByLabelText } = setup();
      expect(queryByLabelText('spinner')).toBeNull();
    });

    it('should show error page properly', async () => {
      mockUseGetInstoreOffersByAdvertiserIdQuery.mockReturnValue({
        isError: true,
        data: mockInstoreOffersByAdvertiserId,
      });
      const { findByText, queryByText } = setup();
      expect(await findByText('Please try again later')).toBeTruthy();
      expect(queryByText('How this In-store offer works')).toBeNull();
      expect(queryByText('Description')).toBeNull();
      expect(queryByText('Terms & conditions')).toBeNull();
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

      setup();

      expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
        screen: 'CardLinkOffersStack',
        params: {
          screen: 'CashbackIntroduction',
          params: {
            onPressNotReady: expect.anything(),
            tncParams: {
              onDismiss: expect.anything(),
              onSuccess: expect.anything(),
              shouldTriggerAfterCarousel: true,
            },
          },
        },
      });
    });

    it('should track events correctly', () => {
      const sessionStore = renderHook(() => useSessionStore());
      sessionStore.result.current.currentOrgId = '123';

      setup();

      expect(mockedEventTracking).toBeCalledTimes(2);
      expect(mockedEventTracking).toBeCalledWith(expect.objectContaining({ event: 'Visit cashback merchant detail' }));
      expect(mockedEventTracking).toBeCalledWith(
        expect.objectContaining({
          event: 'Visit cashback offer detail',
          metaData: expect.objectContaining({ isMultipleLocation: true }),
        })
      );
    });

    it('should render offers correctly', async () => {
      const { getAllByTestId, getAllByText, getByTestId, getByText } = setup();

      expect(getAllByTestId('offer-item')).toHaveLength(3);

      // 1st item
      const viewAllButton = getAllByText('View all nearby stores').at(0);
      expect(viewAllButton).toBeTruthy();

      if (!viewAllButton) {
        return;
      }

      fireEvent.press(viewAllButton);

      await waitFor(() => {
        expect(getByTestId('all-nearby-locations')).toBeTruthy();
      });

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 13; i++) {
        expect(within(getByTestId('all-nearby-locations')).getAllByTestId(`nearby-location-item-${i}`)).toBeTruthy();
      }

      // 3rd item
      await waitFor(() => {
        expect(getByText('No store found near this location, try CASUARINA')).toBeTruthy();
      });

      fireEvent.press(within(getByTestId('nearest-location')).getByText('CASUARINA'));

      expect(props?.setKeyedAddress).toBeCalledWith({
        isCurrentLocation: false,
        name: nearestAddress,
        latitude: 20.958072,
        longitude: 105.7682692,
      });
    });

    it('should track events correctly', () => {
      const sessionStore = renderHook(() => useSessionStore());
      sessionStore.result.current.currentOrgId = '123';

      setup();

      expect(mockedEventTracking).toBeCalledTimes(2);
      expect(mockedEventTracking).toBeCalledWith(expect.objectContaining({ event: 'Visit cashback merchant detail' }));
      expect(mockedEventTracking).toBeCalledWith(
        expect.objectContaining({
          event: 'Visit cashback offer detail',
          metaData: expect.objectContaining({ isMultipleLocation: true }),
        })
      );
    });
  });

  describe('InStoreOfferDetailV2Screen', () => {
    beforeEach(() => {
      mockUseGetInstoreOfferByIdQuery.mockReturnValue({
        data: {
          me: {
            cashback: {
              inStoreOfferById: mockInstoreOffer,
            },
          },
        },
      });
    });

    it('should use advertiserId if it exists', () => {
      render(<InStoreOfferDetailV2Screen />);
      expect(mockUseGetInstoreOfferByIdQuery).toBeCalledWith(
        { id: '' },
        expect.objectContaining({
          enabled: false,
        })
      );
      expect(useGetInstoreOffersByAdvertiserIdQuery).toBeCalledWith({ id: '1234' }, expect.anything());
    });

    it('should get in-store offer details v1 to retrive advertiserId if advertiserId does not exist', () => {
      mockedUseRoute.mockReturnValue({ params: { offerLocationId: '123_456' }, key: '', name: '' });
      render(<InStoreOfferDetailV2Screen />);
      expect(mockUseGetInstoreOfferByIdQuery).toBeCalledWith(
        { id: '123_456' },
        expect.objectContaining({
          enabled: true,
        })
      );
      expect(useGetInstoreOffersByAdvertiserIdQuery).toBeCalledWith({ id: '1234' }, expect.anything());
    });
  });
});
