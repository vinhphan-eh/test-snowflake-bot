import React, { useState } from 'react';
import { Platform } from 'react-native';
import { Button, Select, TextInput, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import type { RegisterOptions } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Form, { Field } from '../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../common/components/layout';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../common/components/touch-dismiss-keyboard';
import { countryCodeOptions, getDefaultMobileCountryCode } from '../../../common/constants/countries';
import { countryCodeRegex, auMobileNumberRegex, ukMobileNumberRegex } from '../../../common/validations';
import { useRegionLocalisation } from '../../../providers/LocalisationProvider';
import type { OnboardingScreenNavigationProp } from '../navigation/navigationTypes';
import { useOnboardingStore } from '../stores/useOnboardingStore';

interface FormInput {
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

const ProfilePhoneNumberScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp<'ProfilePhoneNumber'>>();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { getNextProfileInputPage, setPersonalDetails } = useOnboardingStore();
  const [searchValue, setSearchValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(countryCodeOptions);
  const { colors, space } = useTheme();
  const { currentRegion } = useRegionLocalisation();
  const defaultCountryCode = getDefaultMobileCountryCode(currentRegion);
  const phoneNumberRule = currentRegion === 'AU' ? auPhoneNumberRule : ukPhoneNumberRule;

  const onSubmit = (data: FormInput) => {
    setPersonalDetails({
      phoneNumber: {
        ...data,
        number: data.number.replace(/^0+/, ''),
      },
    });
    navigation.navigate(getNextProfileInputPage('ProfilePhoneNumber'));
  };

  const setSearchFilter = (text: string) => {
    setSearchValue(text);
    setFilteredOptions(
      countryCodeOptions.filter(code => (text ? code.text.toLowerCase().includes(text.toLowerCase()) : true))
    );
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingViewContainer>
      <Form<FormInput> mode="onChange">
        {({ control, formState: { isValid }, handleSubmit }) => (
          <>
            <CustomStatusBar />
            <Page.TopBar onBack={goBack} hideRight title="Personal details" />
            <TouchOutsideDismissKeyboard>
              <Page keyboardShouldPersistTaps="handled" style={{ paddingBottom: bottomInset }}>
                <Page.Title>{`What's your mobile number?`}</Page.Title>
                <Page.Body>
                  <Field
                    defaultValue={defaultCountryCode.value}
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
                        style={{ backgroundColor: colors.defaultSurface, marginBottom: space.smallMedium }}
                      />
                    )}
                  </Field>
                  <Field control={control} name="number" label="Mobile number" isRequired rules={phoneNumberRule}>
                    {({ field, fieldState: { error } }) => (
                      <TextInput
                        autoComplete="off"
                        maxLength={30}
                        keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                        testID="phoneNumber-input"
                        error={error?.message}
                        onChangeText={field.onChange}
                        required={field.isRequired}
                        {...field}
                        style={{ backgroundColor: colors.defaultSurface }}
                      />
                    )}
                  </Field>
                </Page.Body>
                <Page.Footer>
                  <Button
                    text="Next"
                    testID="phone-next-btn"
                    accessibilityLabel="Next"
                    disabled={!isValid}
                    onPress={handleSubmit(onSubmit)}
                  />
                </Page.Footer>
              </Page>
            </TouchOutsideDismissKeyboard>
          </>
        )}
      </Form>
    </KeyboardAvoidingViewContainer>
  );
};

export { ProfilePhoneNumberScreen };
