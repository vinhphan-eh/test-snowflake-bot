import React from 'react';
import { mockedGoBack, mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { initialPermissionsState } from '../../../../../common/utils/permission';
import { fireEvent, render, renderHook, waitFor } from '../../../../../common/utils/testing';
import { usePayAnyoneStore } from '../../stores/usePayAnyoneStore';
import { PaymentTypeScreen } from '../PaymentTypeScreen';

const mockSetPaymentType = jest.fn();

describe('Payment type screen', () => {
  beforeEach(() => {
    const store = renderHook(() => usePayAnyoneStore());
    store.result.current.setPaymentType = mockSetPaymentType;

    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      ...initialPermissionsState,
      eBenMoneyScheduledPayment: {
        view: true,
      },
    };
    permissionStore.result.current.isFetchedPermission = true;
  });

  describe('should render properly', () => {
    it('with scheduled payment permission', async () => {
      const { getByText } = render(<PaymentTypeScreen />);

      await waitFor(() => {
        expect(getByText('When do you want to send?')).toBeTruthy();
        expect(getByText('Now')).toBeTruthy();
        expect(getByText('Later')).toBeTruthy();
        expect(getByText('Recurring')).toBeTruthy();
      });
    });

    it('without scheduled payment permission', async () => {
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        ...initialPermissionsState,
        eBenMoneyScheduledPayment: {
          view: false,
        },
      };
      permissionStore.result.current.isFetchedPermission = true;

      const { getByText } = render(<PaymentTypeScreen />);

      await waitFor(() => {
        expect(getByText('When do you want to send?')).toBeTruthy();
        expect(getByText('Now')).toBeTruthy();
      });
    });
  });

  it('should go back previous screen by using back chevron', () => {
    const { getByTestId } = render(<PaymentTypeScreen />);
    const button = getByTestId('topbar-back-icon');
    fireEvent.press(button);
    expect(mockedGoBack).toBeCalled();
  });

  test.each([
    {
      buttonId: 'option-payment-recurring',
      optionText: 'Recurring',
      screenName: 'PaymentRecurring',
    },
    {
      buttonId: 'option-payment-now',
      optionText: 'Now',
      screenName: 'PaymentConfirmation',
    },
    {
      buttonId: 'option-payment-later',
      optionText: 'Later',
      screenName: 'PaymentLater',
    },
  ])(`should navigate to $screenName screen if selected payment type is $optionText`, ({ buttonId, screenName }) => {
    const { getByTestId } = render(<PaymentTypeScreen />);

    const button = getByTestId(buttonId);
    fireEvent.press(button);

    waitFor(() => {
      expect(mockedNavigate).toBeCalledWith(screenName);
    });
  });
});
