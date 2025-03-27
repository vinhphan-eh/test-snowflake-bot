import type { useGetSuperAppToken, fetchSuperAppToken, clearSuperAppTokenStore } from '../useSuperAppTokenStore';

export const mockUseGetSuperAppToken = jest.fn() as jest.MockedFn<typeof useGetSuperAppToken>;
export const mockFetchValidToken = jest.fn() as jest.MockedFn<typeof fetchSuperAppToken>;
export const mockClearSuperAppTokenStore = jest.fn() as jest.MockedFn<typeof clearSuperAppTokenStore>;

jest.mock('../useSuperAppTokenStore', () => ({
  ...jest.requireActual('../useSuperAppTokenStore'),
  useGetSuperAppToken: mockUseGetSuperAppToken,
  fetchSuperAppToken: mockFetchValidToken,
  clearSuperAppTokenStore: mockClearSuperAppTokenStore,
}));
