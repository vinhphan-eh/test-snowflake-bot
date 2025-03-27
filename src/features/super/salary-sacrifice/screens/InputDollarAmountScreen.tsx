import React from 'react';
import { Box, Typography, useTheme, Button, Checkbox } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RegisterOptions } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CurrencyInput } from '../../../../common/components/currency-input';
import Form, { Field } from '../../../../common/components/form';
import { InlineTextLink } from '../../../../common/components/inline-text-link';
import { KeyboardAvoidingViewContainer } from '../../../../common/components/layout';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../../common/components/touch-dismiss-keyboard';
import { useMixpanel } from '../../../../common/hooks/useMixpanel';
import { useInAppBrowser } from '../../../../common/shared-hooks/useInAppBrowser';
import { CLICK_INPUT_CONTRIBUTION_AMOUNT, SALARY_SACRIFICE_MOBULE_NAME } from '../../constants/trackingEvents';
import { useSubmitSuperContributionStore } from '../../store/useSubmitSuperContributionStore';
import { RELEVANT_LIMITS_LINK, SALARY_SACRIFICE_TITLE } from '../constants';
import type { SacrificeScreenNavigationProp, SalarySacrificeScreenRouteProp } from '../navigation/navigationTypes';

export interface FormInput {
  contributionValue: string;
  acknowledgedNoContributionTracking: boolean;
}

export const inputDollarAmountRule: RegisterOptions = {
  min: { value: 1, message: 'Must be greater than 0' },
};

export const InputDollarAmountScreen = () => {
  const { colors, space } = useTheme();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { eventTracking } = useMixpanel();
  const { openUrl } = useInAppBrowser();

  const navigation = useNavigation<SacrificeScreenNavigationProp<'ContributedOption'>>();
  const route = useRoute<SalarySacrificeScreenRouteProp<'ContributedOption'>>();
  const screenTitle = route?.params.title;
  const trackingAttributes = route?.params.trackingAttributes;

  const { contributionType, orgNames, setAcknowledgedNoContributionTracking, setContributionValue } =
    useSubmitSuperContributionStore();

  const onPressNext = (data: FormInput) => {
    setContributionValue(data.contributionValue);
    setAcknowledgedNoContributionTracking(data.acknowledgedNoContributionTracking);
    navigation.navigate('PreservedEarning', { title: SALARY_SACRIFICE_TITLE, trackingAttributes });

    eventTracking({
      event: CLICK_INPUT_CONTRIBUTION_AMOUNT,
      categoryName: 'user action',
      metaData: {
        module: SALARY_SACRIFICE_MOBULE_NAME,
        contributionType,
        contributionAmount: Number(data.contributionValue),
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
            <Page.TopBar hideRight onBack={navigation.goBack} title={screenTitle} />
            <Page style={{ paddingBottom: bottomInset }}>
              <Page.Title testID="input-dollar-amount-page-title-id">
                How much of your pay would you like to contribute?
              </Page.Title>

              <Page.Body>
                <Typography.Body variant="regular" style={{ marginBottom: space.medium }}>
                  {`Enter a dollar amount to contribute to your super each time you get paid by ${orgNames}. It will show up as a line item on your payslip called ‘Pre-tax salary sacrifice’.`}
                </Typography.Body>
                <Typography.Body variant="regular" style={{ marginBottom: space.medium }}>
                  This amount will be counted as a concessional contribution and be subject to any{' '}
                  <InlineTextLink
                    variant="regular"
                    testID="inline-link-text"
                    onPress={() => openUrl(RELEVANT_LIMITS_LINK)}
                  >
                    relevant limits
                  </InlineTextLink>
                  . You should seek financial advice before contributing any amount.
                </Typography.Body>

                <Field
                  control={control}
                  name="contributionValue"
                  rules={inputDollarAmountRule}
                  isRequired
                  label="Contribution amount"
                >
                  {({ field, fieldState: { error } }) => (
                    <CurrencyInput
                      {...field}
                      value={field.value as string}
                      keyboardType="numeric"
                      placeholder="Contribution amount"
                      onChangeText={field.onChange}
                      required={field.isRequired}
                      testID="salary-sacrifice-dollar-amount-input"
                      error={error?.message}
                      style={{ backgroundColor: colors.defaultGlobalSurface }}
                    />
                  )}
                </Field>
              </Page.Body>

              <Page.Footer>
                <Field control={control} name="acknowledgedNoContributionTracking" isRequired>
                  {({ field }) => (
                    <Checkbox
                      checked={field.value as boolean}
                      style={{ marginTop: space.small }}
                      onPress={() => field.onChange(!field.value)}
                      testID="acknowledge-check-box"
                      description="I acknowledge that Employment Hero does not track the total of my contributions, and I am obliged to monitor my contribution amounts in compliance with ATO limits."
                    />
                  )}
                </Field>
                <Box marginTop="medium">
                  <Button
                    testID="input-dollar-amount-next-button"
                    onPress={handleSubmit(onPressNext)}
                    disabled={!isValid}
                    text="Next"
                    intent="primary"
                    accessibilityLabel="Next"
                  />
                </Box>
              </Page.Footer>
            </Page>
          </KeyboardAvoidingViewContainer>
        )}
      </Form>
    </TouchOutsideDismissKeyboard>
  );
};
