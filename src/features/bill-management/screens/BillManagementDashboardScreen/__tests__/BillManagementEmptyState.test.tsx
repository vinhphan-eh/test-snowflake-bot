import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { usePermissionStore, type PermissionData } from '../../../../../common/stores/usePermissionStore';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { navigateToTopTabs } from '../../../../../navigation/rootNavigation';
import {
  Currency,
  Pid,
  SubscriptionStatus,
  SubscriptionType,
  useGetGroupsQuery,
} from '../../../../../new-graphql/generated';
import { MockGroups } from '../../../../../new-graphql/handlers/custom-mock/group';
import { mockUseGetAllBillOffers } from '../../../../benefits/bill-streaming/hooks/__mocks__/useGetAllBillOffers';
import { useGroupsData } from '../../../../benefits/group/hooks/useGroupsData';
import { useIsAbleToShowGroups } from '../../../../benefits/group/hooks/useIsAbleToShowGroups';
import { BillManagementEmptyState } from '../BillManagementEmptyState';

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useGetGroupsQuery: jest.fn(),
}));
jest.mock('../../../../benefits/bill-streaming/hooks/useGetAllBillOffers', () => ({
  useGetAllBillOffers: jest.fn(),
}));
jest.mock('../../../../../navigation/rootNavigation', () => ({
  navigateToTopTabs: jest.fn(),
}));

const mockPermissions: PermissionData = { toggleMegaDealsCommunitiesCtas: { view: false } } as PermissionData;

const mockOffer = {
  about: '',
  description: '',
  estBillAmount: {
    amount: 100,
    currency: Currency.Aud,
  },
  howItWorks: '',
  id: '1',
  paidAmount: {
    amount: 95,
    currency: Currency.Aud,
  },
  logoUrl: '',
  imageUrl: '',
  provider: {
    id: Pid.SimplyEnergy,
    name: 'Simply Energy',
  },
  savingPercentage: 5,
  signUpLink: 'link',
  termsAndConditions: '',
  title: 'Swag discounts on your energy',
  categoryCode: 'bill',
};

jest.mock('../../../../benefits/group/hooks/useIsAbleToShowGroups');
jest.mock('../../../../benefits/group/hooks/useGroupsData');

const mockIsAbleToShowGroups = useIsAbleToShowGroups as jest.MockedFn<typeof useIsAbleToShowGroups>;

const mockUseGroupsData = useGroupsData as jest.MockedFn<typeof useGroupsData>;

describe('BillManagementEmptyState', () => {
  beforeEach(() => {
    mockUseGetAllBillOffers.mockReturnValue({
      billOffers: [mockOffer],
      isLoading: false,
      isError: false,
    });
    mockUseGroupsData.mockReturnValue({
      groups: MockGroups.map(group => ({
        ...group,
        memberAvatars: [],
      })),
      isLoading: false,
      isLoadingError: false,
    });

    usePermissionStore.setState({
      permissions: { ...mockPermissions, toggleMegaDealsCommunitiesCtas: { view: true } },
    });

    (useGetGroupsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        group: { groups: MockGroups },
      },
    });
  });

  it('should open bill sign up webview screen when click on renew button', () => {
    const { getByText } = render(
      <BillManagementEmptyState
        subscriptions={[
          {
            id: '37122f2c-63dd-4ed0-b047-68bc6f88911d',
            status: SubscriptionStatus.Cancelled,
            createdAt: '2023-10-29T12:25:20Z',
            updatedAt: '2023-10-30T13:30:46Z',
            provider: { id: Pid.SimplyEnergy, name: 'Simply Energy' },
            totalSaved: { amount: 0, currency: Currency.Aud },
            latestBill: null,
            subscriptionType: SubscriptionType.Gas,
            signUpLink: 'test link',
          },
        ]}
      />
    );
    fireEvent.press(getByText('Renew'));
    expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
      screen: 'BillStreamStack',
      params: {
        screen: 'BillSignUpWebView',
        params: {
          url: 'test link',
          onBackToBill: expect.any(Function),
        },
      },
    });
    mockedNavigate.mock.calls[0][1].params.params.onBackToBill();
    expect(navigateToTopTabs).toBeCalledWith('bill-management');
  });

  it('should open group detail screen when click on group', () => {
    mockIsAbleToShowGroups.mockReturnValue(true);
    const { getByText } = render(<BillManagementEmptyState subscriptions={[]} />);
    fireEvent.press(getByText(MockGroups[0].promoTitle));
    expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
      screen: 'GroupStack',
      params: {
        screen: 'GroupDetailScreen',
        params: {
          group: expect.anything(),
        },
      },
    });
  });
});
