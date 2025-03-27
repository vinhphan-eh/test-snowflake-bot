import React from 'react';
import { Box, Typography, useTheme } from '@hero-design/rn';
import { useIntl } from '../../../../../../providers/LocalisationProvider';

interface RecurringSectionBodyProps {
  title: string;
  caption: string;
  onEdit: () => void;
}

export const RecurringSectionBody = ({ caption, onEdit, title }: RecurringSectionBodyProps) => {
  const { formatMessage } = useIntl();
  const { space } = useTheme();

  return (
    <>
      <Typography.Body variant="small-bold" intent="secondary">
        {formatMessage({ id: 'instapay.scheduling.options.byAmount.subscribed.recurringPaymentSetTo' })}
      </Typography.Body>
      <Box marginVertical="medium" flexDirection="row" justifyContent="space-between">
        <Box flex={1}>
          <Typography.Body>{title}</Typography.Body>
          <Typography.Caption
            intent="subdued"
            style={{
              marginTop: space.xsmall,
            }}
          >
            {caption}
          </Typography.Caption>
        </Box>
        <Box alignItems="center" justifyContent="center">
          <Typography.Body
            testID="recurring-section-subscription-edit"
            variant="regular-bold"
            onPress={onEdit}
            intent="primary"
          >
            {formatMessage({ id: 'common.edit' })}
          </Typography.Body>
        </Box>
      </Box>
    </>
  );
};
