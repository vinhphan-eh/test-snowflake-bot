import React from 'react';
import dayjs from 'dayjs';
import { fireEvent, render } from '../../../../common/utils/testing';
import { InstaPayDateFilter } from '../InstaPayDateFilter';

describe('InstaPayDateFilter', () => {
  it('should render correctly', () => {
    const date = dayjs('2024-09-15', 'YYYY-MM-DD');
    const { getByText } = render(<InstaPayDateFilter date={date} setDate={() => {}} />);

    expect(getByText('September 2024')).toBeTruthy();
  });

  it('should set date correctly when go previous', () => {
    const setDate = jest.fn();
    setDate.mockImplementation(value => value.toISOString());

    const date = dayjs('2024-09-15', 'YYYY-MM-DD');
    const { getByTestId } = render(<InstaPayDateFilter date={date} setDate={setDate} />);

    fireEvent.press(getByTestId('ewa-history-month-prev'));

    expect(setDate).toHaveLastReturnedWith(dayjs('2024-08-15', 'YYYY-MM-DD').toISOString());
  });

  it('should set date correctly when go next', () => {
    const setDate = jest.fn();
    setDate.mockImplementation(value => value.toISOString());

    const date = dayjs('2024-09-15', 'YYYY-MM-DD');
    const { getByTestId } = render(<InstaPayDateFilter date={date} setDate={setDate} />);

    fireEvent.press(getByTestId('ewa-history-month-next'));

    expect(setDate).toHaveLastReturnedWith(dayjs('2024-10-15', 'YYYY-MM-DD').toISOString());
  });
});
