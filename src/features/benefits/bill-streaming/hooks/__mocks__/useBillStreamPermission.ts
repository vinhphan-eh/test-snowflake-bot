import { useBillStreamPermission, useBillStreamPermissionByProvider } from '../useBillStreamPermission';

export const mockUseBillStreamPermission = useBillStreamPermission as jest.MockedFunction<
  typeof useBillStreamPermission
>;

export const mockUseBillStreamPermissionByProvider = useBillStreamPermissionByProvider as jest.MockedFunction<
  typeof useBillStreamPermissionByProvider
>;

jest.mock('../useBillStreamPermission', () => ({
  ...jest.requireActual('../useBillStreamPermission'),
  useBillStreamPermission: jest.fn(),
  useBillStreamPermissionByProvider: jest.fn(),
}));
