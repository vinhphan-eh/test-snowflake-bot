import React, { useState } from 'react';
import { Box, Button, Checkbox, TextInput, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import type { RegisterOptions, UseFormGetFieldState, UseFormSetValue } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Form, { Field } from '../../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../../common/components/layout';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../../common/components/touch-dismiss-keyboard';
import { formatToBSBValue } from '../../../../common/utils/numbers';
import { bsbRegex, nameRegex, numericRegex } from '../../../../common/validations';
import { useRegionLocalisation } from '../../../../providers/LocalisationProvider';
import type { PayAnyoneScreenNavigationProp } from '../navigation/navigationTypes';
import { usePayAnyoneStore } from '../stores/usePayAnyoneStore';

interface FormInput {
  accountName: string;
  bsb: string;
  accountNumber: string;
}

const alphaWordRule: RegisterOptions = {
  pattern: { value: nameRegex, message: 'Field cannot contain numbers or special characters' },
};

const bsbRule: RegisterOptions = {
  pattern: { value: bsbRegex, message: 'BSB must be 6 characters' },
};

const accountNumberRule: RegisterOptions = {
  minLength: { value: 6, message: 'Account number must be between 6-9 characters' },
  pattern: { value: numericRegex, message: 'Account number must be numeric' },
};

export const NewPayeeScreen = () => {
  const navigation = useNavigation<PayAnyoneScreenNavigationProp<'NewPayee'>>();
  const { setPayeeDetails, setSavingPayeeDetails } = usePayAnyoneStore();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { colors, space } = useTheme();
  const [isSavingPayee, setIsSavingPayee] = useState(false);

  const { formatMessage } = useRegionLocalisation();

  const onNext = (data: FormInput) => {
    setPayeeDetails(data);
    setSavingPayeeDetails(isSavingPayee);
    if (isSavingPayee) {
      navigation.navigate('PayeeFriendlyName');
    } else {
      navigation.navigate('PaymentDetails');
    }
  };

  const onBSBChanged = (
    value: string,
    getState: UseFormGetFieldState<FormInput>,
    setControlValue: UseFormSetValue<FormInput>
  ) => {
    const isValidBSB = getState('bsb');
    const isNumber = !Number.isNaN(Number(value));
    if (isValidBSB && isNumber) {
      const formattedBSB = formatToBSBValue(value);
      setControlValue('bsb', formattedBSB, { shouldValidate: true });
    }
  };

  return (
    <TouchOutsideDismissKeyboard>
      <Form<FormInput> mode="onChange">
        {({ control, formState: { isValid }, getFieldState, handleSubmit, setValue }) => (
          <KeyboardAvoidingViewContainer>
            <CustomStatusBar />
            <Page.TopBar
              onBack={navigation.goBack}
              hideRight
              title={formatMessage({ id: 'pay-anyone.payeeDetails.newPayee.title' })}
            />
            <Page keyboardShouldPersistTaps="handled" style={{ paddingBottom: bottomInset }} testID="payeeDetailsPage">
              <Page.Body marginBottom="xlarge" marginTop="xlarge">
                <Field
                  control={control}
                  name="accountName"
                  label={formatMessage({ id: 'pay-anyone.payeeDetails.accountName' })}
                  isRequired
                  rules={alphaWordRule}
                >
                  {({ field, fieldState: { error } }) => (
                    <TextInput
                      autoComplete="off"
                      maxLength={250}
                      onChangeText={field.onChange}
                      required={field.isRequired}
                      testID="accountName-input"
                      error={error?.message}
                      {...field}
                      style={{ marginBottom: space.smallMedium, backgroundColor: colors.defaultSurface }}
                    />
                  )}
                </Field>
                <Field
                  control={control}
                  name="bsb"
                  label={formatMessage({ id: 'pay-anyone.payeeDetails.bsb' })}
                  isRequired
                  rules={bsbRule}
                >
                  {({ field, fieldState: { error } }) => (
                    <TextInput
                      autoComplete="off"
                      maxLength={7}
                      onChangeText={(newValue: string) => {
                        const valueWithoutHyphen = newValue.replace(/-/g, '');
                        field.onChange(valueWithoutHyphen);
                      }}
                      required={field.isRequired}
                      testID="bsb-input"
                      keyboardType="numeric"
                      {...field}
                      onBlur={() => {
                        field.onBlur();
                        onBSBChanged(field.value, getFieldState, setValue);
                      }}
                      error={error?.message}
                      style={{ marginBottom: space.smallMedium, backgroundColor: colors.defaultSurface }}
                    />
                  )}
                </Field>
                <Field
                  control={control}
                  name="accountNumber"
                  label={formatMessage({ id: 'pay-anyone.payeeDetails.accountNumber' })}
                  isRequired
                  rules={accountNumberRule}
                >
                  {({ field, fieldState: { error } }) => (
                    <TextInput
                      autoComplete="off"
                      maxLength={9}
                      onChangeText={field.onChange}
                      required={field.isRequired}
                      keyboardType="numeric"
                      testID="accountNumber-input"
                      {...field}
                      error={error?.message}
                      style={{ backgroundColor: colors.defaultSurface }}
                    />
                  )}
                </Field>
              </Page.Body>
              <Page.Footer>
                <Box marginBottom="large">
                  <Checkbox
                    testID="save-payee-ck-box"
                    onPress={() => setIsSavingPayee(!isSavingPayee)}
                    checked={isSavingPayee}
                    description={formatMessage({ id: 'pay-anyone.payeeDetails.savingAddress' })}
                  />
                </Box>
                <Button
                  text="Next"
                  testID="new-payee-next"
                  accessibilityLabel="Next"
                  disabled={!isValid}
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
