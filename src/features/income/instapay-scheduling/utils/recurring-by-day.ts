import { MAX_RECURRING_BY_DAY_AMOUNT } from '../constants';

export const isAnyBalanceOption = (amount: number | undefined) => amount === MAX_RECURRING_BY_DAY_AMOUNT;
