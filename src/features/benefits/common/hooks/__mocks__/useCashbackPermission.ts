import { useCashbackPermission } from '../useCashbackPermission';

export const mockUseCashbackPermission = useCashbackPermission as jest.MockedFn<typeof useCashbackPermission>;

jest.mock('../useCashbackPermission', () => ({
  useCashbackPermission: jest.fn(),
}));
