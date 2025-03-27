import { useFetchEmploymentHistory } from '../useFetchEmploymentHistory';

export const mockUseFetchEmploymentHistory = useFetchEmploymentHistory as jest.MockedFunction<
  typeof useFetchEmploymentHistory
>;

jest.mock('../useFetchEmploymentHistory', () => ({
  useFetchEmploymentHistory: jest.fn(),
}));
