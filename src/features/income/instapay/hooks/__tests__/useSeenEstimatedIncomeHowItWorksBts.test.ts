import { renderHook, waitFor } from '../../../../../common/utils/testing';
import { useSeenEstimatedIncomeHowItWorksBts } from '../useSeenEstimatedIncomeHowItWorksBts';

describe('useSeenEstimatedIncomeHowItWorksBts', () => {
  it('should persist default and updated state correctly', async () => {
    const {
      result: { current },
    } = renderHook(() => useSeenEstimatedIncomeHowItWorksBts());

    expect(current.isSeen).toBeFalsy();

    current.setSeen(true);

    const {
      result: { current: newCurrent },
    } = renderHook(() => useSeenEstimatedIncomeHowItWorksBts());

    await waitFor(() => {
      expect(newCurrent.isSeen).toBeTruthy();
    });
  });
});
