import { useSwagStorePermission } from '../useSwagStorePermission';

export const mockUseSwagStorePermission = useSwagStorePermission as jest.MockedFunction<typeof useSwagStorePermission>;

jest.mock('../useSwagStorePermission', () => ({
  ...jest.requireActual('../useSwagStorePermission'),
  useSwagStorePermission: jest.fn(),
}));
