import React from 'react';
import { Text } from 'react-native';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { render, renderHook } from '../../../../../common/utils/testing';
import { BuyAgainCarousel } from '../BuyAgainCarousel';

jest.mock('../PromotedGiftCards', () => ({
  PromotedGiftCard: () => <Text>Promoted Gift Card Comp</Text>,
}));

describe('BuyAgainCarousel', () => {
  it('should work correctly when having permission', () => {
    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      ebenStoreBuyAgainCarousel: {
        view: true,
      },
    } as never;
    const { getByText } = render(<BuyAgainCarousel location="buy again carousel" />);

    expect(getByText('Promoted Gift Card Comp')).toBeTruthy();
  });

  it('should work correctly when having permission', () => {
    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      ebenStoreBuyAgainCarousel: {
        view: false,
      },
    } as never;
    const { queryByText } = render(<BuyAgainCarousel location="buy again carousel" />);

    expect(queryByText('Promoted Gift Card Comp')).toBeNull();
  });
});
