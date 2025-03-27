import React from 'react';
import { render, fireEvent, renderHook } from '../../../../../common/utils/testing';
import { mockBillOfferList } from '../../../../../new-graphql/handlers/custom-mock/billManangement';
import { mockUseGetAllBillOffers } from '../../hooks/__mocks__/useGetAllBillOffers';
import { useBillManagementStore } from '../../stores/useBillManagementStore';
import { BillOfferSearchListView } from '../BillOfferSearchListView';

const getDefaultProps = () => {
  return {
    isShowNavBar: true,
    onItemPressed: jest.fn(),
    query: '',
    categoryCode: '',
    categoryName: 'bill',
    setSearchQuery: jest.fn(),
  };
};

describe('BillOfferSearchListView', () => {
  const props = getDefaultProps();
  const setup = () => {
    return render(<BillOfferSearchListView {...props} />);
  };

  beforeEach(() => {
    mockUseGetAllBillOffers.mockReturnValue({ billOffers: mockBillOfferList, isLoading: false, isError: false });
  });

  it('should render default correctly', async () => {
    const { getByText } = setup();
    expect(getByText('Bills & Subscriptions')).toBeTruthy();
    expect(getByText('Search bill offers')).toBeTruthy();
  });

  it('should work correctly when click on offer', async () => {
    const billManagementStore = renderHook(() => useBillManagementStore());
    billManagementStore.result.current.isShowENGIEDisclaimer = false;
    billManagementStore.result.current.hasHydrate = true;
    const { getByTestId } = setup();
    fireEvent.press(getByTestId(`bill-offer-1`));
    expect(props.onItemPressed).toHaveBeenCalled();
  });

  it('should render correctly when is error', () => {
    mockUseGetAllBillOffers.mockReturnValue({
      isError: true,
      isLoading: false,
      billOffers: [],
    });
    const { getByText } = setup();

    expect(getByText('No results found!')).toBeTruthy();
    expect(getByText(`Please adjust your search to find the offers you're looking for.`)).toBeTruthy();
  });

  it('should render correctly when is empty', () => {
    mockUseGetAllBillOffers.mockReturnValue({
      isError: false,
      isLoading: false,
      billOffers: [],
    });
    const { getByText } = setup();

    expect(getByText('No results found!')).toBeTruthy();
    expect(getByText(`Please adjust your search to find the offers you're looking for.`)).toBeTruthy();
  });

  it('should render correctly when is loading', () => {
    mockUseGetAllBillOffers.mockReturnValue({
      isError: false,
      isLoading: true,
      billOffers: [],
    });
    const { getByTestId } = setup();

    expect(getByTestId('skeleton-loading')).toBeTruthy();
  });
});
