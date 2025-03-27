import { mockJestFn } from '../../types/jest';
import { useIsAccountNZ } from '../useIsAccountNZ';

export const mockUseIsAccountNZWithLoadingState = mockJestFn(useIsAccountNZ);

jest.mock('../useIsAccountNZ', () => ({
  useIsAccountNZ: jest.fn(),
}));
