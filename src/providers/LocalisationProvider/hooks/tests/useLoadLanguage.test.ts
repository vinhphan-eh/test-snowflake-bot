import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react-native';
import { mockUseEbfCountry } from '../../../../common/hooks/__mocks__/useEbfCountry';
import { useLoadLanguage } from '../useLoadLanguage';
import { useLocalisation } from '../useLocalisation';

const mockUseLocalisation = useLocalisation as jest.MockedFn<typeof useLocalisation>;
jest.mock('../../../../common/hooks/useEbfCountry');
jest.mock('../useLocalisation');
const mockSetLocale = jest.fn();

describe('useLoadLanguage', () => {
  beforeEach(() => {
    mockUseLocalisation.mockReturnValue({
      currentLanguage: 'en-AU',
      setLocale: mockSetLocale,
    });
  });

  it('should call useLocalisation hook to update locale when country of user retrieved from profile', async () => {
    mockUseEbfCountry.mockReturnValue({
      isLoadingEhCountry: false,
      workzoneCountryCode: 'en-AU',
      ehCountryCode: 'AUS',
      isFetched: true,
    });

    renderHook(() => useLoadLanguage());

    await waitFor(() => {
      expect(mockSetLocale).toHaveBeenCalledWith('AUS');
    });
  });

  it('should not update locale if is loading country from profile', async () => {
    mockUseEbfCountry.mockReturnValue({
      isLoadingEhCountry: true,
      workzoneCountryCode: undefined,
      ehCountryCode: undefined,
      isFetched: true,
    });

    renderHook(() => useLoadLanguage());

    await waitFor(() => {
      expect(mockSetLocale).not.toHaveBeenCalled();
    });
  });
});
