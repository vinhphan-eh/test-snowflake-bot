import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { fireEvent, render, renderHook } from '../../../../../common/utils/testing';
import { anInstapayBankAccount } from '../../../../../new-graphql/mocks/generated-mocks';
import { mockedSharedIPSchedulingEventProperties } from '../../../instapay-scheduling/hooks/useInstaPaySchedulingEventTracking';
import { CLICKED_NEXT_FROM_BANK_ACCOUNTS_SELECTION_DURING_WITHDRAW_NOW } from '../../../instapay-scheduling/mixpanelEvents';
import { INSTAPAY_MODULE_NAME } from '../../constants/trackingEvents';
import type { useInstapayBankOptions } from '../../hooks/useInstapayBankOptions';
import { useInstaPayDrawdownStore } from '../../stores/useInstaPayDrawdownStore';
import { TestInstaPayOrgKeyPayHasBalance } from '../../utils/test-objects';
import { InstaPayNowReceivingAccountScreen } from '../InstaPayNowReceivingAccountScreen';

const mockUseInstapayBankOptions = jest.fn() as jest.MockedFunction<typeof useInstapayBankOptions>;

jest.mock('../../hooks/useInstapayBankOptions', () => ({
  useInstapayBankOptions: () => mockUseInstapayBankOptions(),
}));

describe('InstaPayNowReceivingAccountScreen', () => {
  beforeEach(() => {
    mockUseInstapayBankOptions.mockReturnValue({
      accounts: [{ ...anInstapayBankAccount(), isSSA: false }],
      isLoading: false,
    });
  });

  test('should render correctly', () => {
    const { result: drawdownStore } = renderHook(() => useInstaPayDrawdownStore());
    drawdownStore.current.setMembership(TestInstaPayOrgKeyPayHasBalance);
    drawdownStore.current.setAmount(100);

    const { getByText } = render(<InstaPayNowReceivingAccountScreen />);
    expect(getByText(`You've selected to withdraw $100.00 now.`)).toBeDefined();
    expect(getByText(`Where are we sending it?`)).toBeDefined();
    expect(getByText(`* Each withdrawal incurs a transaction fee.`)).toBeDefined();
    expect(getByText(`Next`)).toBeDefined();
  });

  test('should show instruction when clicked', () => {
    const { result: drawdownStore } = renderHook(() => useInstaPayDrawdownStore());
    drawdownStore.current.setMembership(TestInstaPayOrgKeyPayHasBalance);
    drawdownStore.current.setAmount(100);

    const { getByTestId, getByText } = render(<InstaPayNowReceivingAccountScreen />);

    const howItWorkButton = getByTestId('topbar-right-icon');
    fireEvent.press(howItWorkButton);
    expect(getByText(`How it works`)).toBeDefined();
  });

  test('should navigate to next screen when clicked', () => {
    const { result: drawdownStore } = renderHook(() => useInstaPayDrawdownStore());
    drawdownStore.current.setMembership(TestInstaPayOrgKeyPayHasBalance);
    drawdownStore.current.setAmount(100);

    const { getByText } = render(<InstaPayNowReceivingAccountScreen />);
    const nextButton = getByText('Next');
    fireEvent.press(nextButton);
    expect(mockedNavigate).toHaveBeenCalledWith('InstaPayConfirm');
    expect(mockedEventTracking).toHaveBeenCalledWith({
      ...mockedSharedIPSchedulingEventProperties({
        module: INSTAPAY_MODULE_NAME,
      }),
      event: CLICKED_NEXT_FROM_BANK_ACCOUNTS_SELECTION_DURING_WITHDRAW_NOW,
    });
  });
});
