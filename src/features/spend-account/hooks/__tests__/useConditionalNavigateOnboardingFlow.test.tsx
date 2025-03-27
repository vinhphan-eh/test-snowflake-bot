import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { renderHook, waitFor } from '../../../../common/utils/testing';
import { mockServerNode } from '../../../../mock-server/mockServerNode';
import {
  CardStatus,
  WalletSetupStatus,
  mockGetCurrentCardDetailsQuery,
  mockGetCurrentCardMetaQuery,
  mockGetWalletStatusQuery,
} from '../../../../new-graphql/generated';
import { aSetupStatus } from '../../../../new-graphql/mocks/generated-mocks';
import {
  useConditionalNavigateOnboardingFlow,
  useNavigateEHOnboardingFlow,
  useNavigateNonEHOnboardingFlow,
} from '../useConditionalNavigateOnboardingFlow';

describe('useConditionalNavigateOnboardingFlow', () => {
  it('should return EH flow for EH user', () => {
    useSessionStore.setState({ currentUser: { loginProvider: 'eh', userID: 'fake' } });

    const {
      result: { current },
    } = renderHook(() => useConditionalNavigateOnboardingFlow());

    expect(current).toEqual(useNavigateEHOnboardingFlow);
  });

  it('should return non-EH flow for Keypay user', () => {
    useSessionStore.setState({ currentUser: { loginProvider: 'kp', userID: 'fake' } });

    const {
      result: { current },
    } = renderHook(() => useConditionalNavigateOnboardingFlow());

    expect(current).toEqual(useNavigateNonEHOnboardingFlow);
  });

  it('should return non-EH flow for candidates', () => {
    useSessionStore.setState({ currentUser: { loginProvider: 'eh', userID: 'fake' } });
    useSessionStore.setState({ swagUserType: 'non_current_employee' });

    const {
      result: { current },
    } = renderHook(() => useConditionalNavigateOnboardingFlow());

    expect(current).toEqual(useNavigateNonEHOnboardingFlow);
  });

  describe('when setup eWallet done and card setup is not done', () => {
    beforeEach(() => {
      mockServerNode.use(
        mockGetWalletStatusQuery((_, res, context) =>
          res(
            context.data({
              me: {
                wallet: {
                  details: {
                    setupStatus: aSetupStatus({ status: WalletSetupStatus.Completed }),
                    status: '',
                  },
                },
              },
            })
          )
        ),
        mockGetCurrentCardDetailsQuery((_, res, context) =>
          res(context.data({ me: { wallet: { card: { details: { id: '', status: CardStatus.Inactive } } } } }))
        ),
        mockGetCurrentCardMetaQuery((_, res, context) => res(context.data({})))
      );
    });

    it('should open pay split for EH user', async () => {
      useSessionStore.setState({ currentUser: { loginProvider: 'eh', userID: 'fake' } });

      const {
        result: { current },
      } = renderHook(() => useConditionalNavigateOnboardingFlow());
      const { result } = renderHook(() => current());

      await waitFor(() => {
        expect(result.current.nextScreenNavigateParams).toEqual([
          'PaySplitStack',
          {
            screen: 'PaySplitIntro',
            params: {},
          },
        ]);
      });
    });

    it('should open card setup for non-EH user', async () => {
      useSessionStore.setState({ currentUser: { loginProvider: 'kp', userID: 'fake' } });
      const {
        result: { current },
      } = renderHook(() => useConditionalNavigateOnboardingFlow());
      const { result } = renderHook(() => current());

      await waitFor(() => {
        expect(result.current.nextScreenNavigateParams?.[0]).toEqual('CardSetupStack');
      });
    });
  });
});
