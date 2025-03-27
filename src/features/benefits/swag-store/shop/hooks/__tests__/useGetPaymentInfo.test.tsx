import React from 'react';
import { Text, View } from 'react-native';
import { useHeroPointsVisibility } from '../../../../../../common/hooks/useHeroPointsVisibility';
import type { PermissionData } from '../../../../../../common/stores/usePermissionStore';
import { usePermissionStore } from '../../../../../../common/stores/usePermissionStore';
import { render, renderHook } from '../../../../../../common/utils/testing';
import { useGetHeroPointsBalanceQuery } from '../../../../../../new-graphql/generated';
import { useDiscountShopStore } from '../../store/useDiscountShopStore';
import { useGetPaymentInfo } from '../useGetPaymentInfo';

const FakeView = () => {
  const { amountDue, amountDueInPoints, cardFeeAmount, isFulfill, payByCard, payByHeroPoints, quantity } =
    useGetPaymentInfo();

  return (
    <View>
      <Text testID="amountDue">{amountDue}</Text>
      <Text testID="amountDueInPoints">{amountDueInPoints}</Text>
      <Text testID="cardFeeAmount">{cardFeeAmount}</Text>
      <Text testID="isFulfill">{`${isFulfill}`}</Text>
      <Text testID="payByCard">{payByCard}</Text>
      <Text testID="payByHeroPoints">{payByHeroPoints}</Text>
      <Text testID="quantity">{quantity}</Text>
    </View>
  );
};

jest.mock('../../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../../new-graphql/generated'),
  useGetHeroPointsBalanceQuery: jest.fn(),
}));

jest.mock('../../../../../../common/hooks/useHeroPointsVisibility', () => ({
  useHeroPointsVisibility: jest.fn(),
}));

const mockId = '123';

