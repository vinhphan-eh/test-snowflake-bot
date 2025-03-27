import React, { useEffect } from 'react';
import { Button, TextInput, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useForm, type RegisterOptions, type FieldError } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Field } from '../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../common/components/layout';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../common/components/touch-dismiss-keyboard';
import { nameRegex } from '../../../common/validations';
import type { OnboardingScreenNavigationProp } from '../navigation/navigationTypes';
import { useOnboardingStore } from '../stores/useOnboardingStore';

interface FormInput {
  firstName: string;
  lastName: string;
  middleName?: string;
}

const alphaWordRule: RegisterOptions = {
  pattern: { value: nameRegex, message: 'Field cannot contain numbers or special characters' },
};

const ProfileNameScreen = () => {
  const { getNextProfileInputPage, setPersonalDetails } = useOnboardingStore();
  const navigation = useNavigation<OnboardingScreenNavigationProp<'ProfileName'>>();

  const { bottom: bottomInset } = useSafeAreaInsets();
  const { colors, space } = useTheme();
  const { firstName, lastName, middleName } = useOnboardingStore(state => state.personalDetails);

  const onSubmit = (data: FormInput) => {
    setPersonalDetails(data);
    navigation.navigate(getNextProfileInputPage('ProfileName'));
  };

  const {
    control,
    formState: { errors, isValid, touchedFields },
    handleSubmit,
    setValue,
    trigger,
  } = useForm<FormInput>({
    mode: 'onChange',
  });

  useEffect(() => {
    if (firstName && lastName) {
      /**
       * In case of having names inputted prior to onboarding, prefill the names by default
       */
      setValue('firstName', firstName);
      setValue('lastName', lastName);
      setValue('middleName', middleName ?? '');

      /**
       * This step is to manually request form validation, to override the validation set to be only
       * triggered on blurred
       */
      trigger();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, middleName, lastName]);

  /**
   * isFresh: The field is considered to be freshed if it has not been interacted.
   *
   * When the field is fresh and there are errors (not being overridden by <Field/> condition
   * on only showing error after onBlur event), allow showing the initial validation errors (if valid).
   *
   * If conditions are no more met, after users interacted with any of the input fields || having no initial validation errors,
   * use the one passed from <Field/> to include the overriden onFocus and onBlur conditions for error message showing
   */
  const getErrorMessage = (fieldName: keyof FormInput, fieldStateError?: FieldError) => {
    const isFresh = !Object.keys(touchedFields).includes(fieldName);
    const isError = Object.keys(errors).length > 0;

    return isFresh && isError ? errors?.[fieldName]?.message : fieldStateError?.message;
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <TouchOutsideDismissKeyboard>
      <KeyboardAvoidingViewContainer>
        <CustomStatusBar />
        <Page.TopBar onBack={goBack} hideRight title="Personal details" />
        <Page keyboardShouldPersistTaps="handled" style={{ paddingBottom: bottomInset }}>
          <Page.Title>
            {firstName ? `${firstName}, ` : ''}
            {`what's your full name as displayed on your ID?`}
          </Page.Title>
          <Page.Body marginBottom="xlarge">
            <Field control={control} name="firstName" label="First name" isRequired rules={alphaWordRule}>
              {({ field, fieldState: { error } }) => (
                <TextInput
                  autoComplete="off"
                  maxLength={250}
                  testID="firstName-input"
                  onChangeText={field.onChange}
                  required={field.isRequired}
                  error={getErrorMessage('firstName', error)}
                  {...field}
                  style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.smallMedium }}
                />
              )}
            </Field>
            <Field control={control} name="middleName" label="Middle name or initial" rules={alphaWordRule}>
              {({ field, fieldState: { error } }) => (
                <TextInput
                  autoComplete="off"
                  maxLength={250}
                  testID="middleName-input"
                  helpText="You must include if shown on your ID"
                  error={getErrorMessage('middleName', error)}
                  onChangeText={field.onChange}
                  {...field}
                  style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.smallMedium }}
                />
              )}
            </Field>
            <Field control={control} name="lastName" label="Last name" isRequired rules={alphaWordRule}>
              {({ field, fieldState: { error } }) => (
                <TextInput
                  autoComplete="off"
                  maxLength={250}
                  testID="lastName-input"
                  error={getErrorMessage('lastName', error)}
                  onChangeText={field.onChange}
                  required={field.isRequired}
                  {...field}
                  style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.smallMedium }}
                />
              )}
            </Field>
          </Page.Body>
          <Page.Footer>
            <Button
              text="Next"
              testID="profile-name-next"
              accessibilityLabel="Next"
              disabled={!isValid}
              onPress={handleSubmit(onSubmit)}
            />
          </Page.Footer>
        </Page>
      </KeyboardAvoidingViewContainer>
    </TouchOutsideDismissKeyboard>
  );
};

export { ProfileNameScreen };
