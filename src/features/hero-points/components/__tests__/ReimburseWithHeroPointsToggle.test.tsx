import React from 'react';
import * as useHeroPointsVisibility from '../../../../common/hooks/useHeroPointsVisibility';
import { useIsWalletSetupComplete } from '../../../../common/hooks/useIsWalletSetupComplete';
import { useToast } from '../../../../common/shared-hooks/useToast';
import type { PermissionData } from '../../../../common/stores/usePermissionStore';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { act, fireEvent, render, renderHook, waitFor } from '../../../../common/utils/testing';
import { mockServerNode } from '../../../../mock-server/mockServerNode';
import {
  mockGetHeroPointsPaymentPreferencesQuery,
  mockUpdateHeroPointsPaymentPreferencesMutation,
} from '../../../../new-graphql/generated';
import { ReimburseWithHeroPointsToggle } from '../ReimburseWithHeroPointsToggle';

jest.mock('../../../../common/shared-hooks/useToast', () => ({
  useToast: jest.fn(),
}));

jest.mock('../../../../common/hooks/useIsWalletSetupComplete', () => ({
  useIsWalletSetupComplete: jest.fn(),
}));

const mockShowToast = jest.fn();

describe('ReimburseWithHeroPointsToggle', () => {
  beforeEach(() => {
    (useIsWalletSetupComplete as jest.Mock).mockReturnValue({
      isFetched: true,
      isWalletSetupComplete: true,
    });
    jest.spyOn(useHeroPointsVisibility, 'useHeroPointsVisibility').mockReturnValue(true);

    const { result } = renderHook(() => usePermissionStore());
    result.current.permissions = { eBenSpendHeroDollarsOnSwagCard: { view: true } } as PermissionData;

    mockServerNode.use(
      mockUpdateHeroPointsPaymentPreferencesMutation((_, res, context) => {
        return res(
          context.data({
            heroPoints: {
              paymentPreferences: {
                payWithHPOnSwagCard: true,
              },
            },
          })
        );
      }),
      mockGetHeroPointsPaymentPreferencesQuery((_, res, context) => {
        return res(
          context.data({
            me: {
              heroPoints: {
                paymentPreferences: {
                  payWithHPOnSwagCard: false,
                },
              },
            },
          })
        );
      })
    );

    (useToast as jest.Mock).mockReturnValue({
      show: mockShowToast,
    });
  });

  it('should render correctly', async () => {
    const { findByText } = render(<ReimburseWithHeroPointsToggle content="content" />);

    expect(await findByText('content')).toBeTruthy();
  });

  it('toast show when enable ', async () => {
    const { findByTestId } = render(<ReimburseWithHeroPointsToggle content="abc" />);

    const enableToggle = await findByTestId('setting_toggle');

    // Enable
    act(() => {
      fireEvent.press(enableToggle);
    });

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith({
        actionLabel: undefined,
        autoDismiss: true,
        content: 'You’ve successfully opted in to reimburse Swag card purchases with Hero Points.',
      });
    });
  });

  it('toast show when disable ', async () => {
    mockServerNode.use(
      mockGetHeroPointsPaymentPreferencesQuery((_, res, context) => {
        return res(
          context.data({
            me: {
              heroPoints: {
                paymentPreferences: {
                  payWithHPOnSwagCard: true,
                },
              },
            },
          })
        );
      })
    );
    const { findByTestId } = render(<ReimburseWithHeroPointsToggle content="abc" />);

    const enableToggle = await findByTestId('setting_toggle');

    // Enable
    act(() => {
      fireEvent.press(enableToggle);
    });

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith({
        actionLabel: undefined,
        autoDismiss: true,
        content: 'You’ve successfully opted out to reimburse Swag card purchases with Hero Points.',
      });
    });
  });

  it('toast show when network error', async () => {
    mockServerNode.use(mockUpdateHeroPointsPaymentPreferencesMutation((_, res) => res.networkError('Error')));

    const { findByTestId } = render(<ReimburseWithHeroPointsToggle content="abc" />);

    const enableToggle = await findByTestId('setting_toggle');
    act(() => {
      fireEvent.press(enableToggle);
    });

    await waitFor(() => {
      expect(mockShowToast).toBeCalledWith({ content: 'Sorry, we could not process your request. Try again later.' });
    });
  });
});
