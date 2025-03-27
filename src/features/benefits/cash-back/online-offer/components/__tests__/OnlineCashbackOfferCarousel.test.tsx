import React from 'react';
import { render } from '../../../../../../common/utils/testing';
import { mockUseCashbackPermission } from '../../../../common/hooks/__mocks__/useCashbackPermission';
import { OnlineCashbackOfferCarousel } from '../OnlineCashbackOfferCarousel';

describe('OnlineCashbackOfferCarousel', () => {
  beforeEach(() => {
    mockUseCashbackPermission.mockReturnValue({
      permission: true,
      isFetched: true,
      isLoading: false,
    });
  });
  it('should render nothing when is error', () => {
    const { queryByText } = render(
      <OnlineCashbackOfferCarousel
        isError
        isLoading={false}
        offers={[]}
        onNavigateToDetail={() => {}}
        onPress={() => {}}
      />
    );

    expect(queryByText('Online cashback')).toBeNull();
  });

  it('should render skeleton when is loading', () => {
    const { getByTestId } = render(
      <OnlineCashbackOfferCarousel
        isError={false}
        isLoading
        offers={[]}
        onNavigateToDetail={() => {}}
        onPress={() => {}}
      />
    );

    expect(getByTestId('skeleton-loading')).toBeTruthy();
  });
});
