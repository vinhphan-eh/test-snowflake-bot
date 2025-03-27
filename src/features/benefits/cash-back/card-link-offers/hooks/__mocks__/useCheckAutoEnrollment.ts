import { useCheckAutoEnrollment } from '../useCheckAutoEnrollment';

export const mockUseCheckAutoEnrollment = useCheckAutoEnrollment as jest.MockedFunction<typeof useCheckAutoEnrollment>;

jest.mock('../useCheckAutoEnrollment', () => ({
  useCheckAutoEnrollment: jest.fn(),
}));
