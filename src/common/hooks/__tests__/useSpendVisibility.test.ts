import { useCheckCardByRegion } from '../../../features/spend-account/hooks/useCheckCardByRegion';
import { mockServerNode } from '../../../mock-server/mockServerNode';
import { mockGetEhProfileQuery } from '../../../new-graphql/generated';
import { Region } from '../../../providers/LocalisationProvider/constants';
import type { PermissionData } from '../../stores/usePermissionStore';
import { usePermissionStore } from '../../stores/usePermissionStore';
import { act, renderHook, waitFor } from '../../utils/testing';
import { mockUseIsAccountAU } from '../__mocks__/useIsAccountAU';
import { ukCountryCodes } from '../useIsCountrySupported';
import { useIsWalletSetupComplete } from '../useIsWalletSetupComplete';
import { useSpendVisibilityForOmop, useSpendVisibilityLegacy } from '../useSpendVisibility';

const mockUseCheckCardByRegion = useCheckCardByRegion as jest.MockedFn<typeof useCheckCardByRegion>;
const mockUseIsWalletSetupComplete = useIsWalletSetupComplete as jest.MockedFn<typeof useIsWalletSetupComplete>;

jest.mock('../../../features/spend-account/hooks/useCheckCardByRegion');

jest.mock('../../../common/hooks/useIsWalletSetupComplete');

describe('useSpendVisibilityLegacy', () => {
  describe('when some APIs are failed', () => {
    beforeEach(() => {
      mockUseCheckCardByRegion.mockReturnValue({
        isCardLoading: false,
        isCardNotFound: false,
        isServerDown: true,
        isFetching: false,
        currentRegion: Region.au,
      });
      mockUseIsWalletSetupComplete.mockReturnValue({
        isWalletSetupComplete: false,
        isLoading: false,
        isError: true,
        isFetched: false,
      });

      act(() => {
        const mockPermissions: PermissionData = { superAppWallet: { view: true } } as PermissionData;
        usePermissionStore.setState({ permissions: mockPermissions });
      });
    });

    it('should not show Spend tab', async () => {
      const { result } = renderHook(() => useSpendVisibilityLegacy());
      await waitFor(() => {
        expect(result.current.showSpendTab).toBe(false);
        expect(result.current.isError).toBe(true);
      });
    });
  });

  describe('when wallet permission is true', () => {
    beforeEach(() => {
      mockUseCheckCardByRegion.mockReturnValue({
        isCardLoading: false,
        isCardNotFound: false,
        isServerDown: false,
        isFetching: false,
        currentRegion: Region.au,
      });
      mockUseIsWalletSetupComplete.mockReturnValue({
        isWalletSetupComplete: true,
        isLoading: false,
        isError: false,
        isFetched: true,
      });

      act(() => {
        const mockPermissions: PermissionData = { superAppWallet: { view: true } } as PermissionData;
        usePermissionStore.setState({ permissions: mockPermissions });
      });
    });

    it('returns showSpendTab as true', async () => {
      const { result } = renderHook(() => useSpendVisibilityLegacy());
      await waitFor(() => {
        expect(result.current.showSpendTab).toBe(true);
      });
    });
  });

  describe('when wallet permission is true and card is setup', () => {
    beforeEach(() => {
      act(() => {
        const mockPermissions: PermissionData = { superAppWallet: { view: true } } as PermissionData;
        usePermissionStore.setState({ permissions: mockPermissions });
      });
      mockUseCheckCardByRegion.mockReturnValue({
        isCardLoading: false,
        isCardNotFound: false,
        isServerDown: false,
        isFetching: false,
        currentRegion: Region.au,
      });
      mockUseIsWalletSetupComplete.mockReturnValue({
        isWalletSetupComplete: true,
        isLoading: false,
        isError: false,
        isFetched: true,
      });
    });

    it('returns showSpendTab as true', async () => {
      const { result } = renderHook(() => useSpendVisibilityLegacy());
      await waitFor(() => {
        expect(result.current.showSpendTab).toBe(true);
      });
    });

    it('returns showCardTab as true', async () => {
      mockUseCheckCardByRegion.mockReturnValue({
        isCardLoading: false,
        isCardNotFound: false,
        isServerDown: false,
        isFetching: false,
        currentRegion: Region.au,
      });

      const { result } = renderHook(() => useSpendVisibilityLegacy());
      await waitFor(() => {
        expect(result.current.showCardTab).toBe(true);
      });
    });
  });

  describe('when stash permission is true and spend account is setup', () => {
    beforeEach(() => {
      act(() => {
        mockUseIsAccountAU.mockReturnValue(true);
        mockUseCheckCardByRegion.mockReturnValue({
          isCardLoading: false,
          isCardNotFound: false,
          isServerDown: false,
          isFetching: false,
          currentRegion: Region.au,
        });
        mockUseIsWalletSetupComplete.mockReturnValue({
          isWalletSetupComplete: true,
          isLoading: false,
          isError: false,
          isFetched: true,
        });

        const mockPermissions: PermissionData = {
          superAppWallet: { view: true },
          eBenStash: { view: true },
        } as PermissionData;
        usePermissionStore.setState({ permissions: mockPermissions });
      });
    });

    it('returns showStashTab as true', async () => {
      const { result } = renderHook(() => useSpendVisibilityLegacy());
      await waitFor(() => {
        expect(result.current.showStashTab).toBe(true);
      });
    });
  });
});

