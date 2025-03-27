import { useBillPromotionPermission } from '../useBillPromotionPermission';

export const mockUseBillPromotionPermission = useBillPromotionPermission as jest.MockedFunction<
  typeof useBillPromotionPermission
>;

jest.mock('../useBillPromotionPermission', () => ({
  ...jest.requireActual('../useBillPromotionPermission'),
  useBillPromotionPermission: jest.fn(),
}));
