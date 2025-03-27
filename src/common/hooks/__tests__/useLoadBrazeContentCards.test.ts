import Braze from '@braze/react-native-sdk';
import { useBrazeStore } from '../../braze/stores/useBrazeStore';
import { renderHook } from '../../utils/testing';
import { useLoadBrazeContentCards } from '../useLoadBrazeContentCards';

describe('useLoadBrazeContentCards', () => {
  beforeEach(() => {
    const brazeStore = renderHook(() => useBrazeStore());
    brazeStore.result.current.cards = undefined;
  });

  it('should save custom event to store after logging', async () => {
    (Braze.addListener as jest.Mock).mockImplementation((_, callback) => {
      callback({ cards: [{ id: 'item-1' }, { id: 'item-2' }] });
    });
    const brazeStore = renderHook(() => useBrazeStore());

    const hook = renderHook(() => useLoadBrazeContentCards());

    hook.result.current.logCustomEvent('click_instapay_popup_banner_at_swagdb');

    expect(brazeStore.result.current.pendingEvents).toContain('click_instapay_popup_banner_at_swagdb');
  });
});
