import { renderHook } from '@testing-library/react-hooks';
import { MockGetActiveSuperfundMemberships } from '../../../../new-graphql/handlers/custom-mock/activeSuperfundMemberships';
import { useActiveSuperfundMemberships } from '../useActiveSuperfundMemberships';

describe('useActiveSuperfundMemberships', () => {
  it('should returns correctly', () => {
    const { result } = renderHook(() =>
      useActiveSuperfundMemberships({
        memberships: MockGetActiveSuperfundMemberships,
      })
    );

    const [first, second, third, fourth] = result.current.membershipsData;

    expect(first.fundName).toEqual('Spaceship');
    expect(first.orgNames).toHaveLength(2);
    expect(first.orgNames).toEqual(['Employment Hero', 'KeyPay']);

    expect(second.fundName).toEqual('Spaceship');
    expect(second.orgNames).toHaveLength(1);
    expect(second.orgNames).toEqual(['Employment Hero']);

    expect(third.fundName).toEqual('The Spaceship');
    expect(third.orgNames).toHaveLength(1);
    expect(third.orgNames).toEqual(['Employment Hero']);

    expect(fourth.fundName).toEqual('The Spaceshipppppp');
    expect(fourth.orgNames).toHaveLength(1);
    expect(fourth.orgNames).toEqual(['HRV']);

    expect(result.current.membershipsData.length).toEqual(5);
  });

  it('should not group by when memberNumber and usi are different', () => {
    const { result } = renderHook(() =>
      useActiveSuperfundMemberships({
        memberships: [
          {
            uuid: '20e4b652-18ed-42c4-8fe0-7f4c6120bdc8',
            name: 'Employment Hero',
            memberId: 123456,
            memberUuid: '11e4b652-18ed-42c4-8fe0-7f4c6120bdc8',
            activeSuperfundMembership: {
              memberNumber: '32784928',
              fundChoice: 'Regulated',
              fundName: 'Spaceship',
              abn: '6090511506',
              usi: '609 051 15063003',
              updatedAt: '2024-10-01T04:38:26Z',
            },
          },
          {
            uuid: '20e4b652-18ed-42c4-8fe0-7f4c6120bdc8',
            name: 'Employment Hero',
            memberId: 223456,
            memberUuid: '12e4b652-18ed-42c4-8fe0-7f4c6120bdc8',
            activeSuperfundMembership: {
              memberNumber: '32784922',
              fundChoice: 'Regulated',
              fundName: 'Spaceship',
              abn: '6090511506',
              usi: '60 905115 063001',
              updatedAt: '2024-10-01T04:38:26Z',
            },
          },
        ],
      })
    );

    const activeMemberships = result.current.membershipsData;
    expect(activeMemberships).toHaveLength(2);
    expect(activeMemberships).toEqual([
      {
        orgNames: ['Employment Hero'],
        memberNumber: '32784928',
        fundType: 'Regulated',
        fundName: 'Spaceship',
        abn: '6090511506',
        memberId: '123456',
        memberUuid: '11e4b652-18ed-42c4-8fe0-7f4c6120bdc8',
        usi: '60905115063003',
        id: '20e4b652-18ed-42c4-8fe0-7f4c6120bdc8',
        updatedAt: new Date('2024-10-01T04:38:26.000Z'),
      },
      {
        orgNames: ['Employment Hero'],
        memberNumber: '32784922',
        fundType: 'Regulated',
        fundName: 'Spaceship',
        abn: '6090511506',
        memberId: '223456',
        memberUuid: '12e4b652-18ed-42c4-8fe0-7f4c6120bdc8',
        usi: '60905115063001',
        id: '20e4b652-18ed-42c4-8fe0-7f4c6120bdc8',
        updatedAt: new Date('2024-10-01T04:38:26.000Z'),
      },
    ]);
  });

  it('should group by when memberNumber and usi are the same', () => {
    const { result } = renderHook(() =>
      useActiveSuperfundMemberships({
        memberships: [
          {
            uuid: '20e4b652-98ed-42c4-8fe0-7f4c6120bdc8',
            name: 'Employment Hero',
            memberId: 123456,
            memberUuid: '11e4b652-18ed-42c4-8fe0-7f4c6120bdc8',
            activeSuperfundMembership: {
              memberNumber: '32784928',
              fundChoice: 'Regulated',
              fundName: 'Spaceship',
              abn: '6090511506',
              usi: '609 051 15063003',
              updatedAt: '2024-10-01T04:37:26Z',
            },
          },
          {
            uuid: '20e4b652-98ed-42c4-8fe0-7f4c6120bdc8',
            name: 'Employment Hero',
            memberId: 223456,
            memberUuid: '12e4b652-18ed-42c4-8fe0-7f4c6120bdc8',
            activeSuperfundMembership: {
              memberNumber: '32784922',
              fundChoice: 'Regulated',
              fundName: 'Spaceship',
              abn: '6090511506',
              usi: '60 905115 063001',
              updatedAt: '2024-10-01T04:37:26Z',
            },
          },
          {
            uuid: '10e4b652-98ed-42c4-8fe0-7f4c6120bdc8',
            name: 'KeyPay',
            memberId: 323456,
            memberUuid: '13e4b652-18ed-42c4-8fe0-7f4c6120bdc8',
            activeSuperfundMembership: {
              memberNumber: '32784928',
              fundChoice: 'Regulated',
              fundName: 'Spaceshippppppp',
              abn: '6090511506',
              usi: '6090511506 3003',
              updatedAt: '2024-10-01T04:37:26Z',
            },
          },
        ],
      })
    );

    const activeMemberships = result.current.membershipsData;
    expect(activeMemberships).toHaveLength(2);
    expect(activeMemberships).toEqual([
      {
        orgNames: ['Employment Hero', 'KeyPay'],
        memberNumber: '32784928',
        fundType: 'Regulated',
        fundName: 'Spaceship',
        abn: '6090511506',
        memberId: '123456',
        memberUuid: '11e4b652-18ed-42c4-8fe0-7f4c6120bdc8',
        usi: '60905115063003',
        id: '20e4b652-98ed-42c4-8fe0-7f4c6120bdc8',
        updatedAt: new Date('2024-10-01T04:37:26.000Z'),
      },
      {
        orgNames: ['Employment Hero'],
        memberNumber: '32784922',
        fundType: 'Regulated',
        fundName: 'Spaceship',
        abn: '6090511506',
        memberId: '223456',
        memberUuid: '12e4b652-18ed-42c4-8fe0-7f4c6120bdc8',
        usi: '60905115063001',
        id: '20e4b652-98ed-42c4-8fe0-7f4c6120bdc8',
        updatedAt: new Date('2024-10-01T04:37:26.000Z'),
      },
    ]);
  });

  it('should not returns membership when activeSuperfundMembership is null', () => {
    const { result } = renderHook(() =>
      useActiveSuperfundMemberships({
        memberships: [
          {
            uuid: '20e4b652-98ed-42c4-8fe0-7f4c6120bdc8',
            name: 'Employment Hero',
            memberId: 123456,
            memberUuid: '11e4b652-18ed-42c4-8fe0-7f4c6120bdc8',
            activeSuperfundMembership: {
              memberNumber: '32784928',
              fundChoice: 'Regulated',
              fundName: 'Spaceship',
              abn: '6090511506',
              usi: '609 051 15063003',
              updatedAt: '2024-10-01T04:37:26Z',
            },
          },
          {
            uuid: '20e4b652-98ed-42c4-8fe0-7f4c6120bdc8',
            name: 'KeyPay',
            activeSuperfundMembership: null,
          },
        ],
      })
    );

    const activeMemberships = result.current.membershipsData;
    expect(activeMemberships).toHaveLength(1);
    expect(activeMemberships).toEqual([
      {
        orgNames: ['Employment Hero'],
        memberNumber: '32784928',
        fundType: 'Regulated',
        fundName: 'Spaceship',
        abn: '6090511506',
        memberId: '123456',
        memberUuid: '11e4b652-18ed-42c4-8fe0-7f4c6120bdc8',
        usi: '60905115063003',
        id: '20e4b652-98ed-42c4-8fe0-7f4c6120bdc8',
        updatedAt: new Date('2024-10-01T04:37:26.000Z'),
      },
    ]);
  });

  it('should returns empty array if membershipsData not found', () => {
    const { result } = renderHook(() =>
      useActiveSuperfundMemberships({
        memberships: undefined,
      })
    );
    expect(result.current.membershipsData.length).toEqual(0);
  });
});
