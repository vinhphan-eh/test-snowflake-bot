/* eslint-disable import/first */
const mockGetAppVersion = jest.fn();

import type { MinSupportVersionQuery } from '../../../new-graphql/generated';
import { useMinSupportVersionQuery } from '../../../new-graphql/generated';
import type { MockQueryResult } from '../../types/react-query';
import { renderHook } from '../../utils/testing';
import { useCheckVersionToForceUpdate } from '../useCheckVersionToForceUpdate';

const mockUseMinSupportVersionQuery = useMinSupportVersionQuery as unknown as jest.Mock<
  MockQueryResult<MinSupportVersionQuery>
>;
(mockUseMinSupportVersionQuery as unknown as { getKey: () => string }).getKey = jest.fn();

jest.mock('../../../new-graphql/generated');

jest.mock('react-native-device-info', () => ({
  getVersion: mockGetAppVersion,
}));

describe('useCheckVersionToForceUpdate', () => {
  it.each`
    minVersion | appVersion                 | expected
    ${'2.4.0'} | ${'1.0'}                   | ${true}
    ${'2.4.0'} | ${'1.1.0'}                 | ${true}
    ${'2.4.0'} | ${'2.4.0'}                 | ${false}
    ${'2.4.0'} | ${'2.3.2-build-money-2.0'} | ${true}
    ${'2.4.0'} | ${'2.4.0-build-money-2.0'} | ${false}
  `(
    'should work correctly when min version is $minVersion and app version is $appVersion',
    ({ appVersion, expected, minVersion }) => {
      mockGetAppVersion.mockReturnValue(appVersion);
      mockUseMinSupportVersionQuery.mockReturnValue({
        data: {
          me: {
            minSupportVersion: {
              benefits: {
                minSupportAppVersion: minVersion,
              },
            },
          },
        },
        isError: false,
        isLoading: false,
      });

      const hook = renderHook(() => useCheckVersionToForceUpdate());

      expect(hook.result.current.shouldUpdate).toBe(expected);
    }
  );

  it('should return false when is error', () => {
    mockGetAppVersion.mockReturnValue('1.0');
    mockUseMinSupportVersionQuery.mockReturnValue({
      data: {
        me: {
          minSupportVersion: {
            benefits: {
              minSupportAppVersion: '2.1.0',
            },
          },
        },
      },
      isError: true,
      isLoading: false,
    });

    const hook = renderHook(() => useCheckVersionToForceUpdate());

    expect(hook.result.current.shouldUpdate).toBe(false);
  });

  it('should return false when is loading', () => {
    mockGetAppVersion.mockReturnValue('1.0');
    mockUseMinSupportVersionQuery.mockReturnValue({
      data: {
        me: {
          minSupportVersion: {
            benefits: {
              minSupportAppVersion: '2.1.0',
            },
          },
        },
      },
      isError: false,
      isLoading: true,
    });

    const hook = renderHook(() => useCheckVersionToForceUpdate());

    expect(hook.result.current.shouldUpdate).toBe(false);
  });

  it('should return false when min version is empty', () => {
    mockGetAppVersion.mockReturnValue('1.0.3');
    mockUseMinSupportVersionQuery.mockReturnValue({
      data: {
        me: {
          minSupportVersion: {
            benefits: {
              minSupportAppVersion: '',
            },
          },
        },
      },
      isError: false,
      isLoading: false,
    });

    const hook = renderHook(() => useCheckVersionToForceUpdate());

    expect(hook.result.current.shouldUpdate).toBe(false);
  });

  it('should return false when app version is empty', () => {
    mockGetAppVersion.mockReturnValue('');
    mockUseMinSupportVersionQuery.mockReturnValue({
      data: {
        me: {
          minSupportVersion: {
            benefits: {
              minSupportAppVersion: '2.1.1',
            },
          },
        },
      },
      isError: false,
      isLoading: false,
    });

    const hook = renderHook(() => useCheckVersionToForceUpdate());

    expect(hook.result.current.shouldUpdate).toBe(false);
  });
});
