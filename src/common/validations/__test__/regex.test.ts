import {
  addressRegex,
  alphaWordRegex,
  alphaWordSpacesRegex,
  bsbRegex,
  dateRegex,
  nonNegativeNumberRegex,
  houseNumberRegex,
  nameRegex,
  numericRegex,
  passportNumberRegex,
  stateRegex,
  suburbRegex,
  payReferenceRegex,
  ukPostcodeRegex,
} from '../regex';

describe('Regex validation', () => {
  describe('alphaWordRegex', () => {
    test('invalid value', () => {
      const regex = new RegExp(alphaWordRegex);
      expect(regex.test('abc123')).toBeFalsy();
    });
    test('valid true', () => {
      const regex = new RegExp(alphaWordRegex);
      expect(regex.test('abc')).toBeTruthy();
    });
  });

  describe('alphaWordSpacesRegex', () => {
    test('invalid value', () => {
      const regex = new RegExp(alphaWordSpacesRegex);
      expect(regex.test('abc!213')).toBeFalsy();
    });
    test('valid true', () => {
      const regex = new RegExp(alphaWordSpacesRegex);
      expect(regex.test('fake address')).toBeTruthy();
    });
  });

  describe('numericRegex', () => {
    test('invalid value', () => {
      const regex = new RegExp(numericRegex);
      expect(regex.test('123abc')).toBeFalsy();
    });
    test('valid true', () => {
      const regex = new RegExp(numericRegex);
      expect(regex.test('123')).toBeTruthy();
    });
  });

  describe('floatNumberRegex', () => {
    test('invalid value', () => {
      const regex = new RegExp(nonNegativeNumberRegex);
      expect(regex.test('123abc')).toBeFalsy();
      expect(regex.test('123.')).toBeFalsy();
      expect(regex.test('123.12.2')).toBeFalsy();
    });
    test('valid true', () => {
      const regex = new RegExp(nonNegativeNumberRegex);
      expect(regex.test('123')).toBeTruthy();
      expect(regex.test('123.12')).toBeTruthy();
    });
  });

  describe('houseNumberRegex', () => {
    test('invalid value', () => {
      const regex = new RegExp(houseNumberRegex);
      expect(regex.test('12/2 fake address!')).toBeFalsy();
    });
    test('valid true', () => {
      const regex = new RegExp(houseNumberRegex);
      expect(regex.test('12/2 fake address')).toBeTruthy();
    });
  });

  describe('passportNumberRegex', () => {
    test('invalid value without a alphanumeric letter at the start', () => {
      const regex = new RegExp(passportNumberRegex);
      expect(regex.test('090123213')).toBeFalsy();
    });
    test('invalid value without seven numeric letters followed by an alphanumeric letter', () => {
      const regex = new RegExp(passportNumberRegex);
      expect(regex.test('A0901')).toBeFalsy();
    });
    test('valid value with 2 alphanumeric letters at the start', () => {
      const regex = new RegExp(passportNumberRegex);
      expect(regex.test('AP1234567')).toBeTruthy();
    });
    test('valid value with 1 alphanumeric letter at the start', () => {
      const regex = new RegExp(passportNumberRegex);
      expect(regex.test('A1234567')).toBeTruthy();
    });
  });

  describe('stateRegex', () => {
    test('invalid value', () => {
      const regex = new RegExp(stateRegex);
      expect(regex.test('SAF')).toBeFalsy();
    });

    ['NSW', 'SA', 'VIC', 'QLD', 'WA', 'TAS', 'NT', 'ACT'].forEach((state: string) => {
      test('valid value', () => {
        const regex = new RegExp(stateRegex);
        expect(regex.test(state)).toBeTruthy();
      });
    });
  });

  describe('nameRegex', () => {
    test('invalid value', () => {
      const regex = new RegExp(nameRegex);

      expect(regex.test('abc123')).toBeFalsy();
      expect(regex.test('Hey*')).toBeFalsy();
    });
    test('valid true', () => {
      const regex = new RegExp(nameRegex);
      expect(regex.test('abc')).toBeTruthy();
      expect(regex.test('abc sdas')).toBeTruthy();
      expect(regex.test(`O'nelly`)).toBeTruthy();
      expect(regex.test(`O-dasdas`)).toBeTruthy();
    });
  });

  describe('payReferenceRegex', () => {
    test('invalid value', () => {
      const regex = new RegExp(payReferenceRegex);

      expect(regex.test('abc123!$%')).toBeFalsy();
      expect(regex.test('Hey*')).toBeFalsy();
      expect(regex.test(`O'nelly`)).toBeFalsy();
    });
    test('valid true', () => {
      const regex = new RegExp(payReferenceRegex);
      expect(regex.test('abc')).toBeTruthy();
      expect(regex.test('ABC sdas')).toBeTruthy();
      expect(regex.test('O9dasdas')).toBeTruthy();
    });
  });

  describe('addressRegex', () => {
    test('invalid value', () => {
      const regex = new RegExp(addressRegex);

      expect(regex.test('Hey*')).toBeFalsy();
    });
    test('valid true', () => {
      const regex = new RegExp(addressRegex);
      expect(regex.test('abc')).toBeTruthy();
      expect(regex.test('abc sdas')).toBeTruthy();
      expect(regex.test(`12/23 Australia`)).toBeTruthy();
      expect(regex.test(`12-23 Austrlia`)).toBeTruthy();
    });
  });

  describe('suburbRegex', () => {
    test('invalid value', () => {
      const regex = new RegExp(suburbRegex);

      expect(regex.test('Hey*')).toBeFalsy();
      expect(regex.test('Hey8899')).toBeFalsy();
    });
    test('valid true', () => {
      const regex = new RegExp(suburbRegex);
      expect(regex.test('abc')).toBeTruthy();
      expect(regex.test('abc sdas')).toBeTruthy();
      expect(regex.test(`Australia-Utah`)).toBeTruthy();
      expect(regex.test(`Austrlia/America`)).toBeTruthy();
    });
  });

  describe('dateRegex', () => {
    test('invalid value', () => {
      const regex = new RegExp(dateRegex);

      expect(regex.test('Invalid Date')).toBeFalsy();
    });
    test('valid true', () => {
      const regex = new RegExp(dateRegex);
      expect(regex.test('12/August/1997')).toBeTruthy();
    });
  });

  describe('bsbRegex', () => {
    it.each<string>(['1234567', 'abcdef', '123poi', '1234-567'])('invalid value', value => {
      const regex = new RegExp(bsbRegex);

      expect(regex.test(value)).toBeFalsy();
    });

    it.each<string>(['123456', '678986', '098-651'])('valid value', value => {
      const regex = new RegExp(bsbRegex);

      expect(regex.test(value)).toBeTruthy();
    });
  });

  describe('ukPostCodeRegex', () => {
    it.each<string>(['SW1A 2AA', 'EC1A 1BB', 'W1A 0AX', 'B33 8TH'])('valid value', value => {
      const regex = new RegExp(ukPostcodeRegex);

      expect(regex.test(value)).toBeTruthy();
    });

    it.each<string>(['1234567', 'B33 8TJ!', 'B33 8TJX', '1 1A'])('invalid value', value => {
      const regex = new RegExp(ukPostcodeRegex);

      expect(regex.test(value)).toBeFalsy();
    });
  });
});
