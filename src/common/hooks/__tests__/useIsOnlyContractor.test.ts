import { renderHook } from '@testing-library/react-hooks';
import { useGetOrgsQuery } from '../../../new-graphql/generated';
import { useGetSuperAppToken } from '../../auth/store/useSuperAppTokenStore';
import { useIsOnlyContractor } from '../useIsOnlyContractor';

jest.mock('../../../new-graphql/generated');
jest.mock('../../auth/store/useSuperAppTokenStore');

describe('useIsOnlyContractor', () => {
  const mockUseGetOrgsQuery = useGetOrgsQuery as unknown as jest.Mock;
  const mockUseGetSuperAppToken = useGetSuperAppToken as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return isOnlyContractor as true when all orgs are contractors', () => {
    mockUseGetSuperAppToken.mockReturnValue({ loginProvider: 'test', token: 'test-token' });
    mockUseGetOrgsQuery.mockReturnValue({
      data: {
        me: {
          orgs: [{ isIndependentContractor: true }, { isIndependentContractor: true }],
        },
      },
      isError: false,
      isLoading: false,
    });

    const { result } = renderHook(() => useIsOnlyContractor());

    expect(result.current.isOnlyContractor).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('should return isOnlyContractor as false when any org is not a contractor', () => {
    mockUseGetSuperAppToken.mockReturnValue({ loginProvider: 'test', token: 'test-token' });
    mockUseGetOrgsQuery.mockReturnValue({
      data: {
        me: {
          orgs: [{ isIndependentContractor: true }, { isIndependentContractor: false }],
        },
      },
      isError: false,
      isLoading: false,
    });

    const { result } = renderHook(() => useIsOnlyContractor());

    expect(result.current.isOnlyContractor).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('should return isError as true when there is an error', () => {
    mockUseGetSuperAppToken.mockReturnValue({ loginProvider: 'test', token: 'test-token' });
    mockUseGetOrgsQuery.mockReturnValue({
      data: null,
      isError: true,
      isLoading: false,
    });

    const { result } = renderHook(() => useIsOnlyContractor());

    expect(result.current.isOnlyContractor).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });
});
