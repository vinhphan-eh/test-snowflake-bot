import { useIsBenefitsNewUser } from '../useIsBenefitsNewUser';

export const mockUseIsBenefitsNewUser = useIsBenefitsNewUser as jest.MockedFunction<typeof useIsBenefitsNewUser>;

jest.mock('../useIsBenefitsNewUser', () => ({
  useIsBenefitsNewUser: jest.fn(),
}));
