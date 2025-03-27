import {
  getDiscountPercentage,
  getSubTotalPrice,
  getTotalPrice,
  roundCreditCardFee,
  roundDown,
  roundNum,
  roundUp,
} from '../calculations';

describe('calculations', () => {
  describe('roundNum', () => {
    it('should return round number', () => {
      expect(roundNum(1.235)).toEqual(1.24);
      expect(roundNum(1.234)).toEqual(1.23);
      // classic case js return 1.00 if use Math.round due to
      // the way that the computer represents decimal numbers in binary.
      expect(roundNum(1.005)).toEqual(1.01);
      expect(roundNum(1.504999999999)).toEqual(1.5);
    });
    it('should return number', () => {
      expect(typeof roundNum(1.235)).toEqual('number');
    });
  });

  describe('roundUp', () => {
    it('should return round up number', () => {
      expect(roundUp(1.235)).toEqual(1.24);
      expect(roundUp(1.234)).toEqual(1.24);
      expect(roundUp(1.005)).toEqual(1.01);
      expect(roundUp(1.504999999999)).toEqual(1.51);
    });
    it('should return number', () => {
      expect(typeof roundUp(1.235)).toEqual('number');
    });
  });

  describe('roundDown', () => {
    it('should return round down number', () => {
      expect(roundDown(1.01)).toEqual(1.01);
      expect(roundDown(1.235)).toEqual(1.23);
      expect(roundDown(1.234)).toEqual(1.23);
      expect(roundDown(1.015)).toEqual(1.01);
      expect(roundDown(1.524999999999)).toEqual(1.52);
    });
    it('should return number', () => {
      expect(typeof roundDown(1.235)).toEqual('number');
    });
  });

  describe('roundCreditCardFee', () => {
    it('should return round number', () => {
      expect(roundCreditCardFee(1.239)).toEqual(1.23);
    });
    it('should return number', () => {
      expect(typeof roundNum(1.235)).toEqual('number');
    });
  });

  describe('getSubTotalPrice', () => {
    it('should return round number', () => {
      expect(getSubTotalPrice(100, 2, 50)).toEqual(100 * 2 + 50);
    });
    it('should return number', () => {
      expect(typeof getSubTotalPrice(100, 2, 50)).toEqual('number');
    });
  });

  describe('getTotalPrice', () => {
    it('should return round number', () => {
      expect(getTotalPrice(100, 0.99, 50)).toEqual(100.49);
    });
    it('should return number', () => {
      expect(typeof getTotalPrice(250, 1, 10)).toEqual('number');
    });
  });

  describe('getDiscountPercent', () => {
    it('should return discount percent', () => {
      expect(getDiscountPercentage(100, 50)).toEqual(50);
    });
    it('should round down discount percent', () => {
      expect(getDiscountPercentage(100, 95.5)).toEqual(4);
    });
  });
});
