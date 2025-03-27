import React, { useState } from 'react';
import { Platform } from 'react-native';
import { Button, Select, TextInput, useTheme } from '@hero-design/rn';
import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RegisterOptions } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Form, { Field } from '../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../common/components/layout';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { countryCodeOptions } from '../../../common/constants/countries';
import { auMobileNumberRegex, countryCodeRegex, ukMobileNumberRegex } from '../../../common/validations';
import { useRegionLocalisation } from '../../../providers/LocalisationProvider';
import type { EditFormsNavigationProp, EditFormsStackParamList } from '../navigation/navigationType';

interface PhoneNumber {
  countryCode: string;
  number: string;
}

const auPhoneNumberRule: RegisterOptions = {
  pattern: { value: auMobileNumberRegex, message: 'Mobile number is invalid.' },
};

const ukPhoneNumberRule: RegisterOptions = {
  pattern: { value: ukMobileNumberRegex, message: 'Mobile number is invalid.' },
};

const countryCodeRule: RegisterOptions = {
  pattern: { value: countryCodeRegex, message: 'Invalid country code' },
};

export const EditPhoneNumberScreen = () => {
  const route = useRoute<RouteProp<EditFormsStackParamList, 'EditPhoneNumber'>>();
  const { colors, space } = useTheme();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(countryCodeOptions);
  const navigation = useNavigation<EditFormsNavigationProp<'EditPhoneNumber'>>();
  const { currentRegion } = useRegionLocalisation();
  const isAU = currentRegion === 'AU';
  const { goBack, pageTitle, phoneNumber, updateCallback } = route.params;
  const { countryCode = isAU ? 'Australia (+61)' : 'United Kingdom (+44)', number = '' } = phoneNumber || {};
  const phoneNumberRule = isAU ? auPhoneNumberRule : ukPhoneNumberRule;

  const onSubmit = (data: PhoneNumber) => {
    setLoading(true);
    updateCallback(
      {
        ...data,
        number: data.number.replace(/^0+/, ''),
      },
      navigation
    );
  };

  const setSearchFilter = (text: string) => {
    setSearchValue(text);
    setFilteredOptions(
      countryCodeOptions.filter(code => (text ? code.text.toLowerCase().includes(text.toLowerCase()) : true))
    );
  };

  return (
    <KeyboardAvoidingViewContainer>
      <Form mode="onChange" defaultValues={{ countryCode, number }}>
        {({ control, formState: { isValid }, handleSubmit }) => (
          <>
            <CustomStatusBar backgroundColor={colors.defaultGlobalSurface} />
            <Page.TopBar
              backgroundColor="defaultGlobalSurface"
              hideLeft
              title="Edit"
              onRightPress={() => goBack(navigation)}
              rightIconIntent="text"
            />
            <Page
              keyboardShouldPersistTaps="handled"
              style={{ backgroundColor: colors.defaultGlobalSurface, paddingBottom: bottomInset }}
            >
              <Page.Title>{pageTitle || 'Mobile number'}</Page.Title>
              <Page.Body>
                <Field
                  defaultValue="Australia (+61)"
                  control={control}
                  name="countryCode"
                  label="Country code"
                  isRequired
                  rules={countryCodeRule}
                >
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
                <Field control={control} name="number" label="Mobile number" isRequired rules={phoneNumberRule}>
                  {({ field, fieldState: { error } }) => {
                    return (
                      <TextInput
                        autoComplete="off"
                        maxLength={30}
                        keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                        testID="phoneNumber-input"
                        error={error?.message}
                        onChangeText={field.onChange}
                        label={field.label}
                        required={field.isRequired}
                        style={{ backgroundColor: colors.defaultGlobalSurface }}
                        {...field}
                      />
                    );
                  }}
                </Field>
              </Page.Body>
              <Page.Footer>
                <Button
                  text="Save"
                  loading={loading}
                  accessibilityLabel="Save"
                  disabled={loading || !isValid}
                  onPress={handleSubmit(onSubmit)}
                />
              </Page.Footer>
            </Page>
          </>
        )}
      </Form>
    </KeyboardAvoidingViewContainer>
  );
};
