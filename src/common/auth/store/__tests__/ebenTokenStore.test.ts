import { renderHook } from '../../../utils/testing';
import { setEbenTokenStatus, useEbenTokenStore } from '../ebenTokenStore';

describe('ebenTokenStore', () => {
  describe('setEbenTokenStatus', () => {
    it('should not update status to can_exchange if it is already success ', () => {
      const store = renderHook(() => useEbenTokenStore());

      setEbenTokenStatus('success');
      setEbenTokenStatus('can_exchange');

      expect(store.result.current.tokenStatus).toBe('success');
    });

    it.each`
      status            | expected
      ${'success'}      | ${'success'}
      ${'can_exchange'} | ${'can_exchange'}
      ${'failed'}       | ${'failed'}
    `('should update status to $expected correctly', ({ expected, status }) => {
      const store = renderHook(() => useEbenTokenStore());
      // default status is 'can_exchange'
      store.result.current.tokenStatus = 'can_exchange';
      setEbenTokenStatus(status);

      expect(store.result.current.tokenStatus).toBe(expected);
    });
  });
});
