import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedNavigate } from '../../../../../../../__mocks__/react-navigation';
import { mockUseIsAccountAU } from '../../../../../../common/hooks/__mocks__/useIsAccountAU';
import { mockUseIsAccountUK } from '../../../../../../common/hooks/__mocks__/useIsAccountUK';
import { useIsWalletSetupComplete } from '../../../../../../common/hooks/useIsWalletSetupComplete';
import { fireEvent, render, renderHook, waitFor } from '../../../../../../common/utils/testing';
import { mockNavigateToTopTabs } from '../../../../../../navigation/__mocks__/rootNavigation';
import { useConditionalNavigateOnboardingFlow } from '../../../../../spend-account/hooks/useConditionalNavigateOnboardingFlow';
import { useInstaPaySchedulingStore } from '../../../../instapay-scheduling/stores/useInstaPaySchedulingStore';
import { useInstapayNowSimplifiedFlowStore } from '../../../stores/useInstapayNowSimplifiedFlowStore';
import { InstaPayNowSimplifiedFlowDrawdownSuccessScreen } from '../InstaPayNowSimplifiedFlowDrawdownSuccessScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;
const mockUseIsWalletSetupComplete = useIsWalletSetupComplete as jest.MockedFn<typeof useIsWalletSetupComplete>;
jest.mock('../../../../../spend-account/hooks/useConditionalNavigateOnboardingFlow', () => ({
  useConditionalNavigateOnboardingFlow: jest.fn(),
}));

jest.mock('../../../../../../common/hooks/useIsWalletSetupComplete');

