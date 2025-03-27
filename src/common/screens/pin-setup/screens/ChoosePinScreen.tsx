import React, { useRef, useState } from 'react';
import { InteractionManager } from 'react-native';
import { Box, Button, PinInput, useTheme } from '@hero-design/rn';
import type { PinInputHandler } from '@hero-design/rn/types/components/PinInput';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAvoidingViewContainer } from '../../../components/layout';
import { Page } from '../../../components/layout/page';
import { CustomStatusBar } from '../../../components/status-bar/CustomStatusBar';
import { bannedPinList } from '../../../validations';
import type { PinSetupScreenNavigationProp, PinSetupScreenRouteProp } from '../navigation/navigationType';
import { usePinSetup } from '../stores/usePinSetup';

export const ChoosePinScreen = () => {
  const route = useRoute<PinSetupScreenRouteProp<'ChoosePin'>>();
  const navigation = useNavigation<PinSetupScreenNavigationProp<'ChoosePin'>>();
  const setPinStore = usePinSetup(state => state.setPin);
  const { bottom: bottomInset } = useSafeAreaInsets();
  const [showPin, setShowPin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pin, setPin] = useState('');
  const { header, repeatedPinScreen, title } = route.params;
  const { header: repeatHeader, onPinVerifiedSuccess, title: repeatTitle } = repeatedPinScreen;
  const { space } = useTheme();
  const pinInputRef = useRef<PinInputHandler>(null);

  const onSubmit = (newPin: string) => {
    const isInvalid = bannedPinList.includes(newPin);
    if (isInvalid) {
      setErrorMessage('Not a secure PIN. Please enter a new PIN.');
      setPin('');
    } else {
      setErrorMessage('');
      setPinStore(newPin);
      setShowPin(false);
      navigation.navigate('RepeatedPin', { title: repeatTitle, header: repeatHeader, onPinVerifiedSuccess });
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
          <Box alignContent="center" alignItems="center" marginTop="small">
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
    </KeyboardAvoidingViewContainer>
  );
};
