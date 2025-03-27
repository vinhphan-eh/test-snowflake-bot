import React from 'react';
import type { MockInfiniteQueryResult } from '../../../../../common/types/react-query';
import { render } from '../../../../../common/utils/testing';
import type { GetCashbackOffersGroupByAdvertiserQuery } from '../../../../../new-graphql/generated';
import { useInfiniteGetCashbackOffersGroupByAdvertiserQuery } from '../../../../../new-graphql/generated';
import { mockInstoreOffersGroupByAdvertisers } from '../../../../../new-graphql/handlers/custom-mock/cashback';
import type { SearchLocationContainerChildrenProps } from '../../../common/containers/SearchLocationContainer';
import type { PartialMapListViewV2Props } from '../PartialMapListViewV2';
import { PartialMapListViewV2Inner } from '../PartialMapListViewV2';

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useInfiniteGetCashbackOffersGroupByAdvertiserQuery: jest.fn(),
}));

const mockUseInfiniteGetCashbackOffersGroupByAdvertiserQuery =
  useInfiniteGetCashbackOffersGroupByAdvertiserQuery as unknown as jest.Mock<
    MockInfiniteQueryResult<GetCashbackOffersGroupByAdvertiserQuery>
  >;

describe('PartialMapListViewV2', () => {
  let props: (PartialMapListViewV2Props & SearchLocationContainerChildrenProps) | null = null;

  const setup = () => {
    if (!props) {
      throw new Error('props is not set');
    }

    return render(<PartialMapListViewV2Inner {...props} />);
  };

  beforeEach(() => {
    props = {
      allowDataToLoad: true,
      categoryFilter: undefined,
      keyedAddress: {
        name: '123 street, city, state, code',
        isCurrentLocation: false,
        latitude: -33.877,
        longitude: 151.205,
      },
      setKeyedAddress: jest.fn(),
      onGoToInstoreDetail: jest.fn(),
      openSearchLocationBottomSheet: jest.fn(),
      searchQuery: '',
    };

    mockUseInfiniteGetCashbackOffersGroupByAdvertiserQuery.mockReturnValue({
      isError: false,
      isFetched: false,
      isLoading: false,
      data: {
        pages: [mockInstoreOffersGroupByAdvertisers],
        pageParams: [{}],
      },
    });
  });

  it('should display only nearby locations', () => {
    const { getAllByTestId, getByText } = setup();

    expect(
      getAllByTestId('advertiser-', {
        exact: false,
      })
    ).toHaveLength(2);

    expect(getByText('2 cashback offers nearby')).toBeTruthy();
    expect(getByText('13 stores near you')).toBeTruthy();
    expect(getByText('17 stores near you')).toBeTruthy();
  });
});
