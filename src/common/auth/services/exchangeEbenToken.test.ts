import { exchangeEbenToken } from './ebenToken';
import { authHttpClient } from '../../api/authClient';
import type { EbenToken } from '../../libs/storage/types';
import { mockFetchValidToken } from '../store/__mocks__/useSuperAppTokenStore';

const mockEHToken = 'mockEHToken';

const mockTokenRes = {
  token: 'mockedToken',
  loginProvider: 'eh' as never,
};

const mockKpTokenRes = {
  token: 'mockedToken',
  loginProvider: 'kp' as never,
};

describe('exchangeEbenToken', () => {
  beforeEach(() => {
    jest.spyOn(authHttpClient, 'post');
    mockFetchValidToken.mockResolvedValue({
      token: mockEHToken,
      loginProvider: 'eh',
    });
  });

  it('should return new eBen token', async () => {
    const token = await exchangeEbenToken(mockTokenRes);

    expect(token).toBeTruthy();
    expect(token?.accessToken).toBeTruthy();
    expect(token?.refreshToken).toBeTruthy();
  });

  describe('parallel refreshing', () => {
    it('parallel call, should make API call once', async () => {
      jest.spyOn(authHttpClient, 'post').mockImplementation(() =>
        Promise.resolve({
          data: {
            access_token: 'mockedToken',
            refresh_token: 'mockedRefreshToken',
            id_token: '123',
          },
        })
      );

      let newTokens: Array<EbenToken | null> = [];
      try {
        newTokens = await Promise.all([
          exchangeEbenToken(mockTokenRes),
          exchangeEbenToken(mockTokenRes),
          exchangeEbenToken(mockTokenRes),
        ]);
      } catch (e) {
        // empty
      }

      expect(authHttpClient.post).toBeCalledTimes(1);
      newTokens.forEach(tokenRes => {
        expect(tokenRes).toMatchObject({
          accessToken: 'mockedToken',
          refreshToken: 'mockedRefreshToken',
        });
      });
    });

    it('parallel call, fail should return same result', async () => {
      jest.spyOn(authHttpClient, 'post').mockImplementation(() => {
        return new Promise((_, reject) => {
          setTimeout(() => reject(new Error('')), 100);
        });
      });

      let error: Error | null = null;
      try {
        await Promise.all([
          exchangeEbenToken(mockTokenRes),
          exchangeEbenToken(mockTokenRes),
          exchangeEbenToken(mockTokenRes),
        ]);
      } catch (e) {
        if (e instanceof Error) {
          error = e;
        }
      }
      expect(error?.message).toBe('Exchange eBen token with EH failed');
      expect(authHttpClient.post).toBeCalledTimes(1);
    });

    it('parallel call, fail should return same result when provider is kp', async () => {
      jest.spyOn(authHttpClient, 'post').mockImplementation(() => {
        return new Promise((_, reject) => {
          setTimeout(() => reject(new Error('')), 100);
        });
      });

      let error: Error | null = null;
      try {
        await Promise.all([
          exchangeEbenToken(mockKpTokenRes),
          exchangeEbenToken(mockKpTokenRes),
          exchangeEbenToken(mockKpTokenRes),
        ]);
      } catch (e) {
        if (e instanceof Error) {
          error = e;
        }
      }
      expect(error?.message).toBe('Exchange eBen token with Keypay failed');

      expect(authHttpClient.post).toBeCalledTimes(1);
    });
  });
});
