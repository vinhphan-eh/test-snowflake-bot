import {
  createCurrencyFormatter,
  currencyStringToNumber,
  formatCardNumber,
  formatCurrency,
  formatCurrencyValue,
  formatNumberValue,
  formatPoints,
  formatToBSBValue,
  userInputToMachineNumber,
} from '../numbers';

describe('formatCurrency', () => {
  it('should work properly', () => {
    expect(formatCurrency(0)).toEqual('$0.00');
    expect(formatCurrency(0, 0)).toEqual('$0');
    expect(formatCurrency(1000)).toEqual('$1,000.00');
    expect(formatCurrency(1000000)).toEqual('$1,000,000.00');
    expect(formatCurrency(1000000, 0)).toEqual('$1,000,000');
  });
});

describe('formatNumberValue', () => {
  it.each<[string, string, number]>([
    ['12.336', '12.34', 2],
    ['12.332', '12.332', 3],
    ['12.332', '12.3', 1],
  ])('should round number', (rawValue, formattedValue, precision) => {
    expect(formatNumberValue({ rawValue, delimiter: ',', precision })).toEqual(formattedValue);
  });

  it.each<[string, string, number]>([
    ['12000', '12,000.00', 2],
    ['12123456', '12,123,456.00', 2],
    ['12.332', '12.33', 2],
  ])('should round number', (rawValue, formattedValue, precision) => {
    expect(formatNumberValue({ rawValue, delimiter: ',', precision })).toEqual(formattedValue);
  });
});

describe('formatCurrencyValue', () => {
  it.each<string>(['123aa', '123.223.3', '12,3,2.31'])('should return raw value if not valid number', rawValue => {
    expect(formatNumberValue({ rawValue, delimiter: ',', precision: 2 })).toEqual(rawValue);
  });

  it.each<[string, string, number]>([
    ['12.336', '12.34', 2],
    ['12.332', '12.332', 3],
    ['12.332', '12.3', 1],
  ])('should round number', (rawValue, formattedValue, precision) => {
    expect(formatNumberValue({ rawValue, delimiter: ',', precision })).toEqual(formattedValue);
  });

  it.each<[string, string, string]>([
    ['18231312.336', '18,231,312.34', ','],
    ['18231.332', '18-231.33', '-'],
    ['1298098.332', '1 298 098.33', ' '],
  ])('should insert delimiter', (rawValue, formattedValue, delimiter) => {
    expect(formatNumberValue({ rawValue, delimiter, precision: 2 })).toEqual(formattedValue);
  });

  it.each<[string, string, string]>([['18231312.336', '18,231,312.34', ',']])(
    'should insert default delimiter',
    (rawValue, formattedValue) => {
      expect(formatCurrencyValue(rawValue)).toEqual(formattedValue);
    }
  );
});

describe('formatToBSBValue', () => {
  it.each<[string, string]>([
    ['123456', '123-456'],
    ['878768', '878-768'],
  ])('should return correct value', (rawValue, precision) => {
    const formattedBSBValue = formatToBSBValue(rawValue);
    expect(formattedBSBValue).toBe(precision);
  });

  it.each<[string, string]>([
    ['1234567', '1234-567'],
    ['12345678', '12345-678'],
  ])('should return incorrect value', (rawValue, precision) => {
    const formattedBSBValue = formatToBSBValue(rawValue);
    expect(formattedBSBValue).toBe(precision);
  });
});

describe('formatCardNumber', () => {
  it.each<[string, string]>([
    ['1111222233334444', '1111 2222 3333 4444'],
    ['111122', '1111 22'],
  ])('should return correct value', (rawValue, precision) => {
    const formattedCardNumber = formatCardNumber(rawValue);
    expect(formattedCardNumber).toBe(precision);
  });
});

describe('currencyStringToNumber', () => {
  it.each<[string, number]>([
    ['1,000', 1000],
    ['1,000.25', 1000.25],
    ['1,000.255', 1000.255],
    ['100,000', 100000],
    ['1,000,000', 1000000],
    ['any thing not a number', 0],
  ])('should return correct value', (rawValue, precision) => {
    const formattedCardNumber = currencyStringToNumber(rawValue);
    expect(formattedCardNumber).toBe(precision);
  });
});

describe('useFormatCurrency', () => {
  it('should render as expected for default currency', async () => {
    const formatCurrencyWithSymbol = createCurrencyFormatter();

    expect(formatCurrencyWithSymbol(0)).toEqual('$0.00');
  });

  it('should render as expected when currency is defined', async () => {
    const formatCurrencyWithSymbol = createCurrencyFormatter();

    expect(
      formatCurrencyWithSymbol(0, {
        currency: 'GBP',
      })
    ).toEqual('£0.00');
  });

  it('should set precision to display to 2 by default', async () => {
    const formatCurrencyWithSymbol = createCurrencyFormatter();

    expect(formatCurrencyWithSymbol(1000)).toEqual('$1,000.00');
  });

  it('should render as expected when precision is set to 3', async () => {
    const formatCurrencyWithSymbol = createCurrencyFormatter();

    expect(
      formatCurrencyWithSymbol(1000000.25, {
        precision: 3,
      })
    ).toEqual('$1,000,000.250');
  });

  it('should render as expected when both precision and currency is defined', async () => {
    const formatCurrencyWithSymbol = createCurrencyFormatter();

    expect(
      formatCurrencyWithSymbol(1000000, {
        currency: 'GBP',
        precision: 0,
      })
    ).toEqual('£1,000,000');
  });
});

describe('formatPoints', () => {
  it.each<[number, string]>([
    [12000, '12,000 PTS'],
    [12123456, '12,123,456 PTS'],
    [12.22, '12 PTS'],
  ])('should format number with symbol', (rawValue, formattedValue) => {
    expect(formatPoints(rawValue, { includeSymbol: true })).toEqual(formattedValue);
  });

  it.each<[number, string]>([
    [12000, '12,000'],
    [12123456, '12,123,456'],
    [12.22, '12'],
  ])('should format number without symbol', (rawValue, formattedValue) => {
    expect(formatPoints(rawValue)).toEqual(formattedValue);
  });
});

describe('userInputToMachineNumber', () => {
  it.each<[string, string]>([
    ['1000.50', '1000.50'],
    ['1,000.50', '1000.50'],
    ['500,000.50', '500000.50'],
    ['10,000,000.50', '10000000.50'],
    ['10,000,000', '10000000'],
    ['12,32', '12.32'],
  ])('should return correct value', (rawValue, formattedValue) => {
    expect(userInputToMachineNumber({ inputValue: rawValue })).toEqual(formattedValue);
  });
});
