import React, { useState } from 'react';
import { Box, Button, TextInput, useTheme } from '@hero-design/rn';
import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
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
import type { ResidentialAddress } from '../../onboarding/stores/useOnboardingStore';
import { PostcodeInput } from '../detail-inputs/PostcodeInput';
import { StateRegionInput } from '../detail-inputs/StateRegionInput';
import type { EditFormsNavigationProp, EditFormsStackParamList } from '../navigation/navigationType';

export interface FormInput {
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

export const EditResidentialAddressManualScreen = () => {
  const navigation = useNavigation<EditFormsNavigationProp<'EditResidentialAddressManual'>>();
  const {
    params: { pageTitle, residentialAddress = {} as ResidentialAddress, updateCallback },
  } = useRoute<RouteProp<EditFormsStackParamList, 'EditResidentialAddressManual'>>();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { colors, space } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { currentRegion, formatMessage } = useRegionLocalisation();

  const getAddressLine = (data: FormInput) => {
    if (data) {
      return `${data.unitNumber ? data.unitNumber.concat('/') : ''}${data.streetNumber} ${data.streetName} ${
        data.streetType
      }`;
    }
    return '';
  };

  const onSubmit = async (data: FormInput) => {
    setIsLoading(true);
    await updateCallback?.({ ...data, longForm: getAddressLine(data) }).finally(() => {
      setIsLoading(false);
    });
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
            <CustomStatusBar backgroundColor={colors.defaultGlobalSurface} />
            <Page.TopBar
              backgroundColor="defaultGlobalSurface"
              onRightPress={navigation.goBack}
              hideLeft
              title="Edit"
            />
            <TouchOutsideDismissKeyboard>
              <Page
                keyboardShouldPersistTaps="handled"
                style={{ backgroundColor: colors.defaultGlobalSurface, paddingBottom: bottomInset }}
              >
                <Page.Title>{pageTitle || 'Residential address'}</Page.Title>
                <Page.Body>
                  <Box flexDirection="row">
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
                    text="Save"
                    testID="manual-address-btn-save"
                    accessibilityLabel="Save"
                    disabled={!isValid}
                    onPress={handleSubmit(onSubmit)}
                    loading={isLoading}
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
