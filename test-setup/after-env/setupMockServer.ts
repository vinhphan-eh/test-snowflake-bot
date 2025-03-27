import { mockFetchValidToken } from '../../src/common/auth/store/__mocks__/useSuperAppTokenStore';
import { mockServerNode } from '../../src/mock-server/mockServerNode';

// Establish API mocking before all tests.
beforeAll(() => {
  mockFetchValidToken.mockResolvedValue({
    token: 'mockedToken',
    loginProvider: 'eh',
  });
  mockServerNode.listen({
    onUnhandledRequest: 'warn',
  });
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => mockServerNode.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => mockServerNode.close());
