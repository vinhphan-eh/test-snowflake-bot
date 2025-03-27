import { renderHook } from '../../../../common/utils/testing';
import { StashStatus } from '../../../../new-graphql/generated';
import { aStashItem } from '../../../../new-graphql/mocks/generated-mocks';
import { convertStashToStashDetails, useGetStashDetails } from '../useGetStashDetails';

describe('useGetStashDetails', () => {
  test('should return default value', () => {
    const { result } = renderHook(() => useGetStashDetails({ id: '1' }));
    expect(result.current).toEqual({
      balance: undefined,
      closedAtUtc: '',
      createdAtUtc: '',
      id: '',
      imageUrl: '',
      name: '',
      status: StashStatus.Closed,
      targetAmount: undefined,
    });
  });

  describe('convertStashToStashDetails', () => {
    test('should return value as expected', () => {
      const stash = aStashItem();
      const stashDetails = convertStashToStashDetails(stash);
      expect(stashDetails).toEqual({
        balance: stash.balance,
        closedAtUtc: stash.closedAtUtc,
        createdAtUtc: stash.createdAtUtc,
        id: stash.id,
        imageUrl: stash.imageUrl,
        name: stash.name,
        status: stash.status,
        targetAmount: stash.targetAmount,
      });
    });
  });
});
