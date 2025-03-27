import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { mockUseIsAccountAU } from '../../../../../common/hooks/__mocks__/useIsAccountAU';
import { useIsCandidateV2 } from '../../../../../common/hooks/useIsCandidate';
import { useIsWorkzone } from '../../../../../common/hooks/useIsWorkzone';
import { useWorkzonePermission } from '../../../../../common/hooks/useWorkzonePermission';
import { mockedSwitchPillar } from '../../../../../common/stores/__mocks__/useMiniAppSwitcherStore';
import type { PermissionData } from '../../../../../common/stores/usePermissionStore';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { useGetUserWaitListQuery } from '../../../../../new-graphql/generated';
import { SwagDashboardMegadealTile } from '../SwagDashboardMegadealTile';

const mockPermissions: PermissionData = { toggleMegaDealsMvpCta: { view: true } } as PermissionData;
const mockUseIsWorkzone = useIsWorkzone as jest.MockedFn<typeof useIsWorkzone>;
const mockUseWorkzonePermission = useWorkzonePermission as jest.MockedFn<typeof useWorkzonePermission>;
const mockUseIsCandidate = useIsCandidateV2 as jest.MockedFn<typeof useIsCandidateV2>;

jest.mock('../../../../../new-graphql/generated', () => ({
  useGetUserWaitListQuery: jest.fn(),
}));

jest.mock('../../../../../common/hooks/useIsWorkzone');
jest.mock('../../../../../common/hooks/useWorkzonePermission');
jest.mock('../../../../../common/hooks/useIsCandidate');

describe('SwagDashboardMegadealTile', () => {
  beforeEach(() => {
    usePermissionStore.setState({
      permissions: mockPermissions,
    });
    mockUseIsAccountAU.mockReturnValue(true);
    mockUseIsWorkzone.mockReturnValue(false);
    mockUseWorkzonePermission.mockReturnValue({
      moneyPermission: false,
      isFetched: true,
      isFetching: false,
      benefitsPermission: false,
    });
  });

  describe('when user joined waitlist', () => {
    beforeEach(() => {
      usePermissionStore.setState({
        permissions: { ...mockPermissions, toggleMegaDealsCommunitiesCtas: { view: true } },
      });
      (useGetUserWaitListQuery as unknown as jest.Mock).mockReturnValue({
        data: {
          me: {
            group: { waitList: { userId: '123' } },
          },
        },
      });
    });

    it('should render tile', () => {
      const { getByText } = render(<SwagDashboardMegadealTile />);
      expect(getByText('Help shape the deals of the future')).toBeTruthy();
      expect(getByText('Work collaboratively to secure deals together')).toBeTruthy();
    });

    it('should navigate to cashback tab when user is a candidate', () => {
      mockUseIsCandidate.mockReturnValue(true);
      const { getByTestId } = render(<SwagDashboardMegadealTile />);
      fireEvent.press(getByTestId('swag-dashboard-megadeal-tile-test-id'));

      expect(mockedSwitchPillar).toBeCalledWith({
        to: {
          pillarId: 'BenefitsApp',
          tab: 'benefits-cashback',
        },
      });
    });

    it('should navigate to bill streaming tab when user is not a candidate', () => {
      mockUseIsCandidate.mockReturnValue(false);
      const { getByTestId } = render(<SwagDashboardMegadealTile />);
      fireEvent.press(getByTestId('swag-dashboard-megadeal-tile-test-id'));

      expect(mockedSwitchPillar).toBeCalledWith({
        to: {
          pillarId: 'BenefitsApp',
          tab: 'benefits-bills',
        },
      });
    });
  });

  describe('when user has not joined wailist', () => {
    beforeEach(() => {
      usePermissionStore.setState({
        permissions: { ...mockPermissions, toggleMegaDealsCommunitiesCtas: { view: true } },
      });
      (useGetUserWaitListQuery as unknown as jest.Mock).mockReturnValue({
        data: {
          me: {
            group: { waitList: { userId: null } },
          },
        },
      });
    });

    it('should render tile', () => {
      const { getByText } = render(<SwagDashboardMegadealTile />);
      expect(getByText('Help shape the deals of the future')).toBeTruthy();
      expect(getByText('Work collaboratively to secure deals together')).toBeTruthy();
    });

    it('should navigate to intro screen', () => {
      const { getByTestId, getByText } = render(<SwagDashboardMegadealTile />);
      expect(getByText('Help shape the deals of the future')).toBeTruthy();
      expect(getByText('Work collaboratively to secure deals together')).toBeTruthy();

      fireEvent.press(getByTestId('swag-dashboard-megadeal-tile-test-id'));

      expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
        screen: 'GroupStack',
        params: {
          screen: 'JoinWaitListIntroScreen',
          params: {
            onJoinWaitListSuccess: expect.anything(),
          },
        },
      });
    });
  });
});
