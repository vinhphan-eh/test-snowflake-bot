import { getValidCountryCodeForShaype, isAustralian } from '../countries';

describe('isAustralian', () => {
  test('should return true', () => {
    expect(isAustralian('AU')).toBe(true);
    expect(isAustralian('AUS')).toBe(true);
  });

  test('should return false', () => {
    expect(isAustralian('US')).toBe(false);
    expect(isAustralian('USA')).toBe(false);
  });
});

describe('getValidCountryCodeForShaype', () => {
  it.each`
    countryCode | expected
    ${'AU'}     | ${'AUS'}
    ${'GB'}     | ${'GB'}
    ${'US'}     | ${'US'}
  `('should return $expected for $countryCode', ({ countryCode, expected }) => {
    expect(getValidCountryCodeForShaype(countryCode)).toBe(expected);
  });
});
