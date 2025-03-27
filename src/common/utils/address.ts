import type { ResidentialAddress } from '../../features/onboarding/stores/useOnboardingStore';
import type { Address, UniversalAddressInput, UserInitializationDetailAddress } from '../../new-graphql/generated';

const stringWithSpace = (text: string | undefined | null, extra = ' ') => `${text ? `${text}${extra}` : ''}`;

export const formatAddressDisplay = (address: Address | undefined | null) => {
  if (address) {
    const { longForm, postcode, region, townOrCity } = address;
    const addressLine1 = longForm?.trim();

    return `${addressLine1 ? stringWithSpace(addressLine1, ', ') : ''}${stringWithSpace(townOrCity)}${stringWithSpace(
      region
    )}${stringWithSpace(postcode, '')}`;
  }

  return '';
};

export const formatUKAddressDisplay = (address: UniversalAddressInput | undefined | null) => {
  if (address) {
    const { addressLine2, postcode, state, townOrCity } = address;
    const addressLine1 = address.addressLine1?.trim();

    return `${addressLine1 ? stringWithSpace(addressLine1, ', ') : ''}${stringWithSpace(
      addressLine2,
      ', '
    )}${stringWithSpace(townOrCity)}${stringWithSpace(state)}${stringWithSpace(postcode, '')}`;
  }

  return '';
};

export const formatAddressDisplayV2 = (address: Address | undefined | null) => {
  if (address) {
    const { postcode, region, streetName, streetNumber, streetType, townOrCity, unitNumber } = address;
    return `${stringWithSpace(unitNumber, '/')}${stringWithSpace(streetNumber)}${stringWithSpace(
      streetName
    )}${stringWithSpace(streetType, ', ')}${stringWithSpace(townOrCity)}${stringWithSpace(region)}${stringWithSpace(
      postcode,
      ''
    )}`;
  }

  return '';
};

/**
 * parse one line address to structured address
 * return undefined if can't parse
 */
export const getStructuredAddress = (
  address: UserInitializationDetailAddress | undefined | null
): ResidentialAddress | undefined => {
  if (!address) {
    return undefined;
  }

  const { addressLine1, country, postcode, region, townOrCity } = address;
  if (!addressLine1 || !postcode || !region || !townOrCity || !country) {
    return undefined;
  }

  const regex =
    /(\d+[A-Z]?).*?((?:[A-Z](?:[A-Z]|[^\S\r\n])+)).*?((?:COURT|CT|PARADE|STREET|ST|DRIVE|DR|LANE|LN|ROAD|RD|BLVD|CIR|TRL|TRAIL|CROSSING|XING|PL|PLACE|AVE|CV|COVE|TRCE|TRACE|MNR|WAY|LOOP|BND|BEND|LNDG|LANDING|PATH|PKWY|PARKWAY|PASS|RDG|RIDGE|VW|TERRACE|TCE|AVENUE|MEWS|ARCADE|GROVE|GVR|HWY)).*?((?:UNT|#)[^\S\r\n]?\w|\w.*)?$|(\d+).*?((?:[A-Z](?:[A-Z]|[^\S\r\n])+))$/;
  const input = addressLine1.trim().toUpperCase();
  const separatedCompsBySlash = input.split('/');
  const separatedCompsByComma = input.split(',');
  let addressStringWithoutUnit = input;
  let unitNumber = '';

  if (separatedCompsBySlash.length > 1) {
    [unitNumber, addressStringWithoutUnit] = separatedCompsBySlash;
  }

  if (separatedCompsByComma.length > 1) {
    [unitNumber, addressStringWithoutUnit] = separatedCompsByComma;
  }

  const match = regex.exec(addressStringWithoutUnit);
  if (!match || match.length < 3) {
    return undefined;
  }

  /* eslint-disable @typescript-eslint/naming-convention */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, streetNumber, streetName, streetType] = match;
  if (!streetNumber || !streetName || !streetType) {
    return undefined;
  }

  return {
    postcode,
    region,
    townOrCity,
    country,
    streetNumber: streetNumber.trim(),
    streetName: streetName.trim() || input,
    streetType: streetType.trim(),
    unitNumber: unitNumber.trim(),
    longForm: addressLine1,
  };
};
