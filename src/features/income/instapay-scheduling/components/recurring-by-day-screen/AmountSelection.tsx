import React from 'react';
import { Box, Select, Typography, useTheme } from '@hero-design/rn';
import { useIntl } from '../../../../../providers/LocalisationProvider';

const AmountSelection = ({
  onSelect,
  options,
  selectedValue,
}: {
  onSelect: (v: string) => void;
  selectedValue: string;
  options: Array<{ text: string; value: string }>;
}) => {
  const { formatMessage } = useIntl();
  const { space } = useTheme();

  const getText = (value: string) => options.find(o => o.value === value)?.text;
  return (
    <>
      <Typography.Title style={{ marginTop: space.large }} level="h5" typeface="playful">
        {formatMessage({ id: 'instapay.scheduling.byDaySubscription.amountOption.title' })}
      </Typography.Title>
      <Select
        options={options}
        value={selectedValue || options[0].value}
        onConfirm={v => v && onSelect(v)}
        label=""
        bottomSheetConfig={{
          header: formatMessage({ id: 'instapay.scheduling.byDaySubscription.amountOption.title' }),
        }}
        testID="amount-selection"
        keyExtractor={opt => opt.value}
        renderSelectedValue={(v: string | null) => {
          return (
            <Box>
              <Typography.Body variant="regular-bold" style={{ marginBottom: space.small }}>
                {v && getText(v)}
              </Typography.Body>
              <Typography.Caption intent="subdued">
                {formatMessage({ id: 'instapay.scheduling.byDaySubscription.amountOption.selectionDescription' })}
              </Typography.Caption>
            </Box>
          );
        }}
      />
    </>
  );
};

export default AmountSelection;
