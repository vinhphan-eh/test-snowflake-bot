import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../test-setup/after-env/mixpanel.setup';
import { mockUseIsAccountUK } from '../../../../common/hooks/__mocks__/useIsAccountUK';
import { renderHook, waitFor } from '../../../../common/utils/testing';
import {
  IdvProfileStatus,
  UkAuthFactorChannel,
  UkAuthFactorStatus,
  UkAuthFactorType,
  WalletSetupStatus,
} from '../../../../new-graphql/generated';
import { MONEY_MODULE_NAME, MONEY_OPEN_SSA_CLICK_SET_UP_NOW } from '../../../onboarding/constants/trackingEvents';
import { useWeavrBiometrics } from '../../../onboarding/hooks/useWeavrBiometrics';
import { useContinueOnboardingCTA } from '../useContinueOnboardingCTA';

jest.mock('../../../onboarding/hooks/useWeavrBiometrics', () => ({
  useWeavrBiometrics: jest.fn(),
}));

describe('useContinueOnboardingCTA', () => {
  beforeEach(() => {
    (useWeavrBiometrics as jest.Mock).mockReturnValue({
      checkpointDeviceEnrolled: jest.fn(() => Promise.resolve(false)),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('UK citizen', () => {
    beforeEach(() => {
      mockUseIsAccountUK.mockReturnValue(true);
    });

    test.each([
      {
        input: {
          label: 'No passcode yet',
          eWalletSetupStatus: WalletSetupStatus.InProgress,
          idvProfileData: undefined,
          ukAuthFactors: undefined,
          ukWalletUserToken: undefined,
          checkpointDeviceEnrolled: false,
        },
        expected: {
          screen: 'UkPasscode',
        },
      },
      {
        input: {
          label: 'Unverified Mobile number',
          eWalletSetupStatus: WalletSetupStatus.InProgress,
          idvProfileData: undefined,
          ukAuthFactors: undefined,
          ukWalletUserToken: undefined,
          checkpointDeviceEnrolled: false,
        },
        expected: {
          screen: 'UkPasscode',
        },
      },
      {
        input: {
          label: 'Permanently rejected',
          eWalletSetupStatus: WalletSetupStatus.Failed,
          ukWalletUserToken: 'fake-token',
          ukAuthFactors: [
            { type: UkAuthFactorType.Otp, channel: UkAuthFactorChannel.Sms, status: UkAuthFactorStatus.Active },
          ],
          idvProfileData: undefined,
          checkpointDeviceEnrolled: false,
        },
        expected: { screen: 'Decline' },
      },
      {
        input: {
          label: 'Pending approval',
          eWalletSetupStatus: WalletSetupStatus.InProgress,
          ukWalletUserToken: 'fake-token',
          idvProfileData: {
            status: IdvProfileStatus.Unchecked,
          },
          ukAuthFactors: [
            { type: UkAuthFactorType.Otp, channel: UkAuthFactorChannel.Sms, status: UkAuthFactorStatus.Active },
          ],
          checkpointDeviceEnrolled: false,
        },
        expected: { screen: 'CheckingDetails', params: { statusIsInprogress: true } },
      },
      {
        input: {
          label: 'Temporarily rejected / Unfinished KYC - Biometrics checkpoint failed',
          eWalletSetupStatus: WalletSetupStatus.InProgress,
          idvProfileData: undefined,
          ukAuthFactors: [
            { type: UkAuthFactorType.Otp, channel: UkAuthFactorChannel.Sms, status: UkAuthFactorStatus.Active },
          ],
          ukWalletUserToken: 'fake-token',
          checkpointDeviceEnrolled: false,
        },
        expected: {
          screen: 'UkBiometrics',
        },
      },
      {
        input: {
          label: 'Temporarily rejected / Unfinished KYC - Biometrics checkpoint passed',
          eWalletSetupStatus: WalletSetupStatus.InProgress,
          idvProfileData: undefined,
          ukWalletUserToken: 'fake-token',
          ukAuthFactors: [
            { type: UkAuthFactorType.Otp, channel: UkAuthFactorChannel.Sms, status: UkAuthFactorStatus.Active },
          ],
          checkpointDeviceEnrolled: true,
        },
        expected: {
          screen: 'UkVerifyIdentityDocumentInfo',
          params: { userToken: 'fake-token' },
        },
      },
    ])(
      'should navigate to $expected.screen when wallet status is $input.eWalletSetupStatus => $input.label',
      async ({ expected, input }) => {
        (useWeavrBiometrics as jest.Mock).mockReturnValue({
          checkpointDeviceEnrolled: jest.fn(() => Promise.resolve(input.checkpointDeviceEnrolled)),
          getUKToken: () => input.ukWalletUserToken,
        });

        const { result } = renderHook(() =>
          useContinueOnboardingCTA({
            eWalletSetupStatus: input.eWalletSetupStatus,
            idvProfileData: input.idvProfileData,
            ukAuthFactors: input.ukAuthFactors,
          })
        );

        expect(result.current).toEqual({ navigate: expect.any(Function) });
        result.current.navigate();

        await waitFor(() => {
          expect(mockedNavigate).toHaveBeenCalledWith('OnboardingStack', expected);
        });
      }
    );
  });

  describe('AU citizen', () => {
    beforeEach(() => {
      mockUseIsAccountUK.mockReturnValue(false);
    });

    test.each([
      {
        input: {
          eWalletSetupStatus: WalletSetupStatus.InProgress,
          idvProfileData: undefined,
        },
        expected: {
          screen: 'CheckingDetails',
          params: { statusIsInprogress: true },
        },
      },
      {
        input: {
          eWalletSetupStatus: WalletSetupStatus.Failed,
          idvProfileData: {
            status: IdvProfileStatus.None,
            token: 'token',
          },
        },
        expected: {
          screen: 'VerifyIdentityDocumentInfo',
          params: { onfidoToken: 'token' },
        },
      },
      {
        input: {
          eWalletSetupStatus: WalletSetupStatus.None,
        },
        expected: {
          screen: 'Dashboard',
        },
        mixPanelEvent: {
          event: MONEY_OPEN_SSA_CLICK_SET_UP_NOW,
          categoryName: 'user action',
          metaData: {
            module: MONEY_MODULE_NAME,
          },
        },
      },
    ])(
      'should navigate to $expected.screen when wallet status is $input.eWalletSetupStatus',
      ({ expected, input, mixPanelEvent }) => {
        const { result } = renderHook(() =>
          useContinueOnboardingCTA({
            eWalletSetupStatus: input.eWalletSetupStatus,
            idvProfileData: input.idvProfileData,
            ukAuthFactors: undefined,
          })
        );

        expect(result.current).toEqual({ navigate: expect.any(Function) });
        result.current.navigate();

        expect(mockedNavigate).toHaveBeenCalledWith('OnboardingStack', expected);

        if (mixPanelEvent) {
          expect(mockedEventTracking).toHaveBeenCalledWith({
            event: MONEY_OPEN_SSA_CLICK_SET_UP_NOW,
            categoryName: 'user action',
            metaData: {
              module: MONEY_MODULE_NAME,
            },
          });
        }
      }
    );
  });

  describe('Same flow for UK, AU citizen', () => {
    test.each([
      {
        input: {
          eWalletSetupStatus: WalletSetupStatus.Completed,
          ukWalletUserToken: 'fake-token',
        },
        expected: {
          screen: 'Success',
        },
      },
      {
        input: {
          eWalletSetupStatus: WalletSetupStatus.None,
        },
        expected: {
          screen: 'Dashboard',
        },
      },
    ])('should navigate to $expected.screen when wallet status is $input.eWalletSetupStatus', ({ expected, input }) => {
      const { result } = renderHook(() =>
        useContinueOnboardingCTA({
          eWalletSetupStatus: input.eWalletSetupStatus,
          idvProfileData: undefined,
          ukAuthFactors: undefined,
        })
      );

      expect(result.current).toEqual({ navigate: expect.any(Function) });
      result.current.navigate();

      expect(mockedNavigate).toHaveBeenCalledWith('OnboardingStack', expected);
    });
  });
});
