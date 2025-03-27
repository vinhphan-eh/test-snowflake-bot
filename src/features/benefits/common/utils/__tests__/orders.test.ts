import { removeRedundantSpace, removeSpecialCharacters } from '../orders';

describe('orders', () => {
  describe('removeSpecialCharacters', () => {
    it.each`
      string                | formatString
      ${'mot-hai-ba'}       | ${'mot hai ba'}
      ${'bon_nam_sau'}      | ${'bon nam sau'}
      ${'bay.tam_chin'}     | ${'bay tam chin'}
      ${'bay.tam_chin-100'} | ${'bay tam chin 100'}
    `('works correctly when string is $string', ({ formatString, string }) => {
      expect(removeSpecialCharacters(string)).toBe(formatString);
    });
  });

  describe('removeRedundantSpace', () => {
    it.each`
      string                | formatString
      ${'mot   hai ba'}     | ${'mot hai ba'}
      ${'  bon  nam sau  '} | ${'bon nam sau'}
      ${''}                 | ${''}
    `('works correctly when string is $string', ({ formatString, string }) => {
      expect(removeRedundantSpace(string)).toBe(formatString);
    });
  });
});
