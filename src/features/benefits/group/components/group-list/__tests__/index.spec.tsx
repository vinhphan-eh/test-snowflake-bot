import React from 'react';
import type { PermissionData } from '../../../../../../common/stores/usePermissionStore';
import { usePermissionStore } from '../../../../../../common/stores/usePermissionStore';
import { render } from '../../../../../../common/utils/testing';
import { MockGroups } from '../../../../../../new-graphql/handlers/custom-mock/group';
import { useGroupsData } from '../../../hooks/useGroupsData';
import { useIsAbleToShowGroups } from '../../../hooks/useIsAbleToShowGroups';
import { GroupList } from '../index';

jest.mock('../../../../../../new-graphql/generated', () => ({
  useGetGroupsQuery: jest.fn(),
}));

jest.mock('../../../hooks/useIsAbleToShowGroups');
jest.mock('../../../hooks/useGroupsData');

const mockPermissions: PermissionData = { toggleMegaDealsCommunitiesCtas: { view: false } } as PermissionData;

const mockIsAbleToShowGroups = useIsAbleToShowGroups as jest.MockedFn<typeof useIsAbleToShowGroups>;
const mockUseGroupsData = useGroupsData as jest.MockedFn<typeof useGroupsData>;

describe('GroupList', () => {
  beforeEach(() => {
    usePermissionStore.setState({
      permissions: mockPermissions,
    });
    mockUseGroupsData.mockReturnValue({
      groups: MockGroups.map(group => ({
        ...group,
        memberAvatars: [],
      })),
      isLoading: false,
      isLoadingError: false,
    });
    mockIsAbleToShowGroups.mockReturnValue(true);
  });

  it('should render correctly when toggleMegaDealsGroupsPermission is false', () => {
    const { queryByText } = render(<GroupList title="Group list title test" />);
    expect(queryByText('Group list title test')).toBeNull();
  });

  it('should render correctly when toggleMegaDealsGroupsPermission is true', () => {
    usePermissionStore.setState({
      permissions: { ...mockPermissions, toggleMegaDealsCommunitiesCtas: { view: true } },
    });
    const { getAllByLabelText, getByText } = render(<GroupList title="Group list title test" />);
    expect(getByText('Group list title test')).toBeTruthy();
    expect(getAllByLabelText('megadeal-group-item')).toHaveLength(3);

    expect(getByText('Save big on Health Insurance')).toBeVisible();
    expect(getByText('10% annual savings')).toBeVisible();
  });
});
