import { useCheckBenefitsUK } from '../useCheckBenefitsUK';

export const mockUseCheckBenefitsUK = useCheckBenefitsUK as jest.MockedFunction<typeof useCheckBenefitsUK>;

jest.mock('../useCheckBenefitsUK', () => ({
  useCheckBenefitsUK: jest.fn(),
}));
