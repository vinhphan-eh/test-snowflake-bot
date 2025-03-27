import React from 'react';
import { Button, DatePicker, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import type { RegisterOptions, UseFormSetValue } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Form, { Field } from '../../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../../common/components/layout';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../../common/components/touch-dismiss-keyboard';
import { DISPLAY_FORMAT_FNS, SEND_FORMAT } from '../../../../common/constants/date';
import { formatNumberValue } from '../../../../common/utils/numbers';
import { dateRegex } from '../../../../common/validations';
import type { PayAnyoneScreenNavigationProp } from '../navigation/navigationTypes';
import { usePayAnyoneStore } from '../stores/usePayAnyoneStore';

interface FormInput {
  startDate: Date;
}

const paymentStartDateRule: RegisterOptions = {
  pattern: {
    value: dateRegex,
    message: 'Invalid Date',
  },
};

const PaymentLaterScreen = () => {
  const navigation = useNavigation<PayAnyoneScreenNavigationProp<'PaymentLater'>>();
  const { payeeDetails, paymentDetails, setPaymentLater } = usePayAnyoneStore();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { colors } = useTheme();

  const onNext = (data: FormInput) => {
    setPaymentLater({
      startDate: dayjs(data.startDate).format(SEND_FORMAT),
    });
    navigation.navigate('PaymentConfirmation');
  };

  const handleConfirm = (confirmedDate: Date, setControlValue: UseFormSetValue<FormInput>) => {
    setControlValue('startDate', confirmedDate, { shouldValidate: true });
  };

  const getTomorrow = (): Date => {
    return dayjs(new Date()).add(1, 'day').toDate();
  };

  return (
    <TouchOutsideDismissKeyboard>
      <Form<FormInput> mode="onChange">
        {({ control, formState: { isValid }, handleSubmit, setValue }) => (
          <KeyboardAvoidingViewContainer>
            <CustomStatusBar />
            <Page.TopBar onBack={navigation.goBack} hideRight title="Pay" />
            <Page keyboardShouldPersistTaps="handled" style={{ paddingBottom: bottomInset }} testID="payeeDetailsPage">
              <Page.Title>
                Let’s send ${formatNumberValue({ rawValue: paymentDetails.amount, delimiter: ',', precision: 2 })} to{' '}
                {payeeDetails.accountName}
              </Page.Title>
              <Page.Body marginBottom="xlarge">
                <Field control={control} rules={paymentStartDateRule} isRequired name="startDate">
                  {({ field }) => (
                    <DatePicker
                      testID="start-date-input"
                      label={field.label ?? 'Date'}
                      displayFormat={DISPLAY_FORMAT_FNS}
                      confirmLabel="Confirm"
                      value={field.value as Date}
                      required={field.isRequired}
                      onChange={date => handleConfirm(date, setValue)}
                      minDate={getTomorrow()}
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

export { PaymentLaterScreen };
