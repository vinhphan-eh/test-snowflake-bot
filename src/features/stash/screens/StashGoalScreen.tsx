import React from 'react';
import { Button, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import type { RegisterOptions } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CurrencyInput } from '../../../common/components/currency-input';
import Form, { Field } from '../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../common/components/layout';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../common/components/touch-dismiss-keyboard';
import { MINIMUM_TRANSFERRED_AMOUNT_PER_TIME } from '../../../common/constants/payment';
import { createCurrencyFormatter } from '../../../common/utils/numbers';
import ThemeSwitcher from '../../../common/utils/ThemeSwitcher';
import type { StashNavigationProp } from '../navigation/navigationTypes';
import { useCreateStashStore } from '../stores/useCreateStashStore';

interface FormInput {
  targetAmount: string;
  targetDate: Date;
}

const STASH_AMOUNT_LIMIT = 50000;

export const StashGoalScreen = () => {
  const navigation = useNavigation<StashNavigationProp<'StashGoal'>>();
  const { name, setTargetAmount } = useCreateStashStore();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { colors, space } = useTheme();
  const formatCurrency = createCurrencyFormatter();

  const navigateToNextStep = () => {
    navigation.navigate('StashImage');
  };

  const onNext = (data: FormInput) => {
    setTargetAmount(+data.targetAmount);
    navigateToNextStep();
  };

  const onSkip = () => {
    setTargetAmount(0);
    navigateToNextStep();
  };

  const targetAmountRule: RegisterOptions = {
    validate: (e: string) => {
      const num = Number(e);
      if (num > STASH_AMOUNT_LIMIT) {
        return `You cannot Stash more than ${formatCurrency(STASH_AMOUNT_LIMIT)}`;
      }

      if (num < MINIMUM_TRANSFERRED_AMOUNT_PER_TIME) {
        return `Amount must be ${formatCurrency(MINIMUM_TRANSFERRED_AMOUNT_PER_TIME)} or more`;
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
            <Page.TopBar
              onBack={navigation.goBack}
              title="Create a Stash"
              customRight={() => (
                <ThemeSwitcher name="wallet">
                  <Typography.Body intent="secondary" variant="regular-bold" onPress={onSkip}>
                    Skip
                  </Typography.Body>
                </ThemeSwitcher>
              )}
            />
            <Page keyboardShouldPersistTaps="handled" style={{ paddingBottom: bottomInset }}>
              <Page.Title>Set a goal for your {name} Stash</Page.Title>
              <Page.Body>
                <Field control={control} name="targetAmount" label="Target amount" isRequired rules={targetAmountRule}>
                  {({ field, fieldState: { error } }) => (
                    <CurrencyInput
                      keyboardType="numeric"
                      testID="targetAmount-input"
                      error={error?.message}
                      onChangeText={field.onChange}
                      required={field.isRequired}
                      {...field}
                      value={field.value as string}
                      style={{ marginBottom: space.smallMedium, backgroundColor: colors.defaultSurface }}
                    />
                  )}
                </Field>
              </Page.Body>
              <Page.Footer>
                <Button
                  testID="targetAmount-submit"
                  text="Next"
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
