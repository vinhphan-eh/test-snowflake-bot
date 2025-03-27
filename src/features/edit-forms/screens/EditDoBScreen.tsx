import React from 'react';
import { Button, DatePicker, useTheme } from '@hero-design/rn';
import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import type { RegisterOptions, UseFormSetValue } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Form, { Field } from '../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../common/components/layout';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { DISPLAY_FORMAT_FNS, SEND_FORMAT } from '../../../common/constants/date';
import { dateRegex } from '../../../common/validations';
import type { EditFormsStackParamList } from '../navigation/navigationType';

interface FormInput {
  dateOfBirth: Date;
}

const birthdayRule: RegisterOptions = {
  pattern: {
    value: dateRegex,
    message: 'Invalid Date',
  },
};

export const EditDoBScreen = () => {
  const route = useRoute<RouteProp<EditFormsStackParamList, 'EditDoB'>>();
  const navigation = useNavigation();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { colors } = useTheme();
  const { dateOfBirth, navigationTo, pageTitle, topBarTitle, updateCallback } = route.params;

  const onSave = (data: FormInput) => {
    const newDob = dayjs(data.dateOfBirth).format(SEND_FORMAT);
    updateCallback(newDob);

    if (navigationTo) {
      navigation.navigate(navigationTo.screen as never, navigationTo.params as never);
    } else {
      navigation.goBack();
    }
  };

  const handleConfirm = (confirmedDate: Date, setControlValue: UseFormSetValue<FormInput>) => {
    setControlValue('dateOfBirth', confirmedDate, { shouldValidate: true });
  };

  return (
    <KeyboardAvoidingViewContainer>
      <Form<FormInput>
        mode="onChange"
        defaultValues={{ dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : new Date() }}
      >
        {({ control, formState: { isValid }, handleSubmit, setValue }) => (
          <>
            <CustomStatusBar backgroundColor={colors.defaultGlobalSurface} />
            <Page.TopBar
              hideLeft
              customRight={() => (
                <Button.Icon icon="cancel" intent="primary" size="small" onPress={navigation.goBack} testID="back" />
              )}
              style={{ backgroundColor: colors.defaultGlobalSurface }}
              title={topBarTitle ?? ''}
            />
            <Page
              keyboardShouldPersistTaps="handled"
              style={{ paddingBottom: bottomInset, backgroundColor: colors.defaultGlobalSurface }}
            >
              <Page.Title>{pageTitle || 'Edit birthday'}</Page.Title>
              <Page.Body>
                <Field control={control} rules={birthdayRule} isRequired name="dateOfBirth" label="Birthday">
                  {({ field }) => (
                    <DatePicker
                      testID="dob-input"
                      label={field.label ?? 'Birthday'}
                      displayFormat={DISPLAY_FORMAT_FNS}
                      confirmLabel="Confirm"
                      required={field.isRequired}
                      value={field.value as Date}
                      onChange={date => handleConfirm(date, setValue)}
                    />
                  )}
                </Field>
              </Page.Body>
              <Page.Footer>
                <Button text="Save" disabled={!isValid} onPress={handleSubmit(onSave)} accessibilityLabel="Save" />
              </Page.Footer>
            </Page>
          </>
        )}
      </Form>
    </KeyboardAvoidingViewContainer>
  );
};
