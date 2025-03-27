import React from 'react';
import { Box, Button, Typography } from '@hero-design/rn';
import type { Dayjs } from 'dayjs';

interface InstaPayDateFilterProps {
  date: Dayjs;
  setDate: (date: Dayjs) => void;
}
export const InstaPayDateFilter = (props: InstaPayDateFilterProps) => {
  const { date, setDate } = props;

  const onPrev = () => {
    const prevDate = date.subtract(1, 'month');
    setDate(prevDate);
  };

  const onNext = () => {
    const prevDate = date.add(1, 'month');
    setDate(prevDate);
  };

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
      <Button.Icon testID="ewa-history-month-prev" size="xsmall" onPress={onPrev} icon="single-left-arrow" />
      <Typography.Title level="h5">{date.format('MMMM YYYY')}</Typography.Title>
      <Button.Icon testID="ewa-history-month-next" size="xsmall" onPress={onNext} icon="single-right-arrow" />
    </Box>
  );
};
