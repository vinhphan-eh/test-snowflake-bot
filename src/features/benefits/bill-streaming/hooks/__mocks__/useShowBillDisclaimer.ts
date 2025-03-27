import { useShowBillDisclaimer } from '../useShowBillDisclaimer';

export const mockUseShowBillDisclaimer = useShowBillDisclaimer as jest.MockedFunction<typeof useShowBillDisclaimer>;

jest.mock('../useShowBillDisclaimer', () => ({
  ...jest.requireActual('../useShowBillDisclaimer'),
  useBillPromotionPermission: {
    isShowDisclaimer: jest.fn(),
    setShowDisclaimer: jest.fn(),
  },
}));
