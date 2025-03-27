import React from 'react';
import { Button, Select, TextInput, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import type { RegisterOptions } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Field } from '../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../common/components/layout';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../common/components/touch-dismiss-keyboard';
import { STATE_SELECTION_OPTIONS } from '../../../common/constants/states';
import { alphaNumericRegex, stateRegex } from '../../../common/validations';
import { IdentityDocumentType } from '../../../new-graphql/generated';
import type { OnboardingScreenNavigationProp } from '../navigation/navigationTypes';
import type { OnboardingState } from '../stores/useOnboardingStore';
import { useOnboardingStore } from '../stores/useOnboardingStore';

interface FormInput {
  issuingState: string;
  driversLicence: string;
  cardNumber?: string;
}

const driversLicenceRule: RegisterOptions = {
  maxLength: {
    value: 10,
    message: 'Invalid drivers licence number.',
  },
  pattern: {
    value: alphaNumericRegex,
    message: 'Invalid drivers licence number.',
  },
};

const issuingStateRule: RegisterOptions = {
  pattern: {
    value: stateRegex,
    message: 'Invalid state.',
  },
};

const cardNumberRule: RegisterOptions = {
  required: 'Include your card number',
  maxLength: {
    value: 10,
    message: 'Invalid card number.',
  },
  minLength: {
    value: 5,
    message: 'Invalid card number.',
  },
  pattern: {
    value: alphaNumericRegex,
    message: 'Invalid card number.',
  },
};

const DriversLicenceScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp<'DriversLicence'>>();
  const { setPersonalDetails }: OnboardingState = useOnboardingStore();
  const {
    control,
    formState: { isValid },
    getFieldState,
    getValues,
    handleSubmit,
    setValue,
    trigger,
  } = useForm<FormInput>({ mode: 'onChange', reValidateMode: 'onChange' });
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { colors, space } = useTheme();

  const onNext = (input: FormInput) => {
    setPersonalDetails({
      identityIssuingState: input.issuingState,
      identityDocumentNumber: input.driversLicence,
      identityCardNumber: input.cardNumber,
      identityDocumentType: IdentityDocumentType.DrivingLicense,
    });
    navigation.navigate('IdentityVerificationTerm');
  };

  const onIssuingStateChanged = async () => {
    const num = getValues('cardNumber');
    const fieldState = getFieldState('cardNumber');

    if (num || fieldState.error) {
      await trigger('cardNumber');
      setValue('cardNumber', num, { shouldValidate: true });
    }
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <TouchOutsideDismissKeyboard>
      <KeyboardAvoidingViewContainer>
        <CustomStatusBar />
        <Page.TopBar title="Identity" hideRight onBack={onBack} />
        <Page keyboardShouldPersistTaps="handled" style={{ paddingBottom: bottomInset }}>
          <Page.Title>We need some details from your drivers licence.</Page.Title>
          <Page.Body marginBottom="medium">
            <Field
              control={control}
              name="issuingState"
              label="Issuing state or territory"
              isRequired
              rules={issuingStateRule}
            >
              {({ field, fieldState: { error } }) => (
                <Select
                  options={STATE_SELECTION_OPTIONS}
                  value={field.value}
                  onConfirm={value => {
                    if (value) {
                      field.onChange(value);
                      onIssuingStateChanged();
                    }
                  }}
                  testID="issuing-state"
                  keyExtractor={opt => opt.value}
                  label={field.label ?? ''}
                  required={field.isRequired}
                  error={error?.message}
                  style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.smallMedium }}
                />
              )}
            </Field>
            <Field control={control} name="driversLicence" label="Licence number" isRequired rules={driversLicenceRule}>
              {({ field, fieldState: { error } }) => (
                <TextInput
                  autoComplete="off"
                  accessibilityLabel="Drivers licence input"
                  testID="drivers-licence-input"
                  error={error?.message}
                  onChangeText={field.onChange}
                  required={field.isRequired}
                  {...field}
                  style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.smallMedium }}
                />
              )}
            </Field>
            <Field control={control} name="cardNumber" label="Card number" rules={cardNumberRule} isRequired>
              {({ field, fieldState: { error } }) => (
                <TextInput
                  autoComplete="off"
                  accessibilityLabel="Card number input"
                  testID="card-number-input"
                  error={error?.message}
                  onChangeText={field.onChange}
                  required={field.isRequired}
                  {...field}
                  style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.smallMedium }}
                />
              )}
            </Field>
          </Page.Body>
          <Page.Footer>
            <Button text="Next" disabled={!isValid} accessibilityLabel="Next" onPress={handleSubmit(onNext)} />
          </Page.Footer>
        </Page>
      </KeyboardAvoidingViewContainer>
    </TouchOutsideDismissKeyboard>
  );
};

export { DriversLicenceScreen };
