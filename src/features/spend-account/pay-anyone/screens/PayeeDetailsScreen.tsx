import React from 'react';
import { Button, TextInput, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import type { RegisterOptions, UseFormGetFieldState, UseFormSetValue } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Form, { Field } from '../../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../../common/components/layout';
import { Page } from '../../../../common/components/layout/page';
import { OverlayLoadingScreen } from '../../../../common/components/spinner';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../../common/components/touch-dismiss-keyboard';
import { formatToBSBValue, createCurrencyFormatter } from '../../../../common/utils/numbers';
import { bsbRegex, nameRegex, numericRegex } from '../../../../common/validations';
import { useIntl, useRegionLocalisation } from '../../../../providers/LocalisationProvider';
import { useGetSpendAmount } from '../../hooks/useGetSpendAmount';
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

export const PayeeDetailsScreen = () => {
  const navigation = useNavigation<PayAnyoneScreenNavigationProp<'PayeeDetails'>>();
  const { setPayeeDetails } = usePayAnyoneStore();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { colors, space } = useTheme();
  const Intl = useIntl();
  const { availableAmount, walletLoading: isLoading } = useGetSpendAmount({ shouldLoadStashes: true });
  const formatCurrency = createCurrencyFormatter();
  const { formatMessage } = useRegionLocalisation();

  const onNext = (data: FormInput) => {
    setPayeeDetails(data);
    navigation.navigate('PaymentDetails');
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
            <Page.TopBar onBack={navigation.goBack} hideRight title="Pay" />
            <Page keyboardShouldPersistTaps="handled" style={{ paddingBottom: bottomInset }} testID="payeeDetailsPage">
              <Page.Title>{Intl.formatMessage({ id: 'payeeAddress.header' })}</Page.Title>
              <Page.Body marginBottom="xlarge">
                <Typography.Body variant="regular" style={{ marginBottom: space.xlarge }}>
                  {Intl.formatMessage({ id: 'payeeAddress.availableBalance.statement' })}{' '}
                  {formatCurrency(availableAmount)}
                </Typography.Body>
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
                      style={{ marginBottom: space.smallMedium, backgroundColor: colors.defaultGlobalSurface }}
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
                      style={{ marginBottom: space.smallMedium, backgroundColor: colors.defaultGlobalSurface }}
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
                      style={{ backgroundColor: colors.defaultGlobalSurface }}
                    />
                  )}
                </Field>
              </Page.Body>
              <Page.Footer>
                <Button
                  text="Next"
                  testID="new-payee-next"
                  accessibilityLabel="Next"
                  disabled={!isValid}
                  onPress={handleSubmit(onNext)}
                />
              </Page.Footer>
              {isLoading && <OverlayLoadingScreen />}
            </Page>
          </KeyboardAvoidingViewContainer>
        )}
      </Form>
    </TouchOutsideDismissKeyboard>
  );
};
