import { renderHook } from '../../../../../common/utils/testing';
import { mockUseGetCashbackOffersGroupByAdvertiserQuery } from '../../../../../new-graphql/__mocks__/mockBenefits';
import { mockInstoreOffersGroupByAdvertisers } from '../../../../../new-graphql/handlers/custom-mock/cashback';
import { CategoryCodes } from '../../constants/benefits';
import { useNearestLocation } from '../useNearestLocation';

describe('useNearestLocation', () => {
  beforeEach(() => {
    mockUseGetCashbackOffersGroupByAdvertiserQuery.mockReturnValue({
      data: mockInstoreOffersGroupByAdvertisers,
      isLoading: false,
      isError: false,
    });
  });

  it('should return nearest location', () => {
    const { result } = renderHook(() =>
      useNearestLocation({
        enabled: true,
        categoryCode: CategoryCodes.All,
        query: '',
        keyedAddress: {
          name: '123 street, city and state, country',
          isCurrentLocation: false,
          latitude: -33.877,
          longitude: 151.205,
        },
      })
    );
    expect(result.current).toEqual({
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
  });
});
