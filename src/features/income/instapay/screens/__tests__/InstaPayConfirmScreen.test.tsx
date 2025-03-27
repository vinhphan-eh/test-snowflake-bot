import React from 'react';
import { Linking } from 'react-native';
import { renderHook } from '@testing-library/react-hooks';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { queryClient } from '../../../../../common/libs/queryClient';
import * as useInAppBrowser from '../../../../../common/shared-hooks/useInAppBrowser';
import { act, fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { mockServerNode } from '../../../../../mock-server/mockServerNode';
import {
  FeeType,
  InstapayBankAccountSource,
  mockDrawdownInstapayMutation,
  useGetAllInstapayAvailableBalancesQuery,
  useGetInstapayVisibilityQuery,
} from '../../../../../new-graphql/generated';
import { aDrawdownPayload } from '../../../../../new-graphql/mocks/generated-mocks';
import { mockedSharedIPSchedulingEventProperties } from '../../../instapay-scheduling/hooks/useInstaPaySchedulingEventTracking';
import { CLICKED_CONFIRM_ON_WITHDRAW_NOW_DRAWDOWN_CONFIRMATION_SCREEN } from '../../../instapay-scheduling/mixpanelEvents';
import { INSTAPAY_TERM_AND_CONDITIONS_LINK } from '../../constants/links';
import { INSTAPAY_MODULE_NAME } from '../../constants/trackingEvents';
import { InstaPayDrawdownErrorCode } from '../../navigation/navigationTypes';
import { useInstaPayDrawdownStore } from '../../stores/useInstaPayDrawdownStore';
import { TestInstaPayOrgKeyPayHasBalance } from '../../utils/test-objects';
import { InstaPayConfirmScreen } from '../InstaPayConfirmScreen';

jest.mock('../../../../../common/libs/queryClient', () => ({
  queryClient: {
    invalidateQueries: jest.fn(),
  },
}));
(queryClient.invalidateQueries as jest.Mock).mockImplementation(jest.fn());

describe('InstaPayConfirmScreen', () => {
  beforeEach(() => {
    const { result: drawdownStore } = renderHook(() => useInstaPayDrawdownStore());
    act(() => {
      drawdownStore.current.setAmount(100);
      drawdownStore.current.setBankAccount({
        accountNumber: '111222',
        bsb: '112344',
        accountName: 'Jame',
        bankAccountSource: InstapayBankAccountSource.Eh,
        feeV2: {
          type: FeeType.Percentage,
          percentage: 1.5,
        },
        externalId: '123',
        isSSA: false,
      });
      drawdownStore.current.setMembership(TestInstaPayOrgKeyPayHasBalance);
    });
  });

  it('should render correctly', () => {
    const { getByText } = render(<InstaPayConfirmScreen />);

    expect(getByText("You'll pay a $1.50 fee.")).toBeVisible();
    expect(getByText('A total of $101.50 will be deducted from your payslip.')).toBeVisible();
    expect(
      getByText(
        'By confirming, you agree to our Perks and Earned Wage Access Now Terms and Conditions. This transaction will show as a deduction on your payslip from Test Org.'
      )
    ).toBeVisible();
  });

  describe('submitting when under maintenance', () => {
    beforeEach(async () => {
      mockServerNode.use(
        mockDrawdownInstapayMutation((_, res, ctx) => {
          return res(
            ctx.data({
              instapay: {
                drawdown: {
                  success: false,
                  messageCode: 'system_error:under_maintenance',
                },
              },
            })
          );
        })
      );

      const { findByLabelText } = render(<InstaPayConfirmScreen />);

      const confirmButton = await findByLabelText('Confirm');
      await waitFor(() => {
        expect(confirmButton).toBeEnabled();
      });
      fireEvent.press(confirmButton);
    });

    it('should open error screen with maintenance codee', async () => {
      await waitFor(() => {
        expect(mockedNavigate).toHaveBeenCalledWith('InstaPayDrawdownError', {
          errorCode: InstaPayDrawdownErrorCode.UnderMaintenance,
        });
      });
    });

    it('should invalidate balance and visibility query', async () => {
      await waitFor(() => {
        expect(queryClient.invalidateQueries).toHaveBeenCalledWith(useGetAllInstapayAvailableBalancesQuery.getKey());
        expect(queryClient.invalidateQueries).toHaveBeenCalledWith(useGetInstapayVisibilityQuery.getKey());
      });
    });
  });

  it('should navigate to error screen with GeneralError code when confirm API return 500', async () => {
    mockServerNode.use(
      mockDrawdownInstapayMutation((_, res) => {
        return res.networkError('oh, error :(');
      })
    );

    const { findByLabelText } = render(<InstaPayConfirmScreen />);

    const confirmButton = await findByLabelText('Confirm');
    await waitFor(() => {
      expect(confirmButton).toBeEnabled();
    });
    fireEvent.press(confirmButton);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('InstaPayDrawdownError', {
        errorCode: InstaPayDrawdownErrorCode.GeneralError,
      });
    });
  });

  it('should navigate to error screen with RefuseMaxBalanceExceed code when return message_code = REFUSED_MAX_BALANCE_EXCEEDED', async () => {
    mockServerNode.use(
      mockDrawdownInstapayMutation((_, res, ctx) => {
        return res(
          ctx.data({
            instapay: {
              drawdown: aDrawdownPayload({
                success: false,
                messageCode: 'REFUSED_MAX_BALANCE_EXCEEDED',
              }),
            },
          })
        );
      })
    );

    const { findByLabelText } = render(<InstaPayConfirmScreen />);

    const confirmButton = await findByLabelText('Confirm');
    await waitFor(() => {
      expect(confirmButton).toBeEnabled();
    });
    fireEvent.press(confirmButton);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('InstaPayDrawdownError', {
        errorCode: InstaPayDrawdownErrorCode.RefusedMaxBalanceExceeded,
      });
    });
  });

  it('should navigate to succeed', async () => {
    mockServerNode.use(
      mockDrawdownInstapayMutation((_, res, ctx) => {
        return res(
          ctx.data({
            instapay: {
              drawdown: aDrawdownPayload({
                success: true,
                version: 1,
              }),
            },
          })
        );
      })
    );

    const { findByLabelText } = render(<InstaPayConfirmScreen />);

    const confirmButton = await findByLabelText('Confirm');
    await waitFor(() => {
      expect(confirmButton).toBeEnabled();
    });
    fireEvent.press(confirmButton);

    await waitFor(() => {
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith(['GetAllInstapayAvailableBalances']);

      expect(mockedNavigate).toHaveBeenCalledWith('InstaPaySimplifiedFlowDrawdownSuccess', { version: 1 });
      expect(mockedEventTracking).toHaveBeenCalledWith({
        ...mockedSharedIPSchedulingEventProperties({
          module: INSTAPAY_MODULE_NAME,
        }),
        event: CLICKED_CONFIRM_ON_WITHDRAW_NOW_DRAWDOWN_CONFIRMATION_SCREEN,
      });
    });
  });

  it('should navigate to succeed screen if inside the simplified experiment flow and fulfill the condition', async () => {
    mockServerNode.use(
      mockDrawdownInstapayMutation((_, res, ctx) => {
        return res(
          ctx.data({
            instapay: {
              drawdown: aDrawdownPayload({
                success: true,
                version: 2,
              }),
            },
          })
        );
      })
    );

    const { findByLabelText } = render(<InstaPayConfirmScreen />);

    const confirmButton = await findByLabelText('Confirm');
    await waitFor(() => {
      expect(confirmButton).toBeEnabled();
    });
    fireEvent.press(confirmButton);

    await waitFor(() => {
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith(['GetAllInstapayAvailableBalances']);

      expect(mockedNavigate).toHaveBeenCalledWith('InstaPaySimplifiedFlowDrawdownSuccess', {
        version: 2,
      });
    });
  });

  it('should open T&C link when user click on T&C', () => {
    const mockOpenUrl = jest.fn();
    jest.spyOn(useInAppBrowser, 'useInAppBrowser').mockImplementation(() => {
      return {
        openUrl: mockOpenUrl,
      };
    });
    jest.spyOn(Linking, 'openURL');
    const { getByTestId } = render(<InstaPayConfirmScreen />);

    const termCondButton = getByTestId('instapay-term-conditions');
    fireEvent.press(termCondButton);

    expect(mockOpenUrl).toHaveBeenCalledWith(INSTAPAY_TERM_AND_CONDITIONS_LINK);
  });
});
