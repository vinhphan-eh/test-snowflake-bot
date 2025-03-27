import React from 'react';
import { render } from '../../../../../../../common/utils/testing';
import {
  aDiscountHistory,
  anOrderDetails,
  anOrderProductVariant,
  anOrderPurchaseItem,
} from '../../../../../../../new-graphql/mocks/generated-mocks';
import { GiftCardListItem } from '../GiftCardListItem';

describe('Gift card list item', () => {
  it('should render correctly', () => {
    const item = aDiscountHistory();
    const orderDetail = anOrderDetails({
      productVariant: anOrderProductVariant({
        variantCode: 'variant-code',
      }),
    });
    const purchaseItem = anOrderPurchaseItem();
    const { getByText } = render(
      <GiftCardListItem item={item} purchaseItem={purchaseItem} orderDetail={orderDetail} />
    );

    expect(getByText('VARIANT CODE')).toBeTruthy();
    expect(getByText('$9.92')).toBeTruthy();
  });
});
