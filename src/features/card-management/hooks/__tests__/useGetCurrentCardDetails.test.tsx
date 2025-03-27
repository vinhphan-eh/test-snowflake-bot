import { regionLocalisationMockUtil } from '../../../../../test-setup/utils/regionLocalisationMockUtil';
import { renderHook } from '../../../../common/utils/testing';
import {
  useGetCurrentCardDetailsQuery,
  useGetEWalletUkCurrentPaymentCardDetailsQuery,
} from '../../../../new-graphql/generated';
import { aPaymentCardDetails } from '../../../../new-graphql/mocks/generated-mocks';
import { useGetCurrentCardDetails } from '../useGetCurrentCardDetails';

jest.mock('../../../../new-graphql/generated', () => ({
  useGetCurrentCardDetailsQuery: jest.fn(),
  useGetEWalletUkCurrentPaymentCardDetailsQuery: jest.fn(),
}));

describe('useGetCurrentCardDetails', () => {
  describe('AU users', () => {
    beforeEach(() => {
      regionLocalisationMockUtil('AU');

      (useGetEWalletUkCurrentPaymentCardDetailsQuery as unknown as jest.Mock).mockReturnValue({
        data: {
          me: {
            wallet: {
              UKCurrentPaymentCardV2: undefined,
            },
          },
        },
        isLoading: false,
        isError: false,
      });
    });

    it('should return properly if loading', async () => {
      (useGetCurrentCardDetailsQuery as unknown as jest.Mock).mockReturnValue({
        data: { me: { wallet: { card: { details: undefined } } } },
        isLoading: true,
        isError: false,
      });

      const { result } = renderHook(() => useGetCurrentCardDetails());
      expect(result.current).toEqual({
        data: undefined,
        isLoading: true,
        isError: false,
        currentRegion: 'AU',
      });
    });

    it('should return error if occured', async () => {
      (useGetCurrentCardDetailsQuery as unknown as jest.Mock).mockReturnValue({
        data: { me: { wallet: { card: { details: undefined } } } },
        isLoading: false,
        isError: true,
      });

      const { result } = renderHook(() => useGetCurrentCardDetails());
      expect(result.current).toEqual({
        data: undefined,
        isLoading: false,
        isError: true,
        currentRegion: 'AU',
      });
    });

    it('should return card details if successfully loaded', async () => {
      (useGetCurrentCardDetailsQuery as unknown as jest.Mock).mockReturnValue({
        data: { me: { wallet: { card: { details: { id: '12' } } } } },
        isLoading: false,
        isError: true,
      });

      const { result } = renderHook(() => useGetCurrentCardDetails());
      expect(result.current).toEqual({
        data: { id: '12' },
        isLoading: false,
        isError: true,
        currentRegion: 'AU',
      });
    });
  });

  describe('UK users', () => {
    beforeEach(() => {
      regionLocalisationMockUtil('GB');

      (useGetCurrentCardDetailsQuery as unknown as jest.Mock).mockReturnValue({
        data: { me: { wallet: { card: { details: { id: undefined } } } } },
        isLoading: false,
        isError: false,
      });
    });

    it('should return properly if loading', async () => {
      (useGetEWalletUkCurrentPaymentCardDetailsQuery as unknown as jest.Mock).mockReturnValue({
        data: {
          me: {
            wallet: {
              UKCurrentPaymentCardV2: undefined,
            },
          },
        },
        isLoading: true,
        isError: false,
      });

      const { result } = renderHook(() => useGetCurrentCardDetails());
      expect(result.current).toEqual({
        data: undefined,
        isLoading: true,
        isError: false,
        currentRegion: 'GB',
      });
    });

    it('should return error if occured', async () => {
      (useGetEWalletUkCurrentPaymentCardDetailsQuery as unknown as jest.Mock).mockReturnValue({
        data: {
          me: {
            wallet: {
              UKCurrentPaymentCardV2: undefined,
            },
          },
        },
        isLoading: false,
        isError: true,
      });

      const { result } = renderHook(() => useGetCurrentCardDetails());
      expect(result.current).toEqual({
        data: undefined,
        isLoading: false,
        isError: true,
        currentRegion: 'GB',
      });
    });

    it('should return card details if successfully loaded', async () => {
      (useGetEWalletUkCurrentPaymentCardDetailsQuery as unknown as jest.Mock).mockReturnValue({
        data: {
          me: {
            wallet: {
              UKCurrentPaymentCardV2: aPaymentCardDetails(),
            },
          },
        },
        isLoading: false,
        isError: true,
      });

      const { result } = renderHook(() => useGetCurrentCardDetails());
      expect(result.current).toEqual({
        data: aPaymentCardDetails(),
        isLoading: false,
        isError: true,
        currentRegion: 'GB',
      });
    });
  });
});
