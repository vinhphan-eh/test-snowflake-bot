import React from 'react';
import { mockedGoBack } from '../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../test-setup/after-env/mixpanel.setup';
import { mockReturnIncomeVisibility } from '../../../../common/hooks/__mocks__/useIncomeVisibility';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { fireEvent, render, renderHook } from '../../../../common/utils/testing';
import { BudgetingIntroScreen } from '../BudgetingIntroScreen';

const mockOpenUrl = jest.fn();
jest.mock('../../../../common/shared-hooks/useInAppBrowser', () => {
  return {
    useInAppBrowser: () => {
      return {
        openUrl: mockOpenUrl,
      };
    },
  };
});

describe('BudgetingIntroScreen', () => {
  beforeEach(() => {
    mockReturnIncomeVisibility({ showIncomeTab: true, showInstapay: true });

    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      payslipsExperimentBudgeting: {
        view: true,
      },
      payslipsExperimentInstapay: {
        view: true,
      },
    } as never;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render correctly', () => {
    const screen = render(<BudgetingIntroScreen />);
    expect(screen.getByText('Thanks for your interest, our new budgeting features are coming soon!')).toBeDefined();
    expect(
      screen.getByText('While you wait, check out these helpful resources to supercharge your income')
    ).toBeDefined();
  });

  it('should render paycalculator link and open correct url', () => {
    const screen = render(<BudgetingIntroScreen />);
    expect(screen.getByText('Paycalculator')).toBeDefined();
    const paycalculatorLink = screen.getByTestId('paycalculator-link');
    fireEvent.press(paycalculatorLink);
    expect(mockOpenUrl).toBeCalledWith('https://paycalculator.com.au/');
    expect(mockedEventTracking).toBeCalledWith({
      event: 'Visit Budgeting Features screen',
      categoryName: 'user action',
      metaData: { module: 'Payslips Experiment', website: 'Paycalculator', 'InstaPay Available': true },
    });
  });

  it('should render money smart link and open correct url', () => {
    const screen = render(<BudgetingIntroScreen />);
    expect(screen.getByText('MoneySmart')).toBeDefined();
    const moneysmartLink = screen.getByTestId('moneysmart-link');
    fireEvent.press(moneysmartLink);
    expect(mockOpenUrl).toBeCalledWith('https://moneysmart.gov.au/');
    expect(mockedEventTracking).toBeCalledWith({
      event: 'Visit Budgeting Features screen',
      categoryName: 'user action',
      metaData: { module: 'Payslips Experiment', website: 'MoneySmart', 'InstaPay Available': true },
    });
  });

  it('should go back properly', () => {
    const screen = render(<BudgetingIntroScreen />);

    const backButton = screen.getByTestId('topbar-back-icon');
    fireEvent.press(backButton);
    expect(mockedGoBack).toBeCalled();
  });

  describe('BudgetingIntroBlogs', () => {
    it('Should render correct Blog 1 and open correct url', () => {
      const screen = render(<BudgetingIntroScreen />);
      expect(screen.getByText('10 tips for budgeting in a cost of living crisis')).toBeDefined();
      // blog 1 and 2 have 5 min read
      expect(screen.getAllByText('5 min read')).toHaveLength(2);

      const blogLink = screen.getByTestId('blog-link-0');
      fireEvent.press(blogLink);
      expect(mockOpenUrl).toBeCalledWith('https://swagapp.com/blog/budgeting-in-a-cost-of-living-crisis/');
      expect(mockedEventTracking).toBeCalledWith({
        event: 'Visit Budgeting Features screen',
        categoryName: 'user action',
        metaData: { module: 'Payslips Experiment', website: '10 Tips for Budgeting', 'InstaPay Available': true },
      });
    });
    it('Should render correct Blog 2 and open correct url', () => {
      const screen = render(<BudgetingIntroScreen />);
      expect(screen.getByText('Why is the cost of living going up in Australia?')).toBeDefined();
      // blog 1 and 2 have 5 min read
      expect(screen.getAllByText('5 min read')).toHaveLength(2);

      const blogLink = screen.getByTestId('blog-link-1');
      fireEvent.press(blogLink);
      expect(mockOpenUrl).toBeCalledWith('https://swagapp.com/blog/cost-of-living-in-australia/');
      expect(mockedEventTracking).toBeCalledWith({
        event: 'Visit Budgeting Features screen',
        categoryName: 'user action',
        metaData: { module: 'Payslips Experiment', website: 'Cost of Living', 'InstaPay Available': true },
      });
    });
    it('Should render correct Blog 3 and open correct url', () => {
      const screen = render(<BudgetingIntroScreen />);
      expect(screen.getByText('How To Create A Bulletproof Budget')).toBeDefined();
      expect(screen.getAllByText('7 min read')).toHaveLength(1);

      const blogLink = screen.getByTestId('blog-link-2');
      fireEvent.press(blogLink);
      expect(mockOpenUrl).toBeCalledWith('https://swagapp.com/blog/how-to-create-a-bulletproof-budget/');
      expect(mockedEventTracking).toBeCalledWith({
        event: 'Visit Budgeting Features screen',
        categoryName: 'user action',
        metaData: { module: 'Payslips Experiment', website: 'Bulletproof Budget', 'InstaPay Available': true },
      });
    });
  });
});
