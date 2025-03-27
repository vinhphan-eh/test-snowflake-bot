import React from 'react';
import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import * as useHeroPointsVisibility from '../../../../common/hooks/useHeroPointsVisibility';
import { usePasscodeStore } from '../../../../common/screens/passcode';
import { useToast } from '../../../../common/shared-hooks/useToast';
import type { PermissionData } from '../../../../common/stores/usePermissionStore';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { act, fireEvent, render, renderHook, waitFor } from '../../../../common/utils/testing';
import { mockServerNode as mockServer } from '../../../../mock-server/mockServerNode';
import {
  CardStatus,
  mockGetCurrentCardDetailsQuery,
  mockGetCurrentCardMetaQuery,
  mockUpdateCardMetaMutation,
  type CardDetails,
  type GetCurrentCardDetailsQuery,
  type GetCurrentCardMetaQuery,
} from '../../../../new-graphql/generated';
import { useRequestNewCardStore } from '../../request-new-card/stores/useRequestNewCardStore';
import { CardManagementDashboardScreen } from '../CardManagementDashboardScreen';

jest.mock('../../../../common/shared-hooks/useToast', () => ({ useToast: jest.fn() }));

const inActiveCardImageLabel = 'Inactive Card Image Front';
const activeCardImageLabel = 'Active Card Image Front';

const mockAwaitingActivationCard: CardDetails = {
  id: '73dc639b-abec-42d5-91e5-a6b010853b5b',
  status: CardStatus.AwaitingActivation,
};

const mockActiveCard: CardDetails = {
  id: '73dc639b-abec-42d5-91e5-a6b010853b5b',
  status: CardStatus.Active,
};

const activeCardBtnLabel = 'Activate physical card';
const resetPinAlert = 'Please reset your PIN before you activate your new card.';
const warningActivationContent = 'Please ensure you have received your card in the mail before you activate it.';
const confirmActivationContent =
  'We want to make sure your card is in safe hands before you activate it. Please confirm you have received it.';

const mockGetCardDetailsQuery = (returnValue: CardDetails) => {
  return [
    mockGetCurrentCardDetailsQuery((_, res, ctx) => {
      const result: GetCurrentCardDetailsQuery = { me: { wallet: { card: { details: returnValue } } } };
      return res(ctx.data(result));
    }),
  ];
};

