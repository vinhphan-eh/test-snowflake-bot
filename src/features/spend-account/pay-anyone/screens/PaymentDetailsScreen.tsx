import React, { useRef } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { Button, Icon, TextInput, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import type { RegisterOptions } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetScrollView } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD } from '../../../../common/components/bottom-sheet/BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from '../../../../common/components/bottom-sheet/useBottomSheetDynamicSnapPoints';
import { CurrencyInput } from '../../../../common/components/currency-input';
import Form, { Field } from '../../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../../common/components/layout';
import { Page } from '../../../../common/components/layout/page';
import { OverlayLoadingScreen } from '../../../../common/components/spinner';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../../common/components/touch-dismiss-keyboard';
import {
  MAXIMUM_TRANSFERRED_AMOUNT_PER_TIME,
  MINIMUM_TRANSFERRED_AMOUNT_PER_TIME,
} from '../../../../common/constants/payment';
import { convertToRawValue, createCurrencyFormatter } from '../../../../common/utils/numbers';
import { payReferenceRegex } from '../../../../common/validations';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useGetSpendAmount } from '../../hooks/useGetSpendAmount';
import type { PayAnyoneScreenNavigationProp } from '../navigation/navigationTypes';
import { usePayAnyoneStore } from '../stores/usePayAnyoneStore';

interface FormInput {
  amount: string;
  description: string;
  reference?: string;
}

const MAXIMUM_DESCRIPTION_LENGTH = 45;
const MAXIMUM_REFERENCE_LENGTH = 35;

const descriptionHelperMessage = (fieldLength?: number) => {
  const currentLength = fieldLength ?? 0;
  return `${currentLength}/${MAXIMUM_DESCRIPTION_LENGTH} characters`;
};

const referenceRule: RegisterOptions = {
  pattern: {
    value: payReferenceRegex,
    message: 'Field cannot contain special characters',
  },
};

const descriptionRule: RegisterOptions = {
  validate: (x: string) => {
    if (x.length > MAXIMUM_DESCRIPTION_LENGTH) {
      return `${descriptionHelperMessage(x.length)}. Description too long.`;
    }
    return true;
  },
};

const referenceDescription =
  'You may be requested by the business or person you are paying (the payee) to enter information in this field to identify your payment. Typically, they will advise you what information to include with your payment. This information will be passed on to the payee.';

const PaymentDetailsScreen = () => {
  const navigation = useNavigation<PayAnyoneScreenNavigationProp<'PaymentDetails'>>();
  const { setPaymentDetails } = usePayAnyoneStore();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { colors, space } = useTheme();
  const bs = useRef<BottomSheetRef>(null);
  const { availableAmount, walletLoading: isLoading } = useGetSpendAmount({ shouldLoadStashes: true });
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
    navigation.navigate('PaymentType');
  };

  const amountRule: RegisterOptions = {
    validate: (e: string) => {
      const num = Number(e);
      if (num < MINIMUM_TRANSFERRED_AMOUNT_PER_TIME) {
        return `Amount must be ${formatCurrency(MINIMUM_TRANSFERRED_AMOUNT_PER_TIME)} or more`;
      }

      if (num > MAXIMUM_TRANSFERRED_AMOUNT_PER_TIME) {
        return `Over limit. Enter amount less than ${formatCurrency(MAXIMUM_TRANSFERRED_AMOUNT_PER_TIME)}`;
      }

      if (num > availableAmount) {
        return 'You do not have enough funds.';
      }

      return true;
    },
  };

  const closeOrShowDescription = (isShow: boolean) => {
    if (isShow) {
      Keyboard.dismiss();
      bs.current?.open();
      return;
    }

    bs.current?.close();
  };

  const {
    animatedContentHeight,
    animatedHandleHeight,
    animatedSnapPoints,
    contentContainerHeightStyle,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(true);
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
                  {formatCurrency(availableAmount)}
                </Typography.Body>
                <Field control={control} name="amount" label="Amount" isRequired rules={amountRule}>
                  {({ field, fieldState: { error } }) => (
                    <CurrencyInput
                      keyboardType="numeric"
                      testID="amount-input"
                      error={error?.message}
                      onChangeText={field.onChange}
                      required={field.isRequired}
                      {...field}
                      style={{ marginBottom: space.smallMedium, backgroundColor: colors.defaultGlobalSurface }}
                    />
                  )}
                </Field>
                <Field control={control} name="description" label="Description" isRequired rules={descriptionRule}>
                  {({ field, fieldState: { error } }) => (
                    <TextInput
                      autoComplete="off"
                      testID="description-input"
                      error={error?.message}
                      helpText={descriptionHelperMessage(field.value?.length)}
                      onChangeText={field.onChange}
                      required={field.isRequired}
                      {...field}
                      style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.smallMedium }}
                    />
                  )}
                </Field>
                <Field control={control} name="reference" label="Reference (optional)" rules={referenceRule}>
                  {({ field, fieldState: { error } }) => (
                    <TextInput
                      autoComplete="off"
                      maxLength={MAXIMUM_REFERENCE_LENGTH}
                      testID="reference-input"
                      onChangeText={field.onChange}
                      required={field.isRequired}
                      suffix={
                        <TouchableOpacity onPress={() => closeOrShowDescription(true)}>
                          <Icon icon="circle-question-outlined" size="small" testID="reference-tooltip" />
                        </TouchableOpacity>
                      }
                      error={error?.message}
                      {...field}
                      style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.smallMedium }}
                    />
                  )}
                </Field>
              </Page.Body>
              <Page.Footer>
                <Button
                  text="Next"
                  testID="payment-details-next"
                  accessibilityLabel="next"
                  disabled={!isValid}
                  onPress={handleSubmit(onNext)}
                />
              </Page.Footer>
              {isLoading && <OverlayLoadingScreen />}
            </Page>
            <BottomSheetWithHD
              ref={bs}
              snapPoints={animatedSnapPoints}
              handleHeight={animatedHandleHeight}
              contentHeight={animatedContentHeight}
              title="What is a reference?"
              actions={[{ title: 'Done', onPress: () => closeOrShowDescription(false) }]}
            >
              <BottomSheetScrollView style={contentContainerHeightStyle} onLayout={handleContentLayout}>
                <Typography.Body
                  variant="regular"
                  testID="ref_description_text"
                  style={{ marginHorizontal: space.large, marginTop: space.small, marginBottom: space.medium }}
                >
                  {referenceDescription}
                </Typography.Body>
              </BottomSheetScrollView>
            </BottomSheetWithHD>
          </KeyboardAvoidingViewContainer>
        )}
      </Form>
    </TouchOutsideDismissKeyboard>
  );
};

export { PaymentDetailsScreen };
