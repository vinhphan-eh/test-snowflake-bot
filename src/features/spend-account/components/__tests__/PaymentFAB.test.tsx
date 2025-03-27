import React from 'react';
import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { mockReturnIncomeVisibility } from '../../../../common/hooks/__mocks__/useIncomeVisibility';
import { mockUseIsAccountUK } from '../../../../common/hooks/__mocks__/useIsAccountUK';
import * as useShowPaySplitModule from '../../../../common/hooks/useShowPaySplit';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { initialPermissionsState } from '../../../../common/utils/permission';
import { act, fireEvent, render, renderHook } from '../../../../common/utils/testing';
import { useGetStashesQuery } from '../../../../new-graphql/generated';
import { aStashItem, aUser } from '../../../../new-graphql/mocks/generated-mocks';
import * as useSeenPaySplitIntroModule from '../../../income/pay-split/hooks/useSeenPaySplitIntro';
import { usePayAnyoneStore } from '../../pay-anyone/stores/usePayAnyoneStore';
import { PaymentFAB } from '../PaymentFAB';

jest.mock('../../../../new-graphql/generated', () => ({
  useGetStashesQuery: jest.fn(),
}));

mockUseIsAccountUK.mockReturnValue(false);

const mockSetPaymentType = jest.fn();

