import React from 'react';
// import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { render } from '../../../../../common/utils/testing';
import { mockBillOfferList } from '../../../../../new-graphql/handlers/custom-mock/billManangement';
import { mockUseGetAllBillOffers } from '../../hooks/__mocks__/useGetAllBillOffers';
import { BillOffersCarouselCon } from '../BillOfferCarouselCon';

jest.mock('../../hooks/useGetAllBillOffers', () => ({
  useGetAllBillOffers: jest.fn(),
}));

const mockTrackingItemPress = jest.fn();
jest.mock('../../hooks/useBenefitsBillMgmtTracking', () => ({
  useBenefitsBillMgmtTracking: () => ({
    trackClickOnBillTile: mockTrackingItemPress,
  }),
}));
describe('BillOffersCarouselCon', () => {
  beforeEach(() => {
    mockUseGetAllBillOffers.mockReturnValue({ billOffers: mockBillOfferList, isLoading: false, isError: false });
  });
  // it('should render correctly', () => {
  //   const { getByText } = render(<BillOffersCarouselCon onPress={() => { }} />);
  //   expect(getByText('Bills')).toBeTruthy();
  // });

  it('should render nothing when no offer returned', () => {
    mockUseGetAllBillOffers.mockReturnValueOnce({ billOffers: [], isLoading: false, isError: false });
    const { queryByText } = render(<BillOffersCarouselCon onPress={() => {}} />);
    expect(queryByText('Bills')).toBeNull();
  });

  // it('should navigate to ENGIE offer detail', () => {
  //   const [engieOffer] = mockBillOfferList;
  //   const { getByTestId } = render(<BillOffersCarouselCon onPress={() => { }} />);

  //   fireEvent.press(getByTestId('bill-offer-1'));

  //   expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
  //     screen: 'BillStreamStack',
  //     params: {
  //       screen: 'BillOfferDetailScreen',
  //       params: {
  //         data: engieOffer,
  //         onBackToBill: expect.any(Function),
  //       },
  //     },
  //   });
  //   expect(mockTrackingItemPress).toBeCalledWith('ENGIE');
  // });
});
