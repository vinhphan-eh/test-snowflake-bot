import React, { useEffect, useState } from 'react';
import { Box, FAB, TextInput, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import type { RegisterOptions } from 'react-hook-form';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import Form, { Field } from '../../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../../common/components/layout';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../../common/components/touch-dismiss-keyboard';
import { useDetectVisibleKeyboard } from '../../../../common/shared-hooks/useDetectVisibleKeyboard';
import { nameRegex } from '../../../../common/validations';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { PayeeList } from '../components/PayeeList';
import type { PayAnyoneScreenNavigationProp } from '../navigation/navigationTypes';

interface FormInput {
  searchQuery: string;
}

const alphaWordRule: RegisterOptions = {
  pattern: { value: nameRegex, message: 'Field cannot contain numbers or special characters' },
};

const PayeeAddressBookScreen = () => {
  const navigation = useNavigation<PayAnyoneScreenNavigationProp<'PayeeAddressBook'>>();
  const { colors, space } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pageTitleOriginalHeight, setPageTitleOriginalHeight] = useState<number>(0);
  const Intl = useIntl();
  const isKeyboardVisible = useDetectVisibleKeyboard();
  const sharedValueMargin = useSharedValue<number>(0);
  const sharedValueOpacity = useSharedValue<number>(1);
  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      marginTop: -sharedValueMargin.value,
      opacity: sharedValueOpacity.value,
    };
  });

  const navigateToNewPayeeFlow = () => {
    navigation.navigate('NewPayee');
  };

  const identifySharedValue = () => {
    if (isKeyboardVisible || searchQuery) {
      return {
        margin: withTiming(pageTitleOriginalHeight),
        opacity: withTiming(0, { duration: 200 }),
      };
    }

    return {
      margin: withTiming(0),
      opacity: withDelay(50, withTiming(1)),
    };
  };

  useEffect(() => {
    if (pageTitleOriginalHeight) {
      const { margin, opacity } = identifySharedValue();
      sharedValueMargin.value = margin;
      sharedValueOpacity.value = opacity;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isKeyboardVisible]);

  return (
    <TouchOutsideDismissKeyboard>
      <>
        <Form<FormInput> mode="onChange">
          {({ control }) => (
            <KeyboardAvoidingViewContainer>
              <CustomStatusBar />
              <Page.TopBar
                style={{
                  zIndex: 1,
                }}
                onBack={navigation.goBack}
                hideRight
                title="Pay"
              />
              <Animated.View
                style={[
                  {
                    marginTop: -sharedValueMargin.value,
                    opacity: sharedValueOpacity.value,
                  },
                  animatedContentStyle,
                ]}
              >
                <Page.Title
                  onLayout={e => {
                    if (!pageTitleOriginalHeight) {
                      // Only set the height on first layout
                      setPageTitleOriginalHeight(e.nativeEvent.layout.height);
                    }
                  }}
                  style={{
                    paddingHorizontal: space.medium,
                    paddingVertical: space.large,
                    backgroundColor: colors.defaultGlobalSurface,
                  }}
                >
                  {Intl.formatMessage({ id: 'payeeAddress.header' })}
                </Page.Title>
              </Animated.View>
              <Page.Body
                paddingBottom="xlarge"
                style={{
                  backgroundColor: colors.defaultGlobalSurface,
                }}
              >
                <Box paddingHorizontal="medium">
                  <Field
                    control={control}
                    name="searchQuery"
                    label={Intl.formatMessage({ id: 'payeeAddress.search' })}
                    rules={alphaWordRule}
                  >
                    {({ field, fieldState: { error } }) => (
                      <TextInput
                        autoComplete="off"
                        hideCharacterCount
                        onChangeText={setSearchQuery}
                        required={field.isRequired}
                        testID="searchQuery-input"
                        error={error?.message}
                        suffix="search-outlined"
                        {...field}
                        style={{ marginBottom: space.smallMedium }}
                        value={searchQuery}
                      />
                    )}
                  </Field>
                </Box>
                <PayeeList searchQuery={searchQuery} />
              </Page.Body>
            </KeyboardAvoidingViewContainer>
          )}
        </Form>

        <FAB
          style={{
            position: 'absolute',
            bottom: space['5xlarge'],
            right: space.medium,
            display: isKeyboardVisible ? 'none' : 'flex',
          }}
          icon="add"
          onPress={navigateToNewPayeeFlow}
          testID="add-payee-fab"
        />
      </>
    </TouchOutsideDismissKeyboard>
  );
};

export { PayeeAddressBookScreen };
