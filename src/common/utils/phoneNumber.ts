export const joinPhoneNumberParts = (phoneNumber: string, regionalCode: string): string => {
  // remove leading zero
  const number = phoneNumber.replace(/^0+/, '');

  return `${regionalCode}${number}`;
};
