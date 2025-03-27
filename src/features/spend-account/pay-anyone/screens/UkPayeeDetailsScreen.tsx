import React from 'react';
import { Button, TextInput, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import type { RegisterOptions } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Form, { Field } from '../../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../../common/components/layout';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../../common/components/touch-dismiss-keyboard';
import { createCurrencyFormatter } from '../../../../common/utils/numbers';
import { nameRegex, numericRegex, ukSortCodeRegex } from '../../../../common/validations';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useGetSpendAmount } from '../../hooks/useGetSpendAmount';
import type { PayAnyoneScreenNavigationProp } from '../navigation/navigationTypes';
import { useUkPayAnyoneStore } from '../stores/useUkPayAnyoneStore';

interface FormInput {
  accountName: string;
  sortCode: string;
  accountNumber: string;
}

const alphaWordRule: RegisterOptions = {
  pattern: { value: nameRegex, message: 'Field cannot contain numbers or special characters' },
};

const sortCodeRule: RegisterOptions = {
  minLength: { value: 6, message: 'Sort code must be 6 digits' },
  pattern: { value: ukSortCodeRegex, message: 'Sort code must be 6 digits' },
};

const accountNumberRule: RegisterOptions = {
  minLength: { value: 8, message: 'Account number must be between 8 characters' },
  pattern: { value: numericRegex, message: 'Account number must be numeric' },
};

export const UkPayeeDetailsScreen = () => {
  const navigation = useNavigation<PayAnyoneScreenNavigationProp<'UkPayeeDetails'>>();
  const { setPayeeDetails } = useUkPayAnyoneStore();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { colors, space } = useTheme();
  const { availableAmount } = useGetSpendAmount({ shouldLoadStashes: false });
  const formatCurrency = createCurrencyFormatter();
  const Intl = useIntl();

  const onNext = (data: FormInput) => {
    setPayeeDetails(data);
    navigation.navigate('UkPaymentDetails');
  };

  return (
    <TouchOutsideDismissKeyboard>
      <Form<FormInput> mode="onChange">
        {({ control, formState: { isValid }, handleSubmit }) => (
          <KeyboardAvoidingViewContainer>
            <CustomStatusBar />
            <Page.TopBar onBack={navigation.goBack} hideRight title="Pay" />
            <Page
              keyboardShouldPersistTaps="handled"
              style={{ paddingBottom: bottomInset }}
              testID="ukPayeeDetailsPage"
            >
              <Page.Title>Who are you sending money to?</Page.Title>
              <Page.Body marginBottom="xlarge">
                <Typography.Body variant="regular" style={{ marginBottom: space.xlarge }}>
                  {Intl.formatMessage({ id: 'payeeAddress.availableBalance.statement' })}{' '}
                  {formatCurrency(availableAmount, { currency: 'GBP' })}
                </Typography.Body>
                <Field control={control} name="accountName" label="Account name" isRequired rules={alphaWordRule}>
                  {({ field, fieldState: { error } }) => (
                    <TextInput
                      autoComplete="off"
                      maxLength={140}
                      onChangeText={field.onChange}
                      required={field.isRequired}
                      testID="uk-account-name-input"
                      error={error?.message}
                      {...field}
                      style={{ marginBottom: space.smallMedium, backgroundColor: colors.defaultGlobalSurface }}
                    />
                  )}
                </Field>
                <Field control={control} name="sortCode" label="Sort Code" isRequired rules={sortCodeRule}>
                  {({ field, fieldState: { error } }) => (
                    <TextInput
                      autoComplete="off"
                      maxLength={6}
                      onChangeText={field.onChange}
                      required={field.isRequired}
                      testID="sort-code-input"
                      keyboardType="numeric"
                      {...field}
                      error={error?.message}
                      style={{ marginBottom: space.smallMedium, backgroundColor: colors.defaultGlobalSurface }}
                    />
                  )}
                </Field>
                <Field
                  control={control}
                  name="accountNumber"
                  label="Account number"
                  isRequired
                  rules={accountNumberRule}
                >
                  {({ field, fieldState: { error } }) => (
                    <TextInput
                      autoComplete="off"
                      maxLength={8}
                      onChangeText={field.onChange}
                      required={field.isRequired}
                      keyboardType="numeric"
                      testID="uk-account-number-input"
                      {...field}
                      error={error?.message}
                      style={{ backgroundColor: colors.defaultGlobalSurface }}
                    />
                  )}
                </Field>
              </Page.Body>
              <Page.Footer>
                <Button text="Next" accessibilityLabel="Next" disabled={!isValid} onPress={handleSubmit(onNext)} />
              </Page.Footer>
            </Page>
          </KeyboardAvoidingViewContainer>
        )}
      </Form>
    </TouchOutsideDismissKeyboard>
  );
};
