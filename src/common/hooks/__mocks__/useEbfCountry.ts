import { mockJestFn } from '../../types/jest';
import { useEbfCountry } from '../useEbfCountry';

export const mockUseEbfCountry = mockJestFn(useEbfCountry);

jest.mock('../useEbfCountry', () => ({
  useEbfCountry: jest.fn(),
}));
