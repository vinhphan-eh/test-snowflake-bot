export type CountryType = {
  code: string;
  name: string;
};

export const AUSTRALIA_COUNTRY_CODE = 'AUS';
export const AUSTRALIA_ISO_ALPHA2_COUNTRY_CODE = 'AU';
export const UNITED_KINGDOM_COUNTRY_CODE = 'GBR';
export const UNITED_KINGDOM_ISO_ALPHA2_COUNTRY_CODE = 'GB';
export const NEW_ZEALAND_COUNTRY_CODE = 'NZL';
export const NEW_ZEALAND_ISO_ALPHA2_COUNTRY_CODE = 'NZ';
export const WORKZONE_UK_REGION = 'en-GB';
export const WORKZONE_AU_REGION = 'en-AU';
export const WORKZONE_NZ_REGION = 'en-NZ';

type CountryCode = {
  code: string;
  name: string;
  dial_code: string;
};

export const COUNTRIES: CountryType[] = [
  {
    code: 'AUS',
    name: 'Australia',
  },
  {
    code: 'AFG',
    name: 'Afghanistan',
  },
  {
    code: 'ALA',
    name: 'Åland Islands',
  },
  {
    code: 'ALB',
    name: 'Albania',
  },
  {
    code: 'DZA',
    name: 'Algeria',
  },
  {
    code: 'ASM',
    name: 'American Samoa',
  },
  {
    code: 'AND',
    name: 'Andorra',
  },
  {
    code: 'AGO',
    name: 'Angola',
  },
  {
    code: 'AIA',
    name: 'Anguilla',
  },
  {
    code: 'ATA',
    name: 'Antarctica',
  },
  {
    code: 'ATG',
    name: 'Antigua and Barbuda',
  },
  {
    code: 'ARG',
    name: 'Argentina',
  },
  {
    code: 'ARM',
    name: 'Armenia',
  },
  {
    code: 'ABW',
    name: 'Aruba',
  },
  {
    code: 'AUT',
    name: 'Austria',
  },
  {
    code: 'AZE',
    name: 'Azerbaijan',
  },
  {
    code: 'BHS',
    name: 'Bahamas',
  },
  {
    code: 'BHR',
    name: 'Bahrain',
  },
  {
    code: 'BGD',
    name: 'Bangladesh',
  },
  {
    code: 'BRB',
    name: 'Barbados',
  },
  {
    code: 'BLR',
    name: 'Belarus',
  },
  {
    code: 'BEL',
    name: 'Belgium',
  },
  {
    code: 'BLZ',
    name: 'Belize',
  },
  {
    code: 'BEN',
    name: 'Benin',
  },
  {
    code: 'BMU',
    name: 'Bermuda',
  },
  {
    code: 'BTN',
    name: 'Bhutan',
  },
  {
    code: 'BOL',
    name: 'Bolivia, Plurinational State of',
  },
  {
    code: 'BES',
    name: 'Bonaire, Sint Eustatius and Saba',
  },
  {
    code: 'BIH',
    name: 'Bosnia and Herzegovina',
  },
  {
    code: 'BWA',
    name: 'Botswana',
  },
  {
    code: 'BVT',
    name: 'Bouvet Island',
  },
  {
    code: 'BRA',
    name: 'Brazil',
  },
  {
    code: 'IOT',
    name: 'British Indian Ocean Territory',
  },
  {
    code: 'BRN',
    name: 'Brunei Darussalam',
  },
  {
    code: 'BGR',
    name: 'Bulgaria',
  },
  {
    code: 'BFA',
    name: 'Burkina Faso',
  },
  {
    code: 'BDI',
    name: 'Burundi',
  },
  {
    code: 'KHM',
    name: 'Cambodia',
  },
  {
    code: 'CMR',
    name: 'Cameroon',
  },
  {
    code: 'CAN',
    name: 'Canada',
  },
  {
    code: 'CPV',
    name: 'Cape Verde',
  },
  {
    code: 'CYM',
    name: 'Cayman Islands',
  },
  {
    code: 'CAF',
    name: 'Central African Republic',
  },
  {
    code: 'TCD',
    name: 'Chad',
  },
  {
    code: 'CHL',
    name: 'Chile',
  },
  {
    code: 'CHN',
    name: 'China',
  },
  {
    code: 'CXR',
    name: 'Christmas Island',
  },
  {
    code: 'CCK',
    name: 'Cocos (Keeling) Islands',
  },
  {
    code: 'COL',
    name: 'Colombia',
  },
  {
    code: 'COM',
    name: 'Comoros',
  },
  {
    code: 'COG',
    name: 'Congo',
  },
  {
    code: 'COD',
    name: 'Congo, the Democratic Republic of the',
  },
  {
    code: 'COK',
    name: 'Cook Islands',
  },
  {
    code: 'CRI',
    name: 'Costa Rica',
  },
  {
    code: 'CIV',
    name: "Côte d'Ivoire",
  },
  {
    code: 'HRV',
    name: 'Croatia',
  },
  {
    code: 'CUB',
    name: 'Cuba',
  },
  {
    code: 'CUW',
    name: 'Curaçao',
  },
  {
    code: 'CYP',
    name: 'Cyprus',
  },
  {
    code: 'CZE',
    name: 'Czech Republic',
  },
  {
    code: 'DNK',
    name: 'Denmark',
  },
  {
    code: 'DJI',
    name: 'Djibouti',
  },
  {
    code: 'DMA',
    name: 'Dominica',
  },
  {
    code: 'DOM',
    name: 'Dominican Republic',
  },
  {
    code: 'ECU',
    name: 'Ecuador',
  },
  {
    code: 'EGY',
    name: 'Egypt',
  },
  {
    code: 'SLV',
    name: 'El Salvador',
  },
  {
    code: 'GNQ',
    name: 'Equatorial Guinea',
  },
  {
    code: 'ERI',
    name: 'Eritrea',
  },
  {
    code: 'EST',
    name: 'Estonia',
  },
  {
    code: 'ETH',
    name: 'Ethiopia',
  },
  {
    code: 'FLK',
    name: 'Falkland Islands (Malvinas)',
  },
  {
    code: 'FRO',
    name: 'Faroe Islands',
  },
  {
    code: 'FJI',
    name: 'Fiji',
  },
  {
    code: 'FIN',
    name: 'Finland',
  },
  {
    code: 'FRA',
    name: 'France',
  },
  {
    code: 'GUF',
    name: 'French Guiana',
  },
  {
    code: 'PYF',
    name: 'French Polynesia',
  },
  {
    code: 'ATF',
    name: 'French Southern Territories',
  },
  {
    code: 'GAB',
    name: 'Gabon',
  },
  {
    code: 'GMB',
    name: 'Gambia',
  },
  {
    code: 'GEO',
    name: 'Georgia',
  },
  {
    code: 'DEU',
    name: 'Germany',
  },
  {
    code: 'GHA',
    name: 'Ghana',
  },
  {
    code: 'GIB',
    name: 'Gibraltar',
  },
  {
    code: 'GRC',
    name: 'Greece',
  },
  {
    code: 'GRL',
    name: 'Greenland',
  },
  {
    code: 'GRD',
    name: 'Grenada',
  },
  {
    code: 'GLP',
    name: 'Guadeloupe',
  },
  {
    code: 'GUM',
    name: 'Guam',
  },
  {
    code: 'GTM',
    name: 'Guatemala',
  },
  {
    code: 'GGY',
    name: 'Guernsey',
  },
  {
    code: 'GIN',
    name: 'Guinea',
  },
  {
    code: 'GNB',
    name: 'Guinea-Bissau',
  },
  {
    code: 'GUY',
    name: 'Guyana',
  },
  {
    code: 'HTI',
    name: 'Haiti',
  },
  {
    code: 'HMD',
    name: 'Heard Island and McDonald Islands',
  },
  {
    code: 'VAT',
    name: 'Holy See (Vatican City State)',
  },
  {
    code: 'HND',
    name: 'Honduras',
  },
  {
    code: 'HKG',
    name: 'Hong Kong',
  },
  {
    code: 'HUN',
    name: 'Hungary',
  },
  {
    code: 'ISL',
    name: 'Iceland',
  },
  {
    code: 'IND',
    name: 'India',
  },
  {
    code: 'IDN',
    name: 'Indonesia',
  },
  {
    code: 'IRN',
    name: 'Iran, Islamic Republic of',
  },
  {
    code: 'IRQ',
    name: 'Iraq',
  },
  {
    code: 'IRL',
    name: 'Ireland',
  },
  {
    code: 'IMN',
    name: 'Isle of Man',
  },
  {
    code: 'ISR',
    name: 'Israel',
  },
  {
    code: 'ITA',
    name: 'Italy',
  },
  {
    code: 'JAM',
    name: 'Jamaica',
  },
  {
    code: 'JPN',
    name: 'Japan',
  },
  {
    code: 'JEY',
    name: 'Jersey',
  },
  {
    code: 'JOR',
    name: 'Jordan',
  },
  {
    code: 'KAZ',
    name: 'Kazakhstan',
  },
  {
    code: 'KEN',
    name: 'Kenya',
  },
  {
    code: 'KIR',
    name: 'Kiribati',
  },
  {
    code: 'PRK',
    name: "Korea, Democratic People's Republic of",
  },
  {
    code: 'KOR',
    name: 'Korea, Republic of',
  },
  {
    code: 'KWT',
    name: 'Kuwait',
  },
  {
    code: 'KGZ',
    name: 'Kyrgyzstan',
  },
  {
    code: 'LAO',
    name: "Lao People's Democratic Republic",
  },
  {
    code: 'LVA',
    name: 'Latvia',
  },
  {
    code: 'LBN',
    name: 'Lebanon',
  },
  {
    code: 'LSO',
    name: 'Lesotho',
  },
  {
    code: 'LBR',
    name: 'Liberia',
  },
  {
    code: 'LBY',
    name: 'Libya',
  },
  {
    code: 'LIE',
    name: 'Liechtenstein',
  },
  {
    code: 'LTU',
    name: 'Lithuania',
  },
  {
    code: 'LUX',
    name: 'Luxembourg',
  },
  {
    code: 'MAC',
    name: 'Macao',
  },
  {
    code: 'MKD',
    name: 'Macedonia, the former Yugoslav Republic of',
  },
  {
    code: 'MDG',
    name: 'Madagascar',
  },
  {
    code: 'MWI',
    name: 'Malawi',
  },
  {
    code: 'MYS',
    name: 'Malaysia',
  },
  {
    code: 'MDV',
    name: 'Maldives',
  },
  {
    code: 'MLI',
    name: 'Mali',
  },
  {
    code: 'MLT',
    name: 'Malta',
  },
  {
    code: 'MHL',
    name: 'Marshall Islands',
  },
  {
    code: 'MTQ',
    name: 'Martinique',
  },
  {
    code: 'MRT',
    name: 'Mauritania',
  },
  {
    code: 'MUS',
    name: 'Mauritius',
  },
  {
    code: 'MYT',
    name: 'Mayotte',
  },
  {
    code: 'MEX',
    name: 'Mexico',
  },
  {
    code: 'FSM',
    name: 'Micronesia, Federated States of',
  },
  {
    code: 'MDA',
    name: 'Moldova, Republic of',
  },
  {
    code: 'MCO',
    name: 'Monaco',
  },
  {
    code: 'MNG',
    name: 'Mongolia',
  },
  {
    code: 'MNE',
    name: 'Montenegro',
  },
  {
    code: 'MSR',
    name: 'Montserrat',
  },
  {
    code: 'MAR',
    name: 'Morocco',
  },
  {
    code: 'MOZ',
    name: 'Mozambique',
  },
  {
    code: 'MMR',
    name: 'Myanmar',
  },
  {
    code: 'NAM',
    name: 'Namibia',
  },
  {
    code: 'NRU',
    name: 'Nauru',
  },
  {
    code: 'NPL',
    name: 'Nepal',
  },
  {
    code: 'NLD',
    name: 'Netherlands',
  },
  {
    code: 'NCL',
    name: 'New Caledonia',
  },
  {
    code: 'NZL',
    name: 'New Zealand',
  },
  {
    code: 'NIC',
    name: 'Nicaragua',
  },
  {
    code: 'NER',
    name: 'Niger',
  },
  {
    code: 'NGA',
    name: 'Nigeria',
  },
  {
    code: 'NIU',
    name: 'Niue',
  },
  {
    code: 'NFK',
    name: 'Norfolk Island',
  },
  {
    code: 'MNP',
    name: 'Northern Mariana Islands',
  },
  {
    code: 'NOR',
    name: 'Norway',
  },
  {
    code: 'OMN',
    name: 'Oman',
  },
  {
    code: 'PAK',
    name: 'Pakistan',
  },
  {
    code: 'PLW',
    name: 'Palau',
  },
  {
    code: 'PSE',
    name: 'Palestinian Territory, Occupied',
  },
  {
    code: 'PAN',
    name: 'Panama',
  },
  {
    code: 'PNG',
    name: 'Papua New Guinea',
  },
  {
    code: 'PRY',
    name: 'Paraguay',
  },
  {
    code: 'PER',
    name: 'Peru',
  },
  {
    code: 'PHL',
    name: 'Philippines',
  },
  {
    code: 'PCN',
    name: 'Pitcairn',
  },
  {
    code: 'POL',
    name: 'Poland',
  },
  {
    code: 'PRT',
    name: 'Portugal',
  },
  {
    code: 'PRI',
    name: 'Puerto Rico',
  },
  {
    code: 'QAT',
    name: 'Qatar',
  },
  {
    code: 'REU',
    name: 'Réunion',
  },
  {
    code: 'ROU',
    name: 'Romania',
  },
  {
    code: 'RUS',
    name: 'Russian Federation',
  },
  {
    code: 'RWA',
    name: 'Rwanda',
  },
  {
    code: 'BLM',
    name: 'Saint Barthélemy',
  },
  {
    code: 'SHN',
    name: 'Saint Helena, Ascension and Tristan da Cunha',
  },
  {
    code: 'KNA',
    name: 'Saint Kitts and Nevis',
  },
  {
    code: 'LCA',
    name: 'Saint Lucia',
  },
  {
    code: 'MAF',
    name: 'Saint Martin (French part)',
  },
  {
    code: 'SPM',
    name: 'Saint Pierre and Miquelon',
  },
  {
    code: 'VCT',
    name: 'Saint Vincent and the Grenadines',
  },
  {
    code: 'WSM',
    name: 'Samoa',
  },
  {
    code: 'SMR',
    name: 'San Marino',
  },
  {
    code: 'STP',
    name: 'Sao Tome and Principe',
  },
  {
    code: 'SAU',
    name: 'Saudi Arabia',
  },
  {
    code: 'SEN',
    name: 'Senegal',
  },
  {
    code: 'SRB',
    name: 'Serbia',
  },
  {
    code: 'SYC',
    name: 'Seychelles',
  },
  {
    code: 'SLE',
    name: 'Sierra Leone',
  },
  {
    code: 'SGP',
    name: 'Singapore',
  },
  {
    code: 'SXM',
    name: 'Sint Maarten (Dutch part)',
  },
  {
    code: 'SVK',
    name: 'Slovakia',
  },
  {
    code: 'SVN',
    name: 'Slovenia',
  },
  {
    code: 'SLB',
    name: 'Solomon Islands',
  },
  {
    code: 'SOM',
    name: 'Somalia',
  },
  {
    code: 'ZAF',
    name: 'South Africa',
  },
  {
    code: 'SGS',
    name: 'South Georgia and the South Sandwich Islands',
  },
  {
    code: 'SSD',
    name: 'South Sudan',
  },
  {
    code: 'ESP',
    name: 'Spain',
  },
  {
    code: 'LKA',
    name: 'Sri Lanka',
  },
  {
    code: 'SDN',
    name: 'Sudan',
  },
  {
    code: 'SUR',
    name: 'Suriname',
  },
  {
    code: 'SJM',
    name: 'Svalbard and Jan Mayen',
  },
  {
    code: 'SWZ',
    name: 'Swaziland',
  },
  {
    code: 'SWE',
    name: 'Sweden',
  },
  {
    code: 'CHE',
    name: 'Switzerland',
  },
  {
    code: 'SYR',
    name: 'Syrian Arab Republic',
  },
  {
    code: 'TWN',
    name: 'Taiwan, Province of China',
  },
  {
    code: 'TJK',
    name: 'Tajikistan',
  },
  {
    code: 'TZA',
    name: 'Tanzania, United Republic of',
  },
  {
    code: 'THA',
    name: 'Thailand',
  },
  {
    code: 'TLS',
    name: 'Timor-Leste',
  },
  {
    code: 'TGO',
    name: 'Togo',
  },
  {
    code: 'TKL',
    name: 'Tokelau',
  },
  {
    code: 'TON',
    name: 'Tonga',
  },
  {
    code: 'TTO',
    name: 'Trinidad and Tobago',
  },
  {
    code: 'TUN',
    name: 'Tunisia',
  },
  {
    code: 'TUR',
    name: 'Turkey',
  },
  {
    code: 'TKM',
    name: 'Turkmenistan',
  },
  {
    code: 'TCA',
    name: 'Turks and Caicos Islands',
  },
  {
    code: 'TUV',
    name: 'Tuvalu',
  },
  {
    code: 'UGA',
    name: 'Uganda',
  },
  {
    code: 'UKR',
    name: 'Ukraine',
  },
  {
    code: 'ARE',
    name: 'United Arab Emirates',
  },
  {
    code: 'GBR',
    name: 'United Kingdom',
  },
  {
    code: 'USA',
    name: 'United States',
  },
  {
    code: 'UMI',
    name: 'United States Minor Outlying Islands',
  },
  {
    code: 'URY',
    name: 'Uruguay',
  },
  {
    code: 'UZB',
    name: 'Uzbekistan',
  },
  {
    code: 'VUT',
    name: 'Vanuatu',
  },
  {
    code: 'VEN',
    name: 'Venezuela, Bolivarian Republic of',
  },
  {
    code: 'VNM',
    name: 'Viet Nam',
  },
  {
    code: 'VGB',
    name: 'Virgin Islands, British',
  },
  {
    code: 'VIR',
    name: 'Virgin Islands, U.S.',
  },
  {
    code: 'WLF',
    name: 'Wallis and Futuna',
  },
  {
    code: 'ESH',
    name: 'Western Sahara',
  },
  {
    code: 'YEM',
    name: 'Yemen',
  },
  {
    code: 'ZMB',
    name: 'Zambia',
  },
  {
    code: 'ZWE',
    name: 'Zimbabwe',
  },
];

