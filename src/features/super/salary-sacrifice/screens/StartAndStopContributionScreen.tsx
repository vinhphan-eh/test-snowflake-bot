import React from 'react';
import { Box, Typography, useTheme, Button, Checkbox, DatePicker } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { FormInput } from './EditSuperContributionScreen';
import Form, { Field } from '../../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../../common/components/layout';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../../common/components/touch-dismiss-keyboard';
import { DISPLAY_FORMAT_FNS } from '../../../../common/constants/date';
import { useSelectStartAndStopContribution } from '../../hooks/useSelectStartAndStopContribution';
import { SALARY_SACRIFICE_TITLE } from '../constants';
import type { SacrificeScreenNavigationProp, SalarySacrificeScreenRouteProp } from '../navigation/navigationTypes';

export const StartAndStopContributionScreen = () => {
  const { colors, space } = useTheme();
  const { bottom: bottomInset } = useSafeAreaInsets();

  const navigation = useNavigation<SacrificeScreenNavigationProp<'StartAndStopContribution'>>();
  const route = useRoute<SalarySacrificeScreenRouteProp<'StartAndStopContribution'>>();
  const screenTitle = route?.params.title;
  const trackingAttributes = route?.params.trackingAttributes;

  const {
    handleOnChangeEndDate,
    handleOnChangeStartDate,
    handleOnPressCheckbox,
    isContributionEnded,
    minEndDate,
    minStartDate,
    setEndDate,
    setStartDate,
  } = useSelectStartAndStopContribution();

  const onPressNext = (data: FormInput) => {
    setStartDate(data.startDate.toISOString());
    if (data.endDate && !isContributionEnded) {
      setEndDate(data.endDate.toISOString());
    }
    navigation.navigate('Review', { title: SALARY_SACRIFICE_TITLE, trackingAttributes });
  };

  return (
    <TouchOutsideDismissKeyboard>
      <Form<FormInput> mode="onChange" defaultValues={{ startDate: minStartDate, endDate: minEndDate }}>
        {({ control, formState: { isValid }, handleSubmit, setValue }) => (
          <KeyboardAvoidingViewContainer>
            <CustomStatusBar />
            <Page.TopBar hideRight onBack={navigation.goBack} title={screenTitle} />
            <Page style={{ paddingBottom: bottomInset }}>
              <Page.Title>When do you want to start and stop your contributions?</Page.Title>

              <Page.Body>
                <Typography.Body variant="regular" style={{ marginBottom: space.medium }}>
                  The earliest you can start is 7 days from today.
                </Typography.Body>

                <Field control={control} isRequired name="startDate" label="Start Date">
                  {({ field }) => (
                    <DatePicker
                      minDate={minStartDate}
                      testID="salary-sacrifice-start-date-input"
                      label={field.label ?? ''}
                      displayFormat={DISPLAY_FORMAT_FNS}
                      confirmLabel="Confirm"
                      value={field.value as Date}
                      required={field.isRequired}
                      onChange={date => handleOnChangeStartDate(date, setValue)}
                      style={{ backgroundColor: colors.defaultGlobalSurface }}
                    />
                  )}
                </Field>

                <Field control={control} name="endDate" label="End Date">
                  {({ field }) => (
                    <DatePicker
                      disabled={isContributionEnded}
                      minDate={minEndDate}
                      testID="salary-sacrifice-end-date-input"
                      label={field.label ?? ''}
                      displayFormat={DISPLAY_FORMAT_FNS}
                      confirmLabel="Confirm"
                      value={field.value as Date}
                      onChange={date => handleOnChangeEndDate(date, setValue)}
                      style={{ backgroundColor: colors.defaultGlobalSurface }}
                    />
                  )}
                </Field>

                <Checkbox
                  style={{ marginTop: space.small }}
                  onPress={handleOnPressCheckbox}
                  checked={isContributionEnded}
                  testID="start-and-stop-contribution-check-box"
                  description="I don't want my contribution to end"
                />
              </Page.Body>

              <Page.Footer>
                <Box marginTop="medium">
                  <Button
                    disabled={!isValid}
                    onPress={handleSubmit(onPressNext)}
                    text="Next"
                    intent="primary"
                    accessibilityLabel="Next"
                    testID="start-and-stop-contribution-next-button"
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
