import { mockServerNode } from '../../../mock-server/mockServerNode';
import {
  mockGetEhProfileQuery,
  mockGetOrgsQuery,
  WalletSetupStatus,
  mockGetWalletStatusQuery,
} from '../../../new-graphql/generated';
import { aHrOrg } from '../../../new-graphql/mocks/generated-mocks';
import { useSessionStore } from '../../stores/useSessionStore';
import { renderHook, waitFor } from '../../utils/testing';
import * as useIsAccountAUModule from '../useIsAccountAU';
import * as useIsCandidateModule from '../useIsCandidate';
import * as useIsOnlyContractorModule from '../useIsOnlyContractor';
import * as useIsWalletSetupCompleteModule from '../useIsWalletSetupComplete';
import * as useIsWorkzoneModule from '../useIsWorkzone';
import { useShowPaySplit } from '../useShowPaySplit';

describe('useShowPaySplit', () => {
  it.each`
    countryCode | workzoneCountryCode | isCandidate | isWalletSetupComplete | isWorkZone | isOnlyContractor | expectedShowPaySplit
    ${'AUS'}    | ${'en-AU'}          | ${false}    | ${true}               | ${false}   | ${false}         | ${true}
    ${'AUS'}    | ${'en-AU'}          | ${false}    | ${true}               | ${false}   | ${true}          | ${false}
  `(
    `showPaySplit should work correctly
    when countryCode is $countryCode,
    workzoneCountryCode is $workzoneCountryCode,
    isCandidate is $isCandidate,
    isWalletSetupComplete is $isWalletSetupComplete,
    isWorkZone is $isWorkZone,
    isOnlyContractor is $isOnlyContractor`,
    async ({
      expectedShowPaySplit,
      isCandidate,
      isOnlyContractor,
      isWalletSetupComplete,
      isWorkZone,
      workzoneCountryCode,
    }) => {
      jest.spyOn(useIsWorkzoneModule, 'useIsWorkzone').mockReturnValue(isWorkZone);
      jest.spyOn(useIsCandidateModule, 'useIsCandidateV2').mockReturnValue(isCandidate);
      jest.spyOn(useIsWalletSetupCompleteModule, 'useIsWalletSetupComplete').mockReturnValue({
        isWalletSetupComplete,
        isError: false,
        isLoading: false,
        isFetched: true,
      });
      jest.spyOn(useIsOnlyContractorModule, 'useIsOnlyContractor').mockReturnValue({
        isOnlyContractor,
        isError: false,
        isLoading: false,
      });
      jest.spyOn(useIsAccountAUModule, 'useIsAccountAU').mockReturnValue(true);
      useSessionStore.setState({ workzoneCountryCode });

      mockServerNode.use(
        mockGetWalletStatusQuery((_, res, ctx) =>
          res(
            ctx.data({
              me: {
                wallet: {
                  details: {
                    setupStatus: {
                      status: isWalletSetupComplete ? WalletSetupStatus.Completed : WalletSetupStatus.InProgress,
                    },
                    status: 'APPROVED',
                  },
                },
              },
            })
          )
        ),
        mockGetOrgsQuery((_, res, ctx) =>
          res(
            ctx.data({
              me: {
                orgs: [aHrOrg({ isIndependentContractor: isOnlyContractor })],
              },
            })
          )
        ),
        mockGetEhProfileQuery((_, res, ctx) =>
          res(
            ctx.data({
              me: {
                hrDetails: {
                  countryCode: 'AUS',
                },
              },
            })
          )
        )
      );

      const hook = renderHook(() => useShowPaySplit());

      await waitFor(() => {
        expect(hook.result.current).toBe(expectedShowPaySplit);
      });
    }
  );
});
