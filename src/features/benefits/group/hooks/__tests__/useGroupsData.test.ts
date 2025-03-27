import { mockUseEbfCountry } from '../../../../../common/hooks/__mocks__/useEbfCountry';
import { useIsWorkzone } from '../../../../../common/hooks/useIsWorkzone';
import { renderHook } from '../../../../../common/utils/testing';
import { useGetGroupsQuery } from '../../../../../new-graphql/generated';
import { MockGroupsWithCountry } from '../../../../../new-graphql/handlers/custom-mock/group';
import { useGroupsData } from '../useGroupsData';

jest.mock('../../../../../common/hooks/useEbfCountry');
jest.mock('../../../../../common/hooks/useIsWorkzone');
jest.mock('../../../../../new-graphql/generated', () => ({
  useGetGroupsQuery: jest.fn(),
}));

const mockUseIsWorkzone = useIsWorkzone as jest.MockedFn<typeof useIsWorkzone>;

describe('useGroupsData', () => {
  beforeEach(() => {
    (useGetGroupsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        group: { groups: MockGroupsWithCountry },
      },
    });
  });

  it('should returns groups for EH user', () => {
    mockUseIsWorkzone.mockReturnValue(false);
    mockUseEbfCountry.mockReturnValue({
      ehCountryCode: 'AU',
      workzoneCountryCode: undefined,
      isLoadingEhCountry: false,
      isFetched: true,
    });

    const { result } = renderHook(() => useGroupsData());

    expect(result.current.groups).toMatchObject(MockGroupsWithCountry);
    expect(useGetGroupsQuery).toHaveBeenCalledWith({
      country: 'AU',
    });
  });

  it('should returns groups for workzone user', () => {
    mockUseIsWorkzone.mockReturnValue(true);
    mockUseEbfCountry.mockReturnValue({
      ehCountryCode: null,
      workzoneCountryCode: 'UK',
      isLoadingEhCountry: false,
      isFetched: true,
    });

    const { result } = renderHook(() => useGroupsData());

    expect(result.current.groups).toMatchObject(MockGroupsWithCountry);
    expect(useGetGroupsQuery).toHaveBeenCalledWith({
      country: 'UK',
    });
  });
});
