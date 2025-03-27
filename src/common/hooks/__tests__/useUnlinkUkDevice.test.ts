import type { GetWalletStatusQuery } from '../../../new-graphql/generated';
import { useGetWalletStatusQuery, WalletSetupStatus } from '../../../new-graphql/generated';
import { aSetupStatus } from '../../../new-graphql/mocks/generated-mocks';
import type { MockQueryResult } from '../../types/react-query';
import { renderHook } from '../../utils/testing';
import { mockUseCheckUKPermissionWithLoadingState } from '../__mocks__/useCheckUKPermission';
import { useUnlinkUkDeviceEnrollment } from '../useUnlinkUkDeviceEnrollment';

const mockUseGetWalletStatusQuery = useGetWalletStatusQuery as unknown as jest.Mock<
  MockQueryResult<GetWalletStatusQuery>
>;

const mockUnlinkMutation = jest.fn();
jest.mock('../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../new-graphql/generated'),
  useUnlinkUkDeviceMutation: () => mockUnlinkMutation,
  useGetWalletStatusQuery: jest.fn(),
}));

describe('useUnlinkUkDevice', () => {
  it('should do nothing if user permission is loading', async () => {
    mockUseCheckUKPermissionWithLoadingState.mockReturnValue({
      hasPermission: false,
      isLoading: true,
    });
    mockUseGetWalletStatusQuery.mockReturnValue({
      data: { me: { wallet: { details: { setupStatus: aSetupStatus(), status: '' } } } },
    });

    renderHook(() => useUnlinkUkDeviceEnrollment());

    expect(mockUnlinkMutation).not.toHaveBeenCalled();
  });

  it('should do nothing if user permission is loaded and not uk wallet user', async () => {
    mockUseCheckUKPermissionWithLoadingState.mockReturnValue({
      hasPermission: false,
      isLoading: false,
    });
    mockUseGetWalletStatusQuery.mockReturnValue({
      data: { me: { wallet: { details: { setupStatus: aSetupStatus(), status: '' } } } },
    });

    renderHook(() => useUnlinkUkDeviceEnrollment());

    expect(mockUnlinkMutation).not.toHaveBeenCalled();
  });

  it('should do nothing if wallet is not setup', async () => {
    mockUseCheckUKPermissionWithLoadingState.mockReturnValue({
      hasPermission: true,
      isLoading: false,
    });
    mockUseGetWalletStatusQuery.mockReturnValue({
      data: {
        me: {
          wallet: {
            details: {
              setupStatus: aSetupStatus({ status: WalletSetupStatus.None }),
              status: '',
            },
          },
        },
      },
    });

    expect(mockUnlinkMutation).not.toHaveBeenCalled();
  });
});
