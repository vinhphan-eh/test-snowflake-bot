import React from 'react';
import { WalletTabKeys } from '../../../../common/constants/navigation';
import { mockUseIsAccountAU } from '../../../../common/hooks/__mocks__/useIsAccountAU';
import * as useIsCandidateV2 from '../../../../common/hooks/useIsCandidate';
import { useIsWalletSetupComplete } from '../../../../common/hooks/useIsWalletSetupComplete';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import * as useTopTabStore from '../../../../common/stores/useTopTabStore';
import { render, waitFor } from '../../../../common/utils/testing';
import {
  useGetHeroPointsBalanceQuery,
  useGetHeroPointsPaymentPreferencesQuery,
  useGetOrgsQuery,
  useGetWalletStatusQuery,
  useInfiniteGetHeroPointsTransactionHistoriesQuery,
  useUpdateHeroPointsPaymentPreferencesMutation,
} from '../../../../new-graphql/generated';
import { aSetupStatus } from '../../../../new-graphql/mocks/generated-mocks';
import * as useSeenHeroPointsIntro from '../../hooks/useSeenHeroPointsIntro';
import { HeroPointsDashboardScreen } from '../HeroPointsDashboardScreen';

jest.mock('../../../../new-graphql/generated', () => ({
  ...jest.requireActual<Record<string, unknown>>('../../../../new-graphql/generated'),
  useGetHeroPointsBalanceQuery: jest.fn(),
  useInfiniteGetHeroPointsTransactionHistoriesQuery: jest.fn(),
  useGetWalletStatusQuery: jest.fn(),
  useGetOrgsQuery: jest.fn(),
  useGetHeroPointsPaymentPreferencesQuery: jest.fn(),
  useUpdateHeroPointsPaymentPreferencesMutation: jest.fn(),
  WalletSetupStatus: {
    Completed: 'COMPLETED',
  },
  Platform: {
    Eh: 'EH',
  },
}));

jest.mock('../../../../common/hooks/useIsWalletSetupComplete', () => ({
  useIsWalletSetupComplete: jest.fn(),
}));

const mockUseIsCandidateV2 = (isCandidate: boolean) =>
  jest.spyOn(useIsCandidateV2, 'useIsCandidateV2').mockReturnValue(isCandidate);

const mockUseSeenHeroPointsIntro = ({ seenIntro }: { seenIntro: boolean }) =>
  jest.spyOn(useSeenHeroPointsIntro, 'useSeenHeroPointsIntro').mockReturnValue({
    hasUserSeenIntro: async () => seenIntro,
    markSeen: jest.fn(),
  });

const mockUseTopTabStore = (tab: string) => jest.spyOn(useTopTabStore, 'useTopTabStore').mockReturnValue(tab);

