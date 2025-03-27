import { renderHook } from '../../../../../../common/utils/testing';
import {
  useCashbackDeleteCardMutation,
  useCashbackLinkedCardsQuery,
  useGetCurrentCardDetailsQuery,
  useGetEhProviderIdQuery,
} from '../../../../../../new-graphql/generated';
import { AutoEnrolStatus } from '../../constants/autoEnrol';
import { useAutoEnrolHeroWallet } from '../useAutoEnrolHeroWallet';
import { useEnrolCardFlow } from '../useEnrolCardFlow';
import { useGetPokitpalToken } from '../useGetPokitpalToken';
import { useMeaWalletMcd } from '../useMeaWalletMcd';
import { usePokitpalAccount } from '../usePokitpalAccount';

const fakeCardData = {
  pan: '4368929491964365',
  expiry: '2024-05-10',
  bankProvider: '71',
};

const mockUseGetPokitpalToken = useGetPokitpalToken as jest.MockedFunction<typeof useGetPokitpalToken>;

jest.mock('../useGetPokitpalToken');

jest.mock('../../../../../../graphql/generated', () => ({
  useCashbackEmploymentHeroProviderIdQuery: jest.fn(),
}));
jest.mock('../../../../../../new-graphql/generated', () => ({
  useGetEhProviderIdQuery: jest.fn(),
  useGetCurrentCardDetailsQuery: jest.fn(),
  useCashbackDeleteCardMutation: jest.fn(),
  useCashbackLinkedCardsQuery: jest.fn(),
}));

jest.mock('../usePokitpalAccount', () => ({
  usePokitpalAccount: jest.fn(),
}));

jest.mock('../useMeaWalletMcd', () => ({
  useMeaWalletMcd: jest.fn(),
}));

jest.mock('../useEnrolCardFlow', () => ({
  useEnrolCardFlow: jest.fn(),
}));

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

describe('useAutoEnrolHeroWallet hook', () => {
  const mockRegisterUserBank = jest.fn();
  const mockGetUserCardData = jest.fn();
  const mockEnrolCard = jest.fn();
  const mockDeleteCard = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();

    mockUseGetPokitpalToken.mockReturnValue({
      getToken: () => Promise.resolve({ token: 'test-token', key: 'test-key' }),
      isLoading: false,
    });

    (useCashbackDeleteCardMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockDeleteCard,
    });

    (useGetCurrentCardDetailsQuery as unknown as jest.Mock).mockReturnValue({
      data: { me: { wallet: { card: { details: { id: '12' } } } } },
    });

    (useCashbackLinkedCardsQuery as unknown as jest.Mock).mockReturnValue({
      refetch: () => ({
        data: {
          me: {
            cashback: {
              linkedCards: {
                cards: [],
              },
            },
          },
        },
      }),
    });

    (useGetEhProviderIdQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          cashback: {
            ehProviderId: {
              id: '71',
            },
          },
        },
      },
    });

    (usePokitpalAccount as jest.Mock).mockReturnValue({
      registerUserBankIfDoNotExist: mockRegisterUserBank,
    });

    (useMeaWalletMcd as jest.Mock).mockReturnValue({
      getUserCardData: mockGetUserCardData,
    });

    (useEnrolCardFlow as jest.Mock).mockReturnValue({
      enrolCard: mockEnrolCard,
    });
  });

  it('should throw error when there is no hero wallet', async () => {
    (useGetCurrentCardDetailsQuery as unknown as jest.Mock).mockReturnValue({
      data: undefined,
    });

    const {
      result: {
        current: { autoEnrolCard },
      },
    } = renderHook(() => useAutoEnrolHeroWallet());

    await expect(autoEnrolCard()).rejects.toThrow(AutoEnrolStatus.NO_SWAG_CARD);
    expect(mockRegisterUserBank).toBeCalledWith(false);
  });

  it('should throw error when already linked hero wallet', async () => {
    (useCashbackLinkedCardsQuery as unknown as jest.Mock).mockReturnValue({
      refetch: () => ({
        data: {
          me: {
            cashback: {
              linkedCards: {
                cards: [heroWalletLinkedCard],
              },
            },
          },
        },
      }),
    });

    const {
      result: {
        current: { autoEnrolCard },
      },
    } = renderHook(() => useAutoEnrolHeroWallet());

    await expect(autoEnrolCard()).resolves.not.toThrowError();
    expect(mockRegisterUserBank).toBeCalledWith(false);
  });

  it('should throw error when getUserCardData failed', async () => {
    const {
      result: {
        current: { autoEnrolCard },
      },
    } = renderHook(() => useAutoEnrolHeroWallet());

    await expect(autoEnrolCard()).rejects.toThrow(AutoEnrolStatus.CAN_NOT_ENROL_SWAG_CARD);
    expect(mockRegisterUserBank).toBeCalledWith(false);
  });

  it('should throw error when failed to fetch token', async () => {
    mockGetUserCardData.mockImplementation(() => fakeCardData);
    mockUseGetPokitpalToken.mockReturnValue({
      getToken: () => Promise.resolve(undefined),
      isLoading: false,
    });
    const {
      result: {
        current: { autoEnrolCard },
      },
    } = renderHook(() => useAutoEnrolHeroWallet());

    await expect(autoEnrolCard()).rejects.toThrow(AutoEnrolStatus.NO_POKITPAL_TOKEN);
    expect(mockRegisterUserBank).not.toBeCalledWith(false);
  });

  it('should throw error when no eh provider id', async () => {
    mockGetUserCardData.mockImplementation(() => fakeCardData);

    (useGetEhProviderIdQuery as unknown as jest.Mock).mockReturnValue({
      data: undefined,
    });
    const {
      result: {
        current: { autoEnrolCard },
      },
    } = renderHook(() => useAutoEnrolHeroWallet());

    await expect(autoEnrolCard()).rejects.toThrow(AutoEnrolStatus.CAN_NOT_ENROL_SWAG_CARD);
    expect(mockRegisterUserBank).toBeCalledWith(false);
  });

  it('should work correctly', async () => {
    mockGetUserCardData.mockImplementation(() => fakeCardData);

    const {
      result: {
        current: { autoEnrolCard },
      },
    } = renderHook(() => useAutoEnrolHeroWallet());

    await autoEnrolCard();
    // enrolHeroWalletToLinkedCard
    expect(mockGetUserCardData).toBeCalled();
    expect(mockEnrolCard).toBeCalledWith({
      bankProvider: '71',
      cardNumber: '4368929491964365',
      expiryDate: '0524',
    });
    expect(mockRegisterUserBank).toBeCalledWith(false);
  });

  it('should work correctly when deregistering old linked card and enrol new', async () => {
    mockGetUserCardData.mockImplementation(() => fakeCardData);
    (useCashbackLinkedCardsQuery as unknown as jest.Mock).mockReturnValue({
      refetch: () => ({
        data: {
          me: {
            cashback: {
              linkedCards: {
                cards: [heroWalletLinkedCard],
              },
            },
          },
        },
      }),
    });

    const {
      result: {
        current: { autoEnrolCard },
      },
    } = renderHook(() => useAutoEnrolHeroWallet());

    await autoEnrolCard(true);

    expect(mockDeleteCard).toBeCalledWith({ deleteCard: { cardId: 12 } });
    expect(mockEnrolCard).toBeCalledWith({
      bankProvider: '71',
      cardNumber: '4368929491964365',
      expiryDate: '0524',
    });
    expect(mockRegisterUserBank).toBeCalledWith(true);
  });
});
