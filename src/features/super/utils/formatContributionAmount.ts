import { formatCurrency, userInputToMachineNumber } from '../../../common/utils/numbers';
import { FIXED } from '../salary-sacrifice/constants';

export const formatContributionAmount = (type: string, value: string) =>
  type === FIXED ? formatCurrency(Number(userInputToMachineNumber({ inputValue: value }))) : `${value}%`; // render fixed dollar or percentage
