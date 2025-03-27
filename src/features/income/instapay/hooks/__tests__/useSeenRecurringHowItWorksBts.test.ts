import { renderHook, waitFor } from '../../../../../common/utils/testing';
import { useSeenRecurringHowItWorksBts } from '../useSeenRecurringHowItWorksBts';

describe('useSeenRecurringHowItWorksBts', () => {
  it('should persist default and updated state correctly', async () => {
    const {
      result: { current },
    } = renderHook(() => useSeenRecurringHowItWorksBts());

    expect(current.isSeen).toBeFalsy();

    current.setSeen(true);

    const {
      result: { current: newCurrent },
    } = renderHook(() => useSeenRecurringHowItWorksBts());

    await waitFor(() => {
      expect(newCurrent.isSeen).toBeTruthy();
    });
  });
});
