import React, { useState } from 'react';
import { Box, Button, Select, TextInput, Typography, useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RegisterOptions } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Form, { Field } from '../../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../../common/components/layout';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../../common/components/touch-dismiss-keyboard';
import { STATE_SELECTION_OPTIONS } from '../../../../common/constants/states';
import { addressRegex, numericRegex, stateRegex, suburbRegex } from '../../../../common/validations';
import type { CardSetupScreenNavigationProp, CardSetupScreenRouteProp } from '../navigation/navigationTypes';

interface FormInput {
  longForm: string;
  townOrCity: string;
  region: string;
  postcode: string;
}

const suburbRule: RegisterOptions = {
  pattern: { value: suburbRegex, message: 'Field cannot contain special symbols and numbers' },
};

const addressRule: RegisterOptions = {
  pattern: { value: addressRegex, message: 'Field cannot contain special symbols' },
};

const postcodeRule: RegisterOptions = {
  pattern: { value: numericRegex, message: 'Field cannot contain words or spaces' },
  minLength: { value: 4, message: 'Postcode must be 4 digits' },
};

const stateRule: RegisterOptions = {
  pattern: {
    value: stateRegex,
    message: 'Invalid state',
  },
};

export const MailingAddressEditScreen = () => {
  const navigation = useNavigation<CardSetupScreenNavigationProp<'MailingAddressEdit'>>();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const {
    params: { mailingAddress, updateCallback },
  } = useRoute<CardSetupScreenRouteProp<'MailingAddressEdit'>>();
  const { colors, space } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: FormInput) => {
    setIsLoading(true);
    updateCallback(data);
    navigation.goBack();
  };

  return (
    <Form<FormInput>
      mode="onChange"
      defaultValues={{
        longForm: mailingAddress?.longForm,
        townOrCity: mailingAddress?.townOrCity,
        region: mailingAddress?.region,
        postcode: mailingAddress?.postcode,
      }}
    >
      {({ control, formState: { isValid }, handleSubmit }) => (
        <KeyboardAvoidingViewContainer>
          <>
            <CustomStatusBar backgroundColor={colors.defaultGlobalSurface} />
            <Page.TopBar
              hideLeft
              customRight={() => (
                <Button.Icon testID="dismiss" intent="primary" icon="cancel" onPress={navigation.goBack} />
              )}
              style={{ backgroundColor: colors.defaultGlobalSurface }}
            />
            <TouchOutsideDismissKeyboard>
              <Page style={{ paddingBottom: bottomInset, backgroundColor: colors.defaultGlobalSurface }}>
                <Box marginTop="large" flexDirection="row" justifyContent="space-between" alignItems="center">
                  <Typography.Title level="h3">Edit mailing address</Typography.Title>
                </Box>
                <Page.Body marginBottom="xlarge">
                  <Box marginTop="large">
                    <Field control={control} name="longForm" label="Address" isRequired rules={addressRule}>
                      {({ field, fieldState: { error } }) => (
                        <TextInput
                          autoComplete="off"
                          maxLength={250}
                          accessibilityLabel="Address"
                          testID="longForm-input"
                          error={error?.message}
                          onChangeText={field.onChange}
                          required={field.isRequired}
                          {...field}
                          style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.smallMedium }}
                        />
                      )}
                    </Field>
                  </Box>

                  <Field control={control} name="townOrCity" label="Suburb" isRequired rules={suburbRule}>
                    {({ field, fieldState: { error } }) => (
                      <TextInput
                        autoComplete="off"
                        maxLength={250}
                        accessibilityLabel="Suburb"
                        testID="townOrCity-input"
                        error={error?.message}
                        onChangeText={field.onChange}
                        required={field.isRequired}
                        {...field}
                        style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.smallMedium }}
                      />
                    )}
                  </Field>
                  <Box flexDirection="row">
                    <Box marginRight="medium" flex={1}>
                      <Field control={control} name="region" label="State" isRequired rules={stateRule}>
                        {({ field, fieldState: { error } }) => (
                          <Select
                            options={STATE_SELECTION_OPTIONS}
                            value={field.value}
                            onConfirm={value => {
                              if (value) {
                                field.onChange(value);
                              }
                            }}
                            testID="region-input"
                            keyExtractor={opt => opt.value}
                            label={field.label ?? ''}
                            required={field.isRequired}
                            error={error?.message}
                            style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.smallMedium }}
                          />
                        )}
                      </Field>
                    </Box>
                    <Box flex={1}>
                      <Field control={control} name="postcode" label="Postcode" isRequired rules={postcodeRule}>
                        {({ field, fieldState: { error } }) => (
                          <TextInput
                            autoComplete="off"
                            maxLength={4}
                            accessibilityLabel="Post Code"
                            testID="postcode-input"
                            keyboardType="numeric"
                            error={error?.message}
                            onChangeText={field.onChange}
                            required={field.isRequired}
                            {...field}
                            style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.smallMedium }}
                          />
                        )}
                      </Field>
                    </Box>
                  </Box>
                </Page.Body>
                <Page.Footer>
                  <Button
                    text="Save"
                    accessibilityLabel="Save"
                    disabled={!isValid}
                    onPress={handleSubmit(onSubmit)}
                    loading={isLoading}
                  />
                </Page.Footer>
              </Page>
            </TouchOutsideDismissKeyboard>
          </>
        </KeyboardAvoidingViewContainer>
      )}
    </Form>
  );
};
