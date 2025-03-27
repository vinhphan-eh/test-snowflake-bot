import React from 'react';
import { DatePicker, Typography, useTheme } from '@hero-design/rn';
import { capitalize } from '../../../../../common/utils/string';
import type { Weekday } from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';

const StartingDateSelection = ({
  errorText,
  onSelect,
  recommendedDay,
  selectedValue,
}: {
  errorText?: string;
  selectedValue?: Date;
  recommendedDay?: Weekday;
  onSelect: (v: Date) => void;
}) => {
  const { space } = useTheme();
  const { formatMessage } = useIntl();

  const today = new Date();
  return (
    <>
      <Typography.Title style={{ marginTop: space.medium }} level="h5" typeface="playful">
        {formatMessage({ id: 'instapay.scheduling.byDaySubscription.startingDateOption.title' })}
      </Typography.Title>
      <DatePicker
        value={selectedValue}
        minDate={today}
        label=""
        confirmLabel="Confirm"
        onChange={onSelect}
        variant="calendar"
        testID="starting-date-selection"
        error={errorText}
      />
      {Boolean(recommendedDay) && (
        <Typography.Caption>
          {formatMessage(
            { id: 'instapay.scheduling.byDaySubscription.startingDateOption.recommendedDay' },
            {
              day: (
                <Typography.Caption intent="primary" fontWeight="semi-bold">
                  {capitalize(recommendedDay ?? '')}
                </Typography.Caption>
              ),
            }
          )}
        </Typography.Caption>
      )}
    </>
  );
};

export default StartingDateSelection;
