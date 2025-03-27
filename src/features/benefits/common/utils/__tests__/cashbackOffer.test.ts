import { mockInstoreOffer, mockOnlineOffer } from '../../../../../new-graphql/handlers/custom-mock/cashback';
import { isOnlineOffer } from '../cashbackOffer';

describe('isOnlineOffer', () => {
  it('should work correctly', () => {
    expect(isOnlineOffer(mockOnlineOffer)).toBe(true);
    expect(isOnlineOffer(mockInstoreOffer)).toBe(false);
  });
});