export const COUNTRY_CODES: CountryCode[] = [
  {
    name: 'Australia',
    dial_code: '+61',
    code: 'AU',
  },
  {
    name: 'Afghanistan',
    dial_code: '+93',
    code: 'AF',
  },
  {
    name: 'Aland Islands',
    dial_code: '+358',
    code: 'AX',
  },
  {
    name: 'Albania',
    dial_code: '+355',
    code: 'AL',
  },
  {
    name: 'Algeria',
    dial_code: '+213',
    code: 'DZ',
  },
  {
    name: 'AmericanSamoa',
    dial_code: '+1684',
    code: 'AS',
  },
  {
    name: 'Andorra',
    dial_code: '+376',
    code: 'AD',
  },
  {
    name: 'Angola',
    dial_code: '+244',
    code: 'AO',
  },
  {
    name: 'Anguilla',
    dial_code: '+1264',
    code: 'AI',
  },
  {
    name: 'Antarctica',
    dial_code: '+672',
    code: 'AQ',
  },
  {
    name: 'Antigua and Barbuda',
    dial_code: '+1268',
    code: 'AG',
  },
  {
    name: 'Argentina',
    dial_code: '+54',
    code: 'AR',
  },
  {
    name: 'Armenia',
    dial_code: '+374',
    code: 'AM',
  },
  {
    name: 'Aruba',
    dial_code: '+297',
    code: 'AW',
  },
  {
    name: 'Austria',
    dial_code: '+43',
    code: 'AT',
  },
  {
    name: 'Azerbaijan',
    dial_code: '+994',
    code: 'AZ',
  },
  {
    name: 'Bahamas',
    dial_code: '+1242',
    code: 'BS',
  },
  {
    name: 'Bahrain',
    dial_code: '+973',
    code: 'BH',
  },
  {
    name: 'Bangladesh',
    dial_code: '+880',
    code: 'BD',
  },
  {
    name: 'Barbados',
    dial_code: '+1246',
    code: 'BB',
  },
  {
    name: 'Belarus',
    dial_code: '+375',
    code: 'BY',
  },
  {
    name: 'Belgium',
    dial_code: '+32',
    code: 'BE',
  },
  {
    name: 'Belize',
    dial_code: '+501',
    code: 'BZ',
  },
  {
    name: 'Benin',
    dial_code: '+229',
    code: 'BJ',
  },
  {
    name: 'Bermuda',
    dial_code: '+1441',
    code: 'BM',
  },
  {
    name: 'Bhutan',
    dial_code: '+975',
    code: 'BT',
  },
  {
    name: 'Bolivia, Plurinational State of',
    dial_code: '+591',
    code: 'BO',
  },
  {
    name: 'Bosnia and Herzegovina',
    dial_code: '+387',
    code: 'BA',
  },
  {
    name: 'Botswana',
    dial_code: '+267',
    code: 'BW',
  },
  {
    name: 'Brazil',
    dial_code: '+55',
    code: 'BR',
  },
  {
    name: 'British Indian Ocean Territory',
    dial_code: '+246',
    code: 'IO',
  },
  {
    name: 'Brunei Darussalam',
    dial_code: '+673',
    code: 'BN',
  },
  {
    name: 'Bulgaria',
    dial_code: '+359',
    code: 'BG',
  },
  {
    name: 'Burkina Faso',
    dial_code: '+226',
    code: 'BF',
  },
  {
    name: 'Burundi',
    dial_code: '+257',
    code: 'BI',
  },
  {
    name: 'Cambodia',
    dial_code: '+855',
    code: 'KH',
  },
  {
    name: 'Cameroon',
    dial_code: '+237',
    code: 'CM',
  },
  {
    name: 'Canada',
    dial_code: '+1',
    code: 'CA',
  },
  {
    name: 'Cape Verde',
    dial_code: '+238',
    code: 'CV',
  },
  {
    name: 'Cayman Islands',
    dial_code: '+ 345',
    code: 'KY',
  },
  {
    name: 'Central African Republic',
    dial_code: '+236',
    code: 'CF',
  },
  {
    name: 'Chad',
    dial_code: '+235',
    code: 'TD',
  },
  {
    name: 'Chile',
    dial_code: '+56',
    code: 'CL',
  },
  {
    name: 'China',
    dial_code: '+86',
    code: 'CN',
  },
  {
    name: 'Christmas Island',
    dial_code: '+61',
    code: 'CX',
  },
  {
    name: 'Cocos (Keeling) Islands',
    dial_code: '+61',
    code: 'CC',
  },
  {
    name: 'Colombia',
    dial_code: '+57',
    code: 'CO',
  },
  {
    name: 'Comoros',
    dial_code: '+269',
    code: 'KM',
  },
  {
    name: 'Congo',
    dial_code: '+242',
    code: 'CG',
  },
  {
    name: 'Congo, The Democratic Republic of the Congo',
    dial_code: '+243',
    code: 'CD',
  },
  {
    name: 'Cook Islands',
    dial_code: '+682',
    code: 'CK',
  },
  {
    name: 'Costa Rica',
    dial_code: '+506',
    code: 'CR',
  },
  {
    name: "Cote d'Ivoire",
    dial_code: '+225',
    code: 'CI',
  },
  {
    name: 'Croatia',
    dial_code: '+385',
    code: 'HR',
  },
  {
    name: 'Cuba',
    dial_code: '+53',
    code: 'CU',
  },
  {
    name: 'Cyprus',
    dial_code: '+357',
    code: 'CY',
  },
  {
    name: 'Czech Republic',
    dial_code: '+420',
    code: 'CZ',
  },
  {
    name: 'Denmark',
    dial_code: '+45',
    code: 'DK',
  },
  {
    name: 'Djibouti',
    dial_code: '+253',
    code: 'DJ',
  },
  {
    name: 'Dominica',
    dial_code: '+1767',
    code: 'DM',
  },
  {
    name: 'Dominican Republic',
    dial_code: '+1849',
    code: 'DO',
  },
  {
    name: 'Ecuador',
    dial_code: '+593',
    code: 'EC',
  },
  {
    name: 'Egypt',
    dial_code: '+20',
    code: 'EG',
  },
  {
    name: 'El Salvador',
    dial_code: '+503',
    code: 'SV',
  },
  {
    name: 'Equatorial Guinea',
    dial_code: '+240',
    code: 'GQ',
  },
  {
    name: 'Eritrea',
    dial_code: '+291',
    code: 'ER',
  },
  {
    name: 'Estonia',
    dial_code: '+372',
    code: 'EE',
  },
  {
    name: 'Ethiopia',
    dial_code: '+251',
    code: 'ET',
  },
  {
    name: 'Falkland Islands (Malvinas)',
    dial_code: '+500',
    code: 'FK',
  },
  {
    name: 'Faroe Islands',
    dial_code: '+298',
    code: 'FO',
  },
  {
    name: 'Fiji',
    dial_code: '+679',
    code: 'FJ',
  },
  {
    name: 'Finland',
    dial_code: '+358',
    code: 'FI',
  },
  {
    name: 'France',
    dial_code: '+33',
    code: 'FR',
  },
  {
    name: 'French Guiana',
    dial_code: '+594',
    code: 'GF',
  },
  {
    name: 'French Polynesia',
    dial_code: '+689',
    code: 'PF',
  },
  {
    name: 'Gabon',
    dial_code: '+241',
    code: 'GA',
  },
  {
    name: 'Gambia',
    dial_code: '+220',
    code: 'GM',
  },
  {
    name: 'Georgia',
    dial_code: '+995',
    code: 'GE',
  },
  {
    name: 'Germany',
    dial_code: '+49',
    code: 'DE',
  },
  {
    name: 'Ghana',
    dial_code: '+233',
    code: 'GH',
  },
  {
    name: 'Gibraltar',
    dial_code: '+350',
    code: 'GI',
  },
  {
    name: 'Greece',
    dial_code: '+30',
    code: 'GR',
  },
  {
    name: 'Greenland',
    dial_code: '+299',
    code: 'GL',
  },
  {
    name: 'Grenada',
    dial_code: '+1473',
    code: 'GD',
  },
  {
    name: 'Guadeloupe',
    dial_code: '+590',
    code: 'GP',
  },
  {
    name: 'Guam',
    dial_code: '+1671',
    code: 'GU',
  },
  {
    name: 'Guatemala',
    dial_code: '+502',
    code: 'GT',
  },
  {
    name: 'Guernsey',
    dial_code: '+44',
    code: 'GG',
  },
  {
    name: 'Guinea',
    dial_code: '+224',
    code: 'GN',
  },
  {
    name: 'Guinea-Bissau',
    dial_code: '+245',
    code: 'GW',
  },
  {
    name: 'Guyana',
    dial_code: '+595',
    code: 'GY',
  },
  {
    name: 'Haiti',
    dial_code: '+509',
    code: 'HT',
  },
  {
    name: 'Holy See (Vatican City State)',
    dial_code: '+379',
    code: 'VA',
  },
  {
    name: 'Honduras',
    dial_code: '+504',
    code: 'HN',
  },
  {
    name: 'Hong Kong',
    dial_code: '+852',
    code: 'HK',
  },
  {
    name: 'Hungary',
    dial_code: '+36',
    code: 'HU',
  },
  {
    name: 'Iceland',
    dial_code: '+354',
    code: 'IS',
  },
  {
    name: 'India',
    dial_code: '+91',
    code: 'IN',
  },
  {
    name: 'Indonesia',
    dial_code: '+62',
    code: 'ID',
  },
  {
    name: 'Iran, Islamic Republic of Persian Gulf',
    dial_code: '+98',
    code: 'IR',
  },
  {
    name: 'Iraq',
    dial_code: '+964',
    code: 'IQ',
  },
  {
    name: 'Ireland',
    dial_code: '+353',
    code: 'IE',
  },
  {
    name: 'Isle of Man',
    dial_code: '+44',
    code: 'IM',
  },
  {
    name: 'Israel',
    dial_code: '+972',
    code: 'IL',
  },
  {
    name: 'Italy',
    dial_code: '+39',
    code: 'IT',
  },
  {
    name: 'Jamaica',
    dial_code: '+1876',
    code: 'JM',
  },
  {
    name: 'Japan',
    dial_code: '+81',
    code: 'JP',
  },
  {
    name: 'Jersey',
    dial_code: '+44',
    code: 'JE',
  },
  {
    name: 'Jordan',
    dial_code: '+962',
    code: 'JO',
  },
  {
    name: 'Kazakhstan',
    dial_code: '+77',
    code: 'KZ',
  },
  {
    name: 'Kenya',
    dial_code: '+254',
    code: 'KE',
  },
  {
    name: 'Kiribati',
    dial_code: '+686',
    code: 'KI',
  },
  {
    name: "Korea, Democratic People's Republic of Korea",
    dial_code: '+850',
    code: 'KP',
  },
  {
    name: 'Korea, Republic of South Korea',
    dial_code: '+82',
    code: 'KR',
  },
  {
    name: 'Kuwait',
    dial_code: '+965',
    code: 'KW',
  },
  {
    name: 'Kyrgyzstan',
    dial_code: '+996',
    code: 'KG',
  },
  {
    name: 'Laos',
    dial_code: '+856',
    code: 'LA',
  },
  {
    name: 'Latvia',
    dial_code: '+371',
    code: 'LV',
  },
  {
    name: 'Lebanon',
    dial_code: '+961',
    code: 'LB',
  },
  {
    name: 'Lesotho',
    dial_code: '+266',
    code: 'LS',
  },
  {
    name: 'Liberia',
    dial_code: '+231',
    code: 'LR',
  },
  {
    name: 'Libyan Arab Jamahiriya',
    dial_code: '+218',
    code: 'LY',
  },
  {
    name: 'Liechtenstein',
    dial_code: '+423',
    code: 'LI',
  },
  {
    name: 'Lithuania',
    dial_code: '+370',
    code: 'LT',
  },
  {
    name: 'Luxembourg',
    dial_code: '+352',
    code: 'LU',
  },
  {
    name: 'Macao',
    dial_code: '+853',
    code: 'MO',
  },
  {
    name: 'Macedonia',
    dial_code: '+389',
    code: 'MK',
  },
  {
    name: 'Madagascar',
    dial_code: '+261',
    code: 'MG',
  },
  {
    name: 'Malawi',
    dial_code: '+265',
    code: 'MW',
  },
  {
    name: 'Malaysia',
    dial_code: '+60',
    code: 'MY',
  },
  {
    name: 'Maldives',
    dial_code: '+960',
    code: 'MV',
  },
  {
    name: 'Mali',
    dial_code: '+223',
    code: 'ML',
  },
  {
    name: 'Malta',
    dial_code: '+356',
    code: 'MT',
  },
  {
    name: 'Marshall Islands',
    dial_code: '+692',
    code: 'MH',
  },
  {
    name: 'Martinique',
    dial_code: '+596',
    code: 'MQ',
  },
  {
    name: 'Mauritania',
    dial_code: '+222',
    code: 'MR',
  },
  {
    name: 'Mauritius',
    dial_code: '+230',
    code: 'MU',
  },
  {
    name: 'Mayotte',
    dial_code: '+262',
    code: 'YT',
  },
  {
    name: 'Mexico',
    dial_code: '+52',
    code: 'MX',
  },
  {
    name: 'Micronesia, Federated States of Micronesia',
    dial_code: '+691',
    code: 'FM',
  },
  {
    name: 'Moldova',
    dial_code: '+373',
    code: 'MD',
  },
  {
    name: 'Monaco',
    dial_code: '+377',
    code: 'MC',
  },
  {
    name: 'Mongolia',
    dial_code: '+976',
    code: 'MN',
  },
  {
    name: 'Montenegro',
    dial_code: '+382',
    code: 'ME',
  },
  {
    name: 'Montserrat',
    dial_code: '+1664',
    code: 'MS',
  },
  {
    name: 'Morocco',
    dial_code: '+212',
    code: 'MA',
  },
  {
    name: 'Mozambique',
    dial_code: '+258',
    code: 'MZ',
  },
  {
    name: 'Myanmar',
    dial_code: '+95',
    code: 'MM',
  },
  {
    name: 'Namibia',
    dial_code: '+264',
    code: 'NA',
  },
  {
    name: 'Nauru',
    dial_code: '+674',
    code: 'NR',
  },
  {
    name: 'Nepal',
    dial_code: '+977',
    code: 'NP',
  },
  {
    name: 'Netherlands',
    dial_code: '+31',
    code: 'NL',
  },
  {
    name: 'Netherlands Antilles',
    dial_code: '+599',
    code: 'AN',
  },
  {
    name: 'New Caledonia',
    dial_code: '+687',
    code: 'NC',
  },
  {
    name: 'New Zealand',
    dial_code: '+64',
    code: 'NZ',
  },
  {
    name: 'Nicaragua',
    dial_code: '+505',
    code: 'NI',
  },
  {
    name: 'Niger',
    dial_code: '+227',
    code: 'NE',
  },
  {
    name: 'Nigeria',
    dial_code: '+234',
    code: 'NG',
  },
  {
    name: 'Niue',
    dial_code: '+683',
    code: 'NU',
  },
  {
    name: 'Norfolk Island',
    dial_code: '+672',
    code: 'NF',
  },
  {
    name: 'Northern Mariana Islands',
    dial_code: '+1670',
    code: 'MP',
  },
  {
    name: 'Norway',
    dial_code: '+47',
    code: 'NO',
  },
  {
    name: 'Oman',
    dial_code: '+968',
    code: 'OM',
  },
  {
    name: 'Pakistan',
    dial_code: '+92',
    code: 'PK',
  },
  {
    name: 'Palau',
    dial_code: '+680',
    code: 'PW',
  },
  {
    name: 'Palestinian Territory, Occupied',
    dial_code: '+970',
    code: 'PS',
  },
  {
    name: 'Panama',
    dial_code: '+507',
    code: 'PA',
  },
  {
    name: 'Papua New Guinea',
    dial_code: '+675',
    code: 'PG',
  },
  {
    name: 'Paraguay',
    dial_code: '+595',
    code: 'PY',
  },
  {
    name: 'Peru',
    dial_code: '+51',
    code: 'PE',
  },
  {
    name: 'Philippines',
    dial_code: '+63',
    code: 'PH',
  },
  {
    name: 'Pitcairn',
    dial_code: '+872',
    code: 'PN',
  },
  {
    name: 'Poland',
    dial_code: '+48',
    code: 'PL',
  },
  {
    name: 'Portugal',
    dial_code: '+351',
    code: 'PT',
  },
  {
    name: 'Puerto Rico',
    dial_code: '+1939',
    code: 'PR',
  },
  {
    name: 'Qatar',
    dial_code: '+974',
    code: 'QA',
  },
  {
    name: 'Romania',
    dial_code: '+40',
    code: 'RO',
  },
  {
    name: 'Russia',
    dial_code: '+7',
    code: 'RU',
  },
  {
    name: 'Rwanda',
    dial_code: '+250',
    code: 'RW',
  },
  {
    name: 'Reunion',
    dial_code: '+262',
    code: 'RE',
  },
  {
    name: 'Saint Barthelemy',
    dial_code: '+590',
    code: 'BL',
  },
  {
    name: 'Saint Helena, Ascension and Tristan Da Cunha',
    dial_code: '+290',
    code: 'SH',
  },
  {
    name: 'Saint Kitts and Nevis',
    dial_code: '+1869',
    code: 'KN',
  },
  {
    name: 'Saint Lucia',
    dial_code: '+1758',
    code: 'LC',
  },
  {
    name: 'Saint Martin',
    dial_code: '+590',
    code: 'MF',
  },
  {
    name: 'Saint Pierre and Miquelon',
    dial_code: '+508',
    code: 'PM',
  },
  {
    name: 'Saint Vincent and the Grenadines',
    dial_code: '+1784',
    code: 'VC',
  },
  {
    name: 'Samoa',
    dial_code: '+685',
    code: 'WS',
  },
  {
    name: 'San Marino',
    dial_code: '+378',
    code: 'SM',
  },
  {
    name: 'Sao Tome and Principe',
    dial_code: '+239',
    code: 'ST',
  },
  {
    name: 'Saudi Arabia',
    dial_code: '+966',
    code: 'SA',
  },
  {
    name: 'Senegal',
    dial_code: '+221',
    code: 'SN',
  },
  {
    name: 'Serbia',
    dial_code: '+381',
    code: 'RS',
  },
  {
    name: 'Seychelles',
    dial_code: '+248',
    code: 'SC',
  },
  {
    name: 'Sierra Leone',
    dial_code: '+232',
    code: 'SL',
  },
  {
    name: 'Singapore',
    dial_code: '+65',
    code: 'SG',
  },
  {
    name: 'Slovakia',
    dial_code: '+421',
    code: 'SK',
  },
  {
    name: 'Slovenia',
    dial_code: '+386',
    code: 'SI',
  },
  {
    name: 'Solomon Islands',
    dial_code: '+677',
    code: 'SB',
  },
  {
    name: 'Somalia',
    dial_code: '+252',
    code: 'SO',
  },
  {
    name: 'South Africa',
    dial_code: '+27',
    code: 'ZA',
  },
  {
    name: 'South Sudan',
    dial_code: '+211',
    code: 'SS',
  },
  {
    name: 'South Georgia and the South Sandwich Islands',
    dial_code: '+500',
    code: 'GS',
  },
  {
    name: 'Spain',
    dial_code: '+34',
    code: 'ES',
  },
  {
    name: 'Sri Lanka',
    dial_code: '+94',
    code: 'LK',
  },
  {
    name: 'Sudan',
    dial_code: '+249',
    code: 'SD',
  },
  {
    name: 'Suriname',
    dial_code: '+597',
    code: 'SR',
  },
  {
    name: 'Svalbard and Jan Mayen',
    dial_code: '+47',
    code: 'SJ',
  },
  {
    name: 'Swaziland',
    dial_code: '+268',
    code: 'SZ',
  },
  {
    name: 'Sweden',
    dial_code: '+46',
    code: 'SE',
  },
  {
    name: 'Switzerland',
    dial_code: '+41',
    code: 'CH',
  },
  {
    name: 'Syrian Arab Republic',
    dial_code: '+963',
    code: 'SY',
  },
  {
    name: 'Taiwan',
    dial_code: '+886',
    code: 'TW',
  },
  {
    name: 'Tajikistan',
    dial_code: '+992',
    code: 'TJ',
  },
  {
    name: 'Tanzania, United Republic of Tanzania',
    dial_code: '+255',
    code: 'TZ',
  },
  {
    name: 'Thailand',
    dial_code: '+66',
    code: 'TH',
  },
  {
    name: 'Timor-Leste',
    dial_code: '+670',
    code: 'TL',
  },
  {
    name: 'Togo',
    dial_code: '+228',
    code: 'TG',
  },
  {
    name: 'Tokelau',
    dial_code: '+690',
    code: 'TK',
  },
  {
    name: 'Tonga',
    dial_code: '+676',
    code: 'TO',
  },
  {
    name: 'Trinidad and Tobago',
    dial_code: '+1868',
    code: 'TT',
  },
  {
    name: 'Tunisia',
    dial_code: '+216',
    code: 'TN',
  },
  {
    name: 'Turkey',
    dial_code: '+90',
    code: 'TR',
  },
  {
    name: 'Turkmenistan',
    dial_code: '+993',
    code: 'TM',
  },
  {
    name: 'Turks and Caicos Islands',
    dial_code: '+1649',
    code: 'TC',
  },
  {
    name: 'Tuvalu',
    dial_code: '+688',
    code: 'TV',
  },
  {
    name: 'Uganda',
    dial_code: '+256',
    code: 'UG',
  },
  {
    name: 'Ukraine',
    dial_code: '+380',
    code: 'UA',
  },
  {
    name: 'United Arab Emirates',
    dial_code: '+971',
    code: 'AE',
  },
  {
    name: 'United Kingdom',
    dial_code: '+44',
    code: 'GB',
  },
  {
    name: 'United States',
    dial_code: '+1',
    code: 'US',
  },
  {
    name: 'Uruguay',
    dial_code: '+598',
    code: 'UY',
  },
  {
    name: 'Uzbekistan',
    dial_code: '+998',
    code: 'UZ',
  },
  {
    name: 'Vanuatu',
    dial_code: '+678',
    code: 'VU',
  },
  {
    name: 'Venezuela, Bolivarian Republic of Venezuela',
    dial_code: '+58',
    code: 'VE',
  },
  {
    name: 'Vietnam',
    dial_code: '+84',
    code: 'VN',
  },
  {
    name: 'Virgin Islands, British',
    dial_code: '+1284',
    code: 'VG',
  },
  {
    name: 'Virgin Islands, U.S.',
    dial_code: '+1340',
    code: 'VI',
  },
  {
    name: 'Wallis and Futuna',
    dial_code: '+681',
    code: 'WF',
  },
  {
    name: 'Yemen',
    dial_code: '+967',
    code: 'YE',
  },
  {
    name: 'Zambia',
    dial_code: '+260',
    code: 'ZM',
  },
  {
    name: 'Zimbabwe',
    dial_code: '+263',
    code: 'ZW',
  },
];

export const countryCodeOptions = COUNTRY_CODES.map(e => ({
  value: `${e.name} (${e.dial_code})`,
  text: `${e.name} (${e.dial_code})`,
}));

export const getDefaultMobileCountryCode = (country?: string) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { dial_code = '+61', name = 'Australia' } = COUNTRY_CODES.find(e => e.code === country) || {};

  const formattedString = `${name} (${dial_code})`;

  return {
    value: formattedString,
    text: formattedString,
  };
};

export const isAustralian = (profileCountryCode: string) =>
  profileCountryCode === AUSTRALIA_COUNTRY_CODE || profileCountryCode === AUSTRALIA_ISO_ALPHA2_COUNTRY_CODE;

export const filterDialCodeFromMobileCountryCode = (countryCode: string) => {
  return countryCode.replace(/.*\(|\).*/g, '');
};

export const getValidCountryCodeForShaype = (countryCode: string) => {
  const isAu = isAustralian(countryCode);
  return isAu ? AUSTRALIA_COUNTRY_CODE : countryCode;
};
