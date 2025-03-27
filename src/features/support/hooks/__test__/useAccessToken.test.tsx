import { getEbenAccessToken } from '../../../../common/auth/services/ebenToken';
import { renderHook } from '../../../../common/utils/testing';
import { useAccessToken } from '../useAccessToken';

const mockGetEbenAccessToken = getEbenAccessToken as jest.MockedFn<typeof getEbenAccessToken>;

jest.mock('../../../../common/auth/services/ebenToken');

describe('useAccessToken', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Enable fake timers for setInterval
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should update the access token every 30 seconds', () => {
    renderHook(() => useAccessToken());
    jest.advanceTimersByTime(31000); // Move forward by 31 seconds

    expect(mockGetEbenAccessToken).toHaveBeenCalledTimes(2);
  });
});
