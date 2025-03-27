import React, { useRef } from 'react';
import type { TextInputProps } from '@hero-design/rn';
import { Box, Button, TextInput, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Form, { Field } from '../../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../../common/components/layout';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../../common/components/touch-dismiss-keyboard';
import { numericRegex } from '../../../../common/validations';
import type { PaySplitConfirmBottomSheetRef } from '../components/PaySplitConfirmBottomSheet';
import { PaySplitConfirmBottomSheet } from '../components/PaySplitConfirmBottomSheet';
import { INPUT_PAY_SPLIT_PERCENTAGE } from '../constants/trackingEvents';
import { usePaySplitFlowStore } from '../hooks/usePaySplitFlowStore';
import { useTrackPaySplitABTesting } from '../hooks/useTrackPaySplitABTesting';
import type { PaySplitScreenNavigationProp } from '../navigation/navigationTypes';

type PercentageInputProps = Omit<TextInputProps, 'suffix' | 'prefix'>;

const PercentageInput = (props: PercentageInputProps) => {
  const showSuffix = !!props.value;

  return (
    <TextInput autoComplete="off" {...props} suffix={showSuffix ? 'percentage' : undefined} keyboardType="numeric" />
  );
};

interface FormInput {
  percentage: string;
}

export const PaySplitPercentageInputScreen = () => {
  const navigation = useNavigation<PaySplitScreenNavigationProp<'PaySplitPercentageInput'>>();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const store = usePaySplitFlowStore();
  const confirmBottomSheet = useRef<PaySplitConfirmBottomSheetRef>(null);
  const { colors } = useTheme();

  const { trackEvent } = useTrackPaySplitABTesting();

  const conConfirmPressed = () => {
    if (store.active) {
      trackEvent(INPUT_PAY_SPLIT_PERCENTAGE, {
        targetOrgId: store.active.membership.orgId,
        targetMemberId: store.active.membership.memberId,
        splitValue: store.active.amount,
      });
    }

    confirmBottomSheet.current?.close();
    store.finishEditing();
    navigation.navigate('PaySplitOrgList');
  };

  const onNextPressed = (data: FormInput) => {
    store.edit({ amount: Number(data.percentage) });
    confirmBottomSheet.current?.open();
  };

  return (
    <KeyboardAvoidingViewContainer>
      <CustomStatusBar />
      <Page.TopBar title="Pay Split" onBack={navigation.goBack} hideRight />
      <TouchOutsideDismissKeyboard>
        <Page style={{ paddingBottom: bottomInset }}>
          <Page.Title>Please enter the % you would like to allocate.</Page.Title>
          <Form<FormInput> mode="onChange">
            {({ control, formState: { isValid }, handleSubmit }) => (
              <>
                <Page.Body>
                  <Box marginVertical="xxsmall">
                    <Field
                      control={control}
                      name="percentage"
                      label="Percentage (maximum 100%)"
                      isRequired
                      rules={{
                        pattern: { value: numericRegex, message: 'Field cannot contain words.' },
                        min: { value: 0, message: 'You have not reached the minimum. Please adjust amount.' },
                        max: { value: 100, message: 'You have exceeded the maximum. Please adjust amount.' },
                      }}
                    >
                      {({ field, fieldState: { error } }) => (
                        <PercentageInput
                          testID="percentage-value-input"
                          accessibilityLabel="Percentage value"
                          error={error?.message}
                          onChangeText={field.onChange}
                          required={field.isRequired}
                          {...field}
                          style={{ backgroundColor: colors.defaultGlobalSurface }}
                        />
                      )}
                    </Field>
                  </Box>
                </Page.Body>
                <Page.Footer>
                  <Button
                    accessibilityLabel="Next"
                    disabled={!isValid}
                    onPress={handleSubmit(onNextPressed)}
                    text="Next"
                  />
                </Page.Footer>
              </>
            )}
          </Form>
        </Page>
      </TouchOutsideDismissKeyboard>
      <PaySplitConfirmBottomSheet onConfirm={conConfirmPressed} ref={confirmBottomSheet} />
    </KeyboardAvoidingViewContainer>
  );
};
