import { useIsAccountAU } from '../useIsAccountAU';

export const mockUseIsAccountAU = useIsAccountAU as jest.MockedFunction<typeof useIsAccountAU>;

jest.mock('../useIsAccountAU', () => ({ useIsAccountAU: jest.fn() }));
