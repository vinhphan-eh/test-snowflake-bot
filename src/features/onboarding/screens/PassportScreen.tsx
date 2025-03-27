import React from 'react';
import { Button, TextInput, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import type { RegisterOptions } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Form, { Field } from '../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../common/components/layout';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../common/components/touch-dismiss-keyboard';
import { passportNumberRegex } from '../../../common/validations';
import { IdentityDocumentType } from '../../../new-graphql/generated';
import type { OnboardingScreenNavigationProp } from '../navigation/navigationTypes';
import { useOnboardingStore } from '../stores/useOnboardingStore';

const passportRule: RegisterOptions = {
  maxLength: {
    value: 9,
    message: 'Invalid passport number.',
  },
  pattern: {
    value: passportNumberRegex,
    message: 'Invalid passport number.',
  },
};

interface FormInput {
  passportNumber: string;
}

const PassportScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp<'Passport'>>();
  const { setPersonalDetails } = useOnboardingStore();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { colors, space } = useTheme();

  const onNext = ({ passportNumber }: FormInput) => {
    setPersonalDetails({
      identityDocumentNumber: passportNumber,
      identityDocumentType: IdentityDocumentType.Passport,
    });
    navigation.navigate('IdentityVerificationTerm');
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <TouchOutsideDismissKeyboard>
      <Form<FormInput> mode="onChange">
        {({ control, formState: { isValid }, handleSubmit }) => (
          <KeyboardAvoidingViewContainer>
            <CustomStatusBar />
            <Page.TopBar title="Identity" hideRight onBack={onBack} />
            <Page keyboardShouldPersistTaps="handled" style={{ paddingBottom: bottomInset }}>
              <Page.Title>We need some details from your passport.</Page.Title>
              <Page.Body>
                <Field control={control} name="passportNumber" label="Passport number" isRequired rules={passportRule}>
                  {({ field, fieldState: { error } }) => (
                    <TextInput
                      autoComplete="off"
                      accessibilityLabel="Passport number input"
                      testID="passport-input"
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
                <Button
                  testID="next-on-passport"
                  text="Next"
                  disabled={!isValid}
                  accessibilityLabel="Next"
                  onPress={handleSubmit(onNext)}
                />
              </Page.Footer>
            </Page>
          </KeyboardAvoidingViewContainer>
        )}
      </Form>
    </TouchOutsideDismissKeyboard>
  );
};

export { PassportScreen };
