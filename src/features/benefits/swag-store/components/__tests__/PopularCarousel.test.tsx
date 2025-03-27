import React from 'react';
import { Text } from 'react-native';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { render, renderHook } from '../../../../../common/utils/testing';
import { PopularCarousel } from '../PopularCarousel';

jest.mock('../PromotedGiftCards', () => ({
  PromotedGiftCard: () => <Text>Promoted Gift Card Comp</Text>,
}));

describe('PopularCarousel', () => {
  it('should work correctly when having permission', () => {
    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      ebenStorePopularList: {
        view: true,
      },
    } as never;
    const { getByText } = render(<PopularCarousel location="popular carousel" />);

    expect(getByText('Promoted Gift Card Comp')).toBeTruthy();
  });

  it('should work correctly when having permission', () => {
    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      ebenStorePopularList: {
        view: false,
      },
    } as never;
    const { queryByText } = render(<PopularCarousel location="popular carousel" />);

    expect(queryByText('Promoted Gift Card Comp')).toBeNull();
  });
});
