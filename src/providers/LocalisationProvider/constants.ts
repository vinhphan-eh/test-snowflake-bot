import merge from 'deepmerge';
import { flatten } from 'flat';
import ENAU from './intl-configs/locale/en-AU.json';
import ENGB from './intl-configs/locale/en-GB.json';
import ENNZ from './intl-configs/locale/en-NZ.json';
import AU from './intl-configs/region/AU.json';
import GB from './intl-configs/region/GB.json';
import NZ from './intl-configs/region/NZ.json';

type FlattenObjectKeys<T extends Record<string, string | object>, Key = keyof T> = Key extends string
  ? T[Key] extends Record<string, string | object>
    ? `${Key}.${FlattenObjectKeys<T[Key]>}`
    : `${Key}`
  : never;
export type LocaleMessageID = FlattenObjectKeys<typeof ENAU>;
export type RegionMessageID = FlattenObjectKeys<typeof AU>;
export type LocaleConfig = Record<LocaleMessageID, string>;
export type RegionConfig = Record<RegionMessageID, string>;

/**
 * Flatten
 *
 * Since the config files allow nested objects, all processings will be executed on flatten versions
 * of the config files instead
 */
const FlattenFallbackLocaleConfig = flatten(ENAU) as LocaleConfig;
const FlattenFallbackRegionConfig = flatten(AU) as RegionConfig;

const processOtherLocaleConfig = (file: Record<string, string | object>) => {
  // Filter out keys from other locale config files that must exist in Fallback Locale (en-AU) config
  const flattenOtherLocaleConfig = flatten(file) as LocaleConfig;

  // Deepmerge the configs with Other locale config overwriting duplicated keys
  return merge(FlattenFallbackLocaleConfig, flattenOtherLocaleConfig) as LocaleConfig;
};

const processOtherRegionConfig = (file: Record<string, string | object>) => {
  // Filter out keys from other locale config files that must exist in Fallback Region (AU) config
  const flattenOtherRegionConfig = flatten(file) as RegionConfig;

  // Deepmerge the configs with Other region config overwriting duplicated keys
  return merge(FlattenFallbackRegionConfig, flattenOtherRegionConfig) as RegionConfig;
};

/**
 * For locale localisation
 */
enum Locale {
  au = 'en-AU',
  gb = 'en-GB',
  nz = 'en-NZ',
}

interface LanguageEntity {
  locale: `${Locale}`;
  config: LocaleConfig;
}

export const LANGUAGE_ENTITIES: LanguageEntity[] = [
  {
    locale: 'en-AU',
    config: FlattenFallbackLocaleConfig,
  },
  {
    locale: 'en-GB',
    config: processOtherLocaleConfig(ENGB),
  },
  {
    locale: 'en-NZ',
    config: processOtherLocaleConfig(ENNZ),
  },
];

export type SupportedLocaleCode = `${Locale}`;
export const FALLBACK_LOCALE: SupportedLocaleCode = 'en-AU';
export const UK_LOCALE_CODE: SupportedLocaleCode = 'en-GB';
export const NZ_LOCALE_CODE: SupportedLocaleCode = 'en-NZ';

export const mappedLanguages: Record<SupportedLocaleCode, string[]> = {
  'en-AU': ['AU', 'AUS', 'en-AU'],
  'en-GB': ['GB', 'GBR', 'en-GB'],
  'en-NZ': ['NZ', 'NZL', 'en-NZ'],
};

/**
 * For region localisation
 */
export enum Region {
  au = 'AU',
  gb = 'GB',
  nz = 'NZ',
}

interface RegionEntity {
  region: `${Region}`;
  config: RegionConfig;
}

export const REGION_LANGUAGE_ENTITIES: RegionEntity[] = [
  {
    region: 'AU',
    config: FlattenFallbackRegionConfig,
  },
  {
    region: 'GB',
    config: processOtherRegionConfig(GB),
  },
  {
    region: 'NZ',
    config: processOtherRegionConfig(NZ),
  },
];

export type SupportedRegionCode = `${Region}`;
export const FALLBACK_REGION: SupportedRegionCode = 'AU';

export const mappedRegions: Record<SupportedRegionCode, string[]> = {
  AU: ['AU', 'AUS', 'en-AU'],
  GB: ['GB', 'GBR', 'en-GB'],
  NZ: ['NZ', 'NZL', 'en-NZ'],
};
