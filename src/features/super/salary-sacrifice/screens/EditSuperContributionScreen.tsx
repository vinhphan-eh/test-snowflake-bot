import React from 'react';
import { Box, Typography, useTheme, Button, DatePicker, Checkbox } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import type { UseFormSetValue } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { inputDollarAmountRule } from './InputDollarAmountScreen';
import { inputPercentageRule } from './InputPercentageAmountScreen';
import { CurrencyInput } from '../../../../common/components/currency-input';
import Form, { Field } from '../../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../../common/components/layout';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../../common/components/touch-dismiss-keyboard';
import { convertToRawValue, formatNumberValue, userInputToMachineNumber } from '../../../../common/utils/numbers';
import { add7Days, useSelectStartAndStopContribution } from '../../hooks/useSelectStartAndStopContribution';
import { useSubmitSuperContributionStore } from '../../store/useSubmitSuperContributionStore';
import { FIXED, SALARY_SACRIFICE_TITLE } from '../constants';
import type { SacrificeScreenNavigationProp, SalarySacrificeScreenRouteProp } from '../navigation/navigationTypes';

export interface FormInput {
  contributionValue: string;
  preserveAmount: string;
  startDate: Date;
  endDate?: Date;
}

export const EditSuperContributionScreen = () => {
  const { colors, space } = useTheme();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const navigation = useNavigation<SacrificeScreenNavigationProp<'EditSuperContribution'>>();
  const route = useRoute<SalarySacrificeScreenRouteProp<'EditSuperContribution'>>();
  const screenTitle = route?.params.title;
  const trackingAttributes = route?.params.trackingAttributes;

  const {
    contributionType,
    contributionValue,
    endDate,
    preserveAmount,
    setContributionEnded,
    setContributionValue,
    setEndDate,
    setPreserveAmount,
    setStartDate,
    startDate,
  } = useSubmitSuperContributionStore();

  const { isContributionEnded, minEndDate, minStartDate } = useSelectStartAndStopContribution();

  const onPressSave = (data: FormInput) => {
    setContributionValue(convertToRawValue({ formattedValue: data.contributionValue, decimal: '.', delimiter: ',' }));
    setPreserveAmount(convertToRawValue({ formattedValue: data.preserveAmount, decimal: '.', delimiter: ',' }));
    setStartDate(data.startDate.toISOString());

    if (isContributionEnded) {
      setEndDate(undefined);
    } else {
      setEndDate(data.endDate?.toISOString());
    }
    navigation.navigate('Review', { title: SALARY_SACRIFICE_TITLE, trackingAttributes });
  };

  const handleOnChangeStartDate = (selectedDate: Date, setControlValue: UseFormSetValue<FormInput>) => {
    setControlValue('startDate', selectedDate, { shouldValidate: true });
    setControlValue('endDate', add7Days(selectedDate), { shouldValidate: true });
    setContributionEnded(false);
  };

  const handleOnChangeEndDate = (selectedDate: Date, setControlValue: UseFormSetValue<FormInput>) => {
    setControlValue('endDate', selectedDate, { shouldValidate: true });
  };

  const handleOnPressCheckbox = () => {
    setContributionEnded(!isContributionEnded);
  };

  const isFixedContribution = contributionType === FIXED;

  return (
    <TouchOutsideDismissKeyboard>
      <Form<FormInput>
        mode="onChange"
        defaultValues={{
          contributionValue: formatNumberValue({
            rawValue: userInputToMachineNumber({ inputValue: contributionValue }),
            delimiter: ',',
            precision: 2,
          }),
          preserveAmount: formatNumberValue({
            rawValue: userInputToMachineNumber({ inputValue: preserveAmount }),
            delimiter: ',',
            precision: 2,
          }),
          startDate: dayjs(startDate).toDate(),
          endDate: endDate ? dayjs(endDate).toDate() : minEndDate,
        }}
      >
        {({ control, formState: { isValid }, handleSubmit, setValue }) => (
          <KeyboardAvoidingViewContainer>
            <CustomStatusBar />
            <Page.TopBar hideRight onBack={navigation.goBack} title={screenTitle} />
            <Page style={{ paddingBottom: bottomInset }}>
              <Page.Title>Salary sacrifice request details</Page.Title>

              <Page.Body>
                <Field
                  isRequired
                  control={control}
                  name="contributionValue"
                  rules={isFixedContribution ? inputDollarAmountRule : inputPercentageRule}
                  label={isFixedContribution ? 'Amount' : 'Percentage'}
                >
                  {({ field, fieldState: { error } }) =>
                    isFixedContribution ? (
                      <CurrencyInput
                        {...field}
                        value={field.value as string}
                        keyboardType="numeric"
                        placeholder="Contribution amount"
                        onChangeText={field.onChange}
                        onChange={value => field.onChange(userInputToMachineNumber({ inputValue: value }))}
                        required={field.isRequired}
                        testID="edit-contribution-value-input"
                        error={error?.message}
                        style={{ backgroundColor: colors.defaultGlobalSurface }}
                      />
                    ) : (
                      <CurrencyInput
                        {...field}
                        suffix="percentage"
                        currencySymbol={
                          <Typography.Body variant="small" style={{ display: 'none' }}>
                            %
                          </Typography.Body>
                        }
                        value={field.value as string}
                        keyboardType="numeric"
                        placeholder="Percentage"
                        testID="edit-contribution-value-input"
                        onChangeText={field.onChange}
                        onChange={value => field.onChange(userInputToMachineNumber({ inputValue: value }))}
                        required={field.isRequired}
                        error={error?.message}
                        style={{ backgroundColor: colors.defaultGlobalSurface }}
                      />
                    )
                  }
                </Field>

                <Field control={control} name="preserveAmount" isRequired label="Preserve Amount">
                  {({ field, fieldState: { error } }) => (
                    <CurrencyInput
                      {...field}
                      value={field.value as string}
                      keyboardType="numeric"
                      placeholder="Amount"
                      testID="edit-preserve-amount-input"
                      onChangeText={field.onChange}
                      onChange={value => field.onChange(userInputToMachineNumber({ inputValue: value }))}
                      required={field.isRequired}
                      error={error?.message}
                      style={{ backgroundColor: colors.defaultGlobalSurface }}
                    />
                  )}
                </Field>

                <Field control={control} isRequired name="startDate" label="Start Date">
                  {({ field }) => (
                    <DatePicker
                      minDate={minStartDate}
                      testID="edit-start-date-input"
                      label={field.label ?? ''}
                      displayFormat="dd MMM yyyy"
                      confirmLabel="Confirm"
                      value={field.value as Date}
                      required={field.isRequired}
                      onChange={date => handleOnChangeStartDate(date, setValue)}
                      style={{ backgroundColor: colors.defaultGlobalSurface }}
                    />
                  )}
                </Field>

                <Field control={control} name="endDate" label="End Date">
                  {({ field }) => (
                    <DatePicker
                      disabled={isContributionEnded}
                      minDate={minEndDate}
                      testID="edit-end-date-input"
                      label={field.label ?? ''}
                      displayFormat="dd MMM yyyy"
                      confirmLabel="Confirm"
                      value={field.value as Date}
                      onChange={date => handleOnChangeEndDate(date, setValue)}
                      style={{ backgroundColor: colors.defaultGlobalSurface }}
                    />
                  )}
                </Field>

                <Checkbox
                  style={{ marginVertical: space.small }}
                  onPress={handleOnPressCheckbox}
                  checked={isContributionEnded}
                  testID="edit-contribution-check-box"
                  description="I don't want my contribution to end"
                />
              </Page.Body>

              <Page.Footer>
                <Box marginTop="medium">
                  <Button
                    testID="edit-contribution-save-button"
                    onPress={handleSubmit(onPressSave)}
                    disabled={!isValid}
                    text="Save"
                    intent="primary"
                    accessibilityLabel="Save"
                  />
                </Box>
              </Page.Footer>
            </Page>
          </KeyboardAvoidingViewContainer>
        )}
      </Form>
    </TouchOutsideDismissKeyboard>
  );
};
