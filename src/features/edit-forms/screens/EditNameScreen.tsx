import React, { useState } from 'react';
import { Button, TextInput, useTheme } from '@hero-design/rn';
import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RegisterOptions } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Form, { Field } from '../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../common/components/layout';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../common/components/touch-dismiss-keyboard';
import { nameRegex } from '../../../common/validations';
import type { EditFormsStackParamList } from '../navigation/navigationType';

interface FormInput {
  firstName: string;
  lastName: string;
  middleName?: string;
}

const alphaWordRule: RegisterOptions = {
  pattern: { value: nameRegex, message: 'Field cannot contain numbers or special characters' },
};

export const EditNameScreen = () => {
  const route = useRoute<RouteProp<EditFormsStackParamList, 'EditName'>>();
  const navigation = useNavigation();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { colors, space } = useTheme();
  const [saving, startSaving] = useState(false);
  const { name, navigationTo, pageTitle, topBarTitle, updateCallback } = route.params;

  const onSubmit = (data: FormInput) => {
    startSaving(true);
    updateCallback(data);
    if (navigationTo) {
      navigation.navigate(navigationTo.screen as never, navigationTo.params as never);
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchOutsideDismissKeyboard>
      <Form<FormInput>
        mode="onChange"
        defaultValues={{
          firstName: name.firstName,
          lastName: name.lastName,
          middleName: name.middleName,
        }}
      >
        {({ control, formState: { isValid }, handleSubmit }) => (
          <KeyboardAvoidingViewContainer>
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
              <Page.Title> {pageTitle || 'Edit Name'}</Page.Title>
              <Page.Body marginBottom="xlarge">
                <Field control={control} name="firstName" label="First name" isRequired rules={alphaWordRule}>
                  {({ field, fieldState: { error } }) => (
                    <TextInput
                      autoComplete="off"
                      maxLength={250}
                      testID="firstName-input"
                      onChangeText={field.onChange}
                      required={field.isRequired}
                      error={error?.message}
                      {...field}
                      style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.smallMedium }}
                    />
                  )}
                </Field>
                <Field control={control} name="middleName" label="Middle name (optional)" rules={alphaWordRule}>
                  {({ field, fieldState: { error } }) => (
                    <TextInput
                      autoComplete="off"
                      maxLength={250}
                      testID="middleName-input"
                      helpText="You must include if shown on your ID"
                      error={error?.message}
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
                  text="Save"
                  disabled={!isValid || saving}
                  loading={saving}
                  onPress={handleSubmit(onSubmit)}
                  accessibilityLabel="Save"
                  testID="save-name-btn"
                />
              </Page.Footer>
            </Page>
          </KeyboardAvoidingViewContainer>
        )}
      </Form>
    </TouchOutsideDismissKeyboard>
  );
};
