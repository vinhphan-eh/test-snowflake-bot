import { useLoadBrazeContentForTiles } from '../useLoadBrazeContentForTiles';

export const mockUseLoadBrazeContentForTiles = useLoadBrazeContentForTiles as jest.MockedFunction<
  typeof useLoadBrazeContentForTiles
>;

jest.mock('../useLoadBrazeContentForTiles', () => ({
  useLoadBrazeContentForTiles: jest.fn(),
}));
