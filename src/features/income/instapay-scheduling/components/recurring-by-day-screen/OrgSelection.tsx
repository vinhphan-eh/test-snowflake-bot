import React from 'react';
import { Select, Typography, useTheme } from '@hero-design/rn';
import { useIntl } from '../../../../../providers/LocalisationProvider';

const OrgSelection = ({
  onSelect,
  options,
  selectedValue,
}: {
  onSelect: (v: string) => void;
  selectedValue: string | undefined;
  options: { text: string; value: string; disabled: boolean }[];
}) => {
  const { formatMessage } = useIntl();
  const { space } = useTheme();

  return (
    <>
      <Typography.Title style={{ marginBottom: space.small }} level="h5" typeface="playful">
        {formatMessage({ id: 'instapay.scheduling.byDaySubscription.employerOption.title' })}
      </Typography.Title>
      <Select
        options={options}
        value={selectedValue}
        testID="org-selection"
        onConfirm={v => v && onSelect(v)}
        label=""
        keyExtractor={opt => opt.value}
        bottomSheetConfig={{
          header: formatMessage({ id: 'instapay.scheduling.byDaySubscription.employerOption.title' }),
        }}
      />
    </>
  );
};

export default OrgSelection;