describe('PaymentFAB', () => {
  beforeEach(() => {
    const store = renderHook(() => usePayAnyoneStore());
    store.result.current.setPaymentType = mockSetPaymentType;

    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      ...initialPermissionsState,
      eBenMoneyScheduledPayment: {
        view: true,
      },
      eBenPayeeAddressBook: {
        view: true,
      },
    };
    permissionStore.result.current.isFetchedPermission = true;

    (useGetStashesQuery as unknown as jest.Mock).mockReturnValue(aUser());

    mockReturnIncomeVisibility({ showIncomeTab: true });

    jest.spyOn(useSeenPaySplitIntroModule, 'useSeenPaySplitIntro').mockReturnValue({
      markSeen: jest.fn(),
      hasUserSeenThis: () => Promise.resolve(true),
    });
    jest.spyOn(useShowPaySplitModule, 'useShowPaySplit').mockReturnValue(true);
  });

  it('should render correctly', () => {
    (useGetStashesQuery as unknown as jest.Mock).mockReturnValue({
      data: { me: { wallet: { stash: { items: [aStashItem()] } } } },
    });
    const { getByTestId } = render(<PaymentFAB shouldLoadStashes />);
    expect(getByTestId('payment-fab')).toBeTruthy();
  });

  it('should work with Stash Cash item', () => {
    (useGetStashesQuery as unknown as jest.Mock).mockReturnValue({
      data: { me: { wallet: { stash: { items: [aStashItem()] } } } },
    });
    const { getByTestId, getByText } = render(<PaymentFAB shouldLoadStashes />);
    fireEvent.press(getByTestId('payment-fab'));
    fireEvent.press(getByText('Stash Cash'));
    expect(mockedNavigate).toHaveBeenCalledWith('StashStack', { screen: 'StashSelection' });
  });

  it('should work with Pay Someone item', () => {
    (useGetStashesQuery as unknown as jest.Mock).mockReturnValue({
      data: { me: { wallet: { stash: { items: [aStashItem()] } } } },
    });
    const { getByTestId, getByText } = render(<PaymentFAB shouldLoadStashes />);
    fireEvent.press(getByTestId('payment-fab'));
    fireEvent.press(getByText('Pay Someone'));
    expect(mockedNavigate).toHaveBeenCalledWith('PayAnyoneStack', { screen: 'PayeeAddressBook' });
  });

  it('should render correctly with no stashes', () => {
    const { getByTestId, queryByText } = render(<PaymentFAB shouldLoadStashes />);
    fireEvent.press(getByTestId('payment-fab'));
    expect(queryByText('Stash Cash')).toBeFalsy();
  });

  it('should work with Scheduled payment item', () => {
    const { getByTestId, getByText } = render(<PaymentFAB shouldLoadScheduledPayment shouldLoadStashes={false} />);
    fireEvent.press(getByTestId('payment-fab'));
    fireEvent.press(getByText('Scheduled Payments'));
    expect(mockedNavigate).toHaveBeenCalledWith('PayAnyoneStack', { screen: 'ScheduledPaymentDashboard' });
  });

  it('should render correctly if no Pay Split access', () => {
    jest.spyOn(useShowPaySplitModule, 'useShowPaySplit').mockReturnValue(false);

    const { getByTestId, queryByText } = render(<PaymentFAB shouldLoadStashes />);
    fireEvent.press(getByTestId('payment-fab'));
    expect(queryByText('Pay Split')).toBeFalsy();
  });

  describe('when have Pay Split access', () => {
    beforeEach(() => {
      mockReturnIncomeVisibility({ showIncomeTab: true });
    });

    it('should go to PaySplitIntro if not seen intro', async () => {
      jest.spyOn(useSeenPaySplitIntroModule, 'useSeenPaySplitIntro').mockReturnValue({
        markSeen: jest.fn(),
        hasUserSeenThis: () => Promise.resolve(false),
      });
      const { getByTestId, getByText } = render(<PaymentFAB shouldLoadStashes />);
      fireEvent.press(getByTestId('payment-fab'));
      await act(() => fireEvent.press(getByText('Pay Split')));

      expect(mockedNavigate).toHaveBeenCalledWith('PaySplitStack', { screen: 'PaySplitIntro', params: {} });
    });

    it('should go to PaySplitOrgList if seen intro', async () => {
      const { getByTestId, getByText } = render(<PaymentFAB shouldLoadStashes />);
      fireEvent.press(getByTestId('payment-fab'));
      await act(() => fireEvent.press(getByText('Pay Split')));

      expect(mockedNavigate).toHaveBeenCalledWith('PaySplitStack', { screen: 'PaySplitOrgList' });
    });
  });

  describe('should navigate to proper pay anyone flow based on user region', () => {
    describe('AU users', () => {
      beforeEach(() => {
        mockUseIsAccountUK.mockReturnValue(false);
        (useGetStashesQuery as unknown as jest.Mock).mockReturnValue({
          data: { me: { wallet: { stash: { items: [aStashItem()] } } } },
        });
      });

      it('should navigate to Payee Address Book flow if user has the permission', async () => {
        const { getByTestId, getByText } = render(<PaymentFAB shouldLoadStashes />);
        fireEvent.press(getByTestId('payment-fab'));
        fireEvent.press(getByText('Pay Someone'));
        expect(mockedNavigate).toHaveBeenCalledWith('PayAnyoneStack', { screen: 'PayeeAddressBook' });
      });

      it('should navigate to old Pay Anyone flow if user does not have Payee Address Book permission', async () => {
        const permissionStore = renderHook(() => usePermissionStore());
        permissionStore.result.current.permissions = {
          ...initialPermissionsState,
          eBenMoneyScheduledPayment: {
            view: true,
          },
          eBenPayeeAddressBook: {
            view: false,
          },
        };
        permissionStore.result.current.isFetchedPermission = true;

        const { getByTestId, getByText } = render(<PaymentFAB shouldLoadStashes />);
        fireEvent.press(getByTestId('payment-fab'));
        fireEvent.press(getByText('Pay Someone'));
        expect(mockedNavigate).toHaveBeenCalledWith('PayAnyoneStack', { screen: 'PayeeDetails' });
      });
    });

    it('UK users', async () => {
      mockUseIsAccountUK.mockReturnValue(true);
      (useGetStashesQuery as unknown as jest.Mock).mockReturnValue({
        data: { me: { wallet: { stash: { items: [aStashItem()] } } } },
      });
      const { getByTestId, getByText } = render(<PaymentFAB shouldLoadStashes />);
      fireEvent.press(getByTestId('payment-fab'));
      fireEvent.press(getByText('Pay Someone'));
      expect(mockedNavigate).toHaveBeenCalledWith('PayAnyoneStack', { screen: 'UkPayeeDetails' });
    });
  });
});
