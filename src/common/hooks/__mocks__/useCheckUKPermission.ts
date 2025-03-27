import { useCheckUKPermission, useCheckUKPermissionWithLoadingState } from '../useCheckUKPermission';

export const mockUseCheckUKPermissionWithLoadingState = useCheckUKPermissionWithLoadingState as jest.MockedFunction<
  typeof useCheckUKPermissionWithLoadingState
>;

export const mockUseCheckUKPermission = useCheckUKPermission as jest.MockedFunction<typeof useCheckUKPermission>;

jest.mock('../useCheckUKPermission', () => ({
  useCheckUKPermissionWithLoadingState: jest.fn(),
  useCheckUKPermission: jest.fn(),
}));
