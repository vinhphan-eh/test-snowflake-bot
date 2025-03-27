import { refreshEbenToken } from './ebenToken';
import { authHttpClient } from '../../api/authClient';
import { mockFetchValidToken } from '../store/__mocks__/useSuperAppTokenStore';

// A very long life token ^^
const validToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJlYmVuZWZpdHMiLCJVc2VybmFtZSI6ImVCZW5lZml0cyIsImV4cCI6NDExNDc0MjM4OCwiaWF0IjoxNjUzMjkyNzg4fQ.dEqxbjyL5bg2kvQD31T_zvxL4iwi5g5LdACau5Wz55c';

const expiredToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJlYmVuZWZpdHMiLCJVc2VybmFtZSI6ImVCZW5lZml0cyIsImV4cCI6OTU5MDY4Nzg4LCJpYXQiOjE2NTMyOTI3ODh9.iKdlZH5MxBzAO5q_mdTH5lQZJy_TjT9WTmVLGvmaXC8';

const mockEHToken = 'mockEHToken';

const mockTokenRes = {
  token: 'mockedToken',
  loginProvider: 'eh' as never,
};

describe('refreshEbenToken', () => {
  beforeEach(() => {
    jest.spyOn(authHttpClient, 'post');
    mockFetchValidToken.mockResolvedValue({
      token: mockEHToken,
      loginProvider: 'eh',
    });
  });

  it('no refresh token, should still return new eBen token', async () => {
    const token = await refreshEbenToken('', mockTokenRes);

    expect(token).toBeTruthy();
    expect(token?.accessToken).toBeTruthy();
    expect(token?.refreshToken).toBeTruthy();
  });

  describe('parallel refreshing', () => {
    it('parallel refresh call, fail should make API call once', async () => {
      jest.spyOn(authHttpClient, 'post').mockImplementation(() => {
        return new Promise((_, reject) => {
          setTimeout(reject, 100);
        });
      });
      const newTokens = await Promise.all([
        refreshEbenToken(validToken, mockTokenRes),
        refreshEbenToken(validToken, mockTokenRes),
        refreshEbenToken(validToken, mockTokenRes),
      ]);

      expect(authHttpClient.post).toBeCalledTimes(1);

      expect(newTokens[0]).toStrictEqual(newTokens[newTokens.length - 1]);
    });

    it('parallel refresh call, should make API call once', async () => {
      const newTokens = await Promise.all([
        refreshEbenToken(expiredToken, mockTokenRes),
        refreshEbenToken(expiredToken, mockTokenRes),
        refreshEbenToken(expiredToken, mockTokenRes),
      ]);

      expect(authHttpClient.post).toBeCalledTimes(1);

      expect(newTokens[0]).toStrictEqual(newTokens[newTokens.length - 1]);
    });
  });
});
