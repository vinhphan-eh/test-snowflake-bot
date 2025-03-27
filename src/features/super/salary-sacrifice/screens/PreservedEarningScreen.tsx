import React, { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Typography, useTheme, Button, Icon } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { CurrencyInput } from '../../../../common/components/currency-input';
import Form, { Field } from '../../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../../common/components/layout';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../../common/components/touch-dismiss-keyboard';
import { GOV_EARLY_ACCESS_SUPER_LINK } from '../../../../common/constants/links';
import { useMixpanel } from '../../../../common/hooks/useMixpanel';
import { useInAppBrowser } from '../../../../common/shared-hooks/useInAppBrowser';
import { CLICK_INPUT_PRESERVE_AMOUNT, SALARY_SACRIFICE_MOBULE_NAME } from '../../constants/trackingEvents';
import { useSubmitSuperContributionStore } from '../../store/useSubmitSuperContributionStore';
import { PreservedPayWorkBottomSheet } from '../components/PreservedPayWorkBottomSheet';
import { SALARY_SACRIFICE_TITLE } from '../constants';
import type { SacrificeScreenNavigationProp, SalarySacrificeScreenRouteProp } from '../navigation/navigationTypes';

interface FormInput {
  preserveAmount: string;
}

export const PreservedEarningScreen = () => {
  const { colors, space } = useTheme();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { eventTracking } = useMixpanel();
  const { openUrl } = useInAppBrowser();
  const questionBsRef = useRef<BottomSheetRef>(null);

  const navigation = useNavigation<SacrificeScreenNavigationProp<'PreservedEarning'>>();
  const route = useRoute<SalarySacrificeScreenRouteProp<'PreservedEarning'>>();
  const screenTitle = route?.params.title;
  const trackingAttributes = route?.params.trackingAttributes;

  const { setPreserveAmount } = useSubmitSuperContributionStore();

  const onPressNext = (data: FormInput) => {
    setPreserveAmount(data.preserveAmount);
    navigation.navigate('StartAndStopContribution', {
      title: SALARY_SACRIFICE_TITLE,
      trackingAttributes,
    });

    eventTracking({
      event: CLICK_INPUT_PRESERVE_AMOUNT,
      categoryName: 'user action',
      metaData: {
        module: SALARY_SACRIFICE_MOBULE_NAME,
        preserveAmount: Number(data.preserveAmount),
        trackingAttributes,
      },
    });
  };

  const onPressSkip = () => {
    setPreserveAmount('0');
    navigation.navigate('StartAndStopContribution', {
      title: SALARY_SACRIFICE_TITLE,
      trackingAttributes,
    });

    eventTracking({
      event: CLICK_INPUT_PRESERVE_AMOUNT,
      categoryName: 'user action',
      metaData: {
        module: SALARY_SACRIFICE_MOBULE_NAME,
        preserveAmount: 0,
        trackingAttributes,
      },
    });
  };

  return (
    <TouchOutsideDismissKeyboard>
      <Form<FormInput> mode="onChange">
        {({ control, formState: { isValid }, handleSubmit }) => (
          <KeyboardAvoidingViewContainer>
            <CustomStatusBar />
            <Page.TopBar
              onBack={navigation.goBack}
              title={screenTitle}
              customRight={() => (
                <Typography.Body
                  variant="regular-bold"
                  intent="primary"
                  testID="skip-preserve-amount-btn"
                  style={{
                    textDecorationLine: 'none',
                    marginTop: space.medium,
                    marginBottom: space.small,
                  }}
                  onPress={onPressSkip}
                >
                  Skip
                </Typography.Body>
              )}
            />
            <Page style={{ paddingBottom: bottomInset }}>
              <Page.Title>Want a safety net? Reserve part of your pay.</Page.Title>
              <Page.Body>
                <Typography.Body
                  variant="regular"
                  testID="preserve-content-text-id"
                  style={{ marginBottom: space.medium }}
                >
                  Salary sacrificing super will reduce your take-home pay and you can only access your super early in{' '}
                  <Typography.Body
                    variant="regular"
                    style={{ textDecorationLine: 'underline' }}
                    onPress={() => openUrl(GOV_EARLY_ACCESS_SUPER_LINK)}
                  >
                    very limited circumstances
                  </Typography.Body>
                  {` To avoid being caught out, you can specify a reserve amount for your net earnings (i.e your post-tax and -deductions salary) below.

If your take-home pay (including the salary sacrifice) is less than the reserve amount in any given pay cycle, the salary sacrifice will be skipped for that pay cycle.`}
                </Typography.Body>

                <Field label="Preserve amount" control={control} name="preserveAmount" isRequired>
                  {({ field, fieldState: { error } }) => (
                    <CurrencyInput
                      {...field}
                      suffix={
                        <TouchableOpacity onPress={() => questionBsRef.current?.open()}>
                          <Icon icon="circle-question-outlined" size="small" testID="reference-tooltip" />
                        </TouchableOpacity>
                      }
                      keyboardType="numeric"
                      placeholder="Amount"
                      testID="salary-sacrifice-preserve-amount-input"
                      onChangeText={field.onChange}
                      required={field.isRequired}
                      error={error?.message}
                      style={{ backgroundColor: colors.defaultSurface }}
                    />
                  )}
                </Field>
              </Page.Body>

              <Page.Footer>
                <Box marginTop="medium">
                  <Button
                    testID="preserve-next-button"
                    onPress={handleSubmit(onPressNext)}
                    disabled={!isValid}
                    text="Next"
                    intent="primary"
                    accessibilityLabel="Next"
                  />
                </Box>
              </Page.Footer>

              <PreservedPayWorkBottomSheet bsRef={questionBsRef} />
            </Page>
          </KeyboardAvoidingViewContainer>
        )}
      </Form>
    </TouchOutsideDismissKeyboard>
  );
};
