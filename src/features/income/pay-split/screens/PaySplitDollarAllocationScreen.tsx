import React, { useRef } from 'react';
import { Box, Typography, Button, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import type { RegisterOptions } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CurrencyInput } from '../../../../common/components/currency-input';
import Form, { Field } from '../../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../../common/components/layout';
import { Page, PageFooter } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../../common/components/touch-dismiss-keyboard';
import { nonNegativeNumberRegex } from '../../../../common/validations';
import type { PaySplitConfirmBottomSheetRef } from '../components/PaySplitConfirmBottomSheet';
import { PaySplitConfirmBottomSheet } from '../components/PaySplitConfirmBottomSheet';
import { INPUT_PAY_SPLIT_AMOUNT } from '../constants/trackingEvents';
import { usePaySplitFlowStore } from '../hooks/usePaySplitFlowStore';
import { useTrackPaySplitABTesting } from '../hooks/useTrackPaySplitABTesting';
import type { PaySplitScreenNavigationProp } from '../navigation/navigationTypes';

export const VALIDATION_MSG_MUST_BE_NUMBER = 'Field cannot contain words';
export const VALIDATION_MSG_MINIMUM = 'You have not reached the minimum. Please adjust amount.';

const MINIMUM_ALLOCATE = 1;

interface FormInput {
  amount: string;
}

export const PaySplitDollarAllocationScreen = () => {
  const navigation = useNavigation<PaySplitScreenNavigationProp<'PaySplitDollarAllocation'>>();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const store = usePaySplitFlowStore();
  const { colors, space } = useTheme();
  const confirmBottomSheet = useRef<PaySplitConfirmBottomSheetRef>(null);

  const { trackEvent } = useTrackPaySplitABTesting();

  const onNext = (data: FormInput) => {
    store.edit({ amount: +data.amount });

    confirmBottomSheet.current?.open();
  };

  const onDrawerGotIt = () => {
    if (store.active) {
      trackEvent(INPUT_PAY_SPLIT_AMOUNT, {
        targetOrgId: store.active.membership.orgId,
        targetMemberId: store.active.membership.memberId,
        splitValue: store.active.amount,
      });
    }

    // final step, so apply
    store.finishEditing();
    confirmBottomSheet.current?.close();
    navigation.navigate('PaySplitOrgList');
  };

  const onBack = () => {
    // back to allocation type page, don't stop editing
    navigation.goBack();
  };

  const amountRule: RegisterOptions = {
    pattern: { value: nonNegativeNumberRegex, message: VALIDATION_MSG_MUST_BE_NUMBER },
    min: { value: MINIMUM_ALLOCATE, message: VALIDATION_MSG_MINIMUM },
  };

  return (
    <KeyboardAvoidingViewContainer>
      <CustomStatusBar />
      <Page.TopBar title="Pay Split" hideRight onBack={onBack} />
      <Page style={{ paddingBottom: bottomInset }}>
        <Page.Title>How much of your pay would you like to split into your Swag Spend account?</Page.Title>
        <TouchOutsideDismissKeyboard>
          <Form<FormInput> mode="onChange">
            {({ control, formState: { isValid }, handleSubmit }) => (
              <>
                <Page.Body>
                  <Box>
                    <Typography.Body
                      variant="regular"
                      style={{ marginRight: space.smallMedium, marginBottom: space.medium }}
                    >
                      The remaining amount will be deposited into your other nominated accounts.
                    </Typography.Body>
                    <Box marginVertical="xsmall">
                      <Field control={control} name="amount" label="Amount" isRequired rules={amountRule}>
                        {({ field, fieldState: { error } }) => (
                          <CurrencyInput
                            {...field}
                            testID="dollar-amount-input"
                            accessibilityLabel="Dollar amount"
                            currencySymbol={
                              <Typography.Body variant="small" style={{ marginRight: space.medium }}>
                                -$
                              </Typography.Body>
                            }
                            error={error?.message}
                            style={{ backgroundColor: colors.defaultSurface }}
                          />
                        )}
                      </Field>
                    </Box>
                  </Box>
                </Page.Body>
                <PageFooter>
                  <Button accessibilityLabel="Next" disabled={!isValid} onPress={handleSubmit(onNext)} text="Next" />
                </PageFooter>
              </>
            )}
          </Form>
        </TouchOutsideDismissKeyboard>
        <PaySplitConfirmBottomSheet ref={confirmBottomSheet} onConfirm={onDrawerGotIt} />
      </Page>
    </KeyboardAvoidingViewContainer>
  );
};
