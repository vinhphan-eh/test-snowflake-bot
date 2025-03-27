import React from 'react';
import { List } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAvoidingViewContainer } from '../../../../common/components/layout';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../../common/components/touch-dismiss-keyboard';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import type { PayAnyoneScreenNavigationProp } from '../navigation/navigationTypes';
import { PaymentType, usePayAnyoneStore } from '../stores/usePayAnyoneStore';

const PaymentTypeScreen = () => {
  const navigation = useNavigation<PayAnyoneScreenNavigationProp<'PaymentType'>>();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const setPaymentType = usePayAnyoneStore(state => state.setPaymentType);
  const scheduledPaymentPermission = usePermissionStore(state => state.permissions?.eBenMoneyScheduledPayment?.view);

  const onNext = (type: `${PaymentType}`) => {
    setPaymentType(type);

    switch (type) {
      case PaymentType.LATER:
        navigation.navigate('PaymentLater');
        break;
      case PaymentType.RECURRING:
        navigation.navigate('PaymentRecurring');
        break;
      default:
        navigation.navigate('PaymentConfirmation');
        break;
    }
  };

  return (
    <TouchOutsideDismissKeyboard>
      <KeyboardAvoidingViewContainer>
        <CustomStatusBar />
        <Page.TopBar onBack={navigation.goBack} hideRight title="Pay" />
        <Page keyboardShouldPersistTaps="handled" style={{ paddingBottom: bottomInset }}>
          <Page.Title>When do you want to send?</Page.Title>
          <Page.Body justifyContent="flex-end">
            <List.Item
              variant="card"
              style={{ marginTop: 20 }}
              onPress={() => onNext('NOW')}
              title="Now"
              testID="option-payment-now"
              suffix="arrow-right"
            />
            {scheduledPaymentPermission && (
              <>
                <List.Item
                  variant="card"
                  style={{ marginTop: 20 }}
                  onPress={() => onNext('LATER')}
                  title="Later"
                  testID="option-payment-later"
                  suffix="arrow-right"
                />
                <List.Item
                  variant="card"
                  style={{ marginTop: 20 }}
                  onPress={() => onNext('RECURRING')}
                  title="Recurring"
                  testID="option-payment-recurring"
                  suffix="arrow-right"
                />
              </>
            )}
          </Page.Body>
        </Page>
      </KeyboardAvoidingViewContainer>
    </TouchOutsideDismissKeyboard>
  );
};

export { PaymentTypeScreen };
