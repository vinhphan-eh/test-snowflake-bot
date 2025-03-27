import React from 'react';
import { Box, Button, TextInput, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import type { Control, RegisterOptions } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Form, { Field } from '../../../common/components/form';
import { KeyboardAvoidingViewContainer } from '../../../common/components/layout';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import TouchOutsideDismissKeyboard from '../../../common/components/touch-dismiss-keyboard';
import { addressRegex, suburbRegex } from '../../../common/validations';
import { useRegionLocalisation } from '../../../providers/LocalisationProvider';
import { Region } from '../../../providers/LocalisationProvider/constants';
import { PostcodeInput } from '../../edit-forms/detail-inputs/PostcodeInput';
import { StateRegionInput } from '../../edit-forms/detail-inputs/StateRegionInput';
import type { OnboardingScreenNavigationProp } from '../navigation/navigationTypes';
import { useOnboardingStore } from '../stores/useOnboardingStore';

interface FormInput {
  unitNumber: string;
  streetNumber: string;
  streetName: string;
  streetType: string;
  townOrCity: string;
  region: string;
  postcode: string;
}

const suburbRule: RegisterOptions = {
  pattern: { value: suburbRegex, message: 'Field cannot contain special symbols and numbers' },
};

const addressRule: RegisterOptions = {
  pattern: { value: addressRegex, message: 'Field cannot contain special symbols' },
};

const ProfileResidentialAddressManualScreen = () => {
  const setPersonalDetails = useOnboardingStore(state => state.setPersonalDetails);
  const residentialAddress = useOnboardingStore(state => state.personalDetails.residentialAddress);
  const getNextProfileInputPage = useOnboardingStore(state => state.getNextProfileInputPage);
  const navigation = useNavigation<OnboardingScreenNavigationProp<'ProfileResidentialAddress'>>();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { colors, space } = useTheme();
  const { currentRegion, formatMessage } = useRegionLocalisation();

  const getAddressLine = (data: FormInput) => {
    if (data) {
      return `${data.unitNumber ? data.unitNumber.concat('/') : ''}${data.streetNumber} ${data.streetName} ${
        data.streetType
      }`;
    }
    return '';
  };

  const onSubmit = (data: FormInput) => {
    setPersonalDetails({
      residentialAddress: { ...data, longForm: getAddressLine(data) },
    });

    navigation.navigate(getNextProfileInputPage('ProfileResidentialAddress'));
  };

  const goBack = () => {
    navigation.goBack();
  };

  const renderRegionAndPostcode = (control: Control<FormInput, unknown>) => {
    const regionLabel = formatMessage({ id: 'residentalAddress.region' });

    switch (currentRegion) {
      case Region.gb:
        return (
          <>
            <StateRegionInput label={regionLabel} currentRegion={currentRegion} control={control} />
            <PostcodeInput currentRegion={currentRegion} control={control} maxLength={8} />
          </>
        );
      default:
        return (
          <Box flexDirection="row">
            <StateRegionInput
              label={regionLabel}
              currentRegion={currentRegion ?? 'AU'}
              control={control}
              marginRight="medium"
            />
            <PostcodeInput
              currentRegion={currentRegion ?? 'AU'}
              keyboardType="numeric"
              control={control}
              maxLength={4}
            />
          </Box>
        );
    }
  };

  return (
    <Form<FormInput>
      mode="onChange"
      defaultValues={{
        unitNumber: residentialAddress.unitNumber,
        streetNumber: residentialAddress.streetNumber,
        streetName: residentialAddress.streetName,
        streetType: residentialAddress.streetType,
        townOrCity: residentialAddress.townOrCity,
        region: residentialAddress.region,
        postcode: residentialAddress.postcode,
      }}
    >
      {({ control, formState: { isValid }, handleSubmit }) => (
        <KeyboardAvoidingViewContainer>
          <>
            <CustomStatusBar />
            <Page.TopBar onBack={goBack} hideRight title="Personal details" />
            <TouchOutsideDismissKeyboard>
              <Page keyboardShouldPersistTaps="handled" style={{ paddingBottom: bottomInset }}>
                <Page.Title>{`What's your address?`}</Page.Title>
                <Page.Body>
                  <Box paddingRight="smallMedium">
                    <Typography.Body variant="regular">
                      {`Enter your address exactly as shown on your drivers licence or official documentation. (eg: 'st' for street)`}
                    </Typography.Body>
                  </Box>
                  <Box flexDirection="row" marginTop="xlarge">
                    <Box marginRight="medium" flex={1}>
                      <Field control={control} name="unitNumber" label="Unit number" rules={addressRule}>
                        {({ field, fieldState: { error } }) => (
                          <TextInput
                            autoComplete="off"
                            maxLength={50}
                            accessibilityLabel="Unit number"
                            onChangeText={field.onChange}
                            testID="unitNumber"
                            error={error?.message}
                            {...field}
                            style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.smallMedium }}
                          />
                        )}
                      </Field>
                    </Box>
                    <Box flex={1}>
                      <Field control={control} name="streetNumber" label="Street number" isRequired rules={addressRule}>
                        {({ field, fieldState: { error } }) => (
                          <TextInput
                            autoComplete="off"
                            maxLength={50}
                            accessibilityLabel="Street number"
                            testID="streetNumber"
                            error={error?.message}
                            onChangeText={field.onChange}
                            required={field.isRequired}
                            {...field}
                            style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.smallMedium }}
                          />
                        )}
                      </Field>
                    </Box>
                  </Box>
                  <Box>
                    <Field control={control} name="streetName" label="Street name" isRequired rules={addressRule}>
                      {({ field, fieldState: { error } }) => (
                        <TextInput
                          autoComplete="off"
                          maxLength={50}
                          accessibilityLabel="Street name"
                          testID="streetName"
                          error={error?.message}
                          onChangeText={field.onChange}
                          required={field.isRequired}
                          {...field}
                          style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.smallMedium }}
                        />
                      )}
                    </Field>
                  </Box>
                  <Box>
                    <Field control={control} name="streetType" label="Street type" isRequired rules={addressRule}>
                      {({ field, fieldState: { error } }) => (
                        <TextInput
                          autoComplete="off"
                          maxLength={50}
                          accessibilityLabel="Street type"
                          testID="streetType"
                          error={error?.message}
                          onChangeText={field.onChange}
                          required={field.isRequired}
                          {...field}
                          style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.smallMedium }}
                        />
                      )}
                    </Field>
                  </Box>
                  <Field
                    control={control}
                    name="townOrCity"
                    label={formatMessage({ id: 'residentalAddress.townOrCity' })}
                    isRequired
                    rules={suburbRule}
                  >
                    {({ field, fieldState: { error } }) => (
                      <TextInput
                        autoComplete="off"
                        maxLength={250}
                        accessibilityLabel="Suburb"
                        testID="townOrCity"
                        error={error?.message}
                        onChangeText={field.onChange}
                        required={field.isRequired}
                        {...field}
                        style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.smallMedium }}
                      />
                    )}
                  </Field>
                  {renderRegionAndPostcode(control)}
                </Page.Body>
                <Page.Footer marginVertical="medium">
                  <Button
                    text="Next"
                    testID="address-btn-next"
                    accessibilityLabel="Next"
                    disabled={!isValid}
                    onPress={handleSubmit(onSubmit)}
                  />
                </Page.Footer>
              </Page>
            </TouchOutsideDismissKeyboard>
          </>
        </KeyboardAvoidingViewContainer>
      )}
    </Form>
  );
};

export { ProfileResidentialAddressManualScreen };
