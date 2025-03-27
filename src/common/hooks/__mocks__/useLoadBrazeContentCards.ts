import { useLoadBrazeContentCards } from '../useLoadBrazeContentCards';

export const mockUseLoadBrazeContentCards = useLoadBrazeContentCards as jest.MockedFn<typeof useLoadBrazeContentCards>;

jest.mock('../useLoadBrazeContentCards', () => ({
  useLoadBrazeContentCards: jest.fn(),
}));
