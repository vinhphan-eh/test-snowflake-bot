import { setDefaultSearchQuery } from '../useInstoreTabStore';

export const mockSetDefaultSearchQuery = setDefaultSearchQuery as jest.MockedFn<typeof setDefaultSearchQuery>;

jest.mock('../useInstoreTabStore', () => ({
  ...jest.requireActual('../useInstoreTabStore'),
  setDefaultSearchQuery: jest.fn(),
}));
