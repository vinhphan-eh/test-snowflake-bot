import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { render, fireEvent } from '../../../../common/utils/testing';
import { useGetActiveSuperfundMembershipsQuery } from '../../../../new-graphql/generated';
import { MockGetActiveSuperfundMemberships } from '../../../../new-graphql/handlers/custom-mock/activeSuperfundMemberships';
import { ActiveMembershipScreen } from '../ActiveMembershipScreen';

jest.mock('../../../../new-graphql/generated', () => ({
  useGetActiveSuperfundMembershipsQuery: jest.fn(),
}));

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('ActiveMembershipScreen', () => {
  beforeEach(() => {
    mockedUseRoute.mockReturnValue({
      params: {},
      key: '',
      name: '',
    });
  });

  it('should render spinner at initialize', () => {
    (useGetActiveSuperfundMembershipsQuery as unknown as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    const { getByTestId } = render(<ActiveMembershipScreen />);
    expect(getByTestId('spinner')).toBeTruthy();
  });

  it('should render active superfund memberships', () => {
    (useGetActiveSuperfundMembershipsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          orgs: [...MockGetActiveSuperfundMemberships],
        },
      },
    });

    const { getByText } = render(<ActiveMembershipScreen />);

    expect(getByText("Let's connect your Super")).toBeTruthy();
    expect(getByText('We found these in your Work profile. Select one to connect it.')).toBeTruthy();
    expect(getByText('The Spaceship')).toBeTruthy();
    expect(getByText('Employment Hero, KeyPay')).toBeTruthy();

    expect(getByText('Spirit Super')).toBeTruthy();
    expect(getByText('PensionSync')).toBeTruthy();
    expect(getByText('Last updated on 06/10/24')).toBeTruthy();

    expect(getByText('The Spaceshipppppp')).toBeTruthy();
    expect(getByText('HRV')).toBeTruthy();
    expect(getByText('Last updated on 05/10/24')).toBeTruthy();
  });

  it('should not render active superfund memberships when memberships data are empty ', async () => {
    (useGetActiveSuperfundMembershipsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          orgs: [],
        },
      },
    });

    const { getByText } = render(<ActiveMembershipScreen />);
    expect(getByText("Let's connect your Super")).toBeTruthy();
    expect(getByText('We can only collect your Super info if you’re connected to Work.')).toBeTruthy();
    expect(
      getByText("We're working hard to bring you access to our partner and other APRA regulated superfunds.")
    ).toBeTruthy();
  });

  it('should navigate to Super Details Screen when clicked on superfund tile', () => {
    (useGetActiveSuperfundMembershipsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          orgs: [...MockGetActiveSuperfundMemberships],
        },
      },
    });

    const { getByText } = render(<ActiveMembershipScreen />);

    const spaceShipTile = getByText('The Spaceship');

    fireEvent.press(spaceShipTile);

    expect(mockedNavigate).toBeCalledWith('SuperDetailConfirm', {
      title: 'Superannuation Details',
      membership: {
        abn: '6090511506',
        fundType: 'Regulated',
        fundName: 'The Spaceship',
        memberNumber: '32784928',
        memberUuid: '14e4b652-18ed-42c4-8fe0-7f4c6120bdc8',
        usi: '60905115063012',
        memberId: '423456',
        orgNames: ['Employment Hero'],
        id: '20e4b652-48ed-42c4-8fe0-7f4c6120bdc8',
        updatedAt: new Date('2024-10-04T04:29:08.799Z'),
      },
      resync: undefined,
      trackingAttributes: {
        fundName: 'The Spaceship',
        usi: '60905115063012',
        resync: false,
      },
    });
  });

  it('should render resync text correctly', () => {
    (useGetActiveSuperfundMembershipsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          orgs: [...MockGetActiveSuperfundMemberships],
        },
      },
    });
    mockedUseRoute.mockReturnValue({
      params: { resync: true },
      key: '',
      name: '',
    });

    const { getByText } = render(<ActiveMembershipScreen />);
    expect(getByText('We found these updated Super details in your Work profile. Select to resync.')).toBeTruthy();
    expect(
      getByText(
        "If you have any existing salary sacrifice arrangements, these will not be impacted. You'll also still be able to view any existing active, pending and archived salary sacrifice requests."
      )
    ).toBeTruthy();
  });
});
