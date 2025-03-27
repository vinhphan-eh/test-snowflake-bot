import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { render, fireEvent, waitFor } from '../../../../../common/utils/testing';
import {
  useGetGroupDetailQuery,
  useGetUserGroupMembershipAndConsentQuery,
  useJoinGroupWithConsentAgreementMutation,
} from '../../../../../new-graphql/generated';
import { MockGroups } from '../../../../../new-graphql/handlers/custom-mock/group';
import { aGroupMembership } from '../../../../../new-graphql/mocks/generated-mocks';
import { GROUP_MEMBER_AVATARS } from '../../utils/getGroupMemberAvatars';
import { GroupDetailScreen } from '../GroupDetailScreen';

jest.mock('../../../../../common/hooks/useMixpanel');
jest.mock('../../../../../new-graphql/generated', () => ({
  useGetGroupDetailQuery: jest.fn(),
  useGetUserGroupMembershipAndConsentQuery: jest.fn(),
  useJoinGroupWithConsentAgreementMutation: jest.fn(),
}));

const mockUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;
const mockJoinGroupWithConsent = jest.fn();
const mockGroupDetail = { ...MockGroups[0], memberAvatars: GROUP_MEMBER_AVATARS.slice(0, 3) };

describe('GroupDetailScreen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockUseRoute.mockReturnValue({
      params: {
        group: mockGroupDetail,
      },
      key: '',
      name: '',
    });

    (useGetGroupDetailQuery as unknown as jest.Mock).mockReturnValue({
      isError: false,
      isLoading: false,
      data: {
        group: {
          groupDetail: mockGroupDetail,
        },
      },
    });
    (useGetUserGroupMembershipAndConsentQuery as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        me: {
          group: { groupMembership: null },
          userGroupConsent: null,
        },
      },
    });
    (useJoinGroupWithConsentAgreementMutation as jest.Mock).mockReturnValue({
      isLoading: false,
      mutateAsync: mockJoinGroupWithConsent,
    });
  });

  it('should render correctly when user have not join group', () => {
    const { getAllByTestId, getByText } = render(<GroupDetailScreen />);
    expect(getByText('Save big on Health Insurance')).toBeVisible();
    expect(getByText('Join Group')).toBeVisible();
    expect(getByText('annual savings')).toBeVisible();
    expect(getByText('you could be the')).toBeVisible();
    expect(getByText('member of this group')).toBeVisible();
    expect(getAllByTestId('custom-info-value-test-id')[0]).toHaveTextContent('104,308');
    expect(getAllByTestId('custom-info-value-test-id')[1]).toHaveTextContent('10');
  });

  it('should render correctly when user have join group', () => {
    (useGetUserGroupMembershipAndConsentQuery as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        me: {
          group: { groupMembership: aGroupMembership({ position: 199999 }) },
          userGroupConsent: null,
        },
      },
    });

    const { getAllByTestId, getByText } = render(<GroupDetailScreen />);
    expect(getByText('you are the')).toBeVisible();
    expect(getByText('Invite others')).toBeVisible();
    expect(getAllByTestId('custom-info-value-test-id')[0]).toHaveTextContent('199,999');
  });

  it('should join group success and navigate to success screen', async () => {
    const { getByText } = render(<GroupDetailScreen />);
    fireEvent.press(getByText('Yes'));

    await waitFor(() => {
      expect(mockedEventTracking).toBeCalledWith({
        event: 'mobile#megadeal#Click Join Group Button',
        categoryName: 'user action',
        metaData: {
          module: 'Group',
          groupName: 'Save big on Health Insurance',
          consented: true,
        },
      });
    });
    expect(mockJoinGroupWithConsent).toBeCalledWith({
      input: {
        groupId: 'cd1',
      },
      consented: true,
    });
    expect(mockedNavigate).toBeCalledWith('JoinGroupSuccessScreen');
  });

  it('should join group failed and navigate to failed screen', async () => {
    (useJoinGroupWithConsentAgreementMutation as jest.Mock).mockReturnValue({
      isLoading: false,
      mutateAsync: undefined,
    });

    const { getByText } = render(<GroupDetailScreen />);
    fireEvent.press(getByText('Yes'));

    expect(mockedNavigate).toBeCalledWith('JoinGroupFailedScreen', {
      errorMessage: 'joinGroupWithConsent is not a function',
    });
  });
});
