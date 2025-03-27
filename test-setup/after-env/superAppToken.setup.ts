import {
  mockFetchValidToken,
  mockUseGetSuperAppToken,
} from '../../src/common/auth/store/__mocks__/useSuperAppTokenStore';

beforeEach(() => {
  mockFetchValidToken.mockResolvedValue({
    token: 'mockedToken',
    loginProvider: 'eh',
  });
  mockUseGetSuperAppToken.mockReturnValue({
    token: 'mockedToken',
    loginProvider: 'eh',
  });
});
