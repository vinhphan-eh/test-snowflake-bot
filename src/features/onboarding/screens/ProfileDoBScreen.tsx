import React from 'react';
import { Button, DatePicker, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import type { RegisterOptions, UseFormSetValue } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Form, { Field } from '../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../common/components/layout';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { DISPLAY_FORMAT_FNS, SEND_FORMAT } from '../../../common/constants/date';
import { dateRegex } from '../../../common/validations';
import type { OnboardingScreenNavigationProp } from '../navigation/navigationTypes';
import { useOnboardingStore } from '../stores/useOnboardingStore';

interface FormInput {
  dateOfBirth: Date;
}

const birthdayRule: RegisterOptions = {
  pattern: {
    value: dateRegex,
    message: 'Invalid Date',
  },
};

const ProfileDoBScreen = () => {
  const { getNextProfileInputPage, setPersonalDetails } = useOnboardingStore();
  const navigation = useNavigation<OnboardingScreenNavigationProp<'ProfileDoB'>>();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { colors } = useTheme();

  const onNext = (data: FormInput) => {
    setPersonalDetails({
      dateOfBirth: dayjs(data.dateOfBirth).format(SEND_FORMAT),
    });
    navigation.navigate(getNextProfileInputPage('ProfileDoB'));
  };

  const handleConfirm = (confirmedDate: Date, setControlValue: UseFormSetValue<FormInput>) => {
    setControlValue('dateOfBirth', confirmedDate, { shouldValidate: true });
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingViewContainer>
      <Form<FormInput> mode="onChange">
        {({ control, formState: { isValid }, handleSubmit, setValue }) => (
          <>
            <CustomStatusBar />
            <Page.TopBar onBack={goBack} hideRight title="Personal details" />
            <Page style={{ paddingBottom: bottomInset }}>
              <Page.Title>{`What's your birthday?`}</Page.Title>
              <Page.Body>
                <Field control={control} rules={birthdayRule} isRequired name="dateOfBirth" label="Birthday">
                  {({ field }) => (
                    <DatePicker
                      testID="dob-input"
                      label={field.label ?? 'Birthday'}
                      displayFormat={DISPLAY_FORMAT_FNS}
                      confirmLabel="Confirm"
                      value={field.value as Date}
                      required={field.isRequired}
                      onChange={date => handleConfirm(date, setValue)}
                      style={{ backgroundColor: colors.defaultSurface }}
                    />
                  )}
                </Field>
              </Page.Body>
              <Page.Footer>
                <Button
                  text="Next"
                  testID="birthday-next-btn"
                  disabled={!isValid}
                  onPress={handleSubmit(onNext)}
                  accessibilityLabel="Next"
                />
              </Page.Footer>
            </Page>
          </>
        )}
      </Form>
    </KeyboardAvoidingViewContainer>
  );
};

export { ProfileDoBScreen };
