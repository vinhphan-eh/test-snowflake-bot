import React from 'react';
import { fireEvent, render } from '../../../../../../common/utils/testing';
import { MockGroups } from '../../../../../../new-graphql/handlers/custom-mock/group';
import { GROUP_MEMBER_AVATARS } from '../../../utils/getGroupMemberAvatars';
import { GroupItem } from '../GroupItem';

const [mockGroup] = MockGroups;
const mockOnPress = jest.fn();

describe('GroupItem', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <GroupItem
        testID="test-id"
        onPress={mockOnPress}
        group={{ ...mockGroup, memberAvatars: GROUP_MEMBER_AVATARS.slice(0, 4) }}
      />
    );
    expect(getByText('Save big on Health Insurance')).toBeTruthy();
    expect(getByText('10% annual savings')).toBeTruthy();
    fireEvent.press(getByText('Save big on Health Insurance'));
    expect(mockOnPress).toBeCalled();
  });
});
