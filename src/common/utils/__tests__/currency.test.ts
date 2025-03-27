import { CurrencyType, type MoneyV2, Sign } from '../../../new-graphql/generated';
import type { SupportedRegionCode } from '../../../providers/LocalisationProvider/constants';
import { Region } from '../../../providers/LocalisationProvider/constants';
import {
  convertAmountToMoney,
  getCurrencyFromCurrencyType,
  getDefaultCurrency,
  getFloatAmountFromMoney,
  getFloatAmountFromMoneyV2,
} from '../currency';

describe('should get default currency properly', () => {
  it.each([
    { region: Region.au, currency: 'AUD' },
    { region: Region.gb, currency: 'GBP' },
  ])('for $region users', ({ currency, region }) => {
    expect(getDefaultCurrency(region as SupportedRegionCode)).toBe(currency);
  });
});

describe('should get currency from currency type properly', () => {
  it.each([
    { currencyType: CurrencyType.CurrencyTypeAud, currency: 'AUD' },
    { currencyType: CurrencyType.CurrencyTypeGbp, currency: 'GBP' },
    { currencyType: CurrencyType.CurrencyTypeUnspecified, currency: 'AUD' },
  ])('for $currencyType users', ({ currency, currencyType }) => {
    expect(getCurrencyFromCurrencyType(currencyType)).toBe(currency);
  });
});

describe('should get float amount from money properly', () => {
  it('full positive value', () => {
    expect(
      getFloatAmountFromMoney({
        units: 1,
        subUnits: 26,
        type: CurrencyType.CurrencyTypeAud,
      })
    ).toBe(1.26);
  });

  it('full negative value', () => {
    expect(
      getFloatAmountFromMoney({
        units: -12,
        subUnits: 68,
        type: CurrencyType.CurrencyTypeAud,
      })
    ).toBe(-12.68);
  });

  it('one digit decimal', () => {
    expect(
      getFloatAmountFromMoney({
        units: -1,
        subUnits: 1,
        type: CurrencyType.CurrencyTypeGbp,
      })
    ).toBe(-1.01);
  });

  it('transfer out of less than 1 currency unit', () => {
    expect(
      getFloatAmountFromMoney({
        units: 0,
        subUnits: -25,
        type: CurrencyType.CurrencyTypeGbp,
      })
    ).toBe(-0.25);
  });

  it('transfer in of less than 1 currency unit', () => {
    expect(
      getFloatAmountFromMoney({
        units: 0,
        subUnits: 5,
        type: CurrencyType.CurrencyTypeGbp,
      })
    ).toBe(0.05);
  });

  it('undefined subUnits', () => {
    expect(
      getFloatAmountFromMoney({
        units: -1,
        subUnits: undefined,
        type: CurrencyType.CurrencyTypeGbp,
      })
    ).toBe(-1);
  });

  it('integral only positive value', () => {
    expect(
      getFloatAmountFromMoney({
        units: 25,
        subUnits: 0,
        type: CurrencyType.CurrencyTypeAud,
      })
    ).toBe(25);
  });

  it('integral only negative value', () => {
    expect(
      getFloatAmountFromMoney({
        units: -3,
        subUnits: 0,
        type: CurrencyType.CurrencyTypeAud,
      })
    ).toBe(-3);
  });

  it('undefined data', () => {
    expect(getFloatAmountFromMoney({})).toBe(0);
  });
});

describe('getFloatAmountFromMoneyV2', () => {
  it('should correctly convert positive money values', () => {
    const money: MoneyV2 = {
      sign: Sign.Positive,
      subUnits: 50,
      units: 100,
      type: CurrencyType.CurrencyTypeUnspecified,
    };
    expect(getFloatAmountFromMoneyV2(money)).toBe(100.5);
  });

  it('should correctly convert negative money values', () => {
    const money: MoneyV2 = {
      sign: Sign.Negative,
      subUnits: 75,
      units: 200,
      type: CurrencyType.CurrencyTypeUnspecified,
    };
    expect(getFloatAmountFromMoneyV2(money)).toBe(-200.75);
  });

  it('should handle zero subUnits correctly', () => {
    const money: MoneyV2 = {
      sign: Sign.Positive,
      subUnits: 0,
      units: 500,
      type: CurrencyType.CurrencyTypeUnspecified,
    };
    expect(getFloatAmountFromMoneyV2(money)).toBe(500.0);
  });

  it('should handle small subUnits correctly', () => {
    const money: MoneyV2 = {
      sign: Sign.Positive,
      subUnits: 1,
      units: 500,
      type: CurrencyType.CurrencyTypeUnspecified,
    };
    expect(getFloatAmountFromMoneyV2(money)).toBe(500.01);
  });
});

describe('should convert string form of amount to money type properly', () => {
  it('full string', () => {
    expect(convertAmountToMoney('1.35')).toStrictEqual({
      units: 1,
      subUnits: 35,
    });
  });

  it('decimal part of one digit only', () => {
    expect(convertAmountToMoney('2.08')).toStrictEqual({
      units: 2,
      subUnits: 8,
    });
  });
});
