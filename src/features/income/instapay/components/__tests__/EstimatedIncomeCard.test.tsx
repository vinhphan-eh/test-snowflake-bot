import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { getFloatAmountFromMoneyV2 } from '../../../../../common/utils/currency';
import { formatCurrency } from '../../../../../common/utils/numbers';
import { render, renderHook } from '../../../../../common/utils/testing';
import {
  CurrencyType,
  type GetEstimatedIncomeQuery,
  type MoneyV2,
  Sign,
  useGetEstimatedIncomeQuery,
} from '../../../../../new-graphql/generated';
import { Region } from '../../../../../providers/LocalisationProvider/constants';
import { EstimatedIncomeCard } from '../EstimatedIncomeCard';

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useGetEstimatedIncomeQuery: jest.fn(),
}));
const mockUseGetEstimatedIncomeQuery = useGetEstimatedIncomeQuery as unknown as jest.Mock<
  MockQueryResult<GetEstimatedIncomeQuery>
>;

const positiveMoney = (units: number, subUnits: number): MoneyV2 => ({
  units,
  subUnits,
  sign: Sign.Positive,
  type: CurrencyType.CurrencyTypeAud,
});

const twoDateFromNow = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString();
const totalIncome = positiveMoney(3000, 0);
const aDeduction = positiveMoney(150, 0);
const queryData = {
  isLoading: false,
  data: {
    me: {
      org: {
        id: 46113,
        instapay: {
          estimatedIncome: {
            income: totalIncome,
            deductions: [
              {
                amount: aDeduction,
              },
            ],
            payPeriod: {
              paymentDate: twoDateFromNow,
            },
          },
        },
      },
    },
  },
};
describe('EstimatedIncomeCard', () => {
  beforeEach(() => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentOrgId = '46113';
  });
  it('should render correctly', () => {
    mockUseGetEstimatedIncomeQuery.mockReturnValueOnce(queryData);
    const { getByTestId, getByText } = render(<EstimatedIncomeCard country={Region.au} />);

    const expectedDeduction = getFloatAmountFromMoneyV2(aDeduction);
    const expectedTotalIncome = getFloatAmountFromMoneyV2(totalIncome);
    const finalIncome = expectedTotalIncome - expectedDeduction;
    expect(getByTestId('instapay-estimated-income-total')).toBeTruthy();
    expect(getByText(formatCurrency(expectedTotalIncome))).toBeTruthy();
    expect(getByTestId('instapay-estimated-income-deduction')).toBeTruthy();
    expect(getByText(`-${formatCurrency(expectedDeduction)}`)).toBeTruthy();
    expect(getByTestId('instapay-estimated-income-final')).toBeTruthy();
    expect(getByText(formatCurrency(finalIncome))).toBeTruthy();
    expect(getByText(`in 2 days*`)).toBeTruthy();
    expect(getByTestId('estimated-income-question-btn')).toBeTruthy();
  });

  it('click on question mark', () => {
    mockUseGetEstimatedIncomeQuery.mockReturnValueOnce(queryData);
    const mockOpenDescription = jest.fn();
    const { getByTestId } = render(<EstimatedIncomeCard country={Region.au} openDescription={mockOpenDescription} />);

    const btn = getByTestId('estimated-income-question-btn');
    fireEvent.press(btn);

    expect(mockOpenDescription).toHaveBeenCalled();
  });

  it('should request opening bottom sheet if clicked on the tile body', async () => {
    mockUseGetEstimatedIncomeQuery.mockReturnValueOnce(queryData);
    const mockOpenDescription = jest.fn();
    const { getByTestId } = render(<EstimatedIncomeCard country={Region.au} openDescription={mockOpenDescription} />);

    const contentBody = getByTestId('estimated-income-card-content-body');
    fireEvent.press(contentBody);

    expect(mockOpenDescription).toHaveBeenCalled();
  });

  it('should display nothing if data is not available', () => {
    mockUseGetEstimatedIncomeQuery.mockReturnValueOnce({ isLoading: false, data: {} });

    const { queryByTestId } = render(<EstimatedIncomeCard country={Region.au} />);

    expect(queryByTestId('instapay-estimated-income-total')).toBeFalsy();
    expect(queryByTestId('instapay-estimated-income-deduction')).toBeFalsy();
    expect(queryByTestId('instapay-estimated-income-final')).toBeFalsy();
  });
});
