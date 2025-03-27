import { useNearestLocation } from '../useNearestLocation';

export const mockUseNearestLocation = useNearestLocation as jest.MockedFunction<typeof useNearestLocation>;

jest.mock('../useNearestLocation', () => ({
  useNearestLocation: jest.fn(),
}));
