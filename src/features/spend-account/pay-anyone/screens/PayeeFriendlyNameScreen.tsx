import React from 'react';
import { Button, TextInput, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Form, { Field } from '../../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../../common/components/layout';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../../common/components/touch-dismiss-keyboard';
import { useRegionLocalisation } from '../../../../providers/LocalisationProvider';
import type { PayAnyoneScreenNavigationProp } from '../navigation/navigationTypes';
import { usePayAnyoneStore } from '../stores/usePayAnyoneStore';

interface FormInput {
  friendlyName: string;
}

export const PayeeFriendlyNameScreen = () => {
  const navigation = useNavigation<PayAnyoneScreenNavigationProp<'PayeeFriendlyName'>>();
  const { setPayeeFriendlyName } = usePayAnyoneStore();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { colors, space } = useTheme();

  const { formatMessage } = useRegionLocalisation();

  const onNext = (data: FormInput) => {
    setPayeeFriendlyName(data.friendlyName);
    navigation.navigate('PaymentDetails');
  };

  return (
    <TouchOutsideDismissKeyboard>
      <Form<FormInput> mode="onChange">
        {({ control, formState: { isValid }, handleSubmit }) => (
          <KeyboardAvoidingViewContainer>
            <CustomStatusBar />
            <Page.TopBar
              onBack={navigation.goBack}
              hideRight
              title={formatMessage({ id: 'pay-anyone.payeeDetails.savePayee.header' })}
            />
            <Page keyboardShouldPersistTaps="handled" style={{ paddingBottom: bottomInset }} testID="payeeDetailsPage">
              <Page.Title>{formatMessage({ id: 'pay-anyone.payeeDetails.savePayee.title' })}</Page.Title>
              <Page.Body marginBottom="xlarge">
                <Field
                  control={control}
                  name="friendlyName"
                  label={formatMessage({ id: 'pay-anyone.payeeDetails.friendlyName' })}
                  isRequired
                >
                  {({ field, fieldState: { error } }) => (
                    <TextInput
                      autoComplete="off"
                      maxLength={250}
                      onChangeText={field.onChange}
                      required={field.isRequired}
                      testID="friendlyName-input"
                      error={error?.message}
                      {...field}
                      style={{ marginBottom: space.smallMedium, backgroundColor: colors.defaultGlobalSurface }}
                    />
                  )}
                </Field>
              </Page.Body>
              <Page.Footer>
                <Button
                  text="Next"
                  accessibilityLabel="Next"
                  testID="next-on-payee-friendly-name"
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
