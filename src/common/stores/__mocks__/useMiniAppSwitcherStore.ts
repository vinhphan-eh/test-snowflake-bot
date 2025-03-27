import { switchPillar } from '../useMiniAppSwitcherStore';

export const mockedSwitchPillar = switchPillar as jest.MockedFunction<typeof switchPillar>;

jest.mock('../useMiniAppSwitcherStore', () => ({
  switchPillar: jest.fn(),
}));
