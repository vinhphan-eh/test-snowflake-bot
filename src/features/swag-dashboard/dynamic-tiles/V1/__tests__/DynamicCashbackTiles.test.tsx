/* eslint-disable import/first */

import { mockFeaturedOffersData } from '../../../../../new-graphql/handlers/custom-mock/cashback';

const mockDeeplink = jest.fn();

import React from 'react';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { fireEvent, render, renderHook, waitFor } from '../../../../../common/utils/testing';
import type { GetFeaturedOffersQuery } from '../../../../../new-graphql/generated';
import { useGetFeaturedOffersQuery } from '../../../../../new-graphql/generated';
import { mockUseCashbackPermission } from '../../../../benefits/common/hooks/__mocks__/useCashbackPermission';
import * as useTrackingDashboard from '../../../utils/useTrackingDashboard';
import { DynamicCashbackTiles } from '../DynamicCashbackTiles';

jest.mock('@ehrocks/react-native-superapp-communication', () => ({
  DeepLinkEvent: {
    dispatchOpenDeepLinkEvent: mockDeeplink,
  },
}));

const mockUseCashbackFeaturedOnlineOffersQuery = useGetFeaturedOffersQuery as unknown as jest.Mock<
  MockQueryResult<GetFeaturedOffersQuery>
>;
(mockUseCashbackFeaturedOnlineOffersQuery as unknown as { getKey: () => string }).getKey = jest.fn();
jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useGetFeaturedOffersQuery: jest.fn(),
}));

const mockTrackingClickOnDashboardCashbackWidget = jest.fn();

describe('DynamicCashbackTiles', () => {
  beforeEach(() => {
    jest.spyOn(useTrackingDashboard, 'default').mockReturnValue({
      trackingClickOnDashboardWidget: jest.fn(),
      trackingClickOnDashboardCashbackWidget: mockTrackingClickOnDashboardCashbackWidget,
    });
  });
  describe('permission is false', () => {
    beforeEach(() => {
      mockUseCashbackPermission.mockReturnValue({ isLoading: false, isFetched: true, permission: false });
      mockUseCashbackFeaturedOnlineOffersQuery.mockReturnValue({
        data: mockFeaturedOffersData,
        isLoading: false,
        isError: false,
      });
    });

    it('should not render', () => {
      const { queryByTestId } = render(<DynamicCashbackTiles />);
      expect(queryByTestId('dynamic-cashback-tile')).toBeNull();
    });
  });

  describe('permission is true', () => {
    beforeEach(() => {
      mockUseCashbackPermission.mockReturnValue({ isLoading: false, isFetched: true, permission: true });
      mockUseCashbackFeaturedOnlineOffersQuery.mockReturnValue({
        data: mockFeaturedOffersData,
        isLoading: false,
        isError: false,
      });
    });

    it('should render properly', async () => {
      const { getByText } = render(<DynamicCashbackTiles />);

      await waitFor(() => {
        expect(getByText('10% Cashback on All Purchases')).toBeTruthy();
      });
    });

    it('should dispatch actions correctly', () => {
      const mockSetPillar = jest.fn();
      const sessionStore = renderHook(() => useSessionStore());
      sessionStore.result.current.setPillar = mockSetPillar;

      const { getByTestId } = render(<DynamicCashbackTiles />);
      fireEvent.press(getByTestId('dynamic-cashback-tile-919700'));

      expect(mockSetPillar).toBeCalledWith('BenefitsApp');
      expect(mockDeeplink).toBeCalledWith({ url: 'platform_redirect/benefits/cashback-offers/919700' });

      expect(mockTrackingClickOnDashboardCashbackWidget).toBeCalledWith('Booking.com');
    });
  });
});
