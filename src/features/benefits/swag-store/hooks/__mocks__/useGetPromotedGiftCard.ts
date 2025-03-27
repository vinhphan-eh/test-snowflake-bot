import { useGetPromotedGiftcard } from '../useGetPromotedGiftcard';

export const mockUseGetPromotedGiftcard = useGetPromotedGiftcard as jest.MockedFn<typeof useGetPromotedGiftcard>;

jest.mock('../useGetPromotedGiftcard', () => ({
  useGetPromotedGiftcard: jest.fn(),
}));
