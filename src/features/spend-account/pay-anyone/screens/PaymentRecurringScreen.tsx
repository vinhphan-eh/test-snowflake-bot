import React from 'react';
import { Button, DatePicker, Select, TextInput, Typography, useTheme } from '@hero-design/rn';
import type { OptionType } from '@hero-design/rn/types/components/Select/types';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import type { RegisterOptions, UseFormReturn, UseFormSetValue } from 'react-hook-form';
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
import type { EndType, FrequencyType, PaymentRecurringDetails } from '../stores/usePayAnyoneStore';
import { usePayAnyoneStore } from '../stores/usePayAnyoneStore';

const FREQUENCY_OPTIONS: OptionType<`${FrequencyType}`>[] = [
  {
    text: 'Weekly',
    value: 'Weekly',
  },
  {
    text: 'Fortnightly',
    value: 'Fortnightly',
  },
  {
    text: 'Monthly',
    value: 'Monthly',
  },
  {
    text: 'Quarterly',
    value: 'Quarterly',
  },
];

const END_OPTIONS: OptionType<`${EndType}`>[] = [
  {
    text: 'Number of payments',
    value: 'numberOfPayments',
  },
  {
    text: 'End by',
    value: 'endBy',
  },
  {
    text: 'No end',
    value: 'noEnd',
  },
];

const dateRule: RegisterOptions = {
  pattern: {
    value: dateRegex,
    message: 'Invalid Date',
  },
};

const numberOfPaymentRule: RegisterOptions = {
  min: {
    value: 1,
    message: 'Number of payments must be greater than 0.',
  },
};

const getFutureDate = (startDate: Date, addedDate = 1): Date => {
  return dayjs(startDate).add(addedDate, 'day').toDate();
};

const handleConfirmDate = ({
  confirmedDate,
  fieldName,
  setValue,
}: {
  confirmedDate: Date;
  setValue: UseFormSetValue<FormInput>;
  fieldName: 'startDate' | 'endDate';
}) => {
  setValue(fieldName, confirmedDate, { shouldValidate: true });
};

const renderEndComponentByEndType = ({
  control,
  setValue,
  watch,
}: Pick<UseFormReturn<FormInput>, 'control' | 'watch' | 'setValue'>) => {
  const endType = watch('endType');

  switch (endType) {
    case 'numberOfPayments': {
      return (
        <Field
          control={control}
          rules={numberOfPaymentRule}
          name="numberOfPayments"
          label="Number of payments"
          isRequired
          key="number-of-payments-input"
        >
          {({ field, fieldState: { error } }) => (
            <TextInput
              {...field}
              testID="number-of-payments-input"
              keyboardType="number-pad"
              label={field.label ?? ''}
              value={field.value as string}
              onChangeText={field.onChange}
              required={field.isRequired}
              error={error?.message}
              maxLength={4}
              hideCharacterCount
            />
          )}
        </Field>
      );
    }
    case 'endBy': {
      const startDate = watch('startDate');

      return (
        <Field control={control} rules={dateRule} isRequired name="endDate" label="End date" key="end-date-input">
          {({ field }) => (
            <DatePicker
              testID="end-date-input"
              label={field.label ?? 'End date'}
              displayFormat={DISPLAY_FORMAT_FNS}
              confirmLabel="Confirm"
              value={field.value as Date}
              required={field.isRequired}
              onChange={confirmedDate => {
                handleConfirmDate({ confirmedDate, setValue, fieldName: 'endDate' });
              }}
              minDate={getFutureDate(startDate, 0)}
            />
          )}
        </Field>
      );
    }
    default:
      return null;
  }
};

interface FormInput {
  frequency: FrequencyType;
  startDate: Date;
  endType: `${EndType}`;
  numberOfPayments?: string;
  endDate?: Date;
}

