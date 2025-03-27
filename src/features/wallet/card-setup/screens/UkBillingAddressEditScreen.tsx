import React, { useState } from 'react';
import { Box, Button, TextInput, Typography, useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RegisterOptions } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Form, { Field } from '../../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../../common/components/layout';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../../common/components/touch-dismiss-keyboard';
import { addressRegex, ukPostcodeRegex, suburbRegex } from '../../../../common/validations';
import type { CardSetupScreenNavigationProp, CardSetupScreenRouteProp } from '../navigation/navigationTypes';

interface FormInput {
  longForm: string;
  townOrCity: string;
  postcode: string;
  addressLine2?: string;
}

const suburbRule: RegisterOptions = {
  pattern: { value: suburbRegex, message: 'Field cannot contain special symbols and numbers' },
};

const addressRule: RegisterOptions = {
  pattern: { value: addressRegex, message: 'Field cannot contain special symbols' },
};

const postcodeRule: RegisterOptions = {
  pattern: { value: ukPostcodeRegex, message: 'Invalid UK postcode format' },
};

export const UkBillingAddressEditScreen = () => {
  const navigation = useNavigation<CardSetupScreenNavigationProp<'UkBillingAddressEdit'>>();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const {
    params: { address, updateCallback },
  } = useRoute<CardSetupScreenRouteProp<'UkBillingAddressEdit'>>();
  const { colors, space } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: FormInput) => {
    setIsLoading(true);
    updateCallback({ ...data, addressLine1: data.longForm });
    navigation.goBack();
  };

  return (
    <Form<FormInput>
      mode="onChange"
      defaultValues={{
        longForm: address?.addressLine1,
        townOrCity: address?.townOrCity,
        postcode: address?.postcode,
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
                  <Typography.Title level="h2">Edit billing address</Typography.Title>
                </Box>
                <Page.Body marginBottom="xlarge">
                  <Box marginTop="large">
                    <Field control={control} name="longForm" label="Line 1" isRequired rules={addressRule}>
                      {({ field, fieldState: { error } }) => (
                        <TextInput
                          autoComplete="off"
                          maxLength={150}
                          accessibilityLabel="Address Line 1"
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
                  <Field control={control} name="addressLine2" label="Line 2" rules={addressRule}>
                    {({ field, fieldState: { error } }) => (
                      <TextInput
                        autoComplete="off"
                        maxLength={150}
                        accessibilityLabel="Address Line 2"
                        testID="addressLine2-input"
                        error={error?.message}
                        onChangeText={field.onChange}
                        required={field.isRequired}
                        {...field}
                        style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.smallMedium }}
                      />
                    )}
                  </Field>
                  <Field control={control} name="townOrCity" label="City" isRequired rules={suburbRule}>
                    {({ field, fieldState: { error } }) => (
                      <TextInput
                        autoComplete="off"
                        maxLength={50}
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
                    <Box flex={1}>
                      <Field control={control} name="postcode" label="Postcode" isRequired rules={postcodeRule}>
                        {({ field, fieldState: { error } }) => (
                          <TextInput
                            autoComplete="off"
                            accessibilityLabel="Post Code"
                            testID="postcode-input"
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
