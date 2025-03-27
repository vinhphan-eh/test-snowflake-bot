import type { Address } from '../../../new-graphql/generated';
import { formatAddressDisplay, formatAddressDisplayV2, getStructuredAddress } from '../address';

const data: Address = {
  longForm: 'address 1',
  postcode: '1234',
  region: 'SA',
  townOrCity: 'Saigon',
  country: '',
};

const dataWithNoSecondAddress: Address = {
  longForm: 'address 1',
  postcode: '1234',
  region: 'SA',
  townOrCity: 'Saigon',
  country: '',
};

const dataWithNullSecondAddress: Address = {
  longForm: 'address 1',
  postcode: '1234',
  region: 'SA',
  townOrCity: 'Saigon',
  country: '',
};

const addressWithoutUnitNumber: Address = {
  streetNumber: '123',
  streetName: 'street name',
  streetType: 'street type',
  townOrCity: 'HCM',
  region: 'SA',
  postcode: '1234',
  country: 'Vietnam',
  longForm: '123 street name street type',
};

const addressWithUnitNumber: Address = {
  unitNumber: '123',
  streetNumber: '456',
  streetName: 'street name',
  streetType: 'street type',
  townOrCity: 'HCM',
  region: 'SA',
  postcode: '1234',
  country: 'Vietnam',
  longForm: '123/456 street name street type',
};

describe('formatAddressDisplay', () => {
  it('should work properly', () => {
    expect(formatAddressDisplay(data)).toEqual('address 1, Saigon SA 1234');
    expect(formatAddressDisplay(dataWithNoSecondAddress)).toEqual('address 1, Saigon SA 1234');
    expect(formatAddressDisplay(dataWithNullSecondAddress)).toEqual('address 1, Saigon SA 1234');
  });
});

describe('formatAddressDisplayV2', () => {
  test('should work correctly', () => {
    expect(formatAddressDisplayV2(null)).toEqual('');
    expect(formatAddressDisplayV2(addressWithUnitNumber)).toEqual('123/456 street name street type, HCM SA 1234');
    expect(formatAddressDisplayV2(addressWithoutUnitNumber)).toEqual('123 street name street type, HCM SA 1234');
  });
});

describe('getStructuredAddress', () => {
  it('returns undefined for undefined input', () => {
    expect(getStructuredAddress(undefined)).toBeUndefined();
  });

  it('returns undefined for null input', () => {
    expect(getStructuredAddress(null)).toBeUndefined();
  });

  it('returns undefined for incomplete input', () => {
    const incompleteAddress = {
      addressLine1: '123 Main St',
      postcode: '12345',
      region: 'CA',
      townOrCity: 'Los Angeles',
      country: '',
    };

    expect(getStructuredAddress(incompleteAddress)).toBeUndefined();
  });

  it('returns structured address for valid input', () => {
    const validAddress = {
      addressLine1: '123 Main St',
      postcode: '12345',
      region: 'CA',
      townOrCity: 'Los Angeles',
      country: 'USA',
    };

    expect(getStructuredAddress(validAddress)).toEqual({
      postcode: '12345',
      region: 'CA',
      townOrCity: 'Los Angeles',
      country: 'USA',
      streetNumber: '123',
      streetName: 'MAIN',
      streetType: 'ST',
      unitNumber: '',
      longForm: '123 Main St',
    });
  });
});
