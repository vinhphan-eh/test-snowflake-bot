// https://stackoverflow.com/a/19722641
export const roundNum = (num: number, decimalNum = 2): number =>
  +`${Math.round(Number(`${num}e+${decimalNum}`))}e-${decimalNum}`;

export const roundDown = (num: number, decimalNum = 2): number =>
  +`${Math.floor(Number(`${num}e+${decimalNum}`))}e-${decimalNum}`;

export const roundUp = (num: number, decimalNum = 2): number =>
  +`${Math.ceil(Number(`${num}e+${decimalNum}`))}e-${decimalNum}`;

// follow super app, with Braintree fee, we compute numbers rounded down.
export const roundCreditCardFee = (creditCardAmount: number) => Math.floor(creditCardAmount * 100) / 100;

export const getSubTotalPrice = (discountPrice: number, qty: number, freightPrice: number) =>
  discountPrice * qty + freightPrice;

export const getTotalPrice = (subTotalPrice: number, creditCardFee: number, creditCardAmount: number) =>
  roundNum(subTotalPrice + roundCreditCardFee((creditCardAmount * creditCardFee) / 100));

export const formatCreditCardFee = (creditCardFee: number) => {
  // This is a temporary workaround while `Intl.NumberFormat` locale is not working with core app
  // Reason for this may be related to redux-intl which core app is using
  const rounded = String(roundCreditCardFee(creditCardFee).toFixed(2)).replace(/\d(?=(\d{3})+\.)/g, '$&,'); // 12,345.67
  return `$${rounded}`; // $12,345.67
};

export const getDiscountPercentage = (price: number, discountPrice: number) => {
  const discountPercentage = ((price - discountPrice) / price) * 100;
  return roundDown(discountPercentage, 0);
};
