import { act } from '@testing-library/react-hooks';
import { renderHook } from '../../../../../../common/utils/testing';
import { usePaymentMethod } from '../usePaymentMethod';

describe(usePaymentMethod, () => {
  describe('maxSpendablePoints', () => {
    it('should be min value between points balance and amountInPoints', () => {
      // Prepare hook input
      const cardFeeRate = 1.1;
      const orderAmount = 100;
      const orderAmountInPoints = 50;
      const pointsBalance = 1000;

      const { result } = renderHook(usePaymentMethod, {
        initialProps: { cardFeeRate, orderAmount, orderAmountInPoints, pointsBalance },
      });

      // Assert
      expect(result.current.maxSpendablePoints).toBe(50);
    });

    describe('when pointsBalance is less than orderAmountInPoints', () => {
      it('should return points that leave enough amountToPayViaCard >= 0.5', () => {
        // Prepare hook input
        const cardFeeRate = 1.1;
        const orderAmount = 2;
        const orderAmountInPoints = 44;
        const pointsBalance = 40;

        const { result } = renderHook(() =>
          usePaymentMethod({
            cardFeeRate,
            orderAmount,
            orderAmountInPoints,
            pointsBalance,
          })
        );

        expect(result.current.maxSpendablePoints).toBe(33);
        expect(result.current.amountToPayViaCard).toBeGreaterThanOrEqual(0.5);
      });
    });

    describe('when pointsBalance is greater than orderAmountInPoints', () => {
      it('should return orderAmountInPoints', () => {
        // Prepare hook input
        const cardFeeRate = 1.1;
        const orderAmount = 2;
        const orderAmountInPoints = 44;
        const pointsBalance = 1000;

        const { result } = renderHook(() =>
          usePaymentMethod({
            cardFeeRate,
            orderAmount,
            orderAmountInPoints,
            pointsBalance,
          })
        );

        // Assert
        expect(result.current.maxSpendablePoints).toBe(44);
      });
    });
  });
  describe('when orderAmount is changed', () => {
    it('should increase pointsToPay to maxSpendablePoints', () => {
      // Prepare hook input
      const cardFeeRate = 1.1;
      const orderAmount = 100;
      const orderAmountInPoints = 50;
      const pointsBalance = 1000;
      const { rerender, result } = renderHook(usePaymentMethod, {
        initialProps: { cardFeeRate, orderAmount, orderAmountInPoints, pointsBalance },
      });

      expect(result.current.pointsToPay).toBe(50);

      // Increase orderAmount and orderAmountInPoints
      rerender({ cardFeeRate, orderAmount: 200, orderAmountInPoints: 100, pointsBalance });

      expect(result.current.pointsToPay).toBe(100);
    });
  });

  describe('when pointsToPay is changed', () => {
    it('should return correct amountToPayViaCard', () => {
      // Prepare hook input
      const cardFeeRate = 1.1;
      const orderAmount = 100;
      const orderAmountInPoints = 50;
      const pointsBalance = 1000;
      const { result } = renderHook(usePaymentMethod, {
        initialProps: { cardFeeRate, orderAmount, orderAmountInPoints, pointsBalance },
      });

      // Change pointsToPay
      act(() => {
        result.current.setPointsToPay(25);
      });

      // Assert amountToPayViaCard
      expect(result.current.amountToPayViaCard).toBe(50);

      // Change pointsToPay
      act(() => {
        result.current.setPointsToPay(40);
      });

      // Assert amountToPayViaCard
      expect(result.current.amountToPayViaCard).toBe(20);
    });
  });

  describe('amountToPayViaCard', () => {
    describe('amountToPayViaCard less than 0.5 and > 0', () => {
      it('should return validAmountToPayViaCard = false', () => {
        const { result } = renderHook(() =>
          usePaymentMethod({
            cardFeeRate: 1.1,
            orderAmount: 100,
            orderAmountInPoints: 2000,
            pointsBalance: 3000,
          })
        );

        act(() => {
          result.current.setPointsToPay(1999);
        });

        expect(result.current.validAmountToPayViaCard).toBe(false);
      });
    });

    describe('amountToPayViaCard = 0', () => {
      it('should return validAmountToPayViaCard = true', () => {
        const { result } = renderHook(() =>
          usePaymentMethod({
            cardFeeRate: 1.1,
            orderAmount: 100,
            orderAmountInPoints: 2000,
            pointsBalance: 3000,
          })
        );

        act(() => {
          result.current.setPointsToPay(2000);
        });

        expect(result.current.validAmountToPayViaCard).toBe(true);
      });
    });

    describe('amountToPayViaCard > 0.5', () => {
      it('should return validAmountToPayViaCard = true', () => {
        const { result } = renderHook(() =>
          usePaymentMethod({
            cardFeeRate: 1.1,
            orderAmount: 100,
            orderAmountInPoints: 2000,
            pointsBalance: 3000,
          })
        );

        act(() => {
          result.current.setPointsToPay(1000);
        });

        expect(result.current.validAmountToPayViaCard).toBe(true);
      });
    });
  });

  describe('ready2Purchase', () => {
    describe('when orderAmount > 0', () => {
      const orderAmount = 100;

      describe('when amount to pay by card > 0.5', () => {
        it('should be ready to purchase', () => {
          const { result } = renderHook(() =>
            usePaymentMethod({
              cardFeeRate: 1.1,
              orderAmount,
              orderAmountInPoints: 2000,
              pointsBalance: 3000,
            })
          );

          act(() => {
            result.current.setPointsToPay(10);
          });

          expect(result.current.ready2Purchase).toBe(true);
        });
      });

      describe('when amount to pay by card = 0', () => {
        it('should be ready to purchase', () => {
          const { result } = renderHook(() =>
            usePaymentMethod({
              cardFeeRate: 1.1,
              orderAmount,
              orderAmountInPoints: 2000,
              pointsBalance: 3000,
            })
          );

          act(() => {
            result.current.setPointsToPay(2000);
          });

          expect(result.current.ready2Purchase).toBe(true);
        });
      });
    });
  });
});