describe('useGetPaymentInfo: load default payment', () => {
  beforeEach(() => {
    (useGetHeroPointsBalanceQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          heroPoints: {
            balance: 500,
          },
        },
      },
    });

    const shopStore = renderHook(() => useDiscountShopStore());
    shopStore.result.current.quantity = 2;
    shopStore.result.current.currentId = mockId;
    shopStore.result.current.productDetails[mockId] = {
      id: '123',
      discountPrice: 100,
      transactionFee: 0.99,
      serviceFee: 0.5,
      discountPriceInPoints: 209,
    };
  });

  it('should leave credit card payment more than 0.5$', () => {
    (useGetHeroPointsBalanceQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          heroPoints: {
            balance: 2100,
          },
        },
      },
    });
    (useHeroPointsVisibility as jest.Mock).mockReturnValue(true);

    const shopStore = renderHook(() => useDiscountShopStore());
    shopStore.result.current.quantity = 1;
    shopStore.result.current.currentId = mockId;
    shopStore.result.current.productDetails[mockId] = {
      id: '123',
      discountPrice: 95.98,
      transactionFee: 0.99,
      serviceFee: 0.5,
      discountPriceInPoints: 2105,
    };

    const { getByTestId } = render(<FakeView />);

    expect(getByTestId('amountDue')).toHaveTextContent('95.98');
    expect(getByTestId('amountDueInPoints')).toHaveTextContent('2105');
    expect(getByTestId('payByHeroPoints')).toHaveTextContent('2094');
  });

  describe('with service fee off', function () {
    beforeEach(() => {
      usePermissionStore.setState({ permissions: { ebenServiceFee: { view: false } } as PermissionData });
    });

    describe('with hero points enabled', function () {
      beforeEach(() => {
        (useHeroPointsVisibility as jest.Mock).mockReturnValue(true);
      });

      it('work correctly when Hero Points balance > amount due', () => {
        const { getByTestId } = render(<FakeView />);

        expect(getByTestId('amountDue')).toHaveTextContent('200');
        expect(getByTestId('amountDueInPoints')).toHaveTextContent('418');
        expect(getByTestId('payByHeroPoints')).toHaveTextContent('418');
        expect(getByTestId('quantity')).toHaveTextContent('2');
        expect(getByTestId('isFulfill')).toHaveTextContent('true');
      });

      it('work correctly when Hero Points balance = amount due', () => {
        (useGetHeroPointsBalanceQuery as unknown as jest.Mock).mockReturnValue({
          data: {
            me: {
              heroPoints: {
                balance: 418,
              },
            },
          },
        });
        const { getByTestId } = render(<FakeView />);

        expect(getByTestId('payByHeroPoints')).toHaveTextContent('418');
        expect(getByTestId('amountDue')).toHaveTextContent('200');
        expect(getByTestId('amountDueInPoints')).toHaveTextContent('418');
        expect(getByTestId('quantity')).toHaveTextContent('2');
        expect(getByTestId('isFulfill')).toHaveTextContent('true');
      });

      it('work correctly when Hero Points balance < amount due', () => {
        (useGetHeroPointsBalanceQuery as unknown as jest.Mock).mockReturnValue({
          data: {
            me: {
              heroPoints: {
                balance: 300,
              },
            },
          },
        });
        const { getByTestId } = render(<FakeView />);

        expect(getByTestId('payByHeroPoints')).toHaveTextContent('300');
        expect(getByTestId('amountDue')).toHaveTextContent('200');
        expect(getByTestId('amountDueInPoints')).toHaveTextContent('418');
        expect(getByTestId('quantity')).toHaveTextContent('2');
        expect(getByTestId('isFulfill')).toHaveTextContent('false');
      });

      it('work correctly when no last used card and Hero Points balance < amount due', () => {
        (useGetHeroPointsBalanceQuery as unknown as jest.Mock).mockReturnValue({
          data: {
            me: {
              heroPoints: {
                balance: 300,
              },
            },
          },
        });

        const { getByTestId } = render(<FakeView />);

        expect(getByTestId('payByHeroPoints')).toHaveTextContent('300');
        expect(getByTestId('amountDue')).toHaveTextContent('200');
        expect(getByTestId('amountDueInPoints')).toHaveTextContent('418');
        expect(getByTestId('quantity')).toHaveTextContent('2');
        expect(getByTestId('isFulfill')).toHaveTextContent('false');
      });

      it('work correctly when no hero points permission', () => {
        (useHeroPointsVisibility as jest.Mock).mockReturnValue(false);

        const { getByTestId } = render(<FakeView />);

        expect(getByTestId('payByHeroPoints')).toHaveTextContent('0');
        expect(getByTestId('amountDue')).toHaveTextContent('200');
        expect(getByTestId('amountDueInPoints')).toHaveTextContent('418');
        expect(getByTestId('quantity')).toHaveTextContent('2');
        expect(getByTestId('isFulfill')).toHaveTextContent('false');
      });
    });
  });

  describe('with service fee on', function () {
    beforeEach(function () {
      usePermissionStore.setState({ permissions: { ebenServiceFee: { view: true } } as PermissionData });
    });

    describe('with hero points enabled', function () {
      beforeEach(() => {
        (useHeroPointsVisibility as jest.Mock).mockReturnValue(true);
      });

      it('work correctly when Hero Points balance > amount due', () => {
        const { getByTestId } = render(<FakeView />);

        expect(getByTestId('amountDue')).toHaveTextContent('201');
        expect(getByTestId('payByHeroPoints')).toHaveTextContent('418');
        expect(getByTestId('quantity')).toHaveTextContent('2');
        expect(getByTestId('isFulfill')).toHaveTextContent('true');
      });

      it('work correctly when Hero Points balance = amount due', () => {
        (useGetHeroPointsBalanceQuery as unknown as jest.Mock).mockReturnValue({
          data: {
            me: {
              heroPoints: {
                balance: 418,
              },
            },
          },
        });
        const { getByTestId } = render(<FakeView />);

        expect(getByTestId('payByHeroPoints')).toHaveTextContent('418');
        expect(getByTestId('amountDue')).toHaveTextContent('201');
        expect(getByTestId('amountDueInPoints')).toHaveTextContent('418');
        expect(getByTestId('quantity')).toHaveTextContent('2');
        expect(getByTestId('isFulfill')).toHaveTextContent('true');
      });

      it('work correctly when Hero Points balance < amount due', () => {
        (useGetHeroPointsBalanceQuery as unknown as jest.Mock).mockReturnValue({
          data: {
            me: {
              heroPoints: {
                balance: 100,
              },
            },
          },
        });
        const { getByTestId } = render(<FakeView />);

        expect(getByTestId('payByHeroPoints')).toHaveTextContent('100');
        expect(getByTestId('amountDue')).toHaveTextContent('201');
        expect(getByTestId('amountDueInPoints')).toHaveTextContent('418');
        expect(getByTestId('quantity')).toHaveTextContent('2');
        expect(getByTestId('isFulfill')).toHaveTextContent('false');
      });

      it('work correctly when no hero points permission', () => {
        (useHeroPointsVisibility as jest.Mock).mockReturnValue(false);

        const { getByTestId } = render(<FakeView />);

        expect(getByTestId('payByHeroPoints')).toHaveTextContent('0');
        expect(getByTestId('amountDue')).toHaveTextContent('201');
        expect(getByTestId('amountDueInPoints')).toHaveTextContent('418');
        expect(getByTestId('quantity')).toHaveTextContent('2');
        expect(getByTestId('isFulfill')).toHaveTextContent('false');
      });
    });
  });
});
