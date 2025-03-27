import { regionLocalisationMockUtil } from '../../../../../test-setup/utils/regionLocalisationMockUtil';
import { renderHook } from '../../../../common/utils/testing';
import {
  Sign,
  useGetEWalletAuAccountDetailsQuery,
  useGetEWalletUkAccountDetailsQuery,
} from '../../../../new-graphql/generated';
import { aMoneyV2 } from '../../../../new-graphql/mocks/generated-mocks';
import { useGetSSADetails } from '../useGetSSADetails';

jest.mock('../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../new-graphql/generated'),
  useGetEWalletUkAccountDetailsQuery: jest.fn(),
  useGetEWalletAuAccountDetailsQuery: jest.fn(),
}));

const defaultReturnDetails = {
  accountName: '',
  accountNumber: '',
  availableBalance: undefined,
  totalBalance: 0,
  bsb: '',
};

describe('useGetSSADetails', () => {
  describe('AU users', () => {
    beforeEach(() => {
      regionLocalisationMockUtil('AU');

      (useGetEWalletUkAccountDetailsQuery as unknown as jest.Mock).mockReturnValue({
        data: {
          me: {
            wallet: {
              UKWalletDetails: undefined,
            },
          },
        },
        isLoading: false,
        isError: false,
      });
    });

    it('should return properly if loading', async () => {
      (useGetEWalletAuAccountDetailsQuery as unknown as jest.Mock).mockReturnValue({
        data: { me: null },
        isLoading: true,
      });

      const { result } = renderHook(() => useGetSSADetails());
      expect(result.current).toEqual({
        data: {
          ...defaultReturnDetails,
          currency: 'AUD',
        },
        isLoading: true,
        currentRegion: 'AU',
        isError: false,
      });
    });

    it('should return error if occured', async () => {
      (useGetEWalletAuAccountDetailsQuery as unknown as jest.Mock).mockReturnValue({
        data: { me: null },
        isLoading: false,
        isError: true,
      });

      const { result } = renderHook(() => useGetSSADetails());
      expect(result.current).toEqual({
        data: {
          currency: 'AUD',
        },
        isLoading: false,
        currentRegion: 'AU',
        isError: true,
      });
    });

    it('should return account details if successfully loaded', async () => {
      (useGetEWalletAuAccountDetailsQuery as unknown as jest.Mock).mockReturnValue({
        data: {
          me: {
            wallet: {
              details: {
                name: 'David Davis account',
                accountNumber: '123456789',
                bsb: '567222',
                availableBalance: aMoneyV2({ units: 100, subUnits: 50, sign: Sign.Positive }),
              },
            },
          },
        },
        isLoading: false,
        isError: true,
      });

      const { result } = renderHook(() => useGetSSADetails());
      expect(result.current).toEqual({
        data: {
          currency: 'AUD',
          accountName: 'David Davis account',
          accountNumber: '123456789',
          bsb: '567222',
          availableBalance: 100.5,
        },
        isLoading: false,
        currentRegion: 'AU',
        isError: true,
      });
    });
  });

  describe('UK users', () => {
    beforeEach(() => {
      regionLocalisationMockUtil('GB');

      (useGetEWalletAuAccountDetailsQuery as unknown as jest.Mock).mockReturnValue({
        data: { me: null },
        isLoading: false,
        isError: false,
      });
    });

    it('should return properly if loading', async () => {
      (useGetEWalletUkAccountDetailsQuery as unknown as jest.Mock).mockReturnValue({
        data: {
          me: {
            wallet: {
              UKWalletDetails: null,
            },
          },
        },
        isLoading: true,
      });

      const { result } = renderHook(() => useGetSSADetails());
      expect(result.current).toEqual({
        data: {
          ...defaultReturnDetails,
          currency: 'GBP',
        },
        isLoading: true,
        currentRegion: 'GB',
        isError: false,
      });
    });

    it('should return error if occured', async () => {
      (useGetEWalletUkAccountDetailsQuery as unknown as jest.Mock).mockReturnValue({
        data: {
          me: {
            wallet: {
              UKWalletDetails: null,
            },
          },
        },
        isLoading: false,
        isError: true,
      });

      const { result } = renderHook(() => useGetSSADetails());
      expect(result.current).toEqual({
        data: null,
        isLoading: false,
        currentRegion: 'GB',
        isError: true,
      });
    });

    it('should return account details if successfully loaded', async () => {
      (useGetEWalletUkAccountDetailsQuery as unknown as jest.Mock).mockReturnValue({
        data: {
          me: {
            wallet: {
              UKWalletDetails: {
                accountName: 'David Davis account',
                accountNumber: '123456789',
                sortCode: '567222',
                totalBalance: 180,
                availableBalance: 150,
                currency: 'GBP',
              },
            },
          },
        },
        isLoading: false,
        isError: true,
      });

      const { result } = renderHook(() => useGetSSADetails());
      expect(result.current).toEqual({
        data: {
          currency: 'GBP',
          accountName: 'David Davis account',
          accountNumber: '123456789',
          sortCode: '567222',
          totalBalance: 180,
          availableBalance: 150,
        },
        isLoading: false,
        currentRegion: 'GB',
        isError: true,
      });
    });
  });
});
