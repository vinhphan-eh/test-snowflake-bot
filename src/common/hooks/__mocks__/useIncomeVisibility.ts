import type { IncomeVisibility } from '../useIncomeVisibility';
import { useIncomeVisibility } from '../useIncomeVisibility';

export const mockUseIncomeVisibility = useIncomeVisibility as jest.MockedFn<typeof useIncomeVisibility>;

export const mockReturnIncomeVisibility = (mockedProps: Partial<IncomeVisibility>) => {
  const defaultIncomeVisibility: IncomeVisibility = {
    showInstapayNowUsageIncentiveV2: false,
    instapayNowUnderMaintenance: false,
    showInstapayEstimatedIncome: true,
    instaPayScheduling: {
      isLoading: false,
      isEligible: false,
    },
    isLoading: false,
    isError: false,
    showIncomeTab: false,
    showInstapay: false,
  };
  return mockUseIncomeVisibility.mockReturnValue({ ...defaultIncomeVisibility, ...mockedProps });
};

jest.mock('../useIncomeVisibility', () => ({ useIncomeVisibility: jest.fn() }));
