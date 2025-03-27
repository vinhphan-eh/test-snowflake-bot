# Localisation

## Concepts

At present, there are 2 different types of Localisation within this repository:

- Locale config: Based on user’s preferences of locale and language. Example: `en-AU` for the locale and language of Australian English, `en-GB` for the locale and language of British English, `ms-MY` for the locale and language of Malaysian, etc.
- Region config: Strictly based on user’s selected country from `CountryPicker` during first app session. Example: `AU` for Australian region, `GB` for British region, `MY` for Malaysian region, etc.

_Based on current implementation, both types are depdended on Selected country from `CountryPicker`. It is planned that in future implementation, locale config would be based on user's locale preferences configuration passed from Super App_

For guidance of selecting which type to use, please refer to [this part](https://employmenthero.atlassian.net/wiki/spaces/PAYM/pages/2599026762/UK+Localisation+-+Implementation+Guide+for+Mini+App#Concepts) of the Implementation Guide

## How to set up and use?

**_Note: Locale `en-AU` and region `AU` are selected as the default config (for fallback purpose) of each type. In translation step, any missing keys will fallback to the ones defined in these files._**

### Add a new Locale / Region

Define configuration in this file `src/providers/LocalisationProvider/constants.ts` based on the following steps:

- Add the locale / region code and path to load the config file to `LANGUAGE_ENTITIES` (_Please use the existing `processOtherLocaleConfig` or `processOtherRegionConfig` methods to define the config for each new locale / region._)
- Add the locale / region code to `SUPPORTED_LOCALES` or `SUPPORTED_REGIONS`
- Define the set of `ehCountryCode` and `workzoneCountryCode` that should be linked with the current locale / region to `mappedLanguages` or `mappedRegions`
- Create the corresponding `.json` file for loading the pairs of key-value for translation under `intl-configs/locale` or `intl-configs/region` folder

### Add new translation configuration

- Refer to the default locale or region config files (`intl-configs/locale/en-AU.json` or `intl-configs/locale/AU.json`) to make sure the default configuration for the translation is existing.
- If the translation is different in another locale / region to the default one, add the translation to the config file. Make sure the flatten version of the key for that config matches with the one in default files.

### Format copies

#### Locale config

To format message based on ocale colnfig, use `useIntl()` hook from react-intl. Use `formatMessage` function and passed the key or any optional parameters. **_Please be noticed at this step, the `id` used must be the unflatten version_** <br>
Example:

```tsx
const Intl = useIntl();
Intl.formatMessage({ id: 'test' }, { param1: 'abc' });
```

#### Region config

To format message based on region config, use `useRegionLocalisation()` hook. Use `formatMessage` and passed the key as parameter. Note: Not supporting optional parameter for now. **_Please be noticed at this step, the `id` used must be the unflatten version_** <br>
Example:

```tsx
const { formatMessage: formatRegionMessage } = useRegionLocalisation();
formatRegionMessage('key');
```

### Format currencies

#### Set up

Refer to file `src/common/utils/numbers.ts` and update the following:

- Add 3-letter ISO code of the currency to array `SUPPORTED_CURRENCIES`
- Add the corresponding currency symbol to `CURRENCY_MAPPING`

#### Usage

For handling currency change, use hook `useFormatCurrency()`. Parameters required:

- **amount**: number
- preferences:
  - **currency** (optional, default `AUD`): string - 3-letter ISO 4217 code of the currency, referencing [here](https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes)
  - **precision** (optional, default `2`): number - In case requiring strictly define number of decimals to display

## How to handle unit testing?

By default, `customRender` and `customRenderWithHook` have been updated to wrap the localisation provider reqired. Therefore, each unit test case will have `formatMessage` function supports translation for `en-AU` locale or `AU` region and the rendered text could be asserted using `getByText`.

In case of examining the translation for different locales or regions, follow the following steps:

#### For different locales

Add the optional locale while calling `render`. The optional locale must be among the ones defined in `SupportedLocaleCode`

```tsx
test('should render appreciated copy content for en-GB locale', () => {
  const { getByText } = render(<Screen />, { locale: 'en-GB' });
  expect(getByText('...'));
})
```

#### For different regions

Use the pre-defined `regionLocalisationMockUtil` util to wrap the current test case / test suite with provider supporting region config for on the passed region.

```
test('should handle correctly region localisation for UK users', async () => {
  regionLocalisationMockUtil('GB');
  const { getByText } = render(<Screen />);
  expect(getByText('...'));
})
```

### FAQ

1. What if I mistyped the key for translation config of other locales / regions besides the default (for fallback) ones?
   - Before being passed into provider for localisation handling, all other locales' / regions' config files are filtered to persist only the keys that are existed in the default config files. Therefore, in case of typo error, the format message step will use the fallback translation instead. Please be noticed that there will be no errors showing up in this circumstance.
2. What if I type the wrong translation key when calling `formatMessage`?
   - `react-intl` will fallback to display the `id` if none of the matching config is found from the default config file.
   - Since type-check is set for the two format functions, there will be error warning showed inline. This can also be prevented by setting up IntelliSense to suggest the appropriate unflatten ids (ready to be passed into the functions) based on the default config files.

### Reference

- [Full-detailed Implementation Guide](https://employmenthero.atlassian.net/wiki/spaces/PAYM/pages/2599026762/UK+Localisation+-+Implementation+Guide+for+Mini+App)
