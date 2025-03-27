import React from 'react';
import { Box, Tag } from '@hero-design/rn';
import { OrderStatus } from '../../../../../../new-graphql/generated';
import { useIntl } from '../../../../../../providers/LocalisationProvider';
import type { TagIntent } from '../../../../../bill-management/types';
import { removeSpecialCharacters } from '../../../utils/orders';

const orderStatusToIntent: Record<OrderStatus, TagIntent> = {
  [OrderStatus.CancelAccepted]: 'info',
  [OrderStatus.CancellationPending]: 'warning',
  [OrderStatus.Cancelled]: 'success',
  [OrderStatus.Dispatched]: 'info',
  [OrderStatus.Fulfilled]: 'success',
  [OrderStatus.PaymentFailed]: 'danger',
  [OrderStatus.PaymentPending]: 'warning',
  [OrderStatus.Processing]: 'warning',
  [OrderStatus.ProcessingFailed]: 'danger',
  [OrderStatus.RefundRejected]: 'danger',
  [OrderStatus.RefundRequested]: 'info',
  [OrderStatus.Refunded]: 'success',
  [OrderStatus.Unknown]: 'archived',
};

export type GiftCardStatusProps = {
  status: OrderStatus;
  isUsed?: boolean;
};

export const GiftCardStatus = ({ isUsed, status }: GiftCardStatusProps) => {
  const { formatMessage } = useIntl();
  const statusText = removeSpecialCharacters(status).toUpperCase();

  return (
    <Box flex={1} flexDirection="row">
      {isUsed ? (
        <Tag content={formatMessage({ id: 'benefits.giftcard.used' })} intent="archived" />
      ) : (
        <Tag content={statusText} intent={orderStatusToIntent[status]} />
      )}
      <Box flex={1} />
    </Box>
  );
};