describe('useSpendVisibilityForOmop', () => {
  describe('when isOmopAccountUK is true and wallet permission is true', () => {
    beforeEach(() => {
      mockServerNode.use(
        mockGetEhProfileQuery((_, res, context) => {
          return res(context.data({ me: { hrDetails: { countryCode: ukCountryCodes[0] } } }));
        })
      );
      mockUseIsWalletSetupComplete.mockReturnValue({
        isWalletSetupComplete: true,
        isLoading: false,
        isError: false,
        isFetched: true,
      });

      act(() => {
        const mockPermissions: PermissionData = { superAppWallet: { view: true } } as PermissionData;
        usePermissionStore.setState({ permissions: mockPermissions });
      });
    });

    it('returns showSpendTab as true', async () => {
      const { result } = renderHook(() => useSpendVisibilityForOmop());
      await waitFor(() => {
        expect(result.current.showSpendTab).toBe(true);
      });
    });

    it('returns showCardTab as false', async () => {
      const { result } = renderHook(() => useSpendVisibilityForOmop());
      await waitFor(() => {
        expect(result.current.showCardTab).toBe(false);
      });
    });

    it('returns showStashTab as false', async () => {
      const { result } = renderHook(() => useSpendVisibilityForOmop());
      await waitFor(() => {
        expect(result.current.showStashTab).toBe(false);
      });
    });
  });
});

describe('special case: employees from blacklisted organisations', () => {
  beforeEach(() => {
    act(() => {
      const mockPermissions: PermissionData = {
        /**
         * Employees from blacklisted organisation will have both of these feature flags' checks failed
         */
        superAppWallet: { view: false },
        ebenStash: { view: false },
        eben_money_pillar_black_list: { view: true },
      } as unknown as PermissionData;
      usePermissionStore.setState({ permissions: mockPermissions });
    });
  });

  describe('having valid SSA created', () => {
    it('Legacy check - should be allowed to access Spend tab and use Stash feature', async () => {
      mockUseIsAccountAU.mockReturnValue(true);
      mockUseCheckCardByRegion.mockReturnValue({
        isCardLoading: false,
        isCardNotFound: false,
        isServerDown: false,
        isFetching: false,
        currentRegion: Region.au,
      });
      mockUseIsWalletSetupComplete.mockReturnValue({
        isWalletSetupComplete: true,
        isLoading: false,
        isError: false,
        isFetched: true,
      });

      const { result } = renderHook(() => useSpendVisibilityLegacy());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.showSpendTab).toBe(true);
        expect(result.current.showStashTab).toBe(true);
        expect(result.current.showCardTab).toBe(true);
      });
    });

    it('OMOP check - should be allowed to access Spend tab', async () => {
      mockServerNode.use(
        mockGetEhProfileQuery((_, res, context) => {
          return res(context.data({ me: { hrDetails: { countryCode: ukCountryCodes[0] } } }));
        })
      );
      mockUseIsWalletSetupComplete.mockReturnValue({
        isWalletSetupComplete: true,
        isLoading: false,
        isError: false,
        isFetched: true,
      });

      const { result } = renderHook(() => useSpendVisibilityForOmop());
      await waitFor(() => {
        expect(result.current.showSpendTab).toBe(true);
        expect(result.current.showStashTab).toBe(false);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.showCardTab).toBe(false);
      });
    });
  });

  describe('not having valid SSA', () => {
    it('Legacy check - should not be allowed to access Spend tab and use Stash feature', async () => {
      mockUseIsAccountAU.mockReturnValue(true);
      mockUseCheckCardByRegion.mockReturnValue({
        isCardLoading: false,
        isCardNotFound: true,
        isServerDown: false,
        isFetching: false,
        currentRegion: Region.au,
      });
      mockUseIsWalletSetupComplete.mockReturnValue({
        isWalletSetupComplete: false,
        isLoading: false,
        isError: false,
        isFetched: true,
      });

      const { result } = renderHook(() => useSpendVisibilityLegacy());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.showSpendTab).toBe(false);
        expect(result.current.showStashTab).toBe(false);
        expect(result.current.showCardTab).toBe(false);
      });
    });

    it('OMOP check - should not be allowed to access Spend tab', async () => {
      mockServerNode.use(
        mockGetEhProfileQuery((_, res, context) => {
          return res(context.data({ me: { hrDetails: { countryCode: ukCountryCodes[0] } } }));
        })
      );
      mockUseIsWalletSetupComplete.mockReturnValue({
        isWalletSetupComplete: false,
        isLoading: false,
        isError: false,
        isFetched: true,
      });

      const { result } = renderHook(() => useSpendVisibilityForOmop());
      await waitFor(() => {
        expect(result.current.showSpendTab).toBe(false);
        expect(result.current.showStashTab).toBe(false);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.showCardTab).toBe(false);
      });
    });
  });
});
