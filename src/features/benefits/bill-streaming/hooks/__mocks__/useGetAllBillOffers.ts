import { useGetAllBillOffers } from '../useGetAllBillOffers';

export const mockUseGetAllBillOffers = useGetAllBillOffers as jest.MockedFunction<typeof useGetAllBillOffers>;

jest.mock('../useGetAllBillOffers', () => ({
  useGetAllBillOffers: jest.fn(),
}));
