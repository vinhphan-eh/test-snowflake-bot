import { mockJestFn } from '../../types/jest';
import { useCheckBenefitsNZ } from '../useCheckBenefitsNZ';

export const mockUseCheckBenefitsNZ = mockJestFn(useCheckBenefitsNZ);

jest.mock('../useCheckBenefitsNZ', () => ({
  useCheckBenefitsNZ: jest.fn(),
}));
