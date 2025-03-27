import React from 'react';
import { Button, Typography, useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RegisterOptions } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CurrencyInput } from '../../../common/components/currency-input';
import Form, { Field } from '../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../common/components/layout';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { MINIMUM_TRANSFERRED_AMOUNT_PER_TIME } from '../../../common/constants/payment';
import { getMoneyV2FromFloatAmount } from '../../../common/utils/currency';
import { createCurrencyFormatter } from '../../../common/utils/numbers';
import { useDepositToStashMutation } from '../../../new-graphql/generated';
import { useGetSpendAmount } from '../../spend-account/hooks/useGetSpendAmount';
import type { StashNavigationProp, StashRouteProp } from '../navigation/navigationTypes';

interface StashAmountForm {
  amount: string;
}

export const StashDepositCashScreen = () => {
  const navigation = useNavigation<StashNavigationProp<'StashDepositCash'>>();
  const {
    params: {
      stash: { id, name },
    },
  } = useRoute<StashRouteProp<'StashDepositCash'>>();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { isLoading, mutateAsync } = useDepositToStashMutation();
  const { colors, space } = useTheme();
  const { availableAmount } = useGetSpendAmount({
    shouldLoadStashes: true,
  });
  const formatCurrency = createCurrencyFormatter();

  const amountRule: RegisterOptions = {
    validate: (e: string) => {
      const num = Number(e);
      if (num < MINIMUM_TRANSFERRED_AMOUNT_PER_TIME) {
        return `Amount must be ${formatCurrency(MINIMUM_TRANSFERRED_AMOUNT_PER_TIME)} or more`;
      }

      if (num > availableAmount) {
        return "You don't have enough funds in your Spend account. Please reduce amount.";
      }

      return true;
    },
  };

  const onSubmit = (data: StashAmountForm) => {
    mutateAsync({ stashId: id, input: { amount: getMoneyV2FromFloatAmount(+data.amount) } })
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'StashDepositSuccess', params: { amount: +data.amount, name, id } }],
        });
      })
      .catch(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'StashFailed' }],
        });
      });
  };

  return (
    <KeyboardAvoidingViewContainer>
      <Form<StashAmountForm>>
        {({ control, formState: { isValid }, handleSubmit }) => (
          <>
            <CustomStatusBar />
            <Page.TopBar onBack={navigation.goBack} hideRight title="Stash cash" />
            <Page showsVerticalScrollIndicator={false} style={{ paddingBottom: bottomInset }}>
              <Page.Title>How much would you like to Stash into {name}?</Page.Title>
              <Page.Body marginBottom="xlarge">
                <Typography.Body variant="regular">
                  Spend account balance: {formatCurrency(availableAmount)}
                </Typography.Body>
                <Field control={control} name="amount" label="Amount" isRequired rules={amountRule}>
                  {({ field, fieldState: { error } }) => (
                    <CurrencyInput
                      keyboardType="numeric"
                      testID="amount-input"
                      error={error?.message}
                      onChangeText={field.onChange}
                      required={field.isRequired}
                      style={{ backgroundColor: colors.defaultSurface, marginTop: space.medium }}
                      {...field}
                    />
                  )}
                </Field>
              </Page.Body>
              <Page.Footer>
                <Button
                  text="Confirm"
                  loading={isLoading}
                  accessibilityLabel="Confirm"
                  disabled={isLoading || !isValid}
                  onPress={handleSubmit(onSubmit)}
                />
              </Page.Footer>
            </Page>
          </>
        )}
      </Form>
    </KeyboardAvoidingViewContainer>
  );
};
