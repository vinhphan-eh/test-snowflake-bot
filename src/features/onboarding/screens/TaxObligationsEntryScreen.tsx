import React, { useCallback, useState } from 'react';
import type { TextInput as TextInputRN } from 'react-native';
import { Box, Button, Select, TextInput, Typography, useTheme } from '@hero-design/rn';
import type { OptionType } from '@hero-design/rn/types/components/Select/types';
import { useNavigation } from '@react-navigation/native';
import type { RegisterOptions } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomSheetRef } from '../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetView } from '../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD as BottomSheet } from '../../../common/components/bottom-sheet/BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from '../../../common/components/bottom-sheet/useBottomSheetDynamicSnapPoints';
import { DataCard } from '../../../common/components/data-card';
import Form, { Field } from '../../../common/components/form';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../common/components/touch-dismiss-keyboard';
import { COUNTRIES } from '../../../common/constants/countries';
import { alphaNumericRegex } from '../../../common/validations';
import { NoTaxIdNumberReason } from '../../../new-graphql/generated';
import type { OnboardingScreenNavigationProp } from '../navigation/navigationTypes';
import type { TaxObligation } from '../stores/useOnboardingStore';
import { useOnboardingStore } from '../stores/useOnboardingStore';

const COUNTRIES_EXCLUDING_AUS = COUNTRIES.slice(1);

const trnRule: RegisterOptions = {
  pattern: { value: alphaNumericRegex, message: 'Field cannot contain special symbol.' },
  maxLength: { value: 25, message: 'Field cannot exceed 25 characters.' },
};

interface FormInput {
  trn?: string;
  country: string;
}

type TaxObligationItem = TaxObligation & { name: string };

const modifyCountryOptions = (taxObligations: TaxObligationItem[]) => {
  const countrySelectedArr: string[] = taxObligations.map(record => record.country);
  const countries = COUNTRIES_EXCLUDING_AUS.reduce<OptionType<string>[]>((result, elem) => {
    if (!countrySelectedArr.includes(elem.code)) {
      result.push({ text: elem.name, value: elem.code });
    }
    return result;
  }, []);

  return countries;
};

const TaxObligationsEntryScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp<'TaxObligationsEntry'>>();
  const { getNextProfileInputPage, setTaxObligations: setTaxObligationsToStore } = useOnboardingStore();
  const btsRef = React.useRef<BottomSheetRef>(null);
  const tfRef = React.useRef<TextInputRN>(null);
  const currentRemoveCountryCode = React.useRef<string>();
  const [taxObligations, setTaxObligations] = React.useState<TaxObligationItem[]>([]);
  const { bottom: bottomInset } = useSafeAreaInsets();
  const [searchValue, setSearchValue] = useState('');
  const { colors, space } = useTheme();
  const countryOptions = modifyCountryOptions(taxObligations);
  const [filteredOptions, setFilteredOptions] = useState(countryOptions);

  const onAddCountry = (formData: FormInput, reset: () => void) => {
    const country = COUNTRIES_EXCLUDING_AUS.find(o => o.code === formData.country);
    if (!country) {
      return;
    }
    const newRecord: TaxObligationItem = {
      name: country.name,
      country: country.code,
      trn: formData.trn,
      reason: formData.trn ? undefined : NoTaxIdNumberReason.NotApplicable,
    };
    const newTaxObligations = [...taxObligations, newRecord];
    setTaxObligations(newTaxObligations);
    setFilteredOptions(modifyCountryOptions(newTaxObligations));
    tfRef.current?.blur();
    reset();
  };

  const removeCountry = (countryCode: string | undefined) => {
    if (!countryCode) {
      return;
    }
    const newTaxObligations = taxObligations.filter(el => el.country !== countryCode);
    setTaxObligations(newTaxObligations);
    setFilteredOptions(modifyCountryOptions(newTaxObligations));
  };

  const onRemoveCountry = useCallback((countryCode: string) => {
    currentRemoveCountryCode.current = countryCode;
    btsRef.current?.open();
  }, []);

  const onSubmit = () => {
    if (!taxObligations.length) {
      return;
    }
    setTaxObligationsToStore(taxObligations);
    navigation.navigate(getNextProfileInputPage('TaxObligations'));
  };

  const setSearchFilter = (text: string) => {
    setSearchValue(text);
    setFilteredOptions(
      countryOptions.filter(code => (text ? code.text.toLowerCase().includes(text.toLowerCase()) : true))
    );
  };

  const renderSelections = useCallback(
    (item: TaxObligationItem) => {
      return (
        <DataCard
          key={item.name}
          accessibilityRole="menuitem"
          data={[
            {
              label: item.trn,
              content: item.name,
            },
          ]}
          labelPosition="last"
          iconName="circle-remove-outlined"
          onPress={() => onRemoveCountry(item.country)}
          style={{ marginTop: space.large }}
        />
      );
    },
    [onRemoveCountry]
  );

  const btsActions = [
    {
      title: 'Cancel',
      onPress: () => {
        btsRef.current?.close();
      },
    },
    {
      title: 'Confirm',
      onPress: () => {
        removeCountry(currentRemoveCountryCode.current);
        btsRef.current?.close();
      },
    },
  ];

  const {
    animatedContentHeight,
    animatedHandleHeight,
    animatedSnapPoints,
    contentContainerHeightStyle,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(true);

  return (
    <TouchOutsideDismissKeyboard>
      <>
        <CustomStatusBar />
        <Page.TopBar hideRight title="Tax obligations" onBack={navigation.goBack} />
        <Page keyboardShouldPersistTaps="handled" style={{ paddingBottom: bottomInset }}>
          <Page.Title>Which countries do you have tax obligations in?</Page.Title>
          <Page.Body>
            <Form<FormInput> mode="onChange">
              {({ control, formState: { isValid }, handleSubmit, reset }) => (
                <>
                  <Field control={control} name="country" label="Country" rules={{ required: true }}>
                    {({ field, fieldState: { error } }) => (
                      <Select
                        options={filteredOptions}
                        value={field.value}
                        onConfirm={value => {
                          if (value) {
                            field.onChange(value);
                            setSearchFilter('');
                          }
                        }}
                        testID="country-code"
                        keyExtractor={opt => opt.value}
                        label={field.label ?? ''}
                        required={field.isRequired}
                        error={error?.message}
                        query={searchValue}
                        onQueryChange={setSearchFilter}
                        onDismiss={() => setSearchFilter('')}
                        style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.smallMedium }}
                      />
                    )}
                  </Field>
                  <Field control={control} name="trn" label="Tax Identification Number (optional)" rules={trnRule}>
                    {({ field, fieldState: { error } }) => (
                      <TextInput
                        autoComplete="off"
                        testID="trn-input"
                        accessibilityLabel="Tax Registration Number"
                        maxLength={25}
                        error={error?.message}
                        onChangeText={field.onChange}
                        required={field.isRequired}
                        {...field}
                        ref={tfRef}
                        style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.smallMedium }}
                      />
                    )}
                  </Field>
                  <Button
                    accessibilityLabel="Button Add Country"
                    text="Add country"
                    variant="text"
                    disabled={!isValid}
                    intent="secondary"
                    icon="add"
                    onPress={handleSubmit(form => onAddCountry(form, reset))}
                  />
                </>
              )}
            </Form>
            <Box
              marginTop="medium"
              marginBottom="small"
              accessibilityLabel="Tax Obligation List"
              borderTopWidth="base"
              borderColor="primaryOutline"
            >
              {taxObligations.map(renderSelections)}
            </Box>
          </Page.Body>
          <Page.Footer>
            <Button text="Next" accessibilityLabel="Submit" onPress={onSubmit} disabled={!taxObligations.length} />
          </Page.Footer>
        </Page>
        <BottomSheet
          ref={btsRef}
          snapPoints={animatedSnapPoints}
          handleHeight={animatedHandleHeight}
          contentHeight={animatedContentHeight}
          handleIconName="cancel"
          handleIconIntent="text"
          handleIconSize="xsmall"
          title="Remove country"
          actions={btsActions}
        >
          <BottomSheetView onLayout={handleContentLayout} style={contentContainerHeightStyle}>
            <Box paddingHorizontal="large" paddingBottom="medium">
              <Typography.Body variant="regular">{`Please confirm you'd like to remove this country from your list.`}</Typography.Body>
            </Box>
          </BottomSheetView>
        </BottomSheet>
      </>
    </TouchOutsideDismissKeyboard>
  );
};

export { TaxObligationsEntryScreen };
