import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { fireEvent, render, renderHook } from '../../../../../common/utils/testing';
import { mockBillOfferList } from '../../../../../new-graphql/handlers/custom-mock/billManangement';
import { mockUseGetAllBillOffers } from '../../hooks/__mocks__/useGetAllBillOffers';
import { useBillManagementStore } from '../../stores/useBillManagementStore';
import { BillOfferList } from '../BillOfferList';

const [engieOffer] = mockBillOfferList;

jest.mock('../../hooks/useGetAllBillOffers', () => ({
  useGetAllBillOffers: jest.fn(),
}));

const mockTrackingItemPress = jest.fn();
jest.mock('../../hooks/useBenefitsBillMgmtTracking', () => ({
  useBenefitsBillMgmtTracking: () => ({
    trackClickOnBillTile: mockTrackingItemPress,
  }),
}));

describe('BillOfferList', () => {
  beforeEach(() => {
    mockUseGetAllBillOffers.mockReturnValue({ billOffers: mockBillOfferList, isLoading: false, isError: false });
  });
  it('should render correctly', () => {
    const { getByText } = render(<BillOfferList />);
    expect(getByText('Bills')).toBeTruthy();
    expect(getByText('COMMUNITY SOURCED')).toBeTruthy();
  });

  it('should navigate to offer detail', () => {
    const billManagementStore = renderHook(() => useBillManagementStore());
    billManagementStore.result.current.isShowENGIEDisclaimer = false;
    billManagementStore.result.current.hasHydrate = true;
    const { getByText } = render(<BillOfferList />);

    fireEvent.press(getByText('ENGIE'));

    expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
      screen: 'BillStreamStack',
      params: {
        screen: 'BillOfferDetailScreen',
        params: {
          data: engieOffer,
          onBackToBill: expect.any(Function),
        },
      },
    });
    expect(mockTrackingItemPress).toBeCalledWith('ENGIE');
  });
});