describe('Wallet Card Screen', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  describe('Awaiting activation card', () => {
    beforeEach(() => {
      mockServer.use(...mockGetCardDetailsQuery(mockAwaitingActivationCard));
    });

    it('should not show reset pin alert when have set pin', () => {
      const { result: recoverCardStore } = renderHook(() => useRequestNewCardStore());
      recoverCardStore.current.showResetPinAlert = false;

      const { queryByText } = render(<CardManagementDashboardScreen />);

      expect(queryByText(resetPinAlert)).toBeNull();
    });

    it('should show reset pin alert when have not set pin', async () => {
      const { result: recoverCardStore } = renderHook(() => useRequestNewCardStore());
      recoverCardStore.current.showResetPinAlert = true;

      const { findByText } = render(<CardManagementDashboardScreen />);

      expect(await findByText(resetPinAlert)).toBeTruthy();
    });

    it('should show active card button and warning', async () => {
      const { result: recoverCardStore } = renderHook(() => useRequestNewCardStore());
      recoverCardStore.current.showActivationCardAlert = true;

      const { findByLabelText, findByText } = render(<CardManagementDashboardScreen />);

      expect(await findByLabelText(activeCardBtnLabel)).toBeTruthy();
      expect(await findByText(warningActivationContent)).toBeTruthy();
      expect(await findByLabelText(inActiveCardImageLabel)).toBeTruthy();
    });

    it('should show activation alert when local is undefined and card is awaiting active', async () => {
      const { result: recoverCardStore } = renderHook(() => useRequestNewCardStore());
      recoverCardStore.current.showActivationCardAlert = undefined;
      const { findByLabelText, queryByText } = render(<CardManagementDashboardScreen />);

      expect(await findByLabelText(activeCardBtnLabel)).toBeTruthy();
      expect(queryByText(warningActivationContent)).not.toBeNull();
      expect(await findByLabelText(inActiveCardImageLabel)).toBeTruthy();
    });

    it('should show active card button and not show warning alert when have dismissed it', async () => {
      const { result: recoverCardStore } = renderHook(() => useRequestNewCardStore());
      recoverCardStore.current.showActivationCardAlert = false;
      const { findByLabelText, queryByText } = render(<CardManagementDashboardScreen />);

      expect(await findByLabelText(activeCardBtnLabel)).toBeTruthy();
      expect(queryByText(warningActivationContent)).toBeNull();
      expect(await findByLabelText(inActiveCardImageLabel)).toBeTruthy();
    });

    it('should open bottom sheet', async () => {
      const { findByLabelText, findByText } = render(<CardManagementDashboardScreen />);

      const activeCardBtn = await findByLabelText(activeCardBtnLabel);

      fireEvent.press(activeCardBtn);

      expect(await findByText(confirmActivationContent)).toBeTruthy();
    });

    it('should go to damged flow correctly', async () => {
      const mockSetRequirePasscode = jest.fn((_: boolean, func?: () => void) => func?.());
      const { result: passcodeStore } = renderHook(() => usePasscodeStore());
      passcodeStore.current.setRequirePasscode = mockSetRequirePasscode;
      const { findByTestId } = render(<CardManagementDashboardScreen />);

      fireEvent.press(await findByTestId('Damaged, lost or stolen card'));

      expect(mockSetRequirePasscode).toBeCalledWith(true, expect.anything());

      expect(mockedNavigate).toBeCalledWith('RequestNewCardStack', {
        screen: 'ReportCard',
      });
    });

    it('should go to reset card flow correctly', async () => {
      const mockSetRequirePasscode = jest.fn((_: boolean, func?: () => void) => func?.());
      const { result: passcodeStore } = renderHook(() => usePasscodeStore());
      passcodeStore.current.setRequirePasscode = mockSetRequirePasscode;
      const { findByTestId } = render(<CardManagementDashboardScreen />);

      fireEvent.press(await findByTestId('Reset card PIN'));

      expect(mockSetRequirePasscode).toBeCalledWith(true, expect.anything());

      expect(mockedNavigate).toBeCalledWith('CardSetupStack', {
        screen: 'PinSetupStack',
        params: {
          screen: 'ChoosePin',
          params: {
            header: 'Reset card PIN',
            title: 'Choose a new PIN.',
            repeatedPinScreen: {
              header: 'Reset card PIN',
              title: 'Repeat your PIN.',
              onPinVerifiedSuccess: expect.anything(),
            },
          },
        },
      });
    });
  });

  describe('Active card', () => {
    it('should show active card image without warning and activation button', async () => {
      mockServer.use(...mockGetCardDetailsQuery(mockActiveCard));

      const { findByLabelText, queryByText } = render(<CardManagementDashboardScreen />);

      expect(await findByLabelText(activeCardImageLabel)).toBeTruthy();
      expect(queryByText(activeCardBtnLabel)).toBeNull();
      expect(queryByText(warningActivationContent)).toBeNull();
    });
  });

  it('should not show activation alert when card is active, even when local is true', async () => {
    const { result: recoverCardStore } = renderHook(() => useRequestNewCardStore());
    recoverCardStore.current.showActivationCardAlert = true;
    mockServer.use(...mockGetCardDetailsQuery(mockActiveCard));

    const { findByLabelText, queryByText } = render(<CardManagementDashboardScreen />);

    expect(await findByLabelText(activeCardImageLabel)).toBeTruthy();
    expect(queryByText(activeCardBtnLabel)).toBeNull();
    expect(queryByText(warningActivationContent)).toBeNull();
  });

  describe('No card found', () => {
    it('should show inactive card image without warning and activation button', async () => {
      const { queryByLabelText, queryByText } = render(<CardManagementDashboardScreen />);

      expect(queryByLabelText(activeCardBtnLabel)).toBeNull();
      expect(queryByText(warningActivationContent)).toBeNull();
      expect(queryByLabelText(inActiveCardImageLabel)).toBeTruthy();
    });
  });

  describe('Physical card setting', () => {
    beforeEach(() => {
      mockServer.use(...mockGetCardDetailsQuery(mockActiveCard));
      mockServer.use(
        mockGetCurrentCardMetaQuery((_, res, ctx) => {
          const result: GetCurrentCardMetaQuery = {
            me: {
              wallet: {
                card: {
                  meta: {
                    id: '123123',
                    frozen: false,
                    magStrip: false,
                    contactless: false,
                  },
                },
              },
            },
          };
          return res(ctx.data(result));
        })
      );
    });

    it('should show physical card setting correctly when settings are false', async () => {
      const { findByLabelText, findByTestId, findByText, queryByText } = render(<CardManagementDashboardScreen />);

      expect(await findByTestId('physical_setting_con')).toBeTruthy();
      expect(await findByText('Card is enabled')).toBeTruthy();
      expect(await findByText('Contactless payments are disabled.')).toBeTruthy();
      expect(await findByText('Swipe is disabled.')).toBeTruthy();

      expect(await findByLabelText(activeCardImageLabel)).toBeTruthy();
      expect(queryByText(activeCardBtnLabel)).toBeNull();
      expect(queryByText(warningActivationContent)).toBeNull();
    });

    it('should show physical card setting correctly when settings are true ', async () => {
      mockServer.use(
        mockGetCurrentCardMetaQuery((_, res, ctx) => {
          const result: GetCurrentCardMetaQuery = {
            me: {
              wallet: {
                card: {
                  meta: {
                    id: '123123',
                    frozen: true,
                    magStrip: true,
                    contactless: true,
                  },
                },
              },
            },
          };
          return res(ctx.data(result));
        })
      );
      const { findByLabelText, findByTestId, findByText, queryByText } = render(<CardManagementDashboardScreen />);

      expect(await findByTestId('physical_setting_con')).toBeTruthy();
      expect(await findByText('Card is disabled')).toBeTruthy();
      expect(await findByText('You can make contactless payments.')).toBeTruthy();
      expect(await findByText('You can swipe your card at terminal.')).toBeTruthy();

      expect(await findByLabelText(activeCardImageLabel)).toBeTruthy();
      expect(queryByText(activeCardBtnLabel)).toBeNull();
      expect(queryByText(warningActivationContent)).toBeNull();
    });

    it('should update setting correctly ', async () => {
      mockServer.use(
        mockUpdateCardMetaMutation((_, res, context) => res(context.data({ card: { updateMeta: { success: true } } })))
      );

      const { findByLabelText, findByText } = render(<CardManagementDashboardScreen />);

      const enableToggle = await findByLabelText('Card is enabled toggle');
      expect(await findByText('Card is enabled')).toBeTruthy();

      fireEvent.press(enableToggle);

      expect(await findByText('Card is disabled')).toBeTruthy();
    });

    it('should revert to old value when failed ', async () => {
      mockServer.use(mockUpdateCardMetaMutation((_, res) => res.networkError('Error')));
      const mockShowToast = jest.fn();
      (useToast as jest.Mock).mockReturnValue({
        show: mockShowToast,
      });
      const { findByLabelText, findByText, getByText } = render(<CardManagementDashboardScreen />);

      const enableToggle = await findByLabelText('Card is enabled toggle');

      expect(await findByText('Card is enabled')).toBeTruthy();
      act(() => {
        fireEvent.press(enableToggle);
      });
      await waitFor(() => {
        expect(mockShowToast).toHaveBeenCalled();
        expect(getByText('Card is enabled')).toBeTruthy();
      });
    });
  });

  describe('Payment preferences setting', () => {
    beforeEach(() => {
      const { result } = renderHook(() => usePermissionStore());
      result.current.permissions = { eBenSpendHeroDollarsOnSwagCard: { view: true } } as PermissionData;
      jest.spyOn(useHeroPointsVisibility, 'useHeroPointsVisibility').mockReturnValue(true);
    });

    it('should show payment preferences setting correctly when having permission', async () => {
      const { findByText } = render(<CardManagementDashboardScreen />);

      expect(await findByText('Reimburse with Hero Points')).toBeTruthy();
      expect(await findByText('Reimburse Swag card purchases with Hero Points.')).toBeTruthy();
    });

    it('should hide payment preferences setting correctly when having no permission', () => {
      const { result } = renderHook(() => usePermissionStore());
      result.current.permissions = { eBenSpendHeroDollarsOnSwagCard: { view: false } } as PermissionData;

      const { queryByText } = render(<CardManagementDashboardScreen />);

      expect(queryByText('Payment preferences')).toBeNull();
      expect(queryByText('Redeem Hero Points')).toBeNull();
    });

    it('should hide payment preferences setting correctly when having no hero_points permission', () => {
      jest.spyOn(useHeroPointsVisibility, 'useHeroPointsVisibility').mockReturnValue(false);

      const { queryByText } = render(<CardManagementDashboardScreen />);

      expect(queryByText('Payment preferences')).toBeNull();
      expect(queryByText('Redeem Hero Points')).toBeNull();
    });
  });
});
