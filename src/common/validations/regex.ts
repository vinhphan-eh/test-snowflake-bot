export const alphaWordRegex = /^[A-Za-z]+$/;

export const alphaWordSpacesRegex = /^[A-Za-z _]*[A-Za-z][A-Za-z _]*$/;

export const numericRegex = /^[0-9]*$/;

export const nonNegativeNumberRegex = /^\d+(\.\d+)?$/;

export const houseNumberRegex = /^[A-Za-z0-9-/ _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;

export const passportNumberRegex = /[A-Z]{1,2}\d{7}$/;

export const stateRegex = /^(NSW|VIC|QLD|SA|WA|TAS|NT|ACT|ENG|NIR|SCT|WLS)$/;

export const alphaNumericRegex = /^\w+$/;

// problem with the apostrophe characters "U+0027" and the single quote character "U+2019" used by the ios simulator as apostrophe.
export const nameRegex = /^[a-zA-Z-\u0027\u2019\s]+$/;

export const payReferenceRegex = /^[a-zA-Z0-9\s]+$/;

export const countryCodeRegex = /[a-zA-Z\s(\\+0-9)]+$/;

export const addressRegex = /^[0-9a-zA-Z-\\/\s/,]+$/;
export const suburbRegex = /^[a-zA-Z-\\/\s]+$/;

export const dateRegex = /^(?!.*Invalid Date)/;

export const bsbRegex = /^[0-9]{3}-{0,1}[0-9]{3}$/;

// this regex is used to get street type from address ... e.g. street, road, avenue, etc.
export const streetType =
  /(COURT|CT|STREET|ST|DRIVE|DR|LANE|LN|ROAD|RD|BLVD|CIR|TRL|TRAIL|CROSSING|XING|PL|PLACE|AVE|CV|COVE|TRCE|TRACE|MNR|WAY|LOOP|BND|BEND|LNDG|LANDING|PATH|PKWY|PARKWAY|PASS|RDG|RIDGE|VW|PARADE|CLOSE|CL|PLAZA|PIZA|FREEWAY|FWY|APPROACH|APP|CONCOURSE|CON|CRESENT|CR|CREST|CRST|GLADE|GLDE|GRANGE|GRA|PASSAGE|PSGE|ENTRANCE|ENT|CHASE|CH|CIRCUIT|CCT|ESPLANADE|ESP|TURN|CRES|ST.)$/;

export const ukPostcodeRegex = /^[A-Za-z]{1,2}\d{1,2}[A-Za-z]?\s\d[A-Za-z]{2}$/;

export const ukSortCodeRegex = /^\d{6}$/;

export const auMobileNumberRegex = /^(04\d{8,}|4\d{8,})$/;

export const ukMobileNumberRegex = /^(07\d{9,}|7\d{9,})$/;
