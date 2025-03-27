import React from 'react';
import { Box, Select, useTheme } from '@hero-design/rn';
import type { BoxProps } from '@hero-design/rn/types/components/Box';
import type { Control, RegisterOptions } from 'react-hook-form';
import { Field } from '../../../common/components/form';
import { STATE_SELECTION_OPTIONS, UK_REGION_OPTIONS } from '../../../common/constants/states';
import { stateRegex } from '../../../common/validations';
import type { SupportedRegionCode } from '../../../providers/LocalisationProvider/constants';
import { Region } from '../../../providers/LocalisationProvider/constants';
import type { FormInput } from '../screens/EditResidentialAddressManualScreen';

const stateRule: RegisterOptions = {
  pattern: {
    value: stateRegex,
    message: 'Invalid state',
  },
};

type StateRegionInputProps = {
  label: string;
  currentRegion: SupportedRegionCode;
  control: Control<FormInput, unknown>;
} & BoxProps;

export const StateRegionInput = ({ control, currentRegion, label, marginRight }: StateRegionInputProps) => {
  const { colors, space } = useTheme();

  const getRegionOptions = () => {
    switch (currentRegion) {
      case Region.gb:
        return UK_REGION_OPTIONS;
      default:
        return STATE_SELECTION_OPTIONS;
    }
  };

  return (
    <Box accessibilityLabel="region-input-container" marginRight={marginRight} flex={1}>
      <Field control={control} name="region" label={label} isRequired rules={stateRule}>
        {({ field, fieldState: { error } }) => (
          <Select
            options={getRegionOptions()}
            value={field.value}
            onConfirm={value => {
              if (value) {
                field.onChange(value);
              }
            }}
            testID="region-input"
            keyExtractor={opt => opt.value}
            label={field.label ?? ''}
            required={field.isRequired}
            error={error?.message}
            style={{ backgroundColor: colors.defaultGlobalSurface, marginBottom: space.smallMedium }}
          />
        )}
      </Field>
    </Box>
  );
};
