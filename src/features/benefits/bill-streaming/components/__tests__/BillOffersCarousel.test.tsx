import React from 'react';
import { render } from '../../../../../common/utils/testing';
import { mockBillOffer } from '../../../../../new-graphql/handlers/custom-mock/billManangement';
import { mockUseBillStreamPermission } from '../../hooks/__mocks__/useBillStreamPermission';
import { BillOffersCarousel } from '../BillOffersCarousel';

describe('BillOffersCarousel', () => {
  beforeEach(() => {
    mockUseBillStreamPermission.mockReturnValue({ permission: true, isFetched: true });
  });
  it('should render nothing when data is empty', () => {
    const { queryByText } = render(
      <BillOffersCarousel onPress={() => {}} billOffers={[]} isLoading={false} isError={false} />
    );
    expect(queryByText('Bills & Subscriptions')).toBeNull();
  });

  it('should render nothing when no permission', () => {
    mockUseBillStreamPermission.mockReturnValue({ permission: false, isFetched: true });

    const { queryByText } = render(
      <BillOffersCarousel onPress={() => {}} billOffers={[]} isLoading={false} isError={false} />
    );
    expect(queryByText('Bills & Subscriptions')).toBeNull();
  });

  it('should render nothing when is error', () => {
    const { queryByText } = render(<BillOffersCarousel onPress={() => {}} billOffers={[]} isLoading={false} isError />);
    expect(queryByText('Bills & Subscriptions')).toBeNull();
  });

  it('should render skeleton when is loading', () => {
    const { getByTestId } = render(<BillOffersCarousel onPress={() => {}} billOffers={[]} isLoading isError={false} />);
    expect(getByTestId('skeleton-loading')).toBeTruthy();
  });

  it('should render correctly', () => {
    const { getByText } = render(
      <BillOffersCarousel onPress={() => {}} billOffers={[mockBillOffer]} isLoading={false} isError={false} />
    );
    expect(getByText('Bills & Subscriptions')).toBeTruthy();
    expect(getByText('Swag discounts on your energy')).toBeTruthy();
    expect(getByText('Community Sourced')).toBeTruthy();
  });
});
