import React from 'react';
import * as useHeroPointsVisibility from '../../../../common/hooks/useHeroPointsVisibility';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { fireEvent, render, waitFor, act } from '../../../../common/utils/testing';
import { mockServerNode } from '../../../../mock-server/mockServerNode';
import * as rootNavigation from '../../../../navigation/rootNavigation';
import { mockGetHeroPointsBalanceQuery } from '../../../../new-graphql/generated';
import * as useTrackingDashboard from '../../utils/useTrackingDashboard';
import { HeroPointsWidget } from '../index';

const mockTrackingClickDashboardWidget = jest.fn();

const mockUseHeroPointsVisibility = (result: boolean) =>
  jest.spyOn(useHeroPointsVisibility, 'useHeroPointsVisibility').mockReturnValue(result);

describe('HeroPointsWidget', () => {
  beforeEach(() => {
    jest.spyOn(useTrackingDashboard, 'default').mockReturnValue({
      trackingClickOnDashboardWidget: mockTrackingClickDashboardWidget,
      trackingClickOnDashboardCashbackWidget: jest.fn(),
    });
    jest.spyOn(rootNavigation, 'navigateFromRoot');
    jest.spyOn(rootNavigation, 'navigateToBenefitsTopTabs');
  });
  describe('Hero points permission is false', () => {
    beforeEach(() => {
      mockUseHeroPointsVisibility(false);
    });

    it('should not render', () => {
      const { queryByTestId } = render(<HeroPointsWidget />);
      expect(queryByTestId('hero-points-widget')).toBeNull();
    });
  });

  describe('Hero points permission is true', () => {
    beforeEach(() => {
      mockUseHeroPointsVisibility(true);
      act(() => useSessionStore.setState({ currentOrgId: '123' }));
      mockServerNode.use(
        mockGetHeroPointsBalanceQuery((_, res, ctx) => {
          return res(
            ctx.data({
              me: {
                heroPoints: {
                  balance: 123456789,
                },
              },
            })
          );
        })
      );
    });

    it('should render loading at initialize', async () => {
      mockServerNode.use(
        mockGetHeroPointsBalanceQuery((_, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.delay(500),
            ctx.data({
              me: undefined,
            })
          );
        })
      );
      const { findByTestId } = render(<HeroPointsWidget />);

      await waitFor(() => {
        expect(findByTestId('spinner')).toBeTruthy();
      });
    });

    it('should render properly', async () => {
      const { getByText } = render(<HeroPointsWidget />);

      await waitFor(() => {
        expect(getByText('123,456,789 PTS')).toBeTruthy();
      });
    });

    it('should call actions correctly', async () => {
      const { getByTestId } = render(<HeroPointsWidget />);
      fireEvent.press(getByTestId('hero-points-widget'));

      await waitFor(() => {
        expect(rootNavigation.navigateToBenefitsTopTabs).toBeCalled();

        expect(rootNavigation.navigateFromRoot).toHaveBeenCalledWith('BenefitsStack', {
          screen: 'GeneralSearchScreen',
          params: {
            defaultCategory: {
              code: 'giftcard',
              name: 'Gift cards',
            },
          },
        });
      });
      expect(mockTrackingClickDashboardWidget).toBeCalledWith('HeroPoints');
    });
  });
});
