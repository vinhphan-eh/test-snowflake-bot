import { usePureMoneyPillarPermission } from '../usePureMoneyPillarPermission';

export const mockUsePureMoneyPillarPermission = usePureMoneyPillarPermission as jest.MockedFn<
  typeof usePureMoneyPillarPermission
>;

jest.mock('../usePureMoneyPillarPermission', () => ({
  usePureMoneyPillarPermission: jest.fn(),
}));
