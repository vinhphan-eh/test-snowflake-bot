import { clearEbenToken, getEbenAccessToken, isTokenValid } from './ebenToken';
import { mockFetchValidToken } from '../store/__mocks__/useSuperAppTokenStore';
import { useEbenTokenStore } from '../store/ebenTokenStore';

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

describe('getEbenAccessToken', () => {
  beforeEach(() => {
    mockFetchValidToken.mockResolvedValue({
      token: mockEHToken,
      loginProvider: 'eh',
    });
  });

  it('getEbenAccessToken should return valid token', async () => {
    const token = await getEbenAccessToken(mockTokenRes);

    expect(token).toBeTruthy();
  });
});

describe('clearEbenToken', () => {
  it('should clear old token and exchange new one', async () => {
    clearEbenToken();

    expect(useEbenTokenStore.getState().token).toBeFalsy();
  });
});

describe('isTokenValid', () => {
  it('valid token, should return true', () => {
    const isValid = isTokenValid(validToken);
    expect(isValid).toBe(true);
  });

  it('expire valid token, should return false', () => {
    const isValid = isTokenValid(expiredToken);
    expect(isValid).toBe(false);
  });

  it('no token, should return false', () => {
    const isValid = isTokenValid();
    expect(isValid).toBe(false);
  });
});
