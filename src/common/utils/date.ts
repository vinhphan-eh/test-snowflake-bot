import type { OpUnitType, QUnitType } from 'dayjs';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import utc from 'dayjs/plugin/utc';

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(utc);

export const formatRelativeDate = (d: Date) => {
  if (dayjs(d).isToday()) {
    return 'Today';
  }

  if (dayjs(d).isYesterday()) {
    return 'Yesterday';
  }

  return dayjs(d).format('D MMM YYYY');
};

// reponse format exp: 12:00 pm, 20 Jul 2022
export const formatUTCToLocalDateTimeString = (utcDate: string, isTimeBehind = false) => {
  let format = 'hh:mm a, DD MMM YYYY';
  if (isTimeBehind) {
    format = 'DD MMM YYYY, hh:mm a';
  }
  return dayjs(utcDate).format(format);
};

// reponse format exp: 20 Jul 2022
export const formatUTCToLocalDateString = (utcDate: string) => {
  return dayjs(utcDate).format('DD MMM YYYY');
};

export const formatStringToDate = (dateString: string, deformatter: string, formatter: string, strict = true) => {
  return dayjs(dateString, deformatter, strict).format(formatter);
};

export const calculateDifferentDayFromNow = (utcDate: string) => {
  return dayjs.utc(Date.now()).diff(dayjs.utc(utcDate), 'd');
};

export const durationSinceDate = (startDate: Date, unit: QUnitType | OpUnitType) => {
  const formattedStartDate = startDate ? dayjs(startDate) : null;
  const currentDayjs = dayjs(Date.now());

  return currentDayjs.diff(formattedStartDate, unit);
};

// ignore time different
export const differenceInDays = (targetDateString: string): number => {
  const today = dayjs.utc(Date.now()).startOf('day');
  const targetDate = dayjs.utc(targetDateString).startOf('day');

  return targetDate.diff(today, 'day');
};
