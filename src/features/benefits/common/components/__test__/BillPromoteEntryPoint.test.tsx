import React from 'react';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { render, renderHook } from '../../../../../common/utils/testing';
import type { GetHomeTilesQuery, GetPromotionQuery } from '../../../../../new-graphql/generated';
import { useGetPromotionQuery, Pid, useGetHomeTilesQuery } from '../../../../../new-graphql/generated';
import { mockUseBillPromotionPermission } from '../../../bill-streaming/hooks/__mocks__/useBillPromotionPermission';
import { mockUseBillStreamPermissionByProvider } from '../../../bill-streaming/hooks/__mocks__/useBillStreamPermission';
import { useBillManagementStore } from '../../../bill-streaming/stores/useBillManagementStore';
import { BillPromoteEntryPoint } from '../BillPromoteEntryPoint';

jest.mock('../../../bill-streaming/hooks/useHeathInsuranceWaitlistPermission');
jest.mock('../../../../../new-graphql/generated');
jest.mock('../../../../../common/stores/useSessionStore');

const mockUseGetHomeTilesQuery = useGetHomeTilesQuery as unknown as jest.Mock<MockQueryResult<GetHomeTilesQuery>>;
(mockUseGetHomeTilesQuery as unknown as { getKey: () => string }).getKey = jest.fn();

const mockUseGetPromotionQuery = useGetPromotionQuery as unknown as jest.Mock<MockQueryResult<GetPromotionQuery>>;
(mockUseGetPromotionQuery as unknown as { getKey: () => string }).getKey = jest.fn();

describe('BillPromoteEntryPoint', () => {
  beforeEach(() => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({ swagTextAndImageRebrandEnabled: false });
    mockUseBillPromotionPermission.mockReturnValue({ havingPermission: false, isFetched: true });

    mockUseGetHomeTilesQuery.mockImplementation(() => ({
      data: {
        me: {
          billManagement: {
            homeTiles: {
              tiles: [
                {
                  title: 'title',
                  subTitle: 'subTitle',
                  banner: 'bannerUrl',
                  provider: {
                    id: Pid.Ahm,
                  },
                },
                {
                  title: 'title',
                  subTitle: 'subTitle',
                  banner: 'bannerUrl',
                  provider: {
                    id: Pid.Medibank,
                  },
                },
                {
                  title: 'title',
                  subTitle: 'subTitle',
                  banner: 'bannerUrl',
                  provider: {
                    id: Pid.SimplyEnergy,
                  },
                },
              ],
            },
          },
        },
      },
      isLoading: false,
      isError: false,
    }));
    mockUseGetPromotionQuery.mockImplementation(() => ({
      data: {},
      isLoading: false,
      isError: false,
    }));
  });
  it('should render correctly', () => {
    mockUseBillStreamPermissionByProvider.mockReturnValue({ permission: true, isFetched: true });
    const { getByText } = render(<BillPromoteEntryPoint />);

    expect(getByText('Revolutionising how we SAVE')).toBeTruthy();

    expect(getByText('Join 2M+ Swag members. Unlock unprecedented deals through community power!')).toBeTruthy();
  });

  it('should render correctly with rebrand', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({ swagTextAndImageRebrandEnabled: true });
    mockUseBillStreamPermissionByProvider.mockReturnValue({ permission: true, isFetched: true });
    const { getByText } = render(<BillPromoteEntryPoint />);

    expect(
      getByText('Join 2M+ Employment Hero members. Unlock unprecedented deals through community power!')
    ).toBeTruthy();
    expect('Employment Hero members').toBeTruthy();
  });

  it('should render loading', () => {
    mockUseBillStreamPermissionByProvider.mockReturnValue({ permission: true, isFetched: false });
    const { getByTestId } = render(<BillPromoteEntryPoint />);

    expect(getByTestId('spinner')).toBeTruthy();
  });

  it.each`
    hasHydrate | permission | doneRegistration | visible
    ${true}    | ${true}    | ${true}          | ${true}
    ${true}    | ${true}    | ${false}         | ${true}
    ${true}    | ${false}   | ${true}          | ${false}
    ${true}    | ${false}   | ${false}         | ${false}
    ${false}   | ${true}    | ${false}         | ${true}
  `('should work correctly with ahm', ({ hasHydrate, permission, visible }) => {
    mockUseBillStreamPermissionByProvider.mockReturnValue({ permission, isFetched: true });
    const waitlistStore = renderHook(() => useBillManagementStore());
    waitlistStore.result.current.hasHydrate = hasHydrate;
    const { queryByTestId } = render(<BillPromoteEntryPoint />);
    if (visible) {
      expect(queryByTestId('ahm-promote')).toBeTruthy();
    } else {
      expect(queryByTestId('ahm-promote')).toBeFalsy();
    }
  });

  it.each`
    hasHydrate | permission | doneRegistration | visible
    ${true}    | ${true}    | ${true}          | ${true}
    ${true}    | ${true}    | ${false}         | ${true}
    ${true}    | ${false}   | ${true}          | ${false}
    ${true}    | ${false}   | ${false}         | ${false}
    ${false}   | ${true}    | ${false}         | ${true}
  `('should work correctly with medibank', ({ hasHydrate, permission, visible }) => {
    mockUseBillStreamPermissionByProvider.mockReturnValue({ permission, isFetched: true });
    const waitlistStore = renderHook(() => useBillManagementStore());
    waitlistStore.result.current.hasHydrate = hasHydrate;
    const { queryByTestId } = render(<BillPromoteEntryPoint />);
    if (visible) {
      expect(queryByTestId('medibank-promote')).toBeTruthy();
    } else {
      expect(queryByTestId('medibank-promote')).toBeFalsy();
    }
  });
});
