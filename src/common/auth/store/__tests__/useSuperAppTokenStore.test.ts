import { useSessionStore } from '../../../stores/useSessionStore';
import { renderHook, waitFor } from '../../../utils/testing';
import { useSuperAppTokenStore, useGetSuperAppToken, fetchSuperAppToken } from '../useSuperAppTokenStore';

jest.unmock('../useSuperAppTokenStore');

describe('useGetSuperAppToken hook', () => {
  it('should work correctly when token is not expired', () => {
    const store = renderHook(() => useSuperAppTokenStore());
    store.result.current.freshSuperAppToken = 'freshToken';
    store.result.current.isSuperAppTokenExpired = () => false;

    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentUser = {
      loginProvider: 'eh',
    } as never;

    const hook = renderHook(() => useGetSuperAppToken('test'));

    expect(hook.result.current.token).toBe('freshToken');
    expect(hook.result.current.loginProvider).toBe('eh');
  });

  it('should work correctly when token is expired', async () => {
    const store = renderHook(() => useSuperAppTokenStore());
    store.result.current.freshSuperAppToken = 'freshToken';
    store.result.current.isSuperAppTokenExpired = () => true;
    store.result.current.fetchValidSuperAppToken = () =>
      Promise.resolve({
        token: 'asynclyToken',
        loginProvider: 'eh',
        reason: '',
      });

    const hook = renderHook(() => useGetSuperAppToken('test'));
    await waitFor(() => {
      expect(hook.result.current.token).toBe('asynclyToken');
      expect(hook.result.current.loginProvider).toBe('eh');
    });
  });

  it('should throw error correctly when token is expired but super app returns invalid response', async () => {
    const store = renderHook(() => useSuperAppTokenStore());
    store.result.current.freshSuperAppToken = 'freshToken';
    store.result.current.isSuperAppTokenExpired = () => true;
    store.result.current.fetchValidSuperAppToken = () =>
      Promise.resolve({
        token: '',
        loginProvider: 'eh',
        reason: '',
      });

    const hook = renderHook(() => useGetSuperAppToken('test'));
    await waitFor(() => {
      expect(hook.result.current.token).toBe('');
      expect(hook.result.current.loginProvider).toBe(undefined);
    });
  });
});

describe('fetchSuperAppToken', () => {
  describe('Token is expired', () => {
    it('should work correctly when super app resolves valid token', async () => {
      const store = renderHook(() => useSuperAppTokenStore());
      store.result.current.freshSuperAppToken = 'freshToken';
      store.result.current.isSuperAppTokenExpired = () => true;
      store.result.current.fetchValidSuperAppToken = () =>
        Promise.resolve({
          token: 'newlyFetchedToken',
          loginProvider: 'eh',
          reason: 'fake reasone',
        });
      await expect(fetchSuperAppToken()).resolves.toEqual({
        loginProvider: 'eh',
        token: 'newlyFetchedToken',
        reason: 'fake reasone',
      });
    });

    it('should work correctly when super app resolves empty token', async () => {
      const store = renderHook(() => useSuperAppTokenStore());
      store.result.current.freshSuperAppToken = 'freshToken';
      store.result.current.isSuperAppTokenExpired = () => true;
      store.result.current.fetchValidSuperAppToken = () =>
        Promise.resolve({
          token: '',
          loginProvider: 'eh',
          reason: '',
        });
      await expect(fetchSuperAppToken()).rejects.toThrow('Failed to fetch token');
    });

    it('should work correctly when super app rejects', async () => {
      const store = renderHook(() => useSuperAppTokenStore());
      store.result.current.freshSuperAppToken = 'freshToken';
      store.result.current.isSuperAppTokenExpired = () => true;
      store.result.current.fetchValidSuperAppToken = () =>
        // mimic super app rejection
        // eslint-disable-next-line prefer-promise-reject-errors
        Promise.reject({
          token: undefined,
          loginProvider: 'eh',
        });
      await expect(fetchSuperAppToken()).rejects.toEqual(new Error('Failed to fetch token'));
    });
  });

  describe('Token is not expired', () => {
    it('should work correctly when having fresh token', async () => {
      const store = renderHook(() => useSuperAppTokenStore());
      store.result.current.freshSuperAppToken = 'freshToken';
      store.result.current.isSuperAppTokenExpired = () => false;
      store.result.current.fetchValidSuperAppToken = () =>
        Promise.resolve({
          token: 'newlyFetchedToken',
          loginProvider: 'eh',
          reason: '',
        });
      await expect(fetchSuperAppToken()).resolves.toEqual({
        loginProvider: 'eh',
        token: 'freshToken',
        reason: 'fetchSuperApp: valid from cache',
      });
    });

    it('should work correctly when not having fresh token', async () => {
      const store = renderHook(() => useSuperAppTokenStore());
      store.result.current.freshSuperAppToken = '';
      store.result.current.isSuperAppTokenExpired = () => false;
      store.result.current.fetchValidSuperAppToken = () =>
        Promise.resolve({
          token: 'newlyFetchedToken',
          loginProvider: 'eh',
          reason: '',
        });
      await expect(fetchSuperAppToken()).rejects.toThrow('Invalid request. Already logged out');
    });

    it('should work correctly when not having login provider', async () => {
      const userStore = renderHook(() => useSessionStore());
      userStore.result.current.currentUser = {
        loginProvider: undefined,
      } as never;

      const store = renderHook(() => useSuperAppTokenStore());
      store.result.current.freshSuperAppToken = 'freshToken';
      store.result.current.isSuperAppTokenExpired = () => false;
      store.result.current.fetchValidSuperAppToken = () =>
        Promise.resolve({
          token: 'newlyFetchedToken',
          loginProvider: 'eh',
          reason: '',
        });

      await expect(fetchSuperAppToken()).rejects.toThrow('Invalid request. No login provider');
    });
  });
});
