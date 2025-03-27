import { mapTransactionDescription, mapTransactionDetail, mapTransactionTitle } from '../transaction';

describe('transaction helper', () => {
  describe('mapTransactionTitle', () => {
    it('should override title when transaction name is from PokitPal', () => {
      expect(mapTransactionTitle('POKITPAL PTY LIM')).toBe('Cashback');
      expect(mapTransactionTitle('Pokitpal Pty Ltd')).toBe('Cashback');
      expect(mapTransactionTitle('anything relate to Pokitpal')).toBe('Cashback');
    });
  });

  describe('mapTransactionDetail', () => {
    it('should override detail when transaction name is from PokitPal', () => {
      expect(mapTransactionDetail('POKITPAL PTY LIM')).toBe('Swag Cashback Program');
      expect(mapTransactionDetail('Pokitpal Pty Ltd')).toBe('Swag Cashback Program');
      expect(mapTransactionDetail('anything relate to Pokitpal')).toBe('Swag Cashback Program');
    });

    it('should be possible to use custom brand name', () => {
      expect(mapTransactionDetail('POKITPAL PTY LIM', 'Employment Hero')).toBe('Employment Hero Cashback Program');
    });

    it('should return transaction name when it is not from PokitPal', () => {
      expect(mapTransactionDetail('PTY LIM', 'Employment Hero')).toBe('PTY LIM');
      expect(mapTransactionDetail('PTY LIM')).toBe('PTY LIM');
    });
  });

  describe('mapTransactionDescription', () => {
    it('should override description when it is from PokitPal', () => {
      expect(mapTransactionDescription('POKITPAL PTY LIM')).toBe('Cashback');
      expect(mapTransactionDescription('Pokitpal Pty Ltd')).toBe('Cashback');
      expect(mapTransactionDescription('anything relate to Pokitpal')).toBe('Cashback');
    });
  });
});
