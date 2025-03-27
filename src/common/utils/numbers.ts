import uuid from 'react-native-uuid';

const DEFAULT_PRECISION = 2;

export const FALLBACK_CURRENCY = 'AUD';
export const CURRENCY_MAPPING = {
  AUD: '$',
  USD: '$',
  GBP: '£',
  NZD: '$',
  SGD: '$',
  POINTS: 'PTS',
  RM: 'RM',
} as const;

export type SupportedCurrency = keyof typeof CURRENCY_MAPPING;

export const decimalSeparatorRegex = /[\\,\\.]/g;

/**
 * @param num raw money value
 */
export const formatCurrency = (num: number, precision?: number, symbol?: string) => {
  // This is a temporary workaround while `Intl.NumberFormat` locale is not working with core app
  // Reason for this may be related to redux-intl which core app is using
  const localPrecision = precision ?? DEFAULT_PRECISION;

  const rounded = num.toFixed(localPrecision).replace(/\d(?=(\d{3})+(\.|$))/g, '$&,'); // 12,345.67 | 12,345 (if precision 0)
  return `${symbol ?? '$'}${rounded}`; // 12,345.67
};

/**
 *
 * @param data.delimiter: is for thousand format
 * @returns
 */
export const formatNumberValue = (data: { rawValue: string | number; delimiter: string; precision: number }) => {
  const number = Number(data.rawValue);
  if (Number.isNaN(number)) {
    return data.rawValue.toString();
  }

  const formatNumber = number.toFixed(data.precision);

  const [intPart, floatPart] = formatNumber.split('.');

  const intPartBigNumberFormat = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, data.delimiter);

  return `${intPartBigNumberFormat}${floatPart ? `.${floatPart}` : ''}`;
};

export const formatPoints = (num: number, { includeSymbol }: { includeSymbol?: boolean } = {}) => {
  const formatted = formatNumberValue({ rawValue: num, delimiter: ',', precision: 0 });
  return includeSymbol ? `${formatted} ${CURRENCY_MAPPING.POINTS}` : formatted;
};

export const createCurrencyFormatter = () => {
  return (num: number, { currency, precision }: { currency?: SupportedCurrency; precision?: number } = {}) => {
    const symbol = CURRENCY_MAPPING[currency ?? FALLBACK_CURRENCY];

    if (currency === 'POINTS') {
      return formatPoints(num, { includeSymbol: true });
    }

    return formatCurrency(num ?? 0, precision, symbol);
  };
};

export const getCurrencySymbol = (currency: SupportedCurrency) => {
  return CURRENCY_MAPPING[currency];
};

export const formatCurrencyValue = (rawValue: string | number, delimiter = ',', precision = 2) => {
  return formatNumberValue({ rawValue, delimiter, precision });
};

export const formatToBSBValue = (rawValue: string) => {
  return rawValue.replace(/\B(?=(\d{3}){1}(?!\d))/g, '-');
};

export const formatToSortCodeValue = (rawValue: string) => {
  return rawValue.replace(/\B(?=(\d{2})+(?!\d))/g, '-');
};

export const generateUUID = () => uuid.v4() as string;

export const formatCardNumber = (text: string) => {
  const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
  const onlyNumbers = text.replace(/\s/g, '');
  return onlyNumbers.replace(regex, (_, firstGroup, secondGroup, thirdGroup, fourthGroup) => {
    return [firstGroup, secondGroup, thirdGroup, fourthGroup].filter(group => !!group).join(' ');
  });
};

export const currencyStringToNumber = (currency: string): number => {
  if (!currency) {
    return 0;
  }
  const currencyCleanDelimiter = currency.replace(/,/g, '');
  return Number(currencyCleanDelimiter) || 0;
};

// JS best to understand "." formart, so convert to "." format,  EX: 12,32 => 12.32 or 12.32 => 12.32
// "," format return wrong value, EX: Number(“12,2") => NaN and parseFloat(“12,2") => 12
export const userInputToMachineNumber = (data: { inputValue: string }) => {
  // Remove comma in currency format first
  // EX: 123,213.55 => 123213.55
  let formattedInput = data.inputValue.replace(/,(?=\d{3})/g, '');
  formattedInput = formattedInput.replace(/[\\,\\.]/g, '.');

  return formattedInput;
};

// format back to machine number then turn the decimal back to which user types in
// EX: 123,213,123.55 => 123213123.55 => then replace decimal user typed to "."
export const convertToRawValue = (data: { formattedValue: string; decimal: string; delimiter: string }) => {
  const machineNum = data.formattedValue.replace(data.delimiter, '');
  if (data.decimal) {
    return machineNum.replace(decimalSeparatorRegex, data.decimal);
  }
  return machineNum;
};
