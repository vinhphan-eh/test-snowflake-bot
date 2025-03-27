import dayjs from 'dayjs';
import {
  calculateDifferentDayFromNow,
  differenceInDays,
  durationSinceDate,
  formatRelativeDate,
  formatUTCToLocalDateTimeString,
} from '../date';

describe('formatRelativeDate', () => {
  it.each<[Date, string]>([
    [new Date(), 'Today'],
    [dayjs().add(-1, 'day').toDate(), 'Yesterday'],
    [new Date('2022-08-24T06:18:54Z'), '24 Aug 2022'],
  ])('should return correct value', (rawValue, precision) => {
    const formattedDate = formatRelativeDate(rawValue);
    expect(formattedDate).toBe(precision);
  });
});

describe('formatUTCtoLocalDateTimeString', () => {
  it.each<[string, string]>([
    ['2022-08-24T06:18:54Z', '06:18 am, 24 Aug 2022'],
    ['2022-08-24T16:18:54Z', '04:18 pm, 24 Aug 2022'],
  ])('should return correct value', (utcString, formated) => {
    expect(formatUTCToLocalDateTimeString(utcString)).toBe(formated);
  });

  it.each<[string, string]>([
    ['2022-08-24T06:18:54Z', '24 Aug 2022, 06:18 am'],
    ['2022-08-24T16:18:54Z', '24 Aug 2022, 04:18 pm'],
  ])('should return correct value when set time behind', (utcString, formated) => {
    expect(formatUTCToLocalDateTimeString(utcString, true)).toBe(formated);
  });
});

describe('calculateDifferentDayFromNow', () => {
  beforeEach(() => {
    jest.spyOn(Date, 'now').mockReturnValue(new Date('2023-09-28T06:18:54Z').valueOf());
  });

  it.each<[string, number]>([
    ['2023-09-25T06:18:54Z', 3],
    ['2023-09-24T06:18:54Z', 4],
    ['2023-09-22T06:18:54Z', 6],
  ])('should return correct value', (rawValue, expected) => {
    const cal = calculateDifferentDayFromNow(rawValue);
    expect(cal).toBe(expected);
  });
});

describe('durationSinceDate', () => {
  beforeEach(() => {
    jest.spyOn(Date, 'now').mockReturnValue(new Date('2024-05-27T09:15:00Z').valueOf());
  });
  it('should return correct value', () => {
    const startDate = new Date('2024-05-25T09:12:56.00Z');
    const duration = durationSinceDate(startDate, 'day');
    expect(duration).toBe(2);
  });
});

describe('differenceInDays', () => {
  beforeEach(() => {
    jest.spyOn(Date, 'now').mockReturnValue(new Date('2024-06-01T06:18:54Z').valueOf());
  });

  it.each<[string, number]>([
    ['2024-06-10T06:18:54Z', 9],
    ['2024-06-02T09:18:54Z', 1],
    ['2024-06-03T11:18:54Z', 2],
  ])('should return correct value', (rawValue, expected) => {
    const cal = differenceInDays(rawValue);
    expect(cal).toBe(expected);
  });
});
