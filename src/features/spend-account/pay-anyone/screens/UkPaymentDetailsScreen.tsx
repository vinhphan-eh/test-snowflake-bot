import React from 'react';
import { Button, TextInput, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import type { RegisterOptions } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CurrencyInput } from '../../../../common/components/currency-input';
import Form, { Field } from '../../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../../common/components/layout';
import { Page } from '../../../../common/components/layout/page';
import { OverlayLoadingScreen } from '../../../../common/components/spinner';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../../common/components/touch-dismiss-keyboard';
import { MINIMUM_TRANSFERRED_AMOUNT_PER_TIME } from '../../../../common/constants/payment';
import { convertToRawValue, createCurrencyFormatter } from '../../../../common/utils/numbers';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useGetSpendAmount } from '../../hooks/useGetSpendAmount';
import type { PayAnyoneScreenNavigationProp } from '../navigation/navigationTypes';
import { useUkPayAnyoneStore } from '../stores/useUkPayAnyoneStore';

interface FormInput {
  amount: string;
  description: string;
}

const MAXIMUM_DESCRIPTION_LENGTH = 18;

const descriptionHelperMessage = (fieldLength?: number) => {
  const currentLength = fieldLength ?? 0;
  return `${currentLength}/${MAXIMUM_DESCRIPTION_LENGTH} characters`;
};

const descriptionRule: RegisterOptions = {
  validate: (x: string) => {
    if (x.length > MAXIMUM_DESCRIPTION_LENGTH) {
      return `${descriptionHelperMessage(x.length)}. Description too long.`;
    }
    return true;
  },
};

const UkPaymentDetailsScreen = () => {
  const navigation = useNavigation<PayAnyoneScreenNavigationProp<'UkPaymentDetails'>>();
  const { setPaymentDetails } = useUkPayAnyoneStore();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { colors, space } = useTheme();
  const { availableAmount, walletLoading: isLoading } = useGetSpendAmount({ shouldLoadStashes: false });
  const formatCurrency = createCurrencyFormatter();
  const Intl = useIntl();

  const goBack = () => {
    navigation.goBack();
  };

  const onNext = (data: FormInput) => {
    setPaymentDetails({
      ...data,
      amount: convertToRawValue({ formattedValue: data.amount, decimal: '.', delimiter: ',' }),
    });
    navigation.navigate('UkPaymentConfirmation');
  };

  const amountRule: RegisterOptions = {
    validate: (e: string) => {
      const num = Number(e);
      if (num < MINIMUM_TRANSFERRED_AMOUNT_PER_TIME) {
        return `Amount must be ${formatCurrency(MINIMUM_TRANSFERRED_AMOUNT_PER_TIME)} or more`;
      }
      if (num > availableAmount) {
        return 'You do not have enough funds.';
      }

      return true;
    },
  };

  return (
    <TouchOutsideDismissKeyboard>
      <Form<FormInput> mode="onChange">
        {({ control, formState: { isValid }, handleSubmit }) => (
          <KeyboardAvoidingViewContainer>
            <CustomStatusBar />
            <Page.TopBar onBack={goBack} hideRight title="Pay" />
            <Page
              keyboardShouldPersistTaps="handled"
              style={{ paddingBottom: bottomInset }}
              testID="paymentDetailsPage"
            >
              <Page.Title>How much do you want to send?</Page.Title>
              <Page.Body marginBottom="xlarge">
                <Typography.Body variant="regular" style={{ marginBottom: space.xlarge }}>
                  {Intl.formatMessage({ id: 'payeeAddress.availableBalance.statement' })}{' '}
                  {formatCurrency(availableAmount, { currency: 'GBP' })}
                </Typography.Body>
                <Field control={control} name="amount" label="Amount" isRequired rules={amountRule}>
                  {({ field, fieldState: { error } }) => (
                    <CurrencyInput
                      keyboardType="numeric"
                      testID="uk-amount-input"
                      error={error?.message}
                      onChangeText={field.onChange}
                      required={field.isRequired}
                      currencySymbol={<Typography.Body variant="small">£</Typography.Body>}
                      {...field}
                      style={{ marginBottom: space.smallMedium, backgroundColor: colors.defaultGlobalSurface }}
                    />
                  )}
                </Field>
                <Field control={control} name="description" label="Description" isRequired rules={descriptionRule}>
                  {({ field, fieldState: { error } }) => (
                    <TextInput
                      autoComplete="off"
                      testID="uk-description-input"
                      error={error?.message}
                      helpText={descriptionHelperMessage(field.value?.length)}
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
                  text="Next"
                  testID="uk-payment-details-next"
                  accessibilityLabel="next"
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

export { UkPaymentDetailsScreen };
