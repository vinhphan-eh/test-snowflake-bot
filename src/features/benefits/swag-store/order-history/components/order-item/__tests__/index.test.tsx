import React from 'react';
import OrderItem from '..';
import { render, fireEvent } from '../../../../../../../common/utils/testing';
import { OrderProductType, OrderStatus } from '../../../../../../../new-graphql/generated';

describe('Order Item', () => {
  it('should render correctly', () => {
    const { getAllByLabelText, getByText } = render(
      <OrderItem
        purchaseAmount="$95.94"
        quantity={2}
        status={OrderStatus.Processing}
        date="27 Oct 2022, 11:00 am"
        orderName="Coles $5 eGift Card"
        productType={OrderProductType.Giftcard}
        purchaseItemName="Coles 100"
        havePurchaseItems
      />
    );

    expect(getByText('Coles $5 eGift Card')).toBeTruthy();
    expect(getByText('Purchase amount')).toBeTruthy();
    expect(getByText('$95.94')).toBeTruthy();
    expect(getByText('Quantity')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('Status')).toBeTruthy();
    expect(getByText('PROCESSING')).toBeTruthy();
    expect(getByText('27 Oct 2022, 11:00 am')).toBeTruthy();
    expect(getAllByLabelText('Coles 100').length).toBe(2);
  });

  it('press on menu item works correctly', () => {
    const mockItemPress = jest.fn();
    const { getAllByLabelText } = render(
      <OrderItem
        purchaseAmount="$95.94"
        quantity={2}
        status={OrderStatus.Processing}
        date="27 Oct 2022, 11:00 am"
        orderName="Coles $5 eGift Card"
        productType={OrderProductType.Giftcard}
        purchaseItemName="Coles 100"
        havePurchaseItems
        onItemPress={mockItemPress}
      />
    );

    const itemList = getAllByLabelText('Coles 100');

    fireEvent.press(itemList[0]);

    expect(itemList.length).toBe(2);
    expect(mockItemPress).toBeCalledWith(0);
  });

  it('disable menu item when no purchase items', () => {
    const { getAllByLabelText } = render(
      <OrderItem
        purchaseAmount="$95.94"
        quantity={2}
        status={OrderStatus.Processing}
        date="27 Oct 2022, 11:00 am"
        orderName="Coles $5 eGift Card"
        productType={OrderProductType.Giftcard}
        purchaseItemName="Coles 100"
        havePurchaseItems={false}
      />
    );

    const itemList = getAllByLabelText('Coles 100');

    expect(itemList[0]).toBeDisabled();
    expect(itemList[1]).toBeDisabled();
  });

  it('should not render menu items when product type is dropship', () => {
    const { queryAllByLabelText } = render(
      <OrderItem
        purchaseAmount="$95.94"
        quantity={2}
        status={OrderStatus.Processing}
        date="27 Oct 2022, 11:00 am"
        orderName="Coles $5 eGift Card"
        productType={OrderProductType.Dropship}
        purchaseItemName="Coles 100"
        havePurchaseItems={false}
      />
    );

    expect(queryAllByLabelText('Coles 100').length).toBe(0);
  });
});
