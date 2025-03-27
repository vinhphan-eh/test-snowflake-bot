import React, { useRef, useState } from 'react';
import type { ScrollView } from 'react-native';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RegisterOptions } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CurrencyInput } from '../../../common/components/currency-input';
import Form, { Field } from '../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../common/components/layout';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../common/components/touch-dismiss-keyboard';
import { MINIMUM_TRANSFERRED_AMOUNT_PER_TIME } from '../../../common/constants/payment';
import { getMoneyV2FromFloatAmount } from '../../../common/utils/currency';
import { createCurrencyFormatter } from '../../../common/utils/numbers';
import { useCloseStashMutation, useWithdrawFromStashMutation } from '../../../new-graphql/generated';
import type { StashNavigationProp, StashRouteProp } from '../navigation/navigationTypes';

interface FormInput {
  amount: string;
}

export const StashWithdrawAmountScreen = () => {
  const navigation = useNavigation<StashNavigationProp<'StashWithdrawAmount'>>();
  const route = useRoute<StashRouteProp<'StashWithdrawAmount'>>();
  const { balance, id, name } = route.params;
  const withdrawStashMutation = useWithdrawFromStashMutation();
  const closeStashMutation = useCloseStashMutation();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const { colors, space } = useTheme();
  const [canClose, setClose] = useState(false);
  const formatCurrency = createCurrencyFormatter();

  const onClose = async () => {
    try {
      await closeStashMutation.mutateAsync({ stashId: id });
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'StashWithdrawOutcome',
            params: {
              id,
              amount: balance.toString(),
              name,
              isClosed: true,
              isError: false,
            },
          },
        ],
      });
    } catch (error) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'StashWithdrawOutcome',
            params: {
              id,
              name,
              isClosed: false,
              isError: true,
            },
          },
        ],
      });
    }
  };

  const onConfirm = async (data: FormInput) => {
    const parsedAmount = getMoneyV2FromFloatAmount(+data.amount);
    try {
      await withdrawStashMutation.mutateAsync({
        stashId: id,
        input: { amount: parsedAmount },
      });
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'StashWithdrawOutcome',
            params: {
              id,
              amount: data.amount,
              name,
              isClosed: false,
              isError: false,
            },
          },
        ],
      });
    } catch (error) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'StashWithdrawOutcome',
            params: {
              id,
              amount: data.amount,
              name,
              isClosed: false,
              isError: true,
            },
          },
        ],
      });
    }
  };

  const amountRule: RegisterOptions = {
    required: true,
    validate: (e: string) => {
      const num = Number(e);

      if (num < MINIMUM_TRANSFERRED_AMOUNT_PER_TIME) {
        return `Amount must be ${formatCurrency(MINIMUM_TRANSFERRED_AMOUNT_PER_TIME)} or more`;
      }

      if (num > balance) {
        return `You cannot withdraw more than ${formatCurrency(balance)}`;
      }

      return true;
    },
  };

  const onAmountInputChange = (value: string) => {
    const num = Number(value);

    if (num === balance) {
      setClose(true);
    } else {
      setClose(false);
    }
  };

  const onAmountInputFocus = () => {
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 250);
  };

  const balanceFormatted = formatCurrency(balance);
  return (
    <TouchOutsideDismissKeyboard>
      <Form<FormInput> mode="onChange">
        {({ control, formState: { isValid }, handleSubmit }) => (
          <KeyboardAvoidingViewContainer>
            <CustomStatusBar />
            <Page.TopBar onBack={navigation.goBack} hideRight title="Withdraw funds" />
            <Page
              ref={scrollViewRef}
              keyboardShouldPersistTaps="handled"
              style={{ paddingBottom: bottomInset }}
              testID="withdrawStashPage"
            >
              <Page.Title>How much would you like to withdraw to your Swag Spend account?</Page.Title>
              <Page.Body marginBottom="xlarge">
                <Typography.Body variant="small" style={{ marginBottom: space.xlarge }}>
                  {name} balance: {balanceFormatted}
                </Typography.Body>
                <Field control={control} name="amount" label="Amount" isRequired rules={amountRule}>
                  {({ field, fieldState: { error } }) => (
                    <CurrencyInput
                      keyboardType="numeric"
                      testID="amount-input"
                      error={error?.message}
                      onChangeText={field.onChange}
                      {...field}
                      onFocus={() => {
                        if (field.onFocus) {
                          field.onFocus();
                        }
                        onAmountInputFocus();
                      }}
                      onChange={value => {
                        field.onChange(value);
                        onAmountInputChange(value);
                      }}
                      value={field.value as string}
                      style={{ marginBottom: space.smallMedium, backgroundColor: colors.defaultSurface }}
                    />
                  )}
                </Field>
              </Page.Body>
              <Page.Footer>
                <Box>
                  <Button
                    text="Confirm & close Stash"
                    accessibilityLabel="Confirm & close Stash"
                    variant="outlined"
                    disabled={!canClose}
                    loading={closeStashMutation.isLoading}
                    onPress={onClose}
                  />

                  <Box marginTop="medium">
                    <Button
                      text="Confirm"
                      accessibilityLabel="Confirm"
                      disabled={!isValid}
                      loading={withdrawStashMutation.isLoading}
                      onPress={handleSubmit(onConfirm)}
                    />
                  </Box>
                </Box>
              </Page.Footer>
            </Page>
          </KeyboardAvoidingViewContainer>
        )}
      </Form>
    </TouchOutsideDismissKeyboard>
  );
};
