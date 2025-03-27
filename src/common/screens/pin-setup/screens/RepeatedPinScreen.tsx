import React, { useRef, useState } from 'react';
import { InteractionManager } from 'react-native';
import { Box, Button, PinInput, useTheme } from '@hero-design/rn';
import type { PinInputHandler } from '@hero-design/rn/types/components/PinInput';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAvoidingViewContainer } from '../../../components/layout';
import { Page } from '../../../components/layout/page';
import { OverlayLoadingScreen } from '../../../components/spinner';
import { CustomStatusBar } from '../../../components/status-bar/CustomStatusBar';
import type { PinSetupScreenNavigationProp, PinSetupScreenRouteProp } from '../navigation/navigationType';
import { usePinSetup } from '../stores/usePinSetup';

export const RepeatedPinScreen = () => {
  const route = useRoute<PinSetupScreenRouteProp<'RepeatedPin'>>();
  const navigation = useNavigation<PinSetupScreenNavigationProp<'RepeatedPin'>>();
  const pinStore = usePinSetup(state => state.pin);
  const { bottom: bottomInset } = useSafeAreaInsets();
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const { header, onPinVerifiedSuccess, title } = route.params;
  const { space } = useTheme();
  const pinInputRef = useRef<PinInputHandler>(null);

  const onSubmit = (newPin: string) => {
    if (pinStore !== newPin) {
      setErrorMessage('PIN does not match. Please re-enter your new PIN.');
      setPin('');
    } else {
      setErrorMessage('');
      onPinVerifiedSuccess(pinStore, setLoading);
    }
  };

  /**
   * Autofocus on pin input when screen is focus
   */
  useFocusEffect(() => {
    const promise = InteractionManager.runAfterInteractions(() => {
      pinInputRef.current?.focus();
    });

    return promise.cancel;
  });

  return (
    <KeyboardAvoidingViewContainer>
      <CustomStatusBar />
      <Page.TopBar hideRight onBack={navigation.goBack} title={header} />
      <Page keyboardShouldPersistTaps="handled" style={{ paddingBottom: bottomInset }}>
        <Page.Title
          containerTitleStyle={{ style: { minHeight: 130, marginTop: space.large } }}
          style={{ textAlign: 'center', paddingVertical: 0 }}
        >
          {title}
        </Page.Title>
        <Page.Body marginBottom="xlarge">
          <Box alignContent="center" alignItems="center" marginTop="small" testID="repeated-pin-input-wrapper">
            <PinInput
              ref={pinInputRef}
              value={pin}
              onChangeText={setPin}
              onFulfill={onSubmit}
              secure={!showPin}
              error={errorMessage}
              style={{ alignItems: 'center' }}
              testID="pin_input"
            />
          </Box>
        </Page.Body>
        <Page.Footer>
          <Button
            variant="text"
            onPress={() => setShowPin(!showPin)}
            icon={showPin ? 'eye-invisible-outlined' : 'eye-outlined'}
            text={showPin ? 'Hide PIN' : 'Show PIN'}
          />
        </Page.Footer>
      </Page>
      {isLoading && <OverlayLoadingScreen />}
    </KeyboardAvoidingViewContainer>
  );
};
