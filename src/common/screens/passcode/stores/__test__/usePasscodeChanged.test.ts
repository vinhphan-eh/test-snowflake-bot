import type { GetWalletStatusQuery } from '../../../../../new-graphql/generated';
import {
  useCreateUkPasscodeMutation,
  useGetWalletStatusQuery,
  WalletSetupStatus,
} from '../../../../../new-graphql/generated';
import { aSetupStatus } from '../../../../../new-graphql/mocks/generated-mocks';
import { useCheckUKPermission } from '../../../../hooks/useCheckUKPermission';
import type { MockMutation, MockQueryResult } from '../../../../types/react-query';
import { renderHook } from '../../../../utils/testing';
import { usePasscodeChanged } from '../usePasscodeChanged';

jest.mock('../../../../hooks/useCheckUKPermission', () => ({
  useCheckUKPermission: jest.fn(),
}));

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useCreateUkPasscodeMutation: jest.fn(),
  useGetWalletStatusQuery: jest.fn(),
}));

const mockSetUkPasscodeApi = jest.fn();
const mockUseCreateUkPasscodeMutation = useCreateUkPasscodeMutation as unknown as jest.Mock<MockMutation>;
const mockUseGetWalletStatusQuery = useGetWalletStatusQuery as unknown as jest.Mock<
  MockQueryResult<GetWalletStatusQuery>
>;
(mockUseGetWalletStatusQuery as unknown as { getKey: () => string }).getKey = jest.fn();

describe('usePasscodeChanged', () => {
  beforeEach(() => {
    mockUseCreateUkPasscodeMutation.mockReturnValue({ mutateAsync: mockSetUkPasscodeApi });
  });

  describe('should not call api to set uk passcode', () => {
    test.each([
      { status: WalletSetupStatus.None, userCountry: 'AU' },
      { status: WalletSetupStatus.InProgress, userCountry: 'AU' },
      { status: WalletSetupStatus.None, userCountry: 'UK' },
    ])(`user from $userCountry and wallet status is $eWalletSetupStatus`, ({ status, userCountry }) => {
      (useCheckUKPermission as jest.Mock).mockReturnValue(userCountry === 'UK');
      mockUseGetWalletStatusQuery.mockReturnValue({
        data: { me: { wallet: { details: { setupStatus: aSetupStatus({ status }), status: '' } } } },
      });

      const { result } = renderHook(() => usePasscodeChanged());
      expect(result.current).toEqual({ onPasscodeChanged: expect.any(Function) });
      result.current.onPasscodeChanged('123456');
      expect(mockSetUkPasscodeApi).not.toHaveBeenCalled();
    });

    test.each([
      {
        userCountry: 'AU',
      },
      {
        userCountry: 'UK',
      },
    ])(`user hasn't set up wallet even user from $userCountry`, ({ userCountry }) => {
      (useCheckUKPermission as jest.Mock).mockReturnValue(userCountry === 'UK');
      mockUseGetWalletStatusQuery.mockReturnValue({
        data: { me: { wallet: { details: { setupStatus: null, status: '' } } } },
      });

      const { result } = renderHook(() => usePasscodeChanged());
      expect(result.current).toEqual({ onPasscodeChanged: expect.any(Function) });
      result.current.onPasscodeChanged('123456');
      expect(mockSetUkPasscodeApi).not.toHaveBeenCalled();
    });
  });

  describe('should call api to set uk passcode', () => {
    test('should call api when user from UK and wallet status is in progress', () => {
      (useCheckUKPermission as jest.Mock).mockReturnValue(true);
      mockUseGetWalletStatusQuery.mockReturnValue({
        data: {
          me: {
            wallet: {
              details: {
                setupStatus: aSetupStatus({ status: WalletSetupStatus.InProgress }),
                status: '',
              },
            },
          },
        },
      });

      const { result } = renderHook(() => usePasscodeChanged());
      expect(result.current).toEqual({ onPasscodeChanged: expect.any(Function) });
      result.current.onPasscodeChanged('123456');
      expect(mockSetUkPasscodeApi).toHaveBeenCalledWith({ input: { passcode: '123456' } });
    });
  });
});