describe('Hero Points Dashboard Screen', () => {
  const initialPermissionsState = {
    instapay: {
      view: true,
    },
    superAppBenefits: {
      view: true,
    },
    superAppWallet: {
      view: true,
    },
    superAppSettings: {
      view: true,
    },
    superAppHome: {
      view: true,
    },
    superAppCashback: {
      view: true,
    },
    superAppBenefitsFeaturedOffers: {
      view: true,
    },
    superAppCashbackCategories: {
      view: true,
    },
    heroPoints: {
      view: true,
    },
  };

  beforeEach(() => {
    useSessionStore.setState({
      currentUser: {
        loginProvider: 'eh',
        userID: '1',
        attributes: {
          terminated: false,
        },
      },
    });
    usePermissionStore.setState({ permissions: initialPermissionsState });

    mockUseIsAccountAU.mockReturnValue(true);
    mockUseIsCandidateV2(false);
    mockUseTopTabStore(WalletTabKeys.HERO_POINTS);
    mockUseSeenHeroPointsIntro({ seenIntro: true });

    (useIsWalletSetupComplete as jest.Mock).mockReturnValue({
      isLoading: false,
      isWalletSetupComplete: true,
      isFetched: true,
    });

    (useGetHeroPointsBalanceQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          heroPoints: {
            balance: 123456789,
          },
        },
      },
    });

    (useGetWalletStatusQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          wallet: {
            details: {
              setupStatus: aSetupStatus(),
            },
          },
        },
      },
    });

    (useGetOrgsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          orgs: [
            {
              isIndependentContractor: true,
            },
          ],
        },
      },
    });

    (useInfiniteGetHeroPointsTransactionHistoriesQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            me: {
              heroPoints: {
                transactionHistories: {
                  itemPerPage: 10,
                  pageIndex: 1,
                  items: [],
                },
              },
            },
          },
        ],
      },
    });

    (useGetHeroPointsPaymentPreferencesQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          heroPoints: {
            paymentPreferences: {
              payWithHPOnSwagCard: true,
            },
          },
        },
      },
    });

    (useUpdateHeroPointsPaymentPreferencesMutation as unknown as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
    });
  });

  it('should render loading at initialize', async () => {
    (useGetHeroPointsBalanceQuery as unknown as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    const { getByTestId } = render(<HeroPointsDashboardScreen />);
    await waitFor(() => {
      expect(getByTestId('overlay_loading_screen')).toBeTruthy();
    });
  });

  it('should render properly', async () => {
    const { getByText } = render(<HeroPointsDashboardScreen />);

    expect(getByText('Points balance')).toBeTruthy();
    expect(getByText('Points transactions')).toBeTruthy();
  });

  it('should show hero points balance correctly', async () => {
    const { findByText } = render(<HeroPointsDashboardScreen />);

    expect(await findByText('123,456,789')).toBeTruthy();
    expect(await findByText('PTS')).toBeTruthy();
  });

  it('should show pay with hero points tile when having permission', async () => {
    (useIsWalletSetupComplete as jest.Mock).mockReturnValue({
      isLoading: false,
      isWalletSetupComplete: false,
      isFetched: true,
    });

    usePermissionStore.setState({
      permissions: { ...initialPermissionsState, eBenSpendHeroDollarsOnSwagCard: { view: true } },
    });

    const { getByLabelText } = render(<HeroPointsDashboardScreen />);

    expect(getByLabelText('pay with hero points tile')).toBeTruthy();
  });

  it('should hide pay with hero points tile when having no permission', async () => {
    const { queryByLabelText } = render(<HeroPointsDashboardScreen />);

    expect(queryByLabelText('pay with hero points tile')).toBeNull();
  });

  it('should show turn points to gift cards tile when requirements fulfilled', async () => {
    useSessionStore.setState({
      currentUser: {
        loginProvider: 'eh',
        userID: '1',
        attributes: {
          terminated: false,
        },
      },
    });
    mockUseIsCandidateV2(false);

    const { getByLabelText } = render(<HeroPointsDashboardScreen />);

    expect(getByLabelText('turn points to gift cards tile')).toBeTruthy();
  });

  describe('should hide turn points to gift cards tile when requirements not fulfilled', () => {
    it('is candidate', () => {
      mockUseIsCandidateV2(true);

      const { queryByLabelText } = render(<HeroPointsDashboardScreen />);

      expect(queryByLabelText('turn points to gift cards tile')).not.toBeTruthy();
    });

    it('is terminated', () => {
      useSessionStore.setState({
        currentUser: {
          loginProvider: 'eh',
          userID: '1',
          attributes: {
            terminated: true,
          },
        },
      });

      const { queryByLabelText } = render(<HeroPointsDashboardScreen />);

      expect(queryByLabelText('turn points to gift cards tile')).not.toBeTruthy();
    });
  });

  it('should render error screen when fetching balance error', async () => {
    (useGetHeroPointsBalanceQuery as unknown as jest.Mock).mockReturnValue({
      data: undefined,
      isError: true,
    });

    const { findByText } = render(<HeroPointsDashboardScreen />);
    expect(await findByText("We're sorry, something went wrong")).toBeTruthy();
  });

  it('should not show carousel when user is not from AU', async () => {
    mockUseIsAccountAU.mockReturnValue(false);
    mockUseSeenHeroPointsIntro({ seenIntro: false });
    const { getByText } = render(<HeroPointsDashboardScreen />);

    expect(useSeenHeroPointsIntro.useSeenHeroPointsIntro().markSeen).not.toBeCalled();

    expect(getByText('Points balance')).toBeTruthy();
    expect(getByText('Points transactions')).toBeTruthy();
  });
});
