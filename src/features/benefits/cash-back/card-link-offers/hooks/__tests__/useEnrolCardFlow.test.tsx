import axios, { AxiosError, AxiosHeaders } from 'axios';
import { queryClient } from '../../../../../../common/libs/queryClient';
import { useToast } from '../../../../../../common/shared-hooks/useToast';
import { renderHook } from '../../../../../../common/utils/testing';
import { AutoEnrolStatus } from '../../constants/autoEnrol';
import type { EnrolCardData } from '../useEnrolCardFlow';
import { useEnrolCardFlow } from '../useEnrolCardFlow';
import { useGetPokitpalToken } from '../useGetPokitpalToken';

const mockUseGetPokitpalToken = useGetPokitpalToken as jest.MockedFunction<typeof useGetPokitpalToken>;

jest.mock('../useGetPokitpalToken');
jest.mock('../../../../../../common/shared-hooks/useToast', () => ({
  useToast: jest.fn(),
}));

jest.mock('../../../../../../common/libs/queryClient', () => ({
  queryClient: {
    setQueryData: jest.fn(),
  },
}));

jest.mock('axios', () => ({ ...jest.requireActual('axios') }));

const mockEnrolCardData: EnrolCardData = {
  cardNumber: '1111-1111-1111-1111',
  expiryDate: '01/25',
  bankProvider: '1',
};

const mockEnrolCardResponse = {
  card: {
    id: 3,
    description: 'xxx',
    cardMasked: '1111-2222-3333-9999',
    issuer: 'visa',
    isExpired: false,
    expiry: '2025-10-01T02:20:00',
    provider: 'Westpac',
  },
};

describe('useEnrolCardFlow', () => {
  beforeEach(() => {
    mockUseGetPokitpalToken.mockReturnValue({
      getToken: () => Promise.resolve({ token: 'test-token', key: 'test-key' }),
      isLoading: false,
    });
  });

  it('should enrol a card successfully', async () => {
    axios.post = jest.fn().mockResolvedValue({ data: mockEnrolCardResponse });

    (queryClient.setQueryData as jest.Mock).mockImplementation(jest.fn());

    const {
      result: {
        current: { enrolCard },
      },
    } = renderHook(() => useEnrolCardFlow());

    const result = await enrolCard(mockEnrolCardData);

    expect(queryClient.setQueryData).toBeCalled();
    expect(result).toStrictEqual(mockEnrolCardResponse.card);
  });

  it('should show a toast message if no user token found', async () => {
    mockUseGetPokitpalToken.mockReturnValue({
      getToken: () => Promise.resolve(undefined),
      isLoading: false,
    });
    const mockShowToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue({
      show: mockShowToast,
    });
    const {
      result: {
        current: { enrolCard },
      },
    } = renderHook(() => useEnrolCardFlow(true));

    await expect(enrolCard(mockEnrolCardData)).rejects.toThrow(AutoEnrolStatus.CAN_NOT_ENROL_SWAG_CARD);

    expect(queryClient.setQueryData).not.toBeCalled();
    expect(mockShowToast).toBeCalledWith({ content: 'User does not registered!' });
  });

  it.each`
    errorCode | errorMessage
    ${'-1'}   | ${'Invalid card details. Please check and try again.'}
    ${'-45'}  | ${'This card is already linked to another rewards program. Please link another one.'}
    ${'-50'}  | ${'This card is already linked. Please link another one.'}
    ${'-5'}   | ${"You've added the maximum number of cards."}
    ${'-2'}   | ${'Card details are incorrect. Please check and try again.'}
    ${'-3'}   | ${'Card expiry date is incorrect. Please check and try again.'}
    ${'-4'}   | ${'We are currently experiencing issues communicating with the card provider. Please try again.'}
  `('should show tab correctly', async ({ errorCode, errorMessage }) => {
    const mockEnrolCardError = {
      code: errorCode,
    };
    const request = { path: '/foo' };
    const headers = new AxiosHeaders();
    const config = {
      url: 'http://localhost:3000',
      headers,
    };
    const axiosError = new AxiosError('Boom!', 'ESOMETHING', config, request, {
      status: 200,
      data: mockEnrolCardError,
      statusText: 'ok',
      config,
      headers,
    });

    axios.post = jest.fn().mockRejectedValue(axiosError);

    const mockShowToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue({
      show: mockShowToast,
    });

    (queryClient.setQueryData as jest.Mock).mockImplementation(jest.fn());

    const {
      result: {
        current: { enrolCard },
      },
    } = renderHook(() => useEnrolCardFlow(true));

    await expect(enrolCard(mockEnrolCardData)).rejects.toThrow(AutoEnrolStatus.CAN_NOT_ENROL_SWAG_CARD);

    expect(mockShowToast).toHaveBeenCalledWith({
      content: errorMessage,
    });
  });
});
