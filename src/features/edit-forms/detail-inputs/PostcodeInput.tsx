import React from 'react';
import type { KeyboardTypeOptions } from 'react-native';
import { Box, TextInput, useTheme } from '@hero-design/rn';
import type { Control, RegisterOptions } from 'react-hook-form';
import { Field } from '../../../common/components/form';
import { numericRegex, ukPostcodeRegex } from '../../../common/validations';
import type { SupportedRegionCode } from '../../../providers/LocalisationProvider/constants';
import { Region } from '../../../providers/LocalisationProvider/constants';
import type { FormInput } from '../screens/EditResidentialAddressManualScreen';

const postcodeRule: RegisterOptions = {
  pattern: { value: numericRegex, message: 'Field cannot contain words or spaces' },
  minLength: { value: 4, message: 'Postcode must be 4 digits' },
};

const ukPostcodeRule: RegisterOptions = {
  pattern: { value: ukPostcodeRegex, message: 'Invalid UK postcode format' },
};

type PostcodeInputProps = {
  currentRegion: SupportedRegionCode;
  control: Control<FormInput, unknown>;
  keyboardType?: KeyboardTypeOptions;
  maxLength: number;
};

export const PostcodeInput = ({ control, currentRegion, keyboardType, maxLength }: PostcodeInputProps) => {
  const { colors, space } = useTheme();

  const getPostalCodeRule = () => {
    switch (currentRegion) {
      case Region.gb:
        return ukPostcodeRule;
      default:
        return postcodeRule;
    }
  };

  return (
    <Box flex={1}>
      <Field control={control} name="postcode" label="Postcode" isRequired rules={getPostalCodeRule()}>
        {({ field, fieldState: { error } }) => (
          <TextInput
            autoComplete="off"
            maxLength={maxLength}
            accessibilityLabel="Post Code"
            testID="postcode"
            keyboardType={keyboardType ?? 'default'}
            error={error?.message}
            onChangeText={field.onChange}
            required={field.isRequired}
            {...field}
            style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.smallMedium }}
          />
        )}
      </Field>
    </Box>
  );
};
