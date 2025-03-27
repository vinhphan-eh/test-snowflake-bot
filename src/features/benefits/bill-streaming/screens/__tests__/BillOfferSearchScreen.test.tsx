import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { render, fireEvent, renderHook } from '../../../../../common/utils/testing';
import type { BmOffer } from '../../../../../new-graphql/generated';
import { mockBillOfferList } from '../../../../../new-graphql/handlers/custom-mock/billManangement';
import { mockUseGetAllBillOffers } from '../../hooks/__mocks__/useGetAllBillOffers';
import { useBillManagementStore } from '../../stores/useBillManagementStore';
import { BillOfferSearchScreen } from '../BillOfferSearchScreen';

describe('BillOfferSearchScreen', () => {
  beforeEach(() => {
    mockUseGetAllBillOffers.mockReturnValue({ billOffers: mockBillOfferList, isLoading: false, isError: false });
  });

  it('should render correctly', async () => {
    const { queryByTestId } = render(<BillOfferSearchScreen />);
    expect(queryByTestId('bill-search-screen')).toBeVisible();
  });

  it('should navigate to Bill Offer Detail when click on offer', async () => {
    const billManagementStore = renderHook(() => useBillManagementStore());
    billManagementStore.result.current.isShowENGIEDisclaimer = false;
    billManagementStore.result.current.hasHydrate = true;
    const { getByTestId } = render(<BillOfferSearchScreen />);
    const offer = mockBillOfferList[0] as BmOffer;
    fireEvent.press(getByTestId(`bill-offer-1`));
    expect(mockedNavigate).toBeCalledWith('BillOfferDetailScreen', {
      data: offer,
      onBackToBill: expect.any(Function),
    });
  });
});