const PaymentRecurringScreen = () => {
  const navigation = useNavigation<PayAnyoneScreenNavigationProp<'PaymentRecurring'>>();
  const payeeDetails = usePayAnyoneStore(state => state.payeeDetails);
  const paymentDetails = usePayAnyoneStore(state => state.paymentDetails);
  const setPaymentRecurring = usePayAnyoneStore(state => state.setPaymentRecurring);
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { space } = useTheme();

  const onNext = (formInput: FormInput) => {
    const payload: PaymentRecurringDetails = {
      frequency: formInput.frequency,
      startDate: dayjs(formInput.startDate).format(SEND_FORMAT),
      endType: formInput.endType,
    };

    if (formInput.endType === 'numberOfPayments') {
      payload.numberOfPayments = +(formInput.numberOfPayments ?? '');
    }

    if (formInput.endType === 'endBy' && formInput.endDate) {
      payload.endDate = dayjs(formInput.endDate).format(SEND_FORMAT);
    }

    setPaymentRecurring(payload);
    navigation.navigate('PaymentConfirmation');
  };

  return (
    <TouchOutsideDismissKeyboard>
      <Form<FormInput> mode="onChange">
        {({ control, formState: { isValid }, handleSubmit, setValue, watch }) => (
          <KeyboardAvoidingViewContainer>
            <CustomStatusBar />
            <Page.TopBar onBack={navigation.goBack} hideRight title="Pay" />
            <Page keyboardShouldPersistTaps="handled" style={{ paddingBottom: bottomInset }}>
              <Page.Title>{`Let's send $${formatNumberValue({
                rawValue: paymentDetails.amount,
                delimiter: ',',
                precision: 2,
              })} to ${payeeDetails.accountName}`}</Page.Title>
              <Page.Body justifyContent="flex-start">
                <Field control={control} name="frequency" label="Frequency" isRequired>
                  {({ field, fieldState: { error } }) => (
                    <Select
                      options={FREQUENCY_OPTIONS}
                      value={field.value}
                      onConfirm={value => {
                        if (value) {
                          field.onChange(value);
                        }
                      }}
                      testID="frequency"
                      keyExtractor={item => `${item.key}${item.text}`}
                      label={field.label ?? ''}
                      required={field.isRequired}
                      error={error?.message}
                      style={{ marginBottom: space.smallMedium }}
                    />
                  )}
                </Field>
                <Field control={control} rules={dateRule} isRequired name="startDate" label="Start date">
                  {({ field }) => (
                    <DatePicker
                      testID="start-date-input"
                      label={field.label ?? 'Start date'}
                      displayFormat={DISPLAY_FORMAT_FNS}
                      confirmLabel="Confirm"
                      value={field.value as Date}
                      required={field.isRequired}
                      onChange={confirmedDate => {
                        const endDate = watch('endDate');
                        handleConfirmDate({ confirmedDate, setValue, fieldName: 'startDate' });
                        if (endDate) {
                          const isEndDateBeforeStartDate = dayjs(endDate).isBefore(confirmedDate);
                          if (isEndDateBeforeStartDate) {
                            setValue('endDate', getFutureDate(confirmedDate, 0));
                          }
                        }
                      }}
                      style={{ marginBottom: space.smallMedium }}
                      minDate={getFutureDate(new Date())}
                    />
                  )}
                </Field>
                <Field control={control} name="endType" label="End" isRequired>
                  {({ field, fieldState: { error } }) => (
                    <Select
                      options={END_OPTIONS}
                      value={field.value}
                      onConfirm={value => {
                        if (value) {
                          field.onChange(value);
                        }
                      }}
                      testID="end type"
                      keyExtractor={item => `${item.key}${item.text}`}
                      label={field.label ?? ''}
                      required={field.isRequired}
                      error={error?.message}
                      style={{ marginBottom: space.smallMedium }}
                    />
                  )}
                </Field>
                {renderEndComponentByEndType({ control, watch, setValue })}
              </Page.Body>
              <Page.Footer>
                <Typography.Body variant="small" style={{ marginBottom: space.medium }}>
                  If a recurring payment is declined due to insufficient funds, all future payments will be cancelled.
                </Typography.Body>
                <Button text="Next" accessibilityLabel="Next" onPress={handleSubmit(onNext)} disabled={!isValid} />
              </Page.Footer>
            </Page>
          </KeyboardAvoidingViewContainer>
        )}
      </Form>
    </TouchOutsideDismissKeyboard>
  );
};

export { PaymentRecurringScreen };
