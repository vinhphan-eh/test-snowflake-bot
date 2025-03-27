import React from 'react';
import type { MockQueryResult } from '../../../../../../common/types/react-query';
import { fireEvent, render, waitFor } from '../../../../../../common/utils/testing';
import type {
  GetCashbackOffersGroupByAdvertiserQuery,
  GetLocationsQuery,
} from '../../../../../../new-graphql/generated';
import {
  useGetCashbackOffersGroupByAdvertiserQuery,
  useGetLocationsQuery,
} from '../../../../../../new-graphql/generated';
import { mockInstoreOffersGroupByAdvertisers } from '../../../../../../new-graphql/handlers/custom-mock/cashback';
import { InstoreCashbackOfferCarouselEmptyState } from '../InstoreCashbackOfferCarouselEmptyState';

const mockUseGetLocationsQuery = useGetLocationsQuery as unknown as jest.Mock<MockQueryResult<GetLocationsQuery>>;

const mockUseGetCashbackOffersGroupByAdvertiserQuery =
  useGetCashbackOffersGroupByAdvertiserQuery as unknown as jest.Mock<
    MockQueryResult<GetCashbackOffersGroupByAdvertiserQuery>
  >;

jest.mock('../../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../../new-graphql/generated'),
  useGetLocationsQuery: jest.fn(),
  useGetCashbackOffersGroupByAdvertiserQuery: jest.fn(),
}));

describe('InstoreCashbackOfferCarouselEmptyState', () => {
  const getDefaultProps = () => ({
    setKeyedAddress: jest.fn(),
    nearestLocation: {
      locationId: '927796',
      address: 'World Square Sydney, Sydney, NSW, 2000',
      latitude: -33.877181,
      longitude: 151.206879,
    },
  });

  let props = getDefaultProps();

  const setup = () => {
    return render(<InstoreCashbackOfferCarouselEmptyState {...props} />);
  };

  const nearestAddress = '644 George St, Sydney NSW 2000, Australia';

  beforeEach(() => {
    props = getDefaultProps();
    mockUseGetLocationsQuery.mockReturnValue({
      data: {
        getLocations: {
          addresses: [
            {
              formattedAddress: nearestAddress,
              latitude: 33,
              longitude: 150,
              placeId: 'ChIJBbYoni-uEmsR4LkyFmh9AQU',
            },
          ],
        },
      },
      isLoading: false,
      isSuccess: true,
    });

    mockUseGetCashbackOffersGroupByAdvertiserQuery.mockReturnValue({
      data: mockInstoreOffersGroupByAdvertisers,
      isLoading: false,
      isError: false,
    });
  });

  it('should render correctly', async () => {
    const { getByText } = setup();
    await waitFor(() => {
      expect(getByText('No store found near this location, try Sydney NSW 2000')).toBeTruthy();
    });

    fireEvent.press(getByText('Sydney NSW 2000'));

    expect(props.setKeyedAddress).toBeCalledWith({
      isCurrentLocation: false,
      name: nearestAddress,
      latitude: -33.877181,
      longitude: 151.206879,
    });
  });
});
