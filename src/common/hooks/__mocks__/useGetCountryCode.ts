import { useGetCountryCode } from '../useGetCountryCode';

export const mockUseGetCountryCode = useGetCountryCode as jest.MockedFunction<typeof useGetCountryCode>;

jest.mock('../useGetCountryCode', () => ({ useGetCountryCode: jest.fn() }));
