import { type MoneyV2 } from '../new-graphql/generated';

export const getRandomInt = (minimum: number, maximum: number) => {
  return Math.floor(Math.random() * (maximum - minimum)) + minimum;
};

export const getRandomIntDigit = (digit = 11, countryCode: 'AU' | 'UK' = 'AU') => {
  const START_PHONE_NUMBER = {
    AU: '4',
    UK: '7',
  };

  return Math.floor(
    Number(
      Math.random()
        .toString()
        .slice(3, digit + 2)
        .padStart(digit, START_PHONE_NUMBER[countryCode])
    )
  );
};

export const randomAlphaString = (stringLength: number) => {
  const tmpArr = new Array(stringLength).fill(undefined);

  return tmpArr.map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');
};

export const buildDeeplink = (appDeepPath: string) => {
  return `https://mobile.staging.ehrocks.com/platform_redirect?web_url=https://mobile.staging.ehrocks.com/products/benefit/&app_deep_path=${appDeepPath}`;
};

export const nativeTextViewType = () => {
  return device.getPlatform() === 'android' ? 'android.widget.TextView' : 'RCTTextView';
};

enum Sign {
  Negative = 'NEGATIVE',
  Positive = 'POSITIVE',
}

export const getFloatAmountFromMoneyV2 = (money: MoneyV2): number => {
  const { sign, subUnits, units } = money;
  const subStr = subUnits.toString().padStart(2, '0');
  return parseFloat(`${sign === Sign.Negative ? '-' : ''}${units}.${subStr}`);
};
