import { CurrencyType } from '../../../new-graphql/generated';
import { Money } from '../money';

describe('Money Class', () => {
  it('should initialize with values when given valid input', () => {
    const value = {
      __typename: 'Money',
      units: 100,
      subUnits: 50,
      type: CurrencyType.CurrencyTypeGbp,
    } as const;
    const money = new Money(value);

    expect(money.units).toBe(value.units);
    expect(money.subUnits).toBe(value.subUnits);
    expect(money.type).toBe(value.type);
  });

  it('formats the money value with the correct currency symbol', () => {
    const value = {
      __typename: 'Money',
      units: 1000,
      subUnits: 0,
      type: CurrencyType.CurrencyTypeAud,
    } as const;

    expect(new Money(value).formatWithCurrency()).toBe('$1,000.00');
  });

  it('can convert back to float (to use in old logic)', () => {
    const value = {
      __typename: 'Money',
      units: 100,
      subUnits: 42,
      type: CurrencyType.CurrencyTypeAud,
    } as const;
    expect(new Money(value).toFloat()).toEqual(100.42);
  });
});
