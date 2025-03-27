import type { Money, MoneyV2 } from '../../new-graphql/generated';
import { CurrencyType, Sign } from '../../new-graphql/generated';
import { Region, type SupportedRegionCode } from '../../providers/LocalisationProvider/constants';

export const getDefaultCurrency = (regionCode: SupportedRegionCode) => {
  switch (regionCode) {
    case Region.gb:
      return 'GBP';
    default:
      return 'AUD';
  }
};

export const getFloatAmountFromMoneyV2 = (money: MoneyV2): number => {
  const { sign, subUnits, units } = money;
  const subStr = subUnits.toString().padStart(2, '0');
  return parseFloat(`${sign === Sign.Negative ? '-' : ''}${units}.${subStr}`);
};

export const getMoneyV2FromFloatAmount = (amount: number, currency = CurrencyType.CurrencyTypeAud): MoneyV2 => {
  const sign = amount < 0 ? Sign.Negative : Sign.Positive;
  const [units, subUnits = '0'] = amount.toString().split('.');
  return {
    sign,
    subUnits: parseInt(subUnits.padEnd(2, '0'), 10),
    type: currency,
    units: parseInt(units, 10),
  };
};

export const getFloatAmountFromMoney = (money: Money): number => {
  const { subUnits, units } = money;

  const isNegativeAmount = (subUnits ?? 0) < 0 || (units ?? 0) < 0;

  let subUnitsString = '';
  if (subUnits) {
    subUnitsString = Math.abs(subUnits).toString();
    if (subUnitsString.length < 2) {
      subUnitsString = `0${subUnitsString}`;
    }
  }

  return parseFloat(`${isNegativeAmount ? '-' : ''}${Math.abs(units ?? 0)}.${subUnitsString ?? '0'}`);
};

export const getCurrencyFromCurrencyType = (currencyType: CurrencyType) => {
  switch (currencyType) {
    case CurrencyType.CurrencyTypeGbp:
      return 'GBP';
    default:
      return 'AUD';
  }
};

export const convertAmountToMoney = (amount: string): { units: number; subUnits: number } => {
  // FIXME: Assume this function is only for converting non-negative values only at this stage
  const [units, subUnits] = amount.split('.');

  return {
    units: parseInt(units, 10) || 0,
    subUnits: subUnits ? parseInt(subUnits.padEnd(2, '0'), 10) : 0,
  };
};
