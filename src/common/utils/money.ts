/**
 * This is a rough attempt to unify scattered money processing logic around the code base.
 * Expect changing a lot for now.
 */

import {
  CurrencyType,
  type Money as GraphQLMoney,
  type MoneyV2 as GraphQLMoneyV2,
  Sign,
} from '../../new-graphql/generated';

export const isGraphQLMoneyV2 = (value: unknown): value is GraphQLMoneyV2 => {
  // eslint-disable-next-line no-underscore-dangle
  return !!value && (value as GraphQLMoneyV2).__typename === 'MoneyV2';
};

export class Money {
  CURRENCY_MAPPING = {
    [CurrencyType.CurrencyTypeUnspecified]: '$',
    [CurrencyType.CurrencyTypeAud]: '$',
    [CurrencyType.CurrencyTypeGbp]: '£',
    // POINTS: 'PTS', // currently not implemented
  } as const;

  DEFAULT_PRECISION = 2;

  units = 0;

  subUnits = 0;

  type = CurrencyType.CurrencyTypeUnspecified;

  sign: '+' | '-' = '+';

  /**
   * Currently support convert from these types:
   * - GraphQLMoney
   */
  constructor(value: GraphQLMoney | GraphQLMoneyV2) {
    if (isGraphQLMoneyV2(value)) {
      this.sign = value.sign === Sign.Positive ? '+' : '-';
    }
    this.units = value.units || 0;
    this.subUnits = value.subUnits || 0;
    this.type = value.type || CurrencyType.CurrencyTypeUnspecified;
  }

  /**
   * Format this to a humanized string with currency sign
   */
  formatWithCurrency() {
    const symbol = this.CURRENCY_MAPPING[this.type];
    const precision = this.DEFAULT_PRECISION;
    const value = this.units;
    const rounded = value.toFixed(precision).replace(/\d(?=(\d{3})+(\.|$))/g, '$&,');
    return `${symbol ?? '$'}${rounded}`;
  }

  /**
   * Convert back to float value to use in old components
   */
  toFloat() {
    return this.units + this.subUnits / 100;
  }

  static fromFloat(value: number, currency: CurrencyType) {
    const money = {
      type: currency,
      units: Math.floor(value),
      subUnits: Math.floor((value - Math.floor(value)) * 100),
    };
    return money;
  }
}
