import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import type { UseFormSetValue } from 'react-hook-form';
import type { FormInput } from '../salary-sacrifice/screens/EditSuperContributionScreen';
import { useSubmitSuperContributionStore } from '../store/useSubmitSuperContributionStore';

export const add7Days = (date: Date) => dayjs(date).add(7, 'day').utcOffset(0).startOf('day').toDate(); // Date start with 00:00:00

export const useSelectStartAndStopContribution = () => {
  const { isContributionEnded, setContributionEnded, setEndDate, setStartDate, startDate } =
    useSubmitSuperContributionStore();

  const minStartDate = add7Days(new Date()); // Start date should start of 7 days from today.
  const [minEndDate, setMinEndDate] = useState(() => add7Days(minStartDate));

  // Update minEndDate when startDate changed
  useEffect(() => {
    // Always check if startDate presents, then update minEndDate
    if (startDate) {
      const newMinEndDate = new Date(startDate);
      setMinEndDate(add7Days(newMinEndDate));
    }
  }, [startDate]);

  const handleOnChangeStartDate = (selectedDate: Date, setControlValue: UseFormSetValue<FormInput>) => {
    setControlValue('startDate', selectedDate, { shouldValidate: true });
    setStartDate(selectedDate.toISOString());

    setControlValue('endDate', add7Days(selectedDate), { shouldValidate: true });
    setEndDate(add7Days(selectedDate).toISOString());

    setContributionEnded(false);
  };

  const handleOnChangeEndDate = (selectedDate: Date, setControlValue: UseFormSetValue<FormInput>) => {
    setControlValue('endDate', selectedDate, { shouldValidate: true });
    setEndDate(selectedDate.toISOString());
  };

  const handleOnPressCheckbox = () => {
    setContributionEnded(!isContributionEnded);
    setEndDate(undefined);
  };

  return {
    handleOnChangeStartDate,
    handleOnChangeEndDate,
    handleOnPressCheckbox,
    setStartDate,
    setEndDate,
    minStartDate,
    minEndDate,
    isContributionEnded,
  };
};
