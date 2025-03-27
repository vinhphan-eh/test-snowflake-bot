import React from 'react';
import { Box, Select, Typography, useTheme } from '@hero-design/rn';
import { capitalize } from '../../../../../common/utils/string';
import type { RecurringByDayPayCycle } from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';

const PayCycleSelection = ({
  onSelect,
  options,
  selectedValue,
}: {
  onSelect: (v: RecurringByDayPayCycle) => void;
  selectedValue?: RecurringByDayPayCycle;
  options?: { text: string; value: RecurringByDayPayCycle }[];
}) => {
  const { space } = useTheme();
  const { formatMessage } = useIntl();

  if (!options) {
    return null;
  }

  return (
    <>
      <Typography.Title style={{ marginTop: space.medium }} level="h5" typeface="playful">
        {formatMessage({ id: 'instapay.scheduling.byDaySubscription.payCycleOption.title' })}
      </Typography.Title>

      <Select
        options={options}
        value={selectedValue}
        testID="pay-cycle-selection"
        onConfirm={v => v && onSelect(v)}
        label=""
        keyExtractor={opt => opt.value}
        bottomSheetConfig={{
          header: formatMessage({ id: 'instapay.scheduling.byDaySubscription.payCycleOption.title' }),
        }}
        renderSelectedValue={v => (
          <Box flex={1} flexDirection="row" justifyContent="space-between">
            <Typography.Body variant="regular-bold">
              {capitalize(options.find(o => o.value === v)?.text ?? '')}
            </Typography.Body>
          </Box>
        )}
      />
    </>
  );
};

export default PayCycleSelection;
