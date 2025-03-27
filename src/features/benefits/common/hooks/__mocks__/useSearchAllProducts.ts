import { useSearchAllProducts } from '../useSearchAllProducts';

export const mockUseSearchAllProducts = useSearchAllProducts as jest.MockedFunction<typeof useSearchAllProducts>;

jest.mock('../useSearchAllProducts', () => ({
  useSearchAllProducts: jest.fn(),
}));
