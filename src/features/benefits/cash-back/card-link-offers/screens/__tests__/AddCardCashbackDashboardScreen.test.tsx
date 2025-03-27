import React from 'react';
import { mockedNavigate } from '../../../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../../../test-setup/after-env/mixpanel.setup';
import { useSessionStore } from '../../../../../../common/stores/useSessionStore';
import { fireEvent, render, renderHook, waitFor } from '../../../../../../common/utils/testing';
import { useCashbackDeleteCardMutation } from '../../../../../../graphql/generated';
import {
  useGetWalletStatusQuery,
  WalletSetupStatus,
  useCashbackLinkedCardsQuery,
} from '../../../../../../new-graphql/generated';
import { mockCashbackLinkedCards } from '../../../../../../new-graphql/handlers/custom-mock/cashback';
import { aSetupStatus } from '../../../../../../new-graphql/mocks/generated-mocks';
import { useConditionalNavigateOnboardingFlow } from '../../../../../spend-account/hooks/useConditionalNavigateOnboardingFlow';
import { mockUseCheckAutoEnrollment } from '../../hooks/__mocks__/useCheckAutoEnrollment';
import { AddCardCashbackDashboardScreen } from '../AddCardCashbackDashboardScreen';

const heroWalletLinkedCard = {
  id: 12,
  description: 'hero wallet des',
  cardMasked: '****',
  issuer: 'visa',
  expiry: '2024-08-24T00:00:00',
  provider: 'Employment Hero',
  isExpired: false,
  lastFour: '2345',
};

jest.mock('../../../../../../graphql/generated', () => ({
  useCashbackDeleteCardMutation: jest.fn(),
}));

jest.mock('../../../../../../new-graphql/generated', () => ({
  useGetWalletStatusQuery: jest.fn(),
  useCashbackLinkedCardsQuery: jest.fn(),
  WalletSetupStatus: {
    Completed: 'COMPLETED',
    Failed: 'FAILED',
    InProgress: 'IN_PROGRESS',
    None: 'NONE',
  },
}));

jest.mock('../../../../../spend-account/hooks/useConditionalNavigateOnboardingFlow', () => ({
  useConditionalNavigateOnboardingFlow: jest.fn(),
}));

jest.mock('../../../../../../common/shared-hooks/useToast', () => ({
  useToast: () => ({
    show: jest.fn(),
  }),
}));

describe('AddCardCashbackDashboardScreen', () => {
  const mockAutoEnrol = jest.fn();

  beforeEach(() => {
    (useCashbackLinkedCardsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        cashbackLinkedCards: [],
      },
      isLoading: false,
    });

    (useCashbackDeleteCardMutation as jest.Mock).mockReturnValue({
      isLoading: false,
      mutateAsync: jest.fn(),
    });

    (useConditionalNavigateOnboardingFlow as jest.Mock).mockReturnValue(() => ({
      isLoading: false,
      screen: undefined,
    }));

    (useGetWalletStatusQuery as unknown as jest.Mock).mockReturnValue({
      data: { me: { wallet: { details: { setupStatus: aSetupStatus({ status: WalletSetupStatus.None }) } } } },
      isLoading: false,
    });

    mockUseCheckAutoEnrollment.mockReturnValue({
      triggerAutoEnrol: mockAutoEnrol,
      isPreparingData: false,
    });
  });

  it('should render correctly', async () => {
    const { findByText } = render(<AddCardCashbackDashboardScreen />);
    expect(await findByText('Your enrolled cards')).toBeTruthy();
    expect(await findByText('Swag Visa Debit card')).toBeTruthy();
    expect(await findByText('Other cards')).toBeTruthy();
    expect(await findByText('You can enrol up to 4 Visa cards and 5 Mastercards.')).toBeTruthy();
  });

  it('should render loading at initialize', async () => {
    (useCashbackLinkedCardsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        cashbackLinkedCards: [],
      },
      isLoading: true,
    });
    const { findByTestId } = render(<AddCardCashbackDashboardScreen />);
    expect(await findByTestId('spinner')).toBeTruthy();
  });

  it('should show set up Swag Visa Debit card when there is no hero wallet', async () => {
    const { findByText, getByText } = render(<AddCardCashbackDashboardScreen />);
    expect(await findByText('Your enrolled cards')).toBeTruthy();
    expect(getByText('Claim your cash!')).toBeTruthy();
    expect(getByText('Open a Spend account')).toBeTruthy();
  });

  it('should go to Hero Wallet onboarding when Open a Spend account card is tapped', async () => {
    const { findByText } = render(<AddCardCashbackDashboardScreen />);
    expect(await findByText('Claim your cash!')).toBeTruthy();

    fireEvent.press(await findByText('Open a Spend account'));
    expect(mockedNavigate).toBeCalledWith('OnboardingStack', { screen: 'Dashboard' });
  });

  it('should go to enrol a card screen correctly', async () => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentOrgId = '123';

    const { findByText } = render(<AddCardCashbackDashboardScreen />);
    fireEvent.press(await findByText('Add card'));
    expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
      screen: 'CardLinkOffersStack',
      params: { screen: 'EnrolCardDetails', params: { haveHeroWallet: false } },
    });
    expect(mockedEventTracking).toBeCalledWith({
      event: 'Click add card',
      categoryName: 'user action',
      metaData: {
        module: 'Cashback',
      },
    });
  });

  it('should render other cards correctly', async () => {
    (useCashbackLinkedCardsQuery as unknown as jest.Mock).mockReturnValue({ data: mockCashbackLinkedCards });
    const { findByText } = render(<AddCardCashbackDashboardScreen />);
    expect(await findByText('NAB (4444) 10/24')).toBeTruthy();
    expect(await findByText('Westpac (9999) 10/25')).toBeTruthy();
  });

  it('should render hero wallet correctly when linked', async () => {
    (useCashbackLinkedCardsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          cashback: {
            linkedCards: {
              cards: [heroWalletLinkedCard],
            },
          },
        },
      },
    });
    const { findByText } = render(<AddCardCashbackDashboardScreen />);
    expect(await findByText('Swag (2345) 08/24')).toBeTruthy();
  });

  it('should trigger manual hero enrolment when hero wallet status card is completed and card linked returns no hero wallet', async () => {
    (useGetWalletStatusQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: { wallet: { details: { setupStatus: aSetupStatus({ status: WalletSetupStatus.Completed }), status: '' } } },
      },
      isLoading: false,
    });
    const { findByText } = render(<AddCardCashbackDashboardScreen />);

    const heroWalletStatus = await findByText('Enrol Swag Visa Debit card');

    fireEvent.press(heroWalletStatus);

    await waitFor(() => {
      expect(mockAutoEnrol).toBeCalled();
    });
  });

  it('should hide add card button when other card linked is 9', async () => {
    (useCashbackLinkedCardsQuery as unknown as jest.Mock).mockReturnValue({ data: mockCashbackLinkedCards });
    const { findByText, queryByText } = render(<AddCardCashbackDashboardScreen />);
    expect(await findByText('NAB (4444) 10/24')).toBeTruthy();
    expect(queryByText('Add card')).toBeNull();
  });
});