describe('InstaPayNowSimplifiedFlowDrawdownSuccessScreen', () => {
  beforeEach(() => {
    mockUseIsAccountAU.mockReturnValue(true);
    (useConditionalNavigateOnboardingFlow as jest.Mock).mockReturnValue(() => ({
      isLoading: false,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('should render the success messages content properly in all cases', () => {
    beforeEach(() => {
      mockUseIsWalletSetupComplete.mockReturnValue({
        isWalletSetupComplete: false,
        isLoading: false,
        isError: false,
        isFetched: true,
      });
    });

    it('InstaPay version 1', async () => {
      mockedUseRoute.mockReturnValue({
        params: {
          version: 1,
        },
        key: '',
        name: '',
      });

      const { getByText } = render(<InstaPayNowSimplifiedFlowDrawdownSuccessScreen />);

      await waitFor(() => {
        expect(getByText('Your request has been processed.')).toBeTruthy();
        expect(getByText('Please wait up to 5 days to see it in your account.')).toBeTruthy();
      });
    });

    it('InstaPay version 2', async () => {
      mockedUseRoute.mockReturnValue({
        params: {
          version: 2,
        },
        key: '',
        name: '',
      });

      const { getByText } = render(<InstaPayNowSimplifiedFlowDrawdownSuccessScreen />);

      await waitFor(() => {
        expect(getByText('Cha-ching! Your request has been processed! 💸🎉')).toBeTruthy();
        expect(getByText('Your funds will be in your account in up to 2 hours.')).toBeTruthy();
      });
    });
  });

  describe('loading wallet setup result', () => {
    beforeEach(() => {
      mockUseIsWalletSetupComplete.mockReturnValue({
        isWalletSetupComplete: false,
        isLoading: true,
        isError: false,
        isFetched: false,
      });
      const { result: instaPayStore } = renderHook(() => useInstapayNowSimplifiedFlowStore());
      instaPayStore.current.setShouldShowSSAAdTile(true);
    });

    it('should render spinner for actions part', async () => {
      const { getByLabelText } = render(<InstaPayNowSimplifiedFlowDrawdownSuccessScreen />);

      await waitFor(() => {
        expect(getByLabelText('spinner-instapay-success-screen-ssa-ad-tile')).toBeTruthy();
      });
    });
  });

  describe('should render actions and handle navigation properly based on wallet setup status and accounts list', () => {
    beforeEach(() => {
      const { result: instaPayStore } = renderHook(() => useInstaPaySchedulingStore());
      instaPayStore.current.setShouldShowCTA(false);
    });

    describe('finished wallet setup', () => {
      beforeEach(() => {
        mockUseIsWalletSetupComplete.mockReturnValue({
          isWalletSetupComplete: true,
          isLoading: false,
          isError: false,
          isFetched: true,
        });

        const { result: instaPayStore } = renderHook(() => useInstapayNowSimplifiedFlowStore());
        instaPayStore.current.setShouldShowSSAAdTile(false);
      });

      it('should render only Done button and navigate to dashboard if pressed', async () => {
        const { getByLabelText, queryByLabelText, queryByTestId } = render(
          <InstaPayNowSimplifiedFlowDrawdownSuccessScreen />
        );

        await waitFor(() => {
          expect(getByLabelText('Done')).toBeTruthy();
          expect(queryByLabelText('Maybe later')).not.toBeTruthy();
          expect(queryByTestId('ssa-ad-tile')).not.toBeTruthy();
        });

        fireEvent.press(getByLabelText('Done'));
        expect(mockNavigateToTopTabs).toHaveBeenCalledWith('income-tab');
      });
    });

    describe('having none ssa in the bank accounts list and wallet not set up', () => {
      beforeEach(() => {
        mockUseIsWalletSetupComplete.mockReturnValue({
          isWalletSetupComplete: false,
          isLoading: false,
          isError: false,
          isFetched: true,
        });

        const { result: instaPayStore } = renderHook(() => useInstapayNowSimplifiedFlowStore());
        instaPayStore.current.setShouldShowSSAAdTile(true);
      });

      it('should render buttons properly', async () => {
        const { getByTestId, queryByLabelText } = render(<InstaPayNowSimplifiedFlowDrawdownSuccessScreen />);

        await waitFor(() => {
          expect(queryByLabelText('Done')).not.toBeTruthy();
          expect(queryByLabelText('Maybe later')).toBeTruthy();
          expect(getByTestId('ssa-ad-tile')).toBeTruthy();
        });
      });

      it('should navigate to dashboard on pressed Maybe later button', async () => {
        const { getByLabelText, queryByLabelText } = render(<InstaPayNowSimplifiedFlowDrawdownSuccessScreen />);

        await waitFor(() => {
          expect(queryByLabelText('Maybe later')).toBeTruthy();
        });

        fireEvent.press(getByLabelText('Maybe later'));
        expect(mockNavigateToTopTabs).toHaveBeenCalledWith('income-tab');
      });

      describe('should navigate properly based on current onboarding step on pressed Open now button', () => {
        it('should navigate to the current step if screen is returned from checking hook', async () => {
          (useConditionalNavigateOnboardingFlow as jest.Mock).mockReturnValue(() => ({
            isLoading: false,
            nextScreenNavigateParams: [
              'stack',
              {
                screen: 'screen',
              },
            ],
          }));

          const { getByTestId } = render(<InstaPayNowSimplifiedFlowDrawdownSuccessScreen />);

          await waitFor(() => {
            expect(getByTestId('success-screen-ad-tile-action-button')).toBeTruthy();
          });

          fireEvent.press(getByTestId('success-screen-ad-tile-action-button'));
          expect(mockedNavigate).toHaveBeenCalledWith('stack', {
            screen: 'screen',
          });
        });

        it('should navigate to the current step if screen is not returned from checking hook', async () => {
          (useConditionalNavigateOnboardingFlow as jest.Mock).mockReturnValue(() => ({
            isLoading: false,
          }));

          const { getByTestId } = render(<InstaPayNowSimplifiedFlowDrawdownSuccessScreen />);

          await waitFor(() => {
            expect(getByTestId('success-screen-ad-tile-action-button')).toBeTruthy();
          });

          fireEvent.press(getByTestId('success-screen-ad-tile-action-button'));
          expect(mockedNavigate).toHaveBeenCalledWith('OnboardingStack', { screen: 'Dashboard' });
        });
      });
    });
  });

  describe('the "drawdown survey CTA"', () => {
    describe('when user is UK based', () => {
      beforeEach(() => {
        mockUseIsWalletSetupComplete.mockReturnValue({
          isWalletSetupComplete: false,
          isLoading: false,
          isError: false,
          isFetched: true,
        });
        mockUseIsAccountUK.mockReturnValue(true);
      });

      it('should be visible', async () => {
        const { queryByText } = render(<InstaPayNowSimplifiedFlowDrawdownSuccessScreen />);

        await waitFor(() => {
          expect(queryByText('Your feedback is important to us')).toBeTruthy();
          expect(queryByText('Please let us know your thoughts')).toBeTruthy();
          expect(queryByText('Share your feedback')).toBeTruthy();
        });
      });
    });
  });

  describe('should render conditionally the InstaPay Scheduling ad CTA properly', () => {
    beforeEach(() => {
      mockUseIsWalletSetupComplete.mockReturnValue({
        isWalletSetupComplete: false,
        isLoading: false,
        isError: false,
        isFetched: true,
      });
    });

    describe('fulfilled the conditions to be rendered', () => {
      beforeEach(() => {
        const { result: instaPayStore } = renderHook(() => useInstaPaySchedulingStore());
        instaPayStore.current.setShouldShowCTA(true);
      });

      it('should render properly if fulfill the conditions', async () => {
        const { result: instaPayStore } = renderHook(() => useInstapayNowSimplifiedFlowStore());
        instaPayStore.current.setShouldShowSSAAdTile(false);

        const { getByTestId, queryByLabelText } = render(<InstaPayNowSimplifiedFlowDrawdownSuccessScreen />);

        await waitFor(() => {
          expect(getByTestId('success-screen-ad-tile-action-button')).toBeTruthy();
          expect(getByTestId('instapay-scheduling-ad-cta')).toBeTruthy();
          expect(queryByLabelText('Maybe later')).toBeTruthy();
        });
      });

      it('should not render the SSA ad tile if both tiles are eligible to be rendered', async () => {
        const { result: instaPayStore } = renderHook(() => useInstapayNowSimplifiedFlowStore());
        instaPayStore.current.setShouldShowSSAAdTile(true);

        const { getByTestId, queryByLabelText, queryByTestId } = render(
          <InstaPayNowSimplifiedFlowDrawdownSuccessScreen />
        );

        await waitFor(() => {
          expect(getByTestId('success-screen-ad-tile-action-button')).toBeTruthy();
          expect(queryByLabelText('Maybe later')).toBeTruthy();
          expect(getByTestId('instapay-scheduling-ad-cta')).toBeTruthy();
          expect(queryByTestId('ssa-ad-tile')).not.toBeTruthy();
        });
      });
    });

    it('should not render if not fulfilled the conditions', async () => {
      const { result: instaPayStore } = renderHook(() => useInstaPaySchedulingStore());
      instaPayStore.current.setShouldShowCTA(false);

      const { queryByLabelText, queryByTestId } = render(<InstaPayNowSimplifiedFlowDrawdownSuccessScreen />);

      await waitFor(() => {
        expect(queryByLabelText('Done')).toBeTruthy();
        expect(queryByTestId('instapay-scheduling-ad-cta')).not.toBeTruthy();
      });
    });
  });
});
